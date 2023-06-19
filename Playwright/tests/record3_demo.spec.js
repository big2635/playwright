const {test, expect} = require('@playwright/test');
const {
    chromium
} = require('@playwright/test');

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
  await context.tracing.stop({path: 'test_trace.zip'})
})


test('record demo 3',async() => {
    await page.goto('https://stage-myvvid.com/create-account');
    await page.pause();

    //name
    await page.locator('#firstName').type('qa');
    await page.locator('#lastName').type('test');
    
    //email 
    await page.locator('#email').type('test@gmail.com');
    await page.locator('#confirmEmail').type('test@gmail.com');
    
    //button
    await page.getByRole('button', { name: 'Next' }).click();

    //mobile number
    await page.locator('#mobileNumberCode').click();
    await page.getByText('Philippines').click();
    await page.locator('#inputMobileNumber').type('9563049523');

    //country
    await page.locator("//p-autocomplete[@placeholder='Location (Country)']//input[@role='searchbox']").fill('phi')
    await page.locator('.country-item').click();

    //org
    await page.locator("//p-autocomplete[@placeholder='Your organization']//input[@role='searchbox']").fill('Test');
    await page.locator("//span[.='someTestOrg']").click();

    //job title
    await page.locator('#jobTitle').fill('test');
    
    //password
    await page.locator('#password').fill('Temp1234!!');
    await page.locator('#confirmPassword').fill('Temp1234!!');

    await page.pause();
    await expect(page).toHaveScreenshot();
  
});