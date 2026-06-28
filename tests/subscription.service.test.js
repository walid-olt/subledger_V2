import { describe, expect, it, vi, beforeEach } from "vitest";
import { getMockSubscription, getMockUser } from "./utils.js";
import User from "../models/User.model.js";
import Subscription from "../models/Subscription.model.js";
import * as S from "../services/subscription.service.js";

vi.mock("../models/User.model.js", () => ({
  default: {
    findById: vi.fn(),
  },
}));

vi.mock("../models/Subscription.model.js", () => ({
  default: {
    create: vi.fn(),
    find: vi.fn(),
    findOne: vi.fn(),
    findOneAndUpdate: vi.fn(),
    findOneAndDelete: vi.fn(),
  },
}));

describe("[UNIT] : subscription service ", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe(`createUserSubscription`, () => {
    it("should throw error when a user isn't found", async () => {
      vi.mocked(User.findById).mockResolvedValue(null);

      await expect(S.createUserSubscription("123")).rejects.toThrow();
    });

    it("should create a subscription", async () => {
      const user = getMockUser({ id: "1234" });
      const subscription = getMockSubscription();

      vi.mocked(User.findById).mockResolvedValue(user);
      vi.mocked(Subscription.create).mockResolvedValue(subscription);

      const created = await S.createUserSubscription(user.id, subscription);

      expect(User.findById).toHaveBeenCalledWith(user.id);
      expect(Subscription.create).toHaveBeenCalledWith(subscription);
      expect(created).toMatchObject(subscription);
    });
  });

  describe(`listUserSubscriptions`, () => {
    it("should throw error when a user isn't found", async () => {
      vi.mocked(User.findById).mockResolvedValue(null);

      await expect(S.listUserSubscriptions("123")).rejects.toThrow();
    });
    it("should retrieve a users's subscriptions", async () => {
      const mockUser = getMockUser({ _id: "1234" });
      vi.mocked(User.findById).mockResolvedValue(mockUser);
      const subscriptions = [getMockSubscription(), getMockSubscription()];
      vi.mocked(Subscription.find).mockResolvedValue(subscriptions);

      const subs = await S.listUserSubscriptions(mockUser._id);

      expect(subs).toMatchObject(subscriptions);
      expect(Subscription.find).toHaveBeenCalledWith({ user: mockUser._id });
    });

  });

  describe(`updateUserSubscription`, () => {
    it("should throw error when a user isn't found", async () => {
      vi.mocked(User.findById).mockResolvedValue(null);

      await expect(S.updateUserSubscription("123", "456", {})).rejects.toThrow();
    });

    it("should update a subscription", async () => {
      const mockUser = getMockUser({ _id: "1234" });
      const subscription = getMockSubscription();

      vi.mocked(User.findById).mockResolvedValue(mockUser);
      vi.mocked(Subscription.findOneAndUpdate).mockResolvedValue(subscription);

      const updated = await S.updateUserSubscription(mockUser._id, "sub123", { price: 99.99 });

      expect(Subscription.findOneAndUpdate).toHaveBeenCalledWith(
        { _id: "sub123", user: mockUser._id },
        { price: 99.99 },
        { runValidators: true, returnDocument: "after" },
      );
      expect(updated).toMatchObject(subscription);
    });
  });

  describe(`getUserSubscriptionById`, () => {
    it("should throw error when a user isn't found", async () => {
      vi.mocked(User.findById).mockResolvedValue(null);

      await expect(S.getUserSubscriptionById("123", "456")).rejects.toThrow();
    });

    it("should get a subscription by id", async () => {
      const mockUser = getMockUser({ _id: "1234" });
      const subscription = getMockSubscription();

      vi.mocked(User.findById).mockResolvedValue(mockUser);
      vi.mocked(Subscription.findOne).mockResolvedValue(subscription);

      const result = await S.getUserSubscriptionById(mockUser._id, "sub123");

      expect(Subscription.findOne).toHaveBeenCalledWith({ _id: "sub123", user: mockUser._id });
      expect(result).toMatchObject(subscription);
    });
  });

  describe(`deleteUserSubscription`, () => {
    it("should throw error when a user isn't found", async () => {
      vi.mocked(User.findById).mockResolvedValue(null);

      await expect(S.deleteUserSubscription("123", "456")).rejects.toThrow();
    });

    it("should delete a subscription", async () => {
      const mockUser = getMockUser({ _id: "1234" });
      const subscription = getMockSubscription();

      vi.mocked(User.findById).mockResolvedValue(mockUser);
      vi.mocked(Subscription.findOneAndDelete).mockResolvedValue(subscription);

      const deleted = await S.deleteUserSubscription(mockUser._id, "sub123");

      expect(Subscription.findOneAndDelete).toHaveBeenCalledWith({ _id: "sub123", user: mockUser._id });
      expect(deleted).toMatchObject(subscription);
    });
  });
});
