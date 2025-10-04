import "../../helpers/load_env.js";

import { Application } from "express";
import request from "supertest";

import { createApp } from "../../app/app.js";
import { clearTable, connectDb, disconnectDb } from "../../database/db.js";
import { getDifferentKey, getDifferentShortCode } from "../../helpers/utils.js";

let shortCode: string;
let key: string;
let differentShortCode: string;
let differentKey: string;

const url = "https://google.com";
const updatedUrl = "https://example.com";

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
    const response = await request(app).post("/shorten").send({ url });

    expect(response.statusCode).toBe(201);
    expect(response.body).toMatchObject({ data: { url } });

    shortCode = response.body.data.shortCode;
    key = response.body.data.key;
    differentShortCode = getDifferentShortCode(shortCode);
    differentKey = getDifferentKey(key);
  });
});

describe("Updating the short url", () => {
  it("should correctly match the short code with the key", async () => {
    await request(app)
      .put(`/shorten/${shortCode}?key=${differentKey}`)
      .send({
        url: updatedUrl,
      })
      .expect(404);

    await request(app)
      .put(`/shorten/${differentShortCode}?key=${key}`)
      .send({
        url: updatedUrl,
      })
      .expect(404);
  });
});
