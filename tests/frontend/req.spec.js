import { test, expect } from '@playwright/test';

const generateRandomString = function (length = 6) {
  return Math.random().toString(20).substr(2, length) + '@example';
};

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
  await page.locator('svg').nth(1).click();
  await page.getByLabel('Edit').setInputFiles('./tests/picture/Wendy.jpg');
  await page.getByRole('button', { name: 'Confirm' }).click();
  await page.waitForURL();
  await expect(page.getByRole('main')).toContainText('sort your favourite');
});

test('TC_R002: User can sign in and sign out', async ({ page }) => {
  await page.goto(`${process.env.NEXT_PUBLIC_BASE_URL}`);
  await page.getByRole('button', { name: 'Get Start!' }).click();
  await page.getByPlaceholder('Email').click();
  await page.getByPlaceholder('Email').fill(process.env.NEXT_PUBLIC_USER);
  await page.getByPlaceholder('Password').click();
  await page
    .getByPlaceholder('Password')
    .fill(process.env.NEXT_PUBLIC_PASSWORD);
  await page.getByRole('button', { name: 'Sign in' }).click();
  await expect(page.locator('body')).toContainText('Nice to see you');
  await page.getByRole('button', { name: 'profile' }).click();
  await page.getByRole('button', { name: 'logout icon Logout' }).click();
  await expect(page.getByRole('main')).toContainText('sort your favourite');
});

test.skip('TC_R003: User can view existed and create new tier list', async ({
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
  await expect(page.locator('body')).toContainText('test_tier_list_operation');
  await page.getByRole('button', { name: 'add' }).click();
  await page.getByPlaceholder('Tier-list Name').click();
  // please identify target tierlist's name belowed
  await page.getByPlaceholder('Tier-list Name').fill('uvuvwevwe');
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
  await expect(page.getByRole('main')).toContainText('All of my heart');
});

test.skip('TC_R004: User can delete tier list', async ({ page }) => {
  await page.goto(`${process.env.NEXT_PUBLIC_BASE_URL}`);
  await page.getByRole('button', { name: 'Get Start!' }).click();
  await page.getByPlaceholder('Email').click();
  await page.getByPlaceholder('Email').fill(process.env.NEXT_PUBLIC_USER);
  await page.getByPlaceholder('Password').click();
  await page
    .getByPlaceholder('Password')
    .fill(process.env.NEXT_PUBLIC_PASSWORD);
  await page.getByRole('button', { name: 'Sign in' }).click();
  await expect(page.locator('body')).toContainText('Nice to see you');
  await page.waitForTimeout(1000);
  // please identify target tierlist's locator belowed
  await page.getByRole('link', { name: 'TierList picture uvuvwevwe' }).click();
  await page.getByRole('button', { name: 'delete icon Delete' }).click();
  await page.getByRole('button', { name: 'Delete' }).click();
  await expect(page.getByText('Delete successfully')).toBeVisible();
});

test.skip('TC_R005: User can import picture into tier list', async ({
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
  await expect(page.locator('body')).toContainText('Nice to see you');
  // please identify target tierlist's locator belowed
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

test.skip('TC_R006: User can add and delete picture in tier list row', async ({
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
  await expect(page.locator('body')).toContainText('Nice to see you');
  await page
    .getByRole('link', {
      name: 'TierList picture test_tier_list_operation',
    })
    .click();
  await page.getByRole('button', { name: 'Edit' }).click();
  await page.getByRole('button', { name: 'add new image' }).click();
  await page.getByPlaceholder('Title Name').click();
  await page.getByPlaceholder('Title Name').fill('Wendy');
  await page.locator('#swal-input2').click();
  await page.locator('#swal-input2').setInputFiles('./tests/picture/Wendy.jpg');
  await page.getByRole('button', { name: 'Add' }).click();
  await page.getByRole('button', { name: 'Wendy', exact: true }).click();
  await page
    .getByLabel('Row list')
    .selectOption('9592f9ed-9025-43ed-81b8-076426ebf01c');
  await page.getByRole('button', { name: 'Done' }).click();
  await page.getByRole('button', { name: 'Wendy', exact: true }).click();
  // this step migth be fail if response is slower
  await page.getByRole('button', { name: 'delete button' }).click();
  await page.getByRole('button', { name: 'Delete' }).click();
  await expect(page.getByRole('button', { name: 'Wendy' })).not.toBeVisible();
});

test.skip('TC_R007: User can view and edit profile', async ({ page }) => {
  await page.goto(`${process.env.NEXT_PUBLIC_BASE_URL}`);
  await page.getByRole('button', { name: 'Get Start!' }).click();
  await page.getByPlaceholder('Email').click();
  await page.getByPlaceholder('Email').fill(process.env.NEXT_PUBLIC_USER);
  await page.getByPlaceholder('Password').click();
  await page
    .getByPlaceholder('Password')
    .fill(process.env.NEXT_PUBLIC_PASSWORD);
  await page.getByRole('button', { name: 'Sign in' }).click();
  await expect(page.locator('body')).toContainText('Nice to see you');

  await page.getByRole('button', { name: 'profile' }).click();
  await page.getByRole('button', { name: 'Edit' }).click();
  await page.getByPlaceholder('Username').click();
  await page.getByPlaceholder('Username').fill('TESTER_MODIFY');
  await page.getByPlaceholder('About Me').click();
  const testText = generateRandomString();
  await page.getByPlaceholder('About Me').fill(testText);
  await page.getByRole('button', { name: 'Save' }).click();
  await expect(page.getByPlaceholder('About Me')).toContainText(testText);
  await page.getByPlaceholder('Username').click();
});

test.skip('TC_R008: User can save tier list changes', async ({ page }) => {
  await page.goto(`${process.env.NEXT_PUBLIC_BASE_URL}`);
  await page.getByRole('button', { name: 'Get Start!' }).click();
  await page.getByPlaceholder('Email').click();
  await page.getByPlaceholder('Email').fill(process.env.NEXT_PUBLIC_USER);
  await page.getByPlaceholder('Password').click();
  await page
    .getByPlaceholder('Password')
    .fill(process.env.NEXT_PUBLIC_PASSWORD);
  await page.getByRole('button', { name: 'Sign in' }).click();
  await expect(page.locator('body')).toContainText('Nice to see you');

  await page
    .getByRole('link', {
      name: 'TierList picture test_tier_list_operation',
    })
    .click();
  await page.getByRole('button', { name: 'Edit' }).click();
  await page.getByRole('button', { name: 'add new image' }).click();
  await page.getByPlaceholder('Title Name').fill('Wendy');
  await page.locator('#swal-input2').click();
  await page.locator('#swal-input2').setInputFiles('Wendy.jpg');
  await page.getByRole('button', { name: 'Add' }).click();
  await page.getByRole('button', { name: 'Save' }).click();
  await page.getByRole('button', { name: 'Edit' }).click();
  await expect(page.getByRole('button', { name: 'Wendy' })).toBeVisible();
});

test.skip('TC_R009: User can edit tier list properties', async ({ page }) => {
  await page.goto(`${process.env.NEXT_PUBLIC_BASE_URL}`);
  await page.getByRole('button', { name: 'Get Start!' }).click();
  await page.getByPlaceholder('Email').click();
  await page.getByPlaceholder('Email').fill(process.env.NEXT_PUBLIC_USER);
  await page.getByPlaceholder('Password').click();
  await page
    .getByPlaceholder('Password')
    .fill(process.env.NEXT_PUBLIC_PASSWORD);
  await page.getByRole('button', { name: 'Sign in' }).click();
  await expect(page.locator('body')).toContainText('Nice to see you');

  // please change the detail of target and changes in `//` lines
  await page
    .getByRole('link', {
      name: 'TierList picture test_tier_list_operation',
    })
    .click(); //
  await page.getByRole('button', { name: 'Edit' }).click();
  await page.getByRole('button', { name: 'Edit Detail' }).click();
  await page.getByPlaceholder('Tierlist Name').click();
  await page
    .getByPlaceholder('Tierlist Name')
    .fill('test_tier_list_operations'); //
  const testText = generateRandomString();
  await page.getByPlaceholder('Description').click();
  await page.getByPlaceholder('Description').fill(testText);
  await page.getByRole('button', { name: 'Save' }).click();
  await expect(page.locator('body')).toContainText('test_tier_list_operations'); //
});

test.skip('TC_R010: User can search owned tier list', async ({ page }) => {
  await page.goto(`${process.env.NEXT_PUBLIC_BASE_URL}`);
  await page.getByRole('button', { name: 'Get Start!' }).click();
  await page.getByPlaceholder('Email').click();
  await page.getByPlaceholder('Email').fill(process.env.NEXT_PUBLIC_USER);
  await page.getByPlaceholder('Password').click();
  await page
    .getByPlaceholder('Password')
    .fill(process.env.NEXT_PUBLIC_PASSWORD);
  await page.getByRole('button', { name: 'Sign in' }).click();
  await expect(page.locator('body')).toContainText('Nice to see you');
});

test.skip('TC_R011: User can add new category in tierlist creation', async ({
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
  await expect(page.locator('body')).toContainText('Nice to see you');

  await page.getByPlaceholder('Search').click();
  await page.getByPlaceholder('Search').fill('test_tier');
  await expect(page.locator('body')).toContainText('test_tier_list_operations');
  await page.getByPlaceholder('Search').click();
  await page.getByPlaceholder('Search').fill('test_tier_jojo');
  await expect(page.locator('body')).not.toContainText(
    'test_tier_list_operations'
  );
});

test.skip('TC_R012: User can rename tier list row label', async ({ page }) => {
  await page.goto(`${process.env.NEXT_PUBLIC_BASE_URL}`);
  await page.getByRole('button', { name: 'Get Start!' }).click();
  await page.getByPlaceholder('Email').click();
  await page.getByPlaceholder('Email').fill(process.env.NEXT_PUBLIC_USER);
  await page.getByPlaceholder('Password').click();
  await page
    .getByPlaceholder('Password')
    .fill(process.env.NEXT_PUBLIC_PASSWORD);
  await page.getByRole('button', { name: 'Sign in' }).click();
  await expect(page.locator('body')).toContainText('Nice to see you');

  await page
    .getByRole('link', {
      name: 'TierList picture test_tier_list_operations Required',
    })
    .click();
  // please change the detail of target and changes in `//` lines
  await page.getByRole('link', { name: 'Modifie' }).click(); //
  await page.waitForTimeout(3000);
  await page.getByRole('button', { name: 'Edit' }).click();

  await page.getByRole('textbox').click();
  await page.getByRole('textbox').fill('Modified'); //
  await page.getByRole('button', { name: 'Save' }).click();
  await page
    .locator('div')
    .filter({ hasText: /^EditDelete This Row$/ })
    .getByRole('button')
    .first()
    .click();
  await expect(page.getByRole('main')).toContainText('Modified'); //
});

test.skip('TC_R013: User can add or delete rows in tier list', async ({
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
  await expect(page.locator('body')).toContainText('Nice to see you');

  await page
    .getByRole('link', {
      name: 'TierList picture test_tier_list_operations Required',
    })
    .click();
  await page.getByRole('button', { name: 'Edit' }).click();
  await page
    .getByRole('button', { name: 'add text icon Add new Level' })
    .click();
  await page.getByRole('button', { name: 'Save' }).click();
  await expect(page.getByRole('button', { name: 'Ummm' })).toBeVisible();
  await page.getByRole('link', { name: 'Ummm' }).click();
  await page.waitForTimeout(3000);
  await page
    .getByRole('button', { name: 'delete icon Delete This Row' })
    .click();
  await page.getByRole('button', { name: 'Delete' }).click();
  await expect(page.getByText('Delete Ummm row successfully')).toBeVisible();
});

test.skip('TC_R014: User can export tier list as image', async ({ page }) => {
  await page.goto(`${process.env.NEXT_PUBLIC_BASE_URL}`);
  await page.getByRole('button', { name: 'Get Start!' }).click();
  await page.getByPlaceholder('Email').click();
  await page.getByPlaceholder('Email').fill(process.env.NEXT_PUBLIC_USER);
  await page.getByPlaceholder('Password').click();
  await page
    .getByPlaceholder('Password')
    .fill(process.env.NEXT_PUBLIC_PASSWORD);
  await page.getByRole('button', { name: 'Sign in' }).click();
  await expect(page.locator('body')).toContainText('Nice to see you');

  await page
    .getByRole('link', {
      name: 'TierList picture test_tier_list_operations Required',
    })
    .click();
  const downloadPromise = page.waitForEvent('download');
  await page.getByRole('button', { name: 'Export' }).click();
  const download = await downloadPromise;
  expect(download.suggestedFilename()).toContain('.jpg');
  await expect(page.getByLabel('Export Complete!')).toBeVisible();
  await page.getByRole('button', { name: 'Done' }).click();
});
