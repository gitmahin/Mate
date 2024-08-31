"use client"
import React, { useEffect, useState, Suspense } from 'react'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import Loading from '@/app/components/Loading'
import { useForm } from "react-hook-form"
import { z } from 'zod'
import { log_in_z_schema } from '@/zod_schemas/log_in_z_schema'
import { zodResolver } from '@hookform/resolvers/zod'
import axios, { AxiosError } from 'axios'
import toast from 'react-hot-toast'
import { api_response } from '@/response/api_response'


function LogInForm() {
    const search_params = useSearchParams()
    const useremail = search_params.get("useremail")
    const [loading, setLoading] = useState(false)
    const router = useRouter()

    const { register, handleSubmit, setValue, formState: { errors } } = useForm<z.infer<typeof log_in_z_schema>>({
        resolver: zodResolver(log_in_z_schema),
        defaultValues: {
            email: "",
            password: ""
        }
    })


    useEffect(() => {
        if (useremail) {
            setValue("email", useremail)
        }
    }, [useremail])

    const onSubmit = async (data: z.infer<typeof log_in_z_schema>) => {
        try {
            setLoading(true)
            await axios.post("/api/log-in", data)
            router.push("/")
        } catch (error) {
            const axios_error = error as AxiosError<api_response>
            if (axios_error.response) {
                const status = axios_error.response.status

                switch (status) {
                    case 400:
                        toast.error("Invalid credentials")
                        break
                    case 403:
                        toast.error("Verify your email")
                        router.push(`/sign-up/verify-email/${axios_error.response.data.username}?email=${axios_error.response.data.email}`)
                        break
                    case 500:
                        toast.error("Error sending verification email")
                        break
                    case 503:
                        toast.error("ERR CONNECTION TIMED OUT!")
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
                        <p className='plus-icon plus-icon1'>+</p>
                        <p className='plus-icon plus-icon2'>+</p>
                        <p className='plus-icon plus-icon3'>+</p>
                        <p className='plus-icon plus-icon4'>+</p>
                        <div className="left-line"></div>
                        <div className="right-line"></div>
                        <div className="right-box">
                            <form onSubmit={handleSubmit(onSubmit)}>
                                <p>Email</p>
                                <input type="text" className='input' {...register("email")} />
                                <p>Password</p>
                                <input type="password" className='input' {...register("password")} />
                                <Link className='text-blue-600' href={"/forget-password/enter-email"}>Forgot password</Link>
                                <button type='submit' className='login-btn mt-5' >Log in</button>
                            </form>
                        </div>
                    </div>
                </section>


                <Link href={"/sign-up/info"}>
                    <button className="create-account-btn">Create account</button>
                </Link>

            </div>
            {loading ? <Loading /> : ""}
        </>
    )
}


export default function LogInPage() {
    return (
        <Suspense>
            <LogInForm />
        </Suspense>
    )
}

