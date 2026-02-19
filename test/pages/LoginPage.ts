import {expect, Locator, Page} from '@playwright/test';

export class LoginPage {
    readonly page: Page;
    readonly username: Locator;
    readonly password: Locator;
    readonly login_BTN : Locator;
    readonly error: Locator;

    constructor(page: Page) {
        this.page = page;
        this.username = page.locator('#user-name');
        this.password = page.locator('#password');
        this.login_BTN = page.locator('#login-button');
        this.error = page.locator('[data-test="error"]');
    }

    async goto() {
        await this.page.goto('/');
    }

    async login(username: string, password: string) {
        await this.username.fill(username);
        await this.password.fill(password);
        await this.login_BTN.click();
    }

    async expectLoginErrorContains(text: string) {
        await expect(this.error).toBeVisible();
        await expect(this.error).toContainText(text);
    }
}