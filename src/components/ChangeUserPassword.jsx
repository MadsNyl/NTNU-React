import React, { useState } from "react";

export default function ChangeUserPassword(props) {

    const [adminPassword, setAdminPassword] = useState();
    const [password, setPassword] = useState();
    const [rePassword, setRePassword] = useState();

    

    return (
        <form className="max-w-md w-full mx-auto">
            <div className="pb-6">
                <h1 className="font-semibold pb-2"> 
                    Admin passord
                </h1>
                <input
                    className="bg-gray-100 border border-gray-200 rounded-md px-4 py-2 w-full"
                    onChange={(e) => {
                        setAdminPassword(e.target.value);
                    }}
                    type="password" 
                />
            </div>

            <div className="flex items-center pb-6 space-x-4">
                <div className="">
                    <h1 className="font-semibold pb-2"> 
                        Nytt passord
                    </h1>
                    <input
                        className="bg-gray-100 border border-gray-200 rounded-md px-4 py-2 w-full"
                        onChange={(e) => {
                            setPassword(e.target.value);
                        }}
                        type="password" 
                    />
                </div>
                <div className="">
                    <h1 className="font-semibold pb-2"> 
                        Repeter passord
                    </h1>
                    <input
                        className="bg-gray-100 border border-gray-200 rounded-md px-4 py-2 w-full"
                        onChange={(e) => {
                            setRePassword(e.target.value);
                        }}
                        type="password" 
                    />
                </div>
            </div>

            <button
                className="flex justify-center items-center w-full py-3 rounded-md bg-sky-800 text-white transition duration-150 ease-in-out hover:bg-sky-300 hover:text-sky-800  font-semibold"
            >
                Oppdater
            </button>
        </form>
    );
}