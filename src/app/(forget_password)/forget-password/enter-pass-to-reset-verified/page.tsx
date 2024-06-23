"use client"
import Miniloader from '@/app/components/Miniloader'
import { api_response } from '@/response/api_response'
import { forget_pass_z_schema } from '@/zod_schemas/forget_pass_z_schema'
import { zodResolver } from '@hookform/resolvers/zod'
import axios, { AxiosError } from 'axios'
import { useRouter, useSearchParams } from 'next/navigation'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { z } from 'zod'

export default function EnterPasswordResetPage() {
  const [loading, setLoading] = useState(false)
  const search_params = useSearchParams()
  const email = search_params.get("email")
  const router = useRouter()

  const { register, handleSubmit, formState: { errors } } = useForm<z.infer<typeof forget_pass_z_schema>>({
    resolver: zodResolver(forget_pass_z_schema),
    defaultValues: {
      password: "",
      confirm_password: ""
    }
  })

  const onSubmit = async (data: z.infer<typeof forget_pass_z_schema>) => {
    try {
      setLoading(true)
      await axios.post("/api/reset-password-v-u", {
        email,
        password: data.password
      })
      toast.success("Password updated")
      router.push(`/admin-area/personal-details`)
    } catch (error) {
      const axios_error = error as AxiosError<api_response>
      if (axios_error.response) {
        const status = axios_error.response.status
        switch (status) {
          case 400:
            toast.error("Invalid user")
            break
          case 401:
            toast.error("Cannot access right now. Try again later")
            break
            case 403:
            toast.error("Request timeout")
            break
          case 429:
            toast.error("Too many requests. Try again later")
            break
          case 503:
            toast.error("Server is under maintenance. Try again later")
            break
          default:
            toast.error("Something went wrong")
        }
      } else {
        toast.error("Connection lost")
      }
    } finally {
      setLoading(false)
    }
  }
  return (
    <div>
      {loading ? <Miniloader /> : ""}
      <h1 className='text-white text-3xl'>Reset your password</h1>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="enter-email-container">
          <div className="s-e-c-box">

            {/* passwords */}
            <p>New Password</p>
            <input required type="text" className='sign-up-input' {...register("password")} />
            <div className="confirm-pass-container">
              <p>Confirm password</p>
              <input required type="password" className='sign-up-input' {...register("confirm_password")} />
              {errors.confirm_password && <span className='error'>{errors.confirm_password.message}</span>}

            </div>

            {/* submit data to database */}
            <button disabled={loading ? true : false} className='text-white py-3 w-full bg-green-700 text-[18px] font-medium rounded-md hover:bg-green-800 mt-1' type='submit'>Reset Password</button>
          </div>
        </div>
      </form>
    </div>
  )
}


