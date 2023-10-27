import React from "react";
import ErrorMessage from "../components/ErrorMessage";
export default function Error() {
    return (
        <div className="fixed top-0 block z-40 h-full w-full
        flex items-center justify-center
        bg-stone-100">
            <ErrorMessage message="Requested page not found"/>
        </div>
    );
}