import { z } from "zod";

const MAX_FILE_SIZE = 5000000;
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp"];

/**
 * Update/upload image
 * @typedef {object} UpdateImageRequest
 * @property {string} image.required - New image to upload - binary
 */
export const updateSingleImageSchema = z.object({
  // image: z.instanceof(File),
  // .refine((file) => {
  //   console.log(file?.size);
  //   return file?.size <= MAX_FILE_SIZE, `Max image size is 5MB.`;
  // })
  // .refine((file) => {
  //   console.log(file?.type);
  //   return ACCEPTED_IMAGE_TYPES.includes(file?.type), "Only .jpg, .jpeg, .png and .webp formats are supported.";
  // }),
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
  // image: z
  //   .any()
  //   .refine((file) => file?.size <= MAX_FILE_SIZE, `Max image size is 5MB.`)
  //   .refine(
  //     (file) => ACCEPTED_IMAGE_TYPES.includes(file?.type),
  //     "Only .jpg, .jpeg, .png and .webp formats are supported."
  //   ),
});
