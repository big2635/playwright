import {
    test,
    expect,
    chromium
} from "@playwright/test";

test('Slow Motion and vid recording demo', async () => {

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


    await page.goto('https://admin-demo.nopcommerce.com/login?ReturnUrl=%2Fadmin%2F');
   // await page.pause();

    //email
    await page.locator('#Email').click();
    await page.locator('#Email').press('Control+a')
    await page.locator('#Email').clear();
    await page.locator('#Email').type("admin@yourstore.com")

    //password
    await page.locator('#Password').click();
    await page.locator('#Password').press('Control+a')
    await page.locator('#Password').clear();
    await page.locator('#Password').type('admin');

    //button
    await page.locator('.login-button').click();

    await context.close();
});