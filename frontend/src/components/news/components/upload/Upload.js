import { Dialog, Transition } from '@headlessui/react'
import { PhotographIcon } from '@heroicons/react/solid'
import React, { Fragment } from 'react'

const Upload = ({ uploadOpen, previewOpen, setUploadOpen, setPreviewOpen, handleSubmit, formData, handleChange, previewUrl, handleImageChange }) => {
    return (
        <Transition appear show={uploadOpen} as={Fragment}>
            <Dialog as="div" className="relative z-10" onClose={() => !previewOpen && (setUploadOpen(false))}>
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
                            <Dialog.Panel className="text-center border-8 bg-stone-300 pt-9 max-sm:pt-6 pb-12 px-16 max-sm:px-4 rounded-xl flex flex-col items-center border-green-500">
                                <button
                                    onClick={() => setPreviewOpen(true)}
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
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition>
    )
}

export default Upload