
import Landing from './components/Landing';
import ShopByCategory from './components/ShopByCategory';
import Stimilation from "@/app/components/Stimilation";
import TrendingProducts from "@/app/components/TrendingProducts";
import RootLayoutSrb from "@/app/layoutsrb";
import {getDataForLayout} from "@/app/api/DataProvider";

export const metadata = {
    title: "SlaDesign Shop",
    description: "Otkrijte izvrsne ručno izrađene modne detalje za žene i devojčice na Sladesignshopu. istražite našu odabranu kolekciju jedinstvenih dodataka, pažljivo kreiranih da unaprede vaš stil. Kupujte sada ručno izrađene modne detalje koji dodaju dodir individualnosti svakom odevnom komadu."
}

export default async function Page() {
    const locale = 'sr';
    const data = await getDataForLayout(locale);

    return (
        <RootLayoutSrb>
            <div className="bg-white">

                <main>
                    {/* Hero section */}
                    <Landing locale={locale} />

                    <TrendingProducts  products={data.products} productHref={data.productHref}/>

                    <Stimilation locale={locale} />

                    <ShopByCategory categories={data.categories} categoryHref={data.categoryHref} locale={locale} />

                </main>

            </div>
        </RootLayoutSrb>
    );
}
