import AxoisInstance from "@/app/api/AxiosInstance";
import {Locale} from '@/app/interfaces/locale';
import {buildMainNavigationObject} from "@/app/Lang/LangHelper";
import AxiosInstance from "@/app/api/AxiosInstance";

export const getDataForLayout = async (locale: Locale) => {
    process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

    const categoryHref =  locale === 'en' ? 'categories' : 'kategorije';
    const productHref = locale === 'en' ? 'product' : 'proizvod';

    try {
        const categoriesRes = await AxoisInstance.get('categories?limit=5',{
            headers: {
                Locale: locale
            }
        });
        const categories = categoriesRes.data;

        const productsRes = await AxoisInstance.get('products?limit=4', {
            headers: {
                Locale: locale
            }
        });
        const products = productsRes.data;

        return {categories, categoryHref, productHref, products};
    } catch (e) {
        console.warn('getDataForLayout: falling back due to API error', e);
        return {categories: [], categoryHref, productHref, products: []};
    }
};

export const getNavigationData = async (locale: Locale) => {
    process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
    try {
        const categories = await AxoisInstance.get('categories?limit=4',{
            headers: {
                Locale: locale
            }
        });
        const navigation = buildMainNavigationObject(locale, categories);
        return {navigation};
    } catch (e) {
        console.warn('getNavigationData: falling back due to API error', e);
        const navigation = buildMainNavigationObject(locale, { data: [] } as any);
        return {navigation};
    }
};


export async function getDataForCategoriesPage(params: any, locale: Locale) {

    const categoryHref =  locale === 'en' ? 'categories' : 'kategorije';

    const productHref = locale === 'en' ? 'product' : 'proizvod';


    const categoriesRes = await AxiosInstance.get('categories',{
        headers: {
            Locale: locale
        }
    });

    const categories = await categoriesRes.data.map((category: any) => ({
        ...category,
        href: '/' + categoryHref + '/' + category.slug,
        isActive: category.slug === params.slug
    }));

    const productsRes = await AxiosInstance.get('products/get-by-category-slug/' + params.slug,{
        headers: {
            Locale: locale
        }
    });

    const products = productsRes.data.map((product: any) => ({
        ...product,
        href: '/' + productHref + '/' + product.slug
    }));

    return {categories, products};
}

export async function getDataForProductPage(params: any, locale: Locale) {
    const productRes = await AxoisInstance.get('products/find-by-slug/' + params.slug, {
        headers: {
            Locale: locale
        }
    });
    const product = productRes.data

    return {product}
}
