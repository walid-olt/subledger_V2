import { catchAsync } from "../middleware/global.js";
import { getUser } from "../services/user.service.js";
import { sendResponse } from "../utils/response.js";

export const getUserProfile = catchAsync(async (req, res) => {
  const { email } = req.user;
  const user = await getUser({ email });
  return sendResponse(res, 200, user);
});

export default {
  getUserProfile,
};
