import { Page } from '@playwright/test';

export class CheckoutPage {
    constructor(private readonly page: Page) {}

    // Selectors
    private readonly firstNameInput = '[data-test="firstName"]';
    private readonly lastNameInput = '[data-test="lastName"]';
    private readonly postalCodeInput = '[data-test="postalCode"]';
    private readonly continueButton = '[data-test="continue"]';
    private readonly finishButton = '[data-test="finish"]';
    private readonly confirmationMessage = '.complete-header';
    private readonly errorMessage = '[data-test="error"]';

    // Actions
    async fillShippingInfo(firstName: string, lastName: string, zipCode: string) {
        await this.page.locator(this.firstNameInput).fill(firstName);
        await this.page.locator(this.lastNameInput).fill(lastName);
        await this.page.locator(this.postalCodeInput).fill(zipCode);
        await this.page.locator(this.continueButton).click();
    }

    async finishCheckout() {
        await this.page.locator(this.finishButton).click();
    }

    async getConfirmationMessage() {
        return await this.page.locator(this.confirmationMessage).textContent();
    }

    async getErrorMessage() {
        return await this.page.locator(this.errorMessage).textContent();
    }
}