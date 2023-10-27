import React, {Fragment, useState} from "react";
import AdminHeader from "../components/AdminHeader";
import InputLabel from "../components/InputLabel";
import {Icon} from "@iconify/react";
import {Link} from "react-router-dom";
import axios from "axios";
import FormError from "../components/FormError";
export default function Admin() {
    const [verification, setVerification] = useState(  {
            verified: false,
            adminPass: ''
        }
    )
    const verifiedAdmin = sessionStorage.getItem('admin') === "true";

    async function checkPassword(event) {
        event.preventDefault()
        const response = await axios({
            method: "post",
            url: "https://devweb2023.cis.strath.ac.uk/~xqb21129/aelscuaklrwpsud/server/verify-admin-pass.php",
            headers: {"content-type": "application/json"},
            data: {verification}
        })
        const passwordValid = await response.data;

        if (passwordValid) {
                setVerification({
                    ...verification,
                    verified: true
                });
                sessionStorage.setItem('admin', "true");
                document.getElementById("formErrorsContainer").classList.add("hidden");
        } else {
            document.getElementById("formErrorsContainer").classList.remove("hidden");
        }

    }
    function handleChange(event) {
        setVerification({
            ...verification,
            adminPass: event.target.value
        });
    }

    function togglePass() {
        let hideIcon = document.getElementById("hidePassIcon");
        let showIcon = document.getElementById("showPassIcon");
        let passField = document.getElementById("adminPass");
        if (passField.type === "password") {
            showIcon.classList.add("hidden");
            hideIcon.classList.remove("hidden");
            passField.type = "text";
        } else {
            showIcon.classList.remove("hidden");
            hideIcon.classList.add("hidden");
            passField.type = "password";
        }

    }
    function logOutAdmin() {
        setVerification({
            ...verification,
            verified: false
        });
        sessionStorage.setItem('admin', "false");
    }

    function AdminPortal() {
        return (
            <div className="flex flex-col gap-3 items-center
                animate-fade-up animate-delay-400 animate-duration-1000 animate-once">
                <span className="font-display font-bold tracking-wider text-3xl mt-10">Time to Touch up</span>
                <span>Welcome back! Choose an action from above. </span>
                <Link to="/"
                      className="font-display tracking-wide
                          form-btn bg-stone-200
                          p-1"
                      onClick={logOutAdmin}
                >Log out and return to Gallery</Link>
            </div>
        );
    }

        return (
            <Fragment>
                <AdminHeader isVerified= {verification.verified || verifiedAdmin} />
                <div className="animate-fade-up animate-delay-300 animate-duration-1000 animate-once">

                    <div className="flex flex-col justify-center items-center z-20">
                        <div className="hidden" id="formErrorsContainer">
                            <FormError msg="Password is incorrect! Try again"/>
                        </div>
                        <div className="mt-10">
                            {(verification.verified || verifiedAdmin) ? <AdminPortal />
                                :
                                (
                                    <div>
                                        <form onSubmit={checkPassword}>
                                            <div>
                                                <label>
                                                    <InputLabel label={"Password"}/>
                                                    <div className="flex">
                                                        <span className="input-field">
                                                            <input
                                                                type="password"
                                                                name="adminPass"
                                                                id="adminPass"
                                                                value={verification.adminPass}
                                                                className="block mx-12 my-1 w-full
                                                                border-0 outline-none focus:ring-0
                                                                font-body text-xl
                                                                bg-transparent
                                                                -translate-y-5 translate-x-1
                                                                "
                                                                onChange={handleChange}
                                                            />
                                                        </span>
                                                        <span className="block" />

                                                        <span className="flex
                                                        opacity-75 hover:opacity-100 scale-100 hover:scale-125 transition-all duration-500"
                                                              onClick={togglePass}>
                                                            <Icon icon="teenyicons:eye-solid" id="showPassIcon" className="text-stone-600"/>
                                                            <Icon icon="teenyicons:eye-closed-solid" id="hidePassIcon" className="text-stone-600 hidden"/>
                                                        </span>
                                                    </div>
                                                </label>
                                            </div>
                                            <button
                                                type="submit"
                                                className="font-display tracking-wide
                                            form-btn bg-stone-200
                                            scale-150
                                            p-1 my-5 mx-52">submit</button>
                                        </form>
                                    </div>
                                )
                            }
                        </div>
                    </div>
                </div>
            </Fragment>
        )
}