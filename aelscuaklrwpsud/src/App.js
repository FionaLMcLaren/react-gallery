import {Routes, Route, HashRouter} from "react-router-dom";
import Gallery from "./pages/Gallery";
import Order from "./pages/Order";
import Cart from "./pages/Cart";
import Admin from "./pages/Admin";
import AdminOrder from "./pages/AdminOrder";
import AdminCreate from "./pages/AdminCreate";
import Error from "./pages/Error";

import PaintDecoration from "./components/PaintDecoration";
import React from "react";
export default function App() {
    sessionStorage.setItem('cart', JSON.stringify([]));
    sessionStorage.setItem('soldOut', JSON.stringify([]));

    return (
        <HashRouter>
            <Routes>
                <Route path="/" element={<Gallery/>}/>
                <Route path="/gallery" element={<Gallery/>}/>
                <Route path="/index" element={<Gallery/>}/>
                <Route path="/order" element={<Order/>}/>
                <Route path="/cart" element={<Cart/>}/>
                <Route path="/adminPortal" element={<Admin/>}/>
                <Route path="/adminOrder" element={<AdminOrder/>}/>
                <Route path="/adminCreate" element={<AdminCreate/>}/>
                <Route path="/*" element={<Error/>}/>
            </Routes>
            <PaintDecoration />
        </HashRouter>
    );
}