import type { GroupEvent } from "../../../types";

export type NewGroupEvent = Omit<GroupEvent, "id">;

export type GroupEventUpdate = {
  name: string;
  description: string;
  date: Date;
  placeId: string;
};
