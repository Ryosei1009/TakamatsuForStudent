import { Disclosure, Popover, Transition } from '@headlessui/react'
import React, { Fragment } from 'react'
import { itemType } from './News'
import { MinusIcon, PlusIcon, TrashIcon } from '@heroicons/react/solid'
import { deleteData } from '../../../../utils/DatabaseUtil'
import { devNewsTimeFormat } from '../../../../utils/TimeUtil'
import { newLineUtil } from '../../../../utils/TextUtil'

const EachNews = ({ devNews, newsLength, eachAccount }) => {
    return (
        <>
            {devNews.slice().reverse().slice(0, newsLength).map((item) => (
                <Disclosure key={item.id}>
                    {({ open }) => (
                        <div className="flex flex-col items-start max-sm:flex-col px-3 py-3 border-dotted border-b-2 border-black">
                            <Disclosure.Button className="flex items-center justify-between cursor-pointer w-full">
                                <div className="flex items-center max-sm:flex-col max-sm:items-start">
                                    {itemType(item.type)}
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
                                            <Popover.Button className="focus:outline-none">
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
        </>
    )
}

export default EachNews