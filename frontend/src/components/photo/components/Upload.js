import React, { useEffect, useState } from 'react'
import { fetchData, postData } from '../../../utils/DatabaseUtil';
import { useAuth0 } from '@auth0/auth0-react';
import ActionPerfect from '../../_util/ActionPerfect';

var selectedFile;

const Upload = () => {

    const [previewUrl, setPreviewUrl] = useState(null);
    const [eachAccount, setEachAccount] = useState({});
    const [imageDimensions, setImageDimensions] = useState({ width: 0, height: 0 });
    const [uploadPerfect, setUploadPerfect] = useState(false);

    const { user } = useAuth0();
    useEffect(() => {
        fetchData('/api/accounts', setEachAccount, user, "e_mail", "email");
    }, [user]);

    const [formData, setFormData] = useState({
        title: '',
        image_name: ''
    });

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (!file.type.startsWith('image/')) {
            if (!file.type.startsWith('video/')) {
                alert('画像または動画を選択してください。');
                return;
            }
        }
        const fileLimit = 1024 * 1024 * process.env.REACT_APP_PHOTO_SIZE_LIMIT;
        if (eachAccount.role !== 0) {
            if (file.size > fileLimit) {
                alert(`ファイルサイズが大きすぎます。${process.env.REACT_APP_PHOTO_SIZE_LIMIT}MB以下のファイルを選択してください。`);
                return
            }
        }
        setFormData((prevData) => ({
            ...prevData,
            image_name: file,
        }));

        if (file) {
            selectedFile = file;
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreviewUrl(reader.result);
            };
            reader.readAsDataURL(file);

            if (file.type.startsWith('image/')) {
                // 画像の処理
                const img = new Image();
                img.src = URL.createObjectURL(file);
                img.onload = () => {
                    setImageDimensions({ width: img.width, height: img.height });
                };
            } else if (file.type.startsWith('video/')) {
                // 動画の処理
                const video = document.createElement('video');
                video.src = URL.createObjectURL(file);
                video.onloadedmetadata = () => {
                    setImageDimensions({ width: video.videoWidth, height: video.videoHeight });
                };
            } else {
                console.error('Unsupported file type');
            }
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const formDataToSend = new FormData();
        formDataToSend.append('title', formData.title ? formData.title : selectedFile.name);
        formDataToSend.append('image_name', formData.image_name);
        formDataToSend.append('width', imageDimensions.width);
        formDataToSend.append('height', imageDimensions.height);
        formDataToSend.append('created_by', eachAccount.naming);
        formDataToSend.append('created_by_id', eachAccount.id);

        postData('/upload/photos', formDataToSend, true, setUploadPerfect);
    };

    return (
        <>
            <div className="ml-4 text-3xl font-bold">
                Upload Photo
            </div>
            <form onSubmit={handleSubmit} className="p-4 w-72">
                <input maxLength={20} type="text" name="title" value={formData.title} onChange={handleChange} placeholder="タイトル" className="block w-full border border-gray-300 rounded-md px-3 py-2 mb-2 focus:outline-none focus:border-blue-500" />
                {previewUrl && (
                    <div className="mb-2">
                        {selectedFile.type.startsWith('image/') ? (
                            <img src={previewUrl} alt="Preview" className="w-full h-auto rounded-md" />
                        ) : (
                            <video controls src={previewUrl} alt="Preview" className="w-full h-auto rounded-md" />
                        )}
                    </div>
                )}
                <label htmlFor="file-upload" className="block mb-2 cursor-pointer bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
                    ファイルを選択
                </label>
                <input id="file-upload" type="file" accept="image/*, video/*" name="image" onChange={handleImageChange} className="hidden" required />
                <button type="submit" className="bg-green-500 text-white font-bold px-4 py-2 rounded-md hover:bg-green-700 focus:outline-none focus:bg-blue-600">アップロード</button>
            </form>
            <ActionPerfect Perfect={uploadPerfect} onClose={() => window.location.reload()} title={"Perfect"} text={"写真のアップロードに成功しました。"} />
        </>
    )
}

export default Upload