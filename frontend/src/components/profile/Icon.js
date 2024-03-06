import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react'
import { useAuth0 } from '@auth0/auth0-react';
import { fetchData } from '../../utils/DatabaseUtil';

const Icon = () => {
    const [previewUrl, setPreviewUrl] = useState(null);
    const [selectedFile, setSelectedFile] = useState(null);
    const fileInputRef = useRef(null);
    const { user } = useAuth0();
    const [eachAccount, setEachAccount] = useState({});
    useEffect(() => {
        fetchData('/api/accounts', setEachAccount, user, "email", ".email");
    }, [user]);

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (!file.type.startsWith('image/')) {
            console.log(event.target.files[0].type)
            alert('画像ファイルを選択してください');
            return;
        };
        const fileLimit = 1024 * 1024 * 1;
        if (file.size > fileLimit) {
          alert('ファイルサイズが大きすぎます。1MB以下のファイルを選択してください。');
          return
        }
        setSelectedFile(file);
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

            await axios.post(`${process.env.REACT_APP_API_DOMAIN}/upload/accounts/icon`, formData, {
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
                src={previewUrl ? previewUrl : eachAccount.icon_name === "" ? (`/images/accounts/default.jpeg`) : (`${process.env.REACT_APP_IMAGE_DOMAIN}/${eachAccount.icon_name}`)}
                alt="" />
            <div className="flex">
                <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-1 px-6 rounded" onClick={() => fileInputRef.current?.click()} >
                    ファイルを選択
                </button>
                <button onClick={handleUpload} className="bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-6 rounded inline-block ml-4">
                    更新
                </button>
            </div>
            <input accept="image/*" type="file" ref={fileInputRef} onChange={handleFileChange} className="hidden" />
        </div>
    )
}

export default Icon