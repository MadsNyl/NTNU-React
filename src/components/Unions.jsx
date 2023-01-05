import React, { useEffect, useState } from "react";
import useAxiosPrivate from "../hooks/UseAxiosPrivate";
import Union from "./Union";
import Spinner from "../components/Spinner";
import Modal from "../components/Modal";

export default function UnionList() {

    const [unions, setUnions] = useState();
    const [isLoading, setLoading] = useState();
    const [delLoading, setDelLoading] = useState();
    const [show, setShow] = useState();
    const [site, setSite] = useState();
    const [error, setError] = useState("");

    const axiosPrivate = useAxiosPrivate();

    useEffect(() => {
        let isMounted = true;
        const controller = new AbortController();

        const getAllUnions = async () => {
            setLoading(true);
            try {
                const res = await axiosPrivate.get("site/all", {
                    singal: controller.singal
                });
                isMounted && setUnions(res.data);
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
            }
        }

        getAllUnions();

        return () => {
            isMounted = false;
            controller.abort();
        }
    }, []);

    const deleteSite = async () => {
        setDelLoading(true);

        try {
            const res = await axiosPrivate.delete(
                "site/delete",
                {
                    data: JSON.stringify({
                        site: site
                    })
                },
                {
                    headers: { "Content-Type": "application/json" },
                    withCredentials: true
                }
            );

            const newUnions = unions.filter(item => item.title !== site);
            setUnions(newUnions);
            setShow(false);
            document.body.style.overflow = "visible";
        } catch (error) {
            if (error) {
                if (error.response.status === 503) setError(`${site} inneholder aviser som må slettes før siden kan slettes.`);
            }
        } finally {
            setDelLoading(false);
        }

    }


    return(
        <>

        <Modal show={show} setShow={setShow} error={error} setError={setError}>
            {!site
                ? <div>Det har skjedd en feil.</div>
                :
                <div className="px-12 flex justify-center items-center">
                    <div>
                        <h1 className="text-lg pb-6">
                            Vil du slette <span className="font-semibold">{site}</span> og alt innhold?
                        </h1>
                        <div className="flex justify-center items-center">
                            <button
                                disabled={delLoading}
                                onClick={deleteSite}
                                className="px-4 py-2 rounded-md bg-red-800 text-white transition duration-150 ease-in-out hover:bg-red-300 hover:text-red-800 flex justify-center items-center"
                            >
                                {delLoading
                                    ? <Spinner size={6} />
                                    : "Slett" 
                                }
                            </button>
                        </div>
                    </div>
                </div>
            }
        </Modal>

        {
            !isLoading
                ?
                <div className="bg-white px-12 py-8 max-w-4xl mx-auto w-full rounded-md shadow-md mb-16">
                    { unions?.length 
                        ? <div>
                            <div className="pb-10">
                                <h1 className="text-lg font-semibold">
                                    Antall foreninger: {unions.length}
                                </h1>
                            </div>
        
                            <ul className="space-y-6">
                                {unions?.map((item, index) => {
                                    return <Union key={index} item={item} index={index} unions={unions} setShow={setShow} setSite={setSite} />
                                })}                
                            </ul>
                        </div>
                        : <div>
                            <h1 className="text-center text-2xl font-semibold text-gray-900">
                                Det finnes ingen sider enda.
                            </h1>
                        </div>   
                    }
                </div>
                : 
                <div className="w-full mt-20 flex justify-center">
                    <Spinner size={10} />
                </div>
        }
        </>
    );
}