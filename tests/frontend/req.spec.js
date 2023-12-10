import { test, expect } from '@playwright/test';

const generateRandomString = function (length = 6) {
  return Math.random().toString(20).substr(2, length) + '@example';
};

const testTierListName = 'uvuvwevwe';

test('TC_R001: User can sign up', async ({ page }) => {
  await page.goto(`${process.env.NEXT_PUBLIC_BASE_URL}`);
  await page.getByRole('button', { name: 'Get Start!' }).click();
  await page.getByRole('button', { name: 'Sign up' }).click();
  await page.getByPlaceholder('Email').click();
  await page.getByPlaceholder('Email').fill(generateRandomString() + '.com');
  await page.getByPlaceholder('Username').click();
  await page.getByPlaceholder('Username').fill(generateRandomString());
  await page.getByPlaceholder('Password').click();
  await page.getByPlaceholder('Password').fill('123456789');
  await page.locator('svg').click();
  await page.getByLabel('Edit').setInputFiles('./tests/picture/Wendy.jpg');
  await page.getByRole('button', { name: 'Confirm' }).click();
  await page.waitForURL();
  await expect(page.getByRole('main')).toContainText('sort your favourite');
});

test('TC_R002: User can log in', async ({ page }) => {
  await page.goto(`${process.env.NEXT_PUBLIC_BASE_URL}`);
  await page.getByRole('button', { name: 'Get Start!' }).click();
  await page.getByPlaceholder('Email').click();
  await page.getByPlaceholder('Email').fill(process.env.NEXT_PUBLIC_USER);
  await page.getByPlaceholder('Password').click();
  await page
    .getByPlaceholder('Password')
    .fill(process.env.NEXT_PUBLIC_PASSWORD);
  await page.getByRole('button', { name: 'Sign in' }).click();
  await page.getByRole('button', { name: 'Get Start!' }).click();
  await page.waitForURL(`${process.env.NEXT_PUBLIC_BASE_URL}/home`);
  await expect(page.locator('body')).toContainText('Nice to see you');
});

test('TC_R003: User can log out', async ({ page }) => {
  await page.goto(`${process.env.NEXT_PUBLIC_BASE_URL}`);
  await page.getByRole('button', { name: 'Get Start!' }).click();
  await page.getByPlaceholder('Email').click();
  await page.getByPlaceholder('Email').fill(process.env.NEXT_PUBLIC_USER);
  await page.getByPlaceholder('Password').click();
  await page
    .getByPlaceholder('Password')
    .fill(process.env.NEXT_PUBLIC_PASSWORD);
  await page.getByRole('button', { name: 'Sign in' }).click();
  await page.getByRole('button', { name: 'Get Start!' }).click();
  await expect(page.locator('body')).toContainText('Nice to see you');
  await page.getByRole('button', { name: 'profile' }).click();
  await page.getByRole('button', { name: 'logout icon Logout' }).click();
  await expect(page.getByRole('main')).toContainText('sort your favourite');
});

test.skip('TC_R004: User can create new tier list', async ({ page }) => {
  await page.goto(`${process.env.NEXT_PUBLIC_BASE_URL}`);
  await page.getByRole('button', { name: 'Get Start!' }).click();
  await page.getByPlaceholder('Email').click();
  await page.getByPlaceholder('Email').fill(process.env.NEXT_PUBLIC_USER);
  await page.getByPlaceholder('Password').click();
  await page
    .getByPlaceholder('Password')
    .fill(process.env.NEXT_PUBLIC_PASSWORD);
  await page.getByRole('button', { name: 'Sign in' }).click();
  await page.getByRole('button', { name: 'Get Start!' }).click();
  await expect(page.locator('body')).toContainText('Nice to see you');
  await page.getByRole('button', { name: 'add' }).click();
  await page.getByPlaceholder('Tier-list Name').click();
  await page.getByPlaceholder('Tier-list Name').fill(testTierListName);
  await page.locator('label svg').click();
  await page.getByLabel('Edit').setInputFiles('./tests/picture/Wendy.jpg');
  await page
    .locator('div')
    .filter({ hasText: /^Category$/ })
    .locator('div')
    .nth(1)
    .click();
  await page.waitForTimeout(1000);
  await page.getByText('anime').click();
  await page.getByPlaceholder('Description').click();
  await page.getByPlaceholder('Description').fill(generateRandomString());
  await page.getByRole('button', { name: 'Save' }).click();
  await expect(page.getByRole('main')).toContainText('Row 1');
});

test.skip('TC_R005: User can delete tier list', async ({ page }) => {
  await page.goto(`${process.env.NEXT_PUBLIC_BASE_URL}`);
  await page.getByRole('button', { name: 'Get Start!' }).click();
  await page.getByPlaceholder('Email').click();
  await page.getByPlaceholder('Email').fill(process.env.NEXT_PUBLIC_USER);
  await page.getByPlaceholder('Password').click();
  await page
    .getByPlaceholder('Password')
    .fill(process.env.NEXT_PUBLIC_PASSWORD);
  await page.getByRole('button', { name: 'Sign in' }).click();
  await page.getByRole('button', { name: 'Get Start!' }).click();
  await expect(page.locator('body')).toContainText('Nice to see you');
  await page.waitForTimeout(1000);
  await page.getByRole('link', { name: 'TierList picture uvuvwevwe' }).click();
  await page.getByRole('button', { name: 'delete icon Delete' }).click();
  await page.getByRole('button', { name: 'Delete' }).click();
  await expect(page.getByText('Delete successfully')).toBeVisible();
});

test.only('TC_R006: User can import picture into tier list', async ({
  page,
}) => {
  await page.goto(`${process.env.NEXT_PUBLIC_BASE_URL}`);
  await page.getByRole('button', { name: 'Get Start!' }).click();
  await page.getByPlaceholder('Email').click();
  await page.getByPlaceholder('Email').fill(process.env.NEXT_PUBLIC_USER);
  await page.getByPlaceholder('Password').click();
  await page
    .getByPlaceholder('Password')
    .fill(process.env.NEXT_PUBLIC_PASSWORD);
  await page.getByRole('button', { name: 'Sign in' }).click();
  await page.getByRole('button', { name: 'Get Start!' }).click();
  await expect(page.locator('body')).toContainText('Nice to see you');
  await page
    .getByRole('link', { name: 'TierList picture do_not_delete_please anime' })
    .click();
  await page.getByRole('button', { name: 'Edit' }).click();
  await page.getByRole('button', { name: 'add new image' }).click();
  await page.getByPlaceholder('Title Name').fill('Wendy');
  await page.locator('#swal-input2').click();
  await page.locator('#swal-input2').setInputFiles('./tests/picture/Wendy.jpg');
  await page.getByRole('button', { name: 'Add' }).click();
  await page.waitForTimeout(2000);
  await expect(page.getByRole('button', { name: 'Wendy' })).toBeVisible();
});

test('TC_R007: User can add or delete picture in tier list row', async ({
  page,
}) => {});

test('TC_R008: User can delete picture from system', async ({ page }) => {});

test('TC_R009: User can adjust number of rows', async ({ page }) => {});

test('TC_R010: User can rename tier list', async ({ page }) => {});

test('TC_R011: User can edit label in row', async ({ page }) => {});

test('TC_R012: User can edit profile', async ({ page }) => {});

test('TC_R013: User can export tier list as image', async ({ page }) => {});

test('TC_R014: User can search owned tier list', async ({ page }) => {});
