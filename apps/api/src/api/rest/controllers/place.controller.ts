import type { Request, Response } from "express";
import { placeRepository } from "../../../application/repositories/place/place.repostory";
import { handleRepositoryErrors, parseRequest } from "../../../utils";
import { createPlaceSchema, deletePlaceSchema, updatePlaceSchema } from "../validationSchemas/place.validationSchema";

export const placeController = {
  /*
   * Create a new place
   * @param req Request object
   * @param res Response object
   */
  async createPlace(req: Request, res: Response) {
    const request = await parseRequest(createPlaceSchema, req, res);
    if (!request) return;

    const result = await placeRepository.create({
      ...request.body,
      createdById: req.user.sub,
    });
    if (result.isErr) {
      handleRepositoryErrors(result.error, res);
      return;
    }

    return res.status(201).json(result.value);
  },

  // Get all places
  ///TODO: Add filtering and paging
  async getAllPlaces(_req: Request, res: Response) {
    const result = await placeRepository.getAll();
    if (result.isErr) {
      handleRepositoryErrors(result.error, res);
      return;
    }

    return res.status(200).json(result.value);
  },

  /*
   * Update place
   * @param req Request object
   * @param res Response object
   */
  async updatePlace(req: Request, res: Response) {
    const request = await parseRequest(updatePlaceSchema, req, res);
    if (!request) return;

    // Check if executor is the creator of the place
    const isOwner = await placeRepository.isOwner(request.params.id, req.user.sub);
    if (!isOwner) {
      return res.status(403).send();
    }

    // Update place
    const result = await placeRepository.update(request.params.id, request.body);
    if (result.isErr) {
      handleRepositoryErrors(result.error, res);
      return;
    }

    return res.status(200).json(result.value);
  },

  /*
   * Update place image
   * @param req Request object
   * @param res Response object
   */
  async updatePlaceImage(req: Request, res: Response) {
    const updatedPlace = await placeRepository.updateImage(req.imageId, req.finalImageName);
    return res.status(200).json(updatedPlace);
  },

  /*
   * Delete place
   * @param req Request object
   * @param res Response object
   */
  async deletePlace(req: Request, res: Response) {
    const request = await parseRequest(deletePlaceSchema, req, res);
    if (!request) return;

    // check if executor is the creator of the place
    const isOwner = await placeRepository.isOwner(request.params.id, req.user.sub);
    if (!isOwner) {
      return res.status(403).send();
    }

    const result = await placeRepository.delete(request.params.id);
    if (result.isErr) {
      handleRepositoryErrors(result.error, res);
      return;
    }

    return res.status(204).send();
  },
};
