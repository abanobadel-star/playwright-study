import { Locator, Page } from "@playwright/test"; 
import { BasePage } from "../basePage";


export class CartPage extends BasePage {
    private readonly cartItemName = this.page.locator('.inventory_item_name');

    constructor(page : Page) {
        super(page);
    }
    async getCartItemName(): Promise<string> {
        return await this.cartItemName.textContent() || '';
    }

}
