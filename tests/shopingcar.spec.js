const { test, expect } = require('@playwright/test');

test('Shoping car add a new item', async ({ page }) => {
  await page.goto('https://www.saucedemo.com/');
  await page.locator("#user-name").fill("standard_user");
  await page.locator("#password").fill("secret_sauce");
  //await page.waitForTimeout(3000);  
  await page.locator('#login-button').click();
  //await page.waitForTimeout(3000);  
  await expect(await page.locator('.app_logo')).toHaveText('Swag Labs');
  //await page.waitForTimeout(2000);
  await page.locator('//*[@class="pricebar"][1]/button').first().click();
  //await page.waitForTimeout(3000);
  await expect(await page.locator('.shopping_cart_badge')).toHaveText('1');
});
