// convex/news.ts
import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { Id } from "./_generated/dataModel";

// Sanitization utility functions
const sanitizeTitle = (title: string): string => {
  return title
    .replace(/[<>]/g, "") // Remove < and >
    .replace(/javascript:/gi, "")
    .replace(/vbscript:/gi, "")
    .replace(/data:/gi, "")
    .trim();
};

const sanitizeBody = (body: string): string => {
  return body
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, "")
    .replace(/ on\w+="[^"]*"/g, "")
    .replace(/ on\w+='[^']*'/g, "")
    .replace(/ javascript:/gi, " ")
    .replace(/ vbscript:/gi, " ")
    .replace(/ data:/gi, " ")
    .trim();
};

const generateSlug = (title: string): string => {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .substring(0, 150)
    .replace(/-$/, "");
};

// Helper: resolve all images (URL + caption) for a news doc
async function resolveImages(
  ctx: { storage: { getUrl: (id: Id<"_storage">) => Promise<string | null> } },
  doc: { image?: string; images?: string[]; captions?: string[] }
): Promise<{ url: string; caption: string }[]> {
  const ids: string[] =
    doc.images && doc.images.length > 0
      ? doc.images
      : doc.image
        ? [doc.image]
        : [];
  const captions = doc.captions ?? [];
  const result: { url: string; caption: string }[] = [];
  for (let i = 0; i < ids.length; i++) {
    const url = await ctx.storage.getUrl(ids[i] as Id<"_storage">);
    if (url) result.push({ url, caption: captions[i] ?? "" });
  }
  return result;
}

// Query: Get all news
export const getAllNews = query({
  args: {},
  handler: async (ctx) => {
    const news = await ctx.db.query("news").order("desc").collect();
    return await Promise.all(
      news.map(async (newsItem) => {
        const imageItems = await resolveImages(ctx, newsItem);
        return {
          ...newsItem,
          imageItems,
          imageUrls: imageItems.map((i) => i.url),
          imageUrl: imageItems[0]?.url,
        };
      })
    );
  },
});

// Query: Get news by slug
export const getNewsBySlug = query({
  args: { slug: v.string() },
  handler: async (ctx, args) => {
    const newsItem = await ctx.db
      .query("news")
      .withIndex("by_slug", (q) => q.eq("slug", args.slug))
      .first();
    if (!newsItem) return null;
    const imageItems = await resolveImages(ctx, newsItem);
    return {
      ...newsItem,
      imageItems,
      imageUrls: imageItems.map((i) => i.url),
      imageUrl: imageItems[0]?.url,
    };
  },
});

// Query: Get news by ID
export const getNewsById = query({
  args: { id: v.id("news") },
  handler: async (ctx, args) => {
    const newsItem = await ctx.db.get(args.id);
    if (!newsItem) return null;
    const imageItems = await resolveImages(ctx, newsItem);
    return {
      ...newsItem,
      imageItems,
      imageUrls: imageItems.map((i) => i.url),
      imageUrl: imageItems[0]?.url,
    };
  },
});

// Mutation: Generate upload URL for images
export const generateUploadUrl = mutation({
  args: {},
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("Unauthorized");
    return await ctx.storage.generateUploadUrl();
  },
});

// Mutation: Add new news
export const addNews = mutation({
  args: {
    title: v.string(),
    content: v.string(),
    images: v.optional(v.array(v.string())),   // storage IDs, up to 9
    captions: v.optional(v.array(v.string())), // captions[i] for images[i]
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("Unauthorized");

    const sanitizedTitle = sanitizeTitle(args.title);
    const sanitizedContent = sanitizeBody(args.content);
    const slug = generateSlug(sanitizedTitle);

    let uniqueSlug = slug;
    let counter = 1;
    while (
      (await ctx.db
        .query("news")
        .withIndex("by_slug", (q) => q.eq("slug", uniqueSlug))
        .first()) !== null
    ) {
      uniqueSlug = `${slug}-${counter}`;
      counter++;
    }

    const hasImages = args.images && args.images.length > 0;
    return await ctx.db.insert("news", {
      title: sanitizedTitle,
      slug: uniqueSlug,
      content: sanitizedContent,
      images: hasImages ? args.images : undefined,
      captions: hasImages ? args.captions : undefined,
    });
  },
});

// Mutation: Update news
export const updateNews = mutation({
  args: {
    id: v.id("news"),
    title: v.optional(v.string()),
    content: v.optional(v.string()),
    // Pass the final list of storage IDs after edits; null = clear all images
    images: v.optional(v.union(v.array(v.string()), v.null())),
    // captions[i] maps to images[i]; null = clear all captions
    captions: v.optional(v.union(v.array(v.string()), v.null())),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("Unauthorized");

    const existingNews = await ctx.db.get(args.id);
    if (!existingNews) throw new Error("News item not found");

    const sanitizedTitle = args.title
      ? sanitizeTitle(args.title)
      : existingNews.title;
    const sanitizedContent = args.content
      ? sanitizeBody(args.content)
      : existingNews.content;

    let slug = existingNews.slug;
    if (args.title && args.title !== existingNews.title) {
      const newSlug = generateSlug(sanitizedTitle);
      let uniqueSlug = newSlug;
      let counter = 1;
      while (true) {
        const existing = await ctx.db
          .query("news")
          .withIndex("by_slug", (q) => q.eq("slug", uniqueSlug))
          .first();
        if (!existing || existing._id === args.id) break;
        uniqueSlug = `${newSlug}-${counter}`;
        counter++;
      }
      slug = uniqueSlug;
    }

    // Determine new images array
    let newImages: string[] | undefined;
    if (args.images === null) {
      newImages = undefined; // clear all
    } else if (args.images !== undefined) {
      newImages = args.images.length > 0 ? args.images : undefined;
    } else {
      newImages = existingNews.images; // unchanged
    }

    // Delete images removed from the post
    if (args.images !== undefined) {
      const incoming = args.images ?? [];
      const oldIds = existingNews.images ?? (existingNews.image ? [existingNews.image] : []);
      const removed = oldIds.filter((id) => !incoming.includes(id));
      for (const id of removed) {
        try { await ctx.storage.delete(id as Id<"_storage">); } catch { /* already gone */ }
      }
    }

    // Determine new captions array
    let newCaptions: string[] | undefined;
    if (args.captions === null) {
      newCaptions = undefined; // clear all
    } else if (args.captions !== undefined) {
      newCaptions = args.captions.length > 0 ? args.captions : undefined;
    } else {
      newCaptions = existingNews.captions; // unchanged
    }

    await ctx.db.patch(args.id, {
      title: sanitizedTitle,
      slug,
      content: sanitizedContent,
      images: newImages,
      captions: newCaptions,
      // Clear legacy image field when using new images array
      image: newImages ? undefined : existingNews.image,
    });

    return args.id;
  },
});

// Mutation: Delete news and all associated images
export const deleteNews = mutation({
  args: { id: v.id("news") },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("Unauthorized");

    const newsItem = await ctx.db.get(args.id);
    if (!newsItem) throw new Error("News item not found");

    // Delete all images (new array + legacy single)
    const allIds = [
      ...(newsItem.images ?? []),
      ...(newsItem.image && !newsItem.images ? [newsItem.image] : []),
    ];
    for (const id of allIds) {
      try { await ctx.storage.delete(id as Id<"_storage">); } catch { /* already gone */ }
    }

    await ctx.db.delete(args.id);
    return args.id;
  },
});

// Mutation: Upload news image (this can be removed as it's redundant now)
export const uploadNewsImage = mutation({
  args: {
    storageId: v.id("_storage"),
  },
  handler: async (ctx, args) => {
    // Return the storage ID to be used in the news item
    return args.storageId;
  },
});

export const getNewsBySlugForMetadata = query({
  args: { slug: v.string() },
  handler: async (ctx, args) => {
    const newsItem = await ctx.db
      .query("news")
      .withIndex("by_slug", (q) => q.eq("slug", args.slug))
      .first();
    if (!newsItem) return null;
    const imageItems = await resolveImages(ctx, newsItem);
    return {
      _id: newsItem._id,
      title: newsItem.title,
      content: newsItem.content,
      slug: newsItem.slug,
      _creationTime: newsItem._creationTime,
      imageUrl: imageItems[0]?.url,
    };
  },
});