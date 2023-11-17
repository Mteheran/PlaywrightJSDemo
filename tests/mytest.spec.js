const { test, expect } = require('@playwright/test');

test('Login pass', async ({ page }) => {
  await page.goto('https://www.saucedemo.com/');
  await page.locator("#user-name").fill("standard_user");
  await page.locator("#password").fill("secret_sauce");
  await page.locator('#login-button').click();

  // Expect a title "to contain" a substring.
  await expect(await page.locator('.app_logo')).toHaveText('Swag Labs')
});
