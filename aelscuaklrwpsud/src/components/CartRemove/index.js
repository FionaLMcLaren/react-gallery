import React from "react";
const removeFromCart = ({event, paintID, cart, setCart}) => {
    event.preventDefault();
    setCart({
        ...cart,
        loaded: false
    });
    const removeIndex = cart.paintings.findIndex((p) => p.paintingID === paintID)
    if (removeIndex >= 0) {
        cart.paintings.splice(removeIndex, 1)
    }
    const paintingIndexes = [];
    cart.paintings.map(p => {paintingIndexes.push(p.paintingID)});
    sessionStorage.setItem('cart', JSON.stringify(paintingIndexes));
    setCart({
        ...cart,
        loaded: true
    });
}
export default function CartRemove({ paintID, cart, setCart }) {
    return (
        <button className="font-display tracking-wide
                form-btn bg-stone-200
                p-1 mt-5"
                onClick={
                    (event) => removeFromCart({event, paintID, cart, setCart})
                }>
            remove from cart
        </button>
    );
}