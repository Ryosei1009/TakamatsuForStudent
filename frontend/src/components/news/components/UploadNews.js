import { React, useEffect, useState } from 'react'
import { useAuth0 } from '@auth0/auth0-react';
import { newsListTimeFormat } from '../../../utils/TimeUtil';
import { PhotographIcon } from '@heroicons/react/solid';
import { fetchData, postData } from '../../../utils/DatabaseUtil';
import { newsListTruncateText } from '../../../utils/TextUtil';
import Modal from 'react-modal';

Modal.setAppElement("#root");

const UploadNews = () => {
    const [previewUrl, setPreviewUrl] = useState(null);
    const [date, setDate] = useState(Date.now());
    const { user } = useAuth0();
    const [eachAccount, setEachAccount] = useState({});
    useEffect(() => {
        fetchData('/api/accounts', setEachAccount, user, "e_mail", "email");
    }, [user]);

    const [previewOpen, setPreviewOpen] = useState(false);

    const handlePreviewOpen = () => {
        setPreviewOpen(!previewOpen);
        console.log(previewOpen)
    }

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
        postData('/upload/news', formData, true);
    };

    return (
        <>
            <div className="text-center border-8 bg-stone-300 pt-9 max-sm:pt-6 pb-12 px-16 max-sm:px-4 rounded-xl flex flex-col items-center border-green-500">
                <button
                    onClick={handlePreviewOpen}
                    className="bg-orange-400 text-white px-4 py-2 rounded-md hover:bg-orange-600 focus:outline-none mb-3"
                >
                    プレビュー表示
                </button>
                <form
                    onSubmit={handleSubmit}
                    className="flex flex-col gap-3 w-full"
                >
                    <input
                        type="text"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        maxLength={20} required placeholder="タイトル"
                        className="block w-full border border-gray-300 rounded-md px-3 py-2 mb-2 focus:outline-none focus:border-blue-500"
                    />

                    <textarea
                        type="text"
                        name="text"
                        value={formData.text}
                        onChange={handleChange}
                        required
                        placeholder="本文"
                        className="block w-full border border-gray-300 rounded-md px-3 py-2 mb-2 focus:outline-none focus:border-blue-500"
                    />
                    {previewUrl && (
                        <div>
                            <img src={previewUrl} alt="Preview" className="rounded-3xl duration-300 inline-block bg-bg-light" />
                        </div>
                    )}
                    <div className="flex justify-between">
                        <label htmlFor="file-upload" className="w-7/12 cursor-pointer bg-blue-500 hover:bg-blue-600 flex items-center text-white font-bold px-4 py-2 rounded-md">
                            <PhotographIcon className="w-6 mr-2" />
                            ファイルを選択
                        </label>
                        <input id="file-upload" type="file" accept="image/*" name="image_1" onChange={handleImageChange} className="hidden" required />
                        <button type="submit" className="w-4/12 text-white font-bold px-4 py-2 rounded-md bg-green-500 hover:bg-green-700 focus:bg-blue-600 focus:outline-none">作成</button>
                    </div>
                </form>
            </div>
            <Modal
                isOpen={previewOpen}
                onRequestClose={handlePreviewOpen}
                overlayClassName="fixed inset-0 bg-white bg-opacity-70 transition-opacity"
                className={`flex justify-center transition-opacity w-full top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 absolute outline-none bg-bg-light border-green-500 border-y-8 px-6`}
            >
                <div className="border-l-4 border-black max-sm:border-l-0 max-sm:pl-0 pl-10">
                    <div className="flex items-center max-sm:flex-col my-8 rounded-xl hover:opacity-90">
                        <div className="max-xl:w-1/2 w-2/5 max-sm:w-full">
                            <img src={previewUrl ? (previewUrl) : ("https://via.placeholder.com/960x540/?text=Select Image.")} alt="Preview" className='rounded-xl' />
                        </div>
                        <div className="max-md:w-2/5 w-1/2 ml-12 max-md:ml-0 max-sm:w-full max-sm:my-3">
                            <div className="flex items-end">
                                <p className="text-2xl">{newsListTimeFormat(date)}</p>
                                <p className="ml-6 text-lg">{eachAccount.naming}</p>
                            </div>
                            <p className="text-4xl max-md:text-2xl mt-5 max-sm:mt-2 ml-12 max-xl:ml-8 max-md:ml-6 max-sm:ml-4 font-bold">{formData.title}</p>
                            <p className="text-gray-600 leading-6 text-xl mt-5 max-sm:mt-2">{newsListTruncateText(formData.text)}</p>
                        </div>
                    </div>
                </div>
            </Modal>
        </>
    )
}

export default UploadNews