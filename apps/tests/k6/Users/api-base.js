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

  getOptions() {
    return {
      headers: this.header,
    };
  }
}
