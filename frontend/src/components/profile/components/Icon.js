import React, { useRef, useState } from 'react'
import { postData } from '../../../utils/DatabaseUtil';
import ActionPerfect from '../../_util/ActionPerfect';

const Icon = ({ eachAccount }) => {
    const [previewUrl, setPreviewUrl] = useState(null);
    const [selectedFile, setSelectedFile] = useState(null);
    const fileInputRef = useRef(null);
    const [uploadPerfect, setUploadPerfect] = useState(false);

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (!file.type.startsWith('image/')) {
            alert('画像ファイルを選択してください');
            return;
        };
        const fileLimit = 1024 * 1024 * process.env.REACT_APP_ICON_SIZE_LIMIT;
        if (file.size > fileLimit) {
            alert(`ファイルサイズが大きすぎます。${process.env.REACT_APP_ICON_SIZE_LIMIT}MB以下のファイルを選択してください。`);
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
        const formData = new FormData();
        formData.append('icon_name', selectedFile);
        formData.append('id', eachAccount.id);

        postData('/upload/accounts/icon', formData, true, setUploadPerfect);
    };
    return (
        <>
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
            <ActionPerfect Perfect={uploadPerfect} onClose={() => window.location.reload()} title={"Perfect"} text={"アイコンの更新に成功しました。"} />
        </>
    )
}

export default Icon