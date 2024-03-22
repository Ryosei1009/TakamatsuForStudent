import { Dialog, Transition } from '@headlessui/react'
import { CakeIcon } from '@heroicons/react/solid'
import React, { Fragment } from 'react'

const Upload = ({ uploadModalIsOpen, previewOpen, setUploadModalIsOpen, handleBirthday, formData, showBirthday, formDate, handleSubmit, handleDateChange, handleChange, handlePreview }) => {
    return (
        <Transition appear show={uploadModalIsOpen} as={Fragment}>
            <Dialog as="div" className="relative z-10" onClose={() => !previewOpen && (setUploadModalIsOpen(false))}>
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
                <div className="fixed inset-0">
                    <div className="transition-opacity w-full max-w-120 top-42/100 left-1/2 -translate-x-1/2 -translate-y-1/2 absolute outline-none">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 scale-95"
                            enterTo="opacity-100 scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 scale-100"
                            leaveTo="opacity-0 scale-95"
                        >
                            <Dialog.Panel>
                                <div>
                                    <CakeIcon className="w-8 absolute left-8 top-8 fill-orange-500 cursor-pointer hover:opacity-80" onClick={() => handleBirthday()} />
                                </div>
                                <div className="text-center border-8 bg-stone-300 pt-9 max-sm:pt-6 pb-12 px-16 max-sm:px-4 rounded-xl flex flex-col items-center border-gray-300"
                                    style={{ borderColor: formData.color }}
                                >
                                    {showBirthday ? (
                                        <div className="flex items-end mb-6">
                                            <div className="text-xl font-bold">
                                                誕生日入力フォーム
                                            </div>
                                            <a href="./birthdaylist" target="_blank" className="text-xs ml-2 cursor-pointer hover:underline text-blue-500">
                                                誕生日一覧
                                            </a>
                                        </div>
                                    ) : (
                                        <div className="flex items-end mb-6">
                                            <div className="text-xl font-bold">
                                                イベント入力フォーム
                                            </div>
                                        </div>
                                    )}
                                    <div className="text-center pt-2 flex justify-start flex-col items-center w-18 h-24 bg-bg-light mb-4">
                                        <div>
                                            {formDate ? new Date(formDate).getDate() : 0}
                                        </div>
                                        <div
                                            className="text-xs font-medium text-white w-18 h-6 p-1 rounded-lg hover:cursor-pointer"
                                            style={{ backgroundColor: formData.color }}
                                            onClick={() => handlePreview()}
                                        >
                                            <div className="overflow-hidden">
                                                {formData.title}
                                            </div>
                                        </div>
                                    </div >
                                    <form onSubmit={handleSubmit} className="flex flex-col gap-3 w-full">
                                        <div className="flex gap-4">
                                            <input className="block w-3/4 border border-gray-300 rounded-md px-3 py-2 mb-2 focus:outline-none focus:border-blue-500 cursor-text" type="date" name="date" onChange={handleDateChange} required />
                                            <input value={formData.color} className="block w-1/4 h-12 border rounded-md focus:outline-none focus:border-blue-500 cursor-pointer" type="color" name="color" onChange={handleChange} required />
                                        </div>
                                        <input value={formData.title} id="title" placeholder={showBirthday ? (`名前のみ推奨`) : (`タイトル`)} className="block w-full border border-gray-300 rounded-md px-3 py-2 mb-2 focus:outline-none focus:border-blue-500" type="text" name="title" onChange={handleChange} required />
                                        <textarea value={formData.text} placeholder="詳細" className="block w-full border border-gray-300 rounded-md px-3 py-2 mb-2 focus:outline-none focus:border-blue-500" name="text" onChange={handleChange} required ></textarea>
                                        <button type="submit" className="bg-green-500 text-white font-bold px-4 py-2 rounded-md hover:bg-green-700 focus:outline-none focus:bg-blue-600">作成</button>
                                    </form>
                                </div>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition>
    )
}

export default Upload