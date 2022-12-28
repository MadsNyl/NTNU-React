import React from "react";
import axios from "../api/axios";
import useAuth from "./UseAuth";

export default function useRefreshToken() {
    const [auth, setAuth] = useAuth();

    const refresh = async () => {
        const res = await axios.get("/refresh", {
            withCredentials: true
        });

        setAuth(prev => {
            return { 
                ...prev, 
                role: res.data.role,
                accessToken: res.data.accessToken 
            }
        });

        return res.data.accessToken;
    }

    return refresh;
}