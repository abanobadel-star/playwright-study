import { Page, expect } from '@playwright/test';

export class CartPage {
    constructor(private readonly page: Page) {}

    // Selectors
    private readonly checkoutButton = '[data-test="checkout"]';
    private readonly cartList = '.cart_list';

    // Actions
    async checkout() {
        await this.page.locator(this.checkoutButton).click();
    }

    async isProductInCart(productName: string) {
        const cartItem = this.page.locator('.cart_item', {
            has: this.page.locator(`:text("${productName}")`)
        });
        return await cartItem.isVisible();
    }

    async waitForCartToLoad() {
        await this.page.locator(this.cartList).waitFor({ state: 'visible' });
    }
}