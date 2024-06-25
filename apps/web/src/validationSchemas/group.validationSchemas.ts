import { z } from "zod";

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB in bytes
const ACCEPTED_FILE_TYPES = ["image/jpeg", "image/png"];

// Create group schema
export const createGroupSchema = z.object({
  name: z
    .string()
    .min(2, { message: "Name must be at least 2 characters." })
    .max(50, { message: "Name must be at most 50 characters." }),
  description: z.string().max(500, { message: "Description must be at most 500 characters." }).optional(),
});

// Update group schema
export const updateGroupSchema = z.object({
  name: z
    .string()
    .min(2, { message: "Name must be at least 2 characters." })
    .max(50, { message: "Name must be at most 50 characters." }),
  description: z.string().max(500, { message: "Description must be at most 500 characters." }).optional(),
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
