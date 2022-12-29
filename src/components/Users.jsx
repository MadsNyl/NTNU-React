import React, { useEffect, useState } from "react";
import useAxiosPrivate from "../hooks/UseAxiosPrivate";
import { useNavigate, useLocation, NavLink } from "react-router-dom";
import user from "../assets/user.png";

export default function Users() {

    const [users, setUsers] = useState();
    const axiosPrivate = useAxiosPrivate();
    const navigate = useNavigate();
    const location = useLocation();

    const ROLES = {
        1984: "Redaktør"
    }

    useEffect(() => {
        let isMounted = true;
        const controller = new AbortController();

        const getAllUsers = async () => {
            try {
                const res = await axiosPrivate.get("admin/users", {
                    singal: controller.singal
                });
                console.log(res.data)
                isMounted && setUsers(res.data);
            } catch (error) {
                console.log(error);
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
            { users?.length 
                ? <div>
                    <div className="pb-10">
                        <h1 className="text-lg font-semibold">
                            Antall brukere: {users.length}
                        </h1>
                    </div>

                    <ul className="space-y-6">
                        {users?.map((item, index) => {
                            return <div
                                        className={"flex justify-between items-center " + (index < users.length - 1 ? "border-b border-b-gray-300 pb-8" : "") } 
                                        key={index}
                                    >
                                        <div className="flex items-center space-x-10">
                                            <img 
                                                className="w-10 h-10"
                                                src={user}
                                                alt="Forening logo" 
                                            />
                                            <div>
                                                <p className="text-xs text-gray-400">Brukernavn:</p>
                                                <h1 className="text-lg font-semibold">{item.username}</h1>
                                            </div>

                                            <div>
                                                <p className="text-xs text-gray-400">Rolle:</p>
                                                <h1 className="text-lg font-semibold">{item.role} {ROLES[item.role]}</h1>
                                            </div>
                                        </div>

                                        <NavLink 
                                            to={`/dashboard/brukere/${item.id}`}
                                            className="px-4 py-2 rounded-md bg-emerald-400 text-white font-semibold"
                                        >
                                            Se mer
                                        </NavLink>
                                    </div>
                        })}                
                    </ul>
                </div>
                : <div>
                    <h1 className="text-center text-2xl font-semibold text-gray-900">
                        Det finnes ingen brukere enda.
                    </h1>
                </div>   
            }
        </div>
    );
}