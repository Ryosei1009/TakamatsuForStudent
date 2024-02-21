import React, { useState } from 'react'
import FetchNews from "./FetchNews"
import UploadNews from '../uploads/UploadNews';

const News = () => {
    const [uploadOpen, setUploadOpen] = useState(false);

    const toggleUpload = () => {
        setUploadOpen(prevOpen => !prevOpen);
    };

    return (
        <>
            <div className="flex items-center justify-around mt-10">
                <p className="text-6xl font-bold">News</p>
                <button onClick={toggleUpload} className="text-2xl text-white px-6 py-3 rounded-xl border-2 bg-indigo-600 hover:bg-indigo-700">Upload</button>
            </div>
            <UploadNews isOpen={uploadOpen} />
            <div>
                <FetchNews />
            </div>
        </>
    )
}

export default News