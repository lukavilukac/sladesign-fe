const assetBaseUrl = process.env.NEXT_PUBLIC_ASSET_BASE_URL
    || 'https://admin.sladesignshop.com';

export function assetUrl(path: string): string {
    // Only API storage paths need a backend origin; keep local assets and full URLs.
    if (!path || !/^\/?storage\//.test(path)) return path;

    return new URL('/' + path.replace(/^\//, ''), assetBaseUrl).href;
}
