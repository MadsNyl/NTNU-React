import React, { useEffect, useState } from "react";
import useAxiosPrivate from "../hooks/UseAxiosPrivate";
import { useNavigate, useLocation } from "react-router-dom";
import Spinner from "../components/Spinner";
import User from "./User";

export default function Users() {

    const [users, setUsers] = useState(null);
    const [isLoading, setLoading] = useState(false);
    const axiosPrivate = useAxiosPrivate();
    const navigate = useNavigate();
    const location = useLocation();


    useEffect(() => {
        let isMounted = true;
        const controller = new AbortController();

        const getAllUsers = async () => {
            setLoading(true);
            try {
                const res = await axiosPrivate.get("admin/users", {
                    singal: controller.singal
                });
                console.log(res.data)
                isMounted && setUsers(res.data);
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
            }
        }

        getAllUsers();

        return () => {
            isMounted = false;
            controller.abort();
        }
    }, []);

    return(
        <div>
            {   
                !isLoading
                    ?
                    (users 
                        ? (<div className="bg-white px-12 py-8 max-w-4xl mx-auto w-full rounded-md shadow-md">
                            <div className="pb-10">
                                <h1 className="text-lg font-semibold">
                                    Antall brukere: {users.length}
                                </h1>
                            </div>

                            <ul className="space-y-6">
                                {users?.map((item, index) => {
                                    return <User key={index} item={item} index={index} users={users} />
                                })}                
                            </ul>
                        </div>)
                        : 
                            (<div>
                                <h1 className="text-center text-2xl font-semibold text-gray-900">
                                    Det finnes ingen brukere enda.
                                </h1>
                            </div>)
                    )
                    : 
                    <div className="w-full flex justify-center mt-20">
                        <Spinner size={10} />
                    </div>
            }
        </div>
    );
}