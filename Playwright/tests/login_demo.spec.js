const { test, expect } = require('@playwright/test');

let page;
let context;

test.beforeAll(async ({browser}) => {
    
context = await browser.newContext();

await context.tracing.start(
  {
    screenshots:true,
    snapshots:true
  });

page = await context.newPage();

});

test.afterAll(async () => {
  await context.tracing.stop({path: 'test3_trace.zip'})
})

test('Demo Login Test1',async ({page}) => {

    await page.goto('https://demo.applitools.com/');
   // await page.pause();
    await page.locator('#username').type("QaTest");
    await page.locator('#password').type("Temp1234!!");

    await page.waitForSelector('#log-in' , {timeout: 5000})
    await page.locator('#log-in').click();
});


test.only('Demo Login Test2',async ({page}) => {

  await page.goto('https://admin-demo.nopcommerce.com/login?ReturnUrl=%2Fadmin%2F');
  await page.pause();

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

  //assertion
  await expect(page.locator('.content-header h1')).toHaveText("Dashboard")
  await expect(page).toHaveURL('https://admin-demo.nopcommerce.com/admin/');
  await expect(page).toHaveTitle('Dashboard / nopCommerce administration')

  await page.locator('#nopSideBarPusher i').click();
  await page.locator('text=Logout').click();
  await page.waitForURL('https://admin-demo.nopcommerce.com/login?ReturnUrl=%2Fadmin%2F');
  await page.close();
});