import React, {useState} from 'react';
import OrderCarousel from "../OrderCarousel";
import OrderForm from "../OrderForm";
import ErrorMessage from "../ErrorMessage";
export default function OrderPage() {

    const [orderItems] = useState({
        paintID: JSON.parse(sessionStorage.getItem('cart'))
    });

    if (orderItems.paintID.length > 0) {
        return (
            <div className="animate-fade-up animate-delay-300 animate-duration-1000 animate-once">
                <div className="flex flex-col-reverse lg:flex-row justify-center items-center z-20 gap-1 lg:gap-16 mt-12 lg:mt-0">
                    <div className="hidden lg:block
                    -rotate-90 fixed top-1/2 -left-24 text-4xl font-display tracking-widest text-stone-400 bg-stone-50">
                        YOUR ORDER
                    </div>
                    <OrderForm />
                    <OrderCarousel />
                </div>
            </div>
        );
    } else {
        return (
            <div className="flex justify-center items-center mt-16">
                <ErrorMessage message={"There is nothing in your cart to checkout!"}/>
            </div>
        );
    }
}