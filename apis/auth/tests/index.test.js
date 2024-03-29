import request from 'supertest';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import uuid from 'uuid/v5';
import app from '../app';
import user from '../core/userManagement';

dotenv.config();

const tester = {
  id: uuid('test@jest.com', uuid.DNS),
  name: 'tester',
  email: 'test@jest.com',
  authority: '손님',
  latitude: 123.1234,
  longitude: 76.1234,
  reputation: 10,
  numberOfRater: 3,
};

it('get current user info test', () => new Promise((resolve) => {
  const key = process.env.JWT_PRIVATE_KEY;
  const token = jwt.sign(tester, key);

  request(app)
    .get('/myInfo')
    .set('Cookie', [`jwt=${token}`])
    .then((res) => resolve(res));
}).then((res) => {
  expect(res.status).toBe(200);
  expect(res.text).toBe(JSON.stringify(tester));
}));
it('log out test', () => new Promise((resolve) => {
  const key = process.env.JWT_PRIVATE_KEY;
  const token = jwt.sign(tester, key);

  request(app)
    .get('/logout')
    .set('Cookie', [`jwt=${token}`])
    .then((res) => resolve(res));
}).then((res) => {
  expect(res.status).toBe(200);
  expect(res.headers['set-cookie'][0]).toBe(
    'jwt=; Domain=.oemarket.shop; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT; HttpOnly',
  );
}));

it('use invalid jwt token test', () => new Promise((resolve) => {
  const key = 'random Wrong key';
  const token = jwt.sign(tester, key);

  request(app)
    .get('/myInfo')
    .set('Cookie', [`jwt=${token}`])
    .then((res) => resolve(res));
}).then((res) => {
  expect(res.status).toBe(400);
}));

it('add User test', () => new Promise((resolve) => {
  const newUser = {
    name: 'tester',
    email: `${new Date().getMilliseconds()
        + new Date().getMilliseconds()}tester@jest.com`,
  };
  const key = process.env.JWT_PRIVATE_KEY;
  const token = jwt.sign(newUser, key);

  request(app)
    .post('/addUser')
    .send({ latitude: 123.456, longitude: 76.54 })
    .set('Cookie', [`jwt=${token}`])
    .then((res) => resolve(res));
}).then((res) => {
  expect(res.status).toBe(200);
  expect(res.headers['content-type']).toBe('application/json; charset=utf-8');
}));
it('add user fail test', () => new Promise((resolve) => {
  const newUser = {
    name: 'tester',
    email: `${new Date().getMilliseconds()
        + new Date().getMilliseconds()}tester@jest.com`,
  };
  const newUserLocation = { latitude: 123.456, longitude: 76.54 };
  const key = 'invalid wrong key';
  const token = jwt.sign(newUser, key);

  request(app)
    .post('/addUser')
    .send(newUserLocation)
    .set('Cookie', [`jwt=${token}`])
    .then((res) => resolve(res));
}).then((res) => {
  expect(res.status).toBe(400);
  expect(res.headers['set-cookie'][0]).toBe(
    'jwt=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT',
  );
}));
it('get seller info test', () => new Promise((resolve) => {
  const sellerID = '2d50da16-ed7f-5802-aec6-59da27ec9142';
  request(app)
    .get(`/seller/${sellerID}`)
    .then((res) => resolve(res));
}).then((res) => {
  expect(res.status).toBe(200);
  expect(res.headers['content-type']).toBe('application/json; charset=utf-8');
}));

it('check exist member fail test', async () => {
  const info = { name: 'foo', email: 'foo@jest.com' };
  let result;
  try {
    result = await user.checkExistMember(info);
  } catch (e) {
    result = e;
  }
  expect(JSON.stringify(result)).toBe(JSON.stringify(info));
});

it('get token test', () => new Promise((resolve) => {
  const key = process.env.JWT_PRIVATE_KEY;
  const token = jwt.sign(tester, key);

  request(app)
    .get('/myToken')
    .set('Cookie', [`jwt=${token}`])
    .then((res) => resolve(res));
}).then((res) => {
  const key = process.env.JWT_PRIVATE_KEY;
  const token = jwt.sign(tester, key);

  expect(res.status).toBe(200);
  expect(res.headers['content-type']).toBe('application/json; charset=utf-8');
  expect(res.text).toBe(JSON.stringify({ token }));
}));
