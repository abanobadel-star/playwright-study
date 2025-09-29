import { Locator, Page, expect } from "@playwright/test";
import test from "node:test";

export class BasePage {

    protected page: Page;

    constructor(page: Page) {
        this.page = page;
    }
    async clickOnElement(element: Locator) {
        await element.click();
    }
    async enterTextToElement(element: Locator, text: string) {
        await element.clear();
        await element.fill(text);
    }
    async verifyElementText(element: Locator, expectedText: string) {
        await expect(element).toHaveText(expectedText);
    }
    async takeScreenshot(testInfo: { title: string }) {
        const safeTitle = testInfo.title.replace(/[^a-zA-Z0-9-_]/g, '_');
        await this.page.screenshot({ path: `screenshot/${safeTitle}.png`, fullPage: true });
    }
    // async verifyScreenshot(testInfo: {title: string} ) {
    //     const safeTitle = testInfo.title.replace(/[^a-zA-Z0-9-_]/g, '_');
    //     const screenshotPath = `screenshot/${safeTitle}.png`;
    //     expect(await this.page.screenshot({ path: screenshotPath, fullPage: true })).toMatchSnapshot(screenshotPath);
    // }
    async verifyScreenshot(testInfo: { title: string }) {
    const safeTitle = testInfo.title.replace(/[^a-zA-Z0-9-_]/g, '_');
    // Optionally save a manual screenshot
    await this.page.screenshot({ path: `screenshot/${safeTitle}.png`, fullPage: true });
    // Use only the filename for snapshot comparison
    expect(await this.page.screenshot({ fullPage: true })).toMatchSnapshot(`${safeTitle}.png`);
}
    
}
