"use client"
import React, { useEffect, useState } from 'react'
import { v4 as uuidv4 } from 'uuid';
import Link from 'next/link'

export default function infoPage() {
  const [email, setEmail] = useState("")
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [username, setUsername] = useState("")


  useEffect(() => {
    setUsername(uuidv4())
    const retrieve_email = localStorage.getItem("email")
    const retrieve_first_name = localStorage.getItem("firstName")
    const retrieve_last_name = localStorage.getItem("lastName")
    if (retrieve_email && retrieve_first_name && retrieve_last_name) {
      setEmail(retrieve_email)
      setFirstName(retrieve_first_name)
      setLastName(retrieve_last_name)
    }
  }, [])

  const handleSaveItems = () => {

    if (email && firstName && lastName != "") {
      localStorage.setItem("email", email)
      localStorage.setItem("firstName", firstName)
      localStorage.setItem("lastName", lastName)
    }
  }

  return (
    <div>
      <section className="sign-up-email-section">
        <h1 className='signup-heading' >Enter your email</h1>
        <div className="enter-email-container">

          <div className="s-e-c-box">
            <div className="name-field">
              <div className="firstName">
                <p>First name</p>
                <input type="text" required value={firstName} className='sign-up-name-input' onChange={(e) => setFirstName(e.target.value)} />
              </div>

              <div className="lastname">
                <p>Last name</p>
                <input type="text" required value={lastName} className='sign-up-name-input' onChange={(e) => setLastName(e.target.value)} />

              </div>
            </div>
            <p>Email</p>
            <input type="text" required={true} value={email} className='sign-up-input' onChange={(e) => setEmail(e.target.value)} />
            <Link href={email && firstName && lastName != "" ? `/sign-up/password?username=${username}&email=${email}&firstName=${firstName}&lastName=${lastName}` : "#"}>
              <button className='next-sign-u-p-btn' onClick={handleSaveItems}>Next</button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}


