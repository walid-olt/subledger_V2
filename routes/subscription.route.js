import { Router } from "express";
import { authenticate, authorize, requireToken } from "../middleware/auth.js";
import { validate } from "../middleware/validate.js";
import {
  SubscriptionIdParamsSchema,
  PatchSubscriptionsSchema,
  PostSubscriptionsSchema,
} from "../schemas/index.js";
import subscriptionController from "../controllers/subscription.controller.js";

const router = Router();
router.use(requireToken, authenticate, authorize(["user"]));

router.post(
  "/",
  validate(PostSubscriptionsSchema),
  subscriptionController.createSubscription,
);

router.get("/", subscriptionController.listSubscriptions);

router.get(
  "/:subscriptionId",
  validate(SubscriptionIdParamsSchema),
  subscriptionController.getSubscription,
);

router.patch(
  "/:subscriptionId",
  validate(SubscriptionIdParamsSchema),
  validate(PatchSubscriptionsSchema),
  subscriptionController.updateSubscription,
);

router.delete(
  "/:subscriptionId",
  validate(SubscriptionIdParamsSchema),
  subscriptionController.removeSubscription,
);

export default router;
