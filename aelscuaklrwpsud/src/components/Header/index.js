import {Link} from "react-router-dom";
import {ReactComponent as Splash} from "../../img/splash.svg"
export default function Header() {
    function SplashTitle() {
        return (
        <div>
            <span className="z-20 relative ">
                <Link to="/"
                      className="font-display text-stone-200 text-2xl lg:text-4xl tracking-wider font-bold">
                    Cara's Gallery</Link>
            </span>
            <Splash className="absolute -top-40 -left-16 lg:left-2
            h-96 w-96
            -rotate-180
            scale-x-90 scale-y-50 lg:scale-x-150
            z-10"/>
        </div>
        )
    }

    return (
        <div className="flex flex-row bg-stone-100 py-3 px-5">
            <SplashTitle/>
            <div className="flex flex-row gap-4 ml-44 lg:ml-auto my-auto">
                <Link to="/cart" className="uppercase font-display tracking-wide
                          form-btn
                          p-2">Review Cart</Link>
                <Link to="/order" className="uppercase font-display tracking-wide
                          form-btn
                          p-2">Make Order</Link>
            </div>
        </div>
    )
}