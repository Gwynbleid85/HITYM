import http from "k6/http";
import { check } from "k6";
import { ApiBase } from "./api-base.js";
import { newUserId_2, newUserAccessToken_2 } from "../Users/users-test-methods.js";

let groupsApiUrl;
let newGroupId;
let inviteId;

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
    check(response, {
      "Get extended is status 200": (r) => r.status === 200,
      "Response contains name": (r) => r.json().hasOwnProperty("name"),
      "Response contains description": (r) => r.json().hasOwnProperty("description"),
      "Response contains correct user count": (r) => r.json().users.length === 1,
      "Response contains users status": (r) => r.json().users[0].status.status === "status updated",
      "Response contains group events property": (r) => r.json().hasOwnProperty("groupEvents"),
      "Response contains zero group events": (r) => r.json().groupEvents.length === 0,
    });
  }

  InviteUserToGroup() {
    const payload = JSON.stringify({
      groupId: newGroupId,
    });

    let response = http.post(`${this.baseUrl}/users/${newUserId_2}/groups/invites`, payload, this.getOptions());
    check(response, {
      "Invite is status 201": (r) => r.status === 201,
    });
  }

  RejectInvite() {
    let options = this.getOptions();
    options.headers.Authorization = `Bearer ${newUserAccessToken_2}`;
    let response = http.del(`${this.baseUrl}/user/groups/invites/${inviteId}`, null, options);
    check(response, {
      "Reject invite is status 204": (r) => r.status === 204,
    });
  }

  AcceptInvite() {
    const payload = JSON.stringify({
      groupId: newGroupId,
    });

    let options = this.getOptions();
    options.headers.Authorization = `Bearer ${newUserAccessToken_2}`;
    let response = http.post(`${this.baseUrl}/user/groups/invites/${inviteId}/accept`, payload, options);
    check(response, {
      "Accept invite is status 201": (r) => r.status === 201,
    });
  }

  SecondUserHasInvite() {
    let options = this.getOptions();
    options.headers.Authorization = `Bearer ${newUserAccessToken_2}`;
    let response = http.get(`${this.baseUrl}/user/groups/invites`, options);
    check(response, {
      "Second user has invite": (r) => r.status === 200,
      "User has only one invite": (r) => r.json().length === 1,
      "Response contains groupId": (r) => r.json()[0].hasOwnProperty("groupId"),
      "Response contains invitedUserId": (r) => r.json()[0].hasOwnProperty("invitedUserId"),
      "Response contains invitedById": (r) => r.json()[0].hasOwnProperty("invitedById"),
      "Response contains group": (r) => r.json()[0].hasOwnProperty("group"),
    });
    inviteId = response.json()[0].id;
  }

  InviteUserToGroupUserAlreadyIsIn() {
    const payload = JSON.stringify({
      groupId: newGroupId,
    });

    let response = http.post(`${this.baseUrl}/users/${newUserId_2}/groups/invites`, payload, this.getOptions());
    check(response, {
      "Invite is status 400": (r) => r.status === 400,
      "Response contains error": (r) => r.json().message === "User is already in this group",
    });
  }

  GroupHasTwoMembers() {
    let response = http.get(`${groupsApiUrl}/${newGroupId}/extended`, this.getOptions());
    check(response, {
      "Get extended is status 200": (r) => r.status === 200,
      "Response contains correct user count": (r) => r.json().users.length === 2,
    });
  }

  GetUserGroups() {
    let response = http.get(`${this.baseUrl}/user/groups`, this.getOptions());

    check(response, {
      "Get user groups is status 200": (r) => r.status === 200,
      "Response contains group": (r) => r.json().length === 1,
      "User is in correct group": (r) => r.json()[0].id === newGroupId,
    });
  }
}
