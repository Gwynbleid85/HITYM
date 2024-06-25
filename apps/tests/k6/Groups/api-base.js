import http from "k6/http";
import { newUserEmail, newUserPassword } from "../Users/users-test-methods.js";

const apiBaseUrl = __ENV.URL || "http://localhost:3000/api";

export class ApiBase {
  constructor() {
    this.accessToken = "";
    this.baseUrl = apiBaseUrl;
    this.header = {
      Authorization: `Bearer ${this.accessToken}`,
      "Content-Type": "application/json",
    };
  }

  SetAccessToken(token) {
    this.accessToken = token;
    this.header.Authorization = `Bearer ${token}`;
  }

  // Get access token for the user
  GetAccessToken() {
    const res = http.post(
      `${this.baseUrl}/user/login`,
      JSON.stringify({
        email: newUserEmail,
        password: newUserPassword,
      }),
      this.getOptions()
    );

    return res.json().token;
  }

  getOptions() {
    return {
      headers: this.header,
    };
  }
}
