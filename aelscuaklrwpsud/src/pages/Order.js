import React, { Fragment} from 'react';
import OrderPage from "../components/OrderPage";
import Header from "../components/Header";

export default function Order() {

    return (
        <Fragment>
            <Header />
            <OrderPage />
        </Fragment>
    );
}
