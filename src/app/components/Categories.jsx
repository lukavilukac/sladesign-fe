'use client'

import {Fragment, useState} from 'react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { FunnelIcon } from '@heroicons/react/20/solid';
import {Dialog, Menu, Transition} from "@headlessui/react";
import {useParams} from "next/navigation";

const Categories = ({categories, products}) => {

    const params = useParams();

    const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);


    return <div className="bg-white">
        <div>
            {/* Mobile filter dialog */}
            <Transition.Root show={mobileFiltersOpen} as={Fragment}>
                <Dialog as="div" className="relative z-40 lg:hidden" onClose={setMobileFiltersOpen}>
                    <Transition.Child
                        as={Fragment}
                        enter="transition-opacity ease-linear duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="transition-opacity ease-linear duration-300"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-black bg-opacity-25" />
                    </Transition.Child>

                    <div className="fixed inset-0 z-40 flex">
                        <Transition.Child
                            as={Fragment}
                            enter="transition ease-in-out duration-300 transform"
                            enterFrom="translate-x-full"
                            enterTo="translate-x-0"
                            leave="transition ease-in-out duration-300 transform"
                            leaveFrom="translate-x-0"
                            leaveTo="translate-x-full"
                        >
                            <Dialog.Panel className="relative ml-auto flex h-full w-full max-w-xs flex-col overflow-y-auto bg-white py-4 pb-12 shadow-xl">
                                <div className="flex items-center justify-between px-4">
                                    <h2 className="text-lg font-medium text-gray-600">Kategorije</h2>
                                    <button
                                        type="button"
                                        className="-mr-2 flex h-10 w-10 items-center justify-center rounded-md bg-white p-2 text-gray-400"
                                        onClick={() => setMobileFiltersOpen(false)}
                                    >
                                        <span className="sr-only">Close menu</span>
                                        <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                                    </button>
                                </div>

                                {/* Filters */}
                                <form className="mt-4 border-t border-gray-200">
                                    <h3 className="sr-only">Categories</h3>
                                    <ul role="list" className="px-2 py-3 font-medium">
                                        {categories.map((category) => (
                                            <li className="flex items-center" key={category.name}>
                                                <div className="h-8 w-8 flex-shrink-0">
                                                    {<img className="h-8 w-8 rounded-full" src={category.category_image.thumbnail_path} alt="" />}
                                                </div>

                                                <a
                                                    href={category.href}
                                                    className={`block px-2 py-3 ${category.isActive ? 'text-gray-400' : 'text-gray-600'}`}
                                                >{category.name}</a>
                                            </li>
                                        ))}
                                    </ul>

                                </form>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </Dialog>
            </Transition.Root>

            <main className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-4">

                <div className="flex items-baseline justify-between border-b border-gray-200 pb-6 pt-24">
                    <div className={'lg:w-full lg:grid lg:justify-items-center sm:pr-2'}>
                        <h3 className={'text-center'}>{params.slug}</h3>
                    </div>

                    <div className="flex items-center">
                        <Menu as="div" className="relative inline-block text-left">

                            <Transition
                                as={Fragment}
                                enter="transition ease-out duration-100"
                                enterFrom="transform opacity-0 scale-95"
                                enterTo="transform opacity-100 scale-100"
                                leave="transition ease-in duration-75"
                                leaveFrom="transform opacity-100 scale-100"
                                leaveTo="transform opacity-0 scale-95"
                            >

                            </Transition>
                        </Menu>

                        <button
                            type="button"
                            className="-m-2 ml-4 p-2 text-gray-400 hover:text-gray-500 sm:ml-6 lg:hidden flex items-center"
                            onClick={() => setMobileFiltersOpen(true)}
                        >

                            <FunnelIcon className="h-5 w-5" aria-hidden="true" /> <span> &nbsp; Kategorije</span>
                        </button>
                    </div>
                </div>

                <section aria-labelledby="products-heading" className="pb-24 pt-6">
                    <h2 id="products-heading" className="sr-only">
                        Products
                    </h2>

                    <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4">
                        {/* Filters */}
                        <form className="hidden lg:block">
                            <h3 className="sr-only">Categories</h3>
                            <ul role="list" className="space-y-4 border-b border-gray-200 pb-6 text-sm font-medium">
                                {categories.map((category) => (
                                    <li className="flex items-center" key={category.name}>
                                        <div className="h-8 w-8 flex-shrink-0">
                                            {<img className="h-8 w-8 rounded-full" src={category.category_image.thumbnail_path} alt="" />}
                                        </div>

                                        <a
                                            href={category.href}
                                            className={`block px-2 py-3 ${category.isActive ? 'text-gray-400' : 'text-gray-600'}`}
                                        >{category.name}</a>
                                    </li>
                                ))}
                            </ul>

                        </form>

                        {/* Product grid */}
                        <div className="lg:col-span-3">

                            <div className="bg-white">
                                <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
                                    <h2 className="sr-only">Products</h2>

                                    <div className="grid grid-cols-1 gap-y-4 sm:grid-cols-2 sm:gap-x-6 sm:gap-y-10 lg:grid-cols-3 lg:gap-x-8">
                                        {products.map((product) => (
                                            <div
                                                key={product.id}
                                                className="group relative flex flex-col overflow-hidden rounded-lg border border-gray-200 bg-white"
                                            >
                                                <div className="bg-gray-200 max-w-full group-hover:opacity-75">
                                                    <img
                                                        src={product.product_image.path}
                                                        alt={product.product_image.alt}
                                                        className="h-full w-full object-cover object-center sm:h-full sm:w-full"
                                                    />
                                                </div>
                                                <div className="flex flex-1 flex-col space-y-2 p-4">
                                                    <h3 className="text-sm font-medium text-gray-900">
                                                        <a href={product.href}>
                                                            <span aria-hidden="true" className="absolute inset-0" />
                                                            {product.name}
                                                        </a>
                                                    </h3>
                                                    <p className="text-sm text-gray-500">{product.description}</p>
                                                    <div className="flex flex-1 flex-col justify-end">
                                                        {/*<p className="text-sm italic text-gray-500">{product.options}</p>*/}
                                                        <p className="text-base font-medium text-gray-900">{product.price} rsd</p>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
        </div>
    </div>
}

export default Categories;