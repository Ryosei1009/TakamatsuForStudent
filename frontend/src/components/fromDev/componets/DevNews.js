import React from 'react'
import { useState } from 'react';
import { newLineUtil } from '../../../utils/TextUtil';
import DevNewsData from './DevNews.json';
import { devNewsTimeFormat } from '../../../utils/TimeUtil';
import { PlusIcon } from '@heroicons/react/solid';
import { Disclosure } from '@headlessui/react'

const DevNews = () => {
    const [newsLength, setNewsLength] = useState(3);

    const itemType = (item) => {
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
                        blog
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

    return (
        <div className="border-dotted border-t-2 border-black mx-16 max-md:mx-0 my-4">
            {DevNewsData.slice().reverse().slice(0, newsLength).map((item) => (
                <Disclosure key={item.id}>
                    {({ open }) => (
                        <div  className="flex flex-col items-start max-sm:flex-col px-3 py-3 border-dotted border-b-2 border-black">
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
                                <PlusIcon className="w-6"></PlusIcon>
                            </Disclosure.Button>
                            <Disclosure.Panel className={`my-5 py-5 px-8 bg-black bg-opacity-10 w-full`}>
                                {newLineUtil(item.text)}
                                <p className="mt-2">{devNewsTimeFormat(item.created_at)}</p>
                            </Disclosure.Panel>
                        </div>
                    )}
                </Disclosure>
            ))}
            <div className="flex mt-3" onClick={() => setNewsLength(newsLength + 3)}>
                <div className="bg-orange-300 hover:bg-orange-500 rounded-xl px-4 py-2 cursor-pointer text-white">
                    More
                </div>
            </div>
        </div>
    )
}

export default DevNews