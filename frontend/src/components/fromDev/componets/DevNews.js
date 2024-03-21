import React, { Fragment, useEffect } from 'react'
import { useState } from 'react';
import { newLineUtil } from '../../../utils/TextUtil';
import { devNewsTimeFormat } from '../../../utils/TimeUtil';
import { MinusIcon, PlusIcon, TrashIcon } from '@heroicons/react/solid';
import { Disclosure, Popover, Transition } from '@headlessui/react'
import { useAuth0 } from '@auth0/auth0-react';
import { deleteData, fetchData } from '../../../utils/DatabaseUtil';
import UploadDevNews from './UploadDevNews';

export const itemType = (item) => {
    switch (item.type) {
        case 1:
            return (
                <p className="text-center text-base max-sm:text-sm font-bold bg-red-500 text-white px-4 py-1 rounded-lg min-w-16">
                    重要
                </p>
            );
        case 2:
            return (
                <p className="text-center text-base max-sm:text-sm font-bold bg-green-500 text-white px-4 py-1 rounded-lg min-w-20">
                    ニュース
                </p>
            );
        case 3:
            return (
                <p className="text-center text-base max-sm:text-sm font-bold bg-blue-500 text-white px-4 py-1 rounded-lg min-w-18">
                    更新情報
                </p>
            );
        case 4:
            return (
                <p className="text-center text-base max-sm:text-sm font-bold bg-orange-500 text-white px-4 py-1 rounded-lg min-w-16">
                    FAQ
                </p>
            );
        case 5:
            return (
                <p className="text-center text-base max-sm:text-sm font-bold bg-gray-500 text-white px-4 py-1 rounded-lg min-w-19">
                    その他
                </p>
            );
        default:
            return (
                <p className="text-center text-base max-sm:text-sm font-bold bg-gray-500 text-white px-4 py-1 rounded-lg min-w-19">
                    その他
                </p>
            );
    }
}

const DevNews = () => {
    const [newsLength, setNewsLength] = useState(3);

    const { user } = useAuth0();
    const [eachAccount, setEachAccount] = useState({});
    const [devNews, setDevNews] = useState([]);
    useEffect(() => {
        fetchData('/api/accounts', setEachAccount, user, "e_mail", "email");
        fetchData('/api/dev_news', setDevNews);
    }, [user])


    return (
        <>
            <div className="border-dotted border-t-2 border-black mx-16 max-md:mx-0 my-4">
                {devNews.slice().reverse().slice(0, newsLength).map((item) => (
                    <Disclosure key={item.id}>
                        {({ open }) => (
                            <div className="flex flex-col items-start max-sm:flex-col px-3 py-3 border-dotted border-b-2 border-black">
                                <Disclosure.Button className="flex items-center justify-between cursor-pointer w-full">
                                    <div className="flex items-center max-sm:flex-col max-sm:items-start">
                                        {itemType(item)}
                                        {/*
                                            1:重要
                                            2:ニュース
                                            3:blog
                                            4:FAQ
                                            5:その他
                                        */}
                                        <p className="text-lg font-bold ml-8 max-md:ml-3 max-sm:mt-1">{item.title}</p>
                                    </div>
                                    {open ? (
                                        <MinusIcon className="w-6"></MinusIcon>
                                    ) : (
                                        <PlusIcon className="w-6"></PlusIcon>
                                    )}
                                </Disclosure.Button>
                                <Disclosure.Panel className={`my-5 py-5 px-8 bg-black bg-opacity-10 w-full`}>
                                    {newLineUtil(item.text)}
                                    <div className="mt-2 flex justify-between">
                                        {devNewsTimeFormat(item.created_at)}
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
                                                        <div className="bg-gray-200 px-4 py-2 rounded-md shadow-md cursor-pointer hover:underline" onClick={() => deleteData(`/delete/dev_news/${item.id}`, '')}>
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
                ))}
                <div className="flex mt-3">
                    <div onClick={() => setNewsLength(newsLength + 3)} className="bg-orange-300 hover:bg-orange-500 rounded-xl px-4 py-2 cursor-pointer text-white font-bold">
                        More
                    </div>
                    {eachAccount.role === 0 && (
                        <>
                            <UploadDevNews />
                        </>
                    )}
                </div>
            </div>
        </>
    )
}

export default DevNews