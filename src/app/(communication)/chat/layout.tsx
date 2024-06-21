"use client"
import Header from '@/app/components/Header'
import Miniloader from '@/app/components/Miniloader'
import { api_response } from '@/response/api_response'
import axios, { AxiosError } from 'axios'
import Link from 'next/link'
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
            toast.error("Server is under maintenance. Please check back later")
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
            <ul>
              {users.map((user) => {
                return <Link key={user._id} href={`/chat/mate/${user.username}?first_name=${user.first_name}&last_name=${user.last_name}`}>
                  <li>
                    <h3>
                      {user.first_name} {user.last_name}
                    </h3>
                  </li>
                </Link>
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