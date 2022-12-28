import React, { useEffect, useState } from "react";
import useAxiosPrivate from "../hooks/UseAxiosPrivate";
import { Animated } from "./Animated";


export default function NewUser() {

    const [isLoading, setLoading] = useState();
    const [username, setUsername] = useState();
    const [password, setPassword] = useState();
    const [rePassword, setRePassword] = useState();
    const [role, setRole] = useState(1984);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const axiosPrivate = useAxiosPrivate();

    useEffect(() => {
        setError("");
    }, [username, password, rePassword]);

    useEffect(() => {
        setTimeout(() => {
            setSuccess("");
        }, 5000);
    }, [success]);

    const submit = async (e) => {
        e.preventDefault();
        setLoading(true);

        if (!username || !password || !rePassword) {
            setError("Alle felter må fylles inn.");
            setLoading(false);
            return;
        }

        if (password !== rePassword) {
            setError("Passord må være like.");
            setLoading(false);
            return;
        }

        try {
            const res = await axiosPrivate.post(
                "register", 
                JSON.stringify({
                    username: username, 
                    password: password, 
                    repeatedPassword: rePassword, 
                    role: role
                }), 
                {
                    headers: { "Content-Type": "application/json" },
                    withCredentials: true
                }
            );

            setSuccess("Ny bruker opprettet.");
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    }


    return(
        <Animated>

            {
                success.length
                    ? <div className="fixed bottom-4 right-4 px-6 py-3 bg-emerald-300 text-emerald-800 rounded-md">
                        {success}
                    </div>
                    : <></>
            }

            <div className="mt-12 pb-20">
                <div>
                    <h1 className="text-5xl font-semibold text-sky-800">
                        Opprett ny bruker
                    </h1>
                </div>
            </div>

            <div className="pb-5 flex justify-center items-center h-12">
                { error.length
                    ? <div className="max-w-4xl w-full mx-auto px-6 py-3 bg-red-300 text-red-800 rounded-md">
                        {error}
                        </div>
                    : <div></div>
                }
            </div>

            <div className="bg-white px-12 py-8 max-w-4xl mx-auto w-full rounded-md shadow-md">
                <form
                    onSubmit={submit}
                >
                    <div className="pb-10 flex items-center space-x-12">
                        <div className="w-full">
                            <h1 className="pb-4 text-lg font-semibold">
                                Brukernavn
                            </h1>
                            <input 
                                type="text"
                                onChange={(e) => {
                                    setUsername(e.target.value);
                                }}
                                className="max-w-md w-full px-4 py-2 bg-gray-100 border border-gray-200 rounded-md focus:outline-sky-700" 
                            />
                        </div>
                        <div className="w-full">
                            <h1 className="pb-4 text-lg font-semibold">
                                Rolle
                            </h1>
                            <select 
                                value={role}
                                className="px-4 py-2 bg-gray-100 border border-gray-200 rounded-md focus:outline-sky-700"
                                onChange={(e) => {
                                    setRole(e.target.value)
                                }}
                            >
                                <option value={1984}>
                                    Redaktør
                                </option>
                                <option value={5150}>
                                    Admin
                                </option>
                            </select>
                        </div>
                    </div>

                    <div className="pb-10 flex items-center space-x-12">
                        <div className="w-full">
                            <h1 className="pb-4 text-lg font-semibold">
                                Passord
                            </h1>
                            <input 
                                onChange={(e) => {
                                    setPassword(e.target.value);
                                }}
                                type="password"
                                className="max-w-md w-full px-4 py-2 bg-gray-100 border border-gray-200 rounded-md focus:outline-sky-700" 
                            />
                        </div>

                        <div className="w-full">
                            <h1 className="pb-4 text-lg font-semibold">
                                Repeter passord
                            </h1>
                            <input 
                                onChange={(e) => {
                                    setRePassword(e.target.value);
                                }}
                                type="password"
                                className="max-w-md w-full px-4 py-2 bg-gray-100 border border-gray-200 rounded-md focus:outline-sky-700" 
                            />
                        </div>
                    </div>
                    
                    <button 
                        disabled={isLoading}
                        className="w-full bg-emerald-400 font-semibold text-white text-lg py-3 rounded-md transition duration-150 ease-in-out hover:bg-emerald-200 hover:text-emerald-800 flex justify-center"
                    >
                        {
                            isLoading
                                ? <svg aria-hidden="true" class="mr-2 w-6 h-6 text-gray-200 animate-spin dark:text-gray-200 fill-white" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                                    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                                </svg>
                                : "Opprett"
                        }
                    </button>
                </form>
            </div>
        </Animated>
    );
}