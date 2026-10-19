import Product from "@/app/components/Product";
import RootLayoutEng from "@/app/layouteng";
import {getDataForProductPage} from "@/app/api/DataProvider";
import {Metadata} from "next";

export const generateMetadata = async ({ params }: { params: Promise<{ slug: string }> }):Promise<Metadata> => {
  const data = await getDataForProductPage(await params, 'en');

  return {
    title: data.product.name,
    description: data.product.description,
    openGraph: {
      images: data.product.product_image.path
    }
  }
}

const page = async ({ params }: { params: Promise<{ slug: string }> }) => {
  const locale = 'en';

  const data = await getDataForProductPage(await params, locale);

  return <RootLayoutEng>
    <Product product={data.product} locale={locale} />
  </RootLayoutEng>
}

export default page;
