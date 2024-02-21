import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react'
import { getAccountData } from '../../../utils/AccountUtil';
import { useAuth0 } from '@auth0/auth0-react';

const Icon = () => {
    const [previewUrl, setPreviewUrl] = useState(null);
    const [selectedFile, setSelectedFile] = useState(null);
    const fileInputRef = useRef(null);
    const { user } = useAuth0();
    const [eachAccount, setEachAccount] = useState({});
    useEffect(() => {
        getAccountData(user, setEachAccount);
    }, [user]);

    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreviewUrl(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleUpload = async () => {
        if (fileInputRef.current.value === "") {
            console.error("Select the image file");
            return;
        }
        try {
            const formData = new FormData();
            formData.append('icon_name', selectedFile);
            formData.append('id', eachAccount.id);

            await axios.post('/upload/accounts/icon', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

        } catch (error) {
            console.error('アップロードエラー:', error);
        } finally {
            if (fileInputRef.current) {
                fileInputRef.current.value = '';
            }
            setSelectedFile(null);
            alert('PERFECT!!!');
            window.location.reload();
        }
    };
    return (
        <div className="flex flex-col mb-2">
            <div className="font-bold mb-1">
                プロフィールアイコン
            </div>
            <img
                className="border-black border-2 p-1 rounded-md w-48 mb-1"
                src={previewUrl ? previewUrl : eachAccount.icon_name === "" ? (`http://localhost:8000/images/accounts/default.jpeg`) : (`http://localhost:8000/${eachAccount.icon_name}`)}
                alt={user.name} />
            <div className="flex">
                <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-1 px-6 rounded" onClick={() => fileInputRef.current?.click()} >
                    ファイルを選択
                </button>
                <button onClick={handleUpload} className="bg-green-600 hover:bg-green-700 text-white font-bold py-1 px-6 rounded inline-block ml-4">
                    更新
                </button>
            </div>
            <input accept="image/*" type="file" ref={fileInputRef} onChange={handleFileChange} className="hidden" />
        </div>
    )
}

export default Icon