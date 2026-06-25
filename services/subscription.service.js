import Subscription from "../models/Subscription.model.js";
import User from "../models/User.model.js";
import { NotFoundError } from "../utils/errors.js";

export const createUserSubscription = async (userId, payload) => {
  const user = await User.findById(userId, "_id");
  if (!user) {
    throw new NotFoundError("User not found");
  }

  return await Subscription.create({
    ...payload,
    user: user._id,
  });
};

export const listUserSubscriptions = async (userId) => {
  const user = await User.findById(userId, "_id");
  if (!user) {
    throw new NotFoundError("User not found");
  }

  return await Subscription.find({ user: user._id });
};

export const getUserSubscriptionById = async (userId, subscriptionId) => {
  const user = await User.findById(userId, "_id");
  if (!user) {
    throw new NotFoundError("User not found");
  }

  const subscription = await Subscription.findOne({
    _id: subscriptionId,
    user: user._id,
  });
  if (!subscription) {
    throw new NotFoundError("Subscription not found");
  }

  return subscription;
};

export const updateUserSubscription = async (userId, subscriptionId, patch) => {
  const user = await User.findById(userId, "_id");
  if (!user) {
    throw new NotFoundError("User not found");
  }

  const subscription = await Subscription.findOneAndUpdate(
    { _id: subscriptionId, user: user._id },
    patch,
    { runValidators: true, returnDocument: "after" },
  );
  if (!subscription) {
    throw new NotFoundError("Subscription not found");
  }

  return subscription;
};

export const deleteUserSubscription = async (userId, subscriptionId) => {
  const user = await User.findById(userId, "_id");
  if (!user) {
    throw new NotFoundError("User not found");
  }

  const deleted = await Subscription.findOneAndDelete({
    _id: subscriptionId,
    user: user._id,
  });
  if (!deleted) {
    throw new NotFoundError("Subscription not found");
  }
  return deleted
};
