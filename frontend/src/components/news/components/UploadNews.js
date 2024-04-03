import { React, useEffect, useState } from 'react'
import { useAuth0 } from '@auth0/auth0-react';
import { fetchData, postData } from '../../../utils/DatabaseUtil';
import Modal from 'react-modal';
import Upload from './upload/Upload';
import Preview from './upload/Preview';
import ActionPerfect from '../../_util/ActionPerfect';

Modal.setAppElement("#root");

const UploadNews = ({ uploadOpen, setUploadOpen }) => {
    const [previewUrl, setPreviewUrl] = useState(null);
    const [date, setDate] = useState(Date.now());
    const { user } = useAuth0();
    const [eachAccount, setEachAccount] = useState({});
    useEffect(() => {
        fetchData('/api/accounts', setEachAccount, user, "e_mail", "email");
    }, [user]);

    const [uploadPerfect, setUploadPerfect] = useState(false);

    const [previewOpen, setPreviewOpen] = useState(false);

    const [formData, setFormData] = useState({
        title: '',
        text: '',
        image_1: '',
        created_by: eachAccount.naming,
        created_by_id: eachAccount.id
    });

    const handleChange = (event) => {
        setFormData((prevData) => ({
            ...prevData,
            created_by: eachAccount.naming,
            created_by_id: eachAccount.id,
        }))
        const { name, value } = event.target;
        setDate(Date.now());
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (!file.type.startsWith('image/')) {
            console.log(event.target.files[0].type)
            alert('画像ファイルを選択してください');
            return;
        };
        const fileLimit = 1024 * 1024 * process.env.REACT_APP_NEWS_SIZE_LIMIT;
        if (file.size > fileLimit) {
            alert(`ファイルサイズが大きすぎます。${process.env.REACT_APP_NEWS_SIZE_LIMIT}MB以下のファイルを選択してください。`);
            return
        }
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
        postData('/upload/news', formData, true, setUploadPerfect);
    };

    return (
        <>
            <Upload uploadOpen={uploadOpen} previewOpen={previewOpen} setUploadOpen={setUploadOpen} setPreviewOpen={setPreviewOpen} handleSubmit={handleSubmit} formData={formData} handleChange={handleChange} previewUrl={previewUrl} handleImageChange={handleImageChange} />
            <Preview previewOpen={previewOpen} setPreviewOpen={setPreviewOpen} formData={formData} previewUrl={previewUrl} date={date} eachAccount={eachAccount} />
            <ActionPerfect Perfect={uploadPerfect} onClose={() => window.location.reload()} title={"Perfect"} text={"ニュースの作成に成功しました。"} />
        </>
    )
}

export default UploadNews