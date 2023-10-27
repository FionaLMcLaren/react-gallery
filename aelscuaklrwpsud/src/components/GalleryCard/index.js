import React from 'react';
import CartButton from "../CartButton";

export default function GalleryCard ({ paintID, paintName, paintComplete, paintWidth, paintHeight, paintPrice, paintDesc, paintImg }) {
    return (
        <li key={paintID}
            className="font-body container-fluid flex flex-col place-content-center
             w-70 h-100 mx-auto my-2 px-3 py-7 space-y-5
            gal-border border-x-2 border-stone-400
            bg-stone-50
            opacity-75 hover:opacity-100 scale-75 hover:scale-90 transition-all duration-500">
            <h1 className="font-display text-2xl text-center leading-7 tracking-wider">{paintName}</h1>
            <div className="flex flex-row relative place-content-center p-1">
                <p className="font-display tracking-wide bg-stone-200 px-1
                absolute top-0 left-0">{paintComplete}</p>
                <img
                    src={`data:image/jpeg;base64,${paintImg}`}
                    className="object-scale-down h-96 grow m-2"
                    alt={paintDesc}
                />
                <span></span>
                <p className="font-display tracking-wide bg-stone-200 px-1 text-right
                absolute bottom-0 right-0 ">{paintHeight} mm x {paintWidth} mm </p>
            </div>
            <p>{paintDesc}</p>
            <div className="flex flex-row relative place-content-center py-1 space-x-5 w-100">
                <p>£{paintPrice}</p>
                <CartButton paintID={paintID}/>
            </div>
        </li>
    );
}
