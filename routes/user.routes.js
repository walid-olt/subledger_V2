import { Router } from "express";
import { authenticate, authorize, requireToken } from "../middleware/auth.js";
import userController from "../controllers/user.controller.js";

const router = Router();

router.use(requireToken, authenticate, authorize(["user"]));
router.get("/me", userController.getUserProfile);

export default router;
