import React from "react";
import { Animated } from "./Animated";
import useLogout from "../hooks/UseLogout";
import { NavLink, useNavigate } from "react-router-dom";


export default function Dashboard() {
    return (
        <Animated>
            <div className="mt-12">
                <div>
                    <h1 className="text-5xl font-semibold text-sky-400">
                        Oversikt
                    </h1>
                </div>
            </div>
        </Animated>
    );
}