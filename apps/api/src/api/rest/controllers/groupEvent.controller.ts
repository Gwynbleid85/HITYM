import type { Request, Response } from "express";
import { handleRepositoryErrors, parseRequest } from "../../../utils";
import {
  createGroupEventSchema,
  deleteGroupEventSchema,
  getGroupEventByIdSchema,
  updateGroupEventSchema,
  updateImageSchema,
} from "../validationSchemas/groupEvent.ValidationSchemas";
import { groupEventRepository } from "../../../application/repositories/groupEvent/groupEvent.repository";
import { groupRepository } from "../../../application/repositories/group/group.repository";

export const groupEventController = {
  /*
   * Create a new group event
   * @param req Request object
   * @param res Response object
   */
  async createGroupEvent(req: Request, res: Response) {
    const request = await parseRequest(createGroupEventSchema, req, res);
    if (!request) return;

    // Check if the executer is a member of the group
    const isMember = await groupRepository.isMember(request.body.groupId, req.user.sub);
    if (isMember) {
      return res.status(403).send();
    }

    // Create the group event
    const result = await groupEventRepository.create({
      ...request.body,
      createdById: req.user.sub,
    });
    if (result.isErr) {
      handleRepositoryErrors(result.error, res);
      return;
    }

    return res.status(201).json(result.value).send();
  },

  /*
   * Get a group event by its ID
   * @param req Request object
   * @param res Response object
   */
  async getGroupEventById(req: Request, res: Response) {
    const request = await parseRequest(getGroupEventByIdSchema, req, res);
    if (!request) return;

    // Check if the user can access the event
    const canAccess = await groupEventRepository.canUserEdit(request.params.id, req.user.sub);
    if (!canAccess) {
      return res.status(403).send();
    }

    // Find the event
    const result = await groupEventRepository.findById(request.params.id);
    if (result.isErr) {
      handleRepositoryErrors(result.error, res);
      return;
    }

    return res.status(200).json(result.value).send();
  },

  /*
   * Update a group event
   * @param req Request object
   * @param res Response object
   */
  async updateGroupEvent(req: Request, res: Response) {
    const request = await parseRequest(updateGroupEventSchema, req, res);
    if (!request) return;

    // Check if the user can access the event
    const canAccess = await groupEventRepository.canUserEdit(request.params.id, req.user.sub);
    if (!canAccess) {
      return res.status(403).send();
    }

    // Update the event
    const result = await groupEventRepository.update(request.params.id, request.body);
    if (result.isErr) {
      handleRepositoryErrors(result.error, res);
      return;
    }

    return res.status(200).json(result.value).send();
  },

  /*
   * Update an event image
   * @param req Request object
   * @param res Response object
   */
  async updateGroupEventImage(req: Request, res: Response) {
    const request = await parseRequest(updateImageSchema, req, res);
    if (!request) return;

    // Check if the user can access the event
    const canAccess = await groupEventRepository.canUserEdit(request.params.id, req.user.sub);
    if (!canAccess) {
      return res.status(403).send();
    }

    // Update the event
    const result = await groupEventRepository.updateImage(request.params.id, request.body.imageUrl);
    if (result.isErr) {
      handleRepositoryErrors(result.error, res);
      return;
    }

    return res.status(200).json(result.value).send();
  },

  // Delete an event
  // @param id The ID of the event
  async deleteGroupEvent(req: Request, res: Response) {
    const request = await parseRequest(deleteGroupEventSchema, req, res);
    if (!request) return;

    // Check if the user can access the event
    const canAccess = await groupEventRepository.canUserEdit(request.params.id, req.user.sub);
    if (!canAccess) {
      return res.status(403).send();
    }

    // Delete the event
    const result = await groupEventRepository.delete(request.params.id);
    if (result.isErr) {
      handleRepositoryErrors(result.error, res);
      return;
    }

    return res.status(204).send();
  },
};
