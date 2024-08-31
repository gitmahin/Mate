"use client"
import React, { useEffect, useState, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import axios, { AxiosError } from "axios"
import { any, z } from 'zod'
import { useForm } from "react-hook-form"
import { sign_up_z_schema } from '@/zod_schemas/sign_up_z_schema'
import { zodResolver } from '@hookform/resolvers/zod'
import toast from 'react-hot-toast'
import Loading from '@/app/components/Loading'
import { api_response } from '@/response/api_response'
import { elementAnimate } from '@/utils/elementAnimate'

function EnterPasswordForm() {

  // getting data from query
  const search_params = useSearchParams()
  const email = search_params.get("email")
  const first_name = search_params.get("firstName")
  const last_name = search_params.get("lastName")
  const username = search_params.get("username")
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  const goBack = () => {
    router.push("/sign-up/info")
  }

  // localstorage items
  const handleRemoveItemFromLocalStorage = () => {
    localStorage.removeItem("email")
    localStorage.removeItem("firstName")
    localStorage.removeItem("lastName")
  }

  const { register, handleSubmit, formState: { errors } } = useForm<z.infer<typeof sign_up_z_schema>>({
    resolver: zodResolver(sign_up_z_schema),
    defaultValues: {
      password: "",
      confirm_password: ""
    }
  })

  const onSubmit = async (data: z.infer<typeof sign_up_z_schema>) => {
    try {
      setLoading(true)
      await axios.post("/api/sign-up", {
        first_name,
        last_name,
        username,
        email,
        password: data.password
      })
      toast.success("Account created successfully")
      handleRemoveItemFromLocalStorage()
      router.push(`/sign-up/verify-email/${username}?email=${email}`)
    } catch (error) {
      const axios_error = error as AxiosError<api_response>
      if (axios_error.response) {
        const status = axios_error.response.status

        switch (status) {
          case 400:
            toast.error("User already existed")
            break
          case 500:
            toast.error("Error sending verification email")
            break
          case 503:
            toast.error("ERR CONNECTION TIMED OUT!")
            break
        }
      } else {
        toast.error("Connection lost")
      }
    } finally {
      setLoading(false)
    }
  }

  useEffect(() =>{
    elementAnimate(".hide-element", "visible-element")
  }, [])

  return (
    <>
    <section className='password-section hide-element animate-auth-transition'>
      {/* go back button */}
      <div className="back-btn" onClick={goBack}>
        <img src="../assets/back-btn.png" alt="" className='bg-transparent' />
      </div>


      <section className="sign-up-email-section">
        <h1 className='signup-heading' >Create your password</h1>

        {/* getting password */}
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="enter-email-container">
            <div className="s-e-c-box">

              {/* passwords */}
              <p>Password</p>
              <input required type="text" className='sign-up-input' {...register("password")} />
              <div className="confirm-pass-container">
                <p>Confirm password</p>
                <input required type="password" className='sign-up-input' {...register("confirm_password")} />
                {errors.confirm_password && <span className='error'>{errors.confirm_password.message}</span>}

              </div>

              {/* submit data to database */}
              <button disabled={loading ? true : false} className='next-sign-u-p-btn' type='submit'>Finish</button>
            </div>
          </div>
        </form>

        {/* loading state */}
        
      </section>
    </section>

    {loading ? <Loading /> : ""}
    </>
  )
}


export default function EnterPasswordPage() {
  return (
      // Wrapping the LogInForm with Suspense
      <Suspense >
          <EnterPasswordForm />
      </Suspense>
  )
}