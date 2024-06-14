'use client'

import React from 'react'

export default function verifyEmail(){

  return (
    <div>
      <section className="sign-up-email-section">
        <h1 className='signup-heading' >Verify your Email</h1>
          <form>
        <div className="enter-email-container">
            <div className="s-e-c-box">
              <p>Enter the code</p>
              <input required type="text" className='sign-up-input' />
              <button className='next-sign-u-p-btn'>Verify email</button>
            </div>
        </div>
          </form>
      </section>
    </div>
  )
}


