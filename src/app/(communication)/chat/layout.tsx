"use client"
import Header from '@/app/components/Header'
import Miniloader from '@/app/components/Miniloader'
import { api_response } from '@/response/api_response'
import axios, { AxiosError } from 'axios'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useCallback, useEffect, useState } from 'react'
import toast from 'react-hot-toast'

interface Users {
  first_name: string;
  last_name: string;
  username: string;
  email: string;
  created_at: string;
  is_verified: boolean
  _id: string

}

export default function ChatLayout({ children }: any) {

  const [users, setUsers] = useState<Users[]>([])
  const [loading, setLoading] = useState(false)
  const router = useRouter()

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

  useEffect(() => {
    getAllUsers()
  }, [getAllUsers])

  return (
    <>
    <Header/>
      <div className="chat-section mt-[80px]">
        <div className="chat-container">
          <div className="chat-list-menu relative">
            {loading ? <Miniloader/> : ""}
            <ul className="pl-2">
              {users.map((user) => {
                return <li key={user._id} onClick={() => {
                    router.push(`/chat/mate/${user.username}?first_name=${user.first_name}&last_name=${user.last_name}`)
                  }} className='rounded-md cursor-pointer' >
                    <h3>
                      {user.first_name} {user.last_name}
                    </h3>
                  </li>
              })}

            </ul>
          </div>
          <div className="chat-window">
            {children}
          </div>
        </div>
      </div>
    </>
  )
}