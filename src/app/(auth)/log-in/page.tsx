"use client"
import React from 'react'
import Link from 'next/link'
import Loading from '@/app/components/Loading'


export default function logInPage() {


    return (
        <div>
            <section className='log-in-container'>
                <div className="left-container">
                    <div className="logo">
                        <img src="assets/mate_logo.png" alt="" />
                    </div>
                    <p>Bring people together</p>
                    <h1>Log in</h1>

                </div>
                <div className="right-container">
                    <p className='plus-icon1'>+</p>
                    <p className='plus-icon2'>+</p>
                    <p className='plus-icon3'>+</p>
                    <p className='plus-icon4'>+</p>
                    <div className="left-line"></div>
                    <div className="right-line"></div>
                    <div className="right-box">
                        <form>
                            <p>Email</p>
                            <input type="text" className='input' />
                            <p>Password</p>
                            <input type="password" className='input' />
                            <button type='submit' className='login-btn' >Log in</button>

                        </form>
                    </div>
                </div>
            </section>


            <Link href={"/sign-up/info"}>
                <button className="create-account-btn">Create account</button>
            </Link>


        </div>
    )
}


