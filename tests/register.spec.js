const { test, expect, request } = require('@playwright/test');
let cookie;
let apiContext;

test.beforeAll('test signin api success', async () => {
  apiContext = await request.newContext();
  const signinResponse = await apiContext.post(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/signin`,
    {
      form: {
        email: 'test@test',
        password: 'test@test',
      },
      maxRedirects: 0,
    }
  );
  //console.log(signinResponse._initializer);
  expect(signinResponse._initializer).toHaveProperty('status', 301);
  cookie = signinResponse._initializer.headers[2];
});

// test("set signin cookie", async ({page, context}) =>{
//     console.log(cookie)
// await context.addCookies([{cookie, domain: `${process.env.NEXT_PUBLIC_BASE_URL}`}]);
// await page.goto(`${process.env.NEXT_PUBLIC_BASE_URL}/signin`);
// await page.waitForURL(`${process.env.NEXT_PUBLIC_BASE_URL}/tierlist/workspace`);
// expect(page.getByText("Sign Out")).toBeVisible();
// });

test.only('test signout api success', async () => {
  const signoutResponse = await apiContext.post(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/signout`,
    { maxRedirects: 0 }
  );
  console.log(signoutResponse);
  expect(signoutResponse._initializer).toHaveProperty('status', 301);
});
