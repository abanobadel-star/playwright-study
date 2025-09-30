import { test, expect } from "../fixtures/fixture";
import * as testData from '../tests/TestData/testData.json';
test.describe('E2E Add Item To Cart Test Suite', () => {

    const expectedProductName = 'Sauce Labs Backpack';

    test('E2EAddItemToCartTest', async ({ loginPage, productPage, cartPage, page }) => {
        await page.goto('https://www.saucedemo.com/');
        await loginPage.loginToApplication(testData.username, testData.password);
        await productPage.addProductToCart();
        await productPage.navigateToShoppingCart();
        const actualProductName = await cartPage.getCartItemName();
       // await cartPage.takeScreenshot(test.info());
       // await cartPage.verifyScreenshot(test.info());
        expect(actualProductName.trim()).toBe(expectedProductName);
    });

      test('E2EAddItemToCartTestWithGroup @sanity', async ({ loginPage, productPage, cartPage, page }) => {
        await page.goto('https://www.saucedemo.com/');
        await loginPage.loginToApplication(testData.username, testData.password);
        await productPage.addProductToCart();
        await productPage.navigateToShoppingCart();
        const actualProductName = await cartPage.getCartItemName();
      //  await cartPage.takeScreenshot(test.info());
       // await cartPage.verifyScreenshot(test.info());
        expect(actualProductName.trim()).toBe(expectedProductName);
    });

});