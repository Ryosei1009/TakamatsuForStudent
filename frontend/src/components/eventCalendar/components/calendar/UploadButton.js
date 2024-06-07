import React from 'react'

const UploadButton = ({ eachAccount, handleUploadModalClick }) => {
    return (
        <div className="flex items-center justify-center my-2">
            <button
                onClick={(eachAccount.role <= 2 || eachAccount.role === 4) ? () => handleUploadModalClick() : null}
                className="flex items-center justify-center text-white bg-blue-500 hover:bg-blue-600 focus:outline-none rounded-full h-10 w-10 bottom-10 right-10"
            >
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
            </button>
        </div>
    )
}

export default UploadButton