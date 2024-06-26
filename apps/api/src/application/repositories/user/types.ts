import type { User } from "../../../types";

export type NewUser = Omit<User, "id" | "bio" | "profilePicture" | "lastActive" | "lastPosition"> & {
  password: string;
};

export type UpdateUser = {
  name: string;
  bio: string | null;
};

export type UserWithPassword = User & {
  password: string;
};

/**
 * User without sensitive data
 * @typedef {object} SimpleUser
 * @property {string} id.required - User ID
 * @property {string} name.required - User name
 * @property {string} profilePicture - User profile picture
 */
export type SimpleUser = Pick<User, "id" | "name" | "profilePicture">;

/**
 * User with status data
 * @typedef {object} UserWithStatus
 * @property {string} id.required - User ID
 * @property {string} name.required - User name
 * @property {string} profilePicture - User profile picture
 * @property {string} bio - User bio
 * @property {string} lastActive - User last active date
 * @property {Position} lastPosition - User last position
 * @property {UserStatusSimple} status.required - User status
 */
export type UserWithStatus = User & {
  status: UserStatusSimple | null;
};

/**
 * User status data
 * @typedef {object} UserStatusSimple
 * @property {string} status.required - User status
 * @property {string} color.required - Status color
 */
export type UserStatusSimple = {
  status: string;
  color: string;
};
