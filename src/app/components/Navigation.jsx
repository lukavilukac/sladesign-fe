'use client';
import { assetUrl } from '@/app/helpers/assetUrl';

import {Fragment, useContext, useState} from 'react';
import { Dialog, Popover, Tab, Transition } from '@headlessui/react';
import {
    Bars3Icon,
    ShoppingBagIcon,
    XMarkIcon
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

    const [open, setOpen] = useState(false);
    const [cartOpen, setCartOpen] = useState(false);
    const state = useContext(CartContext);

    const handleShoppingBagIconClick = () => {
        if (state.cart.order_lines.length > 0) {
            setCartOpen(true);
        }
    }

    return <>
        {/* Mobile menu */}
        <Transition.Root show={open} as={Fragment}>
            <Dialog as="div" className="relative z-40 lg:hidden" onClose={setOpen}>
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
                        enterFrom="-translate-x-full"
                        enterTo="translate-x-0"
                        leave="transition ease-in-out duration-300 transform"
                        leaveFrom="translate-x-0"
                        leaveTo="-translate-x-full"
                    >
                        <Dialog.Panel className="relative flex w-full max-w-xs flex-col overflow-y-auto bg-white pb-12 shadow-xl">
                            <div className="flex px-4 pb-2 pt-5">
                                <button
                                    type="button"
                                    className="-m-2 inline-flex items-center justify-center rounded-md p-2 text-gray-400"
                                    onClick={() => setOpen(false)}
                                >
                                    <span className="sr-only">Close menu</span>
                                    <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                                </button>
                            </div>

                            {/* Links */}
                            <Tab.Group as="div" className="mt-2">
                                <div className="border-b border-gray-200">
                                    <Tab.List className="-mb-px flex space-x-8 px-4">
                                        {navigation.categories.map(category => (
                                            <Tab
                                                key={category.name}
                                                className={({ selected }) =>
                                                    classNames(
                                                        selected
                                                            ? 'border-rose-300 text-rose-300'
                                                            : 'border-transparent text-gray-900',
                                                        'flex-1 whitespace-nowrap border-b-2 px-1 py-4 text-base font-medium'
                                                    )
                                                }
                                            >
                                                {category.name}
                                            </Tab>
                                        ))}
                                    </Tab.List>
                                </div>
                                <Tab.Panels as={Fragment}>
                                    {navigation.categories.map(category => (
                                        <Tab.Panel
                                            key={category.name}
                                            className="space-y-12 px-4 py-6"
                                        >
                                            <div className="grid grid-cols-2 gap-x-4 gap-y-10">
                                                {category.featured.length > 0 &&
                                                    category.featured.map(item => (
                                                        <div
                                                            key={item.name}
                                                            className="group relative"
                                                        >
                                                            <div className="aspect-h-1 aspect-w-1 overflow-hidden rounded-md bg-gray-100 group-hover:opacity-75">
                                                                <img
                                                                    src={assetUrl(item.category_image.path)}
                                                                    // alt={item.category_mage.alt}
                                                                    className="object-cover object-center"
                                                                />
                                                            </div>
                                                            <a
                                                                href={item.href}
                                                                className="mt-6 block text-sm font-medium text-gray-900"
                                                            >
                                                                    <span
                                                                        className="absolute inset-0 z-10"
                                                                        aria-hidden="true"
                                                                    />
                                                                {item.name}
                                                            </a>
                                                            <p
                                                                aria-hidden="true"
                                                                className="mt-1 text-sm text-gray-500"
                                                            >
                                                                Shop now
                                                            </p>
                                                        </div>
                                                    ))}
                                            </div>
                                        </Tab.Panel>
                                    ))}
                                </Tab.Panels>
                            </Tab.Group>

                            <div className="space-y-6 border-t border-gray-200 px-4 py-6">

                                <a href={locale === 'en' ? '/about' : '/o-meni'} className="-m-2 block p-2 font-medium text-gray-900">
                                    {getAbout(locale)}
                                </a>

                            </div>


                        </Dialog.Panel>
                    </Transition.Child>
                </div>
            </Dialog>
        </Transition.Root>

        <header className="relative">
            <nav aria-label="Top">
                {/* navigation */}
                <div className="bg-white">
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        <div className="flex h-16 items-center justify-between">
                            {/* Logo (lg+) */}
                            <div className="hidden lg:flex lg:flex-1 lg:items-center">
                                <a href={locale === 'en' ? '/home' : '/'}>
                                    <span className="sr-only">Sla Design</span>
                                    <img
                                        className="h-8 w-auto"
                                        src="/icon.jpg"
                                        alt="icon"
                                    />
                                </a>
                            </div>

                            <div className="hidden h-full lg:flex">
                                {/* Flyout menus */}
                                <Popover.Group className="inset-x-0 bottom-0 px-4">
                                    <div className="flex h-full justify-center space-x-8">
                                        {navigation.categories.map(category => (
                                            <Popover key={category.name} className="flex">
                                                {({ open }) => (
                                                    <>
                                                        <div className="relative flex">
                                                            <Popover.Button
                                                                className={classNames(
                                                                    open
                                                                        ? 'text-rose-300'
                                                                        : 'text-gray-700 hover:text-gray-800',
                                                                    'relative flex items-center justify-center text-sm font-medium transition-colors duration-200 ease-out'
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
                                                            <Popover.Panel className="absolute inset-x-0 top-full z-10 bg-white text-sm text-gray-500">
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
                                                                        <div className="grid grid-cols-4 gap-x-8 gap-y-10 py-16">
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
                                            className="flex items-center text-sm font-medium text-gray-700 hover:text-gray-800"
                                        >
                                            {getAbout(locale)}
                                        </a>

                                    </div>
                                </Popover.Group>
                            </div>

                            {/* Mobile menu and search (lg-) */}
                            <div className="flex flex-1 items-center lg:hidden">
                                <button
                                    type="button"
                                    className="-ml-2 rounded-md bg-white p-2 text-gray-400"
                                    onClick={() => setOpen(true)}
                                >
                                    <span className="sr-only">Open menu</span>
                                    <Bars3Icon className="h-6 w-6" aria-hidden="true" />
                                </button>

                                {/* Search */}
                                <span className="ml-2 p-2 text-gray-400 hover:text-gray-500">
                                    <SearchComponent locale={locale}/>
                                </span>

                            </div>

                            {/* Logo (lg-) */}
                            <a href={locale === 'en' ? '/home' : '/'} className="lg:hidden">
                                <span className="sr-only">Sla Design</span>
                                <img
                                    src="/icon.jpg"
                                    alt="icon"
                                    className="h-8 w-auto"
                                />
                            </a>

                            <div className="flex flex-1 items-center justify-end">
                                <span className="hidden text-sm font-medium text-gray-400 hover:text-gray-500 lg:block">
                                    <SearchComponent locale={locale}/>
                                </span>

                                <div className="flex items-center lg:ml-8">

                                    <LangDropdown locale={locale} />

                                    {/* Cart */}
                                    <div className="ml-4 flow-root lg:ml-8">
                                        <a
                                            href="#"
                                            className="group -m-2 flex items-center p-2"
                                        >
                                            <ShoppingBagIcon
                                                onClick={handleShoppingBagIconClick}
                                                className="h-6 w-6 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                                                aria-hidden="true"
                                            />
                                            <span className="ml-2 text-sm font-medium text-gray-700 group-hover:text-gray-800">
                                                    {state.cart.order_lines.length}
                                                </span>
                                            <span className="sr-only">
                                                    items in cart, view bag
                                                </span>
                                        </a>
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
