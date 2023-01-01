import React, { useEffect, useState } from "react";


export default function UploadButton(props) {

    const [fileName, setFileName] = useState();

    const convertString = (string) => {
        let newString = string.split("/").pop().split(".")[0];

        if (newString.length <= 30) return newString;
        
        return newString.slice(0, 30) + "...";
    }

    useEffect(() => {
        props.file && setFileName(convertString(props.file));
    }, []);

    return (
        <div className="flex items-center space-x-3">
            <label className={"inline-block border px-12 py-3 cursor-pointer rounded-md transition duration-150 ease-in-out hover:bg-emerald-500 hover:border-emerald-500 hover:text-white " + (props.file ? "bg-emerald-500 border-emerald-500 text-white" : "bg-white border-gray-200")}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
                </svg>

                <input 
                    onChange={(e) => {
                        props.setFile(e.target.files[0]);
                        setFileName(e.target.files[0].name);
                    }}
                    className="hidden"
                    type="file"
                    accept={props.accept}
                />
            </label>

            <p className="w-32">
                {props.file ? fileName : "Ingen fil valgt"}
            </p>
        </div>
    );
}