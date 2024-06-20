import { group } from "k6";

import { UsersTests } from "./users-test-methods.js";

const tests = new UsersTests();

// thresholds will decide wether tests pass or not in pre-push hook!
/*export const options = {
    thresholds: {
        'http_req_duration': ['p(95) < 200'],
    },
}*/

// in terminal run "k6 run <path-to-script>"

export default function () {
  group("Users test", function () {
    group("User registration test", function () {
      tests.RegisterNewUser();
    });
    group("User duplicate registration test", function () {
      tests.RegisterUserWithExistingEmail();
    });

    group("User login test", function () {
      tests.LoginUser();
    });

    group("User login with wrong password", function () {
      tests.LoginWithWrongPassword();
    });

    group("update user", function () {
      tests.UpdateUser();
    });

    group("update user password", function () {
      tests.UpdateUserPassword();
    });

    group("get non existing user status", function () {
      tests.GetNonExistingUserStatus();
    });

    group("create status", function () {
      tests.CreateUserStatus();
    });

    group("get status", function () {
      tests.GetUserStatus();
    });

    group("update status", function () {
      tests.UpdateUserStatus();
    });

    // group("delete user", function () {
    //   tests.DeleteUser();
    // });
  });
}
