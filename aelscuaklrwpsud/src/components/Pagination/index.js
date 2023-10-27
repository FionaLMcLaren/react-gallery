import {Icon} from "@iconify/react";
import React from "react";

export default function Pagination( {noPages, currentPage, setCurrentPage} ) {
    function nextPage() {
        if (currentPage !== noPages) {
            setCurrentPage(currentPage + 1);
        }
    }
    function backPage() {
        if (currentPage !== 1) {
            setCurrentPage(currentPage - 1);
        }
    }

    return (
        <div className="flex bg-stone-50 py-3 px-5 gap-3 place-items-center">

            <button className="font-display tracking-wide text-right
                page-back
                px-1
                hover:tracking-widest transition-all duration-500"
                onClick={backPage}
            >
                Back <Icon icon="guidance:right-arrow" />
            </button>

            <span className="font-display text-2xl tracking-wider">
                {currentPage} / {noPages}
            </span>

            <button className="font-display tracking-wide text-right
                page-next
                px-1
                hover:tracking-widest transition-all duration-500"
                onClick={nextPage}
            >
                Next <Icon icon="guidance:left-arrow" />
            </button>
        </div>
    )
}