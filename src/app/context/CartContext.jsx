'use client';

import {createContext, useEffect, useState} from 'react';
import {countries} from "@/app/static/countries";

const initState = {
    cart: null,
    add: (_product) => {},
    remove: (_product) => {},
    updateQuantity: (_quantity, _productId) => {},//todo maybe not needed
    destroy: () => {},
    recalculateShippingPrice: (_countryName) => {},
    getOrderLinePrice: (_orderLine) => {}
}

export const CartContext = createContext(initState)

const CartProvider = ({ children }) => {

    const [cart, setCart] = useState(initState.cart);

    const setCartAndUpdateLS = (cart) => {
        setCart(cart);
        localStorage.setItem('cart', JSON.stringify(cart));
    }

    useEffect(() => {
        const cartFromLs = localStorage.getItem('cart');
        setCartAndUpdateLS(cartFromLs ? JSON.parse(cartFromLs) : {
            order_lines: [],
            subTotal: 0
        })
    }, []);

    const add = (newOrderLine) => {
        const orderLines = cart.order_lines;

        const existingOrderLine = orderLines.find(orderLine => (
            orderLine.id === newOrderLine.id &&
            JSON.stringify(orderLine.modifiers) === JSON.stringify(newOrderLine.modifiers)
        ));

        if (existingOrderLine) { // If a match is found, increment the quantity
            existingOrderLine.quantity++;
        } else {
            // If no match is found, add a new object
            newOrderLine.quantity = 1;
            orderLines.push(newOrderLine);
        }
        const subTotal = recalculateTotal(orderLines);
        setCartAndUpdateLS({
            ...cart, // Copy the previous cart state
            order_lines: orderLines,
            subTotal: subTotal
        });
    }

    const getOrderLinePrice = (orderLine) => {
        let modifiersTotalPrice = 0;

        if (orderLine.modifiers) {
            Object.values(orderLine.modifiers).forEach((modifier) => {
                modifiersTotalPrice += parseFloat(modifier.price);
            });
        }

        return orderLine.quantity * (parseFloat(orderLine.price) + modifiersTotalPrice);
    }

    const remove = (product) => {
        const orderLines = cart.order_lines.filter(orderLine => (
            orderLine.id !== product.id
            || JSON.stringify(orderLine.modifiers) !== JSON.stringify(product.modifiers)
        ));

        const subTotal = recalculateTotal(orderLines);
        setCartAndUpdateLS({
            ...cart,
            order_lines: orderLines,
            subTotal
        });
    }
    const updateQuantity = (quantity, _product) => {

        const orderLines = cart.order_lines;
        const product = orderLines.find(product => product.id === _product.id && JSON.stringify(_product.modifiers) === JSON.stringify(product.modifiers));
        product.quantity = quantity;

        const subTotal = recalculateTotal(orderLines);

        setCartAndUpdateLS({
            ...cart,
            order_lines: orderLines,
            subTotal
        });
    }

    const recalculateTotal = (orderLines) => {
        var subTotal = 0;
        orderLines.forEach((orderLine) => {
            if (orderLine.modifiers) {
                Object.values(orderLine.modifiers).forEach((modifier) => {
                    subTotal += parseFloat(modifier.price) * orderLine.quantity;
                });

            }
            subTotal += orderLine.price * orderLine.quantity;
        });

        return subTotal;
    }

    const recalculateShippingPrice = (countryName) => {


        const country = countries.find(country => country.name === countryName);

        var shippingPrice = country.shipping_price;

        if (country.name === 'Serbia' && cart.subTotal >= 5000) {
            shippingPrice = 0;
        }
        setCartAndUpdateLS({
            ...cart, // Copy the previous cart state
            shipping: shippingPrice
        });
    }

    const destroy = () => {
        setCart(initState.cart);
        localStorage.setItem('cart', '');
    }

    return (
        <CartContext.Provider
            value={{
                cart,
                add,
                remove,
                updateQuantity,
                destroy,
                recalculateShippingPrice,
                getOrderLinePrice
                }}
        >
            {cart ? children : null}
        </CartContext.Provider>
    )
}
export default CartProvider
