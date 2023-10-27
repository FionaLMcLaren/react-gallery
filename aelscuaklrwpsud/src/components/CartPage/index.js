import React, {Fragment, useState} from 'react';
import OrderCarousel from "../OrderCarousel";
import ErrorMessage from "../ErrorMessage";

export default function CartPage() {

    const [cart] = useState({
        paintID: JSON.parse(sessionStorage.getItem('cart'))
    });

    if (cart.paintID.length > 0) {
        return (
            <Fragment>
            <div className="hidden lg:block
            -rotate-90 fixed bottom-1/2 -left-24 text-4xl font-display tracking-widest text-stone-400 bg-stone-50">
                YOUR CART
            </div>
            <div className="animate-fade-up animate-delay-300 animate-duration-1000 animate-once mt-8 m-1">

                <div className="flex flex-col gap-1 items-center z-20">
                    <OrderCarousel cartPage={true} />
                </div>
            </div>
            </Fragment>
        );
    } else {
        return (
            <div className="flex justify-center items-center mt-16">
                <ErrorMessage message={"There is nothing in your cart to review!"}/>
            </div>
        );
    }
}