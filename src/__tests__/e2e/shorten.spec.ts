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
  it("should validate key and short code", async () => {
    let response;

    response = await request(app).put(`/shorten/abcdefg?key=${key}`).send({
      url: updatedUrl,
    });
    expect(response.statusCode).toBe(400);
    expect(response.body.message).toContain("shortCode");

    response = await request(app)
      .put(`/shorten/${shortCode}?key=invalidKey`)
      .send({
        url: updatedUrl,
      });
    expect(response.statusCode).toBe(400);
    expect(response.body.message).toContain("key");

    response = await request(app).put(`/shorten/${shortCode}?key=${key}`);
    expect(response.statusCode).toBe(400);
    expect(response.body.message).toContain("url");
  });

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

  it("should successfully update the short url", async () => {
    await request(app)
      .put(`/shorten/${shortCode}?key=${key}`)
      .send({
        url: updatedUrl,
      })
      .expect(200);
  });
});

describe("Getting short url info", () => {
  it("should successfully get the updated url", async () => {
    const response = await request(app).get(`/shorten/${shortCode}`);

    expect(response.statusCode).toBe(200);
    expect(response.body.data.url).toBe(updatedUrl);
  });

  it("should deny unauthorized access to stats", async () => {
    await request(app)
      .get(`/shorten/${shortCode}/stats?key=${differentKey}`)
      .expect(404);

    await request(app)
      .get(`/shorten/${differentShortCode}/stats?key=${key}`)
      .expect(404);
  });

  it("should successfully get the stats", async () => {
    const response = await request(app).get(
      `/shorten/${shortCode}/stats?key=${key}`
    );

    expect(response.statusCode).toBe(200);
    expect(response.body.data.url).toBe(updatedUrl);
    expect(response.body.data.views).toBe(0);
  });
});

describe("Visiting the short url", () => {
  it("should not redirect when short code is invalid", async () => {
    await request(app).get(`/${differentShortCode}`).expect(404);
  });

  it("should successfully redirect to the original url", async () => {
    await request(app).get(`/${shortCode}`).expect(301);
  });

  it("should increment views when visited", async () => {
    const response = await request(app).get(
      `/shorten/${shortCode}/stats?key=${key}`
    );

    expect(response.statusCode).toBe(200);
    expect(response.body.data.views).toBe(1);
  });
});
