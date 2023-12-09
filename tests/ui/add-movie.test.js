const { test, expect } = require('@playwright/test');

test('Check add movie page', async ({ page }) => {
    await page.goto('http://localhost:8080/add-movie');
    const form = await page.$('form');
    expect(form).toBeTruthy();
  });
  