import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import useAuth from "../hooks/UseAuth";

export default function RequireAuth({ allowedRoles }) {
    const [auth, setAuth] = useAuth();
    const location = useLocation();
    return(
        allowedRoles?.includes(auth?.role)
            ? <Outlet />
            : auth?.user
                ? <Navigate to={"/dashboard"} state={{ from: location }} replace />
                : <Navigate to={"/login"} state={{ from: location }} replace />
    );
}