import { assetUrl } from '@/app/helpers/assetUrl';
import {shopByCategoryString} from "@/app/Lang/LangHelper";

const ShopByCategory = async ({categories, categoryHref, locale}) => {

        return (
            <div className="bg-white">
                <div className="py-16 sm:py-24 xl:mx-auto xl:max-w-7xl xl:px-8">
                    <div className="px-4 sm:flex sm:items-center sm:justify-between sm:px-6 lg:px-8 xl:px-0">
                        <h2 className="text-2xl font-bold tracking-tight text-gray-500">{shopByCategoryString(locale)}</h2>
                    </div>

                    <div className="mt-4 flow-root">
                        <div className="-my-2">
                            <div className="relative box-content h-80 overflow-x-auto py-2 xl:overflow-visible">
                                <div className="absolute flex space-x-8 px-4 sm:px-6 lg:px-8 xl:relative xl:grid xl:grid-cols-5 xl:gap-x-8 xl:space-x-0 xl:px-0">
                                    {categories.length > 0 && categories.map((category) => (
                                        <a
                                            key={category.name}
                                            href={'/' + categoryHref + '/' + category.slug}
                                            className="relative flex h-80 w-56 flex-col overflow-hidden rounded-lg p-6 hover:opacity-75 xl:w-auto"
                                        >
                    <span aria-hidden="true" className="absolute inset-0">
                      <img src={assetUrl(category.category_image.path)} alt="" className="h-full w-full object-cover object-center" />
                    </span>
                                            <span
                                                aria-hidden="true"
                                                className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-gray-800 opacity-50"
                                            />
                                            <span className="relative mt-auto text-center text-xl font-bold text-white">{category.name}</span>
                                        </a>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
}

export default ShopByCategory;