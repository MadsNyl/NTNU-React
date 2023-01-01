import React from "react";


export default function Modal(props) {
    return(
        <>
         {
            props.show
                ? <div className="fixed top-0 left-0 w-screen h-screen flex justify-center items-center bg-black/50">
                    <div>
                        { props.error.length
                            ?
                            <div className="mb-4 w-full mx-auto px-4 py-3 rounded-md bg-red-800 text-white">
                                { props.error }
                            </div>
                            : <div />
                        }
                        <div className="px-12 py-6 rounded-md bg-white relative">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 cursor-pointer absolute top-1 right-1" onClick={() => {
                                props.setShow(false);
                                document.body.style.overflow = "visible";
                            }}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                            { props.children }
                        </div>
                    </div>
                </div>
                : <></>
         }
        </>
    );
}