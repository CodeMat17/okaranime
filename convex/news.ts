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

// Query: Get all news
export const getAllNews = query({
  args: {},
  handler: async (ctx) => {
    const news = await ctx.db.query("news").order("desc").collect();

    // Get image URLs for each news item
    const newsWithImages = await Promise.all(
      news.map(async (newsItem) => {
        let imageUrl: string | undefined = undefined;
        if (newsItem.image) {
          const url = await ctx.storage.getUrl(
            newsItem.image as Id<"_storage">
          );
          if (url) {
            imageUrl = url;
          }
        }
        return {
          ...newsItem,
          imageUrl,
        };
      })
    );

    return newsWithImages;
  },
});

// Query: Get news by slug
export const getNewsBySlug = query({
  args: {
    slug: v.string(),
  },
  handler: async (ctx, args) => {
    const newsItem = await ctx.db
      .query("news")
      .withIndex("by_slug", (q) => q.eq("slug", args.slug))
      .first();

    if (!newsItem) {
      return null;
    }

    // Get storage URL for image if it exists
    let imageUrl: string | undefined = undefined;
    if (newsItem.image) {
      const url = await ctx.storage.getUrl(newsItem.image as Id<"_storage">);
      if (url) {
        imageUrl = url;
      }
    }

    return {
      ...newsItem,
      imageUrl,
    };
  },
});

// Query: Get news by ID
export const getNewsById = query({
  args: {
    id: v.id("news"),
  },
  handler: async (ctx, args) => {
    const newsItem = await ctx.db.get(args.id);

    if (!newsItem) {
      return null;
    }

    // Get storage URL for image if it exists
    let imageUrl: string | undefined = undefined;
    if (newsItem.image) {
      const url = await ctx.storage.getUrl(newsItem.image as Id<"_storage">);
      if (url) {
        imageUrl = url;
      }
    }

    return {
      ...newsItem,
      imageUrl,
    };
  },
});

// Mutation: Generate upload URL for images
export const generateUploadUrl = mutation({
  args: {},
  handler: async (ctx) => {
    return await ctx.storage.generateUploadUrl();
  },
});

// Mutation: Add new news
export const addNews = mutation({
  args: {
    image: v.optional(v.string()), // Storage ID
    title: v.string(),
    content: v.string(),
  },
  handler: async (ctx, args) => {
    // Sanitize inputs
    const sanitizedTitle = sanitizeTitle(args.title);
    const sanitizedContent = sanitizeBody(args.content);

    // Generate slug from title
    const slug = generateSlug(sanitizedTitle);

    // Check if slug already exists and make it unique if needed
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

    // Handle image assignment - convert null to undefined
    const imageValue = args.image || undefined;

    const newsId = await ctx.db.insert("news", {
      image: imageValue,
      title: sanitizedTitle,
      slug: uniqueSlug,
      content: sanitizedContent,
    });

    return newsId;
  },
});

// Mutation: Update news
export const updateNews = mutation({
  args: {
    id: v.id("news"),
    image: v.optional(v.union(v.string(), v.null())), // Allow null to clear image
    title: v.optional(v.string()),
    content: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const existingNews = await ctx.db.get(args.id);

    if (!existingNews) {
      throw new Error("News item not found");
    }

    // Sanitize inputs
    const sanitizedTitle = args.title
      ? sanitizeTitle(args.title)
      : existingNews.title;
    const sanitizedContent = args.content
      ? sanitizeBody(args.content)
      : existingNews.content;

    let slug = existingNews.slug;

    // If title changed, generate new slug
    if (args.title && args.title !== existingNews.title) {
      const newSlug = generateSlug(sanitizedTitle);

      // Check if new slug already exists (excluding current news)
      let uniqueSlug = newSlug;
      let counter = 1;
      while (true) {
        const existingWithSlug = await ctx.db
          .query("news")
          .withIndex("by_slug", (q) => q.eq("slug", uniqueSlug))
          .first();

        if (!existingWithSlug || existingWithSlug._id === args.id) {
          break;
        }
        uniqueSlug = `${newSlug}-${counter}`;
        counter++;
      }
      slug = uniqueSlug;
    }

    // Handle image assignment - convert null to undefined
    let imageValue: string | undefined;
    if (args.image === null) {
      imageValue = undefined;
    } else if (args.image !== undefined) {
      imageValue = args.image;
    } else {
      imageValue = existingNews.image;
    }

    await ctx.db.patch(args.id, {
      image: imageValue,
      title: sanitizedTitle,
      slug,
      content: sanitizedContent,
    });

    return args.id;
  },
});

// Mutation: Delete news and associated image
export const deleteNews = mutation({
  args: {
    id: v.id("news"),
  },
  handler: async (ctx, args) => {
    const newsItem = await ctx.db.get(args.id);

    if (!newsItem) {
      throw new Error("News item not found");
    }

    // Delete associated image from storage if it exists
    if (newsItem.image) {
      try {
        await ctx.storage.delete(newsItem.image as Id<"_storage">);
      } catch (error) {
        console.log("Error Msg: ", error);
        console.warn(
          "Failed to delete image from storage, continuing with news deletion"
        );
        // Continue with news deletion even if image deletion fails
      }
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
  args: {
    slug: v.string(),
  },
  handler: async (ctx, args) => {
    const newsItem = await ctx.db
      .query("news")
      .withIndex("by_slug", (q) => q.eq("slug", args.slug))
      .first();

    if (!newsItem) {
      return null;
    }

    // Get image URL for metadata if it exists
    let imageUrl: string | undefined = undefined;
    if (newsItem.image) {
      const url = await ctx.storage.getUrl(newsItem.image as Id<"_storage">);
      if (url) {
        imageUrl = url;
      }
    }

    return {
      _id: newsItem._id,
      title: newsItem.title,
      content: newsItem.content,
      slug: newsItem.slug,
      _creationTime: newsItem._creationTime,
      imageUrl, // Include image URL for metadata
    };
  },
});