"use client"
import Miniloader from '@/app/components/Miniloader'
import { api_response } from '@/response/api_response'
import { elementAnimate } from '@/utils/elementAnimate'
import axios, { AxiosError } from 'axios'
import { useRouter } from 'next/navigation'
import React, { useCallback, useEffect, useState } from 'react'
import toast from 'react-hot-toast'

export default function EnterEmailToResetPass() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [loading, setLoading] = useState(false)
  const [isToken, setIsToken] = useState(true)

  const loginStatus = useCallback(async () => {
    try {
      await axios.post('/api/login-status')
      setIsToken(true)
    } catch (error) {
      setIsToken(false)
    }
  }, [])

  useEffect(() => {
    loginStatus()
    elementAnimate(".hide-element", "visible-element")
  }, [])

  const sendVerifyEmailResetPass = async () => {
    try {
      setLoading(true)
      const response = await axios.post("/api/verify-email-forget-password", {
        email: email
      })
      toast.success("Reset verification code sent")
      router.push(`/forget-password/enter-verify-code-reset-pass?email=${email || response.data.data}`)
    } catch (error) {
      const axios_error = error as AxiosError<api_response>
      if (axios_error.response) {
        const status = axios_error.response.status
        switch (status) {
          case 400:
            toast.error("Invalid user")
            break
          case 401:
            toast.error("You cannot change the password for 15 days from the last reset password day")
            break
          case 403:
            toast.error("Invalid request. Try again later")
            break
          case 429:
            toast.error("Too many requests. Try again later")
            break
          case 503:
            toast.error("Server is under maintenance")
            break
          case 500:
            toast.error("Failed to sending verification code")
            break
          default:
            toast.error("Something went wrong")
            break
        }
      } else {
        toast.error("Connection lost")
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      {loading ? <Miniloader /> : ""}
      <div className='box-f-p hide-element animate-auth-transition'>
        {isToken ? ""  : <><h1 className='text-white text-3xl'>Enter your email</h1>
          <input className='input-f-p' type="text" required onChange={(e) => setEmail(e.target.value)} /></>}    
        <button onClick={() => {
          sendVerifyEmailResetPass()
        }} className='text-white py-3 w-full bg-green-700 text-[18px] font-medium rounded-md hover:bg-green-800 mt-1'>Get verification code</button>
      </div>
    </>
  )
}


