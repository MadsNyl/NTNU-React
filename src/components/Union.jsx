import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import union from "../assets/union.png";

export default function Union({ item, index, unions, setShow, setSite }) {


    return (
        <div
            className={"flex justify-between items-center " + (index < unions.length - 1 ? "border-b border-b-gray-300 pb-8" : "") } 
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

            <div className="flex items-center space-x-3">
                <NavLink
                    to={`/dashboard/foreninger/${item.title}`}
                    className="px-4 py-2 rounded-md bg-sky-800 text-white font-semibold transition duration-150 ease-in-out hover:bg-sky-300 hover:text-sky-800"
                >
                    Se mer
                </NavLink>

                <button
                    onClick={() => {
                        setSite(item.title)
                        setShow(true);
                        document.body.style.overflow = "hidden";
                    }}
                    className="rounded-md px-4 py-2 bg-red-800 text-white transition duration-150 ease-in-out hover:bg-red-300 hover:text-red-800 font-semibold"
                >
                    Slett
                </button>
            </div>
        </div>
    );
}