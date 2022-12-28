import React, { useEffect, useState } from "react";
import useAxiosPrivate from "../hooks/UseAxiosPrivate";
import { useNavigate, useLocation, NavLink } from "react-router-dom";
import union from "../assets/union.png";

export default function UnionList() {

    const [unions, setUnions] = useState();
    const axiosPrivate = useAxiosPrivate();
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        let isMounted = true;
        const controller = new AbortController();

        const getAllUnions = async () => {
            try {
                const res = await axiosPrivate.get("site/all", {
                    singal: controller.singal
                });
                console.log(res.data);
                isMounted && setUnions(res.data);
            } catch (error) {
                console.log(error);
                navigate("/login", { state: { from: location }, replace: true });
            }
        }

        getAllUnions();

        return () => {
            isMounted = false;
            controller.abort();
        }
    }, []);

    return(
        <div>
            { unions?.length 
                ? <div>
                    <div className="pb-10">
                        <h1 className="text-lg font-semibold">
                            Antall foreninger: {unions.length}
                        </h1>
                    </div>

                    <ul className="space-y-6">
                        {unions?.map((item, index) => {
                            return <div
                                        className={"flex justify-between items-center " + (index < unions.length - 1 ? "border-b border-b-gray-300 pb-8" : "") } 
                                        key={index}
                                    >
                                        <div className="flex items-center space-x-10">
                                            <img 
                                                className="w-10 h-10"
                                                src={item.logo ? "" : union}
                                                alt="Forening logo" 
                                            />
                                            <h1 className="text-lg font-semibold">
                                                {item.title}
                                            </h1>
                                        </div>

                                        <NavLink 
                                            to={`/dashboard/foreninger/${item.title}`}
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
                        Det finnes ingen sider enda.
                    </h1>
                </div>   
            }
        </div>
    );
}