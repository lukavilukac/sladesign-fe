const picture = { id: 1, name: 'Test image', alt: 'Test accessory', path: '/storage/test-image.svg', thumbnail_path: '/storage/test-image.svg' };
export function catalog(locale = 'sr') {
    const product = {
        id: 9001, slug: 'test-product', name: locale === 'en' ? 'Test accessory' : 'Test ukras',
        description: 'Synthetic test product', price: '1000', product_image: picture,
        product_images: [picture, { ...picture, id: 2, name: 'Second image' }],
        modifier_groups: [{ id: 10, name: 'Size', modifiers: [
            { id: 102, value: 'Large', description: '', price: '300' },
            { id: 101, value: 'Small', description: '', price: '100' }
        ] }]
    };
    const category = { id: 8001, slug: 'test-category', name: locale === 'en' ? 'Test category' : 'Test kategorija', category_image: picture };
    return { product, category };
}

export function apiResponse(path, locale) {
    const { product, category } = catalog(locale);
    if (path === '/api/products/find-by-slug/test-modifiers') {
        return {
            ...product,
            modifier_groups: [...product.modifier_groups, {
                id: 20, name: 'Finish', required: true, modifiers: [
                    { id: 201, value: 'Premium', description: '', price: '100' },
                    { id: 202, value: 'Standard', description: '', price: '0' },
                    { id: 203, value: 'Gloss', description: '', price: '20' }
                ]
            }]
        };
    }
    if (path === '/api/categories') return [category];
    if (path === '/api/products' || path.startsWith('/api/products/get-by-category-slug/')) return [product];
    if (path.startsWith('/api/products/find-by-slug/')) return product;
    if (path === '/api/products-and-categories') return [
        { ...product, thumbnail_path: '/storage/test-image.svg', type: locale === 'en' ? 'product' : 'proizvod' },
        { ...category, thumbnail_path: '/storage/test-image.svg', type: locale === 'en' ? 'category' : 'kategorija' }
    ];
    return null;
}
