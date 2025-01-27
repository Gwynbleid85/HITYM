import { z } from "zod";

/**
 * Create a new group
 * @typedef {object} CreateGroupRequest
 * @property {string} name.required - Group name
 * @property {string} description - Group description
 */
export const createGroupSchema = z.object({
  body: z.object({
    name: z.string().min(2),
    description: z.string().nullable(),
  }),
});

export const getGroupByIdSchema = z.object({
  params: z.object({
    id: z.string(),
  }),
});

/**
 * Update a group
 * @typedef {object} UpdateGroupRequest
 * @property {string} name - Group name
 * @property {string} description - Group description
 */
export const updateGroupSchema = z.object({
  params: z.object({
    id: z.string(),
  }),
  body: z.object({
    name: z.string().min(2),
    description: z.string().nullable(),
  }),
});

export const deleteGroupSchema = z.object({
  params: z.object({
    id: z.string(),
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
