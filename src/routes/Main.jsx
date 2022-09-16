import React from "react";
import { ToastContainer } from "react-toastify";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home } from "../components/Home";
import { Detail } from "../components/Detail";
import { AddEdit } from "../containers/AddEdit";
import { Navbar } from "./Navbar";

export const Main = () => (
    <BrowserRouter>
        <React.Fragment>
            <Navbar />
            <ToastContainer position="top-center" />
            <Routes>
                <Route path="/" element={<Home />}  />
                <Route path="/create" element={<AddEdit />} />
                <Route path="/update/:id" element={<AddEdit />} />
                <Route path="/detail/:id" element={<Detail />} />
            </Routes>
        </React.Fragment>
    </BrowserRouter>
);


