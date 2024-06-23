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
          case 400:
            break;
          case 403:
            break;
          default:
            toast.error(axiosError.response.data.message ?? "Something went wrong");
        }

      } else {
        toast.error("Connection lost!")
      }

    } finally {
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
        {loading ? <Miniloader /> : ""}

        <div className="persona">
          {userFound == false ? <h1 className='text-red-600 text-3xl font-medium'>Unauthorized</h1> :

            <ul>
              <li className='bg-[#ffffff0e]'>
                <div className="name-display-admin">
                  <p className='label font-medium'>Name</p>
                  <p className='data font-medium'>{userData?.first_name} {userData?.last_name}</p>
                </div>
                <button className='text-[16px] text-white rounded-md'>

                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" color="#000000" fill="#ffffff">
                    <path d="M14.0737 3.88545C14.8189 3.07808 15.1915 2.6744 15.5874 2.43893C16.5427 1.87076 17.7191 1.85309 18.6904 2.39232C19.0929 2.6158 19.4769 3.00812 20.245 3.79276C21.0131 4.5774 21.3972 4.96972 21.6159 5.38093C22.1438 6.37312 22.1265 7.57479 21.5703 8.5507C21.3398 8.95516 20.9446 9.33578 20.1543 10.097L10.7506 19.1543C9.25288 20.5969 8.504 21.3182 7.56806 21.6837C6.63212 22.0493 5.6032 22.0224 3.54536 21.9686L3.26538 21.9613C2.63891 21.9449 2.32567 21.9367 2.14359 21.73C1.9615 21.5234 1.98636 21.2043 2.03608 20.5662L2.06308 20.2197C2.20301 18.4235 2.27297 17.5255 2.62371 16.7182C2.97444 15.9109 3.57944 15.2555 4.78943 13.9445L14.0737 3.88545Z" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round" />
                    <path d="M13 4L20 11" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round" />
                    <path d="M14 22L22 22" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                  </svg>

                </button>
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


