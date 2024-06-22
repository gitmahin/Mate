"use client"
import { api_response } from '@/response/api_response';
import axios, { AxiosError } from 'axios'
import React, { useCallback, useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import Miniloader from "@/app/components/Miniloader"

interface User {
  email: string;
  first_name: string;
  last_name: string;
  username: string;
  created_at: string;
  is_verified: boolean;
}

export default function PersonalDetailsPage() {
  const [userData, setUserData] = useState<User | null>(null)
  const [userFound, setUserFound] = useState(true)
  const [createdDate, setCreatedDate] = useState("")
  const [createdTime, setCreatedTime] = useState("")
  const [loading, setLoading] = useState(true)

  const fetchAdminData = useCallback(async () => {
    try {
      setLoading(true)
      const response = await axios.get("/api/admin-details")
      setUserData(response.data.data)
      setUserFound(true)
    } catch (error) {
      setUserFound(false)
      const axiosError = error as AxiosError<api_response>
      if (axiosError.response) {
        const status = axiosError.response.status
        switch (status) {
          case 403:
            toast.error("Session expired")
            break;
          default:
            toast.error(axiosError.response.data.message ?? "Something went wrong");
        }

      }else{
        toast.error("Connection lost!")
      }

    }finally{
      setLoading(false)
    }

  }, [])


  useEffect(() => {
    fetchAdminData()
  }, [fetchAdminData])

  useEffect(() => {
    const dateString = `${userData?.created_at}`;
    // Regular expression to match the date and time parts
    const regex = /^(.*\d{4})\s(\d{2}:\d{2}:\d{2})/;

    const matches = dateString.match(regex);

    if (matches) {
      const datePart = matches[1]; 
      const timePart = matches[2]; 

      setCreatedDate(datePart)
      setCreatedTime(timePart)
    }
  }, [userData])

  return (
    <>
      <div className="admin-panel-right-dynamic-container relative">
        {loading ? <Miniloader/> : ""} 
        
        <div className="persona">
          {userFound == false ? <h1 className='text-red-600 text-3xl font-medium'>Unauthorized</h1> :

            <ul>
              <li className='bg-[#ffffff0e]'>
                <div className="name-display-admin">
                  <p className='label font-medium'>Name</p>
                  <p className='data font-medium'>{userData?.first_name} {userData?.last_name}</p>
                </div>
                <button className='text-[16px] text-white bg-[#ec008e3d] py-4 px-10 rounded-md'>Change name</button>
              </li>
              <li className='bg-[#ffffff0e]'>
                <div className="name-display-admin">
                  <p className='label font-medium'>Email</p>
                  <p className='data font-medium'>{userData?.email}</p>
                </div>
              </li>
              <li className={`bg-[#ffffff0e] ${userData?.is_verified ? "verified-li" : "not-verified-li"}`}>
                <div className="name-display-admin">
                  <p className='label font-medium'>Account status</p>
                  <p className={`data font-medium ${userData?.is_verified ? "verified-p" : "not-verified"}`}>{userData?.is_verified == true ? "Verified" : "Unverified"}</p>
                </div>
              </li>
              <li className='bg-[#ffffff0e]'>
                <div className="name-display-admin">
                  <p className='label font-medium'>Account created at</p>
                  <p className='data font-medium'>{createdDate} at {createdTime}</p>
                </div>
              </li>

            </ul>

          }
        </div>
      </div>
    </>
  )
}


