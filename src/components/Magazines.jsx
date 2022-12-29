import React from "react";
import { NavLink } from "react-router-dom";


export default function Magazines(props) {

    const convertDate = (date) => {
        if (!date) return "Ikke redigert";
        return new Date(date).toLocaleDateString("no-NO");
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

                        <button className="w-20 py-2 rounded-md bg-red-300 text-red-800">
                            Slett
                        </button>
                    </div>
                </div>
            })}
        </div>
    );
}