import { Router } from "express";

import { userController } from "../controllers/user.controller";
import { wsConfigController } from "../controllers/wsConfig.controller";
import auth from "../../../application/middlewares/auth";
import uploadSingleFile from "../../../application/middlewares/fileUpload";

const userRouter = Router();

/**
 * POST /api/user/registration
 * @summary Create new user
 * @tags user
 * @param {UserRegistrationRequest} request.body.required - User registration data
 * @return {User} 200 - success response - application/json
 * @return {Error} 400 - Bad request response - application/json
 */
userRouter.post("/registration", userController.registerUser);

/**
 * POST /api/user/login
 * @summary Login user
 * @tags user
 * @param {UserLoginRequest} request.body.required - User login data
 * @return {UserLoginResult} 200 - success response - application/json
 * @return {Error} 400 - Bad request response - application/json
 */
userRouter.post("/login", userController.loginUser);

/**
 * GET /api/user
 * @summary Get user data
 * @tags user
 * @security BearerAuth
 * @return {User} 200 - success response - application/json
 * @return {Error} 401 - Unauthorized response - application/json
 * @return {Error} 404 - Not Found response - application/json
 */
userRouter.get("/", auth, userController.getUser);

/**
 * GET /api/user/test/authorization
 * @summary Test authorization
 * @tags test
 * @security BearerAuth
 * @return {string} 200 - success response - application/json
 * @return {Error} 401 - Unauthorized response - application/json
 */
userRouter.get("/test/authorization", auth, userController.testAuthorization);

/**
 * DELETE /api/user
 * @summary Delete user
 * @tags user
 * @security BearerAuth
 * @return  204 - success response
 * @return {Error} 400 - Bad request response - application/json
 * @return {Error} 401 - Unauthorized response - application/json
 */
userRouter.delete("/", auth, userController.deleteUser);

/**
 * PUT /api/user
 * @summary Update user
 * @tags user
 * @security BearerAuth
 * @param {UpdateUserRequest} request.body.required - User data
 * @return {User} 200 - success response - application/json
 * @return {Error} 400 - Bad request response - application/json
 * @return {Error} 401 - Unauthorized response - application/json
 */
userRouter.put("/", auth, userController.updateUser);

/**
 * PUT /api/user/password
 * @summary Update user password
 * @tags user
 * @security BearerAuth
 * @param {UpdatePasswordRequest} request.body.required - User password data
 * @return {User} 200 - success response - application/json
 * @return {Error} 400 - Bad request response - application/json
 * @return {Error} 401 - Unauthorized response - application/json
 */
userRouter.put("/password", auth, userController.updatePassword);

/**
 * PUT /api/user/profilePicture
 * @summary Update user profile picture
 * @tags user
 * @security BearerAuth
 * @param {UpdateImageRequest} request.body.required - User profile picture data - multipart/form-data
 * @return {User} 200 - success response - application/json
 * @return {Error} 400 - Bad request response - application/json
 * @return {Error} 401 - Unauthorized response - application/json
 */
userRouter.put("/profilePicture", auth, uploadSingleFile("profilePictures"), userController.updateProfilePicture);

/**
 * POST /api/user/user-status
 * @summary Update user status
 * @tags user
 * @security BearerAuth
 * @param {UpdateUserStatusRequest} request.body.required - User status data
 * @return {UserStatus} 201 - success response - application/json
 * @return {Error} 400 - Bad request response - application/json
 * @return {Error} 401 - Unauthorized response - application/json
 */
userRouter.post("/user-status", auth, userController.updateUserStatus);

/**
 * DELETE /api/user/user-status
 * @summary Delete user status
 * @tags user
 * @security BearerAuth
 * @return {string} 204 - success response
 * @return {Error} 400 - Bad request response - application/json
 * @return {Error} 401 - Unauthorized response - application/json
 */
userRouter.delete("/user-status", auth, userController.deleteUserStatus);

/**
 * GET /api/user/places
 * @summary Get all places created by user
 * @tags user
 * @security BearerAuth
 * @return {Array.<Place>} 200 - success response - application/json
 * @return {Error} 400 - Bad request response - application/json
 * @return {Error} 401 - Unauthorized response - application/json
 * @return {Error} 403 - Forbidden response - application/json
 */
userRouter.get("/places", auth, userController.getOwnedPlaces);

/**
 * GET /api/user/places/favorites
 * @summary Get all favorite places of user
 * @tags user
 * @security BearerAuth
 * @return {Array.<Place>} 200 - success response - application/json
 * @return {Error} 400 - Bad request response - application/json
 * @return {Error} 401 - Unauthorized response - application/json
 * @return {Error} 403 - Forbidden response - application/json
 */
userRouter.get("/places/favorites", auth, userController.getFavoritePlaces);

/**
 * POST /api/user/places/favorites
 * @summary Add favorite place
 * @tags user
 * @security BearerAuth
 * @param {AddFavoritePlaceRequest} request.body.required - Favorite place data
 * @return {User} 200 - success response - application/json
 * @return {Error} 400 - Bad request response - application/json
 * @return {Error} 401 - Unauthorized response - application/json
 * @return {Error} 403 - Forbidden response - application/json
 */
userRouter.post("/places/favorites", auth, userController.addFavoritePlace);

/**
 * DELETE /api/user/places/favorites/{placeId}
 * @summary Remove favorite place
 * @tags user
 * @security BearerAuth
 * @param {string} placeId.path.required - Place ID
 * @return {User} 200 - success response - application/json
 * @return {Error} 400 - Bad request response - application/json
 * @return {Error} 401 - Unauthorized response - application/json
 * @return {Error} 403 - Forbidden response - application/json
 */
userRouter.delete("/places/favorites/:placeId", auth, userController.removeFavoritePlace);

/**
 * GET /api/user/groups
 * @summary Get all groups user is member of
 * @tags user
 * @security BearerAuth
 * @return {Array.<Group>} 200 - success response - application/json
 * @return {Error} 400 - Bad request response - application/json
 * @return {Error} 401 - Unauthorized response - application/json
 * @return {Error} 403 - Forbidden response - application/json
 */
userRouter.get("/groups", auth, userController.getUserGroups);

/**
 * GET /api/user/groups/invites
 * @summary Get user invites
 * @tags group-invite
 * @security BearerAuth
 * @return {Array.<GroupInviteExtended>} 200 - success response - application/json
 * @return {Error} 401 - Unauthorized response - application/json
 */
userRouter.get("/groups/invites", auth, userController.getUserInvites);

/**
 * POST /api/user/groups/invites/{id}/accept
 * @summary Accept group invite
 * @tags group-invite
 * @security BearerAuth
 * @param {string} request.params.id.required - Invite ID
 * @return  201 - success response - application/json
 * @return {Error} 401 - Unauthorized response - application/json
 * @return {Error} 404 - Not Found response - application/json
 */
userRouter.post("/groups/invites/:id/accept", auth, userController.acceptGroupInvite);

/**
 * DELETE /api/user/groups/invites/{id}
 * @summary Decline group invite
 * @tags group-invite
 * @security BearerAuth
 * @param {string} request.params.id.required - Invite ID
 * @return  204 - success response - application/json
 * @return {Error} 401 - Unauthorized response - application/json
 * @return {Error} 404 - Not Found response - application/json
 */
userRouter.delete("/groups/invites/:id", auth, userController.declineGroupInvite);

/**
 * POST /api/user/position-sharing/subscriptions
 * @summary Subscribe to group positions
 * @tags position-sharing
 * @security BearerAuth
 * @param {SubscribeGroupRequest} request.body.required - Group to subscribe to
 * @return  204 - success response
 * @return {Error} 400 - Bad request response - application/json
 * @return {Error} 401 - Unauthorized response - application/json
 * @return {Error} 404 - Not Found response - application/json
 */
userRouter.post("/position-sharing/subscriptions", auth, wsConfigController.subscribeToGroupPosition);

/**
 * DELETE /api/user/position-sharing/subscriptions
 * @summary Unsubscribe from group positions
 * @tags position-sharing
 * @security BearerAuth
 * @param {UnsubscribeGroupRequest} request.body.required - Group to unsubscribe from
 * @return  204 - success response
 * @return {Error} 400 - Bad request response - application/json
 * @return {Error} 401 - Unauthorized response - application/json
 * @return {Error} 404 - Not Found response - application/json
 */
userRouter.delete("/position-sharing/subscriptions", auth, wsConfigController.unsubscribeToGroupPosition);

/**
 * POST /api/user/position-sharing/share-with/groups
 * @summary Share position with group
 * @tags position-sharing
 * @security BearerAuth
 * @param {SharePositionWithGroupRequest} request.body.required - Group to share position with
 * @return  204 - success response
 * @return {Error} 400 - Bad request response - application/json
 * @return {Error} 401 - Unauthorized response - application/json
 * @return {Error} 404 - Not Found response - application/json
 */
userRouter.post("/position-sharing/share-with/groups", auth, wsConfigController.sharePositionWithGroup);

/**
 * DELETE /api/user/position-sharing/share-with/groups
 * @summary Unshare position with group
 * @tags position-sharing
 * @security BearerAuth
 * @param {UnsharePositionWithGroupRequest} request.body.required - Group to unshare position with
 * @return  204 - success response
 * @return {Error} 400 - Bad request response - application/json
 * @return {Error} 401 - Unauthorized response - application/json
 * @return {Error} 404 - Not Found response - application/json
 */
userRouter.delete("/position-sharing/share-with/groups", auth, wsConfigController.unsharePositionWithGroup);

/**
 * GET /api/user/position-sharing/config
 * @summary Get position sharing config
 * @tags position-sharing
 * @security BearerAuth
 * @return {PositionSharingConfig} 200 - success response - application/json
 * @return {Error} 400 - Bad request response - application/json
 * @return {Error} 401 - Unauthorized response - application/json
 */
userRouter.get("/position-sharing/config", auth, wsConfigController.getPositionSharingConfig);

export default userRouter;
