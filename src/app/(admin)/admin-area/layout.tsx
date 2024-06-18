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

    const logOut = async () =>{
        try {
            setLoading(true)
            await axios.post("/api/log-out")
            router.push("/log-in")
        } catch (error) {
            toast.error("Something went wrong")
        }finally{
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
                        <p className='log-out' onClick={logOut} >Log out</p>
                    </div>

                    <div className="right-admin-section">
                        {children}
                    </div>
                </section>
            </div>

            {loading ? <Loading/> : ""}
        </>
    )
}


