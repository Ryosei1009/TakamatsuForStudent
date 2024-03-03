import React, { useEffect, useState } from 'react'
import Modal from 'react-modal';
import { useAuth0 } from '@auth0/auth0-react';
import { getAccountData } from '../../../utils/AccountUtil';
import axios from 'axios';

Modal.setAppElement("#root");

const UploadEvent = ({ isOpen, onClose }) => {
    const { user } = useAuth0();
    const [eachAccount, setEachAccount] = useState({});
    const [formDate, setFormDate] = useState();

    useEffect(() => {
        getAccountData(user, setEachAccount);
    }, [user]);

    const [formData, setFormData] = useState({
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
            formDataToSend.append('date', formDate);
            formDataToSend.append('title', formData.title);
            formDataToSend.append('text', formData.text);
            formDataToSend.append('color', formData.color);
            formDataToSend.append('created_by', eachAccount.naming);
            formDataToSend.append('created_by_id', eachAccount.id);

            const response = await axios.post(`${process.env.REACT_APP_API_DOMAIN}/upload/event`, formDataToSend, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            console.log('Response from server:', response.data);
            alert('PERFECT!!!');
            window.location.reload();
        } catch (error) {
            console.error('Error uploading data:', error);
        }
    };

    const handleDateChange = (event) => {
        var str = event.target.value;
        var array = str.split('-').map(Number);
        var date = new Date(array[0], array[1] - 1, array[2]);
        date = date.getTime();
        setFormDate(date);
    }

    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onClose}
            overlayClassName="fixed inset-0 bg-white bg-opacity-70 transition-opacity"
            className={`transition-opacity w-full max-w-120 top-42/100 left-1/2 -translate-x-1/2 -translate-y-1/2 absolute outline-none`}
        >
            <div className="text-center border-8 bg-stone-300 pt-9 max-sm:pt-6 pb-12 px-16 max-sm:px-4 rounded-xl flex flex-col items-center border-gray-300"
                style={{ borderColor: formData.color }}
            >
                <div className="text-center pt-2 flex justify-start flex-col items-center w-18 h-24 bg-bg-light mb-4">
                    <div>1</div>
                    <div
                        className="text-xs font-medium text-white w-18 h-6 p-1 rounded-lg hover:cursor-pointer"
                        style={{ backgroundColor: formData.color }}
                    >
                        {formData.title}
                    </div>
                </div >
                <form onSubmit={handleSubmit} className="flex flex-col gap-3 w-full">
                    <div className="flex gap-4">
                        <input className="block w-3/4 border border-gray-300 rounded-md px-3 py-2 mb-2 focus:outline-none focus:border-blue-500" type="date" name="date" onChange={handleDateChange} required />
                        <input value={formData.color} className="block w-1/4 h-12 border rounded-md focus:outline-none focus:border-blue-500" type="color" name="color" onChange={handleChange} required />
                    </div>
                    {formData.color && (
                        <>
                            <input value={formData.title} id="title" placeholder="タイトル" className="block w-full border border-gray-300 rounded-md px-3 py-2 mb-2 focus:outline-none focus:border-blue-500" type="text" name="title" onChange={handleChange} required />
                            <textarea value={formData.text} placeholder="詳細" className="block w-full border border-gray-300 rounded-md px-3 py-2 mb-2 focus:outline-none focus:border-blue-500" name="text" onChange={handleChange} required ></textarea>
                            <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-700 focus:outline-none focus:bg-blue-600">送信</button>
                        </>
                    )}

                </form>
            </div>
        </Modal>
    )
}

export default UploadEvent