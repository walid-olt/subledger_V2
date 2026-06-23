import * as userService from "../../services/user.service.js";
describe("user service", () => {
  test("create user", async () => {
    const data = {
      username: "john doe",
      email: "john@doe.com",
      role: "user",
      password: "12345678",
    };

    const created = await userService.createUser(data);
    expect(created).toMatchObject(data);
  });
});
