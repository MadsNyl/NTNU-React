import React, { useEffect, useState } from "react";
import useAxiosPrivate from "../hooks/UseAxiosPrivate";
import Modal from "./Modal";
import UploadButton from "./UploadButton";


export default function AddMagazine({ showMag, setShowMag, siteTitle, magazines, setMagazines, setSucces }) {

    const axiosPrivate = useAxiosPrivate();

    const [title, setTitle] = useState("");
    const [issue, setIssue] = useState("");
    const [file, setFile] = useState(null);
    const [img, setImg] = useState(null);
    const [isLoading, setLoading] = useState();
    const [error, setError] = useState("");

    useEffect(() => {
        setError("");
    }, [title, issue, file, img]);

    useEffect(() => {
        setTimeout(() => {
            setError("");
        }, 5000);
    }, [error]);

    const addMag = async (e) => {
        e.preventDefault();
        setLoading(true);

        if (!title.length || !issue.length || !file) {
            setError("Tittel, utgave og pdf må være med.");
            setLoading(false);
        }

        try {
            const fileData = new FormData();
            fileData.append("files", file);
            fileData.append("files", img);
            fileData.append("title", title);
            fileData.append("issue", issue);
            fileData.append("siteTitle", siteTitle);

            const res = await axiosPrivate.post(
                "magazine/create",
                fileData,
                {
                    headers: { "Content-Type": "multipart/form-data" },
                    withCredentials: true
                }
            );

            setTitle("");
            setIssue("");
            setImg(null);
            setFile(null);
            setSucces(true);
            setShowMag(false);
            document.body.style.overflow = "visible";

            updateMagazines(res.data[0]);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    }

    const updateMagazines = (data) => {
        const newMags = magazines;

        newMags.push(data[0]);

        setMagazines(newMags);
    }


    return(
        <Modal show={showMag} setShow={setShowMag} error={error}>
            <form
                onSubmit={addMag}
            >
                <h1 className="font-semibold text-2xl text-sky-900 pb-6">
                    Legg til avis
                </h1>

                <div className="flex items-center space-x-6 pb-6">
                    <div>
                        <h1 className="font-semibold pb-3">
                            Tittel <span className="text-red-400 text-lg">*</span>
                        </h1>
                        <input
                            value={title}
                            onChange={(e) => {
                                setTitle(e.target.value);
                            }}
                            className="px-4 py-2 rounded-md bg-gray-100 border border-gray-200" 
                            type="text" 
                        />
                    </div>

                    <div>
                        <h1 className="font-semibold pb-3">
                            Utgavenummer <span className="text-red-400 text-lg">*</span>
                        </h1>
                        <input
                            value={issue}
                            onChange={(e) => {
                                setIssue(e.target.value);
                            }}
                            className="px-4 py-2 rounded-md bg-gray-100 border border-gray-200" 
                            type="number" 
                        />
                    </div>
                </div>

                <div className="flex items-center space-x-6 pb-12">
                    <div>
                        <h1 className="font-semibold pb-3">
                            Avis PDF <span className="text-red-400 text-lg">*</span>
                        </h1>
                        <UploadButton file={file} setFile={setFile} accept={".pdf"} />
                    </div>

                    <div>
                        <h1 className="font-semibold pb-3">
                            Forsidebilde
                        </h1>
                        <UploadButton file={img} setFile={setImg} accept={"image/jpeg, image/jpg"} />
                    </div>
                </div>

                <button
                    disabled={isLoading} 
                    className="w-full flex justify-center items-center py-3 rounded-md font-semibold bg-sky-800 text-white transition duration-150 ease-in-out hover:bg-sky-300 hover:text-sky-800"
                >
                    {isLoading
                        ? 
                        <svg aria-hidden="true" className="mr-2 w-8 h-8 text-gray-200 animate-spin dark:text-gray-200 fill-white" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                        </svg>
                        : "Last opp"
                    }
                </button>
            </form>
        </Modal>
    );
}