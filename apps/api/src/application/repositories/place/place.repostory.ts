import { Result } from "@badrap/result";
import type { NewPlace, UpdatePlace } from "./type";
import prisma from "../../../client";
import handleDbExceptions, { NotFoundError, toPlace } from "../../../utils";
import type { Place } from "../../../types";

export const placeRepository = {
  // Create a new place
  // @param userStatus The place to create
  // @returns The created place
  async create(newPlace: NewPlace): Promise<Result<Place>> {
    const { position, ...rest } = newPlace;
    try {
      const createdPlace = await prisma.place.create({
        data: {
          ...rest,
          latitude: position.latitude,
          longitude: position.longitude,
        },
      });
      return Result.ok(toPlace(createdPlace));
    } catch (e) {
      return Result.err(handleDbExceptions(e));
    }
  },

  // Find a place by its ID
  // @param id The ID of the place to find
  // @returns The place if found
  async findById(id: string): Promise<Result<Place>> {
    try {
      const place = await prisma.place.findUnique({ where: { id } });
      if (!place) {
        return Result.err(new NotFoundError());
      }
      return Result.ok(toPlace(place));
    } catch (e) {
      return Result.err(handleDbExceptions(e));
    }
  },

  // Get all places
  // @returns All places
  async getAll(): Promise<Result<Place[]>> {
    try {
      const places = await prisma.place.findMany();
      return Result.ok(places.map(toPlace));
    } catch (e) {
      return Result.err(handleDbExceptions(e));
    }
  },

  // Add place to user favorites
  // @param userId The ID of the user
  // @param placeId The ID of the place
  async addToFavorites(userId: string, placeId: string): Promise<Result<void>> {
    try {
      await prisma.user.update({
        where: { id: userId },
        data: {
          places: {
            connect: { id: placeId },
          },
        },
      });
      return Result.ok(undefined);
    } catch (e) {
      return Result.err(handleDbExceptions(e));
    }
  },

  // Remove place from user favorites
  // @param userId The ID of the user
  // @param placeId The ID of the place
  async removeFromFavorites(userId: string, placeId: string): Promise<Result<void>> {
    try {
      await prisma.user.update({
        where: { id: userId },
        data: {
          places: {
            disconnect: { id: placeId },
          },
        },
      });
      return Result.ok(undefined);
    } catch (e) {
      return Result.err(handleDbExceptions(e));
    }
  },

  // Delete a place by its ID
  // @param id The ID of the place to delete
  async delete(id: string): Promise<Result<void>> {
    try {
      await prisma.place.delete({ where: { id } });
      return Result.ok(undefined);
    } catch (e) {
      return Result.err(handleDbExceptions(e));
    }
  },

  // Update a place by its ID
  // @param id The ID of the place to update
  // @param place The place data to update
  // @returns The updated place
  async update(id: string, place: UpdatePlace): Promise<Result<Place>> {
    try {
      const updatedPlace = await prisma.place.update({
        where: { id },
        data: place,
      });
      return Result.ok(toPlace(updatedPlace));
    } catch (e) {
      return Result.err(handleDbExceptions(e));
    }
  },

  // Update place image
  // @param id The ID of the place
  // @param imageUrl The URL of the image
  // @returns The updated place
  async updateImage(id: string, imageUrl: string): Promise<Result<Place>> {
    try {
      const updatedPlace = await prisma.place.update({
        where: { id },
        data: { imageUrl },
      });
      return Result.ok(toPlace(updatedPlace));
    } catch (e) {
      return Result.err(handleDbExceptions(e));
    }
  },

  // Get all favorite places by user ID
  // @param userId The ID of the user
  // @returns All favorite places
  async getFavorites(userId: string): Promise<Result<Place[]>> {
    try {
      const user = await prisma.user.findUnique({ where: { id: userId }, include: { places: true } });
      if (!user) {
        return Result.err(new NotFoundError());
      }
      return Result.ok(user.places.map(toPlace));
    } catch (e) {
      return Result.err(handleDbExceptions(e));
    }
  },

  // Check if user is owner of the place
  // @param placeId The ID of the place
  // @param userId The ID of the user
  // @returns True if user is owner, false otherwise
  async isOwner(placeId: string, userId: string): Promise<boolean> {
    try {
      const place = await prisma.place.findUnique({ where: { id: placeId, createdById: userId } });
      return place != null;
    } catch (e) {
      return false;
    }
  },

  // Get all places created by user
  // @param userId The ID of the user
  // @returns All places created by user
  async getOwnedPlaces(userId: string): Promise<Result<Place[]>> {
    try {
      const places = await prisma.place.findMany({ where: { createdById: userId } });
      return Result.ok(places.map(toPlace));
    } catch (e) {
      return Result.err(handleDbExceptions(e));
    }
  },
};
