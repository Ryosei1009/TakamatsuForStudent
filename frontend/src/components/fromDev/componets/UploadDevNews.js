import { Dialog, Disclosure, Popover, Transition } from '@headlessui/react';
import React, { Fragment, useEffect, useState } from 'react'
import { fetchData, postData } from '../../../utils/DatabaseUtil';
import { itemType } from './DevNews';
import { newLineUtil } from '../../../utils/TextUtil';
import { useAuth0 } from '@auth0/auth0-react';
import { MinusIcon, PlusIcon, TrashIcon } from '@heroicons/react/solid';
import { devNewsTimeFormat } from '../../../utils/TimeUtil';

const UploadDevNews = () => {
    const [eachAccount, setEachAccount] = useState({});
    const { user } = useAuth0();
    useEffect(() => {
        fetchData('/api/accounts', setEachAccount, user, "e_mail", "email");
    }, [user]);

    const [uploadOpen, setUploadOpen] = useState(false);
    const [previewOpen, setPreviewOpen] = useState(false);
    const [formData, setFormData] = useState({
        type: '',
        title: '',
        text: ''
    });

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        console.log(formData)
        postData('/upload/dev_news', formData, false);
    }

    return (
        <>
            <button onClick={() => setUploadOpen(true)} className="ml-2 text-white rounded-xl px-4 py-2 cursor-pointer font-bold bg-purple-600 hover:bg-purple-700">
                ニュースを作成
            </button>

            <Transition appear show={uploadOpen} as={Fragment}>
                <Dialog as="div" className="relative z-10" onClose={() => setUploadOpen(false)}>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-black/25" />
                    </Transition.Child>

                    <div className="fixed inset-0 overflow-y-auto">
                        <div className="flex min-h-full items-center justify-center p-4 text-center">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 scale-95"
                                enterTo="opacity-100 scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 scale-100"
                                leaveTo="opacity-0 scale-95"
                            >
                                <Dialog.Panel className="w-96 text-center border-8 bg-stone-300 py-9 px-12 rounded-xl flex flex-col items-center border-purple-500">
                                    <form onSubmit={handleSubmit} className="w-full">
                                        <select
                                            name="type"
                                            value={formData.type}
                                            onChange={handleChange}
                                            required
                                            className="block w-full border border-gray-300 rounded-md px-3 py-2 mb-2 focus:outline-none focus:border-blue-500"
                                        >
                                            <option value="" disabled>選択してください。</option>
                                            <option value="1">重要</option>
                                            <option value="2">ニュース</option>
                                            <option value="3">更新情報</option>
                                            <option value="4">FAQ</option>
                                            <option value="5">その他</option>
                                        </select>
                                        <input value={formData.title} placeholder="タイトル" className="block w-full border border-gray-300 rounded-md px-3 py-2 mb-2 focus:outline-none focus:border-blue-500" type="text" name="title" onChange={handleChange} required />
                                        <textarea value={formData.text} placeholder="テキスト" className="block w-full border border-gray-300 rounded-md px-3 py-2 mb-2 focus:outline-none focus:border-blue-500" type="text" name="text" onChange={handleChange} required />
                                        <div className="flex justify-evenly">
                                            <div onClick={() => setPreviewOpen(true)} className="bg-orange-400 text-white font-bold px-4 py-2 rounded-md hover:bg-orange-600 focus:outline-none focus:bg-blue-600 cursor-pointer">プレビュー</div>
                                            <Transition appear show={previewOpen} as={Fragment}>
                                                <Dialog as="div" className="relative z-10" onClose={() => setPreviewOpen(false)}>
                                                    <Transition.Child
                                                        as={Fragment}
                                                        enter="ease-out duration-300"
                                                        enterFrom="opacity-0"
                                                        enterTo="opacity-100"
                                                        leave="ease-in duration-200"
                                                        leaveFrom="opacity-100"
                                                        leaveTo="opacity-0"
                                                    >
                                                        <div className="fixed inset-0 bg-black/25" />
                                                    </Transition.Child>
                                                    <div className="fixed inset-0 overflow-y-auto">
                                                        <div className="flex items-center min-h-full mx-72 max-2xl:mx-36 max-xl:mx-24 max-lg:mx-12 max-md:mx-8 max-sm:mx-3">
                                                            <Transition.Child
                                                                as={Fragment}
                                                                enter="ease-out duration-300"
                                                                enterFrom="opacity-0 scale-95"
                                                                enterTo="opacity-100 scale-100"
                                                                leave="ease-in duration-200"
                                                                leaveFrom="opacity-100 scale-100"
                                                                leaveTo="opacity-0 scale-95"
                                                            >
                                                                <Dialog.Panel className="border-8 w-full bg-stone-300 py-9 px-12 rounded-xl border-purple-500">
                                                                    <Disclosure>
                                                                        {({ open }) => (
                                                                            <div className="flex flex-col items-start max-sm:flex-col px-3 py-3 border-dotted border-y-2 border-black">
                                                                                <Disclosure.Button className="flex items-center justify-between cursor-pointer w-full">
                                                                                    <div className="flex items-center max-sm:flex-col max-sm:items-start">
                                                                                        {itemType(formData.type)}
                                                                                        <p className="text-lg font-bold ml-8 max-md:ml-3 max-sm:mt-1">{formData.title}</p>
                                                                                    </div>
                                                                                    {open ? (
                                                                                        <MinusIcon className="w-6"></MinusIcon>
                                                                                    ) : (
                                                                                        <PlusIcon className="w-6"></PlusIcon>
                                                                                    )}
                                                                                </Disclosure.Button>
                                                                                <Disclosure.Panel className={`my-5 py-5 px-8 bg-black bg-opacity-10 w-full`}>
                                                                                    {newLineUtil(formData.text)}
                                                                                    <div className="mt-2 flex justify-between">
                                                                                        {devNewsTimeFormat(Date.now())}
                                                                                        {eachAccount.role === 0 && (
                                                                                            <Popover className="relative">
                                                                                                <Popover.Button>
                                                                                                    <TrashIcon className="h-6 w-6 cursor-pointer fill-red-500"></TrashIcon>
                                                                                                </Popover.Button>
                                                                                                <Transition
                                                                                                    as={Fragment}
                                                                                                    enter="transition ease-out duration-200"
                                                                                                    enterFrom="opacity-0 translate-y-1"
                                                                                                    enterTo="opacity-100 translate-y-0"
                                                                                                    leave="transition ease-in duration-150"
                                                                                                    leaveFrom="opacity-100 translate-y-0"
                                                                                                    leaveTo="opacity-0 translate-y-1"
                                                                                                >
                                                                                                    <Popover.Panel className="absolute w-16">
                                                                                                        <div className="bg-gray-200 px-4 py-2 rounded-md shadow-md cursor-pointer hover:underline">
                                                                                                            削除
                                                                                                        </div>
                                                                                                    </Popover.Panel>
                                                                                                </Transition>
                                                                                            </Popover>
                                                                                        )}
                                                                                    </div>
                                                                                </Disclosure.Panel>
                                                                            </div>
                                                                        )}
                                                                    </Disclosure>
                                                                </Dialog.Panel>
                                                            </Transition.Child>
                                                        </div>
                                                    </div>
                                                </Dialog>
                                            </Transition>
                                            <button type="submit" className="bg-purple-500 text-white font-bold px-4 py-2 rounded-md hover:bg-purple-600 focus:outline-none focus:bg-blue-600">作成</button>
                                        </div>
                                    </form>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        </>
    )
}

export default UploadDevNews