import React from 'react'
import { ColorRing } from 'react-loader-spinner'

const Loading = () => {
    return (
        <div className="flex justify-center">
            <ColorRing
                height="160"
                width="160"
                ariaLabel="color-ring-loading"
                wrapperClass="color-ring-wrapper"
                colors={['#e15b64', '#f47e60', '#f8b26a', '#abbd81', '#849b87']}
            />
        </div>
    )
}

export default Loading