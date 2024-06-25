import http from "k6/http";
import { check } from "k6";
import { ApiBase } from "./api-base.js";
import faker from "https://cdnjs.cloudflare.com/ajax/libs/Faker/3.1.0/faker.min.js";

let userApiUrl;

export const newUserEmail = faker.internet.email();
export const newUserEmail_2 = faker.internet.email();
export const newUserPassword = "password";

export let newUserId;
export let newUserAccessToken;
export let newUserId_2;
export let newUserAccessToken_2;

export class UsersTests extends ApiBase {
  constructor() {
    super();
    userApiUrl = `${this.baseUrl}/user`;
  }

  RegisterNewUser() {
    const payload = JSON.stringify({
      email: newUserEmail,
      password: newUserPassword,
      name: "John Doe",
    });

    let response = http.post(`${userApiUrl}/registration`, payload, this.getOptions());
    check(response, {
      "Create is status 201": (r) => r.status === 201,
      "Response contains id": (r) => r.json().hasOwnProperty("id"),
      "Response contains email": (r) => r.json().hasOwnProperty("email"),
      "Response contains name": (r) => r.json().hasOwnProperty("name"),
    });
  }

  RegisterSecondUser() {
    const payload = JSON.stringify({
      email: newUserEmail_2,
      password: newUserPassword,
      name: "Asdf Lkjh",
    });

    let response = http.post(`${userApiUrl}/registration`, payload, this.getOptions());
    check(response, {
      "Create is status 200": (r) => r.status === 201,
      "Response contains id": (r) => r.json().hasOwnProperty("id"),
      "Response contains email": (r) => r.json().hasOwnProperty("email"),
      "Response contains name": (r) => r.json().hasOwnProperty("name"),
    });
  }

  RegisterUserWithExistingEmail() {
    const payload = JSON.stringify({
      email: newUserEmail,
      password: newUserPassword,
      name: "John Doe 2",
    });

    const response = http.post(`${userApiUrl}/registration`, payload, this.getOptions());
    check(response, {
      "Create is status 400": (r) => r.status === 400,
    });
  }

  LoginUser() {
    const payload = JSON.stringify({
      email: newUserEmail,
      password: newUserPassword,
    });

    const response = http.post(`${userApiUrl}/login`, payload, this.getOptions());
    check(response, {
      "Login is status 200": (r) => r.status === 200,
      "Response contains token": (r) => r.json().hasOwnProperty("token"),
      "Response contains user": (r) => r.json().hasOwnProperty("user"),
    });

    newUserId = response.json().user.id;
    this.SetAccessToken(response.json().token);
  }

  LoginSecondUser() {
    const payload = JSON.stringify({
      email: newUserEmail_2,
      password: newUserPassword,
    });

    const response = http.post(`${userApiUrl}/login`, payload, this.getOptions());
    check(response, {
      "Login is status 200": (r) => r.status === 200,
      "Response contains token": (r) => r.json().hasOwnProperty("token"),
      "Response contains user": (r) => r.json().hasOwnProperty("user"),
    });

    newUserId_2 = response.json().user.id;
    newUserAccessToken_2 = response.json().token;
  }

  LoginWithWrongPassword() {
    const payload = JSON.stringify({
      email: newUserEmail,
      password: "wrong_password",
    });

    const response = http.post(`${userApiUrl}/login`, payload, this.getOptions());
    check(response, {
      "Login is status 400": (r) => r.status === 400,
    });
  }

  UpdateUser() {
    const payload = JSON.stringify({
      name: "John Doe Updated",
      bio: "I am a software engineer",
    });

    const response = http.put(userApiUrl, payload, this.getOptions());
    check(response, {
      "Update is status 200": (r) => r.status === 200,
      "Response contains updated name": (r) => r.json().name === "John Doe Updated",
      "Response contains updated bio": (r) => r.json().bio === "I am a software engineer",
    });
  }

  UpdateUserPassword() {
    const payload = JSON.stringify({
      password: "new_password",
    });

    const response = http.put(`${userApiUrl}/password`, payload, this.getOptions());
    check(response, {
      "Update is status 200": (r) => r.status === 200,
    });

    // Try login with new password
    const loginPayload = JSON.stringify({
      email: newUserEmail,
      password: "new_password",
    });
    const loginResponse = http.post(`${userApiUrl}/login`, loginPayload, this.getOptions());
    check(loginResponse, {
      "Login with new password successful": (r) => r.status === 200,
    });

    // Set the password back to the original one
    const payload_original = JSON.stringify({
      password: "password",
    });

    const response_original = http.put(`${userApiUrl}/password`, payload_original, this.getOptions());
    check(response_original, {
      "Password set to original": (r) => r.status === 200,
    });
  }

  //TODO: Test updating profile picture

  GetNonExistingUserStatus() {
    const response = http.get(`${userApiUrl}/${newUserId}/user-status`, this.getOptions());
    check(response, {
      "Get is status 404": (r) => r.status === 404,
    });
  }

  CreateUserStatus() {
    const payload = JSON.stringify({
      status: "status",
      color: "color",
    });

    const response = http.post(`${userApiUrl}/user-status`, payload, this.getOptions());
    check(response, {
      "Create is status 201": (r) => r.status === 201,
      "Response contains status": (r) => r.json().hasOwnProperty("status"),
      "Response contains color": (r) => r.json().hasOwnProperty("color"),
    });
  }

  GetUserStatus() {
    const response = http.get(`${userApiUrl}s/${newUserId}/user-status`, this.getOptions());
    check(response, {
      "Get is status 200": (r) => r.status === 200,
      "Response contains status": (r) => r.json().hasOwnProperty("status"),
      "Response contains color": (r) => r.json().hasOwnProperty("color"),
    });
  }

  UpdateUserStatus() {
    const payload = JSON.stringify({
      status: "status updated",
      color: "color updated",
    });

    const response = http.post(`${userApiUrl}/user-status`, payload, this.getOptions());
    check(response, {
      "Update is status 201": (r) => r.status === 201,
      "Response contains updated status": (r) => r.json().status === "status updated",
      "Response contains updated color": (r) => r.json().color === "color updated",
    });

    // Try getting user status
    const getStatusResponse = http.get(`${userApiUrl}s/${newUserId}/user-status`, this.getOptions());
    check(getStatusResponse, {
      "Get is status 200": (r) => r.status === 200,
      "Response contains updated status": (r) => r.json().status === "status updated",
      "Response contains updated color": (r) => r.json().color === "color updated",
    });
  }

  DeleteUser() {
    const response = http.del(userApiUrl, null, this.getOptions());
    check(response, {
      "Delete is status 204": (r) => r.status === 204,
    });
  }
}
