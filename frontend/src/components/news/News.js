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
            <UploadNews uploadOpen={uploadOpen} setUploadOpen={setUploadOpen} />
        </>
    )
}

export default News