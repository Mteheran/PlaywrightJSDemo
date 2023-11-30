import { expect, test } from '@playwright/test';

// Request context is reused by all tests in the file.
let apiContext;

test.beforeAll(async ({ playwright }) => {
  apiContext = await playwright.request.newContext({
    // All requests we send go to this API endpoint.
    baseURL: 'https://southamerica-west1-citric-proxy-140702.cloudfunctions.net',
  });
});

test.afterAll(async ({ }) => {
    // Dispose all responses.
    await apiContext.dispose();
});

test('Get Example', async () => {
    const getResponse = await apiContext.get(`/function-1`);
    console.log(getResponse);
    expect(getResponse.ok()).toBeTruthy();
    const responseBody = await getResponse.text();
    expect(responseBody).toBe('Hello World!')
});

test('Get Example with parameter', async () => {
    const getResponse = await apiContext.get(`/function-1?name=Miguel`);
    expect(getResponse.ok()).toBeTruthy();
    const responseBody = await getResponse.text();
    expect(responseBody).toBe('Hello Miguel!')
});

test('POST Example', async () => {
  const requestBody = {
    data: {
      name: 'Miguel'
    }
  }
  const getResponse = await apiContext.post(`/function-1`, requestBody);
  expect(getResponse.ok()).toBeTruthy();
  const responseBody = await getResponse.text();
  expect(responseBody).toBe('Hello Miguel!')
});


test('PUT Example', async () => {
  const getResponse = await apiContext.put(`/function-1`);
  expect(getResponse.ok()).toBeTruthy();
  const responseBody = await getResponse.text();
  expect(responseBody).toBe('Error!')
});
