import { Dialog, Transition } from '@headlessui/react'
import React, { Fragment } from 'react'

const ActionPerfect = ({ Perfect, onClose, title, text }) => {
    return (
        <Transition appear show={Perfect} as={Fragment}>
            <Dialog as="div" className="relative z-50" onClose={onClose}>
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-black opacity-30" />
                </Transition.Child>
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0">
                        <Dialog.Panel className="border-8 border-yellow-400 py-6 px-12 rounded-2xl flex flex-col items-center justify-center absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-bg-light">
                            <div className="text-2xl font-bold">
                                {title}
                            </div>
                            <div>
                                {text}
                            </div>
                        </Dialog.Panel>
                    </div>
                </Transition.Child>
            </Dialog>
        </Transition>
    )
}

export default ActionPerfect