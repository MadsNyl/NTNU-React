import React from "react";
import axios from "../api/axios";
import useAuth from "./UseAuth";

export default function useRefreshToken() {
    const [auth, setAuth] = useAuth();

    const refresh = async () => {
        const res = await axios.get("/refresh", {
            withCredentials: true
        });

        setAuth({
            username: res.data.username, 
            role: res.data.role,
            accessToken: res.data.accessToken,
            id: res.data.id 
        });

        return res.data.accessToken;
    }

    return refresh;
}