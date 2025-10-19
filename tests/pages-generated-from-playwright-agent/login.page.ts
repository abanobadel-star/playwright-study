import { Page } from '@playwright/test';

export class LoginPage {
    constructor(private readonly page: Page) {}

    // Selectors
    private readonly usernameInput = '[data-test="username"]';
    private readonly passwordInput = '[data-test="password"]';
    private readonly loginButton = '[data-test="login-button"]';
    private readonly errorMessage = '[data-test="error"]';

    // Actions
    async goto() {
        await this.page.goto('https://www.saucedemo.com');
    }

    async login(username: string, password: string) {
        await this.page.locator(this.usernameInput).fill(username);
        await this.page.locator(this.passwordInput).fill(password);
        await this.page.locator(this.loginButton).click();
    }

    async getErrorMessage() {
        return await this.page.locator(this.errorMessage).textContent();
    }
}