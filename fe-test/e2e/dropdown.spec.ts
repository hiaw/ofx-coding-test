import { test, expect } from '@playwright/test';

test('Closing drop down when click outside', async ({ page }) => {
    await page.goto('http://localhost:5173/');

    expect(page.getByText('Normal')).toBeVisible();

    await page.getByRole('button', { name: 'US USD' }).click();

    await page.getByText('Normal').click({ position: { x: 0, y: 0 } });

    expect(page.getByRole('button', { name: 'AR ARS' })).not.toBeVisible();
});
