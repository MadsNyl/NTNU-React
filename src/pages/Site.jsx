import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useAuth from "../hooks/UseAuth";
import useAxiosPrivate from "../hooks/UseAxiosPrivate";
import { Animated } from "../pages/Animated";
import union from "../assets/union.png";
import Magazines from "../components/Magazines";


export default function Site() {

    const { title } = useParams();
    const navigator = useNavigate();
    const axiosPrivate = useAxiosPrivate();
    
    const [auth] = useAuth();
    const [site, setSite] = useState();
    const [magazines, setMagazines] = useState();

    const [newTitle, setNewTitle] = useState("");
    const [name, setName] = useState("");
    const [desc, setDesc] = useState("");

    useEffect(() => {
        let isMounted = true;
        const controller = new AbortController();
        const getSite = async () => {
            try {
                const res = await axiosPrivate.get(
                    `site?title=${title}&user=${auth.id}`,
                    {
                        singal: controller.singal,
                    }
                );
                console.log(res.data)
                isMounted && setSite(res.data.site[0]);
                isMounted && setMagazines(res.data.magazines);
            } catch (error) {
                console.log(error);
            }
        }

        getSite();

        return () => {
            isMounted = false;
            controller.abort();
        }
    }, []);


    return (
        <Animated>
            {site 
                ? 
                <div className="px-12 py-16">
                    <div className="flex items-center space-x-6 pb-20">
                        <div className="relative">
                            <img 
                                className="w-32 h-32 border border-sky-600 rounded-full"
                                src={site.logo ? site.logo : union} 
                                alt="Foreningslogo" 
                            />
                            <div 
                                onClick={""}
                                className="cursor-pointer absolute left-1 bottom-1 w-7 h-7 flex justify-center items-center rounded-full bg-sky-900 border border-white text-white transition duration-150 ease-in-out hover:bg-white hover:text-sky-900"
                            >
                                <p className="text-lg font-semibold pb-1">
                                    +
                                </p>
                            </div>
                        </div>
                        <div className="max-w-lg w-full">
                            <h1 className="text-4xl font-semibold text-gray-900">
                                {site.title}
                            </h1>
                            <p className="text-sm text-gray-500 ml-3">
                                {site.name}
                            </p>
                        </div>
                    </div>

                    <div className="w-full px-8 py-6 rounded-md shadow-md bg-white mb-16">
                        <h1 className="text-2xl font-semibold pb-12">
                            Detaljer
                        </h1>

                        <form>
                            <div className="flex items-stretch space-x-12">
                                <div className="max-w-sm w-full pb-6">
                                    <div className="w-full pb-6">
                                        <h1 className="font-semibold pb-2">
                                            Foreningstittel
                                        </h1>
                                        <input 
                                            onChange={(e) => {
                                               setNewTitle(e.target.value); 
                                            }}
                                            placeholder={site.title}
                                            className="border border-gray-200 bg-gray-100 rounded-md px-4 py-2 w-full"
                                            type="text" 
                                        />
                                    </div>

                                    <div className="w-full pb-6">
                                        <h1 className="font-semibold pb-2">
                                            Foreningsnavn
                                        </h1>
                                        <input 
                                            onChange={(e) => {
                                                setName(e.target.value);
                                            }}
                                            placeholder={site.name}
                                            className="border border-gray-200 bg-gray-100 rounded-md px-4 py-2 w-full"
                                            type="text" 
                                        />
                                    </div>
                                </div>

                                <div className="max-w-md w-full">
                                    <div>
                                        <h1 className="font-semibold pb-2">
                                            Beskrivelse av forening
                                        </h1>

                                        <textarea
                                            onChange={(e) => {
                                                setDesc(e.target.value);
                                            }}
                                            placeholder={site.description}
                                            className="w-full px-4 py-2 bg-gray-100 border border-gray-200 rounded-md resize-none h-32"
                                        >

                                        </textarea>
                                    </div>
                                </div>
                            </div>

                            <button 
                                disabled={!name.length && !desc.length && !newTitle.length}
                                className="flex justify-center items-center py-3 rounded-md bg-sky-800 text-white max-w-sm w-full"
                            >
                                Lagre endringer
                            </button>
                        </form>
                    </div>

                    <div className="w-full px-8 py-6 rounded-md shadow-md bg-white">
                        <div className="flex justify-between items-center pb-12">
                            <h1 className="text-2xl font-semibold">
                                Publiserte aviser
                            </h1>

                            <button 
                                onClick={""}
                                className="px-8 py-2 flex justify-center items-center bg-sky-800 text-white rounded-md"
                            >
                                Legg til
                            </button>
                        </div>

                        <Magazines magazines={magazines}/>
                    </div>
                </div>
                : <div></div>
            }
        </Animated>
    );
}