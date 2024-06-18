import { z } from "zod";
/**
 * Registration request for a new user
 * @typedef {object} UserRegistrationRequest
 * @property {string} email.required - User email
 * @property {string} password.required - User password
 * @property {string} name.required - User name
 */
export const userRegistrationDataSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6, { message: "Password must be at least 6 characters" }),
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
});

/**
 * Login request for a user
 * @typedef {object} UserLoginRequest
 * @property {string} email.required - User email
 * @property {string} password.required - User password
 */
export const userLoginDataSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6, { message: "Password must be at least 6 characters" }),
});

export const deleteUserSchema = z.object({
  params: z.object({
    id: z.string(),
  }),
});

/**
 * Update user data
 * @typedef {object} UpdateUserRequest
 * @property {string} name.required - User name
 * @property {string} bio - User bio
 */
export const updateUserSchema = z.object({
  params: z.object({
    id: z.string(),
  }),
  body: z.object({
    name: z.string().min(2),
    bio: z.string().nullable(),
  }),
});

/**
 * Update user password data
 * @typedef {object} UpdatePasswordRequest
 * @property {string} password.required - User password
 */
export const updatePasswordSchema = z.object({
  params: z.object({
    id: z.string(),
  }),
  body: z.object({
    password: z.string().min(6),
  }),
});

/**
 * Update user profile picture data
 * @typedef {object} UpdateProfilePictureRequest
 * @property {string} profilePicture.required - User profile picture
 */
export const updateProfilePictureSchema = z.object({
  params: z.object({
    id: z.string(),
  }),
  body: z.object({
    profilePicture: z.string(),
  }),
});

/**
 * Update user status data
 * @typedef {object} UpdateUserStatusRequest
 * @property {string} status.required - User status
 * @property {string} color.required - Status color
 */
export const updateUserStatusSchema = z.object({
  params: z.object({
    id: z.string(),
  }),
  body: z.object({
    status: z.string(),
    color: z.string(),
  }),
});

export const deleteUserStatusSchema = z.object({
  params: z.object({
    id: z.string(),
  }),
});

export const getOwnedPlacesSchema = z.object({
  params: z.object({
    id: z.string(),
  }),
});

export const getFavoritePlacesSchema = z.object({
  params: z.object({
    id: z.string(),
  }),
});

/**
 * Add favorite place data
 * @typedef {object} AddFavoritePlaceRequest
 * @property {string} placeId.required - Place ID
 */
export const addFavoritePlaceSchema = z.object({
  params: z.object({
    id: z.string(),
  }),
  body: z.object({
    placeId: z.string(),
  }),
});

export const removeFavoritePlaceSchema = z.object({
  params: z.object({
    id: z.string(),
    placeId: z.string(),
  }),
});

export const getUserGroupsSchema = z.object({
  params: z.object({
    id: z.string(),
  }),
});
