import React, { useEffect, useState } from 'react'
import Modal from 'react-modal';
import { useAuth0 } from '@auth0/auth0-react';
import { format } from 'date-fns';
import { eachNewsTimeFormat } from '../../../utils/TimeUtil';
import { newLineUtil } from '../../../utils/TextUtil';
import { CakeIcon, TrashIcon } from '@heroicons/react/solid';
import { fetchData, postData } from '../../../utils/DatabaseUtil';

Modal.setAppElement("#root");

const UploadEvent = ({ isOpen, onClose }) => {
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
            <Modal
                isOpen={isOpen}
                onRequestClose={onClose}
                overlayClassName="fixed inset-0 bg-white bg-opacity-70 transition-opacity"
                className={`transition-opacity w-full max-w-120 top-42/100 left-1/2 -translate-x-1/2 -translate-y-1/2 absolute outline-none`}
            >
                <div>
                    <CakeIcon className="w-8 absolute left-8 top-8 fill-orange-500 cursor-pointer hover:opacity-80" onClick={() => handleBirthday()} />
                </div>

                {showBirthday ? (
                    <div className="text-center border-8 bg-stone-300 pt-9 max-sm:pt-6 pb-12 px-16 max-sm:px-4 rounded-xl flex flex-col items-center border-gray-300"
                        style={{ borderColor: formData.color }}
                    >
                        <div className="flex items-end mb-6">
                            <div className="text-xl font-bold">
                                誕生日入力フォーム
                            </div>
                            <a href="./birthdaylist" target="_blank" className="text-xs ml-2 cursor-pointer hover:underline text-blue-500">
                                誕生日一覧
                            </a>
                        </div>
                        <div className="text-center pt-2 flex justify-start flex-col items-center w-18 h-24 bg-bg-light mb-4">
                            <div>
                                {formDate ? new Date(formDate).getDate() : 0}
                            </div>
                            <div
                                className="text-xs font-medium text-white w-18 h-6 p-1 rounded-lg hover:cursor-pointer"
                                style={{ backgroundColor: formData.color }}
                                onClick={() => handlePreview()}
                            >
                                {formData.title}
                            </div>
                        </div >
                        <form onSubmit={handleSubmit} className="flex flex-col gap-3 w-full">
                            <div className="flex gap-4">
                                <input className="block w-3/4 border border-gray-300 rounded-md px-3 py-2 mb-2 focus:outline-none focus:border-blue-500 cursor-text" type="date" name="date" onChange={handleDateChange} required />
                                <input value={formData.color} className="block w-1/4 h-12 border rounded-md focus:outline-none focus:border-blue-500 cursor-pointer" type="color" name="color" onChange={handleChange} required />
                            </div>
                            <input value={formData.title} id="title" placeholder="名前のみ推奨" className="block w-full border border-gray-300 rounded-md px-3 py-2 mb-2 focus:outline-none focus:border-blue-500" type="text" name="title" onChange={handleChange} required />
                            <textarea value={formData.text} placeholder="詳細" className="block w-full border border-gray-300 rounded-md px-3 py-2 mb-2 focus:outline-none focus:border-blue-500" name="text" onChange={handleChange} required ></textarea>
                            <button type="submit" className="bg-green-500 text-white font-bold px-4 py-2 rounded-md hover:bg-green-700 focus:outline-none focus:bg-blue-600">作成</button>
                        </form>
                    </div>
                ) : (
                    <div className="text-center border-8 bg-stone-300 pt-9 max-sm:pt-6 pb-12 px-16 max-sm:px-4 rounded-xl flex flex-col items-center border-gray-300"
                        style={{ borderColor: formData.color }}
                    >
                        <div className="text-center pt-2 flex justify-start flex-col items-center w-18 h-24 bg-bg-light mb-4">
                            <div>
                                {formDate ? new Date(formDate).getDate() : 0}
                            </div>
                            <div
                                className="text-xs font-medium text-white w-18 h-6 p-1 rounded-lg hover:cursor-pointer"
                                style={{ backgroundColor: formData.color }}
                                onClick={() => handlePreview()}
                            >
                                {formData.title}
                            </div>
                        </div >
                        <form onSubmit={handleSubmit} className="flex flex-col gap-3 w-full">
                            <div className="flex gap-4">
                                <input className="block w-3/4 border border-gray-300 rounded-md px-3 py-2 mb-2 focus:outline-none focus:border-blue-500 cursor-text" type="date" name="date" onChange={handleDateChange} required />
                                <input value={formData.color} className="block w-1/4 h-12 border rounded-md focus:outline-none focus:border-blue-500 cursor-pointer" type="color" name="color" onChange={handleChange} required />
                            </div>
                            <input value={formData.title} id="title" placeholder="タイトル" className="block w-full border border-gray-300 rounded-md px-3 py-2 mb-2 focus:outline-none focus:border-blue-500" type="text" name="title" onChange={handleChange} required />
                            <textarea value={formData.text} placeholder="詳細" className="block w-full border border-gray-300 rounded-md px-3 py-2 mb-2 focus:outline-none focus:border-blue-500" name="text" onChange={handleChange} required ></textarea>
                            <button type="submit" className="bg-green-500 text-white font-bold px-4 py-2 rounded-md hover:bg-green-700 focus:outline-none focus:bg-blue-600">作成</button>
                        </form>
                    </div>
                )}

            </Modal>

            <Modal
                isOpen={previewOpen}
                onRequestClose={handlePreview}
                overlayClassName="fixed inset-0 bg-white bg-opacity-70 transition-opacity"
                className={`transition-opacity w-full max-w-120 top-42/100 left-1/2 -translate-x-1/2 -translate-y-1/2 absolute outline-none`}
            >
                <div
                    className="text-center border-8 bg-gray-100 pt-12 max-sm:pt-8 pb-12 px-16 max-sm:px-4 rounded-xl"
                    style={{ borderColor: formData.color }}
                >
                    <div className="flex items-center">
                        <div className={`flex justify-center items-end w-full ${eachAccount.role <= 2 && "w-11/12"}`}>
                            <div className="text-3xl font-bold">
                                {formData.title}
                            </div>
                            <div className="flex flex-col items-start ml-4">
                                {format(new Date(parseInt(formDate)), 'MM月dd日') + "(" + WeekChars[new Date(parseInt(formDate)).getDay()] + ")"}
                            </div>
                        </div>
                        {eachAccount.role <= 2 && (
                            <div className="w-1/12">
                                <TrashIcon onClick={handleShowPopup} className="h-7 w-7 cursor-pointer fill-red-500" />
                                {showPopup && (
                                    <div className="cursor-pointer hover:underline hover:opacity-90 absolute z-10 bg-white border rounded shadow-sm py-2 px-4 text-red-500">
                                        削除
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                    <div className="border-y-2 border-black py-1 mt-1 mb-2">{newLineUtil(formData.text)}</div>
                    <div className="flex justify-between text-info text-xs">
                        <div>
                            作成者:
                            <a href={`../selfintroduction/${eachAccount.id}`} className="hover:underline">
                                {eachAccount.naming}
                            </a>
                        </div>
                        <div>
                            作成日時:
                            {eachNewsTimeFormat(Date.now())}
                        </div>
                    </div>
                </div>
            </Modal>
        </>
    )
}

export default UploadEvent