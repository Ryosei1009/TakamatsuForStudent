import React, { useEffect, useState } from 'react'
import { useAuth0 } from '@auth0/auth0-react';
import { getAccountData } from '../../../utils/AccountUtil';
import axios from 'axios';

const UploadEvent = () => {
    const { user } = useAuth0();
    const [eachAccount, setEachAccount] = useState({});

    useEffect(() => {
        getAccountData(user, setEachAccount);
    }, [user]);

    const [formData, setFormData] = useState({
        date: '',
        title: '',
        text: '',
        color: ''
    })

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const formDataToSend = new FormData();
            formDataToSend.append('date', formData.date);
            formDataToSend.append('title', formData.title);
            formDataToSend.append('text', formData.text);
            formDataToSend.append('color', eachAccount.color);
            formDataToSend.append('created_by_id', eachAccount.id);

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
        <form onSubmit={handleSubmit} className="flex flex-col w-32 gap-3 ml-16">
            <input type="date" name="date" onChange={(event) => {console.log(event.target.value)}} />
            <input type="text" name="title" onChange={handleChange} />
            <textarea name="text" onChange={handleChange} ></textarea>
            <input type="color" name="color" onChange={handleChange} />
        </form>
    )
}

export default UploadEvent