import { test, expect } from "@playwright/test";

test('check visiable of element', async ({ page }) => {
    await page.goto('https://the-internet.herokuapp.com/dynamic_loading/1');
    await expect(page.locator("div[id='finish'] h4 ")).toBeHidden();
    await page.locator("div[id='start'] button").click();
    await expect(page.locator("div[id='finish'] h4 ")).toBeVisible({ timeout: 10000 });
    await expect(page.locator("div[id='finish'] h4 ")).toHaveText('Hello World!');
    await expect(page.locator("div[id='finish'] h4 ")).toContainText('Hello');

});
test('check element to be present ', async ({ page }) => {
    await page.goto('https://the-internet.herokuapp.com/add_remove_elements/');
    await page.locator("button[onclick='addElement()']").click();
    await expect(page.locator("#elements [class='added-manually']")).not.toHaveCount(0);
});

test('check element to be enabled', async ({ page }) => {
    await page.goto('https://the-internet.herokuapp.com/dynamic_controls');
    await expect(page.locator("input[type='text']")).toBeDisabled();
    await page.locator("#input-example button[type='button']").click();
    await expect(page.locator("input[type='text']")).toBeEnabled({ timeout: 10000 });
});
test('check element to have text', async ({ page }) => {
    await page.goto('https://the-internet.herokuapp.com/dynamic_controls');
    await expect(page.locator("#input-example button[type='button']")).toHaveText('Enable');
    await expect(page.locator("#input-example button[type='button']")).not.toHaveText('Enabled');

});
test('check element to have attribute', async({page})=> {
     await page.goto('https://the-internet.herokuapp.com/dynamic_controls');
     await expect(page.locator("#input-example button[type='button']")).toHaveAttribute('autocomplete','off');
});
test('check page to have title', async({page})=> { 
   await page.goto('https://the-internet.herokuapp.com/dynamic_controls');
   await expect(page).toHaveTitle('The Internet');
   await expect(page).toHaveURL(/.*dynamic_controls/);
});
test('to have screenshot', async({page}) => {
    await page.goto('https://the-internet.herokuapp.com/dynamic_controls');
    await expect(page).toHaveScreenshot();
    await page.screenshot({path:'./screenshot/example.png'});
    await expect(page).toHaveScreenshot('./screenshot/example.png', {threshold:0.2}); // comment because failing on github action due to different machine
});