import { z } from "zod";

/**
 * Subscribe to user data
 * @typedef {object} SubscribeUserRequest
 * @property {string[]} userIds.required - Users to subscribe to
 */
export const userSubscribeUsersSchema = z.object({
  body: z.object({
    userIds: z.string().array(),
  }),
});

/**
 * Unsubscribe from user data
 * @typedef {object} UnsubscribeUserRequest
 * @property {string[]} userIds.required - Users to unsubscribe from
 */
export const userUnsubscribeUsersSchema = z.object({
  body: z.object({
    userIds: z.string().array(),
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
