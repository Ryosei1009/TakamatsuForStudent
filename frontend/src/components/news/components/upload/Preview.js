import { Dialog, Transition } from '@headlessui/react'
import React, { Fragment } from 'react'
import { newsListTimeFormat } from '../../../../utils/TimeUtil'
import { truncateText } from '../../../../utils/TextUtil'

const Preview = ({ previewOpen, setPreviewOpen, formData, previewUrl, date, eachAccount }) => {
    return (
        <Transition appear show={previewOpen} as={Fragment}>
            <Dialog as="div" className="relative z-20" onClose={() => setPreviewOpen(false)}>
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
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0 scale-95"
                        enterTo="opacity-100 scale-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100 scale-100"
                        leaveTo="opacity-0 scale-95"
                    >
                        <Dialog.Panel className="flex justify-center transition-opacity w-full top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 absolute outline-none bg-bg-light border-green-500 border-y-8">
                            <div className="mx-72 max-2xl:mx-36 max-xl:mx-24 max-lg:mx-12 max-md:mx-8 border-l-4 border-black max-sm:border-l-0 max-sm:pl-0 pl-10">
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
                                        <p className="text-gray-600 leading-6 text-xl mt-5 max-sm:mt-2">{truncateText(formData.text, 45)}</p>
                                    </div>
                                </div>
                            </div>
                        </Dialog.Panel>
                    </Transition.Child>
                </div>
            </Dialog>
        </Transition>
    )
}

export default Preview