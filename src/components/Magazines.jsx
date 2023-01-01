import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import useAxiosPrivate from "../hooks/UseAxiosPrivate";


export default function Magazines(props) {

    const [isLoading, setLoading] = useState();
    const axiosPrivate = useAxiosPrivate();

    const convertDate = (date) => {
        if (!date) return "Ikke redigert";
        return new Date(date).toLocaleDateString("no-NO");
    }

    const deleteMag = async (item, index) => {
        setLoading(true);

        try {
            const res = await axiosPrivate.delete(
                "magazine/delete",
                {
                    data: JSON.stringify({
                        id: item.id,
                        img: item.logo,
                        pdf: item.pdf
                    })
                },
                {
                    headers: {
                        headers: { "Content-Type": "application/json" },
                        withCredentials: true
                    }
                }
            );

            props.setSuccess(true);
            const newList = props.magazines;
            newList.splice(index, 1);
            props.setMagazines(newList);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    } 

    return(
        <div className="w-full space-y-1">
            {props.magazines.map((item, index) => {
                return <div
                    className="w-full flex justify-between items-center px-4 py-2 bg-gray-50 border border-gray-100 rounded-md"
                    key={index}
                >
                    <div className="flex items-center space-x-12">
                        <img
                            className="w-12 h-12 border border-sky-600 rounded-full"
                            src={item.logo} 
                            alt="Forsidebilde" 
                        />
                        <div>
                            <p className="text-gray-500">
                                Tittel:
                            </p>
                            <p className="text-sm font-semibold">
                                {item.title}
                            </p>
                        </div>

                        <div>
                            <p className="text-gray-500">
                                Publisert:
                            </p>
                            <p className="text-sm font-semibold">
                                {convertDate(item.publish_date)}
                            </p>
                        </div>

                        <div>
                            <p className="text-gray-500">
                                Sist Redigert:
                            </p>
                            <p className="text-sm font-semibold">
                                {convertDate(item.updated_date)}
                            </p>
                        </div>
                    </div>

                    <div className="flex items-center space-x-4">
                        <NavLink 
                            to={"/dashboard/avis"}
                            state={{
                                id: item.id
                            }}
                            className="w-20 py-2 text-center rounded-md bg-sky-300 text-sky-800 transition duration-150 ease-in-out hover:bg-sky-800 hover:text-white"
                        >
                            Rediger
                        </NavLink>

                        <button 
                            onClick={() => deleteMag(item, index)}
                            className="w-20 py-2 rounded-md bg-red-300 text-red-800 transition duration-150 ease-in-out hover:bg-red-800 hover:text-white"
                        >
                            Slett
                        </button>
                    </div>
                </div>
            })}
        </div>
    );
}