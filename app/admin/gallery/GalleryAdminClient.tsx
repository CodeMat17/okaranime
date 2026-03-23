"use client";

import { useState, useRef } from "react";
import { useMutation, useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import AdminPagesHeader from "../_components/AdminPagesHeader";
import { ImageIcon, Trash2, Plus, X, Save, Images, Edit2 } from "lucide-react";
import Image from "next/image";
import { toast } from "sonner";

// ── Image compression ─────────────────────────────────────────────────────────

async function compressImage(file: File, maxWidth = 1200, quality = 0.78): Promise<Blob> {
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

async function uploadFile(file: File, getUploadUrl: () => Promise<string>): Promise<string> {
  const blob = await compressImage(file);
  const uploadUrl = await getUploadUrl();
  const res = await fetch(uploadUrl, {
    method: "POST",
    headers: { "Content-Type": "image/webp" },
    body: blob,
  });
  if (!res.ok) throw new Error("Upload failed");
  const { storageId } = await res.json();
  return storageId as string;
}

// ── Types ─────────────────────────────────────────────────────────────────────

type PendingImg = { file: File; preview: string };
type ExistingImg = { storageId: string; url: string };

type GalleryDoc = {
  _id: Id<"gallery">;
  title: string;
  description: string;
  images: string[];
  imageUrls: string[];
};

// ── Album Form (shared for add + edit) ───────────────────────────────────────

function AlbumForm({
  initial,
  onSave,
  onCancel,
  isSaving,
}: {
  initial?: { title: string; description: string; existingImages: ExistingImg[] };
  onSave: (data: {
    title: string;
    description: string;
    existingImages: ExistingImg[];
    pendingImages: PendingImg[];
  }) => Promise<void>;
  onCancel: () => void;
  isSaving: boolean;
}) {
  const [title, setTitle] = useState(initial?.title ?? "");
  const [description, setDescription] = useState(initial?.description ?? "");
  const [existingImages, setExistingImages] = useState<ExistingImg[]>(
    initial?.existingImages ?? []
  );
  const [pendingImages, setPendingImages] = useState<PendingImg[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const totalCount = existingImages.length + pendingImages.length;
  const remaining = 6 - totalCount;

  const handleFiles = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files ?? []);
    if (!files.length) return;
    const allowed = files.slice(0, remaining);
    const newPending: PendingImg[] = allowed.map((f) => ({
      file: f,
      preview: URL.createObjectURL(f),
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

  const handleSubmit = async () => {
    if (!title.trim()) return toast.error("Title is required");
    if (!description.trim()) return toast.error("Description is required");
    if (totalCount < 1) return toast.error("Add at least 1 photo");
    await onSave({ title, description, existingImages, pendingImages });
  };

  return (
    <div className="space-y-4">
      <div className="grid sm:grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <Label>Album Title</Label>
          <Input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g. Youth Training Camp 2024"
          />
        </div>
        <div className="space-y-1.5">
          <Label>Description</Label>
          <Textarea
            rows={2}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Brief description of the event or program"
          />
        </div>
      </div>

      {/* Image previews */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <Label>Photos ({totalCount}/6)</Label>
          <span className="text-xs text-muted-foreground">
            {remaining > 0 ? `${remaining} slot${remaining !== 1 ? "s" : ""} remaining` : "Full"}
          </span>
        </div>

        <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
          {/* Existing */}
          {existingImages.map((img) => (
            <div key={img.storageId} className="relative aspect-square rounded-lg overflow-hidden group border border-slate-200 dark:border-slate-700">
              <Image src={img.url} alt="" fill className="object-cover" unoptimized sizes="100px" />
              <button
                type="button"
                onClick={() => removeExisting(img.storageId)}
                className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <X className="h-5 w-5 text-white" />
              </button>
            </div>
          ))}

          {/* Pending */}
          {pendingImages.map((img, i) => (
            <div key={i} className="relative aspect-square rounded-lg overflow-hidden group border border-primary/40">
              <Image src={img.preview} alt="" fill className="object-cover" unoptimized sizes="100px" />
              <div className="absolute top-1 right-1 bg-primary/80 rounded text-[9px] text-white px-1">new</div>
              <button
                type="button"
                onClick={() => removePending(i)}
                className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <X className="h-5 w-5 text-white" />
              </button>
            </div>
          ))}

          {/* Upload button */}
          {remaining > 0 && (
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="aspect-square rounded-lg border-2 border-dashed border-slate-300 dark:border-slate-600 hover:border-primary/60 transition-colors flex flex-col items-center justify-center gap-1 text-muted-foreground hover:text-primary">
              <Plus className="h-5 w-5" />
              <span className="text-[10px] font-medium">Add</span>
            </button>
          )}
        </div>

        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          multiple
          className="hidden"
          onChange={handleFiles}
        />
        <p className="text-xs text-muted-foreground">
          Images are compressed &amp; converted to WebP automatically. Min 1, max 6 per album.
        </p>
      </div>

      {/* Actions */}
      <div className="flex gap-2 pt-2">
        <Button onClick={handleSubmit} disabled={isSaving} className="gap-1.5">
          <Save className="h-4 w-4" />
          {isSaving ? "Saving…" : "Save Album"}
        </Button>
        <Button variant="outline" onClick={onCancel} disabled={isSaving}>
          Cancel
        </Button>
      </div>
    </div>
  );
}

// ── Main Component ────────────────────────────────────────────────────────────

export default function GalleryAdminClient() {
  const galleries = useQuery(api.gallery.getAllGalleries) as GalleryDoc[] | undefined;
  const addGallery = useMutation(api.gallery.addGallery);
  const updateGallery = useMutation(api.gallery.updateGallery);
  const deleteGallery = useMutation(api.gallery.deleteGallery);
  const generateUploadUrl = useMutation(api.gallery.generateUploadUrl);

  const [showAddForm, setShowAddForm] = useState(false);
  const [editingId, setEditingId] = useState<Id<"gallery"> | null>(null);
  const [saving, setSaving] = useState(false);
  const [deletingId, setDeletingId] = useState<Id<"gallery"> | null>(null);

  const handleAdd = async (data: {
    title: string;
    description: string;
    existingImages: ExistingImg[];
    pendingImages: PendingImg[];
  }) => {
    const id = toast.loading("Uploading photos…");
    setSaving(true);
    try {
      const newIds = await Promise.all(
        data.pendingImages.map((p) => uploadFile(p.file, generateUploadUrl))
      );
      const allIds = [...data.existingImages.map((i) => i.storageId), ...newIds];
      await addGallery({ title: data.title, description: data.description, images: allIds });
      toast.success("Gallery album created", { id });
      setShowAddForm(false);
    } catch (err) {
      toast.error(`Failed: ${String(err)}`, { id });
    } finally {
      setSaving(false);
    }
  };

  const handleUpdate = async (
    albumId: Id<"gallery">,
    data: {
      title: string;
      description: string;
      existingImages: ExistingImg[];
      pendingImages: PendingImg[];
    }
  ) => {
    const id = toast.loading("Saving changes…");
    setSaving(true);
    try {
      const newIds = await Promise.all(
        data.pendingImages.map((p) => uploadFile(p.file, generateUploadUrl))
      );
      const allIds = [...data.existingImages.map((i) => i.storageId), ...newIds];
      await updateGallery({ id: albumId, title: data.title, description: data.description, images: allIds });
      toast.success("Album updated", { id });
      setEditingId(null);
    } catch (err) {
      toast.error(`Failed: ${String(err)}`, { id });
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (album: GalleryDoc) => {
    if (!confirm(`Delete "${album.title}"? This cannot be undone.`)) return;
    const id = toast.loading("Deleting album…");
    setDeletingId(album._id);
    try {
      await deleteGallery({ id: album._id });
      toast.success("Album deleted", { id });
    } catch (err) {
      toast.error(`Failed: ${String(err)}`, { id });
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 pt-24">
      <header className="border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-2 pb-4">
          <AdminPagesHeader />
          <div className="mt-4 flex items-center justify-between flex-wrap gap-3">
            <div>
              <h1 className="text-3xl font-black text-foreground mb-1">Gallery Management</h1>
              <p className="text-sm text-muted-foreground">
                Upload event photos. Each album holds 1–6 images.
              </p>
            </div>
            {!showAddForm && (
              <Button onClick={() => setShowAddForm(true)} className="gap-2">
                <Plus className="h-4 w-4" />
                New Album
              </Button>
            )}
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        {/* Add form */}
        {showAddForm && (
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base flex items-center gap-2">
                <ImageIcon className="h-4 w-4 text-primary" />
                New Gallery Album
              </CardTitle>
            </CardHeader>
            <CardContent>
              <AlbumForm
                onSave={handleAdd}
                onCancel={() => setShowAddForm(false)}
                isSaving={saving}
              />
            </CardContent>
          </Card>
        )}

        {/* Gallery list */}
        {galleries === undefined ? (
          <div className="space-y-4">
            {[0, 1, 2].map((i) => (
              <div key={i} className="h-40 bg-white dark:bg-slate-900 rounded-2xl animate-pulse shadow" />
            ))}
          </div>
        ) : galleries.length === 0 && !showAddForm ? (
          <div className="text-center py-24 border-2 border-dashed border-slate-300 dark:border-slate-700 rounded-2xl">
            <Images className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-xl font-bold mb-2">No albums yet</h3>
            <p className="text-muted-foreground mb-6">Create your first gallery album to get started.</p>
            <Button onClick={() => setShowAddForm(true)} className="gap-2">
              <Plus className="h-4 w-4" />
              New Album
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            {galleries.map((album) => (
              <Card key={album._id} className="overflow-hidden">
                {editingId === album._id ? (
                  <>
                    <CardHeader className="pb-3">
                      <CardTitle className="text-base flex items-center gap-2">
                        <Edit2 className="h-4 w-4 text-primary" />
                        Editing: {album.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <AlbumForm
                        initial={{
                          title: album.title,
                          description: album.description,
                          existingImages: album.images.map((id, i) => ({
                            storageId: id,
                            url: album.imageUrls[i] ?? "",
                          })),
                        }}
                        onSave={(data) => handleUpdate(album._id, data)}
                        onCancel={() => setEditingId(null)}
                        isSaving={saving}
                      />
                    </CardContent>
                  </>
                ) : (
                  <CardContent className="p-4">
                    <div className="flex gap-4 items-start">
                      {/* Thumbnail strip */}
                      <div className="flex gap-1 shrink-0">
                        {album.imageUrls.slice(0, 3).map((url, i) => (
                          <div key={i} className="relative h-16 w-16 rounded-lg overflow-hidden bg-slate-100 dark:bg-slate-800 shrink-0">
                            <Image src={url} alt="" fill className="object-cover" unoptimized sizes="64px" />
                            {i === 2 && album.imageUrls.length > 3 && (
                              <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                                <span className="text-white text-xs font-bold">+{album.imageUrls.length - 2}</span>
                              </div>
                            )}
                          </div>
                        ))}
                      </div>

                      {/* Info */}
                      <div className="flex-1 min-w-0">
                        <h3 className="font-bold text-base truncate">{album.title}</h3>
                        <p className="text-sm text-muted-foreground mt-0.5 line-clamp-2">{album.description}</p>
                        <div className="flex items-center gap-1 mt-1 text-xs text-muted-foreground">
                          <Images className="h-3.5 w-3.5" />
                          <span>{album.images.length} photo{album.images.length !== 1 ? "s" : ""}</span>
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="flex gap-2 shrink-0">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => setEditingId(album._id)}
                          className="gap-1.5">
                          <Edit2 className="h-3.5 w-3.5" />
                          <span className="hidden sm:inline">Edit</span>
                        </Button>
                        <Button
                          size="sm"
                          variant="destructive"
                          onClick={() => handleDelete(album)}
                          disabled={deletingId === album._id}
                          className="gap-1.5">
                          <Trash2 className="h-3.5 w-3.5" />
                          <span className="hidden sm:inline">
                            {deletingId === album._id ? "Deleting…" : "Delete"}
                          </span>
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                )}
              </Card>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
