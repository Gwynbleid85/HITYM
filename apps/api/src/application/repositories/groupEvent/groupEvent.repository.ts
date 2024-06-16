import { Result } from "@badrap/result";
import type { GroupEvent } from "../../../types";
import type { GroupEventUpdate, NewGroupEvent } from "./types";
import prisma from "../../../client";
import handleDbExceptions, { NotFoundError } from "../../../utils";

export const groupEventRepository = {
  // Create a new event for a group
  // @param newEvent The event to create
  // @returns The created event
  async create(newEvent: NewGroupEvent): Promise<Result<GroupEvent>> {
    try {
      const createdEvent = await prisma.groupEvent.create({ data: newEvent });
      return Result.ok(createdEvent);
    } catch (e) {
      return Result.err(handleDbExceptions(e));
    }
  },

  // Find an event by its ID
  // @param id The ID of the event to find
  // @returns The event if found
  async findById(id: string): Promise<Result<GroupEvent>> {
    try {
      const event = await prisma.groupEvent.findUnique({ where: { id } });
      if (!event) {
        return Result.err(new NotFoundError());
      }
      return Result.ok(event);
    } catch (e) {
      return Result.err(handleDbExceptions(e));
    }
  },

  // Get all events for a group
  // @param groupId The ID of the group
  // @returns All events
  async getAll(groupId: string): Promise<Result<GroupEvent[]>> {
    try {
      const events = await prisma.groupEvent.findMany({ where: { groupId } });
      return Result.ok(events);
    } catch (e) {
      return Result.err(handleDbExceptions(e));
    }
  },

  // Update an event
  // @param id The ID of the event
  // @param update The update to apply
  async update(id: string, update: GroupEventUpdate): Promise<Result<GroupEvent>> {
    try {
      const updatedEvent = await prisma.groupEvent.update({ where: { id }, data: update });
      return Result.ok(updatedEvent);
    } catch (e) {
      return Result.err(handleDbExceptions(e));
    }
  },

  // Update an event image
  // @param id The ID of the event
  // @param imageUrl The new image URL
  // @returns The updated event
  async updateImage(id: string, imageUrl: string): Promise<Result<GroupEvent>> {
    try {
      const updatedEvent = await prisma.groupEvent.update({ where: { id }, data: { imageUrl } });
      return Result.ok(updatedEvent);
    } catch (e) {
      return Result.err(handleDbExceptions(e));
    }
  },

  // Delete an event
  // @param id The ID of the event
  async delete(id: string): Promise<Result<void>> {
    try {
      await prisma.groupEvent.delete({ where: { id } });
      return Result.ok(undefined);
    } catch (e) {
      return Result.err(handleDbExceptions(e));
    }
  },

  // Get all events
  // @returns All events
  async getAllEvents(): Promise<Result<GroupEvent[]>> {
    try {
      const events = await prisma.groupEvent.findMany();
      return Result.ok(events);
    } catch (e) {
      return Result.err(handleDbExceptions(e));
    }
  },

  // Get all events for a user
  // @param userId The ID of the user
  // @returns All events
  async getEventsForUser(userId: string): Promise<Result<GroupEvent[]>> {
    try {
      const events = await prisma.groupEvent.findMany({
        include: {
          group: {
            include: {
              users: {
                where: {
                  id: userId,
                },
              },
            },
          },
        },
      });
      return Result.ok(events);
    } catch (e) {
      return Result.err(handleDbExceptions(e));
    }
  },

  async canUserEdit(userId: string, eventId: string): Promise<boolean> {
    try {
      const event = await prisma.groupEvent.findUnique({
        where: { id: eventId },
        include: {
          group: {
            include: {
              users: {
                select: {
                  id: true,
                },
              },
            },
          },
        },
      });
      if (!event) {
        return false;
      }
      return event.group.users.some((user) => user.id === userId);
    } catch (e) {
      return false;
    }
  },
};
