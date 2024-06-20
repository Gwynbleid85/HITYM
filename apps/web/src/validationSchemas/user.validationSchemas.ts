import { z } from "zod";

export const userRegistrationDataSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6, { message: "Password must be at least 6 characters" }),
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
});

export const userLoginDataSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6, { message: "Password must be at least 6 characters" }),
});

export const deleteUserSchema = z.object({
  id: z.string(),
});

export const updateUserSchema = z.object({
  id: z.string(),

  name: z.string().min(2),
  bio: z.string().nullable(),
});

export const updatePasswordSchema = z.object({
  params: z.object({
    id: z.string(),
  }),
  body: z.object({
    password: z.string().min(6),
  }),
});

export const updateProfilePictureSchema = z.object({
  params: z.object({
    id: z.string(),
  }),
  body: z.object({
    profilePicture: z.string(),
  }),
});

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
