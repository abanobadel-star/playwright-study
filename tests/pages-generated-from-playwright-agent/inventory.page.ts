import { Page, expect } from '@playwright/test';

export class InventoryPage {
    constructor(private readonly page: Page) {}

    // Selectors
    private readonly sortDropdown = 'select[data-test="product_sort_container"]';
    private readonly inventoryContainer = '[data-test="inventory-container"]';
    private readonly cartBadge = '.shopping_cart_badge';
    private readonly cartLink = '.shopping_cart_link';
    private readonly productsTitle = '.title';

    // Actions
    async sortProducts(option: string) {
        // Wait for inventory and dropdown to be loaded
        await this.page.locator(this.inventoryContainer).waitFor({ state: 'visible' });
        const dropdown = this.page.locator(this.sortDropdown);
        await dropdown.waitFor({ state: 'visible' });
        await dropdown.selectOption({ label: option });
    }

    async addToCart(productName: string) {
        await this.page.locator(`[data-test="add-to-cart-${productName}"]`).click();
    }

    async removeFromCart(productName: string) {
        await this.page.locator(`[data-test="remove-${productName}"]`).click();
    }

    async getCartBadgeCount() {
        try {
            const badge = this.page.locator(this.cartBadge);
            await badge.waitFor({ state: 'attached', timeout: 2000 });
            return await badge.textContent();
        } catch (error) {
            console.error('Failed to get cart badge count:', error);
            return null;
        }
    }

    async goToCart() {
        await this.page.locator(this.cartLink).click();
    }

    async isProductsVisible() {
        await expect(this.page.locator(this.productsTitle)).toBeVisible();
        await expect(this.page.locator(this.productsTitle)).toHaveText('Products');
    }
}