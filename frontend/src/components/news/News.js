import React, { useState } from 'react'
import NewsList from "./components/NewsList"
import UploadNews from './components/UploadNews';
import Modal from 'react-modal';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import Header from './components/Header';

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
            
            <Header toggleUpload={toggleUpload} />
            <NewsList />
            <Modal isOpen={uploadOpen} onRequestClose={() => { setUploadOpen(false); }} overlayClassName="fixed inset-0 bg-white bg-opacity-70 transition-opacity" className={`transition-opacity w-full max-w-120 top-42/100 left-1/2 -translate-x-1/2 -translate-y-1/2 absolute outline-none`}>
                <UploadNews />
            </Modal>
        </>
    )
}

export default News