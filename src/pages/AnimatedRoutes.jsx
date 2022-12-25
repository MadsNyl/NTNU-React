import React from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import { AnimatePresence } from 'framer-motion';
import { Home } from "./Home";
import { Login } from "./Login";


export function AnimatedRoutes() {
    const location = useLocation();

    return(
        <AnimatePresence mode="wait" initial={false}>
            <Routes location={location} key={location.pathname}>
                <Route path='/' element={<Home />} />
                <Route path='/login' element={<Login />} />
            </Routes>
        </AnimatePresence>
    );
}