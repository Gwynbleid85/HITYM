import type { Place } from "../../../types";

export type NewPlace = Omit<Place, "id">;

export type UpdatePlace = Omit<NewPlace, "imageUrl" | "createdById">;
