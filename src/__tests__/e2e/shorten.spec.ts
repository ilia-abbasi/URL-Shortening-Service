import "../../helpers/load_env.js";

import { Application } from "express";
import request from "supertest";

import { createApp } from "../../app/app.js";
import { clearTable, connectDb, disconnectDb } from "../../database/db.js";

const app: Application = createApp();
connectDb(true);

afterAll(async () => {
  await clearTable();
  await disconnectDb();
});

describe("Creating a short URL", () => {
  it("should validate input url", async () => {
    await request(app)
      .post("/shorten")
      .send({ url: "https://goo..gle.com" })
      .expect(400);
  });
});
