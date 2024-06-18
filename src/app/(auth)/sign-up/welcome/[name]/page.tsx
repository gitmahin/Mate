"use client"

import React, { useEffect } from 'react'
import { useParams } from 'next/navigation'
import { elementAnimate } from '@/utils/elementAnimate'
import { useSearchParams } from 'next/navigation'
import { useRouter } from 'next/navigation'

export default function WelcomePage(){

    const params = useParams<{name: string}>()
    const search_params = useSearchParams()
    const router = useRouter()
    const useremail = search_params.get("useremail")

    useEffect(() => {
        elementAnimate(".hide-element", "visible-element")
    }, [])

    const goToLogInPage = () =>{
        router.push(`/log-in?useremail=${useremail}`)
    }

  return (
    <>
      <div>
        <section className="welcome-section">
          <div className="welcome-container">
            <h2 className='gradient_name'>Hi {params.name}</h2>
            <p className='text-white text-2xl mt-5 second-p-animate'>Welcome to Mate</p>
            <p className='text-white text-xl mt-5 third-p-animate'>Now you can connect with friends, share your moments, and explore new interests.</p>
          </div>
        </section>
          <button onClick={goToLogInPage} className='go-to-login-btn'>Log in</button>
      </div>
    </>
  )
}


