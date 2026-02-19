import { expect, Locator, Page } from '@playwright/test';

export class CartPage {
  readonly page: Page;
  readonly checkoutBtn: Locator;

  constructor(page: Page) {
    this.page = page;
    this.checkoutBtn = page.locator('[data-test="checkout"]');
  }

  async expectItemInCart(itemName: string) {
    await expect(this.page.getByText(itemName, { exact: true })).toBeVisible();
  }

  async clickCheckout() {
    await this.checkoutBtn.click();
    await expect(this.page).toHaveURL(/checkout-step-one\.html/);
  }
}