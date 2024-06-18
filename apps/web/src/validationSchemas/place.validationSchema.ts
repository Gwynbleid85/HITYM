import { z } from "zod";

/**
 * Create a new place
 * @typedef {object} CreatePlaceRequest
 * @property {string} name.required - Place name
 * @property {string} description - Place description
 * @property {string} imageUrl - Place image url
 * @property {Position} position.required - Place position
 */
export const createPlaceSchema = z.object({
  body: z.object({
    name: z.string().min(2),
    description: z.string().nullable(),
    imageUrl: z.string().nullable(),
    position: z.object({
      latitude: z.number(),
      longitude: z.number(),
    }),
  }),
});

/**
 * Update a place
 * @typedef {object} UpdatePlaceRequest
 * @property {string} name - Place name
 * @property {string} description - Place description
 * @property {Position} position - Place position
 */
export const updatePlaceSchema = z.object({
  params: z.object({
    id: z.string(),
  }),
  body: z.object({
    name: z.string().min(2),
    description: z.string().nullable(),
    position: z.object({
      latitude: z.number(),
      longitude: z.number(),
    }),
  }),
});

/**
 * Update place image
 * @typedef {object} UpdateImageRequest
 * @property {string} imageUrl - Image URL
 */
export const updatePlaceImageSchema = z.object({
  params: z.object({
    id: z.string(),
  }),
  body: z.object({
    imageUrl: z.string(),
  }),
});

export const deletePlaceSchema = z.object({
  params: z.object({
    id: z.string(),
  }),
});
