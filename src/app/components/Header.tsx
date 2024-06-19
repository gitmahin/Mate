"use client"
import React, { useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation';
import { useRouter } from 'next/navigation'
import { useCallback } from 'react';
import axios from 'axios'
import toast from 'react-hot-toast'


const Header = () => {
    const pathname = usePathname()

    const router = useRouter()
    const loginStatus = useCallback(async () => {
        try {
            await axios.post('/api/login-status')
        } catch (error) {
            toast.error("Session expired")
            router.push("/log-in")
        }
    }, [])

    useEffect(() => {
        loginStatus()
    }, [loginStatus])


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
                                <Link href={"/"}>
                                    <li className={pathname === "/" ? "active-main-menu-item" : ""}>
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
                                <Link href={"/find-mates"}>
                                    <li className={pathname === "/find-mates" ? "active-main-menu-item" : ""}>
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={24} height={24} color={"#ffffff"} fill={"#ffffff"}>
                                            <path d="M18.6161 20H19.1063C20.2561 20 21.1707 19.4761 21.9919 18.7436C24.078 16.8826 19.1741 15 17.5 15M15.5 5.06877C15.7271 5.02373 15.9629 5 16.2048 5C18.0247 5 19.5 6.34315 19.5 8C19.5 9.65685 18.0247 11 16.2048 11C15.9629 11 15.7271 10.9763 15.5 10.9312" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                                            <path d="M4.48131 16.1112C3.30234 16.743 0.211137 18.0331 2.09388 19.6474C3.01359 20.436 4.03791 21 5.32572 21H12.6743C13.9621 21 14.9864 20.436 15.9061 19.6474C17.7889 18.0331 14.6977 16.743 13.5187 16.1112C10.754 14.6296 7.24599 14.6296 4.48131 16.1112Z" stroke="currentColor" strokeWidth="1.5" />
                                            <path d="M13 7.5C13 9.70914 11.2091 11.5 9 11.5C6.79086 11.5 5 9.70914 5 7.5C5 5.29086 6.79086 3.5 9 3.5C11.2091 3.5 13 5.29086 13 7.5Z" stroke="currentColor" strokeWidth="1.5" />
                                        </svg>
                                    </li>
                                </Link>
                                <Link href={"/shares-feed"}>
                                    <li className={pathname === "/shares-feed" ? "active-main-menu-item" : ""}>
                                        <lord-icon
                                            src="https://cdn.lordicon.com/depeqmsz.json"
                                            trigger="hover"
                                            colors="primary:#ffffff"
                                            class='main-menu-icon'
                                            target="li">
                                        </lord-icon>
                                    </li>
                                </Link>
                                <Link href={"/videos"}>
                                    <li className={pathname === "/videos" ? "active-main-menu-item" : ""}>
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
                                    <li className={pathname === "#" ? "active-main-menu-item" : ""}>
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
