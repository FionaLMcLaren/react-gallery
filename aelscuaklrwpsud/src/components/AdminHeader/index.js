import {Link} from "react-router-dom";
import {ReactComponent as Splash} from "../../img/splash.svg"
export default function AdminHeader({isVerified}) {
    function SplashTitle() {
        return (
        <div>
            <span className="z-20 relative ">
                <Link to= "/adminPortal"
                      className="font-display text-stone-200 text-2xl lg:text-4xl tracking-wider font-bold">
                Admin</Link>
            </span>
            <Splash className="absolute -top-40 -left-16 lg:left-2
            h-96 w-96
            -rotate-180
            scale-x-90 scale-y-50 lg:scale-x-150
            z-10"/>
        </div>
        )
    }

    if (isVerified) {
        return (
            <div className="flex flex-row bg-stone-100 py-3 px-5">
                <SplashTitle isVerified={true} />
                <div className="flex flex-row gap-4 ml-44 lg:ml-auto my-auto">
                    <Link to="/adminOrder" className="uppercase font-display tracking-wide
                          form-btn
                          p-2">Review Orders</Link>
                    <Link to="/adminCreate" className="uppercase font-display tracking-wide
                          form-btn
                          p-2">Add Painting</Link>
                </div>
            </div>
        );
    } else {
        return (
        <div className="flex flex-row bg-stone-100 py-3 px-5">
            <SplashTitle isVerified={false} />
        </div>
        )
    }
}