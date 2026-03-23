// convex/gallery.ts
import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { Id, Doc } from "./_generated/dataModel";
import { GenericQueryCtx } from "convex/server";
import { DataModel } from "./_generated/dataModel";

// Resolve storage IDs → URLs for a gallery doc
async function withUrls(ctx: GenericQueryCtx<DataModel>, doc: Doc<"gallery">) {
  const imageUrls: string[] = [];
  for (const id of doc.images) {
    const url = await ctx.storage.getUrl(id as Id<"_storage">);
    if (url) imageUrls.push(url);
  }
  return { ...doc, imageUrls };
}

export const getAllGalleries = query({
  args: {},
  handler: async (ctx) => {
    const docs = await ctx.db.query("gallery").order("desc").collect();
    return await Promise.all(docs.map((d) => withUrls(ctx, d)));
  },
});

export const getGallery = query({
  args: { id: v.id("gallery") },
  handler: async (ctx, args) => {
    const doc = await ctx.db.get(args.id);
    if (!doc) return null;
    return await withUrls(ctx, doc);
  },
});

export const addGallery = mutation({
  args: {
    title: v.string(),
    description: v.string(),
    images: v.array(v.string()), // storage IDs, 1–6
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("Unauthorized");
    if (args.images.length < 1 || args.images.length > 6)
      throw new Error("Must have 1–6 images");
    return await ctx.db.insert("gallery", {
      title: args.title.trim(),
      description: args.description.trim(),
      images: args.images,
    });
  },
});

export const updateGallery = mutation({
  args: {
    id: v.id("gallery"),
    title: v.string(),
    description: v.string(),
    images: v.array(v.string()), // final list of storage IDs after edits
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("Unauthorized");
    if (args.images.length < 1 || args.images.length > 6)
      throw new Error("Must have 1–6 images");

    const existing = await ctx.db.get(args.id);
    if (!existing) throw new Error("Gallery not found");

    // Delete any images that were removed
    const removed = existing.images.filter((id) => !args.images.includes(id));
    for (const id of removed) {
      try {
        await ctx.storage.delete(id as Id<"_storage">);
      } catch { /* already gone */ }
    }

    await ctx.db.patch(args.id, {
      title: args.title.trim(),
      description: args.description.trim(),
      images: args.images,
    });
  },
});

export const deleteGallery = mutation({
  args: { id: v.id("gallery") },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("Unauthorized");

    const doc = await ctx.db.get(args.id);
    if (!doc) throw new Error("Gallery not found");

    for (const id of doc.images) {
      try {
        await ctx.storage.delete(id as Id<"_storage">);
      } catch { /* already gone */ }
    }
    await ctx.db.delete(args.id);
  },
});

export const generateUploadUrl = mutation({
  args: {},
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("Unauthorized");
    return ctx.storage.generateUploadUrl();
  },
});
