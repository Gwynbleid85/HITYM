import type { Group } from "../../types";

export type NewGroup = Omit<Group, "id" | "imageUrl">;

export type GroupUpdate = {
  name: string;
  description: string;
};
