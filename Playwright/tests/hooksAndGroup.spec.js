import {
    test,
    expect
} from "@playwright/test";

test.describe('all my test', () => {

    test.beforeEach(async ({
        page
    }) => {

        await page.goto('https://www.saucedemo.com/');
        await page.pause();

        //input fields
        await page.locator('#user-name').type('standard_user');
        await page.locator('#password').type('secret_sauce');

        //button
        await page.locator('#login-button').click();
        await page.waitForURL('https://www.saucedemo.com/inventory.html');

        // await page.close();
    });

    test.afterAll(async ({
        page
    }) => {

        await page.close();
    });

    test('homepage add to cart', async ({
        page
    }) => {

        //add to cart
        await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
        await page.locator('[data-test="add-to-cart-sauce-labs-bike-light"]').click();
        await page.locator('#item_1_title_link').click();
        await page.locator('https://www.saucedemo.com/inventory-item.html?id=1')
        await page.locator('[data-test="add-to-cart-sauce-labs-bolt-t-shirt"]').click();

    });

    test('logout', async ({
        page
    }) => {

        //logout button
        await page.locator('#react-burger-menu-btn').click();
        await page.locator('#logout_sidebar_link').click();
        await page.waitForURL('https://www.saucedemo.com/');

    });

});