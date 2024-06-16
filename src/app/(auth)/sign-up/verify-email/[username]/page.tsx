'use client'

import { elementAnimate } from '@/utils/elementAnimate'
import React, { useEffect, useState } from 'react'
import {useForm} from "react-hook-form"
import { zodResolver } from '@hookform/resolvers/zod'
import {z} from 'zod'
import { verify_code_z_schema } from '@/zod_schemas/verify_code_z_schema'
import axios, { AxiosError } from 'axios'
import { useParams, useRouter } from 'next/navigation'
import toast from 'react-hot-toast'
import { api_response } from '@/response/api_response'
import Loading from '@/app/components/Loading'

export default function verifyEmail() {
  const params = useParams<{username: string}>()
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  const {register, handleSubmit, formState: {errors}} = useForm<z.infer<typeof verify_code_z_schema>>({
    resolver: zodResolver(verify_code_z_schema),
    defaultValues: {
      code: ""
    }
  })

  useEffect(() => {
    elementAnimate(".hide-element", "visible-element")
  }, [])

  const onSubmit = async (data: z.infer<typeof verify_code_z_schema>) =>{
    try {
      setLoading(true)
      const response = await axios.post(`/api/verify-email`, {
        username: params.username,
        code: data.code
      })
      router.push(`/sign-up/welcome/${response.data.data}?useremail=${response.data.useremail}`)
      toast.success("User verified successfully")
    } catch (error) {
      const axios_error = error as AxiosError<api_response>

      if(axios_error.response){
        const status = axios_error.response.status

        switch(status){
          case 400:
            toast.error("Invalid code")
            break

          case 401:
            toast.error("User is not registered")
            break

          case 410:
            toast.error("Invalid code")
            break

          case 429:
            toast.error("Too many requests")
            break

          case 500:
            toast.error("ERR CONNECTION TIMED OUT")
            break
          
          default:
            toast.error("Something went wrong")
        }
      }else{
        toast.error("Connection lost")
      }
    }finally{
      setLoading(false)
    }
    
  }

  return (
    <>
      <div className='hide-element verify-section animate-auth-transition'>
        <section className="sign-up-email-section">
          <h1 className='signup-heading' >Verify your Email</h1>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="enter-email-container">
              <div className="s-e-c-box">
                <p>Enter the code</p>
                <input required type="text" className='sign-up-input' {...register("code")} />
                <button className='next-sign-u-p-btn'>Verify email</button>
              </div>
            </div>
          </form>
        </section>
      </div>
      {loading ? <Loading/> : ""}
    </>
  )
}


