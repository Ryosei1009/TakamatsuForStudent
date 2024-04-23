import React, { Fragment, useEffect, useState } from 'react'
import { TrashIcon } from '@heroicons/react/solid';
import { deleteData, fetchData } from '../../../utils/DatabaseUtil';
import { useAuth0 } from '@auth0/auth0-react';
import Modal from 'react-modal';
import { Dialog, Popover, Transition } from '@headlessui/react';
import ActionPerfect from '../../_util/ActionPerfect';

Modal.setAppElement("#root");

const EachPhoto = ({ modalIsOpen, selectedPhoto, setModalIsOpen, handleShowPopupClick, showPopup, width, height }) => {
    const { user } = useAuth0();
    const [eachAccount, setEachAccount] = useState({});
    useEffect(() => {
        fetchData('/api/accounts', setEachAccount, user, "e_mail", "email");
    }, [user]);
    const [deletePerfect, setDeletePerfect] = useState(false);

    return (
        <>
            <Transition appear show={modalIsOpen} as={Fragment}>
                <Dialog as="div" className="relative z-20" onClose={() => setModalIsOpen(false)}>
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
                            <Dialog.Panel className="h-auto max-h-90vh w-90vw flex justify-center transition-opacity top-58/100 left-1/2 -translate-x-1/2 -translate-y-1/2 absolute outline-none">
                                <div className="text-4xl font-bold mb-2 absolute -top-12 left-3">{selectedPhoto.title}</div>
                                {parseInt(eachAccount.id) === selectedPhoto.created_by_id || parseInt(eachAccount.role) <= 2 ? (
                                    <Popover className="absolute right-6">
                                        <Popover.Button className="focus:outline-none">
                                            <TrashIcon className="h-7 w-7 cursor-pointer fill-red-500"></TrashIcon>
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
                                                <div className="bg-gray-200 px-4 py-2 rounded-md shadow-md cursor-pointer hover:underline" onClick={() => deleteData(`/delete/photos/${selectedPhoto.id}`, setDeletePerfect)}>
                                                    削除
                                                </div>
                                            </Popover.Panel>
                                        </Transition>
                                    </Popover>
                                ) : ("")}
                                <img className="h-auto w-auto" src={`${process.env.REACT_APP_IMAGE_DOMAIN}/${selectedPhoto.image_name}`} alt="" />
                            </Dialog.Panel>
                            {/* <Dialog.Panel className="transition-opacity w-full max-w-240 max-lg:max-w-23/24 border-green-500 border-2 bg-stone-300 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 absolute pt-8 max-sm:pt-6 pb-5 px-16 max-sm:px-4 rounded-xl outline-none">
                                {parseInt(eachAccount.id) === selectedPhoto.created_by_id || parseInt(eachAccount.role) <= 2 ? (
                                    <Popover className="absolute right-6">
                                        <Popover.Button className="focus:outline-none">
                                            <TrashIcon className="h-7 w-7 cursor-pointer fill-red-500"></TrashIcon>
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
                                                <div className="bg-gray-200 px-4 py-2 rounded-md shadow-md cursor-pointer hover:underline" onClick={() => deleteData(`/delete/photos/${selectedPhoto.id}`, setDeletePerfect)}>
                                                    削除
                                                </div>
                                            </Popover.Panel>
                                        </Transition>
                                    </Popover>
                                ) : ("")}
                                <div className="text-center p-2 pt-0">
                                    <div className="text-4xl font-bold mb-2">{selectedPhoto.title}</div>
                                    <div className="text-xl mb-4">{selectedPhoto.tags}</div>
                                    <div className="flex flex-col items-center">
                                        {((process.env.REACT_APP_IMAGE_DOMAIN + "/" + selectedPhoto.image_name).includes(".ogm")) ||
                                            ((process.env.REACT_APP_IMAGE_DOMAIN + "/" + selectedPhoto.image_name).includes(".wmv")) ||
                                            ((process.env.REACT_APP_IMAGE_DOMAIN + "/" + selectedPhoto.image_name).includes(".mpg")) ||
                                            ((process.env.REACT_APP_IMAGE_DOMAIN + "/" + selectedPhoto.image_name).includes(".webm")) ||
                                            ((process.env.REACT_APP_IMAGE_DOMAIN + "/" + selectedPhoto.image_name).includes(".ogv")) ||
                                            ((process.env.REACT_APP_IMAGE_DOMAIN + "/" + selectedPhoto.image_name).includes(".mov")) ||
                                            ((process.env.REACT_APP_IMAGE_DOMAIN + "/" + selectedPhoto.image_name).includes(".asx")) ||
                                            ((process.env.REACT_APP_IMAGE_DOMAIN + "/" + selectedPhoto.image_name).includes(".mpeg")) ||
                                            ((process.env.REACT_APP_IMAGE_DOMAIN + "/" + selectedPhoto.image_name).includes(".mp4")) ||
                                            ((process.env.REACT_APP_IMAGE_DOMAIN + "/" + selectedPhoto.image_name).includes(".m4v")) ||
                                            ((process.env.REACT_APP_IMAGE_DOMAIN + "/" + selectedPhoto.image_name).includes(".avi")) ? (
                                            <video
                                                src={`${process.env.REACT_APP_IMAGE_DOMAIN}/${selectedPhoto.image_name}`}
                                                controls
                                                className={`${width > height ? "h-auto w-full" : "h-full w-auto"}`}
                                            />
                                        ) : (
                                            <img
                                                src={`${process.env.REACT_APP_IMAGE_DOMAIN}/${selectedPhoto.image_name}`}
                                                alt=""
                                                className={`${width > height ? "h-auto w-full max-h-full" : "h-full w-auto"}`}
                                            />
                                        )}
                                    </div>
                                    <div className="flex justify-start mt-2 text-info">
                                        {eachNewsTimeFormat(selectedPhoto.created_at)}・
                                        <a href={`../selfintroduction/${selectedPhoto.created_by_id}`} className="hover:underline">
                                            {selectedPhoto.created_by}
                                        </a>
                                    </div>
                                </div>
                            </Dialog.Panel> */}
                        </Transition.Child>
                    </div>
                </Dialog>
            </Transition>
            <ActionPerfect Perfect={deletePerfect} onClose={() => window.location.reload()} title={"Perfect"} text={"写真の削除に成功しました。"} />
        </>
    )
}

export default EachPhoto