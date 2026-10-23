import { test, expect } from '@playwright/test';
import { apiResponse } from '../fixtures/catalog.mjs';

test.beforeEach(async ({ page }) => {
    // Block all external traffic. API reads and order writes are synthetic.
    await page.route('**/*', async route => {
        const url = new URL(route.request().url());
        if (url.hostname === '127.0.0.1' || url.hostname === 'localhost') return route.continue();
        if (['app.sladesignshop.com', 'admin.sladesignshop.com'].includes(url.hostname) && url.pathname.startsWith('/api/')) {
            if (route.request().method() !== 'GET') return route.fulfill({ status: 200, json: { id: 'test-order' } });
            return route.fulfill({ json: apiResponse(url.pathname, route.request().headers().locale) });
        }
        if (url.hostname === 'admin.sladesignshop.com' && url.pathname === '/storage/test-image.svg') {
            return route.fulfill({ contentType: 'image/svg+xml', body: '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20"><rect width="20" height="20" fill="red"/></svg>' });
        }
        return route.abort();
    });
});

for (const locale of ['sr', 'en']) {
    const home = locale === 'sr' ? '/' : '/home';
    const product = locale === 'sr' ? '/proizvod/test-product' : '/product/test-product';
    const category = locale === 'sr' ? '/kategorije/test-category' : '/categories/test-category';
    const checkout = locale === 'sr' ? '/porudzbina' : '/checkout';
    const add = locale === 'sr' ? 'Dodaj u Korpu' : 'Add to Cart';

    test(`${locale}: cheapest modifiers are selected and sorted numerically`, async ({ page }) => {
        await page.goto(locale === 'sr' ? '/proizvod/test-modifiers' : '/product/test-modifiers');
        await expect(page.getByRole('button', { name: 'Size Small', exact: true })).toBeVisible();
        const finish = page.getByRole('button', { name: 'Finish Standard', exact: true });
        await expect(finish).toBeVisible();
        await expect(page.getByText('1100 rsd', { exact: true })).toBeVisible();
        await finish.click();
        await expect(page.getByRole('option')).toHaveText(['Standard', 'Gloss', 'Premium']);
        await page.keyboard.press('Escape');
        await page.getByRole('button', { name: 'Size Small', exact: true }).click();
        await expect(page.getByRole('option')).toHaveText(['Small', 'Large']);
        await page.keyboard.press('Escape');
        await page.getByRole('button', { name: add, exact: true }).click();
        const cart = () => page.evaluate(() => JSON.parse(localStorage.getItem('cart') || '{}'));
        await expect.poll(async () => (await cart()).subTotal).toBe(1100);
        expect((await cart()).order_lines[0].modifiers['20'].id).toBe(202);
        await finish.click();
        await page.getByRole('option', { name: 'Gloss', exact: true }).click();
        await expect(page.getByText('1120 rsd', { exact: true })).toBeVisible();
        await page.getByRole('button', { name: add, exact: true }).click();
        await expect.poll(async () => (await cart()).subTotal).toBe(2220);
        expect((await cart()).order_lines).toHaveLength(2);
        await page.reload();
        await expect(page.getByRole('button', { name: 'Finish Standard', exact: true })).toBeVisible();
        expect((await cart()).order_lines[1].modifiers['20'].id).toBe(203);
    });

    test(`${locale}: catalog, search, navigation and responsive layout`, async ({ page, isMobile }) => {
        const errors: string[] = [];
        page.on('pageerror', error => errors.push(error.message));
        for (const path of [home, category, product, locale === 'sr' ? '/o-meni' : '/about']) {
            const response = await page.goto(path);
            expect(response?.status()).toBe(200);
            await expect(page.getByRole('navigation', { name: 'Top' })).toBeVisible();
            if (path !== '/about' && path !== '/o-meni') {
                const image = page.locator('img[src="https://admin.sladesignshop.com/storage/test-image.svg"]').first();
                await expect(image).toBeAttached();
                await expect.poll(() => image.evaluate((element: HTMLImageElement) => element.naturalWidth)).toBeGreaterThan(0);
            }
            expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth + 1)).toBeTruthy();
        }
        await page.goto(home);
        await expect(page.getByRole('link', { name: locale === 'sr' ? 'Test ukras' : 'Test accessory', exact: true }).first()).toBeVisible();
        await page.getByRole('button', { name: 'Toggle visibility' }).click();
        await page.getByRole('combobox').fill('Test');
        await expect(page.getByRole('option').first()).toBeVisible();
        await page.keyboard.press('Escape');
        await page.keyboard.press('Escape');
        await expect(page.getByRole('dialog')).toBeHidden();
        if (!isMobile) {
            await page.getByRole('button', { name: locale === 'sr' ? 'Katalog' : 'Catalog', exact: true }).click();
            await expect(page.getByRole('link', { name: locale === 'sr' ? 'Test kategorija' : 'Test category', exact: true }).first()).toBeVisible();
            await page.keyboard.press('Escape');
        }
        if (isMobile) {
            await page.getByRole('button', { name: 'Open menu' }).click();
            await expect(page.getByRole('dialog')).toBeVisible();
            await page.getByRole('button', { name: 'Close menu' }).click();
            await page.goto(category);
            await page.getByRole('button', { name: 'Kategorije' }).click();
            await expect(page.getByRole('dialog')).toBeVisible();
            await page.getByRole('button', { name: 'Close menu' }).click();
        }
        expect(errors).toEqual([]);
    });

    test(`${locale}: modifiers, cart persistence, quantities and mocked checkout`, async ({ page }) => {
        const errors: string[] = [];
        page.on('pageerror', error => errors.push(error.message));
        await page.goto(product);
        await expect(page.getByRole('heading', { level: 1 })).toContainText(locale === 'sr' ? 'Test ukras' : 'Test accessory');
        await page.getByRole('tab', { name: 'Second image' }).click();
        await page.getByRole('button', { name: add, exact: true }).click();
        await expect(page.locator('.Toastify__toast')).toBeVisible();
        await page.getByRole('button', { name: 'Size Small', exact: true }).click();
        await page.getByRole('option', { name: 'Large', exact: true }).click();
        await page.getByRole('button', { name: add, exact: true }).click();
        const cart = () => page.evaluate(() => JSON.parse(localStorage.getItem('cart') || '{}'));
        await expect.poll(async () => (await cart()).subTotal).toBe(2400);
        expect((await cart()).order_lines).toHaveLength(2);
        await page.reload();
        // The current cart trigger is attached to the shopping-bag icon.
        await page.getByRole('link', { name: /items in cart, view bag/ }).locator('svg').click();
        const dialog = page.getByRole('dialog');
        await expect(dialog).toBeVisible();
        await dialog.locator('select').first().selectOption('3');
        await expect.poll(async () => (await cart()).subTotal).toBe(4600);
        await dialog.getByRole('button', { name: locale === 'sr' ? 'Izbaci' : 'Remove', exact: true }).last().click();
        await expect.poll(async () => (await cart()).order_lines.length).toBe(1);
        await dialog.getByRole('link', { name: locale === 'sr' ? 'Nastavi na Plaćanje' : 'Continue to Payment' }).click();
        await expect(page).toHaveURL(new RegExp(`${checkout}$`));
        await expect.poll(async () => (await cart()).shipping).toBeGreaterThan(0);
        const submit = page.locator('form button[type="submit"]');
        await submit.click();
        await expect(page.getByText(locale === 'sr' ? 'Polje nije validno!' : 'Field is invalid!').first()).toBeVisible();
        const values = { email_address: 'test@example.invalid', phone_number: '123456789', first_name: 'Test', last_name: 'Customer', address: 'Synthetic street 1', city: 'Test City', postal_code: '11000' };
        for (const [name, value] of Object.entries(values)) await page.locator(`[name="${name}"]`).fill(value);
        const request = page.waitForRequest(r => r.url().endsWith('/orders/create') && r.method() === 'POST');
        await submit.click();
        const body = (await request).postDataJSON();
        expect(body.order_lines).toEqual([{ price: 1100, quantity: 3, product_id: 9001, modifier_ids: [101] }]);
        expect(body.price).toBe(3300);
        await expect(page.getByRole('heading', { name: locale === 'sr' ? 'Uspešna porudžbina!' : 'Successful order!' })).toBeVisible();
        await page.getByRole('button', { name: locale === 'sr' ? 'Nazad na početnu stranu' : 'Back to home page' }).click();
        await expect.poll(async () => (await cart()).order_lines?.length).toBe(0);
        expect(errors).toEqual([]);
    });
}

test('free shipping threshold and country change', async ({ page, isMobile }) => {
    const errors: string[] = [];
    page.on('pageerror', error => errors.push(error.message));
    await page.goto('/product/test-product');
    for (let i = 0; i < 5; i++) await page.getByRole('button', { name: 'Add to Cart', exact: true }).click();
    await page.goto('/checkout');
    const cart = () => page.evaluate(() => JSON.parse(localStorage.getItem('cart') || '{}'));
    await expect.poll(async () => (await cart()).subTotal).toBe(5500);
    await expect.poll(async () => (await cart()).shipping).toBe(0);
    await page.locator('[name="country_name"]').selectOption({ label: 'Germany' });
    await expect.poll(async () => (await cart()).shipping).toBeGreaterThan(0);
    if (isMobile) {
        await page.getByRole('button', { name: /Order total/ }).click();
        await expect(page.locator('[id^="headlessui-popover-panel"]')).toBeVisible();
        await page.keyboard.press('Escape');
    }
    expect(errors).toEqual([]);
});
