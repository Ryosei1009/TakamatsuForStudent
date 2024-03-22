import { Dialog, Transition } from '@headlessui/react'
import { format } from 'date-fns'
import React, { Fragment } from 'react'
import { eachNewsTimeFormat } from '../../../../utils/TimeUtil'
import { TrashIcon } from '@heroicons/react/solid'
import { newLineUtil } from '../../../../utils/TextUtil'

const Preview = ({ previewOpen, setPreviewOpen, formData, formDate, eachAccount, WeekChars, handleShowPopup, showPopup }) => {
    return (
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
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition>
    )
}

export default Preview