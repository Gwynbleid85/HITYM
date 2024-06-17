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
 * @return {User} 200 - success response - application/json
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
 * @param {string} id.path.required - User ID
 * @return {string} 204 - success response
 * @return {Error} 400 - Bad request response - application/json
 * @return {Error} 401 - Unauthorized response - application/json
 */
userRouter.delete("/:id", auth, userController.deleteUser);

/**
 * GET /users
 * @summary Get all users
 * @tags user
 * @security BearerAuth
 * @return {Array.<SimpleUser>} 200 - success response - application/json
 * @return {Error} 401 - Unauthorized response - application/json
 */
userRouter.get("/", auth, userController.getAllUsers);

/**
 * PUT /users/:id
 * @summary Update user
 * @tags user
 * @security BearerAuth
 * @param {string} id.path.required - User ID
 * @param {UpdateUserRequest} request.body.required - User data
 * @return {User} 200 - success response - application/json
 * @return {Error} 400 - Bad request response - application/json
 * @return {Error} 401 - Unauthorized response - application/json
 */
userRouter.put("/:id", auth, userController.updateUser);

/**
 * PUT /users/:id/password
 * @summary Update user password
 * @tags user
 * @security BearerAuth
 * @param {string} id.path.required - User ID
 * @param {UpdatePasswordRequest} request.body.required - User password data
 * @return {User} 200 - success response - application/json
 * @return {Error} 400 - Bad request response - application/json
 * @return {Error} 401 - Unauthorized response - application/json
 */
userRouter.put("/:id/password", auth, userController.updatePassword);

/**
 * PUT /users/:id/profilePicture
 * @summary Update user profile picture
 * @tags user
 * @security BearerAuth
 * @param {string} id.path.required - User ID
 * @param {UpdateProfilePictureRequest} request.body.required - User profile picture data
 * @return {User} 200 - success response - application/json
 * @return {Error} 400 - Bad request response - application/json
 * @return {Error} 401 - Unauthorized response - application/json
 */
userRouter.put("/:id/profilePicture", auth, userController.updateProfilePicture);

/**
 * POST /users/:id/user-status
 * @summary Update user status
 * @tags user
 * @security BearerAuth
 * @param {string} id.path.required - User ID
 * @param {UpdateUserStatusRequest} request.body.required - User status data
 * @return {User} 200 - success response - application/json
 * @return {Error} 400 - Bad request response - application/json
 * @return {Error} 401 - Unauthorized response - application/json
 */
userRouter.post("/:id/user-status", auth, userController.updateUserStatus);

/**
 * DELETE /users/:id/user-status
 * @summary Delete user status
 * @tags user
 * @security BearerAuth
 * @param {string} id.path.required - User ID
 * @return {string} 204 - success response
 * @return {Error} 400 - Bad request response - application/json
 * @return {Error} 401 - Unauthorized response - application/json
 */
userRouter.delete("/:id/user-status", auth, userController.deleteUserStatus);

/**
 * GET /users/:id/places
 * @summary Get all places created by user
 * @tags user
 * @security BearerAuth
 * @param {string} id.path.required - User ID
 * @return {Array.<Place>} 200 - success response - application/json
 * @return {Error} 400 - Bad request response - application/json
 * @return {Error} 401 - Unauthorized response - application/json
 * @return {Error} 403 - Forbidden response - application/json
 */
userRouter.get("/:id/places", auth, userController.getOwnedPlaces);

/**
 * GET /users/:id/places/favorites
 * @summary Get all favorite places of user
 * @tags user
 * @security BearerAuth
 * @param {string} id.path.required - User ID
 * @return {Array.<Place>} 200 - success response - application/json
 * @return {Error} 400 - Bad request response - application/json
 * @return {Error} 401 - Unauthorized response - application/json
 * @return {Error} 403 - Forbidden response - application/json
 */
userRouter.get("/:id/places/favorites", auth, userController.getFavoritePlaces);

/**
 * POST /users/:id/places/favorites
 * @summary Add favorite place
 * @tags user
 * @security BearerAuth
 * @param {string} id.path.required - User ID
 * @param {AddFavoritePlaceRequest} request.body.required - Favorite place data
 * @return {User} 200 - success response - application/json
 * @return {Error} 400 - Bad request response - application/json
 * @return {Error} 401 - Unauthorized response - application/json
 * @return {Error} 403 - Forbidden response - application/json
 */
userRouter.post("/:id/places/favorites", auth, userController.addFavoritePlace);

/**
 * DELETE /users/:id/places/favorites/:placeId
 * @summary Remove favorite place
 * @tags user
 * @security BearerAuth
 * @param {string} id.path.required - User ID
 * @param {string} placeId.path.required - Place ID
 * @return {User} 200 - success response - application/json
 * @return {Error} 400 - Bad request response - application/json
 * @return {Error} 401 - Unauthorized response - application/json
 * @return {Error} 403 - Forbidden response - application/json
 */
userRouter.delete("/:id/places/favorites/:placeId", auth, userController.removeFavoritePlace);

/**
 * GET /users/:id/groups
 * @summary Get all groups user is member of
 * @tags user
 * @security BearerAuth
 * @param {string} id.path.required - User ID
 * @return {Array.<Group>} 200 - success response - application/json
 * @return {Error} 400 - Bad request response - application/json
 * @return {Error} 401 - Unauthorized response - application/json
 * @return {Error} 403 - Forbidden response - application/json
 */
userRouter.get("/:id/groups", auth, userController.getUserGroups);

export default userRouter;
