import React, { useEffect } from "react";


export default function SuccessMessage({ message, setShow }) {

    useEffect(() => {
        setTimeout(() => {
            setShow(false);
        }, 5000);
    }, [setShow]);

    return (
        <div className="fixed bottom-2 right-2 px-4 py-3 bg-emerald-300 text-emerald-800 rounded-md">
            { message }
        </div>
    );
}