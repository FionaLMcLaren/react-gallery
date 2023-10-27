import React, {Fragment, useEffect, useState} from 'react';
import axios from "axios";
import ErrorMessage from "../ErrorMessage";
import LoadingText from "../LoadingText";
import Pagination from "../Pagination";
export default function AdminOrderTable() {
    const [orders, setOrders] = useState({
        orders: [],
        loaded: false,
        error: false
    });
    const [currentPage, setCurrentPage] = useState(1);
    const [ordersPerPage] = useState(12);

    useEffect(()  => {
        async function fetchOrders() {
            try {
                const response = await fetch(
                    "https://devweb2023.cis.strath.ac.uk/~xqb21129/aelscuaklrwpsud/server/get-all-orders.php"
                )
                const orderJSON = await response.json();

                setOrders({
                    ...orders,
                    orders: (orderJSON),
                    loaded: true
                });

            } catch (err) {
                setOrders({
                    ...orders,
                    error: err
                });
            }
        }
        fetchOrders()
    }, []);

    async function deleteOrder(orderID) {
        try {
            setOrders({
                ...orders,
                loaded: false
            });

            const response = await axios({
                method: "post",
                url: "https://devweb2023.cis.strath.ac.uk/~xqb21129/aelscuaklrwpsud/server/delete-order.php",
                data: {orderID}
            })

            const alteredOrdersJSON = response.data;

            setOrders({
                    ...orders,
                    orders: (alteredOrdersJSON),
                    loaded: true
            });




            alert("Order has been successfully deleted!");
        } catch (err) {
            setOrders({
                ...orders,
                error: true
            });
        }
    }

    const lastPaintingIndex = currentPage * ordersPerPage;
    const firstPaintingIndex = lastPaintingIndex - ordersPerPage;
    const noPages = Math.ceil(orders.orders.length / ordersPerPage);
    function OrderTable({orders}) {
        const currentOrders = orders.slice(firstPaintingIndex, lastPaintingIndex);
        const OrderRows = currentOrders.map(o =>
            <tr className="border-y border-stone-200 flex flex-col lg:table-row">
                <td className="p-6">
                    <span className="font-display tracking-wider font-bold lg:hidden">Order ID </span>
                    {o.orderID}
                </td>
                <td className="p-6">
                    <span className="font-display tracking-wider font-bold lg:hidden">Customer Full Name </span>
                    {o.name}
                </td>
                <td className="p-6">
                    <span className="font-display tracking-wider font-bold lg:hidden">Customer Phone Number </span>
                    {o.phoneNo}
                </td>
                <td className="p-6">
                    <span className="font-display tracking-wider font-bold lg:hidden">Customer E-mail </span>
                    {o.email}
                </td>
                <td className="p-6">
                    <span className="font-display tracking-wider font-bold lg:hidden">Customer Address </span>
                    {o.address}
                </td>
                <td className="p-6">
                    <span className="font-display tracking-wider font-bold lg:hidden">Painting ID </span>
                    {o.paintingID}
                </td>
                <td>
                    <button className="uppercase font-display tracking-wide
                          form-btn bg-stone-200
                          py-2 px-3 m-3"
                            onClick={() => deleteOrder(o.orderID)}>
                        delete
                    </button>
                </td>
            </tr>
        )

        return (
            <Fragment>
                <div className="fixed h-full w-full
                flex items-center justify-center
                bg-stone-100 -z-10 opacity-75
                " />
                <table className="table-auto border-spacing-x-8 mt-16">
                        <thead>
                        <tr className="hidden lg:table-row">
                            <th className="font-display tracking-wider">Order ID</th>
                            <th className="font-display tracking-wider">Customer Full Name</th>
                            <th className="font-display tracking-wider">Customer Phone Number</th>
                            <th  className="font-display tracking-wider">Customer E-mail </th>
                            <th  className="font-display tracking-wider">Customer Address</th>
                            <th  className="font-display tracking-wider">Painting ID</th>
                        </tr>
                        </thead>

                        <tbody>
                            {OrderRows}
                        </tbody>
                    </table>
            </Fragment>
        )
    }

    if (orders.error) {
        return (
        <div className="flex justify-center items-center mt-16">
            <ErrorMessage message={"Error fetching orders from the database"} isAdmin={true}/>
        </div>
        )
    }
    if (orders.loaded) {
        if (orders.orders.length > 0) {
            return (
                <div className="flex flex-col">
                    <OrderTable orders={orders.orders}/>
                    <Pagination
                        noPages={noPages}
                        currentPage={currentPage}
                        setCurrentPage={setCurrentPage}
                    />
                </div>
            )
        } else {
            return (
                <div className="flex justify-center items-center mt-16">
                    <ErrorMessage message={"No orders to review!"} isAdmin={true} />
                </div>
            )
        }
    } else {
        return (
            <div className="flex justify-center items-center mt-16">
                <LoadingText loadMsg="LOADING..." />
            </div>
        );
    }
}