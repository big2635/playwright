// @ts-check
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

test('has title', async ({}) => {

   //to start the trace view
  // await context.tracing.start({snapshots: true,  screenshots: true});

  await page.goto('https://playwright.dev/');

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Playwright/);

  //to stop the trace view
  // await context.tracing.stop({path: 'test1_trace.zip'})
});

test('get started link', async ({}) => {
  await page.goto('https://playwright.dev/');

  // Click the get started link.
  await page.getByRole('link', { name: 'Get started' }).click();

  // Expects the URL to contain intro.
  await expect(page).toHaveURL(/.*intro/);
});
