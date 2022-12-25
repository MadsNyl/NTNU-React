import React from "react";
import { NavLink } from "react-router-dom";


export function Nav(props) {

    const navigation = [
        { name: "hjem", href: "/" },
        { name: "logg inn", href: "/login" },
    ];

    return(
        <>
            <div className="font-sans bg-gray-100 min-h-screen text-gray-900 relative overflow-x-hidden">
                <header className="flex justify-between items-center bg-white shadow-md">
                    <div>
                        <h1>
                            NTNU
                        </h1>
                    </div>

                    <nav className="mr-12 flex items-center space-x-8">
                        {
                            navigation.map((item, index) => {
                                return <NavLink
                                            key={index}
                                            to={item.href}
                                        >
                                            {item.name}
                                        </NavLink>
                            })
                        }
                    </nav>
                </header>

                <div className="h-screen max-w-7xl w-full mx-auto">
                    { props.children }
                </div>
            </div>
        </>
    );
}