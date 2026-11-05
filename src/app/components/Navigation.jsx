'use client';
import { assetUrl } from '@/app/helpers/assetUrl';

import {Fragment, useContext, useState} from 'react';
import { Popover, Transition } from '@headlessui/react';
import {
    ShoppingBagIcon
} from "@heroicons/react/24/outline";
import LangDropdown from "@/app/components/LangDropdown";
import SearchComponent from "@/app/components/SearchComponent";
import ShoppingCartComponent from "@/app/components/ShoppingCartComponent";
import {CartContext} from "@/app/context/CartContext";
import {getAbout} from "@/app/Lang/LangHelper";

function classNames(...classes) {
    return classes.filter(Boolean).join(' ');
}

const Navigation = ({navigation, locale}) => {

    const [cartOpen, setCartOpen] = useState(false);
    const state = useContext(CartContext);

    const handleShoppingBagIconClick = () => {
        if (state.cart.order_lines.length > 0) {
            setCartOpen(true);
        }
    }

    return <>
        <header className="relative">
            <nav aria-label="Top">
                {/* navigation */}
                <div className="bg-white">
                    <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
                        <div className="grid h-16 grid-cols-6 items-center justify-items-center lg:flex lg:justify-between">
                            {/* Logo */}
                            <div className="flex items-center lg:flex-1">
                                <a href={locale === 'en' ? '/home' : '/'}>
                                    <span className="sr-only">Sla Design</span>
                                    <img
                                        className="h-8 w-auto"
                                        src="/icon.jpg"
                                        alt="icon"
                                    />
                                </a>
                            </div>

                            <div className="contents lg:flex lg:h-full">
                                {/* Flyout menus */}
                                <Popover.Group className="contents lg:block lg:px-4">
                                    <div className="contents lg:flex lg:h-full lg:justify-center lg:space-x-8">
                                        {navigation.categories.map(category => (
                                            <Popover key={category.name} className="flex h-full">
                                                {({ open }) => (
                                                    <>
                                                        <Popover.Backdrop className="fixed inset-0 z-10" />
                                                        <div className="relative z-20 flex">
                                                            <Popover.Button
                                                                className={classNames(
                                                                    open
                                                                        ? 'text-rose-300'
                                                                        : 'text-gray-700 hover:text-gray-800',
                                                                    'relative flex min-h-11 items-center justify-center whitespace-nowrap text-xs font-medium sm:text-sm transition-colors duration-200 ease-out'
                                                                )}
                                                            >
                                                                {category.name}
                                                                <span
                                                                    className={classNames(
                                                                        open
                                                                            ? 'bg-rose-300'
                                                                            : '',
                                                                        'absolute inset-x-0 -bottom-px z-20 h-0.5 transition duration-200 ease-out'
                                                                    )}
                                                                    aria-hidden="true"
                                                                />
                                                            </Popover.Button>
                                                        </div>

                                                        <Transition
                                                            as={Fragment}
                                                            enter="transition ease-out duration-200"
                                                            enterFrom="opacity-0"
                                                            enterTo="opacity-100"
                                                            leave="transition ease-in duration-150"
                                                            leaveFrom="opacity-100"
                                                            leaveTo="opacity-0"
                                                        >
                                                            <Popover.Panel className="absolute inset-x-0 top-full z-20 max-h-[calc(100dvh-4rem)] overflow-y-auto bg-white text-sm text-gray-500">
                                                                {/* Presentational element used to render the bottom shadow, if we put the shadow on the actual panel it pokes out the top, so we use this shorter element to hide the top of the shadow */}
                                                                <div
                                                                    className="absolute inset-0 top-1/2 bg-white shadow"
                                                                    aria-hidden="true"
                                                                />
                                                                {/* Fake border when menu is open */}
                                                                <div
                                                                    className="absolute inset-0 top-0 mx-auto h-px max-w-7xl px-8"
                                                                    aria-hidden="true"
                                                                >
                                                                    <div
                                                                        className={classNames(
                                                                            open
                                                                                ? 'bg-gray-200'
                                                                                : 'bg-transparent',
                                                                            'h-px w-full transition-colors duration-200 ease-out'
                                                                        )}
                                                                    />
                                                                </div>

                                                                <div className="relative">
                                                                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                                                                        <div className="grid grid-cols-2 gap-4 py-6 lg:grid-cols-4 lg:gap-x-8 lg:gap-y-10 lg:py-16">
                                                                            {category.featured.length > 0 &&
                                                                                category.featured.map(
                                                                                    item => (
                                                                                        <div
                                                                                            key={
                                                                                                item.name
                                                                                            }
                                                                                            className="group relative"
                                                                                        >
                                                                                            <div className="aspect-h-1 aspect-w-1 overflow-hidden rounded-md bg-gray-100 group-hover:opacity-75">
                                                                                                <img
                                                                                                    src={assetUrl(item.category_image.path)}
                                                                                                    alt={
                                                                                                        item
                                                                                                            .category_image
                                                                                                            .alt
                                                                                                    }
                                                                                                    className="object-cover object-center"
                                                                                                />
                                                                                            </div>
                                                                                            <a
                                                                                                href={item.href}
                                                                                                className="mt-4 block font-medium text-gray-900"
                                                                                            >
                                                                                                    <span
                                                                                                        className="absolute inset-0 z-10"
                                                                                                        aria-hidden="true"
                                                                                                    />
                                                                                                {
                                                                                                    item.name
                                                                                                }
                                                                                            </a>
                                                                                        </div>
                                                                                    )
                                                                                )}
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </Popover.Panel>
                                                        </Transition>
                                                    </>
                                                )}
                                            </Popover>
                                        ))}

                                        <a
                                            href={locale === 'en' ? '/about' : '/o-meni'}
                                            className="flex min-h-11 items-center whitespace-nowrap text-xs font-medium text-gray-700 hover:text-gray-800 sm:text-sm"
                                        >
                                            {getAbout(locale)}
                                        </a>

                                    </div>
                                </Popover.Group>
                            </div>

                            <div className="contents lg:flex lg:flex-1 lg:items-center lg:justify-end">
                                <span className="flex min-h-11 items-center justify-center text-sm font-medium text-gray-400 hover:text-gray-500 [&>button]:flex [&>button]:h-11 [&>button]:w-11 [&>button]:items-center [&>button]:justify-center">
                                    <SearchComponent locale={locale}/>
                                </span>

                                <div className="contents lg:flex lg:items-center lg:ml-8">

                                    <LangDropdown locale={locale} />

                                    {/* Cart */}
                                    <div className="flow-root lg:ml-8">
                                        <button
                                            type="button"
                                            onClick={handleShoppingBagIconClick}
                                            className="group flex min-h-11 items-center justify-center lg:-m-2 lg:p-2"
                                        >
                                            <ShoppingBagIcon
                                                className="h-6 w-6 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                                                aria-hidden="true"
                                            />
                                            <span className="ml-1 text-sm font-medium text-gray-700 group-hover:text-gray-800">
                                                    {state.cart.order_lines.length}
                                                </span>
                                            <span className="sr-only">
                                                    items in cart, view bag
                                                </span>
                                        </button>
                                    </div>

                                    <ShoppingCartComponent locale={locale} open={cartOpen} setOpen={setCartOpen}></ShoppingCartComponent>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>
        </header>
    </>
}

export default Navigation;
