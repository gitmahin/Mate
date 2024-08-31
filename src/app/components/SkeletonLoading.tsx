import React from 'react'
import Skeleton from 'react-loading-skeleton'

const SkeletonLoading = ({ cards }: any) => {
    return (
        <div>
            {Array.from({ length: cards }).map((_, i) => (
                <div key={i}>
                    <div className="skeleton_load">
                        <Skeleton style={{marginBottom: 5}} height={100}/>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default SkeletonLoading
