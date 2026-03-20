// convex/backup.ts
import { v } from "convex/values";
import { action, internalMutation, internalQuery, mutation } from "./_generated/server";
import { internal } from "./_generated/api";
import { Doc, Id } from "./_generated/dataModel";

// ============================================================
// INTERNAL QUERIES (called from exportBackup action)
// ============================================================

export const _getAllNews = internalQuery({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("news").collect();
  },
});

export const _getAllTeam = internalQuery({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("team").collect();
  },
});

// ============================================================
// EXPORT — returns all records with short-lived image URLs.
// The browser client is responsible for downloading those
// images immediately and embedding them as base64 data URLs
// so the saved JSON file never expires.
// ============================================================

export const exportBackup = action({
  args: {},
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("Unauthorized");

    const newsItems: Doc<"news">[] = await ctx.runQuery(
      internal.backup._getAllNews,
      {}
    );
    const teamItems: Doc<"team">[] = await ctx.runQuery(
      internal.backup._getAllTeam,
      {}
    );

    const news = await Promise.all(
      newsItems.map(async (item: Doc<"news">) => {
        let imageUrl: string | undefined;
        if (item.image) {
          const url = await ctx.storage.getUrl(item.image as Id<"_storage">);
          imageUrl = url ?? undefined;
        }
        // _id is intentionally excluded — it belongs to the source deployment
        return {
          title: item.title,
          slug: item.slug,
          content: item.content,
          imageUrl,
        };
      })
    );

    const team = await Promise.all(
      teamItems.map(async (item: Doc<"team">) => {
        let imageUrl: string | undefined;
        if (item.image) {
          const url = await ctx.storage.getUrl(item.image as Id<"_storage">);
          imageUrl = url ?? undefined;
        }
        return {
          name: item.name,
          position: item.position,
          description: item.description,
          email: item.email,
          imageUrl,
        };
      })
    );

    return { exportedAt: Date.now(), version: "1.0", news, team };
  },
});

// ============================================================
// IMPORT — accepts clean records with storageIds already
// uploaded by the browser. Called after the client has:
//   1. Decoded base64 image data from the backup JSON
//   2. Uploaded each image directly to Convex storage
//   3. Collected the resulting storageIds
// ============================================================

export const importItems = mutation({
  args: {
    news: v.array(
      v.object({
        title: v.string(),
        slug: v.string(),
        content: v.string(),
        storageId: v.optional(v.string()),
      })
    ),
    team: v.array(
      v.object({
        name: v.string(),
        position: v.string(),
        description: v.string(),
        email: v.optional(v.string()),
        storageId: v.optional(v.string()),
      })
    ),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("Unauthorized");

    let newsImported = 0;
    let teamImported = 0;

    for (const item of args.news) {
      // Ensure slug uniqueness
      let uniqueSlug = item.slug;
      let counter = 1;
      while (
        (await ctx.db
          .query("news")
          .withIndex("by_slug", (q) => q.eq("slug", uniqueSlug))
          .first()) !== null
      ) {
        uniqueSlug = `${item.slug}-${counter++}`;
      }
      await ctx.db.insert("news", {
        title: item.title,
        slug: uniqueSlug,
        content: item.content,
        image: item.storageId,
      });
      newsImported++;
    }

    for (const item of args.team) {
      await ctx.db.insert("team", {
        name: item.name,
        position: item.position,
        description: item.description,
        email: item.email,
        image: item.storageId,
      });
      teamImported++;
    }

    return { newsImported, teamImported };
  },
});

// ============================================================
// IMPORT (INTERNAL) — same as importItems but no auth check.
// Called by the CLI import script via `npx convex run`.
// ============================================================

export const importItemsInternal = internalMutation({
  args: {
    news: v.array(
      v.object({
        title: v.string(),
        slug: v.string(),
        content: v.string(),
        storageId: v.optional(v.string()),
      })
    ),
    team: v.array(
      v.object({
        name: v.string(),
        position: v.string(),
        description: v.string(),
        email: v.optional(v.string()),
        storageId: v.optional(v.string()),
      })
    ),
  },
  handler: async (ctx, args) => {
    let newsImported = 0;
    let teamImported = 0;

    for (const item of args.news) {
      let uniqueSlug = item.slug;
      let counter = 1;
      while (
        (await ctx.db
          .query("news")
          .withIndex("by_slug", (q) => q.eq("slug", uniqueSlug))
          .first()) !== null
      ) {
        uniqueSlug = `${item.slug}-${counter++}`;
      }
      await ctx.db.insert("news", {
        title: item.title,
        slug: uniqueSlug,
        content: item.content,
        image: item.storageId,
      });
      newsImported++;
    }

    for (const item of args.team) {
      await ctx.db.insert("team", {
        name: item.name,
        position: item.position,
        description: item.description,
        email: item.email,
        image: item.storageId,
      });
      teamImported++;
    }

    return { newsImported, teamImported };
  },
});

// ============================================================
// GENERATE UPLOAD URL — used by the import flow so the
// browser can upload images directly to Convex storage
// ============================================================

export const generateUploadUrl = mutation({
  args: {},
  handler: async (ctx) => {
    return await ctx.storage.generateUploadUrl();
  },
});
