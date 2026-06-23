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
export function getMockUser(overrids) {
  return { ...user, ...overrids };
}
