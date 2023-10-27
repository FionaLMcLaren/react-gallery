import React, {Fragment} from 'react';
import AdminCreateForm from "../components/AdminCreateForm";
import AdminHeader from "../components/AdminHeader";
import ErrorMessage from "../components/ErrorMessage";
export default function AdminCreate() {

    const verified = sessionStorage.getItem('admin');
    if (verified === "true") {
        return (
            <Fragment>
                <AdminHeader isVerified={verified} />
                <div className="animate-fade-up animate-delay-300 animate-duration-1000 animate-once">
                    <div className="flex justify-center z-20 gap-16">
                        <div className="hidden lg:block
                        -rotate-90 fixed top-1/2 -left-24 text-4xl font-display tracking-widest text-stone-400 bg-stone-50">
                            NEW PAINTING
                        </div>
                        <AdminCreateForm />
                    </div>
                </div>
            </Fragment>
        );
    } else {
        return (
        <Fragment>
            <AdminHeader isVerified={false} />

            <div className="flex justify-center items-center mt-16">
                <ErrorMessage message={"Not verified as admin!"} isAdmin={true} />
            </div>
        </Fragment>
        )
    }

}
