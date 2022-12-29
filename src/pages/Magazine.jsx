import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import useAuth from "../hooks/UseAuth";
import useAxiosPrivate from "../hooks/UseAxiosPrivate";
import { Animated } from "./Animated";


export default function Magazines() {

    const location = useLocation();
    const axiosPrivate = useAxiosPrivate();
    const [auth] = useAuth();
    const [magazine, setMagazine] = useState();

    useEffect(() => {
        let isMounted = true;
        const controller = new AbortController();
        const getMagazine = async () => {
            try {
                const res = await axiosPrivate.get(
                    `magazine/${location.state.id}`,
                    {
                        singal: controller.singal,
                    }
                );
                console.log(res.data)
                isMounted && setMagazine(res.data[0]);
            } catch (error) {
                console.log(error);
            }
        }

        getMagazine();

        return () => {
            isMounted = false;
            controller.abort();
        }
    }, []);
     

    return (
        <Animated>

        </Animated>
    );
}