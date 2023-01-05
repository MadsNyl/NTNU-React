import React from "react";
import { NavLink } from "react-router-dom";
import user from "../assets/user.png";


export default function User({ item, index, users }) {

    const ROLES = {
        1984: "Redaktør"
    }
    
    return (
        <div
            className={"flex justify-between items-center " + (index < users.length - 1 ? "border-b border-b-gray-300 pb-8" : "") } 
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
                className="px-4 py-2 rounded-md bg-sky-800 text-white font-semibold transition duration-150 ease-in-out hover:bg-sky-300 hover:text-sky-800"
            >
                Se mer
            </NavLink>
        </div>
    );
}