import React from 'react'
import Link from 'next/link'

export default function BottomMenu() {
    return (
        <div className='bottom-menu'>
            <div>
                <lord-icon
                    src="https://cdn.lordicon.com/ayhtotha.json"
                    trigger="hover"
                    colors="primary:#ffffff"
                    target='div'
                >
                </lord-icon>
            </div>
            <Link href={"/admin-area/personal-details"}>
                <div>
                    <lord-icon
                        src="https://cdn.lordicon.com/hrjifpbq.json"
                        trigger="hover"
                        colors="primary:#ffffff"
                        target='div'
                    >
                    </lord-icon>
                </div>
            </Link>
        </div>
    )
}


