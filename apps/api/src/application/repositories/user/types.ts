import type { User } from "../../../types";

export type NewUser = Omit<User, "id" | "bio" | "profilePicture" | "lastActive" | "lastPosition"> & {
  password: string;
};

export type UpdateUser = Omit<User, "id" | "email" | "profilePicture">;

export type UserWithPassword = User & {
  password: string;
};
