import { z } from "zod";

export const createGroupEventSchema = z.object({
  name: z.string().min(1).max(255),
  description: z.string().max(255, {}).optional(),
  date: z.date({
    required_error: "Please select a date.",
  }),
  groupId: z.string(),
  placeId: z.string({
    required_error: "Please select a place.",
  })
});

export const updateGroupEventSchema = z.object({
  name: z.string().min(1).max(255),
  description: z.string().min(1).max(255).optional(),
  date: z.date(),
  placeId: z.string(),
});
