import { Application } from "express";
import request from "supertest";
import { createApp } from "../../app/app.js";
import { connectDb } from "../../database/db.js";

const app: Application = createApp();

describe("Creating a short URL", () => {
  beforeAll(() => {
    connectDb(true);
  });
});
