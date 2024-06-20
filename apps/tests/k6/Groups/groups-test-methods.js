import http from "k6/http";
import { check } from "k6";
import { ApiBase } from "./api-base.js";

let groupsApiUrl;
let newGroupId;

export class GroupsTests extends ApiBase {
  constructor() {
    super();
    groupsApiUrl = `${this.baseUrl}/groups`;
  }

  Prepare() {
    this.SetAccessToken(this.GetAccessToken());
    check(this.accessToken, {
      "Access token generated": (r) => r !== "",
    });
  }

  CreateNewGroup() {
    const payload = JSON.stringify({
      name: "Test Group",
      description: "Test Group Description",
    });

    let response = http.post(`${groupsApiUrl}`, payload, this.getOptions());
    check(response, {
      "Create is status 201": (r) => r.status === 201,
      "Response contains name": (r) => r.json().hasOwnProperty("name"),
      "Response contains description": (r) => r.json().hasOwnProperty("description"),
    });

    newGroupId = response.json().id;
  }

  GetGroupById() {
    let response = http.get(`${groupsApiUrl}/${newGroupId}`, this.getOptions());
    check(response, {
      "Get is status 200": (r) => r.status === 200,
      "Response contains name": (r) => r.json().hasOwnProperty("name"),
      "Response contains description": (r) => r.json().hasOwnProperty("description"),
    });
  }

  UpdateGroup() {
    const payload = JSON.stringify({
      name: "Test Group Updated",
      description: "Test Group Description Updated",
    });

    let response = http.put(`${groupsApiUrl}/${newGroupId}`, payload, this.getOptions());
    check(response, {
      "Update is status 200": (r) => r.status === 200,
      "Response contains correct name": (r) => r.json().name === "Test Group Updated",
      "Response contains correct description": (r) => r.json().description === "Test Group Description Updated",
    });
  }

  GetExtendedGroupById() {
    let response = http.get(`${groupsApiUrl}/${newGroupId}/extended`, this.getOptions());
    console.log(response.json());
    check(response, {
      "Get extended is status 200": (r) => r.status === 200,
      "Response contains name": (r) => r.json().hasOwnProperty("name"),
      "Response contains description": (r) => r.json().hasOwnProperty("description"),
      "Response contains correct user count": (r) => r.json().users.length === 1,
      "Response contains users status": (r) => r.json().users[0].status.status === "status updated",
    });
  }
}
