import { expect,test } from "@playwright/test";
import { CartPage } from "./pages/cartPage/cartPage";
import { ProductPage } from "./pages/productPage/productPage";
import { LoginPage } from "./pages/login/loginpage";
import * as testData from '../tests/TestData/testData.json';


test.describe('E2E Add Item To Cart Test Suite', () => {
    let loginPage: LoginPage;
    let productPage: ProductPage;
    let cartPage: CartPage;
    const expectedProductName = 'Sauce Labs Backpack';

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
        productPage = new ProductPage(page);
        cartPage = new CartPage(page);
    });

    test('E2E Add Item To Cart Test', async ({ page }) => {
       await page.goto('https://www.saucedemo.com/');
        await loginPage.loginToApplication(testData.username, testData.password);
       await productPage.addProductToCart();
       await productPage.navigateToShoppingCart();
       const actualProductName = await cartPage.getCartItemName();
       expect(actualProductName.trim()).toBe(expectedProductName);
    });

});
        

