import React from 'react'
import Header from '../components/Header'

const layout = ({ children }: any) => {
    return (
        <>
            <Header />
            <div className="main-section">
                {children}
            </div>
        </>
    )
}

export default layout
