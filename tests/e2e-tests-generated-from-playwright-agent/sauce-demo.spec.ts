import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages-generated-from-playwright-agent/login.page'; 
import { InventoryPage } from '../pages-generated-from-playwright-agent/inventory.page';
import { CartPage } from '../pages-generated-from-playwright-agent/cart.page';
import { CheckoutPage } from '../pages-generated-from-playwright-agent/checkout.page';
const testData = {
    users: {
        standard: {
            username: 'standard_user',
            password: 'secret_sauce'
        },
        locked: {
            username: 'locked_out_user',
            password: 'secret_sauce'
        }
    },
    products: {
        onesie: 'sauce-labs-onesie',
        bikeLight: 'sauce-labs-bike-light'
    },
    sorting: {
        priceLowHigh: 'Price (low to high)'
    },
    checkout: {
        firstName: 'John',
        lastName: 'Doe',
        zipCode: '12345'
    }
};

test.describe('Sauce Demo E2E Tests', () => {
    let loginPage: LoginPage;
    let inventoryPage: InventoryPage;
    let cartPage: CartPage;
    let checkoutPage: CheckoutPage;

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
        inventoryPage = new InventoryPage(page);
        cartPage = new CartPage(page);
        checkoutPage = new CheckoutPage(page);
        await loginPage.goto();
    });

    test('complete purchase flow with valid user', async () => {
        // Login with standard user
        await loginPage.login(
            testData.users.standard.username,
            testData.users.standard.password
        );
        await inventoryPage.isProductsVisible();

        // Add products to cart
        await inventoryPage.addToCart(testData.products.onesie);
        await inventoryPage.addToCart(testData.products.bikeLight);
        
        // Verify cart
        expect(await inventoryPage.getCartBadgeCount()).toBe('2');
        await inventoryPage.goToCart();
        
        // Complete checkout
        await cartPage.checkout();
        await checkoutPage.fillShippingInfo(
            testData.checkout.firstName,
            testData.checkout.lastName,
            testData.checkout.zipCode
        );
        await checkoutPage.finishCheckout();
        
        // Verify order confirmation
        expect(await checkoutPage.getConfirmationMessage()).toBe('Thank you for your order!');
    });

    test('verify locked out user cannot login', async () => {
        await loginPage.login(
            testData.users.locked.username,
            testData.users.locked.password
        );
        const errorMessage = await loginPage.getErrorMessage();
        expect(errorMessage).toContain('Sorry, this user has been locked out');
    });

    test('verify cart operations', async () => {
        // Login
        await loginPage.login(
            testData.users.standard.username,
            testData.users.standard.password
        );
        await inventoryPage.isProductsVisible();
        
        // Add and verify item in cart
        await inventoryPage.addToCart(testData.products.onesie);
        expect(await inventoryPage.getCartBadgeCount()).toBe('1');
        
        // Remove and verify cart is empty
        await inventoryPage.removeFromCart(testData.products.onesie);
        const badge = await inventoryPage.getCartBadgeCount();
        expect(badge).toBeNull();
    });

    test('verify checkout form validation', async () => {
        // Login and add item to cart
        await loginPage.login(
            testData.users.standard.username,
            testData.users.standard.password
        );
        await inventoryPage.addToCart(testData.products.onesie);
        await inventoryPage.goToCart();
        await cartPage.checkout();
        
        // Try submitting empty form
        await checkoutPage.fillShippingInfo('', '', '');
        const errorMessage = await loginPage.getErrorMessage();
        expect(errorMessage).toContain('Error: First Name is required');
    });
});