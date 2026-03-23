// convex/siteContent.ts
import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { Id } from "./_generated/dataModel";

// ── Queries ────────────────────────────────────────────────────────────────

export const getAllSections = query({
  args: {},
  handler: async (ctx) => {
    const docs = await ctx.db.query("siteContent").collect();
    return await Promise.all(
      docs.map(async (doc) => {
        let imageUrl: string | undefined;
        if (doc.image) {
          imageUrl =
            (await ctx.storage.getUrl(doc.image as Id<"_storage">)) ??
            undefined;
        }
        return { ...doc, imageUrl };
      })
    );
  },
});

export const getSection = query({
  args: { section: v.string() },
  handler: async (ctx, args) => {
    const doc = await ctx.db
      .query("siteContent")
      .withIndex("by_section", (q) => q.eq("section", args.section))
      .first();
    if (!doc) return null;
    let imageUrl: string | undefined;
    if (doc.image) {
      imageUrl =
        (await ctx.storage.getUrl(doc.image as Id<"_storage">)) ?? undefined;
    }
    return { ...doc, imageUrl };
  },
});

// ── Mutations ──────────────────────────────────────────────────────────────

export const upsertSection = mutation({
  args: {
    section: v.string(),
    title: v.optional(v.string()),
    subtitle: v.optional(v.string()),
    body: v.optional(v.string()),
    // Pass the current storageId to keep existing image,
    // pass a new storageId to replace it, or omit to clear it.
    image: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("Unauthorized");

    const existing = await ctx.db
      .query("siteContent")
      .withIndex("by_section", (q) => q.eq("section", args.section))
      .first();

    // If replacing the image, delete the old one from storage
    if (
      existing?.image &&
      args.image !== existing.image
    ) {
      try {
        await ctx.storage.delete(existing.image as Id<"_storage">);
      } catch {
        // Non-fatal — old image already gone or inaccessible
      }
    }

    // Convex rejects explicit `undefined` values in patch/insert —
    // only include fields that were actually provided.
    const data: {
      section: string;
      title?: string;
      subtitle?: string;
      body?: string;
      image?: string;
    } = { section: args.section };
    if (args.title !== undefined) data.title = args.title;
    if (args.subtitle !== undefined) data.subtitle = args.subtitle;
    if (args.body !== undefined) data.body = args.body;
    if (args.image !== undefined) data.image = args.image;

    if (existing) {
      await ctx.db.patch(existing._id, data);
    } else {
      await ctx.db.insert("siteContent", data);
    }
  },
});

export const generateUploadUrl = mutation({
  args: {},
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("Unauthorized");
    return await ctx.storage.generateUploadUrl();
  },
});
