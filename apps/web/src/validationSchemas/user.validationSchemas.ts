import { z } from "zod";

const MAX_FILE_SIZE = 3 * 1024 * 1024; // 5MB in bytes
const ACCEPTED_FILE_TYPES = ["image/jpeg", "image/png"];

// User validation schemas
export const userRegistrationDataSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6, { message: "Password must be at least 6 characters" }),
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
});

export const userLoginDataSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6, { message: "Password must be at least 6 characters" }),
});

export const updateUserSchema = z.object({
  name: z
    .string()
    .min(2, { message: "Name must be at least 2 characters." })
    .max(50, { message: "Name must be at most 50 characters." }),
  bio: z.string().max(500, { message: "Bio must be at most 500 characters." }).optional(),
  image: z
    .instanceof(FileList)
    .optional() // Make the image field optional
    .refine((fileList) => {
      if (fileList && fileList[0]) {
        const file = fileList[0];
        return ACCEPTED_FILE_TYPES.includes(file.type);
      }
      return true;
    }, "Only jpg and png files are accepted.")
    .refine((fileList) => {
      if (fileList && fileList[0]) {
        const file = fileList[0];
        return file.size <= MAX_FILE_SIZE;
      }
      return true;
    }, "File size must not exceed 5MB."),
});

export const updatePasswordSchema = z.object({
  password: z.string().min(6),
});

export const updateUserStatusSchema = z.object({
  status: z.string().max(50, { message: "Status must be at most 50 characters." }),
  color: z.string(),
});

export const addFavoritePlaceSchema = z.object({
  placeId: z.string(),
});
