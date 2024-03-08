import React, { useState } from 'react'
import NewsList from "./components/NewsList"
import UploadNews from './components/UploadNews';
import Modal from 'react-modal';
import { Helmet, HelmetProvider } from 'react-helmet-async';

Modal.setAppElement("#root");

const News = () => {
    const [uploadOpen, setUploadOpen] = useState(false);

    const toggleUpload = () => {
        setUploadOpen(prevOpen => !prevOpen);
    };

    return (
        <>
            <HelmetProvider>
                <Helmet>
                    <title>
                        {uploadOpen ? (
                            "Upload News "
                        ) : (
                            "News List "
                        )}
                        - TCFS
                    </title>
                </Helmet>
            </HelmetProvider>

            <div className="flex items-center justify-around mt-10">
                <p className="text-6xl max-md:text-4xl font-bold">News</p>
                <button onClick={toggleUpload} className="text-xl max-md:text-base font-bold text-white px-4 py-2 rounded-xl border-2 bg-green-500 hover:bg-green-700">ニュースを作成</button>
            </div>
            <NewsList />
            <Modal
                isOpen={uploadOpen}
                onRequestClose={() => {
                    setUploadOpen(false);
                }}
                overlayClassName="fixed inset-0 bg-white bg-opacity-70 transition-opacity"
                className={`transition-opacity w-full max-w-120 top-42/100 left-1/2 -translate-x-1/2 -translate-y-1/2 absolute outline-none`}
            >
                <UploadNews />
            </Modal>
        </>
    )
}

export default News