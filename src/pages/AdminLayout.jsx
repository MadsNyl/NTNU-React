import React, { useEffect, useState } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import useLogout from "../hooks/UseLogout";
import home from "../assets/home.png";
import user from "../assets/user.png";
import admin from "../assets/admin.png";
import logoutImg from "../assets/logout.png";
import union from "../assets/union.png";
import useAuth from "../hooks/UseAuth";


export default function AdminLayout() {

    const [auth, setAuth] = useAuth();

    const logout = useLogout();
    const navigate = useNavigate();

    const signOut = async () => {
        await logout();
        navigate("/");
    }

    const navigation = [
        { name: "hjem", href: "/", logo: home, secure: false },
        { name: "profil", href: "/dashboard/profil", logo: user, secure: false },
        { name: "admin", href: "/dashboard/admin", logo: admin, secure: true },
        { name: "foreninger", href: "/dashboard/foreninger", logo: union, secure: true }
    ];

    return(
        <div className="max-w-8xl w-full mx-auto bg-gray-100 overflow-x-hidden">
            <div className="flex relative">
                <nav className="px-8 fixed h-screen rounded-r-lg shadow-md bg-white">
                    <div className="pt-20 pb-32 space-y-6">
                        {navigation.map((item, index) => {
                            return <NavLink
                                        className={"items-center space-x-2 px-4 py-2 transition border duration-150 ease-in-out hover:border-sky-600 bg-gray-100 border-gray-200 rounded-md " + (!item.secure || auth?.role === 5150 ? "flex" : "hidden")}
                                        key={index}
                                        to={item.href}
                                    >
                                        <img 
                                            src={item.logo} 
                                            alt="logo" 
                                            className="w-6 h-6"
                                        />
                                        <p className="capitalize">
                                            {item.name}
                                        </p>
                                    </NavLink>
                        })}
                    </div> 

                    <button
                        onClick={signOut}
                        className="absolute bottom-8 flex items-center space-x-2 px-4 py-2 bg-gray-100 border border-gray-200 rounded-md transition duration-150 ease-in-out hover:border-red-600"
                    >
                        <img 
                            src={logoutImg} 
                            alt="logg ut" 
                            className="w-6 h-6"
                        />
                        <p>
                            Logg ut
                        </p>
                    </button>
                </nav>

                <div className="w-full ml-52 px-12 min-h-screen">
                    <Outlet />
                </div>
            </div>
        </div>
    );
}