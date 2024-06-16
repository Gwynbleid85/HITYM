import type { Group, GroupEvent, User } from "../../../types";

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
 * @property {User[]} users - Group users
 * @property {GroupEvent[]} groupEvents - Group events
 */
export type GroupExtended = Group & {
  users: User[];
  groupEvents: GroupEvent[];
};
