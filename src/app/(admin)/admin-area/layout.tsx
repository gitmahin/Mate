"use client"
import Header from '@/app/components/Header'
import React, { useState } from 'react'
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import Loading from '@/app/components/Loading';


export default function Adminlayout({ children }: any) {

    const pathname = usePathname();
    const router = useRouter()
    const [loading, setLoading] = useState(false)
    const [showPopUp, setShowPopUp] = useState(false)

    const logOut = async () => {
        try {
            setLoading(true)
            await axios.post("/api/log-out")
            router.push("/log-in")
        } catch (error) {
            toast.error("Something went wrong")
        } finally {
            setLoading(false)
        }
    }



    return (
        <>
            <Header />
            <div className="main-section">
                <section className='admin-section'>

                    <div className="left-admin-section">
                        <ul className='text-white'>

                            <Link href={"/admin-area/personal-details"} >
                                <li className={pathname === "/admin-area/personal-details" ? "active-link" : ""}>Personal details
                                    <lord-icon
                                        src="https://cdn.lordicon.com/whtfgdfm.json"
                                        trigger="hover"
                                        colors="primary:#ffffff"
                                        target="li"
                                        class="admin-right-arrow"
                                    >
                                    </lord-icon>
                                </li>
                            </Link>

                            <Link href={"/admin-area/security"}>
                                <li className={pathname === "/admin-area/security" ? "active-link" : ""}>Security
                                    <lord-icon
                                        src="https://cdn.lordicon.com/whtfgdfm.json"
                                        trigger="hover"
                                        colors="primary:#ffffff"
                                        target="li"
                                        class="admin-right-arrow"
                                    >
                                    </lord-icon>
                                </li>
                            </Link>

                            <Link href={"/admin-area/profile-details"}>
                                <li className={pathname === "/admin-area/profile-details" ? "active-link" : ""}>Profile details
                                    {<lord-icon
                                        src="https://cdn.lordicon.com/whtfgdfm.json"
                                        trigger="hover"
                                        colors="primary:#ffffff"
                                        target="li"
                                        class="admin-right-arrow"
                                    >
                                    </lord-icon>}
                                </li>
                            </Link>

                            <Link href={"/admin-area/logged-in-details"}>
                                <li className={pathname === "/admin-area/logged-in-details" ? "active-link" : ""}>Logged in details
                                    <lord-icon
                                        src="https://cdn.lordicon.com/whtfgdfm.json"
                                        trigger="hover"
                                        colors="primary:#ffffff"
                                        target="li"
                                        class="admin-right-arrow"
                                    >
                                    </lord-icon>
                                </li>
                            </Link>

                        </ul>
                        <p className='log-out' onClick={() => setShowPopUp(true)} >Log out</p>
                        {showPopUp ? <div className="logout-pop-up-wrapper w-full fixed h-[100vh] top-0 left-0 z-50 flex justify-center items-center">
                            <div className="log-out-container w-[fit-content] p-8 bg-black rounded-md">
                                <p className='text-white text-xl font-medium text-center mb-9'>Are you sure?</p>
                                <div className="log-out-buttons flex justify-center items-center gap-5">
                                    <button className='bg-red-600 text-[18px] px-[10px] py-[8px] rounded-md text-white' onClick={() => setShowPopUp(false)}>Cancel</button>
                                    <button className='bg-green-500 text-[18px] px-[10px] py-[8px] rounded-md text-white' onClick={logOut}>Log out</button>
                                </div>
                            </div>
                        </div> : ""}
                    </div>

                    <div className="right-admin-section">
                        {children}
                    </div>
                </section>
            </div>

            {loading ? <Loading /> : ""}
        </>
    )
}


