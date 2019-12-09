import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import axios from 'axios';

dotenv.config();

it('get current user info test', async () => {
  const tester = {
    id: 2,
    name: 'tester',
    email: 'test@jest.com',
    authority: '손님',
    latitude: 123.1234,
    longitude: 76.1234,
    reputation: 10,
    numberOfRater: 3,
  };
  const key = process.env.JWT_PRIVATE_KEY;
  const token = jwt.sign(tester, key);

  const options = {
    method: 'get',
    url: 'http://localhost:5001/myInfo',
    headers: {
      cookie: `jwt=${token}`,
    },
  };
  const {
    data: {
      id,
      name,
      email,
      authority,
      latitude,
      longitude,
      reputation,
      numberOfRater,
    },
  } = await axios(options);
  const result = {
    id,
    name,
    email,
    authority,
    latitude,
    longitude,
    reputation,
    numberOfRater,
  };
  expect(result).toEqual(tester);
});
it('log out test', async () => {
  const tester = {
    id: 2,
    name: 'tester',
    email: 'test@jest.com',
    authority: '손님',
    latitude: 123.1234,
    longitude: 76.1234,
    reputation: 10,
    numberOfRater: 3,
  };
  const key = process.env.JWT_PRIVATE_KEY;
  const token = jwt.sign(tester, key);

  const options = {
    method: 'get',
    url: 'http://localhost:5001/logout',
    headers: {
      cookie: `jwt=${token}`,
    },
  };
  const response = await axios(options);
  const cookies = response.headers['set-cookie'][0]
    .split(';')
    .map((cookie) => cookie.split('='));
  const responseToken = cookies.filter((cookie) => cookie[0] === 'jwt')[0][1];
  expect(responseToken).toEqual('');
});
