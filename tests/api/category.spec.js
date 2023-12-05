const { test, expect, request } = require('@playwright/test');

const generateRandomString = function (length = 6) {
  return Math.random().toString(20).substr(2, length) + '@example';
};

let apiContext;

test.beforeAll('TC_A001: sign in', async () => {
  apiContext = await request.newContext();
  console.log(`${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/signin`);
  const signinResponse = await apiContext.post(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/signin`,
    {
      form: {
        email: process.env.NEXT_PUBLIC_USER,
        password: process.env.NEXT_PUBLIC_PASSWORD,
      },
      maxRedirects: 0,
    }
  );
  expect(signinResponse._initializer).toHaveProperty('status', 301);
});

test('TC_A201: create category (fail)', async () => {
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

test('TC_A202: create category (success)', async () => {
  const file = path.resolve('./tests/picture', 'Wendy.jpg');
  const image = fs.readFileSync(file);
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
