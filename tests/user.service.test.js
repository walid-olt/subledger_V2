import * as userService from "../services/user.service.js";
import { describe, it, expect, beforeAll, afterEach, afterAll } from "vitest";
import { connect, closeDatabase, clearDatabase } from "./test-db.js";
import { ConflictError, NotFoundError } from "../utils/errors.js";
import { getMockUser } from "./utils.js";

beforeAll(async () => await connect());
afterEach(async () => await clearDatabase());
afterAll(async () => await closeDatabase());

describe("user service tests", () => {
  it("should create a new user", async () => {
    const mockUser = getMockUser();
    const created = await userService.createUser(mockUser);

    expect(created.id).toBeDefined();
    expect(created).toMatchObject(mockUser);
    await expect(userService.createUser(mockUser)).rejects.toThrow();
  });
  it("should throw when trying to create user with duplicate email", async () => {
    const mockUser = getMockUser();
    await userService.createUser(mockUser);
    await expect(userService.createUser(mockUser)).rejects.toThrow(
      ConflictError,
    );
  });
  it("should create and retireve a user or throw when not found", async () => {
    const mockUser = getMockUser();

    const user = await userService.createUser(mockUser);
    const id = user.id;
    const retireved = await userService.getUser({ id });
    expect(retireved).toMatchObject(mockUser);
    await expect(userService.getUser({ id: "" })).rejects.toThrow();
  });
  it("should retrieve all users ", async () => {
    const mockUser1 = getMockUser({ email: "user1@test.com" });
    const mockUser2 = getMockUser({ email: "user2@test.com" });
    const user1 = await userService.createUser(mockUser1);
    const user2 = await userService.createUser(mockUser2);

    const allUsers = await userService.getAllUsers();

    expect(allUsers).toHaveLength(2);
    expect(allUsers).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ id: user1.id }),
        expect.objectContaining({ id: user2.id }),
      ]),
    );
  });

  it("should return empty array when no users exist", async () => {
    const allUsers = await userService.getAllUsers();
    expect(allUsers).toEqual([]);
  });
});
