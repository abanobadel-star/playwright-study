import {Page,Locator} from '@playwright/test';
import { BasePage } from '../basePage';

export class ProductPage extends BasePage { 
    private readonly sauceLabsBackpackAddtoCartButton = this.page.locator('#add-to-cart-sauce-labs-backpack');
    private readonly shoppingCartLink = this.page.locator('.shopping_cart_link');

    constructor(page: Page) {
        super(page);
    }   
    async addProductToCart() {
        await this.clickOnElement(this.sauceLabsBackpackAddtoCartButton);
    }
    async navigateToShoppingCart() {
        await this.clickOnElement(this.shoppingCartLink);
    }

}
