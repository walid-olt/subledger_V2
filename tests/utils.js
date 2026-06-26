import { faker } from "@faker-js/faker";
import mongoose from "mongoose";
import { userSchema } from "../models/User.model.js";
import { subscriptionSchema } from "../models/Subscription.model.js";
import { transactionSchema } from "../models/Transaction.model.js";

/**
 * @typedef {import("mongoose").InferSchemaType<typeof userSchema>} MockUser
 * @typedef {import("mongoose").InferSchemaType<typeof subscriptionSchema>} MockSubscription
 * @typedef {import("mongoose").InferSchemaType<typeof transactionSchema>} MockTransaction
 */

/**
 * @param {Partial<MockUser>} [overrides]
 * @returns {MockUser}
 */
export function getMockUser(overrides = {}) {
  return {
    username: faker.person.fullName(),
    email: faker.internet.email(),
    password_hash: faker.internet.password(),
    role: faker.helpers.arrayElement(["user", "admin"]),
    ...overrides,
  };
}

/**
 * @param {Partial<MockSubscription>} [overrides]
 * @returns {MockSubscription}
 */
export function getMockSubscription(overrides = {}) {
  return {
    user: new mongoose.Types.ObjectId(),
    name: faker.company.name(),
    price: faker.number.float({ min: 1, max: 200, fractionDigits: 2 }),
    billing_cycle: faker.helpers.arrayElement(["monthly", "yearly"]),
    status: faker.helpers.arrayElement(["active", "cancelled"]),
    ...overrides,
  };
}

/**
 * @param {Partial<MockTransaction>} [overrides]
 * @returns {MockTransaction}
 */
export function getMockTransaction(overrides = {}) {
  return {
    user: new mongoose.Types.ObjectId(),
    subscription: new mongoose.Types.ObjectId(),
    amount: faker.number.float({ min: 1, max: 500, fractionDigits: 2 }),
    paymentDate: faker.date.recent({ days: 30 }),
    status: faker.helpers.arrayElement(["paid", "failed"]),
    ...overrides,
  };
}
