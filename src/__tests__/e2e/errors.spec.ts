import "../../helpers/load_env.js";

import { Application } from "express-serve-static-core";
import request from "supertest";

import { clearTable, connectDb, disconnectDb } from "../../database/db.js";
import { createApp } from "../../app/app.js";

const app: Application = createApp();
connectDb(true);

afterAll(async () => {
  await clearTable();
  await disconnectDb();
});

describe("Getting 404 errors", () => {
  it("should get 404 on PUT /random/path", async () => {
    await request(app).put("/random/path").expect(404);
  });

  it("should get 404 on OPTIONS /something/else", async () => {
    await request(app).options("/something/else").expect(404);
  });
});

describe("Getting 405 errors", () => {
  it("should get 405 on DELETE /shorten", async () => {
    const response = await request(app).delete("/shorten");
    const allowHeader = response.headers.allow;
    const allowedMethods = allowHeader?.split(", ");

    expect(response.statusCode).toBe(405);
    expect(allowHeader).toBeDefined();
    expect(allowedMethods).toContain("POST");
    expect(allowedMethods?.length).toBe(1);
  });

  it("should get 405 on PATCH /shorten/:shortCode", async () => {
    const response = await request(app).patch("/shorten/aaaaaa");
    const allowHeader = response.headers.allow;
    const allowedMethods = allowHeader?.split(", ");

    expect(response.statusCode).toBe(405);
    expect(allowHeader).toBeDefined();
    expect(allowedMethods).toContain("GET");
    expect(allowedMethods).toContain("PUT");
    expect(allowedMethods).toContain("DELETE");
    expect(allowedMethods?.length).toBe(3);
  });

  it("should get 405 on POST /shorten/:shortCode/stats", async () => {
    const response = await request(app).delete("/shorten/aaaaaa/stats");
    const allowHeader = response.headers.allow;
    const allowedMethods = allowHeader?.split(", ");

    expect(response.statusCode).toBe(405);
    expect(allowHeader).toBeDefined();
    expect(allowedMethods).toContain("GET");
    expect(allowedMethods?.length).toBe(1);
  });

  it("should get 405 on PUT /:shortCode", async () => {
    const response = await request(app).delete("/aaaaaa");
    const allowHeader = response.headers.allow;
    const allowedMethods = allowHeader?.split(", ");

    expect(response.statusCode).toBe(405);
    expect(allowHeader).toBeDefined();
    expect(allowedMethods).toContain("GET");
    expect(allowedMethods?.length).toBe(1);
  });
});
