"use client"
import React from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'

export default function enterPasswordPage() {

  // getting data from query
  const search_params = useSearchParams()
  const email = search_params.get("email")
  const firstName = search_params.get("firstName")
  const lastName = search_params.get("lastName")

  // localstorage items
  const handleRemoveItemFromLocalStorage = () => {
    localStorage.removeItem("email")
    localStorage.removeItem("firstName")
    localStorage.removeItem("lastName")
  }

  return (
    <div>
      <Link href={"/sign-up/info"}>
        <div className="back-btn">
          <img src="../assets/back-btn.png" alt="" className='bg-transparent' />
        </div>
      </Link>

      <section className="sign-up-email-section">
        <h1 className='signup-heading' >Create your password</h1>
        <form>
          <div className="enter-email-container">
            <div className="s-e-c-box">

              {/* passwords */}
              <p>Password</p>
              <input required type="text" className='sign-up-input' />
              <p>Confirm password</p>
              <input required type="password" className='sign-up-input' />

              {/* submit data to database */}
              <button className='next-sign-u-p-btn' onClick={() => {
                handleRemoveItemFromLocalStorage()
              }} >Finish</button>
            </div>
          </div>
        </form>
      </section>
    </div>
  )
}