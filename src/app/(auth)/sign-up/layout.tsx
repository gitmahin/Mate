"use client"
import Link from 'next/link'
import React from 'react'

export default function signUpPage({ children }: any) {

  const handleRemoveItemFromLocalStorage = () =>{
    localStorage.removeItem("email")
    localStorage.removeItem("firstName")
    localStorage.removeItem("lastName")
  }

  return (
    <div>
      <section className='sign-up-section'>
        <div className="left-signup-container">
          <div className="signup-meta-box">
            <div className="middle-signup-meta-box">
              <img className='logo' src="../../assets/mate_logo.png" alt="" />
              <p>Bring people together</p>
              <h1 className='mb-2' >Create account</h1>
              <Link className=' bg-transparent text-cyan-700' href={"/log-in"} onClick={handleRemoveItemFromLocalStorage}>Already have an account?</Link>
            </div>
          </div>
        </div>
        <div className="right-signup-container">
          {children}
        </div>
      </section>
    </div>
  )
}


