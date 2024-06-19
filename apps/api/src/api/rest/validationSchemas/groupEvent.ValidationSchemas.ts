import { z } from "zod";

/**
 * Create new group event request
 * @typedef {object} CreateGroupEventRequest
 * @property {string} name.required - Event name
 * @property {string} description - Event description
 * @property {string} date.required - Event date - date-time
 * @property {string} groupId.required - Group ID
 * @property {string} placeId.required - Place ID
 */
export const createGroupEventSchema = z.object({
  body: z.object({
    name: z.string().min(1).max(255),
    description: z.string().min(1).max(255).nullable(),
    date: z.coerce.date(),
    groupId: z.string(),
    placeId: z.string(),
  }),
});
type XXX = z.infer<typeof createGroupEventSchema>;

export const getGroupEventByIdSchema = z.object({
  params: z.object({
    id: z.string(),
  }),
});

/**
 * Update group event request
 * @typedef {object} UpdateGroupEventRequest
 * @property {string} name - Event name
 * @property {string} description - Event description
 * @property {string} date - Event date - date-time
 * @property {string} placeId - Place ID
 */
export const updateGroupEventSchema = z.object({
  params: z.object({
    id: z.string(),
  }),
  body: z.object({
    name: z.string().min(1).max(255),
    description: z.string().min(1).max(255).nullable(),
    date: z.date(),
    placeId: z.string(),
  }),
});

export const deleteGroupEventSchema = z.object({
  params: z.object({
    id: z.string(),
  }),
});
