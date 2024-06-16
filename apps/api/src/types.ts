/**
 * User
 * @typedef {object} User
 * @property {string} id.required - User ID
 * @property {string} email.required - User email
 * @property {string} name.required - User name
 * @property {string} profilePicture.required - User profile picture url
 * @property {string} bio.required - User bio
 * @property {Position} position.required - User last position
 */
export type User = {
  id: string;
  email: string;
  name: string;
  bio: string | null;
  profilePicture: string | null;
  lastActive: Date | null;
  lastPosition: Position | null;
};

/**
 * User status
 * @typedef {object} UserStatus
 * @property {string} id.required - Status ID
 * @property {string} userId.required - User ID
 * @property {string} status.required - User status
 * @property {string} color.required - Status color
 */
export type UserStatus = {
  id: string;
  userId: string;
  status: string;
  color: string;
};

/**
 * Place
 * @typedef {object} Place
 * @property {string} id.required - Place ID
 * @property {string} name.required - Place name
 * @property {string} description.required - Place description
 * @property {string} imageUrl.required - Place image url
 * @property {string} createdBy.required - User ID of the creator
 * @property {Position} position.required - Place position
 */
export type Place = {
  id: string;
  name: string;
  description: string;
  imageUrl: string | null;
  createdById: string;
  position: Position;
};

/**
 * Group
 * @typedef {object} Group
 * @property {string} id.required - Group ID
 * @property {string} name.required - Group name
 * @property {string} description.required - Group description
 * @property {string} imageUrl.required - Group image url
 */
export type Group = {
  id: string;
  name: string;
  description: string;
  imageUrl: string | null;
};

/**
 * Group event
 * @typedef {object} GroupEvent
 * @property {string} id.required - Event ID
 * @property {string} name.required - Event name
 * @property {string} description.required - Event description
 * @property {string} imageUrl.required - Event image url
 * @property {string} groupId.required - Group ID
 * @property {Date} date.required - Event date
 * @property {string} placeId.required - Place ID
 */
export type GroupEvent = {
  id: string;
  name: string;
  description: string;
  groupId: string;
  date: Date;
  imageUrl: string | null;
  placeId: string;
};

/**
 * Pagination query
 * @typedef {object} PaginationQuery
 * @property {number} page.required - Page number
 * @property {number} pageSize.required - Page size
 */
export type PaginationQuery = {
  page: number;
  pageSize: number;
};

/**
 * Position
 * @typedef {object} Position
 * @property {number} latitude.required - Latitude - double - eg: 0.0
 * @property {number} longitude.required - Longitude - double - eg: 0.0
 */
export type Position = {
  latitude: number;
  longitude: number;
};
