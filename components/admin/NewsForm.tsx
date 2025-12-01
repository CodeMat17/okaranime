// components/admin/NewsForm.tsx (Simplified version)
"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useMutation } from "convex/react";
import { Image as ImageIcon, Loader2, Upload, X } from "lucide-react";
import Image from "next/image";
import { useRef, useState } from "react";
import { RichTextEditor } from "../RichTextEditor";

interface NewsFormProps {
  initialData?: {
    _id?: Id<"news">;
    title?: string;
    content?: string;
    imageUrl?: string;
  };
  onSuccess?: () => void;
  onCancel?: () => void;
  isEditing?: boolean;
}

interface FormErrors {
  title?: string;
  content?: string;
  image?: string;
  general?: string;
}

export function NewsForm({
  initialData,
  onSuccess,
  onCancel,
  isEditing = false,
}: NewsFormProps) {
  const [title, setTitle] = useState(initialData?.title || "");
  const [content, setContent] = useState(initialData?.content || "");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(
    initialData?.imageUrl || null
  );
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});

  const fileInputRef = useRef<HTMLInputElement>(null);

  const addNews = useMutation(api.news.addNews);
  const updateNews = useMutation(api.news.updateNews);
  const generateUploadUrl = useMutation(api.news.generateUploadUrl);

  const validateForm = () => {
    const newErrors: FormErrors = {};

    if (!title.trim()) {
      newErrors.title = "Title is required";
    } else if (title.length < 5) {
      newErrors.title = "Title must be at least 5 characters long";
    } else if (title.length > 200) {
      newErrors.title = "Title must be less than 200 characters";
    }

    if (!content.trim()) {
      newErrors.content = "Content is required";
    } else if (content.length < 10) {
      newErrors.content = "Content must be at least 10 characters long";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    const allowedTypes = ["image/jpeg", "image/png", "image/webp", "image/gif"];
    if (!allowedTypes.includes(file.type)) {
      setErrors((prev) => ({
        ...prev,
        image: "Please select a JPEG, PNG, WebP, or GIF image",
      }));
      return;
    }

    // Validate file size (2MB max)
    const MAX_FILE_SIZE = 2 * 1024 * 1024;
    if (file.size > MAX_FILE_SIZE) {
      setErrors((prev) => ({
        ...prev,
        image: "Image must be less than 2MB. Please select a smaller image.",
      }));
      return;
    }

    setImageFile(file);
    setErrors((prev) => ({ ...prev, image: undefined }));

    // Create preview
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
  };

  const uploadImageToStorage = async (file: File): Promise<string> => {
    try {
      // Step 1: Get an upload URL from Convex
      const uploadUrl = await generateUploadUrl();

      // Step 2: Upload the file to the storage using the URL
      const result = await fetch(uploadUrl, {
        method: "POST",
        headers: { "Content-Type": file.type },
        body: file,
      });

      if (!result.ok) {
        throw new Error(`Upload failed with status: ${result.status}`);
      }

      // Step 3: Get the storage ID from the response
      const { storageId } = await result.json();

      if (!storageId) {
        throw new Error("No storage ID returned from upload");
      }

      return storageId;
    } catch (error) {
      console.error("Error uploading image:", error);
      throw new Error("Failed to upload image. Please try again.");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      let imageStorageId: string | undefined;

      // Upload image if a new one was selected
      if (imageFile) {
        imageStorageId = await uploadImageToStorage(imageFile);
      }

      if (isEditing && initialData?._id) {
        // Update existing news
        await updateNews({
          id: initialData._id,
          title,
          content,
          image: imageFile
            ? imageStorageId
            : imagePreview === null && initialData.imageUrl
              ? null
              : undefined,
        });
      } else {
        // Create new news
        await addNews({
          title,
          content,
          image: imageStorageId,
        });
      }

      // Reset form
      setTitle("");
      setContent("");
      setImageFile(null);
      setImagePreview(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }

      onSuccess?.();
    } catch (error) {
      console.error("Error saving news:", error);
      setErrors((prev) => ({
        ...prev,
        general:
          error instanceof Error
            ? error.message
            : "Failed to save news. Please try again.",
      }));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className='space-y-6'>
      {/* Title Field */}
      <div className='space-y-2'>
        <Label htmlFor='title' className='text-sm font-medium'>
          Title *
        </Label>
        <Input
          id='title'
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
            setErrors((prev) => ({ ...prev, title: undefined }));
          }}
          placeholder='Enter news title...'
          className={
            errors.title
              ? "border-destructive focus-visible:ring-destructive"
              : ""
          }
          disabled={isSubmitting}
        />
        {errors.title && (
          <p className='text-sm text-destructive'>{errors.title}</p>
        )}
      </div>

      {/* Image Upload Field */}
      <div className='space-y-2'>
        <Label htmlFor='image' className='text-sm font-medium'>
          Featured Image (Optional)
        </Label>

        {/* Image Preview */}
        {imagePreview && (
          <div className='relative inline-block'>
            <div className='relative w-48 h-32 rounded-lg border border-border overflow-hidden'>
              <Image
                src={imagePreview}
                alt='Preview'
                fill
                className='object-cover'
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
        )}

        {/* Upload Area */}
        {!imagePreview && (
          <div className='flex items-center gap-4'>
            <input
              ref={fileInputRef}
              type='file'
              id='image'
              accept='image/jpeg,image/png,image/webp,image/gif'
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
              JPG, PNG, WebP, GIF up to 2MB
            </p>
          </div>
        )}

        {errors.image && (
          <p className='text-sm text-destructive'>{errors.image}</p>
        )}
      </div>

      {/* Content Field */}
      <div className='space-y-2'>
        <Label htmlFor='content' className='text-sm font-medium'>
          Content *
        </Label>
        <RichTextEditor
          value={content}
          onChange={setContent}
          placeholder='Writing your news content here...'
        />

        {errors.content && (
          <p className='text-sm text-destructive'>{errors.content}</p>
        )}
      </div>

      {/* General Error */}
      {errors.general && (
        <div className='p-3 rounded-lg bg-destructive/10 border border-destructive/20'>
          <p className='text-sm text-destructive'>{errors.general}</p>
        </div>
      )}

      {/* Action Buttons */}
      <div className='flex gap-3 pt-4'>
        <Button
          type='submit'
          disabled={isSubmitting}
          className='gap-2 flex-1 sm:flex-none'>
          {isSubmitting ? (
            <>
              <Loader2 className='h-4 w-4 animate-spin' />
              {isEditing ? "Updating..." : "Publishing..."}
            </>
          ) : (
            <>
              <ImageIcon className='h-4 w-4' />
              {isEditing ? "Update News" : "Publish News"}
            </>
          )}
        </Button>

        {onCancel && (
          <Button
            type='button'
            variant='outline'
            onClick={onCancel}
            disabled={isSubmitting}
            className='dark:hover:text-gray-400'>
            Cancel
          </Button>
        )}
      </div>
    </form>
  );
}
