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

  // Gallery albums – each album holds 1–6 photo storage IDs
  gallery: defineTable({
    title: v.string(),
    description: v.string(),
    images: v.array(v.string()), // Convex storage IDs, 1–6
  }).index("by_title", ["title"]),

  // Site-wide editable content. One document per section key.
  // `body` stores JSON strings for sections with complex structure
  // (arrays, multiple paragraphs, bullet lists, key-value facts, etc.)
  siteContent: defineTable({
    section: v.string(),
    title: v.optional(v.string()),
    subtitle: v.optional(v.string()),
    body: v.optional(v.string()),
    image: v.optional(v.string()), // Convex storage ID
  }).index("by_section", ["section"]),
});
