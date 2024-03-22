import React, { useEffect, useState } from 'react'
import Modal from 'react-modal';
import { useAuth0 } from '@auth0/auth0-react';
import { fetchData, postData } from '../../../utils/DatabaseUtil';
import Preview from './upload/Preview';
import Upload from './upload/Upload';

Modal.setAppElement("#root");

const UploadEvent = ({ uploadModalIsOpen, setUploadModalIsOpen }) => {
    const { user } = useAuth0();
    const [eachAccount, setEachAccount] = useState({});
    const [formDate, setFormDate] = useState(Date.now());
    const [previewOpen, setPreviewOpen] = useState(false);
    const [showPopup, setShowPopup] = useState(false);
    const [showBirthday, setShowBirthday] = useState(false);
    const WeekChars = ["日", "月", "火", "水", "木", "金", "土"];

    const handlePreview = () => {
        setPreviewOpen(!previewOpen);
    };

    const handleBirthday = () => {
        setShowBirthday(!showBirthday);
        setFormData((prevData) => ({
            ...prevData,
            text: showBirthday ? ('') : ('の誕生日です！みんなで祝いましょう！'),
            color: showBirthday ? (formData.color === '#32CD32' || formData.color === '#ffa500' ? ('#32CD32') : (formData.color)) : (formData.color === '#32CD32' || formData.color === '#ffa500' ? ('#ffa500') : (formData.color)),
        }));
    };

    const handleShowPopup = () => {
        setShowPopup(!showPopup);
    };

    useEffect(() => {
        fetchData('/api/accounts', setEachAccount, user, "e_mail", "email");
    }, [user]);

    const [formData, setFormData] = useState({
        date: formDate,
        title: '',
        text: '',
        color: '#32CD32',
        created_by: eachAccount.naming,
        created_by_id: eachAccount.id,
    })

    const handleChange = (event) => {
        setFormData((prevData) => ({
            ...prevData,
            date: formDate,
            created_by: eachAccount.naming,
            created_by_id: eachAccount.id,
        }))
        const { name, value } = event.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        postData('/upload/event', formData, false);
    };

    const handleDateChange = (event) => {
        var str = event.target.value;
        var array = str.split('-').map(Number);
        var date = new Date(array[0], array[1] - 1, array[2]);
        date = date.getTime();
        setFormDate(date);
    }

    return (
        <>
            <Upload uploadModalIsOpen={uploadModalIsOpen} previewOpen={previewOpen} setUploadModalIsOpen={setUploadModalIsOpen} handleBirthday={handleBirthday} formData={formData} showBirthday={showBirthday} formDate={formDate} handleSubmit={handleSubmit} handleDateChange={handleDateChange} handleChange={handleChange} handlePreview={handlePreview} />
            <Preview previewOpen={previewOpen} setPreviewOpen={setPreviewOpen} formData={formData} formDate={formDate} eachAccount={eachAccount} WeekChars={WeekChars} handleShowPopup={handleShowPopup} showPopup={showPopup} />
        </>
    )
}

export default UploadEvent