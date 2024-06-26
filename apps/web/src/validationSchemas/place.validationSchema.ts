import { z } from "zod";

// Define the schema for creating a place
export const createPlaceSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters long").max(50, "Name must be at most 50 characters long"),
  description: z.string().max(500, "Description must be at most 500 characters long").optional(),
  imageUrl: z.string().optional(),
  position: z.object({
    latitude: z.coerce
      .number({
        invalid_type_error: "Latitude must be a number",
      })
      .refine((value) => value >= -90 && value <= 90, "Latitude must be between -90 and 90"), // Add range check
    longitude: z.coerce
      .number({
        invalid_type_error: "Longitude must be a number",
      })
      .refine((value) => value >= -180 && value <= 180, "Longitude must be between -180 and 180"), // Add range check
  }),
});

export const updatePlaceSchema = z.object({
  name: z.string().min(2),
  description: z.string().nullable(),
  position: z.object({
    latitude: z.number(),
    longitude: z.number(),
  }),
});
