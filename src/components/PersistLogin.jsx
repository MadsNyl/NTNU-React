import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import useAuth from "../hooks/UseAuth";
import useRefreshToken from "../hooks/UseRefreshToken";

export default function PersistLogin() {
    const [isLoading, setLoading] = useState(true);
    const refresh = useRefreshToken();
    const [auth, setAuth, persist, setPersist] = useAuth();

    useEffect(() => {
        let isMounted = true;

        const verifyRefreshToken = async () => {
            try {
                await refresh();
            } catch (error) {
                console.log(error);
            } finally {
                isMounted && setLoading(false);
            }
        }

        !auth?.accessToken ? verifyRefreshToken() : setLoading(false);

        return () => isMounted = false;
    }, []);

    return (
        <>
            {
                !persist
                    ? <Outlet />
                    : isLoading
                        ? <div>Loading...</div>
                        : <Outlet />
            }
        </>
    );
} 