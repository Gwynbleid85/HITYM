import { z } from "zod";

// Create group schema
export const createGroupSchema = z.object({
  name: z
    .string()
    .min(2, { message: "Name must be at least 2 characters." })
    .max(50, { message: "Name must be at most 50 characters." }),
  description: z.string().max(500, { message: "Description must be at most 500 characters." }).optional(),
});

// Update group schema
export const updateGroupSchema = z.object({
  name: z
    .string()
    .min(2, { message: "Name must be at least 2 characters." })
    .max(50, { message: "Name must be at most 50 characters." }),
  description: z.string().max(500, { message: "Description must be at most 500 characters." }).optional(),
});

/**
 * Update group image
 * @typedef {object} UpdateImageRequest
 * @property {string} imageUrl - Image URL
 */
export const updateImageSchema = z.object({
  params: z.object({
    id: z.string(),
  }),
  body: z.object({
    imageUrl: z.string(),
  }),
});

/**
 * Add user to group
 * @typedef {object} AddUserRequest
 * @property {string} userId - User ID
 */
export const addUserSchema = z.object({
  params: z.object({
    id: z.string(),
  }),
  body: z.object({
    userId: z.string(),
  }),
});

export const removeUserSchema = z.object({
  params: z.object({
    id: z.string(),
    userId: z.string(),
  }),
});

export const getHistoricalEventsSchema = z.object({
  params: z.object({
    id: z.string(),
  }),
});
