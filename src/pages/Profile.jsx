import React, { useEffect, useState } from "react";
import useAuth from "../hooks/UseAuth";
import { Animated } from "./Animated";
import Spinner from "../components/Spinner";
import useAxiosPrivate from "../hooks/UseAxiosPrivate";
import SuccessMessage from "../components/SuccessMessage";


export default function Profile() {
    
    const axiosPrivate = useAxiosPrivate();

    const [auth, setAuth] = useAuth();
    const [oldPassword, setOldPassword] = useState();
    const [password, setPassword] = useState();
    const [rePassword, setRePassword] = useState();
    const [username, setUsername] = useState();
    const [loadUsername, setLoadUsername] = useState();
    const [usernameError, setUsernameError] = useState("");
    const [usernameSuccess, setUsernameSuccess] = useState(false);

    useEffect(() => {
        setUsernameError("");
    }, [username]);

    useEffect(() => {
        if (usernameError.length) {
            setTimeout(() => {
                setUsernameError("");
            }, 5000);
        }
    }, [usernameError]);

    const updateUsername = async (e) => {
        e.preventDefault();
        setLoadUsername(true);

        if (!username) {
            setUsernameError("Du må fylle inn et brukernavn.");
            setLoadUsername(false);
            return;
        }

        if (username === auth.username) {
            setUsernameError("Du har allerede dette brukernavnet.");
            setLoadUsername(false);
            return;
        }

        try {
            const res = await axiosPrivate.put(
                "/user/username",
                JSON.stringify({
                    id: auth.id,
                    username: username,
                    role: auth.role
                }),
                {
                    headers: { "Content-Type": "application/json" },
                    withCredentials: true
                }
            );

            const oldAuth = auth;
            const accessToken = res.data;

            setAuth({
                username: username,
                role: oldAuth.role,
                accessToken: accessToken,
                id: oldAuth.id
            });
            setUsernameSuccess(true);
        } catch (error) {
            setUsernameError("Noe gikk feil. Prøv igjen.");
        } finally {
            setLoadUsername(false);
        }
    }

    return (
        <Animated>

            {usernameSuccess
                ? <SuccessMessage message={"Brukernavn oppdatert."} setShow={setUsernameSuccess} />
                : <></>
            }

            {auth
                ?
                    <div className="px-12 py-16">
                        <div className="space-y-4 pb-16">
                            <h1 className="text-5xl font-semibold text-sky-800">
                                Min profil
                            </h1>
                            <p className="text-lg text-gray-400">
                                { auth.username }
                            </p>
                        </div>

                        {usernameError.length
                            ? <div className="w-full py-3 px-4 rounded-md bg-red-800 text-white text-center">{usernameError}</div>
                            : <div className="h-12"></div>
                        }
                        
                        <div className="bg-white rounded-md shadow-md pb-8 pt-2 mb-16 mt-4">
                            <div className="px-6 pb-8">
                                <h1 className="text-2xl font-semibold">
                                    Endre brukernavn
                                </h1>
                            </div>

                            <form
                                onSubmit={updateUsername} 
                                className="max-w-md w-full mx-auto"
                            >
                                <div className="pb-6">
                                    <h1 className="font-semibold pb-2"> 
                                        Brukernavn
                                    </h1>
                                    <input
                                        className="bg-gray-100 border border-gray-200 rounded-md px-4 py-2 w-full"
                                        onChange={(e) => {
                                            setUsername(e.target.value);
                                        }}
                                        type="email" 
                                        placeholder={auth.username}
                                    />
                                </div>

                                <button
                                    disabled={loadUsername}
                                    className="flex justify-center items-center w-full py-3 rounded-md bg-sky-800 text-white transition duration-150 ease-in-out hover:bg-sky-300 hover:text-sky-800  font-semibold"
                                >
                                    {loadUsername
                                        ? <Spinner size={6} /> 
                                        : "Oppdater"
                                    }
                                </button>
                            </form>
                        </div>

                        <div className="bg-white rounded-md shadow-md pb-8 pt-2">
                            <div className="px-6 pb-8">
                                <h1 className="text-2xl font-semibold">
                                    Endre passord
                                </h1>
                            </div>

                            <form className="max-w-md w-full mx-auto">
                                <div className="pb-6">
                                    <h1 className="font-semibold pb-2"> 
                                        Ditt passord
                                    </h1>
                                    <input
                                        className="bg-gray-100 border border-gray-200 rounded-md px-4 py-2 w-full"
                                        onChange={(e) => {
                                            setOldPassword(e.target.value);
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
                        </div>

                    </div>
                :
                    <Spinner size={16} />
            }
        </Animated>
    );
}