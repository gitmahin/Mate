"use client"
import React from 'react'

export default function LayoutForgetPassword({children}: any){
  return (
    <>
      <div className="forget-pass-wrapper w-full h-[100vh]">
        <div className="f-p-container w-full h-[fit-content] absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]">
            <div className="left-f-p">
                <h1 className='text-red-500 text-5xl font-semibold '>Forget password</h1>
                <img className='mate-logo-f-p' src="../../../assets/mate_logo.png" alt="" />
                <p className='text-white '>Bring people together</p>
            </div>
            <div className="right-f-p relative">
                {children}
            </div>
        </div>
      </div>
    </>
  )
}


