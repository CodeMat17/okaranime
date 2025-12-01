import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  news: defineTable({
    image: v.optional(v.string()),
    title: v.string(),
    slug: v.string(),
    content: v.string(),
  }).index("by_slug", ["slug"]),
});
