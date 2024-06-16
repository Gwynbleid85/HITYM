import type { GroupEvent } from "../../../types";

export type NewGroupEvent = Omit<GroupEvent, "id" | "imageUrl">;

export type GroupEventUpdate = {
  name: string;
  description: string | null;
  date: Date;
  placeId: string;
};
