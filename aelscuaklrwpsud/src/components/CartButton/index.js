import React from "react";

const inCart = ({paintID}) => {
    const cartItems = JSON.parse(sessionStorage.getItem('cart'));
    return cartItems.includes(paintID);
}

const isSoldOut = ({paintID}) => {
    const cartItems = JSON.parse(sessionStorage.getItem('soldOut'));
    return cartItems.includes(paintID);
}
const addToCart = ({event, paintID}) => {
    event.preventDefault();
    const cartItems = JSON.parse(sessionStorage.getItem('cart'));
    const cartBtn = document.getElementById(paintID);
    if (!(cartItems.includes(paintID))) {
        cartItems.push(paintID);
    }
    sessionStorage.setItem('cart', JSON.stringify(cartItems));
    cartBtn.textContent = "in cart";
    cartBtn.classList.remove("gal-buy");
    cartBtn.classList.add("disabled-gal-buy");
}
export default function CartButton({ paintID }) {
    //apply the disabled style if the item is in the cart or sold out
    // if the item is not in the cart at this point, we assume
    // it must be sold out (hence the inner html if statement)
    if (inCart ({paintID}) || isSoldOut({paintID})) {
        return (
            <div className="disabled-gal-buy tracking-wide uppercase px-3 ">
                {inCart({paintID}) ? "in cart" : "sold out"}
            </div>
        )
    } else {
        return (
            <button className="gal-buy tracking-wide uppercase px-3"
                     id={paintID}
                     onClick={
                         (event) => addToCart( {event, paintID})
                     }>
                add to cart
            </button>
        )
    }
}