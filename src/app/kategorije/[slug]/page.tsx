import Categories from "@/app/components/Categories";
import {getDataForCategoriesPage} from "@/app/api/DataProvider";
import RootLayoutSrb from "@/app/layoutsrb";



const page = async ({ params }: { params: Promise<{ slug: string }> }) => {
    const locale = 'sr';
    const data = await getDataForCategoriesPage(await params, locale);

    return (
        <RootLayoutSrb>
            <Categories
                categories={data.categories}
                products={data.products}
            />
        </RootLayoutSrb>
    )
}

export default page;
