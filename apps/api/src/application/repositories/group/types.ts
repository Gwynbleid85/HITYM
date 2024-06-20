import type { Group, GroupEvent } from "../../../types";
import type { UserWithStatus } from "../user/types";

export type NewGroup = Omit<Group, "id" | "imageUrl">;

export type GroupUpdate = Omit<NewGroup, "createdById">;

/**
 * Group with users and events
 * @typedef {object} GroupExtended
 * @property {string} id.required - Group ID
 * @property {string} name.required - Group name
 * @property {string} description.required - Group description
 * @property {string} imageUrl.required - Group image URL
 * @property {string} createdById.required - User ID of the creator
 * @property {UserWithStatus[]} users - Group users with status
 * @property {GroupEvent[]} groupEvents - Group events
 */
export type GroupExtended = Group & {
  users: UserWithStatus[];
  groupEvents: GroupEvent[];
};
