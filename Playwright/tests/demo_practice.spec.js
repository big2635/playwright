import {test,expect,chromium} from "@playwright/test";

test('Login',async () => {

    const browser = await chromium.launch({
        slowMo: 500,
        headless: false
    });
    
    const context = await browser.newContext({
        recordVideo: {
            dir: 'videos/',
            size: {
                width: 800,
                height: 600
            }
        }
    });

    const page = await context.newPage();
    
    //link 
    await page.goto('https://www.saucedemo.com/');
    //await page.pause();

    //login
    await page.locator('[data-test="username"]').type('standard_user');
    await page.locator('[data-test="password"]').type('secret_sauce');

    //button login
    await page.locator('[data-test="login-button"]').click();
   // await page.pause();

    //cart
    await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
    await page.locator('#shopping_cart_container a').click();

    //Info
    await page.locator('#checkout').click();
    await page.locator('#first-name').type('test');
    await page.locator('#last-name').type('Password1');
    await page.locator('#postal-code').type('2005');
    
    //Continue button
    await page.locator('#continue').click();

    //Finish button
    await page.locator('#finish').click();

    //EXPECT
    await expect(page.locator('.complete-header')).toHaveText("Thank you for your order!")  

    await context.close();

});



