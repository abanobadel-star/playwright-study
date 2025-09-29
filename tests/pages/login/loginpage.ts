import {expect, Page} from '@playwright/test';
import  {BasePage} from '../basePage';

export class LoginPage extends BasePage {
	private readonly usernameInput = this.page.locator('#user-name');
    private readonly passwordInput = this.page.locator('#password');
    private readonly loginButton = this.page.locator('#login-button');
    
    constructor(page : Page) {
        super(page);
    }   
    async loginToApplication(username: string, password: string) {
        await this.enterTextToElement(this.usernameInput, username);
        await this.enterTextToElement(this.passwordInput, password);
        await this.clickOnElement(this.loginButton);
    }
    async sendUsername(username: string) {
        await this.enterTextToElement(this.usernameInput, username);
    }
    async sendPassword(password: string) {
        await this.enterTextToElement(this.passwordInput, password);
    }
    async clickLoginButton() {
        await this.clickOnElement(this.loginButton);
    }

}
