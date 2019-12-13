import request from "supertest";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import app from "../app";
import uri from "../assets/uris";

dotenv.config();

const tester = {
  id: 2,
  name: "tester",
  email: "test@jest.com",
  authority: "손님",
  latitude: 123.1234,
  longitude: 76.1234,
  reputation: 10,
  numberOfRater: 3
};

it("get current user info test", () =>
  new Promise(done => {
    const key = process.env.JWT_PRIVATE_KEY;
    const token = jwt.sign(tester, key);

    request(app)
      .get("/myInfo")
      .set("Cookie", [`jwt=${token}`])
      .then(res => done(res));
  }).then(res => {
    expect(res.status).toBe(200);
    expect(res.text).toBe(JSON.stringify(tester));
  }));
it("log out test", () =>
  new Promise(done => {
    const key = process.env.JWT_PRIVATE_KEY;
    const token = jwt.sign(tester, key);

    request(app)
      .get("/logout")
      .set("Cookie", [`jwt=${token}`])
      .then(res => done(res));
  }).then(res => {
    expect(res.status).toBe(200);
    expect(res.headers["set-cookie"][0]).toBe(
      "jwt=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT"
    );
  }));

it("use invalid jwt token test", () =>
  new Promise(done => {
    const key = "random Wrong key";
    const token = jwt.sign(tester, key);

    request(app)
      .get("/myInfo")
      .set("Cookie", [`jwt=${token}`])
      .then(res => done(res));
  }).then(res => {
    expect(res.status).toBe(400);
  }));

it("add User test", () =>
  new Promise(done => {
    const newUser = {
      name: "tester",
      email: `${new Date().getMilliseconds() +
        new Date().getMilliseconds()}tester@jest.com`
    };
    const key = process.env.JWT_PRIVATE_KEY;
    const token = jwt.sign(newUser, key);

    request(app)
      .post("/addUser")
      .send({ latitude: 123.456, longitude: 76.54 })
      .set("Cookie", [`jwt=${token}`])
      .then(res => done(res));
  }).then(res => {
    expect(res.status).toBe(302);
    expect(res.headers.location).toBe(uri.clientMainPage);
  }));

it("add user fail test", () =>
  new Promise(done => {
    const newUser = {
      name: "tester",
      email: `${new Date().getMilliseconds() +
        new Date().getMilliseconds()}tester@jest.com`
    };
    const key = "invalid wrong key";
    const token = jwt.sign(newUser, key);

    request(app)
      .post("/addUser")
      .send({ latitude: 123.456, longitude: 76.54 })
      .set("Cookie", [`jwt=${token}`])
      .then(res => done(res));
  }).then(res => {
    expect(res.status).toBe(400);
    expect(res.headers["set-cookie"][0]).toBe(
      "jwt=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT"
    );
  }));
