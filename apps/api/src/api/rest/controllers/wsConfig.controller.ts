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
  userSubscribeUsersSchema,
  userUnsharePositionWithGroupSchema,
  userUnsubscribeUsersSchema,
} from "../validationSchemas/wsConfig.validationSchemas";
import type { Request, Response } from "express";
import { handleRepositoryErrors, parseRequest } from "../../../utils";
import { UserUnsubscribedUserInfoHandler } from "../../../application/eventHandlers/userUnsubscribedUserInfoHandler";
import { userSharedPositionWithGroupHandler } from "../../../application/eventHandlers/userSharedPositionWithGroupHandler";
import { userUnsharedPositionWithGroupHandler } from "../../../application/eventHandlers/userUnsharedPositionWithGroupHandler";
import { groupRepository } from "../../../application/repositories/group/group.repository";

export const wsConfigController = {
  /*
   * Subscribe to users position
   * @param req Request object
   * @param res Response object
   */
  async subscribeToUserPosition(req: Request, res: Response) {
    const request = await parseRequest(userSubscribeUsersSchema, req, res);
    if (!request) return;

    // Check if user can access the requested users
    const possiblyAccessedUsers = await groupRepository.getAllUsersUserHasAccessTo(req.user.sub);
    if (possiblyAccessedUsers.isErr) {
      handleRepositoryErrors(possiblyAccessedUsers.error, res);
      return;
    }
    const possiblyAccessedUsersIds = possiblyAccessedUsers.value;
    if (!request.body.userIds.every((userId) => possiblyAccessedUsersIds.includes(userId))) {
      return res.status(403).json({ message: "User does not have access to requested users", name: "Forbidden" });
    }

    // Subscribe to user
    const result = await userWsConfigRepository.FollowUserPosition(req.user.sub, request.body.userIds);
    if (result.isErr) {
      handleRepositoryErrors(result.error, res);
      return;
    }

    ///TODO: Use message bus to notify other services
    userSubscribedUserInfoHandler({
      type: "userSubscribedUserinfo",
      data: {
        userId: req.user.sub,
        usersToSubscribe: request.body.userIds,
      },
    } as UserSubscribedUserInfo);

    return res.status(204).send();
  },

  /*
   * Unsubscribe to users position
   * @param req Request object
   * @param res Response object
   */
  async unsubscribeToUserPosition(req: Request, res: Response) {
    const request = await parseRequest(userUnsubscribeUsersSchema, req, res);
    if (!request) return;

    // Unsubscribe to user
    const result = await userWsConfigRepository.UnfollowUserPosition(req.user.sub, request.body.userIds);
    if (result.isErr) {
      handleRepositoryErrors(result.error, res);
      return;
    }

    ///TODO: Use message bus to notify other services
    UserUnsubscribedUserInfoHandler({
      type: "userUnsubscribedUserInfo",
      data: {
        userId: req.user.sub,
        usersToUnsubscribe: request.body.userIds,
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
};
