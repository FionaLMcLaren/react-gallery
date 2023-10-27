import React, {Fragment, useState} from 'react';
import axios from "axios";
import InputLabel from "../InputLabel";
import Overlay from "../Overlay";
import FormError from "../FormError";
import ErrorMessage from "../ErrorMessage";
import {checkName, checkPresent, checkPhoneNumber, checkTitle, checkPostCode} from "../../functions/validation.js";
import SuccessMessage from "../SuccessMessage";
import LoadingText from "../LoadingText";
export default function OrderForm() {
    const [order, setOrder] = useState({
        fname: '',
        lname: '',
        email: '',
        phoneNo: '',
        street: '',
        city: '',
        postcode: '',
        paintID: JSON.parse(sessionStorage.getItem('cart')),
    });

    function handleChange(event) {
        setOrder({
            ...order,
            [event.target.name]: event.target.value
        });
    }
    async function handleSubmit(event) {
        event.preventDefault();

        //error checking
        let errorMsg = "";
        errorMsg += checkName(order.fname, "Forename");
        errorMsg += checkName(order.lname, "Surname");
        errorMsg += checkPresent(order.email, "E-mail");
        errorMsg += checkPhoneNumber(order.phoneNo, "Phone number");
        errorMsg += checkPresent(order.street, "Street address");
        errorMsg += checkTitle(order.city, "City/Town")
        errorMsg += checkPostCode(order.postcode, "Postal code")

        if (errorMsg.length > 0) {
            document.getElementById("formErrorsContainer").classList.remove("hidden");
            document.getElementById("formErrors").innerHTML = errorMsg;
        }
        else {
            document.getElementById("requestLoading").classList.remove("hidden");
                axios({
                    method: "post",
                    url: "https://devweb2023.cis.strath.ac.uk/~xqb21129/aelscuaklrwpsud/server/add-order.php",
                    headers: {"content-type": "application/json"},
                    data: {order}
                }).then(function() {
                    document.getElementById("requestLoading").classList.add("hidden");
                    document.getElementById("requestSuccess").classList.remove("hidden");

                    //add the ordered paintings to the sold out array and remove from basket
                    const paintingIndexes = [];
                    order.paintID.map(p => {paintingIndexes.push(p)});
                    sessionStorage.setItem('soldOut', JSON.stringify(paintingIndexes));
                    sessionStorage.setItem('cart', JSON.stringify([]));
                }).catch(function() {
                    document.getElementById("requestLoading").classList.add("hidden");
                    document.getElementById("requestError").classList.remove("hidden");
                });
        }
    }

    return (
        <Fragment>
            <div id="requestError" className="hidden">
                <Overlay content ={
                    <ErrorMessage message={"Couldn't process your order to the database"}/>
                }/>
            </div>

            <div id="requestSuccess" className="hidden">
                <Overlay content ={
                    <SuccessMessage message="Your order has been submitted" />
                }/>
            </div>

            <div id="requestLoading" className="hidden">
                <Overlay content ={
                    <LoadingText loadMsg="PROCESSING YOUR ORDER..." />
                }/>
            </div>

            <div className="flex position-relative order-form
            lg:mr-24
            bg-stone-100
            -translate-y-8 lg:translate-y-0">
                <form onSubmit={handleSubmit} className="flex-col">
                    <div className="hidden" id="formErrorsContainer">
                        <FormError />
                    </div>
                    <div className="scale-90 gap-2">
                        <label>
                            <InputLabel label="Full name"/>
                            <span className="input-field">
                                            <input
                                                type="text"
                                                name="fname"
                                                value={order.fname}
                                                onChange={handleChange}
                                                className="block mx-12 my-1 w-full
                                                border-0 outline-none focus:ring-0
                                                font-body text-l lg:text-xl
                                                bg-transparent
                                                -translate-y-5 translate-x-1
                                                "
                                                placeholder="FORENAME(S)"
                                            />
                                        </span>
                            <span className="input-field">
                                            <input
                                                type="text"
                                                name="lname"
                                                value={order.lname}
                                                onChange={handleChange}
                                                className="block mx-12 w-full
                                                border-0 outline-none focus:ring-0
                                                font-body text-l lg:text-xl
                                                bg-transparent
                                                -translate-y-5 translate-x-1
                                                "
                                                placeholder="SURNAME"
                                            />
                                        </span>
                        </label>
                        <label>
                            <InputLabel label="E-mail"/>
                            <span className="input-field">
                                            <input
                                                type="email"
                                                name="email"
                                                value={order.email}
                                                onChange={handleChange}
                                                className="block mx-12 w-full
                                                border-0 outline-none focus:ring-0
                                                font-body text-l lg:text-xl
                                                bg-transparent
                                                -translate-y-5 translate-x-1
                                                "
                                                placeholder="E-MAIL"
                                            />
                                        </span>
                        </label>
                        <label>
                            <InputLabel label="Phone Number"/>
                            <span className="input-field">
                                            <input
                                                type="text"
                                                name="phoneNo"
                                                value={order.phoneNo}
                                                onChange={handleChange}
                                                className="block mx-12 w-full
                                                    border-0 outline-none focus:ring-0
                                                    font-body text-l lg:text-xl
                                                    bg-transparent
                                                    -translate-y-5 translate-x-1
                                                    "
                                                placeholder="TELEPHONE NUMBER"
                                            />
                                        </span>
                        </label>
                        <label>
                            <InputLabel label="Address"/>
                            <span className="input-field">
                                            <input
                                                type="text"
                                                name="street"
                                                value={order.street}
                                                onChange={handleChange}
                                                className="block mx-12 my-1 w-full
                                                    border-0 outline-none focus:ring-0
                                                    font-body text-l lg:text-xl
                                                    bg-transparent
                                                    -translate-y-5 translate-x-1
                                                    "
                                                placeholder="STREET ADDRESS"
                                            />
                                        </span>
                            <span className="input-field">
                                            <input
                                                type="text"
                                                name="city"
                                                value={order.city}
                                                onChange={handleChange}
                                                className="block mx-12 my-1 w-full
                                                    border-0 outline-none focus:ring-0
                                                    font-body text-l lg:text-xl
                                                    bg-transparent
                                                    -translate-y-5 translate-x-1
                                                    "
                                                placeholder="CITY/TOWN"
                                            />
                                        </span>
                            <span className="input-field">
                                            <input
                                                type="text"
                                                name="postcode"
                                                value={order.postcode}
                                                onChange={handleChange}
                                                className="block mx-12 w-full
                                                    border-0 outline-none focus:ring-0
                                                    font-body text-l lg:text-xl
                                                    bg-transparent
                                                    -translate-y-5 translate-x-1
                                                    "
                                                placeholder="POSTAL CODE"
                                            />
                                        </span>
                        </label>
                    </div>
                    <span>
                                    <button
                                        type="submit"
                                        className="font-display tracking-wide
                                        form-btn bg-stone-200
                                        translate-x-24
                                        lg:translate-x-80 lg:-translate-y-10
                                        scale-150
                                        p-1">submit</button>
                                </span>
                </form>
            </div>
        </Fragment>
        );
}