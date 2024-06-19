"use client"
import { useParams, useSearchParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'

export default function OneMatePage() {
    // getting data from dynamic segment
    const params = useParams<{ username: string }>()
    const [createdDate, setCreatedDate] = useState("")
    const [havePosts, setHavePosts] = useState(false)

    // getting data from query parameters
    const search_params = useSearchParams()
    const email = search_params.get("email")
    const first_name = search_params.get("first_name")
    const last_name = search_params.get("last_name")
    const created_at = search_params.get("created_at")
    const is_verified = search_params.get("is_verified")

    useEffect(() => {
        const dateString = `${created_at}`;

        // Regular expression to match the date and time parts
        const regex = /^(.*\d{4})\s(\d{2}:\d{2}:\d{2})/;

        const matches = dateString.match(regex);

        if (matches) {
            const datePart = matches[1];
            setCreatedDate(datePart)
        }
    }, [])


    return (
        <div>
            <div className="o-m-wrapper">
                <div className="o-m-container">
                    <div className="o-m-header">
                        <h1>{first_name} {last_name}</h1>
                        <button>
                            Add mate
                        </button>
                    </div>
                    <div className="o-m-main">
                        <div className="o-m-left">
                            <ul>
                                <li className='text-[#EC008C]'>{email}</li>
                                <li><span className='text-[#EC008C]'>Joined: </span><span className='text-gray-200'>{createdDate}</span></li>
                                <li className={`${is_verified === "true" ? "text-[#00FF85]" : "text-red-600"}`}>{is_verified === "true" ? "Verified" : "Unverified"}</li>
                            </ul>
                        </div>

                        {havePosts ? <div className="o-m-right p-5">
                            <div className="o-m-right-header">
                                <h2 className='text-white text-2xl font-semibold'>Posts</h2>
                            </div>
                        </div> : <div className="o-m-not-post p-5">
                            <h2 className='text-white text-2xl font-semibold'>No posts</h2>
                        </div> }
                        
                    </div>
                </div>
            </div>
        </div>
    )
}


