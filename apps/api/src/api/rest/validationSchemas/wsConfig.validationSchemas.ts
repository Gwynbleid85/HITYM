import { z } from "zod";

/**
 * Subscribe to user data
 * @typedef {object} SubscribeGroupRequest
 * @property {string} groupId.required - Group to subscribe to
 */
export const userSubscribeGroupSchema = z.object({
  body: z.object({
    groupId: z.string(),
  }),
});

/**
 * Unsubscribe from user data
 * @typedef {object} UnsubscribeGroupRequest
 * @property {string} groupId.required - Group to unsubscribe from
 */
export const userUnsubscribeGroupSchema = z.object({
  body: z.object({
    groupId: z.string(),
  }),
});

/**
 * Share position with group
 * @typedef {object} SharePositionWithGroupRequest
 * @property {string} groupId.required - Group to share position with
 */
export const userSharePositionWithGroupSchema = z.object({
  body: z.object({
    groupId: z.string(),
  }),
});

/**
 * Unshare position with group
 * @typedef {object} UnsharePositionWithGroupRequest
 * @property {string[]} groupId.required - Group to unshare position with
 */
export const userUnsharePositionWithGroupSchema = z.object({
  body: z.object({
    groupId: z.string(),
  }),
});
