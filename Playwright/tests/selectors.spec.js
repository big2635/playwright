const { test, expect } = require('@playwright/test');

test('Selector Demo', async ({page}) => {
    
    await page.goto('https://www.saucedemo.com/');

    //to pause the page
    await page.pause();

    //username ccs
    await page.click('#user-name');
    await page.locator('#user-name').type('Big');
    await page.locator('#user-name').fill('Marbz');

    //password xpath
    await page.locator('//input[@id="password"]').type('Temp1234!!');

    //login button ccs
    await page.locator('#login-button').click();

    //using text
    await page.locator('input:has-text("Login")').click();
});