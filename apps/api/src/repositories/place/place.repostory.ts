import { Result } from "@badrap/result";
import type { NewPlace } from "./type";
import prisma from "../../client";
import handleDbExceptions, { NotFoundError } from "../../utils";
import type { Place } from "../../types";

export const PlaceRepository = {
  /// Create a new place
  /// @param userStatus The place to create
  /// @returns The created place
  async create(newPlace: NewPlace): Promise<Result<Place>> {
    try {
      const createdPlace = await prisma.place.create({ data: newPlace });
      return Result.ok(createdPlace);
    } catch (e) {
      return Result.err(handleDbExceptions(e));
    }
  },

  /// Find a place by its ID
  /// @param id The ID of the place to find
  /// @returns The place if found
  async findById(id: string): Promise<Result<Place>> {
    try {
      const place = await prisma.place.findUnique({ where: { id } });
      if (!place) {
        return Result.err(new NotFoundError());
      }
      return Result.ok(place);
    } catch (e) {
      return Result.err(handleDbExceptions(e));
    }
  },

  /// Get all places
  /// @returns All places
  async getAll(): Promise<Result<Place[]>> {
    try {
      const places = await prisma.place.findMany();
      return Result.ok(places);
    } catch (e) {
      return Result.err(handleDbExceptions(e));
    }
  },

  /// Add place to user favorites
  /// @param userId The ID of the user
  /// @param placeId The ID of the place
  async addToFavorites(userId: string, placeId: string): Promise<Result<void>> {
    try {
      await prisma.user.update({
        where: { id: userId },
        data: {
          place: {
            connect: { id: placeId },
          },
        },
      });
      return Result.ok(undefined);
    } catch (e) {
      return Result.err(handleDbExceptions(e));
    }
  },

  /// Remove place from user favorites
  /// @param userId The ID of the user
  /// @param placeId The ID of the place
  async removeFromFavorites(userId: string, placeId: string): Promise<Result<void>> {
    try {
      await prisma.user.update({
        where: { id: userId },
        data: {
          place: {
            disconnect: { id: placeId },
          },
        },
      });
      return Result.ok(undefined);
    } catch (e) {
      return Result.err(handleDbExceptions(e));
    }
  },

  /// Delete a place by its ID
  /// @param id The ID of the place to delete
  async delete(id: string): Promise<Result<void>> {
    try {
      await prisma.place.delete({ where: { id } });
      return Result.ok(undefined);
    } catch (e) {
      return Result.err(handleDbExceptions(e));
    }
  },

  /// Update a place by its ID
  /// @param id The ID of the place to update
  /// @param place The new place
  /// @returns The updated place
  async update(id: string, place: NewPlace): Promise<Result<Place>> {
    try {
      const updatedPlace = await prisma.place.update({
        where: { id },
        data: place,
      });
      return Result.ok(updatedPlace);
    } catch (e) {
      return Result.err(handleDbExceptions(e));
    }
  },

  /// Get all favorite places by user ID
  /// @param userId The ID of the user
  /// @returns All favorite places
  async getFavorites(userId: string): Promise<Result<Place[]>> {
    try {
      const user = await prisma.user.findUnique({ where: { id: userId }, include: { place: true } });
      if (!user) {
        return Result.err(new NotFoundError());
      }
      return Result.ok(user.place);
    } catch (e) {
      return Result.err(handleDbExceptions(e));
    }
  },
};
