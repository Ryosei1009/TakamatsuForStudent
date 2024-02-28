import React, { useState } from 'react'
import NewsList from "./components/NewsList"
import UploadNews from './components/UploadNews';
import Modal from 'react-modal';

Modal.setAppElement("#root");

const News = () => {
    const [uploadOpen, setUploadOpen] = useState(false);

    const toggleUpload = () => {
        setUploadOpen(prevOpen => !prevOpen);
    };

    return (
        <>
            <div className="flex items-center justify-around mt-10">
                <p className="text-6xl font-bold">News</p>
                <button onClick={toggleUpload} className="text-2xl text-white px-6 py-3 rounded-xl border-2 bg-blue-600 hover:bg-blue-500">Upload</button>
            </div>
            <div>
                <NewsList />
            </div>


            <Modal
                isOpen={uploadOpen}
                onRequestClose={() => {
                    setUploadOpen(false);
                }}
                overlayClassName="fixed inset-0 bg-black bg-opacity-50 transition-opacity"
                className={`w-full max-w-240 bg-gray-100 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 absolute pt-14 pb-12 px-16 rounded-xl outline-none transition-opacity overflow-auto max-h-full m-auto`}
            >
                <UploadNews />
            </Modal>
        </>
    )
}

export default News