import { test, expect } from '@playwright/test';
import { LoginPage } from './pages/loginUsingMCP/login.page';
import { testConfig } from '../config/test.config';

test.describe('Login Tests writtin using playwright MCP server', () => {
    let loginPage: LoginPage;

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
        await loginPage.navigateToLoginPage();
    });

    test('should login successfully with valid credentials', async () => {
        const { username, password } = testConfig.loginCredentials.validUser;
        await loginPage.login(username, password);
        expect(await loginPage.isLoggedIn()).toBeTruthy();
    });

    test('should show error message with invalid credentials', async () => {
        const { username, password } = testConfig.loginCredentials.invalidUser;
        await loginPage.login(username, password);
        expect(await loginPage.isLoginError()).toBeTruthy();
    });

    test('should show error message with empty credentials', async () => {
        const { username, password } = testConfig.loginCredentials.emptyCredentials;
        await loginPage.login(username, password);
        expect(await loginPage.isLoginError()).toBeTruthy();
        expect(await loginPage.areCredentialsEmpty()).toBeTruthy();
    });

    test('should show error with valid username and invalid password', async () => {
        const { validUsername, invalidPassword } = testConfig.loginCredentials.mixedCredentials;
        await loginPage.login(validUsername, invalidPassword);
        expect(await loginPage.isLoginError()).toBeTruthy();
    });

    test('should show error with invalid username and valid password', async () => {
        const { invalidUsername, validPassword } = testConfig.loginCredentials.mixedCredentials;
        await loginPage.login(invalidUsername, validPassword);
        expect(await loginPage.isLoginError()).toBeTruthy();
    });

    test('should handle special characters in credentials', async () => {
        const { username, password } = testConfig.loginCredentials.specialCharacters;
        await loginPage.login(username, password);
        expect(await loginPage.isLoginError()).toBeTruthy();
    });

    test('should handle very long credentials', async () => {
        const { username, password } = testConfig.loginCredentials.longCredentials;
        await loginPage.login(username, password);
        expect(await loginPage.isLoginError()).toBeTruthy();
    });

    test('should successfully logout after login', async () => {
        // First login
        const { username, password } = testConfig.loginCredentials.validUser;
        await loginPage.login(username, password);
        expect(await loginPage.isLoggedIn()).toBeTruthy();

        // Then logout
        await loginPage.logout();
        expect(await loginPage.isLoggedOut()).toBeTruthy();
    });

    test('should clear credentials when refreshing page', async () => {
        const { username, password } = testConfig.loginCredentials.validUser;
        
        // First fill in the credentials without submitting
        await loginPage.fillCredentials(username, password);
        
        // Verify credentials are filled in
        const values = await loginPage.getInputValues();
        expect(values.username).toBe(username);
        expect(values.password).toBe(password);
        
        // Refresh the page
        await loginPage.page.reload();
        
        // Wait for the page to load completely
        await loginPage.page.waitForLoadState('networkidle');
        
        // Verify inputs are empty
        expect(await loginPage.areCredentialsEmpty()).toBeTruthy();
    });
});