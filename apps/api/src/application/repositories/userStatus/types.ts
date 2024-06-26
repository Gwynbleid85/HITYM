import type { UserStatus } from "../../../types";

export type NewUserStatus = Omit<UserStatus, "id" | "userId">;
