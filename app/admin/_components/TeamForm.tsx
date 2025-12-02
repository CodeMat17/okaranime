// components/admin/TeamForm.tsx
"use client";

import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { Save, X, Upload } from "lucide-react";
import Image from "next/image";

interface TeamFormProps {
  initialData?: {
    _id?: Id<"team">;
    name?: string;
    position?: string;
    description?: string;
    email?: string;
    imageUrl?: string;
  };
  onSuccess: () => void;
  onCancel: () => void;
  isEditing?: boolean;
}

export function TeamForm({
  initialData,
  onSuccess,
  onCancel,
  isEditing = false,
}: TeamFormProps) {
  const [teamData, setTeamData] = useState({
    name: initialData?.name || "",
    position: initialData?.position || "",
    description: initialData?.description || "",
    email: initialData?.email || "",
  });

  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(
    initialData?.imageUrl || null
  );
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  const addTeam = useMutation(api.team.addTeam);
  const updateTeam = useMutation(api.team.updateTeam);
  const generateUploadUrl = useMutation(api.news.generateUploadUrl);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith("image/")) {
      setErrors((prev) => ({ ...prev, image: "Please select an image file" }));
      return;
    }

    // Validate file size (2MB max)
    const MAX_FILE_SIZE = 2 * 1024 * 1024;
    if (file.size > MAX_FILE_SIZE) {
      setErrors((prev) => ({
        ...prev,
        image: "Image must be less than 2MB",
      }));
      return;
    }

    setImageFile(file);
    // Remove image error if it exists
    setErrors((prev) => {
      const newErrors = { ...prev };
      delete newErrors.image;
      return newErrors;
    });

    const reader = new FileReader();
    reader.onload = (e) => {
      setImagePreview(e.target?.result as string);
    };
    reader.readAsDataURL(file);
  };

  const removeImage = () => {
    setImageFile(null);
    setImagePreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
    // Remove image error if it exists
    setErrors((prev) => {
      const newErrors = { ...prev };
      delete newErrors.image;
      return newErrors;
    });
  };

  const uploadImageToStorage = async (file: File): Promise<string> => {
    const uploadUrl = await generateUploadUrl();
    const result = await fetch(uploadUrl, {
      method: "POST",
      headers: { "Content-Type": file.type },
      body: file,
    });

    if (!result.ok) {
      throw new Error(`Upload failed with status: ${result.status}`);
    }

    const { storageId } = await result.json();
    if (!storageId) {
      throw new Error("No storage ID returned from upload");
    }

    return storageId;
  };

  // Extract validation message from server error
  const extractErrorMessage = (error: unknown): string => {
    if (error instanceof Error) {
      const message = error.message;

      // Check for common validation errors
      if (message.includes("Name must be at least 2 characters long")) {
        return "Name must be at least 2 characters long";
      }
      if (message.includes("Position must be at least 2 characters long")) {
        return "Position must be at least 2 characters long";
      }
      if (message.includes("Description must be at least 10 characters long")) {
        return "Description must be at least 10 characters long";
      }

      // Check for Convex server error format
      const match = message.match(/Server Error\n(.+)/);
      if (match && match[1]) {
        return match[1].trim();
      }

      return message;
    }
    return "An unknown error occurred";
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setServerError(null); // Clear previous server errors

    // Client-side validation
    const newErrors: Record<string, string> = {};

    if (!teamData.name.trim()) {
      newErrors.name = "Name is required";
    } else if (teamData.name.trim().length < 2) {
      newErrors.name = "Name must be at least 2 characters long";
    }

    if (!teamData.position.trim()) {
      newErrors.position = "Position is required";
    } else if (teamData.position.trim().length < 2) {
      newErrors.position = "Position must be at least 2 characters long";
    }

    if (!teamData.description.trim()) {
      newErrors.description = "Description is required";
    } else if (teamData.description.trim().length < 10) {
      newErrors.description = "Description must be at least 10 characters long";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);

      // Scroll to first error
      const firstErrorKey = Object.keys(newErrors)[0];
      const element = document.getElementById(firstErrorKey);
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "center" });
      }

      return;
    }

    setIsSubmitting(true);

    try {
      let imageStorageId: string | undefined;
      if (imageFile) {
        imageStorageId = await uploadImageToStorage(imageFile);
      } else if (initialData?.imageUrl && !imagePreview) {
        // If editing and image was removed
        imageStorageId = undefined;
      }

      if (isEditing && initialData?._id) {
        await updateTeam({
          id: initialData._id,
          name: teamData.name,
          position: teamData.position,
          description: teamData.description,
          email: teamData.email || undefined,
          image: imageStorageId === undefined ? null : imageStorageId,
        });
      } else {
        await addTeam({
          name: teamData.name,
          position: teamData.position,
          description: teamData.description,
          email: teamData.email || undefined,
          image: imageStorageId,
        });
      }

      onSuccess();
    } catch (error) {
      console.error("Error saving team member:", error);

      const errorMessage = extractErrorMessage(error);
      setServerError(errorMessage);

      // Also update form field errors if we can identify which field failed
      if (errorMessage.includes("Name")) {
        setErrors((prev) => ({ ...prev, name: errorMessage }));
      } else if (errorMessage.includes("Position")) {
        setErrors((prev) => ({ ...prev, position: errorMessage }));
      } else if (errorMessage.includes("Description")) {
        setErrors((prev) => ({ ...prev, description: errorMessage }));
      } else {
        setErrors({ form: errorMessage });
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  // Reset errors when form values change
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (errors.name && teamData.name.trim()) {
        if (teamData.name.trim().length >= 2) {
          setErrors((prev) => {
            const newErrors = { ...prev };
            delete newErrors.name;
            return newErrors;
          });
        }
      }
      if (errors.position && teamData.position.trim()) {
        if (teamData.position.trim().length >= 2) {
          setErrors((prev) => {
            const newErrors = { ...prev };
            delete newErrors.position;
            return newErrors;
          });
        }
      }
      if (errors.description && teamData.description.trim()) {
        if (teamData.description.trim().length >= 10) {
          setErrors((prev) => {
            const newErrors = { ...prev };
            delete newErrors.description;
            return newErrors;
          });
        }
      }
    }, 500); // Debounce to avoid too many updates

    return () => clearTimeout(timeoutId);
  }, [teamData.name, teamData.position, teamData.description, errors]);

  // Auto-dismiss server errors after 5 seconds
  useEffect(() => {
    if (serverError) {
      const timer = setTimeout(() => {
        setServerError(null);
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [serverError]);

  return (
    <form onSubmit={handleSubmit} className='space-y-4'>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
        <div className='space-y-2'>
          <Label htmlFor='name'>Full Name *</Label>
          <Input
            id='name'
            value={teamData.name}
            onChange={(e) => {
              setTeamData({ ...teamData, name: e.target.value });
              setServerError(null);
            }}
            placeholder='John Doe'
            className={errors.name ? "border-destructive" : ""}
            disabled={isSubmitting}
            aria-describedby={errors.name ? "name-error" : undefined}
          />
          {errors.name && (
            <p id='name-error' className='text-sm text-destructive'>
              {errors.name}
            </p>
          )}
        </div>

        <div className='space-y-2'>
          <Label htmlFor='position'>Position/Role *</Label>
          <Input
            id='position'
            value={teamData.position}
            onChange={(e) => {
              setTeamData({ ...teamData, position: e.target.value });
              setServerError(null);
            }}
            placeholder='Executive Director'
            className={errors.position ? "border-destructive" : ""}
            disabled={isSubmitting}
            aria-describedby={errors.position ? "position-error" : undefined}
          />
          {errors.position && (
            <p id='position-error' className='text-sm text-destructive'>
              {errors.position}
            </p>
          )}
        </div>
      </div>

      <div className='space-y-2'>
        <Label htmlFor='email'>Email (Optional)</Label>
        <Input
          id='email'
          type='email'
          value={teamData.email}
          onChange={(e) => {
            setTeamData({ ...teamData, email: e.target.value });
            setServerError(null);
          }}
          placeholder='john.doe@okaranime.org'
          disabled={isSubmitting}
        />
      </div>

      <div className='space-y-2'>
        <Label htmlFor='description'>Description *</Label>
        <Textarea
          id='description'
          value={teamData.description}
          onChange={(e) => {
            setTeamData({ ...teamData, description: e.target.value });
            setServerError(null);
          }}
          placeholder='Describe the team member role and contributions...'
          rows={3}
          className={errors.description ? "border-destructive" : ""}
          disabled={isSubmitting}
          aria-describedby={
            errors.description ? "description-error" : undefined
          }
        />
        <div className='flex justify-between items-center'>
          {errors.description ? (
            <p id='description-error' className='text-sm text-destructive'>
              {errors.description}
            </p>
          ) : (
            <p className='text-xs text-muted-foreground'>
              Minimum 10 characters required
            </p>
          )}
          <p className='text-xs text-muted-foreground'>
            {teamData.description.length}/10 characters
          </p>
        </div>
      </div>

      <div className='space-y-2'>
        <Label htmlFor='image'>Profile Image (Optional)</Label>
        {imagePreview ? (
          <div className='relative inline-block'>
            <div className='relative w-32 h-32 rounded-lg overflow-hidden border border-slate-200 dark:border-slate-700'>
              <Image
                src={imagePreview}
                alt='Preview'
                fill
                className='object-cover'
                sizes='128px'
              />
            </div>
            <Button
              type='button'
              variant='destructive'
              size='icon'
              className='absolute -top-2 -right-2 h-6 w-6 rounded-full'
              onClick={removeImage}
              disabled={isSubmitting}>
              <X className='h-3 w-3' />
            </Button>
          </div>
        ) : (
          <div className='flex items-center gap-4'>
            <input
              ref={fileInputRef}
              type='file'
              id='image'
              accept='image/*'
              onChange={handleImageChange}
              className='hidden'
              disabled={isSubmitting}
            />
            <Button
              type='button'
              variant='outline'
              onClick={() => fileInputRef.current?.click()}
              disabled={isSubmitting}
              className='gap-2'>
              <Upload className='h-4 w-4' />
              Upload Image
            </Button>
            <p className='text-sm text-muted-foreground'>
              JPG, PNG, GIF up to 2MB
            </p>
          </div>
        )}
        {errors.image && (
          <p className='text-sm text-destructive'>{errors.image}</p>
        )}
      </div>

      {/* Server Error Display */}
      {serverError &&
        !errors.name &&
        !errors.position &&
        !errors.description && (
          <div className='p-3 rounded-lg bg-destructive/10 border border-destructive/20'>
            <p className='text-sm text-destructive font-medium'>
              {serverError}
            </p>
            <p className='text-xs text-destructive/80 mt-1'>
              Please check your inputs and try again.
            </p>
          </div>
        )}

      {/* Form submission error */}
      {errors.form && (
        <div className='p-3 rounded-lg bg-destructive/10 border border-destructive/20'>
          <p className='text-sm text-destructive'>{errors.form}</p>
        </div>
      )}

      <div className='flex gap-3 justify-end pt-4'>
        <Button
          type='button'
          variant='outline'
          onClick={onCancel}
          disabled={isSubmitting}>
          Cancel
        </Button>
        <Button type='submit' disabled={isSubmitting} className='gap-2'>
          {isSubmitting ? (
            <>
              <div className='h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent' />
              {isEditing ? "Updating..." : "Adding..."}
            </>
          ) : (
            <>
              <Save className='h-4 w-4' />
              {isEditing ? "Update Team Member" : "Add Team Member"}
            </>
          )}
        </Button>
      </div>
    </form>
  );
}
