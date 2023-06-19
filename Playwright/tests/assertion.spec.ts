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
  await context.tracing.stop({path: 'test4_trace.zip'})
})

test('Assertion Demo',async ({}) => {
    
    await page.goto("https://kitchen.applitools.com/")
        
    await page.pause();

    //Assertion
    //check element present or not and verify the title
    await expect(page.locator('.css-dpmy2a')).toHaveCount(1)

    //condition to click the title.
    if(await page.$('.css-dpmy2a')){
        await page.locator('.css-dpmy2a').click();
    }

    //check element hidden or visible
    await expect(page.locator('.css-dpmy2a')).toBeVisible();
   // await expect.soft(page.locator('.css-dpmy2a')).toBeHidden();

    //check element enabled or disabled
    await expect(page.locator('.css-dpmy2a')).toBeEnabled();
   // await expect.soft(page.locator('.css-dpmy2a')).toBeDisabled();

    //check text
    await expect(page.locator('.css-dpmy2a')).toHaveText("The Kitchen")  
   // await expect(page.locator('.css-dpmy2a')).not.toHaveText("The Kitchen")

   

    //check element attribue value
    await expect(page.locator('.css-dpmy2a')).toHaveAttribute('class', /.*css-dpmy2a/)
    await expect(page.locator('.css-dpmy2a')).toHaveClass(/.*css-dpmy2a/)

    //check page URl and title
    await expect(page).toHaveURL('https://kitchen.applitools.com/');
    await expect(page).toHaveTitle('The Kitchen')

    
    await page.pause();

    //visual validation with SS
    await expect(page).toHaveScreenshot()
});