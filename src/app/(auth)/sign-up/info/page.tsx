"use client"
import React, { useEffect, useState } from 'react'
import { v4 as uuidv4 } from 'uuid';
import { z } from "zod"
import { useRouter } from 'next/navigation';
import { elementAnimate } from '@/utils/elementAnimate';

const first_name_z_schema = z.string()
const last_name_z_schema = z.string().regex(/^[a-zA-Z\-]+$/)
const email_z_schema = z.string().email()

interface Errors {
  firstName: string,
  lastName: string,
  email: string
}

export default function infoPage() {
  const [email, setEmail] = useState("")
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [username, setUsername] = useState("")
  const [errors, setErrors] = useState<Errors>({ firstName: "", lastName: "", email: "" });
  const router = useRouter()


  useEffect(() => {
    elementAnimate(".hide-element", "visible-element")
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
    const first_name_validation = first_name_z_schema.safeParse(firstName)
    const last_name_validation = last_name_z_schema.safeParse(lastName)
    const email_validation = email_z_schema.safeParse(email)

    if (email && firstName && lastName != "") {
      if (!first_name_validation.success || !last_name_validation.success || !email_validation.success) {
        setErrors({
          firstName: first_name_validation.success ? "" : "Invalid name",
          lastName: last_name_validation.success ? "" : "Invalid name",
          email: email_validation.success ? "" : "Invalid email",
        })
      } else {
        localStorage.setItem("email", email)
        localStorage.setItem("firstName", firstName)
        localStorage.setItem("lastName", lastName)
        console.log("success")
        router.push(`/sign-up/password?username=${username}&email=${email}&firstName=${firstName}&lastName=${lastName}`)
      }

    }
  }

  return (
    <>
    <div className='sign-info-section hide-element animate-auth-transition'>
      <section className="sign-up-email-section">
        <h1 className='signup-heading' >Enter your email</h1>
        <div className="enter-email-container">

          <div className="s-e-c-box">
            <div className="name-field">
              <div className="firstName i_signup">
                <p>First name</p>
                <input type="text" required value={firstName} className='sign-up-name-input' onChange={(e) => setFirstName(e.target.value)} />
                {errors.firstName && <p className='error'>{errors.firstName}</p>}
              </div>

              <div className="lastname i_signup">
                <p>Last name</p>
                <input type="text" required value={lastName} className='sign-up-name-input' onChange={(e) => setLastName(e.target.value)} />
                {errors.lastName && <p className='error'>{errors.lastName}</p>}
              </div>
            </div>
            <div className="email i_signup">
              <p>Email</p>
              <input type="text" required={true} value={email} className='sign-up-input' onChange={(e) => setEmail(e.target.value)} />
              {errors.email && <p className='error'>{errors.email}</p>}

            </div>
            <button className='next-sign-u-p-btn' onClick={handleSaveItems}>Next</button>
            
          </div>
        </div>
      </section>
    </div>
    </>
  )
}


