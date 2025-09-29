import { expect, test, } from '@playwright/test';

test('check fill and press sequence', async ({ page }) => {

    await page.goto('https://the-internet.herokuapp.com/login');
    await page.locator('#username').fill("tomsmith");
    await page.locator('#password').pressSequentially("SuperSecretPassword!");


});
test('check click and right click', async ({ page }) => {
    await page.goto('https://play1.automationcamp.ir/mouse_events.html');
    await page.locator('#click_area').click();
    await expect(page.locator('#click_type')).toHaveText('Click');
    await page.locator('#click_area').click({ button: 'right' });
    await expect(page.locator('#click_type')).toHaveText('Right-Click');
    await page.locator('#click_area').dblclick();
    await expect(page.locator('#click_type')).toHaveText('Double-Click');
});

test('check box button', async ({ page }) => {
    await page.goto('https://the-internet.herokuapp.com/checkboxes');
    await page.locator("(//input[@type='checkbox'])[1]").check();
    await expect(page.locator("(//input[@type='checkbox'])[1]")).toBeChecked();
    await page.locator("(//input[@type='checkbox'])[1]").uncheck();
    await expect(page.locator("(//input[@type='checkbox'])[1]")).not.toBeChecked();
});
test('select from dropdown', async ({ page }) => {
    await page.goto('https://the-internet.herokuapp.com/dropdown');
    await page.selectOption('#dropdown', { value: '1' });
    await page.selectOption('#dropdown', { label: 'Option 2' });
    await page.selectOption('#dropdown', { index: 1 });

});
test('dyamanic list select', async ({ page }) => {
    await page.goto('https://demo.automationtesting.in/Register.html');
    await page.locator('[role="combobox"]').click();
    await page.locator("//li[text()='India']").click();
    // await page.locator('input[role="textbox"]').fill('India');
    // await page.locator('input[role="textbox"]').press('Enter');
    // await expect(page.locator('[role="combobox"]')).toHaveText('India');
});
test('javascript alert', async ({ page }) => {
    await page.goto('https://the-internet.herokuapp.com/javascript_alerts');

    page.on('dialog', async (alert) => {
        const alertMessage = alert.message();
        expect(alertMessage).toBe('I am a JS Alert');
        await alert.accept();
        await expect(page.locator("#result")).toHaveText('You successfully clicked an alert');
    }
    )

    await page.locator("button[onclick='jsAlert()']").click();
});
import { Dialog } from '@playwright/test';

test('confirm alert', async ({ page }) => {
    await page.goto('https://the-internet.herokuapp.com/javascript_alerts');
    page.on('dialog', async (confirm: Dialog) => {
        const confirmMessage = confirm.message();
        expect(confirmMessage).toBe('I am a JS Confirm');
        await confirm.dismiss();
        await expect(page.locator("#result")).toHaveText('You clicked: Cancel');
    });
    await page.locator("button[onclick='jsConfirm()']").click();
});
test('prompt alert', async ({ page }) => {
    await page.goto('https://the-internet.herokuapp.com/javascript_alerts');
    page.on('dialog', async (prompt: Dialog) => {
        const promptMessage = prompt.message();
        expect(promptMessage).toBe('I am a JS prompt');
        await prompt.accept('Playwright');
        await expect(page.locator("#result")).toHaveText('You entered: Playwright');
    });
    await page.locator("button[onclick='jsPrompt()']").click();
}
);

test('tabs', async ({ page }) => {
    await page.goto('https://the-internet.herokuapp.com/windows');
    const [new_page] = await Promise.all([
        page.waitForEvent('popup'),
        page.locator("a[href='/windows/new']").click()
    ])
    await expect(new_page).toHaveURL('https://the-internet.herokuapp.com/windows/new');
    await expect(new_page.locator('h3')).toHaveText('New Window');
    await page.bringToFront();
    await expect(page).toHaveURL('https://the-internet.herokuapp.com/windows');
    await expect(page.locator('h3')).toHaveText('Opening a new window');

});
test('new window', async ({ page }) => {
    await page.goto('https://demo.automationtesting.in/Windows.html');
    await page.locator(".analystic[href='#Seperate']").click();
    const [new_window] = await Promise.all([
        page.waitForEvent('popup'),
        page.locator(".btn.btn-primary").click()
    ])
    await new_window.locator("a[href='/downloads']").click();
    await expect(new_window).toHaveURL('https://www.selenium.dev/downloads/');
    await expect(new_window.locator('.d-1')).toHaveText('Downloads');
    await page.bringToFront();
    await page.locator("a[href='Index.html']").click();
    await expect(page).toHaveURL('https://demo.automationtesting.in/Index.html');
});
test('drag and drop', async ({ page }) => {
    await page.goto('https://the-internet.herokuapp.com/drag_and_drop');
    const source = page.locator("#column-a");
    const target = page.locator("#column-b");
    await source.dragTo(target);
  
});
test('download file and save it', async({page}) =>{
    await page.goto('https://the-internet.herokuapp.com/download');
    const [download] = await Promise.all([
        page.waitForEvent('download'),
        page.locator("a[href='download/spectrum-logo.png']").click()
    ]);
    const path = await download.path();
    const fileName = download.suggestedFilename();
    console.log('file name is : ' + fileName);
    await download.saveAs(fileName);
    console.log(`the file url is : ${path}`);
});
test('upload file', async({page}) => {
    await page.goto ('https://the-internet.herokuapp.com/upload');
    await page.locator('#file-upload').setInputFiles('./screenshot/example.png');    
    await page.locator('#file-submit').click();
    await expect(page.locator('h3')).toHaveText('File Uploaded!');
    await expect(page.locator('#uploaded-files')).toHaveText('example.png');
});
