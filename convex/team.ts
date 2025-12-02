// convex/team.ts
import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { Id } from "./_generated/dataModel";

// Sanitization utility functions for team data
const sanitizeText = (text: string): string => {
  return text
    .replace(/[<>]/g, "") // Remove < and >
    .replace(/javascript:/gi, "")
    .replace(/vbscript:/gi, "")
    .replace(/data:/gi, "")
    .replace(/on\w+="[^"]*"/g, "")
    .replace(/on\w+='[^']*'/g, "")
    .trim();
};

const sanitizeEmail = (email: string): string | undefined => {
  if (!email) return undefined;

  const sanitized = email
    .toLowerCase()
    .replace(/[<>]/g, "")
    .replace(/javascript:/gi, "")
    .replace(/vbscript:/gi, "")
    .replace(/data:/gi, "")
    .trim();

  // Basic email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(sanitized) ? sanitized : undefined;
};

// Query: Get all team members
export const getAllTeam = query({
  args: {},
  handler: async (ctx) => {
    try {
      const teamMembers = await ctx.db.query("team").order("asc").collect();

      // Get image URLs for each team member
      const teamWithImages = await Promise.all(
        teamMembers.map(async (member) => {
          let imageUrl: string | undefined = undefined;
          if (member.image) {
            const url = await ctx.storage.getUrl(
              member.image as Id<"_storage">
            );
            if (url) {
              imageUrl = url;
            }
          }
          return {
            ...member,
            imageUrl,
          };
        })
      );

      return teamWithImages;
    } catch (error) {
      console.error("Error fetching team members:", error);
      return [];
    }
  },
});

// Mutation: Add new team member
export const addTeam = mutation({
  args: {
    name: v.string(),
    position: v.string(),
    description: v.string(),
    email: v.optional(v.string()),
    image: v.optional(v.string()), // Storage ID
  },
  handler: async (ctx, args) => {
    // Sanitize inputs
    const sanitizedName = sanitizeText(args.name);
    const sanitizedPosition = sanitizeText(args.position);
    const sanitizedDescription = sanitizeText(args.description);
    const sanitizedEmail = args.email ? sanitizeEmail(args.email) : undefined;

    // Validate required fields
    if (!sanitizedName || sanitizedName.length < 2) {
      throw new Error("Name must be at least 2 characters long");
    }

    if (!sanitizedPosition || sanitizedPosition.length < 2) {
      throw new Error("Position must be at least 2 characters long");
    }

    if (!sanitizedDescription || sanitizedDescription.length < 10) {
      throw new Error("Description must be at least 10 characters long");
    }

    // Handle image assignment
    const imageValue = args.image || undefined;

    const teamId = await ctx.db.insert("team", {
      name: sanitizedName,
      position: sanitizedPosition,
      description: sanitizedDescription,
      email: sanitizedEmail,
      image: imageValue,
    });

    return teamId;
  },
});

// Mutation: Update team member
export const updateTeam = mutation({
  args: {
    id: v.id("team"),
    name: v.optional(v.string()),
    position: v.optional(v.string()),
    description: v.optional(v.string()),
    email: v.optional(v.union(v.string(), v.null())), // Allow null to clear email
    image: v.optional(v.union(v.string(), v.null())), // Allow null to clear image
  },
  handler: async (ctx, args) => {
    const existingMember = await ctx.db.get(args.id);

    if (!existingMember) {
      throw new Error("Team member not found");
    }

    // Sanitize inputs
    const sanitizedName = args.name
      ? sanitizeText(args.name)
      : existingMember.name;
    const sanitizedPosition = args.position
      ? sanitizeText(args.position)
      : existingMember.position;
    const sanitizedDescription = args.description
      ? sanitizeText(args.description)
      : existingMember.description;

    let sanitizedEmail: string | undefined;
    if (args.email === null) {
      sanitizedEmail = undefined;
    } else if (args.email !== undefined) {
      sanitizedEmail = sanitizeEmail(args.email);
    } else {
      sanitizedEmail = existingMember.email;
    }

    // Validate fields
    if (sanitizedName.length < 2) {
      throw new Error("Name must be at least 2 characters long");
    }

    if (sanitizedPosition.length < 2) {
      throw new Error("Position must be at least 2 characters long");
    }

    if (sanitizedDescription.length < 10) {
      throw new Error("Description must be at least 10 characters long");
    }

    // Handle image assignment
    let imageValue: string | undefined;
    if (args.image === null) {
      imageValue = undefined;
    } else if (args.image !== undefined) {
      imageValue = args.image;
    } else {
      imageValue = existingMember.image;
    }

    await ctx.db.patch(args.id, {
      name: sanitizedName,
      position: sanitizedPosition,
      description: sanitizedDescription,
      email: sanitizedEmail,
      image: imageValue,
    });

    return args.id;
  },
});

// Mutation: Delete team member and associated image
export const deleteTeam = mutation({
  args: {
    id: v.id("team"),
  },
  handler: async (ctx, args) => {
    const teamMember = await ctx.db.get(args.id);

    if (!teamMember) {
      throw new Error("Team member not found");
    }

    // Delete associated image from storage if it exists
    if (teamMember.image) {
      try {
        await ctx.storage.delete(teamMember.image as Id<"_storage">);
      } catch (error) {
          console.log('Error Msg: ', error);
        console.warn(
          "Failed to delete image from storage, continuing with team member deletion"
        );
        // Continue with deletion even if image deletion fails
      }
    }

    await ctx.db.delete(args.id);
    return args.id;
  },
});
