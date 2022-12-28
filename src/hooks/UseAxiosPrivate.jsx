import React from "react";
import { axiosPrivate } from "../api/axios";
import { useEffect } from "react";
import useRefreshToken from "./UseRefreshToken";
import useAuth from "./UseAuth";

export default function useAxiosPrivate() {
    const refresh = useRefreshToken();
    const [auth] = useAuth();

    useEffect(() => {

        const requestIntercept = axiosPrivate.interceptors.request.use(
            config => {
                if (!config.headers["authorization"]) {
                    config.headers["authorization"] = `Bearer ${auth?.accessToken}`;
                }
                return config;
            }, 
            (error) => Promise.reject(error)
        );

        const responseIntercept = axiosPrivate.interceptors.response.use(
            response => response,
            async (error) => {
                const prevRequest = error?.config;
                if (error?.response?.status === 403 && !prevRequest.sent) {
                    prevRequest.sent = true;
                    const newAccessToken = await refresh();
                    prevRequest.headers["authorization"] = `Bearer ${newAccessToken}`;
                    return axiosPrivate(prevRequest);
                }
                return Promise.reject(error);
            }
        ); 

        return(() => {
            axiosPrivate.interceptors.response.eject(responseIntercept);
            axiosPrivate.interceptors.request.eject(requestIntercept);
        });
    }, [auth, refresh]);

    return axiosPrivate;
}