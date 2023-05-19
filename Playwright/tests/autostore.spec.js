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
  await context.tracing.stop({path: 'test2_trace.zip'})
})

test('Contact us', async({}) => {
    
    await page.goto("https://automationteststore.com");
   // await page.pause();

    //Contact us link
    await page.locator('.info_links_footer > li:nth-of-type(5)').click();
    // Firstname txtbox
    await page.locator('#ContactUsFrm_first_name').type("testqa");
    // Email txtbox
    await page.locator('#ContactUsFrm_email').type("test@gmail.com");
    // Comment txtfield
    await page.locator('#ContactUsFrm_enquiry').type("hello QA Test");
    // Button submit
    await page.locator('[title="Submit"]').click();

    // Expects the text to contain.
   // await page.expect('.mb40 > p:nth-of-type(2)').toContainText("Your enquiry has been successfully sent to the store owner!");

});