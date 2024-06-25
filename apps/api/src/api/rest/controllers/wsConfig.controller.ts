import { userWsConfigRepository } from "../../../application/repositories/userWebsocketConfig/userWebsocketConfig.repository";
import type {
  UserSharedPositionWithGroup,
  UserUnsharedPositionWithGroup,
  UserUnsubscribedUserInfo,
  UserSubscribedUserInfo,
} from "../../../core/Events";
import { userSubscribedUserInfoHandler } from "../../../application/eventHandlers/userSubscribedUserInfoHandler";
import {
  userSharePositionWithGroupSchema,
  userSubscribeGroupSchema,
  userUnsharePositionWithGroupSchema,
  userUnsubscribeGroupSchema,
} from "../validationSchemas/wsConfig.validationSchemas";
import type { Request, Response } from "express";
import { handleRepositoryErrors, parseRequest } from "../../../utils";
import { UserUnsubscribedUserInfoHandler } from "../../../application/eventHandlers/userUnsubscribedUserInfoHandler";
import { userSharedPositionWithGroupHandler } from "../../../application/eventHandlers/userSharedPositionWithGroupHandler";
import { userUnsharedPositionWithGroupHandler } from "../../../application/eventHandlers/userUnsharedPositionWithGroupHandler";
import { groupRepository } from "../../../application/repositories/group/group.repository";

export const wsConfigController = {
  /*
   * Subscribe to group position
   * @param req Request object
   * @param res Response object
   */
  async subscribeToGroupPosition(req: Request, res: Response) {
    const request = await parseRequest(userSubscribeGroupSchema, req, res);
    if (!request) return;

    const groupId = request.body.groupId;

    // Check if user can access the requested users
    const isMember = await groupRepository.isMember(groupId, req.user.sub);
    if (!isMember) {
      return res.status(403).json({ message: "User does not have access to requested group", name: "Forbidden" });
    }

    // Subscribe to user
    const result = await userWsConfigRepository.FollowGroupPosition(req.user.sub, groupId);
    if (result.isErr) {
      handleRepositoryErrors(result.error, res);
      return;
    }

    ///TODO: Use message bus to notify other services
    await userSubscribedUserInfoHandler({
      type: "userSubscribedUserinfo",
      data: {
        userId: req.user.sub,
        usersToSubscribe: result.value,
      },
    } as UserSubscribedUserInfo);

    return res.status(204).send();
  },

  /*
   * Unsubscribe to group position
   * @param req Request object
   * @param res Response object
   */
  async unsubscribeToGroupPosition(req: Request, res: Response) {
    const request = await parseRequest(userUnsubscribeGroupSchema, req, res);
    if (!request) return;

    const groupId = request.body.groupId;

    // Unsubscribe to user
    const result = await userWsConfigRepository.UnfollowGroupPosition(req.user.sub, groupId);
    if (result.isErr) {
      handleRepositoryErrors(result.error, res);
      return;
    }

    ///TODO: Use message bus to notify other services
    await UserUnsubscribedUserInfoHandler({
      type: "userUnsubscribedUserInfo",
      data: {
        userId: req.user.sub,
        usersToUnsubscribe: result.value,
      },
    } as UserUnsubscribedUserInfo);

    return res.status(204).send();
  },

  /*
   * Share position with group
   * @param req Request object
   * @param res Response object
   */
  async sharePositionWithGroup(req: Request, res: Response) {
    const request = await parseRequest(userSharePositionWithGroupSchema, req, res);
    if (!request) return;

    // Share position with group
    const result = await userWsConfigRepository.SharePositionWithGroup(req.user.sub, request.body.groupId);
    if (result.isErr) {
      handleRepositoryErrors(result.error, res);
      return;
    }

    ///TODO: Use message bus to notify other services
    userSharedPositionWithGroupHandler({
      type: "userSharedPositionWithGroup",
      data: {
        userId: req.user.sub,
        groupId: request.body.groupId,
        groupMembers: result.value,
      },
    } as UserSharedPositionWithGroup);

    return res.status(204).send();
  },

  /*
   * Unshare position with group
   * @param req Request object
   * @param res Response object
   */
  async unsharePositionWithGroup(req: Request, res: Response) {
    const request = await parseRequest(userUnsharePositionWithGroupSchema, req, res);
    if (!request) return;

    // Unshare position with group
    const result = await userWsConfigRepository.UnsharePositionsWithGroup(req.user.sub, request.body.groupId);
    if (result.isErr) {
      handleRepositoryErrors(result.error, res);
      return;
    }

    ///TODO: Use message bus to notify other services
    userUnsharedPositionWithGroupHandler({
      type: "userUnsharedPositionWithGroup",
      data: {
        userId: req.user.sub,
        groupId: request.body.groupId,
        groupMembers: result.value,
      },
    } as UserUnsharedPositionWithGroup);

    return res.status(204).send();
  },

  /*
   * Get position sharing config
   * @param req Request object
   * @param res Response object
   */
  async getPositionSharingConfig(req: Request, res: Response) {
    const result = await userWsConfigRepository.GetUserConfig(req.user.sub);
    if (result.isErr) {
      handleRepositoryErrors(result.error, res);
      return;
    }
    return res.status(200).json(result.value);
  },
};
