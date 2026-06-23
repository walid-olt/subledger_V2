import { Router } from "express";
import { authenticate, authorize, requireToken } from "../middleware/auth.js";
import adminController from "../controllers/admin.controller.js";
const router = Router();
router.use(requireToken, authenticate, authorize(["admin"]));
router.get("/users", adminController.getUsers);
router.get("/me", adminController.getProfile);

export default router;
