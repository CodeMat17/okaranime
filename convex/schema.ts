import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  news: defineTable({
    image: v.optional(v.string()),
    title: v.string(),
    slug: v.string(),
    content: v.string(),
  }).index("by_slug", ["slug"]),

  team: defineTable({
    name: v.string(),
    position: v.string(),
    description: v.string(),
    email: v.optional(v.string()),
    image: v.optional(v.string()),
  })
    .index("by_name", ["name"])
    .index("by_position", ["position"]),
});
