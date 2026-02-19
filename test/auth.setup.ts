import { test as setup, expect } from '@playwright/test';
import { LoginPage } from './pages/LoginPage';

setup('login and save storage state', async ({ page }) => {
    await page.goto('/');
    await page.locator('[data-test="username"]').fill('standard_user');
    await page.locator('[data-test="password"]').fill('secret_sauce');
    await page.locator('[data-test="login-button"]').click();

    await expect(page).toHaveURL(/inventory\.html/);
    
    await page.context().storageState({ path: 'storageState.json' });
});