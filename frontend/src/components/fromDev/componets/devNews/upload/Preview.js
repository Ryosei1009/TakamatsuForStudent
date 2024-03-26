import { Dialog, Disclosure, Popover, Transition } from '@headlessui/react'
import React, { Fragment } from 'react'
import { itemType } from '../News'
import { MinusIcon, PlusIcon, TrashIcon } from '@heroicons/react/solid'
import { newLineUtil } from '../../../../../utils/TextUtil'
import { devNewsTimeFormat } from '../../../../../utils/TimeUtil'

const PreviewBox = ({ formData, eachAccount }) => {
    return (
        <Disclosure>
            {({ open }) => (
                <>
                    <div className="flex flex-col items-start max-sm:flex-col px-3 py-3 border-dotted border-y-2 border-black">
                        <Disclosure.Button className="flex items-center justify-between cursor-pointer w-full">
                            <div className="flex items-center max-sm:flex-col max-sm:items-start">
                                {itemType(parseInt(formData.type))}
                                <p className="text-lg font-bold ml-8 max-md:ml-3 max-sm:mt-1">{formData.title}</p>
                            </div>
                            {open ? (
                                <MinusIcon className="w-6"></MinusIcon>
                            ) : (
                                <PlusIcon className="w-6"></PlusIcon>
                            )}
                        </Disclosure.Button>
                        <Disclosure.Panel className="my-5 py-5 px-8 bg-black bg-opacity-10 w-full">
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
                </>
            )}
        </Disclosure>
    )
}

const Preview = ({ previewOpen, setPreviewOpen, formData, eachAccount }) => {
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
                                <PreviewBox formData={formData} eachAccount={eachAccount} />
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition>
    )
}

export default Preview