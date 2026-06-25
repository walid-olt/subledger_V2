import * as subscriptionService from "../services/subscription.service.js";
import { createUser } from "../services/user.service.js";

import { getMockSubscription } from "./utils.js";
import { describe, it, expect, beforeAll, afterEach, afterAll } from "vitest";
import { connect, closeDatabase, clearDatabase } from "./test-db.js";
import { getMockUser } from "./utils.js";

const mockUser = getMockUser();

beforeAll(async () => await connect());
afterEach(async () => await clearDatabase());
afterAll(async () => await closeDatabase());

describe("test subscription service", () => {
  it("should add a create and retireve a subscription", async () => {
    const user = await createUser(mockUser);
    const subscriptionData = getMockSubscription();

    const sub = await subscriptionService.createUserSubscription(
      user.id,
      subscriptionData,
    );

    expect(sub.user.toString()).toEqual(user.id);
    expect(sub).toMatchObject(subscriptionData);

    const created = await subscriptionService.getUserSubscriptionById(
      user.id,
      sub.id,
    );
    expect(created.id).toEqual(sub.id);
  });

  it("should update a subscription", async () => {
    const user = await createUser(mockUser);
    const subscriptionData = getMockSubscription();

    const sub = await subscriptionService.createUserSubscription(
      user.id,
      subscriptionData,
    );

    const updated = getMockSubscription({ name: "linked in" });

    const updatedSub = await subscriptionService.updateUserSubscription(
      user.id,
      sub.id,
      updated,
    );

    expect(updated.name).toEqual(updatedSub.name);
    expect(updated.price).toEqual(updatedSub.price);
    await expect(
      subscriptionService.updateUserSubscription(
        user.id,
        "123456789012123456789012",
        updated,
      ),
    ).rejects.toThrow();
  });

  it("should delete a subscription", async () => {
    const user = await createUser(mockUser);
    const subscriptionData = getMockSubscription();

    const sub = await subscriptionService.createUserSubscription(
      user.id,
      subscriptionData,
    );

    const deleted = await subscriptionService.deleteUserSubscription(
      user.id,
      sub.id,
    );

    expect(deleted.id).toEqual(sub.id);
    await expect(
      subscriptionService.deleteUserSubscription(user.id, sub.id),
    ).rejects.toThrow();
  });

  it("shoudl get user subscriptions", async () => {
    const user = await createUser(mockUser);
    const sub1 = getMockSubscription({ name: "netflix" });

    const sub2 = getMockSubscription({ name: "hulu" });

    await subscriptionService.createUserSubscription(user.id, sub1);
    await subscriptionService.createUserSubscription(user.id, sub2);

    const subs = await subscriptionService.listUserSubscriptions(user.id);

    expect(subs).toMatchObject([sub1, sub2]);
  });
});
