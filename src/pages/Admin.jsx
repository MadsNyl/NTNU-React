import React from "react";
import { NavLink } from "react-router-dom";
import Users from "../components/Users";
import { Animated } from "./Animated";

export default function Admin() {
    return (
        <Animated>
            <div className="mt-12 pb-20">
                <div className="flex items-center justify-between">
                    <h1 className="text-5xl font-semibold text-sky-800">
                        Admin
                    </h1>

                    <NavLink
                        to={"/dashboard/brukere/ny"}
                        className="flex items-center space-x-3 px-4 py-3 rounded-md bg-emerald-200 text-emerald-800 transition duration-150 ease-in-out hover:bg-emerald-800 hover:text-white "
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M19 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zM4 19.235v-.11a6.375 6.375 0 0112.75 0v.109A12.318 12.318 0 0110.374 21c-2.331 0-4.512-.645-6.374-1.766z" />
                        </svg>
                        <p>
                            Ny bruker
                        </p>
                    </NavLink>
                </div>
            </div>

            <div className="pb-12">
                <Users />
            </div>
        </Animated>
    );
}