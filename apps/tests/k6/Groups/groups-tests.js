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

    group("Invite user to group", function () {
      tests.InviteUserToGroup();
    });

    group("User has invite to group", function () {
      tests.SecondUserHasInvite();
    });

    group("Decline invite", function () {
      tests.RejectInvite();
    });

    group("Invite user to group again", function () {
      tests.InviteUserToGroup();
    });

    group("User has invite to group", function () {
      tests.SecondUserHasInvite();
    });

    group("Accept invite", function () {
      tests.AcceptInvite();
    });

    group("Invite user to group once again", function () {
      tests.InviteUserToGroupUserAlreadyIsIn();
    });

    group("Group has two members", function () {
      tests.GroupHasTwoMembers();
    });

    group("Get user groups", function () {
      tests.GetUserGroups();
    });
  });
}
