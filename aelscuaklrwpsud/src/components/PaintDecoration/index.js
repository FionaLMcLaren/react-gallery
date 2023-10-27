import React from "react";
import {ReactComponent as PaintDeco} from "../../img/stain.svg"
import {ReactComponent as PaintDecoTwo} from "../../img/stain2.svg"
import {ReactComponent as PaintDecoThree} from "../../img/stain3.svg"

export default function PaintDecoration() {
    return (
        <div>
            <PaintDeco className="fixed top-12 right-0 h-32 w-32 lg:h-52 lg:w-52 -rotate-180 -z-10"/>
            <PaintDecoTwo className="fixed -bottom-8 right-0 h-48 w-48 lg:h-80 lg:w-80 -rotate-90 -z-10"/>
            <PaintDecoThree className="fixed -bottom-12 left-0 h-52 w-52 lg:h-96 lg:w-96 -z-10"/>
        </div>
    )
}