/** To run tests, you need to specify following variables in `.env.local`:
 * NEXT_PUBLIC_BASE_URL,
 * NEXT_PUBLIC_USER,
 * NEXT_PUBLIC_PASSWORD
 * */

const {
  test,
  expect,
  request,
  APIRequestContext,
} = require('@playwright/test');

import fs from 'fs';

const generateRandomString = function (length = 6) {
  return Math.random().toString(20).substr(2, length) + '@example';
};

var apiContext;

test('TC_A001: sign up', async () => {
  apiContext = await request.newContext();
  const response = await apiContext.post(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/signup`,
    {
      headers: {
        ContentType: 'multipart/form-data',
      },
      multipart: {
        picture: fs.createReadStream('./tests/picture/Wendy.jpg'),
        email: generateRandomString() + '.com',
        password: 'Se@2023',
        name: generateRandomString(),
      },
      maxRedirects: 2,
    }
  );
  console.log(response);
  expect(response.status()).toBe(200);
});

test('TC_A002: sign in', async () => {
  apiContext = await request.newContext();
  console.log(`${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/signin`);
  const response = await apiContext.post(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/signin`,
    {
      form: {
        email: process.env.NEXT_PUBLIC_USER,
        password: process.env.NEXT_PUBLIC_PASSWORD,
      },
      maxRedirects: 2,
    }
  );
  console.log(response);
  expect(response.status()).toBe(200);
});

test.afterAll('TC_A003: sign out', async () => {
  const response = await apiContext.post(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/signout`,
    { maxRedirects: 1 }
  );
  console.log(response);
  expect(response.status()).toBe(200);
});
