import type { User } from "../../types";

export type NewUser = Omit<User, "id"> & {
  password: string;
};

export type UpdateUser = Omit<User, "id" | "email" | "profilePicture">;
