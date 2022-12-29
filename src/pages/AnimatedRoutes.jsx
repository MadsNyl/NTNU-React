import React from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import { AnimatePresence } from 'framer-motion';
import { Home } from "./Home";
import { Login } from "./Login";
import Layout from "./Layout";
import RequireAuth from "../components/RequireAuth";
import Dashboard from "./Dashboard";
import Admin from "./Admin";
import PersistLogin from "../components/PersistLogin";
import AdminLayout from "./AdminLayout";
import Unions from "./Unions";
import NewUser from "./NewUser";
import UserOption from "./UserOption";
import Site from "./Site";
import Magazines from "./Magazine";


export function AnimatedRoutes() {
    const location = useLocation();

    return(
        <AnimatePresence mode="wait" initial={false}>
            <Routes location={location} key={location.pathname}>
                <Route element={<Layout />}>
                    <Route path='/' element={<Home />} />
                    <Route path='login' element={<Login />} />
                </Route>
                <Route element={<AdminLayout />}>
                    <Route element={<PersistLogin />}>
                            <Route element={<RequireAuth allowedRoles={[5150, 1984]} />}>
                                <Route path="/dashboard" element={<Dashboard />} />
                            </Route>

                            <Route element={<RequireAuth allowedRoles={[5150, 1984]} />}>
                                <Route path="/dashboard/foreninger/:title" element={<Site />} />
                            </Route>

                            <Route element={<RequireAuth allowedRoles={[5150]} />}>
                                <Route path="/dashboard/admin" element={<Admin />} />
                            </Route>

                            <Route element={<RequireAuth allowedRoles={[5150]} />}>
                                <Route path="/dashboard/foreninger" element={<Unions />} />
                            </Route>

                            <Route element={<RequireAuth allowedRoles={[5150]} />}>
                                <Route path="/dashboard/brukere/ny" element={<NewUser />} />
                            </Route>

                            <Route element={<RequireAuth allowedRoles={[5150]} />}>
                                <Route path="/dashboard/brukere/:id" element={<UserOption />} />
                            </Route>

                            <Route element={<RequireAuth allowedRoles={[5150, 1984]} />}>
                                <Route path="/dashboard/avis" element={<Magazines />} />
                            </Route>
                    </Route>
                </Route>
            </Routes>
        </AnimatePresence>
    );
}