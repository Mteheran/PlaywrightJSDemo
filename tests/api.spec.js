import { expect, test } from '@playwright/test';

// Request context is reused by all tests in the file.
let apiContext;

test.beforeAll(async ({ playwright }) => {
  apiContext = await playwright.request.newContext({
    // All requests we send go to this API endpoint.
    baseURL: 'https://api-colombia.com/',
  });
});

test.afterAll(async ({ }) => {
    // Dispose all responses.
    await apiContext.dispose();
});

test('colombia internet domain', async () => {
    const infoColombia = await apiContext.get(`/api/v1/Country/Colombia`);
    expect(infoColombia.ok()).toBeTruthy();
    const responseBody = await infoColombia.json();
    console.log(responseBody);
    expect(responseBody).toHaveProperty("internetDomain", ".co")
});

test('Regions of Colombia', async () => {
    const infoColombia = await apiContext.get(`/api/v1/Region`);
    expect(infoColombia.ok()).toBeTruthy();
    const responseBody = await infoColombia.json();
    console.log(responseBody);
    expect(responseBody).toHaveLength(6);
});