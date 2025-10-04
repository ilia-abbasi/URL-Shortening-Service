import "../../helpers/load_env.js";

import { Application } from "express";
import request from "supertest";

import { createApp } from "../../app/app.js";
import { clearTable, connectDb, disconnectDb } from "../../database/db.js";

let shortCode: string;
let key: string;

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

    await request(app)
      .post("/shorten")
      .send({ url: "htttps://google.com" })
      .expect(400);

    await request(app)
      .post("/shorten")
      .send({ Url: "https://google.com" })
      .expect(400);
  });

  it("should successfully create a short url", async () => {
    const url = "https://google.com";
    const response = await request(app).post("/shorten").send({ url });

    expect(response.statusCode).toBe(201);
    expect(response.body).toMatchObject({ data: { url } });

    shortCode = response.body.shortCode;
    key = response.body.key;
  });
});
