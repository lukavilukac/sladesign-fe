'use client'
import { assetUrl } from '@/app/helpers/assetUrl';

import {Fragment, useContext, useEffect, useState} from 'react'
import { ChevronUpIcon } from '@heroicons/react/20/solid'
import { Popover, Transition } from '@headlessui/react'
import {CartContext} from "../context/CartContext";
import ConfirmationModal from "./ConfirmationModal";
import {
    getQuantity,
    getOrderSummary,
    getOrderTotal,
    getShipping,
    getSubtotal,
    getContactInformation,
    getEmailAddress,
    getPhoneNumber,
    getCountry,
    getFirstName,
    getLastName,
    getShippingAddress, getAddress, getApartment, getCity, getPostalCode, getWillBeCharged, getCheckout, getInvalidField
} from "../Lang/LangHelper";
import { object, string } from "yup";
import { useFormik } from "formik";
import AxiosInstance from "../api/AxiosInstance";
import {countries} from "../static/countries";
const Checkout = ({locale}) => {

    const state = useContext(CartContext);
    const [openConfirmationModal, setOpenConfirmationModal] = useState(false);
    const [orderFailed, setOrderFailed] = useState(false);

    const updateShippingByCountry = (countryName) => {
        state.recalculateShippingPrice(countryName);
    }

    // Define the Yup schema for form validation
    let checkoutSchema = object({
        email_address: string().required().email(),
        phone_number: string().required(),
        first_name: string().required().min(2),
        last_name: string().required().min(2),
        address: string().required().min(2),
        apartment: string(),
        country_name: string(),
        country_code: string(),
        city: string().required().min(2),
        postal_code: string().required().min(2),
    });

    const [initialFormValues, setInitialFormValues] = useState({
        email_address: '',
        phone_number: '',
        first_name: '',
        last_name: '',
        address: '',
        apartment: '',
        country_name: 'Serbia',
        country_code: '381',
        city: '',
        postal_code: '',
    });

    const calculateModifierPriceForOrderLine = (orderLine) => {

        const modsObj = orderLine.modifiers;
        let modifierPrice = 0;


        // 1) ako nema modifajera ili je prazan objekat
        if (!modsObj || Object.keys(modsObj).length === 0) {
            return modifierPrice;
        }

        // 2) pretvori vrednosti objekta u niz
        const modsArr = Object.values(modsObj);

        modsArr.forEach(m => {
            modifierPrice += Number(m.price);
        });

        return modifierPrice;
    }

    const formik = useFormik({
        initialValues: initialFormValues,
        validationSchema: checkoutSchema,
        onSubmit: async (values) => {
            values.price = state.cart.subTotal;
            //state.cart.order_lines handle if it is empty
            values.order_lines = state.cart.order_lines.map((orderLine) => {

                const price = Number(orderLine.price) + calculateModifierPriceForOrderLine(orderLine);

                return {
                    price: price,
                    quantity: orderLine.quantity,
                    product_id: orderLine.id,
                    modifier_ids: orderLine.modifiers ? Object.values(orderLine.modifiers).map((modifier) => {
                        return modifier.id
                    }) : []
                }
            });

            try {
                await AxiosInstance.post('orders/create', values);
                setOrderFailed(false);
            } catch {
                setOrderFailed(true);
            } finally {
                setOpenConfirmationModal(true);
                formik.resetForm({ values: initialFormValues });
                formik.setErrors({});
            }
        },
    });

    // Use useEffect to update formik values when initialFormValues change
    useEffect(() => {
        formik.setValues(initialFormValues);
        state.recalculateShippingPrice("Serbia");
    }, []);

    useEffect(() => {
        // Code to parse URL parameters and update initialFormValues
        const params = new URLSearchParams(window.location.search);
        const email = params.get('email');
        const phone = params.get('phone');
        const firstName = params.get('first_name');
        const lastName = params.get('last_name');
        const address = params.get('address');
        const apartment = params.get('apartment');
        const countryName = params.get('country_name');
        const city = params.get('city');
        const postalCode = params.get('postal_code');

        setInitialFormValues((prevValues) => ({
            ...prevValues,
            email_address: email || prevValues.email_address,
            phone_number: phone || prevValues.phone_number,
            first_name: firstName || prevValues.first_name,
            last_name: lastName || prevValues.last_name,
            address: address || prevValues.address,
            apartment: apartment || prevValues.apartment,
            country_name: countryName || prevValues.country_name,
            city: city || prevValues.city,
            postal_code: postalCode || prevValues.postal_code,
            // ... other values ...
        }));
    }, []);

    return (
        <>
            <ConfirmationModal setOpen={setOpenConfirmationModal} open={openConfirmationModal} locale={locale} failed={orderFailed}/>
            <div className="bg-white">
                <main className="relative mx-auto grid max-w-7xl grid-cols-1 gap-x-16 lg:grid-cols-2 lg:px-8 xl:gap-x-48">
                    <h1 className="sr-only">Order information</h1>
                    <section
                        aria-labelledby="summary-heading"
                        className="bg-gray-50 px-4 pb-10 pt-16 sm:px-6 lg:col-start-2 lg:row-start-1 lg:bg-transparent lg:px-0 lg:pb-16"
                    >
                        <div className="mx-auto max-w-lg lg:max-w-none">
                            <h2 id="summary-heading" className="text-lg font-medium text-gray-900">
                                {getOrderSummary(locale)}
                            </h2>

                            <ul role="list" className="divide-y divide-gray-200 text-sm font-medium text-gray-900">
                                {state.cart.order_lines.map((product) => (
                                    <li key={`${product.id}-${JSON.stringify(product.modifiers)}`} className="flex items-start space-x-4 py-6">
                                        <img
                                            src={assetUrl(product.product_image.path)}
                                            alt={product.product_image.alt}
                                            className="h-20 w-20 flex-none rounded-md object-cover object-center"
                                        />
                                        <div className="flex-auto space-y-1">
                                            <h3>{product.name}</h3>
                                            <p className="text-gray-500">{getQuantity(locale) + ' ' + product.quantity}</p>

                                            <ul>
                                                {product.modifiers && Object.entries(product.modifiers).map(([key, modifier]) => (
                                                    <li className={'text-gray-500'} key={key}>{modifier.value} {modifier.description}</li>
                                                ))}
                                            </ul>

                                        </div>
                                        <p className="flex-none text-base font-medium">{state.getOrderLinePrice(product)} rsd</p>
                                    </li>
                                ))}
                            </ul>

                            <dl className="space-y-6 border-t border-gray-200 pt-6 text-sm font-medium text-gray-900 block">
                                <div className="flex items-center justify-between">
                                    <dt className="text-gray-600">{getSubtotal(locale)}</dt>
                                    <dd>{state.cart.subTotal} rsd</dd>
                                </div>

                                <div className="flex items-center justify-between">
                                    <dt className="text-gray-600">{getShipping(locale)}</dt>
                                    <dd>{state.cart.shipping} rsd</dd>
                                </div>


                                <div className="flex items-center justify-between border-t border-gray-200 pt-6">
                                    <dt className="text-base">{getOrderTotal(locale)}</dt>
                                    <dd className="text-base">{state.cart.subTotal + state.cart.shipping} rsd</dd>
                                </div>
                            </dl>

                            <Popover className="fixed inset-x-0 bottom-0 flex flex-col-reverse text-sm font-medium text-gray-900 lg:hidden">
                                <div className="relative z-10 border-t border-gray-200 bg-white px-4 sm:px-6">
                                    <div className="mx-auto max-w-lg">
                                        <Popover.Button className="flex w-full items-center py-6 font-medium">
                                            <span className="mr-auto text-base">{getOrderTotal(locale)}</span>
                                            <span className="mr-2 text-base">{state.cart.subTotal + state.cart.shipping} rsd</span>
                                            <ChevronUpIcon className="h-5 w-5 text-gray-500" aria-hidden="true" />
                                        </Popover.Button>
                                    </div>
                                </div>

                                <Transition.Root as={Fragment}>
                                    <div>
                                        <Transition.Child
                                            as={Fragment}
                                            enter="transition-opacity ease-linear duration-300"
                                            enterFrom="opacity-0"
                                            enterTo="opacity-100"
                                            leave="transition-opacity ease-linear duration-300"
                                            leaveFrom="opacity-100"
                                            leaveTo="opacity-0"
                                        >
                                            <Popover.Overlay className="fixed inset-0 bg-black bg-opacity-25" />
                                        </Transition.Child>

                                        <Transition.Child
                                            as={Fragment}
                                            enter="transition ease-in-out duration-300 transform"
                                            enterFrom="translate-y-full"
                                            enterTo="translate-y-0"
                                            leave="transition ease-in-out duration-300 transform"
                                            leaveFrom="translate-y-0"
                                            leaveTo="translate-y-full"
                                        >
                                            <Popover.Panel className="relative bg-white px-4 py-6 sm:px-6">
                                                <dl className="mx-auto max-w-lg space-y-6">
                                                    <div className="flex items-center justify-between">
                                                        <dt className="text-gray-600">{getSubtotal(locale)}</dt>
                                                        <dd>{state.cart.subTotal} rsd</dd>
                                                    </div>

                                                    <div className="flex items-center justify-between">
                                                        <dt className="text-gray-600">{getShipping(locale)}</dt>
                                                        <dd>{state.cart.shipping} rsd</dd>
                                                    </div>
                                                </dl>
                                            </Popover.Panel>
                                        </Transition.Child>
                                    </div>
                                </Transition.Root>
                            </Popover>
                        </div>
                    </section>

                    <form onSubmit={formik.handleSubmit} className="px-4 pb-36 pt-16 sm:px-6 lg:col-start-1 lg:row-start-1 lg:px-0 lg:pb-16">
                        <div className="mx-auto max-w-lg lg:max-w-none">
                            <section aria-labelledby="contact-info-heading">
                                <h2 id="contact-info-heading" className="text-lg font-medium text-gray-900">
                                    {getContactInformation(locale)}
                                </h2>

                                <div className="mt-6">
                                    <label htmlFor="email_address" className="block text-sm font-medium text-gray-700">
                                        {getEmailAddress(locale)} *
                                    </label>
                                    <div className="mt-1">
                                        <input
                                            type="email"
                                            id="email_address"
                                            name="email_address"
                                            autoComplete="email"
                                            className={`block w-full rounded-md ${
                                                (formik.touched.email_address && formik.errors.email_address) ? 'border-red-500' : 'border-gray-300'
                                            } shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm`}
                                            onChange={(e) => {
                                                formik.handleChange(e);
                                            }}
                                            onBlur={formik.handleBlur}
                                        />
                                        {formik.touched.email_address && formik.errors.email_address && (
                                            <div className="text-red-500 text-sm">{getInvalidField(locale)}</div>
                                        )}
                                    </div>
                                </div>

                                <div className="mt-6">
                                    <label htmlFor="phone_number" className="block text-sm font-medium leading-6 text-gray-900">
                                        {getPhoneNumber(locale)}
                                    </label>

                                    <div className="grid grid-cols-3 gap-4">
                                        {/* Country Code Field */}
                                        <div>
                                            <label htmlFor="country_code" className="sr-only">
                                                {getCountry(locale)}
                                            </label>
                                            <select
                                                id="country_code"
                                                name="country_code"
                                                autoComplete="country-code"
                                                value={formik.values.country_code}
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                                defaultValue={"381"}
                                                className="h-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                            >
                                                {countries.map(country => (
                                                    <option key={country.phone} value={country.phone}>{country.code}</option>
                                                ))}
                                            </select>
                                        </div>

                                        {/* Phone Number Field */}
                                        <div className="col-span-2 relative rounded-md shadow-sm">
                                            <input
                                                type="text"
                                                name="phone_number"
                                                id="phone_number"
                                                value={formik.values.phone_number}
                                                onChange={(e) => {
                                                    formik.handleChange(e);
                                                }}
                                                onBlur={formik.handleBlur}
                                                className={`block w-full rounded-md ${
                                                    (formik.touched.phone_number && formik.errors.phone_number) ? 'border-red-500' : 'border-gray-300'
                                                } shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm`}
                                                placeholder="69 1111111"
                                            />
                                        </div>
                                        {formik.touched.phone_number && formik.errors.phone_number && (
                                            <div className="text-red-500 text-sm">{getInvalidField(locale)}</div>
                                        )}
                                    </div>
                                </div>


                                <div className="mt-6">
                                    <label htmlFor="first_name" className="block text-sm font-medium text-gray-700">
                                        {getFirstName(locale)} *
                                    </label>
                                    <div className="mt-1">
                                        <input
                                            type="text"
                                            id="first_name"
                                            name="first_name"
                                            autoComplete="first_name"
                                            className={`block w-full rounded-md ${
                                                (formik.touched.first_name && formik.errors.first_name) ? 'border-red-500' : 'border-gray-300'
                                            } shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm`}
                                            onChange={(e) => {
                                                formik.handleChange(e);
                                            }}
                                            onBlur={formik.handleBlur}
                                        />
                                        {formik.touched.first_name && formik.errors.first_name && (
                                            <div className="text-red-500 text-sm">{getInvalidField(locale)}</div>
                                        )}
                                    </div>
                                </div>

                                <div className="mt-6">
                                    <label htmlFor="last_name" className="block text-sm font-medium text-gray-700">
                                        {getLastName(locale)} *
                                    </label>
                                    <div className="mt-1">
                                        <input
                                            type="text"
                                            id="last_name"
                                            name="last_name"
                                            autoComplete="last_name"
                                            className={`block w-full rounded-md ${
                                                (formik.touched.last_name && formik.errors.last_name) ? 'border-red-500' : 'border-gray-300'
                                            } shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm`}
                                            onChange={(e) => {
                                                formik.handleChange(e);
                                            }}
                                            onBlur={formik.handleBlur}
                                        />
                                        {formik.touched.last_name && formik.errors.last_name && (
                                            <div className="text-red-500 text-sm">{getInvalidField(locale)}</div>
                                        )}
                                    </div>
                                </div>
                            </section>

                            <section aria-labelledby="shipping-heading" className="mt-10">
                                <h2 id="shipping-heading" className="text-lg font-medium text-gray-900">
                                    {getShippingAddress(locale)}
                                </h2>

                                <div className="mt-6 grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-3">

                                    <div className="sm:col-span-3">
                                        <label htmlFor="address" className="block text-sm font-medium text-gray-700">
                                            {getAddress(locale)} *
                                        </label>
                                        <div className="mt-1">
                                            <input
                                                type="text"
                                                id="address"
                                                name="address"
                                                autoComplete="street-address"
                                                className={`block w-full rounded-md ${
                                                    (formik.touched.address && formik.errors.address) ? 'border-red-500' : 'border-gray-300'
                                                } shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm`}
                                                onChange={(e) => {
                                                    formik.handleChange(e);
                                                }}
                                                onBlur={formik.handleBlur}
                                            />
                                            {formik.touched.address && formik.errors.address && (
                                                <div className="text-red-500 text-sm">{getInvalidField(locale)}</div>
                                            )}
                                        </div>
                                    </div>

                                    <div className="sm:col-span-3">
                                        <label htmlFor="apartment" className="block text-sm font-medium text-gray-700">
                                            {getApartment(locale)}
                                        </label>
                                        <div className="mt-1">
                                            <input
                                                type="text"
                                                id="apartment"
                                                name="apartment"
                                                className={`block w-full rounded-md ${
                                                    (formik.touched.apartment && formik.errors.apartment) ? 'border-red-500' : 'border-gray-300'
                                                } shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm`}
                                                onChange={(e) => {
                                                    formik.handleChange(e);
                                                }}
                                                onBlur={formik.handleBlur}
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label htmlFor="country_name" className="block text-sm font-medium text-gray-700">
                                            {getCountry(locale)}
                                        </label>
                                        <div className="mt-1">
                                            <select
                                                id="country_name"
                                                name="country_name"
                                                autoComplete="country-name"
                                                value={formik.values.country_name}  // Set the value using formik.values.country_name
                                                onChange={(e) => {
                                                    formik.handleChange(e);
                                                    formik.setFieldValue('country_name', e.target.value);// Update country_name in formik state
                                                    updateShippingByCountry(e.target.value)
                                                }}
                                                onBlur={formik.handleBlur}
                                                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                            >
                                                {countries.map(country => (
                                                    <option key={country.phone} value={country.name}>{country.name}</option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>

                                    <div>
                                        <label htmlFor="city" className="block text-sm font-medium text-gray-700">
                                            {getCity(locale)} *
                                        </label>
                                        <div className="mt-1">
                                            <input
                                                type="text"
                                                id="city"
                                                name="city"
                                                autoComplete="address-level2"
                                                className={`block w-full rounded-md ${
                                                    (formik.touched.city && formik.errors.city) ? 'border-red-500' : 'border-gray-300'
                                                } shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm`}
                                                onChange={(e) => {
                                                    formik.handleChange(e);
                                                }}
                                                onBlur={formik.handleBlur}
                                            />
                                            {formik.touched.city && formik.errors.city && (
                                                <div className="text-red-500 text-sm">{getInvalidField(locale)}</div>
                                            )}
                                        </div>
                                    </div>

                                    <div>
                                        <label htmlFor="postal_code" className="block text-sm font-medium text-gray-700">
                                            {getPostalCode(locale)} *
                                        </label>
                                        <div className="mt-1">
                                            <input
                                                type="text"
                                                id="postal_code"
                                                name="postal_code"
                                                autoComplete="postal-code"
                                                className={`block w-full rounded-md ${
                                                    (formik.touched.postal_code && formik.errors.postal_code) ? 'border-red-500' : 'border-gray-300'
                                                } shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm`}
                                                onChange={(e) => {
                                                    formik.handleChange(e);
                                                }}
                                                onBlur={formik.handleBlur}
                                            />
                                            {formik.touched.postal_code && formik.errors.postal_code && (
                                                <div className="text-red-500 text-sm">{getInvalidField(locale)}</div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </section>

                            <div className="mt-10 border-t border-gray-200 pt-6 sm:flex sm:items-center sm:justify-between">
                                <button
                                    type="submit"
                                    className="w-full rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-50 sm:order-last sm:ml-6 sm:w-auto"
                                >
                                    {getCheckout(locale)}
                                </button>

                                <p className="mt-4 text-center text-sm text-gray-500 sm:mt-0 sm:text-left">
                                    {getWillBeCharged(locale)}
                                </p>
                            </div>
                        </div>
                    </form>
                </main>
            </div>
        </>

)
};



export default Checkout;
