"use client"
import { api_response } from '@/response/api_response';
import axios, { AxiosError } from 'axios'
import React, { useCallback, useEffect, useState } from 'react'
import toast from 'react-hot-toast';
import Link from 'next/link';
import Miniloader from '@/app/components/Miniloader';

interface Users {
  first_name: string;
  last_name: string;
  username: string;
  email: string;
  created_at: string;
  is_verified: boolean
  _id: string

}


export default function FindMatesPage() {
  const [users, setUsers] = useState<Users[]>([])
  const [loading, setLoading] = useState(false)


  const getAllUsers = useCallback(async () => {
    try {
      setLoading(true)
      const response = await axios.get("/api/get-all-users")
      setUsers(response.data.data)
    } catch (error) {
      const axios_error = error as AxiosError<api_response>
      if (axios_error.response) {
        const status = axios_error.response.status
        switch (status) {
          case 503:
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
  }, [])

  useEffect(() =>{
    getAllUsers()
  }, [getAllUsers])



  return (
    <>
      <div>
        <div className="find-mate-wrapper">
          {loading ? <Miniloader/> : ""}
          <div className="find-mate-container">

            {users.map((users) => {
              return <Link key={users._id} href={`/find-mates/mate/${users.username}?first_name=${users.first_name}&last_name=${users.last_name}&email=${users.email}&created_at=${users.created_at}&is_verified=${users.is_verified}`}><div className="f-m-card">
                <h2 className="f-m-heading">
                  {users.first_name} {users.last_name}
                </h2>
                <button>
                  Add mate
                </button>
              </div></Link> 
            })}



          </div>
        </div>
      </div>
    </>
  )
}


