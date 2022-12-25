import React, { useEffect, useRef, useState, useContext } from "react";
import { Animated } from "./Animated";
import { AuthContext } from "../context/AuthProvider";
import axios from "../api/axios";


export function Login() {
    const [auth, setAuth] = useContext(AuthContext);

    const userRef = useRef();
    const errorRef = useRef();

    const [user, setUser] = useState();
    const [password, setPassword] = useState();
    const [error, setError] = useState();
    const [success, setSuccess] = useState();

    // useEffect(() => {
    //     userRef.current.focus();
    // }, []);

    useEffect(() => {
        setError("");
    }, [user, password]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const res = await axios.post(
                "auth", 
                JSON.stringify({username: user, password}),
                {
                    headers: { "Content-Type": "application/json" },
                    withCredentials: true
                }
            );
            console.log(JSON.stringify(res?.data));
            const accessToken = res?.data?.accessToken;
            const role = res?.data?.role;
            setAuth({user, password, accessToken, role});
            setUser("");
            setPassword("");
            setSuccess(true);
        } catch (e) {
            console.log(e);
        }
    }

    return (
        <Animated>

            <div>
                {success
                    ? <div>
                        Du er logget inn
                    </div>
                    : <></>
                }
            </div>

            <div className="max-w-2xl w-full mx-auto mt-32 bg-white px-8 py-12 rounded-md shadow-md">
                <form 
                    className="max-w-sm w-full mx-auto"
                    onSubmit={handleSubmit}
                >
                    <div className="pb-6">
                        <h1 className="text-lg pb-3 font-semibold">
                            Brukernavn
                        </h1>
                        <input 
                            className="focus:outline-none border border-gray-200 rounded-md px-3 py-2 shadow-sm bg-gray-50 max-w-sm w-full"
                            type="text"
                            // ref={userRef}
                            onChange={(e) => setUser(e.target.value)}
                            defaultValue={user}
                            required 
                        />
                    </div>

                    <div className="pb-8">
                        <h1 className="text-lg pb-3 font-semibold">
                            Passord
                        </h1>
                        <input 
                            className="focus:outline-none border border-gray-200 rounded-md px-3 py-2 shadow-sm bg-gray-50 max-w-sm w-full"
                            type="password"
                            // ref={userRef}
                            onChange={(e) => setPassword(e.target.value)}
                            defaultValue={password}
                            required 
                        />
                    </div>

                    <button className="max-w-sm w-full py-3 text-lg font-medium rounded-md bg-blue-600 text-white">
                        Logg inn
                    </button>
                </form>
            </div>
        </Animated>
    );
}