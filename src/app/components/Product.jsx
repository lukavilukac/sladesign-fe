'use client'

import { Tab } from "@headlessui/react";
import React, { useContext, useState } from "react";
import { getAddProductSuccess, getAddToCartString, getGoToCheckoutPageButton } from "@/app/Lang/LangHelper";
import { CartContext } from "@/app/context/CartContext";
import { toast } from "react-toastify";
import Modifiers from "@/app/components/Modifiers";

function classNames(...classes) {
    return classes.filter(Boolean).join(' ');
}

const Product = ({ product, locale }) => {
    const state = useContext(CartContext);
    const [updatedProduct, setUpdatedProduct] = useState(() => initializeProduct(product));

    function initializeProduct(product) {
        const basePrice = Number(product.basePrice ?? product.price ?? 0);
        const defaultModifiers = Object.fromEntries(
            product.modifier_groups.map(group => [group.id, group.modifiers[0]])
        );

        // Calculate total price based on modifiers
        const totalPrice = Object.values(defaultModifiers)
            .reduce((sum, mod) => sum + Number(mod?.price || 0), basePrice);

        return {
            ...product,
            modifiers: defaultModifiers,
            price: basePrice,   // Keep the base price
            totalPrice: totalPrice // Add totalPrice
        };
    }

    const handleModifierChange = (modifierGroupId, modifier) => {
        setUpdatedProduct((prevProduct) => {
            if (!prevProduct) return prevProduct; // Safety check

            const basePrice = Number(prevProduct.basePrice ?? prevProduct.price ?? 0);

            // Update selected modifiers
            const updatedModifiers = {
                ...prevProduct.modifiers,
                [modifierGroupId]: modifier
            };

            // Recalculate total price after modifier change
            const totalPrice = basePrice + Object.values(updatedModifiers)
                .reduce((sum, mod) => sum + Number(mod?.price || 0), 0);

            return {
                ...prevProduct,
                modifiers: updatedModifiers,
                price: basePrice,  // Keep original price
                totalPrice: totalPrice // Update totalPrice
            };
        });
    };

    const add = () => {
        toast.success(getAddProductSuccess(locale) + updatedProduct.name);
        state.add(updatedProduct);
    };

    const proceedToCheckout = () => {
        window.location.href = locale === 'sr' ? '/porudzbina' : '/checkout';
    };

    return (
        <div className="bg-white">
            <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
                <div className="lg:grid lg:grid-cols-2 lg:items-start lg:gap-x-8">
                    <Tab.Group as="div" className="flex flex-col-reverse">
                        <div className="mx-auto mt-6 w-full max-w-2xl block lg:max-w-none">
                            <Tab.List className="grid grid-cols-4 gap-6">
                                {updatedProduct.product_images.map((image) => (
                                    <Tab
                                        key={image.id}
                                        className="relative flex h-24 cursor-pointer items-center justify-center rounded-md bg-white text-sm font-medium uppercase text-gray-600 hover:bg-gray-50 focus:outline-none focus:ring focus:ring-opacity-50 focus:ring-offset-4"
                                    >
                                        {({ selected }) => (
                                            <>
                                                <span className="sr-only">{image.name}</span>
                                                <span className="absolute inset-0 overflow-hidden rounded-md">
                                                    <img src={image.path} alt={image.alt} className="h-full w-full object-cover object-center" />
                                                </span>
                                                <span
                                                    className={classNames(
                                                        selected ? 'ring-indigo-500' : 'ring-transparent',
                                                        'pointer-events-none absolute inset-0 rounded-md ring-2 ring-offset-2'
                                                    )}
                                                    aria-hidden="true"
                                                />
                                            </>
                                        )}
                                    </Tab>
                                ))}
                            </Tab.List>
                        </div>

                        <Tab.Panels className="aspect-h-1 aspect-w-1 w-full">
                            {updatedProduct.product_images.map((image) => (
                                <Tab.Panel key={image.id}>
                                    <img
                                        src={image.path}
                                        alt={image.alt}
                                        className="h-full w-full object-cover object-center sm:rounded-lg"
                                    />
                                </Tab.Panel>
                            ))}
                        </Tab.Panels>
                    </Tab.Group>

                    <div className="mt-10 px-4 sm:mt-16 sm:px-0 lg:mt-0 h-full flex flex-col">
                        <h1 className="text-3xl font-bold tracking-tight text-gray-600">{updatedProduct.name}</h1>

                        <div className="mt-3">
                            <h2 className="sr-only">Product information</h2>
                            <p className="text-3xl tracking-tight text-gray-600">{updatedProduct.totalPrice} rsd</p>
                        </div>

                        <div className="mt-6">
                            <h3 className="sr-only">Description</h3>
                            <div className="space-y-6 text-base text-gray-500">
                                {updatedProduct.description}
                            </div>
                        </div>

                        {updatedProduct.modifier_groups.length > 0 && (
                            updatedProduct.modifier_groups.map(modifierGroup => (
                                <div key={modifierGroup.id} className={'mt-8 mb-7'}>
                                    <Modifiers modifierGroup={modifierGroup} onModifierChange={handleModifierChange} />
                                </div>
                            ))
                        )}

                        <div className="mt-auto flex flex-wrap space-x-4">
                            <button
                                onClick={add}
                                type="submit"
                                className="flex max-w-xs flex-1 items-center justify-center rounded-md border border-transparent bg-rose-400 px-8 py-3 text-base font-medium text-white hover:bg-rose-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-50 sm:w-full"
                            >
                                {getAddToCartString(locale)}
                            </button>

                            {state.cart?.order_lines.length > 0 &&
                                <button
                                    onClick={proceedToCheckout}
                                    type="submit"
                                    className="flex max-w-xs flex-1 items-center justify-center rounded-md border border-transparent bg-gray-500 px-8 py-3 text-base font-medium text-white hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-50 sm:w-full ml-4"
                                >
                                    {getGoToCheckoutPageButton(locale)}
                                </button>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Product;
