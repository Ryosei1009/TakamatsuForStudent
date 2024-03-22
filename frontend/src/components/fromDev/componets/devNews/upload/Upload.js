import { Dialog, Transition } from '@headlessui/react'
import React, { Fragment } from 'react'

const Upload = ({ uploadOpen, previewOpen, setUploadOpen, setPreviewOpen, formData, handleChange, handleSubmit }) => {
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
                                    <input value={formData.title} maxLength={32} placeholder="タイトル" className="block w-full border border-gray-300 rounded-md px-3 py-2 mb-2 focus:outline-none focus:border-blue-500" type="text" name="title" onChange={handleChange} required />
                                    <textarea value={formData.text} placeholder="テキスト" className="block w-full border border-gray-300 rounded-md px-3 py-2 mb-2 focus:outline-none focus:border-blue-500" type="text" name="text" onChange={handleChange} required />
                                    <div className="flex justify-evenly">
                                        <div onClick={() => setPreviewOpen(true)} className="bg-orange-400 text-white font-bold px-4 py-2 rounded-md hover:bg-orange-600 focus:outline-none focus:bg-blue-600 cursor-pointer">プレビュー</div>
                                        <button type="submit" className="bg-purple-500 text-white font-bold px-4 py-2 rounded-md hover:bg-purple-600 focus:outline-none focus:bg-blue-600">作成</button>
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