import Product from "@/app/components/Product";
import {getDataForProductPage} from "@/app/api/DataProvider";
import RootLayoutSrb from "@/app/layoutsrb";
import {Metadata} from "next";

export const generateMetadata = async ({ params }: { params: Promise<{ slug: string }> }):Promise<Metadata> => {
    const data = await getDataForProductPage(await params, 'sr');

    return {
        title: data.product.name,
        description: data.product.description,
        openGraph: {
            images: data.product.product_image.path
        }
    }
}

const page = async ({ params }: { params: Promise<{ slug: string }> }) => {
    const locale = 'sr';

    const data = await getDataForProductPage(await params, locale);

    return <RootLayoutSrb>
        <Product product={data.product} locale={locale} />
    </RootLayoutSrb>
}

export default page;
