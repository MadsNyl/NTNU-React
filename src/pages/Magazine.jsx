import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import useAuth from "../hooks/UseAuth";
import useAxiosPrivate from "../hooks/UseAxiosPrivate";
import { Animated } from "./Animated";
import union from "../assets/union.png";
import UploadButton from "../components/UploadButton";


export default function Magazines() {

    const location = useLocation();
    const axiosPrivate = useAxiosPrivate();
    const [auth] = useAuth();
    const [magazine, setMagazine] = useState();

    const [pdf, setPdf] = useState(); 
    const [image, setImage] = useState();
    const [title, setTitle] = useState();
    const [issue, setIssue] = useState();
    const [isLoading, setLoading] = useState();
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        let isMounted = true;
        const controller = new AbortController();
        const getMagazine = async () => {
            try {
                const res = await axiosPrivate.get(
                    `magazine/${location.state.id}`,
                    {
                        singal: controller.singal,
                    }
                );
                console.log(res.data)
                if (isMounted) {
                    setMagazine(res.data[0]);
                    setImage(res.data[0].logo);
                    setPdf(res.data[0].pdf);
                    setTitle(res.data[0].title);
                    setIssue(res.data[0].issue);
                }
            } catch (error) {
                console.log(error);
            }
        }

        getMagazine();

        return () => {
            isMounted = false;
            controller.abort();
        }
    }, []);

    const edit = async () => {
        setLoading(true);

        try {
            const res = await axiosPrivate.put(
                "",
                {

                }
            );
            setSuccess(true);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    }
     

    return (
        <Animated>
            <div className="px-12 py-16">
                {magazine
                    ?
                    <div className="flex space-x-36">
                        <div className="max-w-sm w-full">
                            <div className="w-full bg-sky-800 text-white font-medium py-3 px-6 rounded-t-md flex items-center justify-between">
                                <div>
                                    <h1>
                                        { magazine.title }
                                    </h1>
                                    <p className="text-xs text-gray-200">
                                        { magazine.issue ? `${magazine.issue}. utgave` : "1. utgave"}
                                    </p>
                                </div>
                            </div>

                            <div className="flex justify-center w-full bg-white">
                                <img 
                                    className="w-full"
                                    src={magazine.logo ? magazine.logo : union}
                                    alt="Forsidebilde" 
                                />
                            </div>
                        </div>

                        <form 
                            className="px-8 py-6 bg-white max-w-sm w-full rounded-md border border-gray-200 space-y-6"
                        >
                            <div>
                                <h1 className="font-semibold pb-3">
                                    Last opp PDF
                                </h1>
                                <UploadButton file={pdf} setFile={setPdf} accept={".pdf"} />
                            </div>

                            <div>
                                <h1 className="font-semibold pb-3">
                                    Last opp forsidebilde
                                </h1>
                                <UploadButton file={image} setFile={setImage} accept={"image/jpg, image/jpeg"} />
                            </div>

                            <div>
                                <h1 className="font-semibold pb-3">
                                    Tittel
                                </h1>

                                <input
                                    placeholder={title ? title : ""}
                                    className="px-4 py-2 border border-gray-200 rounded-md bg-gray-50" 
                                    type="text" 
                                />
                            </div>

                            <div>
                                <h1 className="font-semibold pb-3">
                                    Utgavenummer
                                </h1>

                                <input  
                                    placeholder={issue ? issue : 0}
                                    className="px-4 py-2 border border-gray-200 rounded-md bg-gray-50"
                                    type="number" 
                                />
                            </div>

                            <button
                                disabled={isLoading}
                                className="w-full flex justify-center items-center rounded-md bg-sky-800 text-white font-semibold py-3 transition duration-150 ease-in-out hover:bg-sky-300 hover:text-sky-800"
                            >
                                Lagre
                            </button>
                        </form>

                    </div>
                    : <div></div>
                }
            </div>
        </Animated>
    );
}