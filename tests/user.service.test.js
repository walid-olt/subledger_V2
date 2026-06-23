import * as userService from "../services/user.service.js";
import { describe, it, expect, beforeAll, afterEach, afterAll } from "vitest";
import { connect, closeDatabase, clearDatabase } from "./utils.js";

beforeAll(async () => await connect());
afterEach(async () => await clearDatabase());
afterAll(async () => await closeDatabase());

describe("user service tests", () => {
  const mockUser = {
    username: "john doe",
    password_hash: "password",
    email: "john@doe.com",
    role: "user",
  };

  it("create user", async () => {
    const created = await userService.createUser(mockUser);

    expect(created.id).toBeDefined();
    expect(created).toMatchObject(mockUser);
    expect(userService.createUser(mockUser)).rejects.toThrow();
  });
  it("throws when trying to create user with existing email", async () => {
    await userService.createUser(mockUser);
    expect(userService.createUser(mockUser)).rejects.toThrow();
  });
});
