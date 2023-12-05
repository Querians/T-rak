const { test, expect, request } = require('@playwright/test');

const generateRandomString = function (length = 6) {
  return Math.random().toString(20).substr(2, length) + '@example';
};

let apiContext;

test('TC_A001: sign in', async () => {
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

// test.skip('TC_A002: sign out', async () => {
//   const signoutResponse = await apiContext.post(
//     `${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/signout`,
//     { maxRedirects: 0 }
//   );
//   console.log(signoutResponse);
//   expect(signoutResponse._initializer).toHaveProperty('status', 301);
// });

test.skip('TC_A003: sign up', async () => {
  const response = await apiContext.post(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/signin`,
    {
      form: {
        email: generateRandomString(),
        password: 'se@2023',
        name: generateRandomString(),
      },
      maxRedirects: 0,
    }
  );
  const responseBody = JSON.parse(await response.text());
  console.log(responseBody);
  expect(response.status()).toBe(200);
  // expect(responseBody).toHaveProperty('tierlistId');
  // expect(responseBody).toHaveProperty('categoryId');
  // expect(responseBody).toHaveProperty('userId');
  // expect(responseBody).toHaveProperty('name');
  // expect(responseBody).toHaveProperty('description');
  // expect(responseBody).toHaveProperty('coverPhotoUrl');
});
