import Subscription from "../models/Subscription.model.js";
const user = {
  username: "john doe",
  password_hash: "password",
  email: "john@doe.com",
  role: "user",
};

// to lazy to do a full typescript setup
/**
 *@param {Partial<typeof user>} [overrids]
 * */
export function getMockUser(overrids = {}) {
  return { ...user, ...overrids };
}

/**
 * @type {Parameters<typeof Subscription.create>[0]}
 * */
const subscription = {
  name: "netflix",
  price: 99.99,
  billing_cycle: "monthly",
};

/**
 *@param {Partial<typeof subscription>} [overrids]
 * */
export function getMockSubscription(overrids = {}) {
  return { ...subscription, ...overrids };
}
