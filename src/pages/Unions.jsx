import React from "react";
import { Animated } from "./Animated";
import UnionList from "../components/Unions";


export default function Unions() {
    return(
        <Animated>
            <div className="mt-12 pb-20">
                <div>
                    <h1 className="text-5xl font-semibold text-sky-800">
                        Linjeforeninger
                    </h1>
                </div>
            </div>

            <div className="bg-white px-12 py-8 max-w-4xl mx-auto w-full rounded-md shadow-md">
                <UnionList />
            </div>
        </Animated>
    );
}