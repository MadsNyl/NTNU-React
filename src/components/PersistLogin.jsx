import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import useAuth from "../hooks/UseAuth";
import useRefreshToken from "../hooks/UseRefreshToken";
import Spinner from "./Spinner";

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
                        ?     
                        <div className="w-full h-screen flex justify-center items-center">
                            <Spinner size={12} />
                        </div>
                        : <Outlet />
            }
        </>
    );
} 