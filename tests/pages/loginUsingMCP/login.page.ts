import { Page } from '@playwright/test';

export class LoginPage {
    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    // Selectors
    private readonly formAuthLink = 'a[href="/login"]';
    private readonly usernameInput = '#username';
    private readonly passwordInput = '#password';
    private readonly loginButton = 'button[type="submit"]';
    private readonly flashMessage = '#flash';
    private readonly logoutButton = 'a[href="/logout"]';

    // Actions
    async navigateToLoginPage() {
        await this.page.goto('https://the-internet.herokuapp.com/');
        await this.page.click(this.formAuthLink);
    }

    async login(username: string, password: string) {
        await this.page.fill(this.usernameInput, username);
        await this.page.fill(this.passwordInput, password);
        await this.page.click(this.loginButton);
    }

    async getFlashMessage(): Promise<string> {
        return await this.page.textContent(this.flashMessage) || '';
    }

    async isLoggedIn(): Promise<boolean> {
        const message = await this.getFlashMessage();
        return message.includes('You logged into a secure area!');
    }

    async isLoginError(): Promise<boolean> {
        const message = await this.getFlashMessage();
        return message.includes('Your username is invalid!') || 
               message.includes('Your password is invalid!');
    }

    async logout() {
        await this.page.click(this.logoutButton);
    }

    async isLoggedOut(): Promise<boolean> {
        const message = await this.getFlashMessage();
        return message.includes('You logged out of the secure area!');
    }

    async areCredentialsEmpty(): Promise<boolean> {
        const username = await this.page.inputValue(this.usernameInput);
        const password = await this.page.inputValue(this.passwordInput);
        return username === '' && password === '';
    }

    async getInputValues() {
        const username = await this.page.inputValue(this.usernameInput);
        const password = await this.page.inputValue(this.passwordInput);
        return { username, password };
    }

    async fillCredentials(username: string, password: string) {
        await this.page.fill(this.usernameInput, username);
        await this.page.fill(this.passwordInput, password);
    }

    async clearInputs() {
        await this.page.fill(this.usernameInput, '');
        await this.page.fill(this.passwordInput, '');
    }
}