import { catchAsync } from "../middleware/global.js";
import {
  createUserSubscription,
  deleteUserSubscription,
  getUserSubscriptionById,
  listUserSubscriptions,
  updateUserSubscription,
} from "../services/subscription.service.js";
import { getUser } from "../services/user.service.js";
import { sendResponse } from "../utils/response.js";

export const getProfile = catchAsync(async (req, res) => {
  const { email, id } = req.user;
  const user = await getUser(
    { email, id },
    { password_hash: 0, __v: 0, subscriptions: 0 },
  );
  return sendResponse(res, 200, user);
});

export const createSubscription = catchAsync(async (req, res) => {
  const userId = String(req.user.id);
  const created = await createUserSubscription(userId, req.body);
  return sendResponse(res, 201, created, "Subscription created");
});

export const listSubscriptions = catchAsync(async (req, res) => {
  const userId = String(req.user.id);
  const subscriptions = await listUserSubscriptions(userId);
  return sendResponse(res, 200, subscriptions);
});

export const getSubscription = catchAsync(async (req, res) => {
  const userId = String(req.user.id);
  const subscriptionId = String(req.params.subscriptionId);
  const subscription = await getUserSubscriptionById(userId, subscriptionId);
  return sendResponse(res, 200, subscription);
});

export const updateSubscription = catchAsync(async (req, res) => {
  const userId = String(req.user.id);
  const subscriptionId = String(req.params.subscriptionId);
  const updated = await updateUserSubscription(
    userId,
    subscriptionId,
    req.body,
  );
  return sendResponse(res, 200, updated, "Subscription updated");
});

export const removeSubscription = catchAsync(async (req, res) => {
  const userId = String(req.user.id);
  const subscriptionId = String(req.params.subscriptionId);
  await deleteUserSubscription(userId, subscriptionId);
  return sendResponse(res, 200, null, "Subscription deleted");
});

export default {
  getProfile,
  createSubscription,
  listSubscriptions,
  getSubscription,
  updateSubscription,
  removeSubscription,
};
