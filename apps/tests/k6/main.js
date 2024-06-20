import { group } from "k6";
import GroupsTests from "./Groups/groups-tests.js";
import UsersTests from "./Users/users-tests.js";

export default function () {
  group("All Tests", function () {
    group("Users test", function () {
      UsersTests();
    });
    group("Groups test", function () {
      GroupsTests();
    });
  });
}
