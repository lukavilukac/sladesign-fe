import Categories from "@/app/components/Categories";
import RootLayoutEng from "@/app/layouteng";
import {getDataForCategoriesPage} from "@/app/api/DataProvider";



const page = async ({ params }: { params: Promise<{ slug: string }> }) => {
    const locale = 'en';
    const data = await getDataForCategoriesPage(await params, locale);

    return (
        <RootLayoutEng>
            <Categories
                categories={data.categories}
                products={data.products}
            />
        </RootLayoutEng>
    )
}

export default page;
