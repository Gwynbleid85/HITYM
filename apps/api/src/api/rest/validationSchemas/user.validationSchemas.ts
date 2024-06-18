import { z } from "zod";
/**
 * Registration request for a new user
 * @typedef {object} UserRegistrationRequest
 * @property {string} email.required - User email
 * @property {string} password.required - User password
 * @property {string} name.required - User name
 */
export const userRegistrationDataSchema = z.object({
  body: z.object({
    email: z.string().email(),
    password: z.string().min(6),
    name: z.string().min(2),
  }),
});

/**
 * Login request for a user
 * @typedef {object} UserLoginRequest
 * @property {string} email.required - User email
 * @property {string} password.required - User password
 */
export const userLoginDataSchema = z.object({
  body: z.object({
    email: z.string().email(),
    password: z.string().min(6),
  }),
});

/**
 * Update user data
 * @typedef {object} UpdateUserRequest
 * @property {string} name.required - User name
 * @property {string} bio - User bio
 */
export const updateUserSchema = z.object({
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
  body: z.object({
    status: z.string(),
    color: z.string(),
  }),
});

/**
 * Add favorite place data
 * @typedef {object} AddFavoritePlaceRequest
 * @property {string} placeId.required - Place ID
 */
export const addFavoritePlaceSchema = z.object({
  body: z.object({
    placeId: z.string(),
  }),
});

export const removeFavoritePlaceSchema = z.object({
  params: z.object({
    placeId: z.string(),
  }),
});

/**
 * Invite user to group data
 * @typedef {object} InviteUserToGroupRequest
 * @property {string} groupId.required - Group ID
 */
export const inviteUserToGroupSchema = z.object({
  params: z.object({
    id: z.string(),
  }),
  body: z.object({
    groupId: z.string(),
  }),
});

export const acceptGroupInviteSchema = z.object({
  params: z.object({
    id: z.string(),
    invite_id: z.string(),
  }),
});

export const declineGroupInviteSchema = z.object({
  params: z.object({
    id: z.string(),
    invite_id: z.string(),
  }),
});
