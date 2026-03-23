"use client";

import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useState } from "react";
import { X, ChevronLeft, ChevronRight, Images, ZoomIn } from "lucide-react";

// ── Skeleton ─────────────────────────────────────────────────────────────────

function GallerySkeleton() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {[0, 1, 2, 3, 4, 5].map((i) => (
        <div key={i} className="rounded-2xl overflow-hidden shadow-lg bg-white dark:bg-slate-900">
          <div className="aspect-[4/3] bg-slate-200 dark:bg-slate-700 animate-pulse" />
          <div className="p-4 space-y-2">
            <div className="h-5 w-2/3 bg-slate-200 dark:bg-slate-700 rounded animate-pulse" />
            <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded animate-pulse" />
            <div className="h-4 w-4/5 bg-slate-200 dark:bg-slate-700 rounded animate-pulse" />
          </div>
        </div>
      ))}
    </div>
  );
}

// ── Lightbox ──────────────────────────────────────────────────────────────────

function Lightbox({
  images,
  startIndex,
  title,
  onClose,
}: {
  images: string[];
  startIndex: number;
  title: string;
  onClose: () => void;
}) {
  const [current, setCurrent] = useState(startIndex);

  const prev = () => setCurrent((c) => (c - 1 + images.length) % images.length);
  const next = () => setCurrent((c) => (c + 1) % images.length);

  // Close on backdrop click
  const handleBackdrop = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) onClose();
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4"
        onClick={handleBackdrop}>
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors z-10">
          <X className="h-6 w-6" />
        </button>

        {/* Counter */}
        <div className="absolute top-4 left-4 text-white/70 text-sm font-medium">
          {title} · {current + 1} / {images.length}
        </div>

        {/* Image */}
        <motion.div
          key={current}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.2 }}
          className="relative w-full max-w-4xl max-h-[80vh] aspect-auto">
          <div className="relative w-full" style={{ height: "70vh" }}>
            <Image
              src={images[current]}
              alt={`${title} photo ${current + 1}`}
              fill
              className="object-contain"
              unoptimized
              sizes="100vw"
            />
          </div>
        </motion.div>

        {/* Prev / Next */}
        {images.length > 1 && (
          <>
            <button
              onClick={prev}
              className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors">
              <ChevronLeft className="h-6 w-6" />
            </button>
            <button
              onClick={next}
              className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors">
              <ChevronRight className="h-6 w-6" />
            </button>
          </>
        )}

        {/* Thumbnail strip */}
        {images.length > 1 && (
          <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2 px-4 overflow-x-auto">
            {images.map((img, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                className={`relative shrink-0 h-12 w-12 rounded-lg overflow-hidden border-2 transition-all ${
                  i === current ? "border-white scale-110" : "border-white/30 opacity-60 hover:opacity-100"
                }`}>
                <Image src={img} alt="" fill className="object-cover" unoptimized sizes="48px" />
              </button>
            ))}
          </div>
        )}
      </motion.div>
    </AnimatePresence>
  );
}

// ── Album Card ────────────────────────────────────────────────────────────────

function AlbumCard({
  album,
  index,
}: {
  album: { _id: string; title: string; description: string; imageUrls: string[] };
  index: number;
}) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const urls = album.imageUrls;
  const preview = urls.slice(0, 4);

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: index * 0.07 }}
        viewport={{ once: true }}
        className="group bg-white dark:bg-slate-900 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 border border-slate-200 dark:border-slate-700">
        {/* Photo grid preview */}
        <div
          className={`grid gap-0.5 cursor-pointer ${
            preview.length === 1 ? "grid-cols-1" :
            preview.length === 2 ? "grid-cols-2" :
            preview.length === 3 ? "grid-cols-2" :
            "grid-cols-2"
          }`}
          onClick={() => setLightboxIndex(0)}>
          {preview.map((url, i) => {
            const isLast = i === 3 && urls.length > 4;
            return (
              <div
                key={i}
                className={`relative overflow-hidden bg-slate-100 dark:bg-slate-800 ${
                  preview.length === 3 && i === 0 ? "row-span-2" : ""
                }`}
                style={{ aspectRatio: preview.length === 1 ? "16/9" : "1" }}>
                <Image
                  src={url}
                  alt={`${album.title} photo ${i + 1}`}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  unoptimized
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 25vw, 20vw"
                />
                {isLast && (
                  <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                    <span className="text-white text-xl font-bold">+{urls.length - 3}</span>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Info */}
        <div className="p-4">
          <div className="flex items-start justify-between gap-2">
            <div className="min-w-0">
              <h3 className="font-bold text-base truncate group-hover:text-primary transition-colors">
                {album.title}
              </h3>
              <p className="text-sm text-muted-foreground mt-1 line-clamp-2">{album.description}</p>
            </div>
            <div className="flex items-center gap-1 text-xs text-muted-foreground shrink-0 mt-0.5">
              <Images className="h-3.5 w-3.5" />
              <span>{urls.length}</span>
            </div>
          </div>

          {/* View all button */}
          <button
            onClick={() => setLightboxIndex(0)}
            className="mt-3 flex items-center gap-1.5 text-xs font-semibold text-primary hover:underline">
            <ZoomIn className="h-3.5 w-3.5" />
            View all photos
          </button>
        </div>
      </motion.div>

      {lightboxIndex !== null && (
        <Lightbox
          images={urls}
          startIndex={lightboxIndex}
          title={album.title}
          onClose={() => setLightboxIndex(null)}
        />
      )}
    </>
  );
}

// ── Main component ────────────────────────────────────────────────────────────

export default function GalleryClient() {
  const galleries = useQuery(api.gallery.getAllGalleries);

  return (
    <main className="min-h-screen bg-slate-50 dark:bg-slate-950 pt-24 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-6xl mx-auto">
        {/* Page header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12">
          <h1 className="text-4xl font-black tracking-tight sm:text-5xl mb-4">
            Our <span className="text-primary">Gallery</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Moments captured from our events, programs, and community initiatives.
          </p>
        </motion.div>

        {/* Grid */}
        {galleries === undefined ? (
          <GallerySkeleton />
        ) : galleries.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-24 border-2 border-dashed border-slate-300 dark:border-slate-700 rounded-2xl">
            <Images className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-xl font-bold mb-2">No photos yet</h3>
            <p className="text-muted-foreground">Check back soon for photos from our events.</p>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {galleries.map((album, i) => (
              <AlbumCard key={album._id} album={album} index={i} />
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
