import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useAuth from "../hooks/UseAuth";
import useAxiosPrivate from "../hooks/UseAxiosPrivate";
import { Animated } from "../pages/Animated";


export default function Site() {

    const { title } = useParams();
    const navigator = useNavigate();
    const axiosPrivate = useAxiosPrivate();
    
    const [auth] = useAuth();
    const [site, setSite] = useState();

    useEffect(() => {
        let isMounted = true;
        const controller = new AbortController();
        const getSite = async () => {
            try {
                const res = await axiosPrivate.get(
                    `site?title=${title}&user=${auth.id}`, 
                    {
                        singal: controller.singal
                    }
                );
                console.log(res.data)
                isMounted && setSite(res.data);
            } catch (error) {
                console.log(error);
            }
        }

        getSite();

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