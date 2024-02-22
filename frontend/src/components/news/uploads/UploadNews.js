import { React, useEffect, useState } from 'react'
import axios from 'axios';
import { useAuth0 } from '@auth0/auth0-react';
import { eachNewsTimeFormat } from '../../../utils/TimeUtil';
import { getAccountData } from '../../../utils/AccountUtil';

const UploadNews = ({ isOpen }) => {
    const [previewUrl, setPreviewUrl] = useState(null);
    const [date, setDate] = useState(Date.now());
    const { user } = useAuth0();
    const [eachAccount, setEachAccount] = useState({});

    useEffect(() => {
        getAccountData(user, setEachAccount);
    }, [user]);

    const [formData, setFormData] = useState({
        title: '',
        text: '',
        image_1: '',
        created_by: ''
    });

    const handleChange = (event) => {
        const { name, value } = event.target;
        setDate(Date.now());
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        setFormData((prevData) => ({
            ...prevData,
            image_1: file,
        }));
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreviewUrl(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const formDataToSend = new FormData();
            formDataToSend.append('title', formData.title);
            formDataToSend.append('text', formData.text);
            formDataToSend.append('image_1', formData.image_1);
            formDataToSend.append('created_by', eachAccount.naming);

            const response = await axios.post(`${process.env.REACT_APP_API_DOMAIN}/upload/news`, formDataToSend, {
                headers: {
                    'Content-Type': 'multipart/form-data', // Important for file upload
                },
            });
            console.log('Response from server:', response.data);
            alert('PERFECT!!!');
            window.location.reload();
        } catch (error) {
            console.error('Error uploading data:', error);
        }
    };

    return (
        <div
            className={`my-4 ${isOpen ? 'block' : 'hidden'}`}>
            <form onSubmit={handleSubmit} className="mx-72 px-8 py-8">
                <div className="text-5xl font-bold mb-10">
                    <input className="border-b-2 p-3 border-black block bg-white bg-opacity-40 rounded-t-xl w-full" type="text" name="title" value={formData.title} onChange={handleChange} maxLength={20} required placeholder="タイトル" />
                </div>
                <div className="text-xl mx-3">
                    <textarea className="bg-white bg-opacity-40 p-4 border-1 w-full rounded-xl h-96" type="text" name="text" value={formData.text} onChange={handleChange} required placeholder="本文" />
                    {previewUrl && (
                        <div>
                            <img src={previewUrl} alt="Preview" className="rounded-3xl my-4 duration-300 inline-block bg-bg-light" />
                        </div>
                    )}
                    <input type="file" accept="image/*" name="image_1" onChange={handleImageChange} className="" required />
                </div>
                <div className="text-info flex items-center justify-between">
                    <div>
                        {eachNewsTimeFormat(date)}
                        <span className="ml-4">
                            {eachAccount.naming}
                        </span>
                    </div>
                    <button type="submit" className="bg-indigo-600 hover:bg-indigo-700 text-white px-12 py-3 text-2xl rounded-lg hover:opacity-75">送信</button>
                </div>
            </form>
        </div >
    )
}

export default UploadNews