import { group } from "k6";
import { GroupsTests } from "./groups-test-methods.js";

const tests = new GroupsTests();

export default function () {
  group("Groups test", function () {
    group("Prepare", function () {
      tests.Prepare();
    });

    group("Create new group", function () {
      tests.CreateNewGroup();
    });

    group("Get group by id", function () {
      tests.GetGroupById();
    });

    group("Update group", function () {
      tests.UpdateGroup();
    });

    group("Get extended group by id", function () {
      tests.GetExtendedGroupById();
    });
  });
}
