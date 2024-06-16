import React from 'react'

export default function Loading() {
    return (
        <section className='loader-wrap'>
            <div className="loader">
                <div className="loader-logo" style={{ position: "absolute", bottom: "50px", left: "50px" }}>
                    <img src="../../../../../assets/mate_logo.png" style={{ width: "80px" }} alt="" />
                    <p className='text-white text-[12px] mt-1'>Bring people together</p>


                </div>
                <lord-icon
                    src="https://cdn.lordicon.com/jpgpblwn.json"
                    trigger="loop"
                    colors="primary:#ffffff"
                    state="loop-transparency"
                    class='loader-icon'
                >
                </lord-icon>
            </div>
        </section>
    )
}


