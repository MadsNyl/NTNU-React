import React from "react";
import axios from "../api/axios";
import useAuth from "./UseAuth";

export default function useLogout() {
    const [auth, setAuth] = useAuth();

    const logout = async () => {
        setAuth({});
        try {
            const res = await axios("logout", {
                withCredentials: true
            });
        } catch (error) {
            console.log(error);
        }
    }

    return logout;
}