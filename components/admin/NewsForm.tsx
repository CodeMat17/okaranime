// components/admin/NewsForm.tsx
"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useMutation } from "convex/react";
import { Loader2, Plus, Save, X } from "lucide-react";
import Image from "next/image";
import { useRef, useState } from "react";
import { RichTextEditor } from "../RichTextEditor";
import { toast } from "sonner";

// ── Image compression ─────────────────────────────────────────────────────────

async function compressImage(file: File, maxWidth = 1600, quality = 0.82): Promise<Blob> {
  return new Promise((resolve) => {
    const img = new window.Image();
    const url = URL.createObjectURL(file);
    img.onload = () => {
      URL.revokeObjectURL(url);
      let { width, height } = img;
      if (width > maxWidth) {
        height = Math.round((height * maxWidth) / width);
        width = maxWidth;
      }
      const canvas = document.createElement("canvas");
      canvas.width = width;
      canvas.height = height;
      canvas.getContext("2d")!.drawImage(img, 0, 0, width, height);
      canvas.toBlob((blob) => resolve(blob!), "image/webp", quality);
    };
    img.src = url;
  });
}

type ExistingImg = { storageId: string; url: string; caption: string };
type PendingImg = { file: File; preview: string; caption: string };

interface NewsFormProps {
  initialData?: {
    _id?: Id<"news">;
    title?: string;
    content?: string;
    imageStorageIds?: string[];
    imageUrls?: string[];
    captions?: string[];
  };
  onSuccess?: () => void;
  onCancel?: () => void;
  isEditing?: boolean;
}

const MAX_IMAGES = 6;

export function NewsForm({
  initialData,
  onSuccess,
  onCancel,
  isEditing = false,
}: NewsFormProps) {
  const [title, setTitle] = useState(initialData?.title ?? "");
  const [content, setContent] = useState(initialData?.content ?? "");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [titleError, setTitleError] = useState("");
  const [contentError, setContentError] = useState("");

  // Build existing images from initialData
  const [existingImages, setExistingImages] = useState<ExistingImg[]>(() => {
    const ids = initialData?.imageStorageIds ?? [];
    const urls = initialData?.imageUrls ?? [];
    const caps = initialData?.captions ?? [];
    return ids.map((id, i) => ({ storageId: id, url: urls[i] ?? "", caption: caps[i] ?? "" }));
  });
  const [pendingImages, setPendingImages] = useState<PendingImg[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const addNews = useMutation(api.news.addNews);
  const updateNews = useMutation(api.news.updateNews);
  const generateUploadUrl = useMutation(api.news.generateUploadUrl);

  const totalImages = existingImages.length + pendingImages.length;
  const remaining = MAX_IMAGES - totalImages;

  const handleFiles = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files ?? []).slice(0, remaining);
    const newPending: PendingImg[] = files.map((f) => ({
      file: f,
      preview: URL.createObjectURL(f),
      caption: "",
    }));
    setPendingImages((prev) => [...prev, ...newPending]);
    e.target.value = "";
  };

  const removeExisting = (storageId: string) =>
    setExistingImages((prev) => prev.filter((i) => i.storageId !== storageId));

  const removePending = (index: number) => {
    setPendingImages((prev) => {
      URL.revokeObjectURL(prev[index].preview);
      return prev.filter((_, i) => i !== index);
    });
  };

  const updateExistingCaption = (storageId: string, caption: string) =>
    setExistingImages((prev) =>
      prev.map((img) => (img.storageId === storageId ? { ...img, caption } : img))
    );

  const updatePendingCaption = (index: number, caption: string) =>
    setPendingImages((prev) =>
      prev.map((img, i) => (i === index ? { ...img, caption } : img))
    );

  const uploadFile = async (file: File): Promise<string> => {
    const blob = await compressImage(file);
    const uploadUrl = await generateUploadUrl();
    const res = await fetch(uploadUrl, {
      method: "POST",
      headers: { "Content-Type": "image/webp" },
      body: blob,
    });
    if (!res.ok) throw new Error("Upload failed");
    const { storageId } = await res.json();
    if (!storageId) throw new Error("No storage ID returned");
    return storageId as string;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    let valid = true;
    if (!title.trim() || title.length < 5) {
      setTitleError("Title must be at least 5 characters");
      valid = false;
    } else {
      setTitleError("");
    }
    if (!content.trim() || content.length < 10) {
      setContentError("Content must be at least 10 characters");
      valid = false;
    } else {
      setContentError("");
    }
    if (!valid) return;

    setIsSubmitting(true);
    try {
      // Upload all pending files
      const newStorageIds = await Promise.all(
        pendingImages.map((p) => uploadFile(p.file))
      );
      const allIds = [
        ...existingImages.map((i) => i.storageId),
        ...newStorageIds,
      ];
      const allCaptions = [
        ...existingImages.map((i) => i.caption),
        ...pendingImages.map((i) => i.caption),
      ];

      if (isEditing && initialData?._id) {
        await updateNews({
          id: initialData._id,
          title,
          content,
          images: allIds.length > 0 ? allIds : null,
          captions: allIds.length > 0 ? allCaptions : null,
        });
      } else {
        await addNews({
          title,
          content,
          images: allIds.length > 0 ? allIds : undefined,
          captions: allIds.length > 0 ? allCaptions : undefined,
        });
      }

      onSuccess?.();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Failed to save. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Title */}
      <div className="space-y-2">
        <Label htmlFor="title">Title *</Label>
        <Input
          id="title"
          value={title}
          onChange={(e) => { setTitle(e.target.value); setTitleError(""); }}
          placeholder="Enter news title..."
          disabled={isSubmitting}
          className={titleError ? "border-destructive" : ""}
        />
        {titleError && <p className="text-sm text-destructive">{titleError}</p>}
      </div>

      {/* Images */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <Label>Photos ({totalImages}/{MAX_IMAGES}) — optional</Label>
          <span className="text-xs text-muted-foreground">
            {remaining > 0 ? `${remaining} slot${remaining !== 1 ? "s" : ""} left` : "Full"}
          </span>
        </div>

        {/* Image list with captions */}
        {(existingImages.length > 0 || pendingImages.length > 0) && (
          <div className="space-y-2">
            {existingImages.map((img) => (
              <div
                key={img.storageId}
                className="flex items-center gap-3 p-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50">
                <div className="relative w-14 h-14 flex-shrink-0 rounded overflow-hidden">
                  <Image
                    src={img.url}
                    alt=""
                    fill
                    className="object-cover"
                    unoptimized
                    sizes="56px"
                  />
                </div>
                <Input
                  value={img.caption}
                  onChange={(e) => updateExistingCaption(img.storageId, e.target.value)}
                  placeholder="Add a caption..."
                  disabled={isSubmitting}
                  className="flex-1 text-sm h-8"
                />
                <button
                  type="button"
                  onClick={() => removeExisting(img.storageId)}
                  disabled={isSubmitting}
                  className="flex-shrink-0 text-muted-foreground hover:text-destructive transition-colors disabled:opacity-50">
                  <X className="h-4 w-4" />
                </button>
              </div>
            ))}
            {pendingImages.map((img, i) => (
              <div
                key={i}
                className="flex items-center gap-3 p-2 rounded-lg border border-primary/40 bg-primary/5">
                <div className="relative w-14 h-14 flex-shrink-0 rounded overflow-hidden">
                  <Image
                    src={img.preview}
                    alt=""
                    fill
                    className="object-cover"
                    unoptimized
                    sizes="56px"
                  />
                  <div className="absolute top-0 left-0 bg-primary/80 text-[9px] text-white px-1 rounded-br">new</div>
                </div>
                <Input
                  value={img.caption}
                  onChange={(e) => updatePendingCaption(i, e.target.value)}
                  placeholder="Add a caption..."
                  disabled={isSubmitting}
                  className="flex-1 text-sm h-8"
                />
                <button
                  type="button"
                  onClick={() => removePending(i)}
                  disabled={isSubmitting}
                  className="flex-shrink-0 text-muted-foreground hover:text-destructive transition-colors disabled:opacity-50">
                  <X className="h-4 w-4" />
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Add button */}
        {remaining > 0 && (
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            disabled={isSubmitting}
            className="w-full py-3 rounded-lg border-2 border-dashed border-slate-300 dark:border-slate-600 hover:border-primary/60 transition-colors flex items-center justify-center gap-2 text-muted-foreground hover:text-primary disabled:opacity-50 text-sm">
            <Plus className="h-4 w-4" />
            Add Photo{remaining > 1 ? "s" : ""}
          </button>
        )}

        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          multiple
          className="hidden"
          onChange={handleFiles}
          disabled={isSubmitting}
        />
        <p className="text-xs text-muted-foreground">
          Up to {MAX_IMAGES} photos. Automatically compressed &amp; converted to WebP.
        </p>
      </div>

      {/* Content */}
      <div className="space-y-2">
        <Label htmlFor="content">Content *</Label>
        <RichTextEditor
          value={content}
          onChange={setContent}
          placeholder="Write your news content here..."
        />
        {contentError && <p className="text-sm text-destructive">{contentError}</p>}
      </div>

      {/* Actions */}
      <div className="flex gap-3 pt-2">
        <Button type="submit" disabled={isSubmitting} className="gap-2 flex-1 sm:flex-none">
          {isSubmitting ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              {isEditing ? "Updating..." : "Publishing..."}
            </>
          ) : (
            <>
              <Save className="h-4 w-4" />
              {isEditing ? "Update News" : "Publish News"}
            </>
          )}
        </Button>
        {onCancel && (
          <Button
            type="button"
            variant="outline"
            onClick={onCancel}
            disabled={isSubmitting}
            className="dark:hover:text-gray-400">
            Cancel
          </Button>
        )}
      </div>
    </form>
  );
}
