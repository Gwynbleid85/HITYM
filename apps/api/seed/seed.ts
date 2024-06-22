import prisma from "../src/client";
import { configureFaker, generateEvent, generateGroup, generatePlace, generateUser, generateUserStatus } from "./data";

async function main() {
  console.log("Seeding data...");
  await new Promise((resolve) => {
    setTimeout(resolve, 1000);
  });

  configureFaker();

  const userCount = 10;
  const userStatusCount = 8;
  const placeCount = 20;
  const groupCount = 3;
  const eventCount = 2;

  const users = Array.from({ length: userCount }, generateUser);

  const userStatuses = Array.from({ length: userStatusCount }, generateUserStatus);

  const places = Array.from({ length: placeCount }, generatePlace);
  const groups = Array.from({ length: groupCount }, generateGroup);
  const events = Array.from({ length: eventCount }, generateEvent);

  await prisma.$transaction(async (tx) => {
    // Create users
    await tx.user.createMany({
      data: users,
    });

    // Create user statuses
    for (const [index, status] of userStatuses.entries()) {
      await tx.userStatus.create({
        data: { ...status, userId: users[index] ? users[index].id : "" },
      });
    }

    // Create places
    await Promise.all(
      places.map(async (place, placeIndex) => {
        const creatorIndex = placeIndex % userCount;
        await tx.place.create({
          data: {
            ...place,
            createdById: users[creatorIndex] ? users[creatorIndex].id : "",
            users: {
              connect: users
                .filter((_user, userIndex) => userIndex % placeIndex === 0)
                .map((user) => ({
                  id: user.id,
                })),
            },
          },
        });
      })
    );

    // Create groups
    await Promise.all(
      groups.map(async (group, groupIndex) => {
        await tx.group.create({
          data: {
            ...group,
            createdById: users[groupIndex] ? users[groupIndex].id : "",
            users: {
              connect: users
                .filter((_user, userIndex) => userIndex % (groupIndex + 1) === 0)
                .map((user) => ({
                  id: user.id,
                })),
            },
          },
        });
      })
    );

    // Create events
    await Promise.all(
      events.map(async (event, eventIndex) => {
        await tx.groupEvent.create({
          data: {
            ...event,
            createdById: users[eventIndex] ? users[eventIndex].id : "",
            groupId: groups[eventIndex] ? groups[eventIndex].id : "",
            placeId: places[eventIndex] ? places[eventIndex].id : "",
          },
        });
      })
    );

    console.log("Data seeded!");
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(`Seeding failed ${e}`);
    await prisma.$disconnect();
    process.exit(1);
  });
