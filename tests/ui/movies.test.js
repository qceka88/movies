const {test, expect} = require('@playwright/test');
import {pageURL,} from "./pageURL.js"

test('Check movies page', async ({page}) => {
    await page.goto(pageURL + 'movies');
    const list = await page.$('ul');
    expect(list).toBeTruthy();
});
  