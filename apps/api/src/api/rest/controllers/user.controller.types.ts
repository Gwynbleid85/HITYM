/**
 * Registration request for a new user
 * @typedef {object} UserRegistrationRequest
 * @property {string} email.required - User email
 * @property {string} password.required - User password
 * @property {string} name.required - User name
 */
export type UserRegistrationRequest = {
  email: string;
  password: string;
  name: string;
};

/**
 * Login request for a user
 * @typedef {object} UserLoginRequest
 * @property {string} email.required - User email
 * @property {string} password.required - User password
 */
export type UserLoginRequest = {
  email: string;
  password: string;
};
