/** To run tests, you need to specify following variables in `.env.local`:
 * NEXT_PUBLIC_BASE_URL,
 * NEXT_PUBLIC_USER,
 * NEXT_PUBLIC_PASSWORD
 * */

const { test, expect, request } = require('@playwright/test');

const generateRandomString = function (length = 6) {
  return Math.random().toString(20).substr(2, length) + '@example';
};

let apiContext;

test.beforeAll('TC_A002: sign in', async () => {
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
  expect(response.status()).toBe(200);
});

test('TC_A201_2: create category (fail due to already exist )', async () => {
  const response = await apiContext.post(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/category`,
    {
      form: {
        categoryName: 'genshin',
      },
      maxRedirects: 0,
    }
  );
  const responseBody = JSON.parse(await response.text());
  console.log(responseBody);
  expect(response.status()).toBe(400);
  expect(responseBody.message).toBe('Category already exist');
});

test('TC_A202_1: create category (success)', async () => {
  const response = await apiContext.post(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/category`,
    {
      form: {
        categoryName: generateRandomString(),
      },
      maxRedirects: 0,
    }
  );
  const responseBody = JSON.parse(await response.text());
  console.log(responseBody);
  expect(response.status()).toBe(201);
  expect(responseBody.message).toBe('Category created successfully');
});
