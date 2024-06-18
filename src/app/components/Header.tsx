"use client"
import React, { useCallback, useEffect } from 'react'
import Link from 'next/link'
import axios from 'axios'
import toast from 'react-hot-toast'
import { useRouter } from 'next/navigation'

const Header = () => {
    const router = useRouter()

    const loginStatus = useCallback( async () =>{
       try {
         await axios.post('/api/login-status')
       } catch (error) {
        toast.error("Session expired")
        router.push("/log-in")
       }
    }, [])

    useEffect(() =>{
        loginStatus()
    }, [])

    return (
        <>
            <header>
                <div className="header-container">
                    <div className="header-logo">
                        <img src="../../../../assets/mate_logo.png" className='header-logo' alt="" />
                    </div>
                    <div className="menu">
                        <div className="main-menu">
                            <ul>
                                <Link href={"#"}>
                                    <li>
                                        <lord-icon
                                            src="https://cdn.lordicon.com/wmwqvixz.json"
                                            trigger="hover"
                                            colors="primary:#ffffff"
                                            class='main-menu-icon'
                                            target="li"
                                        >
                                        </lord-icon>
                                    </li>
                                </Link>
                                <Link href={"#"}>
                                    <li>
                                        <lord-icon
                                            src="https://cdn.lordicon.com/depeqmsz.json"
                                            trigger="hover"
                                            colors="primary:#ffffff"
                                            class='main-menu-icon'
                                            target="li">
                                        </lord-icon>
                                    </li>
                                </Link>
                                <Link href={"#"}>
                                    <li>
                                        <lord-icon
                                            src="https://cdn.lordicon.com/wgdqrxxf.json"
                                            trigger="hover"
                                            colors="primary:#ffffff"
                                            class='main-menu-icon'
                                            target="li">
                                        </lord-icon>
                                    </li>
                                </Link>
                                <Link href={"#"}>
                                    <li>
                                        <lord-icon
                                            src="https://cdn.lordicon.com/lznlxwtc.json"
                                            trigger="hover"
                                            colors="primary:#ffffff"
                                            target="li"
                                            class='main-menu-icon'>
                                        </lord-icon>
                                    </li>
                                </Link>
                            </ul>
                        </div>
                    </div>
                </div>
            </header>
        </>
    )
}

export default Header
