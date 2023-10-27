import React, {Fragment} from 'react';
import AdminHeader from "../components/AdminHeader";
import ErrorMessage from "../components/ErrorMessage";
import AdminOrderTable from "../components/AdminOrderTable";
export default function AdminOrder() {

    const verified = sessionStorage.getItem('admin');
    if (verified === "true") {
        return (
            <Fragment>
                <AdminHeader isVerified={verified} />
                <div className="animate-fade-up animate-delay-300 animate-duration-1000 animate-once">
                    <div className="flex justify-center z-20 gap-16">
                        <AdminOrderTable />
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
