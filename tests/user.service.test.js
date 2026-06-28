import { vi, describe, it, expect, beforeEach } from "vitest";
import * as U from "../services/user.service.js";
import { ConflictError, NotFoundError } from "../utils/errors.js";
import { getMockUser } from "./utils.js";

import User from "../models/User.model.js";

vi.mock("../models/User.model.js", () => {
  return {
    default: {
      findOne: vi.fn(),
      create: vi.fn(),
      find: vi.fn(),
      aggregate: vi.fn(),
    },
  };
});

describe("[UNIT] : user service ", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("create a user", () => {
    it("should throw conflict error if email already exists", async () => {
      User.findOne.mockResolvedValue({ email: "john@doe.com" });
      await expect(U.createUser({ email: "john@doe.com" })).rejects.toThrow(
        ConflictError,
      );
      expect(User.findOne).toHaveBeenCalledWith({ email: "john@doe.com" });
      expect(User.create).not.toHaveBeenCalled();
    });

    it("should create a user", async () => {
      const mockUser = getMockUser({ username: "john doe" });
      User.findOne.mockResolvedValue(null);
      User.create.mockResolvedValue(mockUser);
      const created = await U.createUser(mockUser);
      expect(created.id).toEqual(mockUser.id);
    });
  });

  describe("get one or multiple users ", () => {
    it("should throw not found error if no user is found", async () => {
      User.findOne.mockResolvedValue(null);

      await expect(U.getUser({ email: "john@doe.com" })).rejects.toThrow(
        NotFoundError,
      );
    });
    it("should get a user", async () => {
      const mockUser = getMockUser();
      User.findOne.mockResolvedValue(mockUser);

      const user = await U.getUser({ email: mockUser.email });

      expect(user).toMatchObject(mockUser);
      expect(User.findOne).toHaveBeenCalledWith(
        { email: mockUser.email },
        undefined,
      );
    });

    it("should get all users or empty array", async () => {
      const mockUsers = [getMockUser(), getMockUser()];

      User.find.mockResolvedValue([]);
      const initial = await U.getAllUsers();
      expect(initial).toHaveLength(0);

      User.find.mockResolvedValue(mockUsers);

      const users = await U.getAllUsers();

      expect(users).toHaveLength(2);
      expect(users).toEqual(mockUsers);
    });
  });
});
