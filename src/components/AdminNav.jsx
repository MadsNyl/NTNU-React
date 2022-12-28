import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import useLogout from "../hooks/UseLogout";


export default function AdminNav(props) {

    const logout = useLogout();
    const navigate = useNavigate();

    const signOut = async () => {
        await logout();
        navigate("/");
    }

    const navigation = [
        { name: "dashboard", href: "/" },
        { name: "admin", href: "/dashboard/admin" },
    ];

    return(
        <div className="max-w-7xl w-full mx-auto bg-gray-50">
            <div className="flex relative">
                <nav className="px-12 fixed h-screen">
                    <ul>
                        {navigation.map((item, index) => {
                            return <NavLink
                                        key={index}
                                        to={item.href}
                                    >
                                        { item.name }
                                    </NavLink>
                        })}
                    </ul> 

                    <button
                        onClick={signOut}
                    >
                        Logg ut
                    </button>
                </nav>

                <div className="rounded-l bg-white shadow-md ml-20 min-h-screen">
                    { props.children }
                </div>
            </div>
        </div>
    );
}