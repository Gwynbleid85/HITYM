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
