import React from 'react';
import {ReactComponent as ErrorSplash} from "../../img/errorsplash.svg";
export default function FormError({msg}) {
    return (
        <div className="flex flex-col
            mx-auto p-3 mt-8 scale-90
            bg-stone-50
            border-double border-4 border-rose-800
            ml-12 lg:ml-0">
            <div className="flex items-center">
                <div className="flex items-center animate-jump-in m-1">
                    <ErrorSplash className="relative h-32 w-32 -rotate-180"/>
                    <span className="absolute left-3
                        font-display font-bold tracking-wider text-xl text-stone-50
                        rotate-12">Oops!</span>
                </div>
                <div className="flex items-center
                    animate-fade-up animate-delay-400 animate-duration-1000 animate-once">
                    <span className="font-display font-bold tracking-wider text-2xl text-center">ERROR: Spilled Ink!</span>
                </div>
            </div>
            <ul className="text-l font-body" id="formErrors">
                {msg}
            </ul>
        </div>


    )
}