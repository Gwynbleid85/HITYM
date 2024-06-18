import type { Request, Response } from "express";
import { handleRepositoryErrors, parseRequest } from "../../../utils";
import { groupRepository } from "../../../application/repositories/group/group.repository";
import {
  createGroupSchema,
  deleteGroupSchema,
  getGroupByIdSchema,
  getHistoricalEventsSchema,
  removeUserSchema,
  updateGroupSchema,
  updateImageSchema,
} from "../validationSchemas/group.validationSchemas";

export const groupController = {
  /*
   * Create a new group
   * @param req Request object
   * @param res Response object
   */
  async createGroup(req: Request, res: Response) {
    const request = await parseRequest(createGroupSchema, req, res);
    if (!request) return;

    const result = await groupRepository.create({
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
   * Get group by ID
   * @param req Request object
   * @param res Response object
   */
  async getGroupById(req: Request, res: Response) {
    const request = await parseRequest(getGroupByIdSchema, req, res);
    if (!request) return;

    const result = await groupRepository.findById(request.params.id);
    if (result.isErr) {
      handleRepositoryErrors(result.error, res);
      return;
    }

    return res.status(200).json(result.value).send();
  },

  /*
   * Get group by ID with users and events
   * @param req Request object
   * @param res Response object
   */
  async getGroupByIdExtended(req: Request, res: Response) {
    const request = await parseRequest(getGroupByIdSchema, req, res);
    if (!request) return;

    const isMember = await groupRepository.isMember(request.params.id, req.user.sub);
    if (!isMember) {
      return res.status(403).send();
    }

    const result = await groupRepository.findByIdExtended(request.params.id);
    if (result.isErr) {
      handleRepositoryErrors(result.error, res);
      return;
    }

    return res.status(200).json(result.value).send();
  },

  /*
   * Update group
   * @param req Request object
   * @param res Response object
   */
  async updateGroup(req: Request, res: Response) {
    const request = await parseRequest(updateGroupSchema, req, res);
    if (!request) return;

    // Check if user is allowed to delete group
    const isOwner = await groupRepository.isOwner(request.params.id, req.user.sub);
    if (!isOwner) {
      return res.status(403).send();
    }

    // Update group
    const result = await groupRepository.update(request.params.id, request.body);
    if (result.isErr) {
      handleRepositoryErrors(result.error, res);
      return;
    }

    return res.status(200).json(result.value).send();
  },

  /*
   * Update group image
   * @param req Request object
   * @param res Response object
   */
  async updateImage(req: Request, res: Response) {
    const updatedGroup = await groupRepository.updateImage(req.imageId, req.finalImageName);
    return res.status(200).json(updatedGroup).send();
  },

  /*
   * Delete group
   * @param req Request object
   * @param res Response object
   */
  async deleteGroup(req: Request, res: Response) {
    const request = await parseRequest(deleteGroupSchema, req, res);
    if (!request) return;

    // Check if user is allowed to delete group
    const isOwner = await groupRepository.isOwner(request.params.id, req.user.sub);
    if (!isOwner) {
      return res.status(403).send();
    }

    // Delete group
    const result = await groupRepository.delete(request.params.id);
    if (result.isErr) {
      handleRepositoryErrors(result.error, res);
      return;
    }

    return res.status(204).send();
  },

  /*
   * Remove user from group
   * @param req Request object
   * @param res Response object
   */
  async removeUser(req: Request, res: Response) {
    const request = await parseRequest(removeUserSchema, req, res);
    if (!request) return;

    // Check if executer is owner of group
    const isMember = await groupRepository.isOwner(request.params.id, req.user.sub);
    if (!isMember) {
      return res.status(403).send();
    }

    // Remove user from group
    const result = await groupRepository.removeUser(request.params.id, request.params.userId);
    if (result.isErr) {
      handleRepositoryErrors(result.error, res);
      return;
    }

    return res.status(200).json(result.value).send();
  },

  /*
   * Get historical events of a group
   * @param req Request object
   * @param res Response object
   */
  async getHistoricalEvents(req: Request, res: Response) {
    const request = await parseRequest(getHistoricalEventsSchema, req, res);
    if (!request) return;

    // Check if executer is member of group
    const isMember = await groupRepository.isMember(request.params.id, req.user.sub);
    if (!isMember) {
      return res.status(403).send();
    }

    // Get historical events
    const result = await groupRepository.getHistoricalEvents(request.params.id);
    if (result.isErr) {
      handleRepositoryErrors(result.error, res);
      return;
    }

    return res.status(200).json(result.value).send();
  },
};
