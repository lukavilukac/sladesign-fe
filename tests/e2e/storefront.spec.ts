import { test, expect } from '@playwright/test';
import { apiResponse, catalog as fixtureCatalog } from '../fixtures/catalog.mjs';

test.beforeEach(async ({ page }) => {
    // Block all external traffic. API reads and order writes are synthetic.
    await page.route('**/*', async route => {
        const url = new URL(route.request().url());
        if (url.hostname === '127.0.0.1' || url.hostname === 'localhost') return route.continue();
        if (['app.sladesignshop.com', 'admin.sladesignshop.com'].includes(url.hostname) && url.pathname.startsWith('/api/')) {
            if (url.pathname.endsWith('/customers/lookup')) return route.fulfill({ json: { exists: false, user: null, shipping: null } });
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

    test(`${locale}: homepage categories wrap after four cards on mobile`, async ({ page, isMobile }) => {
        test.skip(!isMobile, 'Mobile category grid only');
        await page.goto(home);
        const section = page.getByRole('heading', { name: locale === 'sr' ? 'Kupujte po kategorijama' : 'Shop by category', exact: true }).locator('../..');
        const cards = section.getByRole('link');
        await expect(cards).toHaveCount(5);
        for (const width of [320, 390, 768]) {
            await page.setViewportSize({ width, height: 844 });
            const boxes = await cards.evaluateAll(elements => elements.map(element => {
                const { x, y, width, right } = element.getBoundingClientRect();
                return { x, y, width, right };
            }));
            for (const box of boxes) {
                expect(box.x).toBeGreaterThanOrEqual(0);
                expect(box.right).toBeLessThanOrEqual(width);
                expect(Math.abs(box.width - boxes[0].width)).toBeLessThan(1);
            }
            expect(boxes.slice(0, 4).every(box => box.y === boxes[0].y)).toBeTruthy();
            expect(boxes[4].y).toBeGreaterThan(boxes[0].y);
            expect(await section.evaluate(element => [element, ...Array.from(element.querySelectorAll('*'))].every(node => node.scrollWidth <= node.clientWidth + 1))).toBeTruthy();
        }
        await cards.first().click();
        await expect(page).toHaveURL(new RegExp(`${category}$`));
    });

    test(`${locale}: homepage section order and category descriptions`, async ({ page }) => {
        const fixture = fixtureCatalog(locale);
        await page.goto(home);
        const categoriesHeading = page.getByRole('heading', { name: locale === 'sr' ? 'Kupujte po kategorijama' : 'Shop by category', exact: true });
        const trendingHeading = page.getByRole('heading', { name: 'Trending', exact: true });
        await expect(categoriesHeading).toBeVisible();
        await expect(trendingHeading).toBeVisible();
        expect((await categoriesHeading.boundingBox())!.y).toBeLessThan((await trendingHeading.boundingBox())!.y);
        await page.goto(category);
        await expect(page.getByRole('heading', { name: fixture.category.name, exact: true })).toBeVisible();
        await expect(page).toHaveURL(new RegExp(`${category}$`));
        const card = page.getByRole('heading', { name: fixture.product.name, exact: true }).locator('..');
        const description = (await card.locator('p').first().innerText()).trim();
        expect(description.length).toBeLessThanOrEqual(120);
        expect(description.endsWith('...')).toBeTruthy();
        expect(fixture.product.description.startsWith(description.slice(0, -3))).toBeTruthy();
        await page.goto(product);
        await expect(page.getByText(fixture.product.description, { exact: true })).toBeVisible();
    });

    test(`${locale}: mobile navigation is evenly spaced without a hamburger`, async ({ page, isMobile }) => {
        test.skip(!isMobile, 'Mobile navigation only');
        // Compile both routes before opening the browser to avoid dev-server reloads.
        await page.request.get(locale === 'sr' ? '/o-meni' : '/about');
        await page.request.get(home);
        await page.goto(home);
        const nav = page.getByRole('navigation', { name: 'Top' });
        const catalog = nav.getByRole('button', { name: locale === 'sr' ? 'Katalog' : 'Catalog', exact: true });
        const about = nav.getByRole('link', { name: locale === 'sr' ? 'O meni' : 'About', exact: true });
        const search = nav.getByRole('button', { name: 'Toggle visibility' });
        const logo = nav.getByRole('link', { name: 'Sla Design' });
        const language = nav.getByRole('button', { name: locale === 'sr' ? 'Izaberite jezik' : 'Choose language' });
        const cart = nav.getByRole('button', { name: /items in cart, view bag/ });
        await expect(nav.getByRole('button', { name: 'Open menu' })).toHaveCount(0);
        for (const width of [320, 390, 768]) {
            await page.setViewportSize({ width, height: 844 });
            const boxes = [];
            for (const item of [logo, catalog, about, search, language, cart]) {
                await expect(item).toBeVisible();
                boxes.push((await item.boundingBox())!);
            }
            const centers = boxes.map(box => box.x + box.width / 2);
            for (let index = 2; index < centers.length; index++) {
                expect(Math.abs((centers[index] - centers[index - 1]) - (centers[1] - centers[0]))).toBeLessThan(2);
            }
            expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBeTruthy();
        }
        await page.setViewportSize({ width: 390, height: 844 });
        await page.screenshot({ path: test.info().outputPath('mobile-navigation.png') });
        await catalog.click();
        const panel = page.locator('[id^="headlessui-popover-panel-"]');
        await expect(panel).toBeVisible();
        await expect(panel.getByRole('link').first()).toBeVisible();
        const rows = panel.getByRole('listitem');
        await expect(rows).toHaveCount(5);
        const rowBoxes = await rows.evaluateAll(elements => elements.map(element => {
            const { x, y, height } = element.getBoundingClientRect();
            return { x, y, height };
        }));
        for (let index = 1; index < rowBoxes.length; index++) {
            expect(rowBoxes[index].x).toBe(rowBoxes[0].x);
            expect(rowBoxes[index].y).toBeGreaterThanOrEqual(rowBoxes[index - 1].y + rowBoxes[index - 1].height);
        }
        for (const thumbnail of await panel.locator('img').all()) {
            const box = (await thumbnail.boundingBox())!;
            expect(box.width).toBe(32);
            expect(box.height).toBe(32);
        }
        await panel.screenshot({ path: test.info().outputPath('mobile-catalog.png') });
        await page.mouse.click(5, 839);
        await expect(panel).toBeHidden();
        await search.click();
        await expect(page.getByRole('combobox')).toBeVisible();
        await page.keyboard.press('Escape');
        await page.keyboard.press('Escape');
        await expect(page.getByRole('combobox')).toBeHidden();
        await language.click();
        await expect(page.getByRole('menuitem')).toBeVisible();
        await page.keyboard.press('Escape');
        await expect(page.getByRole('menuitem')).toBeHidden();
        await about.click();
        await expect(page).toHaveURL(locale === 'sr' ? /\/o-meni$/ : /\/about$/);
    });

    test(`${locale}: desktop catalog closes on outside click`, async ({ page, isMobile }) => {
        test.skip(isMobile, 'Desktop catalog only');
        await page.goto(home);
        const catalog = page.getByRole('button', { name: locale === 'sr' ? 'Katalog' : 'Catalog', exact: true });
        await catalog.click();
        await expect(catalog).toHaveAttribute('aria-expanded', 'true');
        const panel = page.locator('[id^="headlessui-popover-panel-"]');
        await expect(panel).toBeVisible();
        await page.mouse.click(5, page.viewportSize()!.height - 5);
        await expect(catalog).toHaveAttribute('aria-expanded', 'false');
        await expect(panel).toBeHidden();
        await catalog.click();
        await expect(panel).toBeVisible();
        await page.keyboard.press('Escape');
        await expect(panel).toBeHidden();
        await expect(catalog).toBeFocused();
    });

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
            await page.getByRole('button', { name: locale === 'sr' ? 'Katalog' : 'Catalog', exact: true }).click();
            await expect(page.locator('[id^="headlessui-popover-panel-"]')).toBeVisible();
            await page.keyboard.press('Escape');
            await page.goto(category);
            await page.getByRole('button', { name: 'Kategorije' }).click();
            const categoryDialog = page.getByRole('dialog');
            await expect(categoryDialog.getByRole('heading', { name: 'Kategorije', exact: true })).toBeVisible();
            await expect(categoryDialog.getByRole('link', { name: locale === 'sr' ? 'Test kategorija' : 'Test category', exact: true })).toBeVisible();
            await page.getByRole('button', { name: 'Close menu' }).click();
            await expect(categoryDialog).toHaveCount(0);
        }
        expect(errors).toEqual([]);
    });

    for (const orderFails of [false, true]) {
        test(`${locale}: modifiers, cart persistence, quantities and mocked checkout (${orderFails ? 'error' : 'success'})`, async ({ page }) => {
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
            await page.getByRole('button', { name: /items in cart, view bag/ }).click();
            const dialog = page.getByRole('dialog');
            await expect(dialog.getByRole('heading', { level: 2 }).first()).toBeVisible();
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
            await page.locator('[name="email_address"]').fill('test@example.invalid');
            await submit.click();
            await expect(page.locator('[name="first_name"]')).toBeVisible();
            const values = { email_address: 'test@example.invalid', phone_number: '123456789', first_name: 'Test', last_name: 'Customer', address: 'Synthetic street 1', city: 'Test City', postal_code: '11000' };
            for (const [name, value] of Object.entries(values).filter(([name]) => name !== 'email_address')) await page.locator(`[name="${name}"]`).fill(value);
            if (orderFails) {
                await page.route('**/orders/create', route => route.fulfill({ status: 500, json: { message: 'Internal server details' } }));
            }
            const request = page.waitForRequest(r => r.url().endsWith('/orders/create') && r.method() === 'POST');
            await submit.click();
            const body = (await request).postDataJSON();
            expect(body.order_lines).toEqual([{ price: 1100, quantity: '3', product_id: 9001, modifier_ids: [101] }]);
            expect(body.price).toBe(3300);
            await expect(page.getByRole('heading', { name: orderFails
                ? (locale === 'sr' ? 'Ooops! Greška u sistemu.' : 'Oops! A system error occurred.')
                : (locale === 'sr' ? 'Uspešna porudžbina!' : 'Successful order!') })).toBeVisible();
            await page.getByRole('button', { name: locale === 'sr' ? 'Nazad na početnu stranu' : 'Back to home page' }).click();
            await expect.poll(async () => (await cart()).order_lines?.length).toBe(0);
            await page.reload();
            await expect.poll(async () => (await cart()).order_lines?.length).toBe(0);
            expect(errors).toEqual([]);
        });
    }
}

test('Serbia delivery and free shipping threshold', async ({ page, isMobile }) => {
    const errors: string[] = [];
    page.on('pageerror', error => errors.push(error.message));
    await page.goto('/product/test-product');
    for (let i = 0; i < 4; i++) await page.getByRole('button', { name: 'Add to Cart', exact: true }).click();
    await page.goto('/checkout');
    const cart = () => page.evaluate(() => JSON.parse(localStorage.getItem('cart') || '{}'));
    await expect.poll(async () => (await cart()).subTotal).toBe(4400);
    await expect.poll(async () => (await cart()).shipping).toBe(500);
    await page.locator('[name="email_address"]').fill('test@example.invalid');
    await page.getByRole('button', { name: 'Next', exact: true }).click();
    await expect(page.locator('[name="country_name"] option')).toHaveText(['Serbia']);
    await page.goto('/product/test-product');
    await page.getByRole('button', { name: 'Add to Cart', exact: true }).click();
    await page.goto('/checkout');
    await expect.poll(async () => (await cart()).subTotal).toBe(5500);
    await expect.poll(async () => (await cart()).shipping).toBe(0);
    await page.reload();
    await expect.poll(async () => (await cart()).shipping).toBe(0);
    if (isMobile) {
        await page.getByRole('button', { name: /Order total/ }).click();
        await expect(page.locator('[id^="headlessui-popover-panel"]')).toBeVisible();
        await page.keyboard.press('Escape');
    }
    expect(errors).toEqual([]);
});

for (const locale of ['sr', 'en']) {
    for (const hasShipping of [true, false]) {
        test(`${locale}: returning customer lookup (shipping ${hasShipping})`, async ({ page }) => {
            const requests: string[] = [];
            await page.route('**/customers/lookup', async route => {
                requests.push(route.request().postDataJSON().email);
                expect(route.request().headers().locale).toBe(locale);
                await route.fulfill({ json: {
                    exists: true,
                    user: { first_name: 'Petar', last_name: 'Petrović', phone_number: '+381691111111', country: 'Serbia', city: 'Novi Sad', address: 'Primer 12', apartment: '3' },
                    shipping: hasShipping ? { country: 'Serbia', city: 'Beograd', address: 'Nova 15', apartment: '', phone_number: '+381692222222', postal_code: null } : null
                } });
            });
            await page.goto(locale === 'sr' ? '/porudzbina' : '/checkout');
            await expect(page.locator('#first_name')).toBeHidden();
            await page.locator('#email_address').fill('test@example.invalid');
            await page.locator('#email_address').press('Enter');
            await expect(page.getByRole('status')).toContainText(locale === 'sr' ? 'Vi ste već naručivali' : 'You have ordered before');
            await expect(page.locator('#first_name')).toHaveValue('Petar');
            await expect(page.locator('#city')).toHaveValue(hasShipping ? 'Beograd' : 'Novi Sad');
            await expect(page.locator('#address')).toHaveValue(hasShipping ? 'Nova 15' : 'Primer 12');
            await expect(page.locator('#apartment')).toHaveValue(hasShipping ? '' : '3');
            await expect(page.locator('#phone_number')).toHaveValue(hasShipping ? '692222222' : '691111111');
            await expect(page.locator('#country_code')).toHaveValue('381');
            await expect(page.locator('#postal_code')).toHaveValue('');
            await page.locator('form button[type="submit"]').click();
            await expect(page.locator('#postal_code')).toHaveClass(/border-red-500/);
            expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1)).toBeTruthy();
            await page.locator('#email_address').fill('new@example.invalid');
            await expect(page.locator('#first_name')).toBeHidden();
            await page.route('**/customers/lookup', route => route.fulfill({ json: { exists: false, user: null, shipping: null } }));
            await page.locator('form button[type="submit"]').click();
            await expect(page.locator('#first_name')).toHaveValue('');
            await expect(page.locator('#address')).toHaveValue('');
            expect(requests).toEqual(['test@example.invalid']);
        });
    }
    test(`${locale}: lookup failures can be retried`, async ({ page }) => {
        await page.route('**/customers/lookup', route => route.fulfill({ status: 429, json: {} }));
        await page.goto(locale === 'sr' ? '/porudzbina' : '/checkout');
        await page.locator('#email_address').fill('test@example.invalid');
        await page.locator('form button[type="submit"]').click();
        await expect(page.locator('form').getByRole('alert')).toContainText(locale === 'sr' ? 'Previše pokušaja' : 'Too many attempts');
        await expect(page.locator('#first_name')).toBeHidden();
        await page.route('**/customers/lookup', route => route.fulfill({ status: 500, json: {} }));
        await page.locator('form button[type="submit"]').click();
        await expect(page.locator('form').getByRole('alert')).toContainText(locale === 'sr' ? 'Provera email adrese nije uspela' : 'We could not check');
        await page.route('**/customers/lookup', route => route.fulfill({ json: { exists: false } }));
        await page.locator('form button[type="submit"]').click();
        await expect(page.locator('#first_name')).toBeVisible();
    });
}
