import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useAxiosPrivate from "../hooks/UseAxiosPrivate";
import { Animated } from "./Animated";
import union from "../assets/union.png";
import ChangeUserPassword from "../components/ChangeUserPassword";
import Modal from "../components/Modal";
import Spinner from "../components/Spinner";


export default function UserOption() {

    const { id } = useParams();
    const navigator = useNavigate();
    const axiosPrivate = useAxiosPrivate();
    const [user, setUser] = useState();
    const [role, setRole] = useState(1984);
    const [site, setSite] = useState(null);
    const [isLoading, setLoading] = useState();
    const [deleteLoading, setDeleteLoading] = useState();
    const [deleteModal, setDeleteModal] = useState(false);
    const [linkModal, setLinkModal] = useState(false);
    const [unions, setUnions] = useState();

    const [success, setSuccess] = useState();

    const ROLES = {
        1984: "Redaktør"
    }

    useEffect(() => {

        if (linkModal) {
            let isMounted = true;
            const controller = new AbortController();

            const getUnions = async () => {
                try {
                    const res = await axiosPrivate.get("site/all", {
                        singal: controller.singal
                    });
                    isMounted && setUnions(res.data);
                } catch (error) {
                    console.log(error);
                }
            }

            getUnions();

            return () => {
                isMounted = false;
                controller.abort();
            }

        }

        return;

    }, [linkModal]);

    useEffect(() => {
        let isMounted = true;
        const controller = new AbortController();

        const getUser = async () => {
            try {
                const res = await axiosPrivate.get(`admin/users/${id}`, {
                    singal: controller.singal
                });
                isMounted && setUser(res.data);
                isMounted && setSite(res.data.site[0])
            } catch (error) {
                console.log(error);
                if (error.response.status === 404) navigator("/dashboard");
            }
        }

        getUser();

        return () => {
            isMounted = false;
            controller.abort();
        }
    }, []);

    const updateRole = async (e) => {
        e.preventDefault();
        setLoading(true);

        if (user?.data[0]?.role === role) {
            setLoading(false);
            return;
        }

        try {
            const res = await axiosPrivate.put();
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    }

    const deleteUser = async (e) => {
        e.preventDefault();
        setDeleteLoading(true);

        try {
            const res = await axiosPrivate.delete(
                "admin/users/delete",
                {
                    data: JSON.stringify({
                        user_id: id
                    })
                },
                {
                    headers: { "Content-Type": "application/json" },
                    withCredentials: true
                }
            );

            navigator("/dashboard/admin");
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
            document.body.style.overflow = "visible";
        }
    }

    const linkUp = async (title, logo) => {
        setLoading(true);

        try {
            await axiosPrivate.post(
                "site/connect",
                JSON.stringify({
                    site_title: title,
                    editor_id: id
                }),
                {
                    headers: { "Content-Type": "application/json" },
                    withCredentials: true
                }
            );
            
            setSite({
                title: title,
                logo: logo
            })
            setLinkModal(false);
            document.body.style.overflow = "visible";
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    }

    const removeSite = async () => {
        setLoading(true);

        try {
            await axiosPrivate.delete(
                "site/remove",
                {
                    data: JSON.stringify({
                        editor_id: id
                    })
                },
                {
                    headers: { "Content-Type": "application/json" },
                    withCredentials: true
                }
            );

            setSite(null);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    }


    return (
        <Animated>
            {
                user 
                    ? 
                    <>

                        <Modal show={deleteModal} setShow={setDeleteModal} error={[]} >
                            <form
                                onSubmit={deleteUser} 
                                className="flex justify-center items-center w-full"
                            >
                                <div className="text-center w-full">
                                    <h1 className="pb-6 font-semibold text-xl">
                                        Slette bruker?
                                    </h1>
                                    <button className="w-full flex justify-center items-center py-2 bg-red-300 text-red-800 font-semibold rounded-md transition duration-150 ease-in-out hover:bg-red-800 hover:text-white ">
                                        Slett
                                    </button>
                                </div>
                            </form>
                        </Modal>

                        <Modal show={linkModal} setShow={setLinkModal} error={[]} >
                            <div className="px-4 w-96">
                                <div className="flex justify-between items-center pb-4">
                                    <h1 className="text-lg font-medium">
                                        Koble til forening
                                    </h1>

                                    <h1 className="font-semibold">
                                        {unions ? unions.length : 0}
                                    </h1>
                                </div>

                                <div className="w-full space-y-2">
                                    {unions
                                        ? unions.map((item, index) => {
                                            return <div key={index} className="rounded-md bg-gray-100 px-4 py-3 flex justify-between items-center w-full">
                                                        <h1 className="font-medium">
                                                            {item.title}
                                                        </h1>

                                                        <button 
                                                            onClick={() => {
                                                                linkUp(item.title, item.logo);
                                                            }}
                                                            disabled={isLoading}
                                                            className="flex justify-center items-center px-3 py-2 bg-sky-800 text-white transition duration-150 ease-in-out hover:bg-sky-300 hover:text-sky-800 rounded-md"
                                                        >
                                                            {!isLoading
                                                                ? "Koble til"
                                                                : <Spinner size={6} />
                                                            }
                                                        </button>
                                                    </div>
                                        })
                                        : <Spinner size={8} />
                                    }
                                </div>
                            </div>
                        </Modal>

                        <div className="mt-12 pb-20">
                            <div>
                                <h1 className="text-5xl font-semibold text-sky-800 pb-4">
                                    { user.data[0].username }
                                </h1>
                                <p className="text-2xl text-gray-500">
                                    { ROLES[user.data[0].role] }
                                </p>
                            </div>
                        </div>

                        <div className="flex justify-between items-stretch mx-12 pb-20">
                            <div className="max-w-md w-full px-12 py-8 bg-white rounded-md shadow-md flex justify-center items-center">
                                {
                                    site
                                    ? 
                                        <div className="flex items-center justify-between w-full">
                                            <div className="flex items-center space-x-4">
                                                <img 
                                                    className="w-12 h-12"
                                                    src={site.logo ? site.logo : union} 
                                                    alt="Side logo" 
                                                />
                                                <h1 className="font-semibold text-lg">
                                                    { site.title }
                                                </h1>
                                            </div>

                                            <button
                                                onClick={removeSite} 
                                                className="flex justify-center items-center bg-red-300 text-red-800 px-4 py-2 rounded-md transition duration-150 ease-in-out hover:bg-red-800 hover:text-white"
                                            >
                                                {isLoading
                                                    ? <Spinner size={6} />
                                                    : "Fjern"
                                                }
                                            </button>
                                        </div>
                                    : 
                                        <button
                                            onClick={() => {
                                                setLinkModal(true);
                                                document.body.style.overflow = "hidden";
                                            }} 
                                            className="px-4 py-3 bg-sky-800 text-white transition duration-150 ease-in-out hover:bg-sky-300 hover:text-sky-800 rounded-md"
                                        >
                                            <h1 className="font-semibold">
                                                Koble til side
                                            </h1>
                                        </button>
                                }
                            </div>

                            <div className="max-w-md w-full px-12 py-8 bg-white rounded-md shadow-md flex justify-center">
                                <form
                                    onSubmit={updateRole} 
                                    className="w-full"
                                >
                                    <select
                                        className="w-full block mb-4 px-4 py-2 rounded-md bg-gray-100 border border-gray-200"
                                        value={role}
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

                                    <button 
                                        className="px-12 py-2 rounded-md bg-sky-800 text-white transition duration-150 ease-in-out hover:bg-sky-300 hover:text-sky-800  font-semibold"
                                    >
                                        Endre
                                    </button>
                                </form>
                            </div>
                        </div>

                        <div className="px-12 pb-16">
                            <div className="w-full bg-white px-12 py-8 rounded-md shadow-md">
                                <h1 className="text-xl font-semibold pb-6">
                                    Endre passord
                                </h1>

                                <ChangeUserPassword user={user} setSuccess={setSuccess} />
                            </div>
                        </div>

                        <div className="px-12 pb-16">
                            <button 
                                onClick={() => {
                                    setDeleteModal(true)
                                    document.body.style.overflow = "hidden";
                                }}
                                className="max-w-sm w-full flex justify-center items-center py-3 rounded-md bg-red-300 text-red-800 font-semibold transition duration-150 ease-in-out hover:bg-red-800 hover:text-white "
                            >
                                Slett bruker
                            </button>
                        </div>
                    </>
                    :     
                    <div className="h-screen flex justify-center items-center">
                        <svg aria-hidden="true" className="mr-2 w-12 h-12 text-gray-200 animate-spin dark:text-gray-200 fill-sky-900" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                        </svg>
                    </div>
            }
        </Animated>
    );
}