import React, { useEffect, useState } from 'react'
import { fetchData, postData } from '../../../../utils/DatabaseUtil';
import { useAuth0 } from '@auth0/auth0-react';
import Upload from './upload/Upload';
import Preview from './upload/Preview';
import { Helmet, HelmetProvider } from 'react-helmet-async';

const UploadDevNews = () => {
    const [eachAccount, setEachAccount] = useState({});
    const { user } = useAuth0();
    useEffect(() => {
        fetchData('/api/accounts', setEachAccount, user, "e_mail", "email");
    }, [user]);

    const [uploadOpen, setUploadOpen] = useState(false);
    const [previewOpen, setPreviewOpen] = useState(false);
    const [formData, setFormData] = useState({
        type: '',
        title: '',
        text: ''
    });

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        console.log(formData)
        postData('/upload/dev_news', formData, false);
    }

    return (
        <>
            <HelmetProvider>
                <Helmet>
                    <title>
                        {uploadOpen ? "運営からのニュースを作成 - TCFS" : "運営から - TCFS"}
                    </title>
                </Helmet>
            </HelmetProvider>
            <button onClick={() => setUploadOpen(true)} className="ml-2 text-white rounded-xl px-4 py-2 cursor-pointer font-bold bg-purple-600 hover:bg-purple-700">
                ニュースを作成
            </button>

            <Upload uploadOpen={uploadOpen} previewOpen={previewOpen} setUploadOpen={setUploadOpen} setPreviewOpen={setPreviewOpen} formData={formData} handleChange={handleChange} handleSubmit={handleSubmit} />

            <Preview previewOpen={previewOpen} setPreviewOpen={setPreviewOpen} formData={formData} eachAccount={eachAccount} />
        </>
    )
}

export default UploadDevNews