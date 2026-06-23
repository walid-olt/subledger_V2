import { getAllUsers, getUser } from "../services/user.service.js";
import { catchAsync } from "../middleware/global.js";
import { sendResponse } from "../utils/response.js";

export const getUsers = catchAsync(async (req, res) => {
  const users = await getAllUsers();
  return sendResponse(res, 200, users);
});

export const getProfile = catchAsync(async (req, res) => {
  const user = await getUser({ email: req.user.email });
  return sendResponse(res, 200, user);
});

export const getUserDetails = catchAsync(async (req, res) => {});

export default {
  getUsers,
  getProfile,
};
