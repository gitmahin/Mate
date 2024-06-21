"use client"
import { useSearchParams } from 'next/navigation'
import React from 'react'

export default function ChatMatePage() {

  const search_params = useSearchParams()
  const first_name = search_params.get("first_name")
  const last_name = search_params.get("last_name")

  return (
    <div className='chat-box'>
      <div className="chat-header">
        <h3 >{first_name} {last_name}</h3>
      </div>
      <div className="chat-monitor">

      </div>
      <div className="chat-input">
        <textarea name="chat" id="chat-text-area" placeholder='Message'></textarea>
        <button type='submit' id='send-message'><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="34" height="34" color="#000000" fill="#EC008C">
          <path d="M21.0477 3.05293C18.8697 0.707363 2.48648 6.4532 2.50001 8.551C2.51535 10.9299 8.89809 11.6617 10.6672 12.1581C11.7311 12.4565 12.016 12.7625 12.2613 13.8781C13.3723 18.9305 13.9301 21.4435 15.2014 21.4996C17.2278 21.5892 23.1733 5.342 21.0477 3.05293Z" stroke="currentColor" stroke-width="1.5" />
          <path d="M11.5 12.5L15 9" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
        </svg></button>
      </div>
    </div>
  )
}


