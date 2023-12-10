/** To run tests, you need to specify following variables in `.env.local`:
 * NEXT_PUBLIC_BASE_URL,
 * NEXT_PUBLIC_USER,
 * NEXT_PUBLIC_PASSWORD
 * */

const { test, expect, request } = require('@playwright/test');

import fs from 'fs';

const generateRandomString = function (length = 6) {
  return Math.random().toString(20).substr(2, length) + '@example';
};

let apiContext;

// To run tests, you also need to specify following variables:
const testTierlistId = '020e31c0-0d85-4d7e-abd8-a2f83b89255b';
const testTierlistRowId = '222d1ca8-109c-47ec-bf8e-3e134e45f33a';
// please ensure that current user authorized to delete this tierlist and row:
const delTierlistId = '61677f79-28e9-4a4b-8104-72e39cde7303';
const delTierlistRowId = 'fa6fbc5b-e09d-4d36-b761-5c204480eeb1';

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

test('TC_A301_1: create new tierlist (success)', async () => {
  const response = await apiContext.post(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/tierlist/create`,
    {
      headers: {
        ContentType: 'multipart/form-data',
      },
      multipart: {
        description: generateRandomString(),
        name: generateRandomString(),
        rowCount: 10,
        categoryName: 'k-pop',
        coverPhoto: fs.createReadStream('./tests/picture/Wendy.jpg'),
      },
      maxRedirects: 1,
    }
  );
  // const responseBody = JSON.parse(await response.text());
  // console.log(responseBody);
  expect(response.status()).toBe(200);
  // expect(responseBody).toHaveProperty('tierlistId');
  // expect(responseBody).toHaveProperty('categoryId');
  // expect(responseBody).toHaveProperty('userId');
  // expect(responseBody).toHaveProperty('name');
  // expect(responseBody).toHaveProperty('description');
  // expect(responseBody).toHaveProperty('coverPhotoUrl');
});

test('TC_A301_2: create new tierlist (fail due to category missing)', async () => {
  const response = await apiContext.post(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/tierlist/create`,
    {
      headers: {
        ContentType: 'multipart/form-data',
      },
      multipart: {
        description: generateRandomString(),
        name: generateRandomString(),
        rowCount: 1,
        categoryName: '',
        coverPhoto: fs.createReadStream('./tests/picture/Wendy.jpg'),
      },
      maxRedirects: 0,
    }
  );
  const responseBody = JSON.parse(await response.text());
  console.log(responseBody);
  expect(response.status()).toBe(400);
  expect(responseBody.message).toBe('Category name is required');
});

test('TC_A301_3: create new tierlist (fail due to name missing)', async () => {
  const response = await apiContext.post(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/tierlist/create`,
    {
      headers: {
        ContentType: 'multipart/form-data',
      },
      multipart: {
        description: generateRandomString(),
        name: '',
        rowCount: 1,
        categoryName: 'Kpop',
        coverPhoto: fs.createReadStream('./tests/picture/Wendy.jpg'),
      },
      maxRedirects: 0,
    }
  );
  const responseBody = JSON.parse(await response.text());
  console.log(responseBody);
  expect(response.status()).toBe(400);
  expect(responseBody.message).toBe('Tierlist name is required');
});

test('TC_A301_4: create new tierlist (fail due to description missing)', async () => {
  const response = await apiContext.post(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/tierlist/create`,
    {
      headers: {
        ContentType: 'multipart/form-data',
      },
      multipart: {
        description: '',
        name: generateRandomString(),
        rowCount: 1,
        categoryName: 'Kpop',
        coverPhoto: fs.createReadStream('./tests/picture/Wendy.jpg'),
      },
      maxRedirects: 0,
    }
  );
  const responseBody = JSON.parse(await response.text());
  console.log(responseBody);
  expect(response.status()).toBe(400);
  expect(responseBody.message).toBe('Tierlist description is required');
});

test('TC_A301_5: create new tierlist (fail due to coverPhoto missing)', async () => {
  const response = await apiContext.post(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/tierlist/create`,
    {
      headers: {
        ContentType: 'multipart/form-data',
      },
      multipart: {
        description: generateRandomString(),
        name: generateRandomString(),
        rowCount: 1,
        categoryName: 'Kpop',
        coverPhoto: '',
      },
      maxRedirects: 0,
    }
  );
  const responseBody = JSON.parse(await response.text());
  console.log(responseBody);
  expect(response.status()).toBe(400);
  expect(responseBody.message).toBe('Tierlist cover photo is required');
});

test('TC_A302: update (edit) tier list', async () => {
  const response = await apiContext.post(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/tierlist/update`,
    {
      headers: {
        ContentType: 'multipart/form-data',
      },
      multipart: {
        tierlistId: testTierlistId,
        name: generateRandomString(),
        description: generateRandomString(),
        categoryName: 'Kpop',
      },
      maxRedirects: 0,
    }
  );
  const responseBody = JSON.parse(await response.text());
  console.log(responseBody);
  expect(response.status()).toBe(200);
  expect(responseBody).toHaveProperty('tierlistId');
  expect(responseBody).toHaveProperty('categoryId');
  expect(responseBody).toHaveProperty('userId');
  expect(responseBody).toHaveProperty('name');
  expect(responseBody).toHaveProperty('description');
  expect(responseBody).toHaveProperty('coverPhotoUrl');
});

test.skip('TC_A303: update row (no picture version)', async () => {
  const response = await apiContext.post(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/tierlist/row-x`,
    {
      Data: {
        elements: [
          {
            id: testTierlistRowId,
            title: 'test1',
            picture: './tests/picture/Wendy.jpg',
          },
        ],
        id: testTierlistId,
      },
      maxRedirects: 10,
    }
  );
  expect(response.status()).toBe(200);
});

test.skip('TC_A304: modify tier list/ update all rows (no picture insert version)', async () => {
  const response = await apiContext.post(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/tierlist/modify-x`,
    {
      Data: {
        elements: [
          {
            id: testTierlistRowId,
            title: 'test1',
            picture: './tests/picture/Wendy.jpg',
          },
        ],
        color: 'FAD4BE',
        label: 'row 1',
        id: testTierlistId,
      },
      maxRedirects: 10,
    }
  );
  expect(response.status()).toBe(200);
});

test('TC_A305: show all element in row', async () => {
  const response = await apiContext.get(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/tierlist/row`,
    {
      params: {
        id: testTierlistRowId,
      },
      maxRedirects: 0,
    }
  );
  const responseBody = JSON.parse(await response.text());
  console.log(responseBody);
  expect(response.status()).toBe(200);
});

test('TC_A306: show all rows and elements in tier list', async () => {
  const response = await apiContext.get(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/tierlist/show`,
    {
      params: {
        id: testTierlistId,
      },
      maxRedirects: 0,
    }
  );
  const responseBody = JSON.parse(await response.text());
  console.log(responseBody);
  expect(response.status()).toBe(200);
});

test('TC_A307: show all tier lists of user', async () => {
  const response = await apiContext.get(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/tierlist`,
    {
      maxRedirects: 0,
    }
  );
  const responseBody = JSON.parse(await response.text());
  console.log(responseBody);
  expect(response.status()).toBe(200);
});

test.skip('TC_A308: delete row', async () => {
  const response = await apiContext.delete(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/tierlist/row`,
    {
      params: {
        id: delTierlistRowId,
      },
      maxRedirects: 0,
    }
  );
  const responseBody = JSON.parse(await response.text());
  console.log(responseBody);
  expect(response.status()).toBe(200);
});

test.skip('TC_A309: delete tier list', async () => {
  const response = await apiContext.delete(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/tierlist`,
    {
      params: {
        id: delTierlistId,
      },
      maxRedirects: 0,
    }
  );
  const responseBody = JSON.parse(await response.text());
  console.log(responseBody);
  expect(response.status()).toBe(200);
});
