"use client"
import Miniloader from '@/app/components/Miniloader'
import { api_response } from '@/response/api_response'
import { elementAnimate } from '@/utils/elementAnimate'
import axios, { AxiosError } from 'axios'
import { useRouter, useSearchParams } from 'next/navigation'
import React, { useEffect, useState, Suspense } from 'react'
import toast from 'react-hot-toast'

function EnterVerifyCodeResetForm() {
    const [loading, setLoading] = useState(false)
    const [code, setCode] = useState("")
    const search_params = useSearchParams()
    const email = search_params.get("email")
    const router = useRouter()

    const resetVerifyCode = async () => {
        try {
            setLoading(true)
            await axios.post("/api/verify-reset-pass-code", {
                email,
                reset_code: code
            })
            toast.success("Verified successfully")
            router.push(`/forget-password/enter-pass-to-reset-verified?email=${email}`)
        } catch (error) {
            const axios_error = error as AxiosError<api_response>
            if (axios_error.response) {
                const status = axios_error.response.status
                switch (status) {
                    case 400:
                        toast.error(axios_error.response?.data.error || "Invalid")
                        break
                    case 401:
                        toast.error("Cannot access right now. Try again later.")
                        break
                    case 403:
                        toast.error("Verification code expired")
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
        }finally{
            setLoading(false)
        }
    }

    useEffect(() =>{
        elementAnimate(".hide-element", "visible-element")
    })

    return (
        <>
            {loading ? <Miniloader /> : ""}
            <div className='box-f-p hide-element animate-auth-transition'>
                <h1 className='text-white text-3xl'>Enter verification code</h1>
                <p className='text-white mt-5 text-[16px]'>We have sent you a verification code to your email to verify you before reseting password</p>
                <input className='input-f-p' type="text" onChange={(e) => setCode(e.target.value)} />
                <button onClick={resetVerifyCode} className='text-white py-3 w-full bg-green-700 text-[18px] font-medium rounded-md hover:bg-green-800 mt-1'>Verify</button>
            </div>
        </>
    )
}


export default function EnterVerifyCodeResetPage() {
    return <Suspense fallback={null}>
            <EnterVerifyCodeResetForm />
        </Suspense>
}