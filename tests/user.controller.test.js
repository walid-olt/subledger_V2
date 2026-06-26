import request from "supertest";
import { it, describe, expect } from "vitest";
import { connect, clearDatabase, closeDatabase } from "./test-db.js";
import { beforeAll } from "vitest";
import { beforeEach } from "vitest";
import { afterAll } from "vitest";
import server from "../app.js";
import { ValidationError } from "../utils/errors.js";

beforeAll(async () => {
  await connect();
});
beforeEach(async () => {
  await clearDatabase();
});

afterAll(async () => {
  await closeDatabase();
});

describe("[INTEGRATION] : user controller", () => {
  describe("user register", () => {
    const path = "/auth/signup";
    it("should throw validation error when receiving invalid data", async () => {
      const response = await request(server).post(path).send({}).expect(422);
      expect(response.body).toMatchObject({ status: "error" });
    });
  });
});
