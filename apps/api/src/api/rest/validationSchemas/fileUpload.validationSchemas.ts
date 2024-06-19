import { z } from "zod";

const MAX_FILE_SIZE = 5000000;
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp"];

/**
 * Update/upload image
 * @typedef {object} UpdateImageRequest
 * @property {string} image.required - New image to upload - binary
 */
export const updateSingleImageSchema = z.object({
  // image: z
  //   .any()
  //   .refine((files) => files?.length === 1, "Image is required.") // if no file files?.length === 0, if file files?.length === 1
  //   .refine((files) => files?.[0]?.size >= MAX_FILE_SIZE, `Max file size is 5MB.`) // this should be greater than or equals (>=) not less that or equals (<=)
  //   .refine(
  //     (files) => ACCEPTED_IMAGE_TYPES.includes(files?.[0]?.type),
  //     ".jpg, .jpeg, .png and .webp files are accepted."
  //   ),
});

/**
 * Update image with ID
 * @typedef {object} UpdateImageWithIdRequest
 * @property {string} image.required - New image to upload - binary
 */
export const updateImageWithIdSchema = z.object({
  params: z.object({
    id: z.string().uuid(),
  }),
  body: z.object({
    image: z
      .any()
      .refine((file) => file?.size <= MAX_FILE_SIZE, `Max image size is 5MB.`)
      .refine(
        (file) => ACCEPTED_IMAGE_TYPES.includes(file?.type),
        "Only .jpg, .jpeg, .png and .webp formats are supported."
      ),
  }),
});
