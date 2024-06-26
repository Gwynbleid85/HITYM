import { faker } from "@faker-js/faker";

export const configureFaker = () => {
  faker.seed(123);
};

export const generateUser = () => ({
  id: faker.string.uuid(),
  email: faker.internet.email(),
  password: faker.internet.password(),
  name: faker.person.fullName(),
  bio: faker.person.bio(),
  profilePicture: faker.image.avatar(),
});

export const generateUserStatus = () => ({
  id: faker.string.uuid(),
  status: faker.lorem.sentence(),
  color: faker.color.rgb(),
});

export const generatePlace = () => ({
  id: faker.string.uuid(),
  name: faker.location.city(),
  description: faker.lorem.paragraph(),
  imageUrl: faker.image.url(),
  latitude: faker.location.latitude(),
  longitude: faker.location.longitude(),
});

export const generateGroup = () => ({
  id: faker.string.uuid(),
  name: faker.animal.type(),
  description: faker.lorem.paragraph(),
  imageUrl: faker.image.url(),
});

export const generateEvent = () => ({
  id: faker.string.uuid(),
  name: faker.lorem.words(),
  description: faker.lorem.paragraph(),
  date: faker.date.future(),
  imageUrl: faker.image.url(),
});
