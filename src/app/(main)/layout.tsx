import React from 'react'
import Header from '../components/Header'
import BottomMenu from '../components/BottomMenu'

const layout = ({ children }: any) => {
    return (
        <>
            <Header />
            <div className="main-section">
                {children}
            </div>
            <BottomMenu/>
        </>
    )
}

export default layout
