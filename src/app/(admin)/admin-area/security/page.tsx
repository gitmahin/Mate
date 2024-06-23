"use client"
import Miniloader from '@/app/components/Miniloader'
import { api_response } from '@/response/api_response'
import { change_pass_z_schema } from '@/zod_schemas/change-pass-z-schema'
import { zodResolver } from '@hookform/resolvers/zod'
import axios, { AxiosError } from 'axios'
import React, { useCallback, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { z } from 'zod'
import Link from 'next/link'
import { formatDate } from '@/utils/date_formater'

interface GetSpecificTimes {
  last_password_changed: string,
  duration_of_next_reset_pass_request: string
}

export default function SecurityPage() {

  const [loading, setLoading] = useState(false)
  const [userData, setUserData] = useState<GetSpecificTimes | null>(null)

  const { register, handleSubmit, formState: { errors } } = useForm<z.infer<typeof change_pass_z_schema>>({
    resolver: zodResolver(change_pass_z_schema),
    defaultValues: {
      old_password: "",
      password: "",
      confirm_password: ""
    }
  })

  const fetchAdminData = useCallback(async () => {
    try {
      const response = await axios.get("/api/admin-details")
      setUserData(response.data.data)
    } catch (error) {
      const axiosError = error as AxiosError<api_response>
      if (axiosError.response) {
        const status = axiosError.response.status
        switch (status) {
          case 400:
            break;
          case 403:
            break;
          default:
            toast.error(axiosError.response.data.message ?? "Something went wrong");
            break
        }
      } else {
        toast.error("Connection lost!")
      }
    }

  }, [])


  useEffect(() => {
    fetchAdminData()
  }, [])

  const onSubmit = async (data: z.infer<typeof change_pass_z_schema>) => {
    try {
      setLoading(true)
      await axios.post("/api/update-password", {
        old_password: data.old_password,
        password: data.password
      })
      toast.success("Password updated")
    } catch (error) {
      const axios_error = error as AxiosError<api_response>
      if (axios_error.response) {
        const status = axios_error.response.status
        switch (status) {
          case 400:
            toast.error("Invalid old password")
            break
          case 401:
            toast.error("You cannot change the password for 15 days from the last reset password day")
            break
          case 403:
            break
          case 500:
            toast.error("Password update failed")
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
      <div className="change-password-container relative">
        {loading ? <Miniloader /> : ""}
        <form onSubmit={handleSubmit(onSubmit)}>
          <h2 className='text-white text-3xl font-semibold'>Change Password</h2>
          <p className='text-green-500 font-bold mt-4'>Last password changed <span className='text-white'>{formatDate(userData?.last_password_changed)}</span></p>
          <p className='text-red-600'>You cannot change your password before <span className='text-white'>{formatDate(userData?.duration_of_next_reset_pass_request)}</span> </p>
          <div className="enter-email-container">
            <div className="s-e-c-box">

              {/* passwords */}
              <p>Old Password</p>
              <input required type="text" className='sign-up-input' {...register("old_password")} />
              <Link className='text-blue-600' href={"/forget-password/enter-email"}>Forgot password</Link>
              <p className='mt-5'>New Password</p>
              <input required type="text" className='sign-up-input' {...register("password")} />
              <div className="confirm-pass-container">
                <p>Confirm password</p>
                <input required type="password" className='sign-up-input' {...register("confirm_password")} />
                {errors.confirm_password && <span className='error'>{errors.confirm_password.message}</span>}
              </div>

              {/* submit data to database */}
              <button disabled={loading ? true : false} className='w-full bg-[#30cb78] hover:bg-[#38ff95a9] py-3 rounded-md text-white font-semibold mb-9' type='submit'>Change Password</button>
            </div>
          </div>
        </form>
      </div>
    </>
  )
}


