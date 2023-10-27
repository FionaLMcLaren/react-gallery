import React from "react";

export default function InputLabel({label}) {
    return (
        <span className="font-display leading-4 tracking-tighter text-xl
                        block w-0.5 my-7
                        input-label">
                            {label}
                </span>
    )
}