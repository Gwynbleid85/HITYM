import { z } from "zod";

export const userRegistrationDataSchema = z.object({
  body: z.object({
    email: z.string().email(),
    password: z.string().min(6),
    name: z.string().min(2),
  }),
});

export const userLoginDataSchema = z.object({
  body: z.object({
    email: z.string().email(),
    password: z.string().min(6),
  }),
});
