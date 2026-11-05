
import Stimilation from "@/app/components/Stimilation";
import TrendingProducts from "@/app/components/TrendingProducts";
import Landing from "@/app/components/Landing";
import ShopByCategory from "@/app/components/ShopByCategory";
import RootLayoutEng from "@/app/layouteng";
import {getDataForLayout} from "@/app/api/DataProvider";
export default async function Page() {
    const locale = 'en';
    const data = await getDataForLayout(locale);

    return (
        <RootLayoutEng>
            <div className="bg-white">

                <main>
                    {/* Hero section */}
                    <Landing locale={locale} />

                    <ShopByCategory categories={data.categories} categoryHref={data.categoryHref} locale={locale}/>

                    <Stimilation locale={locale} />

                    <TrendingProducts  products={data.products} productHref={data.productHref}/>

                </main>

            </div>
        </RootLayoutEng>
    );
}
