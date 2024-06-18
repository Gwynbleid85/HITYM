import { Router } from "express";

import { userController } from "../controllers/user.controller";
import auth from "../../../application/middlewares/auth";

const userRouter = Router();

/**
 * POST /users/registration
 * @summary Create new user
 * @tags user
 * @param {UserRegistrationRequest} request.body.required - User registration data
 * @return {User} 200 - success response - application/json
 * @return {Error} 400 - Bad request response - application/json
 */
userRouter.post("/registration", userController.registerUser);

/**
 * POST /users/login
 * @summary Login user
 * @tags user
 * @param {UserLoginRequest} request.body.required - User login data
 * TODO: FIx the response type
 * @return {UserLoginResult} 200 - success response - application/json
 * @return {Error} 400 - Bad request response - application/json
 */
userRouter.post("/login", userController.loginUser);

/**
 * GET /users/test/authorization
 * @summary Test authorization
 * @tags test
 * @security BearerAuth
 * @return {string} 200 - success response - application/json
 * @return {Error} 401 - Unauthorized response - application/json
 */
userRouter.get("/test/authorization", auth, userController.testAuthorization);

/**
 * DELETE /users/:id
 * @summary Delete user
 * @tags user
 * @security BearerAuth
 * @return {string} 204 - success response
 * @return {Error} 400 - Bad request response - application/json
 * @return {Error} 401 - Unauthorized response - application/json
 */
userRouter.delete("/", auth, userController.deleteUser);

/**
 * PUT /users/:id
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
 * PUT /user/password
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
 * PUT /user/profilePicture
 * @summary Update user profile picture
 * @tags user
 * @security BearerAuth
 * @param {UpdateProfilePictureRequest} request.body.required - User profile picture data
 * @return {User} 200 - success response - application/json
 * @return {Error} 400 - Bad request response - application/json
 * @return {Error} 401 - Unauthorized response - application/json
 */
userRouter.put("/profilePicture", auth, userController.updateProfilePicture);

/**
 * POST /user/user-status
 * @summary Update user status
 * @tags user
 * @security BearerAuth
 * @param {UpdateUserStatusRequest} request.body.required - User status data
 * @return {User} 200 - success response - application/json
 * @return {Error} 400 - Bad request response - application/json
 * @return {Error} 401 - Unauthorized response - application/json
 */
userRouter.post("/user-status", auth, userController.updateUserStatus);

/**
 * DELETE /user/user-status
 * @summary Delete user status
 * @tags user
 * @security BearerAuth
 * @return {string} 204 - success response
 * @return {Error} 400 - Bad request response - application/json
 * @return {Error} 401 - Unauthorized response - application/json
 */
userRouter.delete("/user-status", auth, userController.deleteUserStatus);

/**
 * GET /user/places
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
 * GET /user/places/favorites
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
 * POST /user/places/favorites
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
 * DELETE /user/places/favorites/:placeId
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
 * GET /user/groups
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
 * GET /user/groups/invites
 * @summary Get user invites
 * @tags groupInvite
 * @security BearerAuth
 * @return {Array.<GroupInviteExtended>} 200 - success response - application/json
 * @return {Error} 401 - Unauthorized response - application/json
 */
userRouter.get("/groups/invites", auth, userController.getUserInvites);

export default userRouter;
