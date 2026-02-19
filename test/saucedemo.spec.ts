import { test, expect, Page } from '@playwright/test';
import {LoginPage} from './pages/LoginPage';
import {InventoryPage} from './pages/InventoryPage';
import {CartPage} from './pages/cartPage';
import {CheckoutPage} from './pages/CheckoutPage';

const USER_OK = {user:'standard_user', pass:'secret_sauce'};
const ITEM = 'Sauce Labs Backpack';

test.describe('Saucedemo Scenarios', () => {
    test('1) Berhasil Login', async ({ page }) => {
    const login = new LoginPage(page);
    const inventory = new InventoryPage(page);

    await login.goto();
    await login.login(USER_OK.user, USER_OK.pass);
    await inventory.expectOnInventory();
    });

    test('2) Berhasil menambahkan barang ke cart', async ({ page }) => {
    const login = new LoginPage(page);
    const inventory = new InventoryPage(page);
    const cart = new CartPage(page);

    await login.goto();
    await login.login(USER_OK.user, USER_OK.pass);
    await inventory.expectOnInventory();

    await inventory.addItemByName(ITEM);
    await inventory.expectCartCount(1);

    await inventory.openCart();
    await cart.expectItemInCart(ITEM);
    });

    test('3) Gagal Login', async ({ page }) => {
    const login = new LoginPage(page);
    await login.goto();
    await login.login('standard_user', 'salah_password');
    await login.expectLoginErrorContains('Username and password do not match');
    });


    test('4) Gagal checkout karena data tidak lengkap', async ({ page }) => {
    const login = new LoginPage(page);
    const inventory = new InventoryPage(page);
    const cart = new CartPage(page);
    const checkout = new CheckoutPage(page);

    await login.goto();
    await login.login(USER_OK.user, USER_OK.pass);
    await inventory.expectOnInventory();

    await inventory.addItemByName(ITEM);
    await inventory.openCart();
    await cart.clickCheckout();

    await checkout.fillCustomerInfo('', 'Doe', '12345');
    await checkout.continue();

    await checkout.expectCheckoutErrorContains('Error: First Name is required');
    });

test('5) Berhasil login sampai checkout barang', async ({ page }) => {
    const login = new LoginPage(page);
    const inventory = new InventoryPage(page);
    const cart = new CartPage(page);
    const checkout = new CheckoutPage(page);

    await login.goto();
    await login.login(USER_OK.user, USER_OK.pass);
    await inventory.expectOnInventory();

    await inventory.addItemByName(ITEM);
    await inventory.openCart();
    await cart.expectItemInCart(ITEM);
    await cart.clickCheckout();

    await checkout.fillCustomerInfo('David', 'QA', '55123');
    await checkout.continue();

    await checkout.expectOnStepTwo();
    await checkout.finish();
    await checkout.expectComplete();
    });

});