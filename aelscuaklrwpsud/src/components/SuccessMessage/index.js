import React, {Fragment} from "react";
import {ReactComponent as SuccessSplash} from "../../img/successsplash.svg"
import {Link} from "react-router-dom";
export default function SuccessMessage({ message, isAdmin }) {
    return (
        <Fragment>
            <div className="flex items-center animate-jump-in">
                <SuccessSplash className="relative h-52 w-52 -rotate-180"/>
                <span className="absolute left-9
                    font-display font-bold tracking-wider text-2xl text-stone-50
                    rotate-12">Yay!</span>
            </div>
            <div className="flex flex-col gap-3 items-center
                animate-fade-up animate-delay-400 animate-duration-1000 animate-once">
                <span className="font-display font-bold tracking-wider text-3xl mt-10">SUCCESS!</span>
                <span>{message}</span>
                <Link to={isAdmin ? "/adminPortal" : "/"}
                      className="font-display tracking-wide
                          form-btn bg-stone-200
                          p-1"
                >{isAdmin ? ("Back to admin portal") : ("Back to gallery")}</Link>
            </div>
        </Fragment>
    );
}