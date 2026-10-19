import {Fragment, useContext, useEffect} from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import {CartContext} from "@/app/context/CartContext";
import {
    getCheckoutPageLink,
    getClose,
    getContinueToPayment,
    getItemsInYourShoppingCart, getOrderSummary,
    getQuantity,
    getRemove,
    getShoppingCart, getSubtotal
} from "@/app/Lang/LangHelper";
import Link from "next/link";

const ShoppingCartComponent = ({locale, open, setOpen}) => {

    const state = useContext(CartContext);

    const handleRedirectOrReload = () => {
        const targetUrl = `${window.location.origin}/${getCheckoutPageLink(locale)}`;
        if (window.location.href === targetUrl) {
            window.location.reload();
        }
    }

    const handleQuantityChange = (event, product) => {
        state.updateQuantity(event.target.value, product);
    }

    useEffect(() => {
        if (state.cart.order_lines.length < 1) {
            setOpen(false);
        }
    }, [state.cart.order_lines]);

    return (
        <Transition.Root show={open} as={Fragment}>
            <Dialog as="div" className="relative z-10" onClose={setOpen}>
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="hidden sm:fixed sm:inset-0 sm:block sm:bg-gray-500 sm:bg-opacity-75 sm:transition-opacity" />
                </Transition.Child>

                <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                    <div className="flex min-h-full items-stretch justify-center text-center sm:items-center sm:px-6 lg:px-8">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 scale-105"
                            enterTo="opacity-100 scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 scale-100"
                            leaveTo="opacity-0 scale-105"
                        >
                            <Dialog.Panel className="flex w-full max-w-3xl transform text-left text-base transition sm:my-8">
                                <form className="relative flex w-full flex-col overflow-hidden bg-white pb-8 pt-6 sm:rounded-lg sm:pb-6 lg:py-8">
                                    <div className="flex items-center justify-between px-4 sm:px-6 lg:px-8">
                                        <h2 className="text-lg font-medium text-gray-900">{getShoppingCart(locale)}</h2>
                                        <button type="button" className="text-gray-400 hover:text-gray-500" onClick={() => setOpen(false)}>
                                            <span className="sr-only">{getClose(locale)}</span>
                                            <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                                        </button>
                                    </div>

                                    <section aria-labelledby="cart-heading">
                                        <h2 id="cart-heading" className="sr-only">
                                            {getItemsInYourShoppingCart(locale)}
                                        </h2>

                                        <ul role="list" className="divide-y divide-gray-200 px-4 sm:px-6 lg:px-8">
                                            {state.cart.order_lines.map((product, productIdx) => (
                                                <li key={`${product.id}-${JSON.stringify(product.modifiers)}`} className="flex py-8 text-sm sm:items-center">
                                                    <img
                                                        src={product.product_image.thumbnail_path}
                                                        alt={product.product_image.alt}
                                                        className="h-24 w-24 flex-none rounded-lg border border-gray-200 sm:h-32 sm:w-32"
                                                    />
                                                    <div className="ml-4 grid flex-auto grid-cols-1 grid-rows-1 items-start gap-x-5 gap-y-3 sm:ml-6 sm:flex sm:items-center sm:gap-0">
                                                        <div className="row-end-1 flex-auto sm:pr-6">
                                                            <h3 className="font-medium text-gray-900">
                                                                <a href={window.location.origin + '/' + 'product/' + '/' + product.slug}>{product.name}</a>
                                                            </h3>
                                                            {product.modifiers && Object.values(product.modifiers).map(modifier =>
                                                                    <p key={modifier.id} className="mt-1 text-gray-500">{modifier.value + ' '} {modifier.description}</p>
                                                                )
                                                            }
                                                        </div>
                                                        <p className="row-span-2 row-end-2 font-medium text-gray-900 sm:order-1 sm:ml-6 sm:w-1/3 sm:flex-none sm:text-right">
                                                            {state.getOrderLinePrice(product)} rsd
                                                        </p>
                                                        <div className="flex items-center sm:block sm:flex-none sm:text-center">
                                                            <label htmlFor={`quantity-${productIdx}`} className="sr-only">
                                                                {getQuantity(locale)}, {product.name}
                                                            </label>

                                                            <select
                                                                value={product.quantity}
                                                                onChange={(e) => handleQuantityChange(e, product)}
                                                                id={`quantity-${productIdx}`}
                                                                name={`quantity-${productIdx}`}
                                                                className="block max-w-full rounded-md border border-gray-300 py-1.5 text-left text-base font-medium leading-5 text-gray-700 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm"
                                                            >
                                                                {[1, 2, 3, 4, 5, 6, 7, 8].map(quantity => <option key={quantity} value={quantity}>{quantity}</option>)}
                                                            </select>

                                                            <button
                                                                type="button"
                                                                className="ml-4 font-medium text-indigo-600 hover:text-indigo-500 sm:ml-0 sm:mt-2"
                                                                onClick={() => state.remove(product)}
                                                            >
                                                                <span>{getRemove(locale)}</span>
                                                            </button>
                                                        </div>
                                                    </div>
                                                </li>
                                            ))}
                                        </ul>
                                    </section>

                                    <section aria-labelledby="summary-heading" className="mt-auto sm:px-6 lg:px-8">
                                        <div className="bg-gray-50 p-6 sm:rounded-lg sm:p-8">
                                            <h2 id="summary-heading" className="sr-only">
                                                {getOrderSummary(locale)}
                                            </h2>

                                            <div className="flow-root">
                                                <dl className="-my-4 divide-y divide-gray-200 text-sm">
                                                    <div className="flex items-center justify-between py-4">
                                                        <dt className="text-gray-600">{getSubtotal(locale)}</dt>
                                                        <dd className="font-medium text-gray-900">{state.cart.subTotal} rsd</dd>
                                                    </div>
                                                    {/*<div className="flex items-center justify-between py-4">
                                                        <dt className="text-gray-600">{getShipping(locale)}</dt>
                                                        <dd className="font-medium text-gray-900">{state.cart.shipping} rsd</dd>
                                                    </div>
                                                    <div className="flex items-center justify-between py-4">
                                                        <dt className="text-base font-medium text-gray-900">{getOrderTotal(locale)}</dt>
                                                        <dd className="text-base font-medium text-gray-900">{state.cart.subTotal + state.cart.shipping} rsd</dd>
                                                    </div>*/}
                                                </dl>
                                            </div>
                                        </div>
                                    </section>

                                    <div className="mt-8 flex justify-end px-4 sm:px-6 lg:px-8">
                                        <button
                                            type="submit"
                                            className="rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-50"
                                        >
                                            <Link href={'/' + getCheckoutPageLink(locale)} onClick={handleRedirectOrReload}>
                                                    {getContinueToPayment(locale)}
                                            </Link>
                                        </button>
                                    </div>
                                </form>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition.Root>
    )
}

export default ShoppingCartComponent;
