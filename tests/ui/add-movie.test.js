const {test, expect} = require('@playwright/test');
import {pageURL,} from "./pageURL.js"

test('Check add movie page', async ({page}) => {
    await page.goto(pageURL + 'add-movie');
    const form = await page.$('form');
    expect(form).toBeTruthy();
});
  