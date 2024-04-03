import React, { Fragment, useEffect, useState } from 'react';
import Modal from 'react-modal';
import { TrashIcon } from '@heroicons/react/solid';
import { newLineUtil } from '../../../utils/TextUtil';
import { eachNewsTimeFormat } from '../../../utils/TimeUtil';
import { format } from 'date-fns';
import { useAuth0 } from "@auth0/auth0-react";
import { deleteData, fetchData } from '../../../utils/DatabaseUtil';
import { Dialog, Popover, Transition } from '@headlessui/react';
import ActionPerfect from '../../_util/ActionPerfect';

Modal.setAppElement("#root");

const EachEvent = ({ eachModalIsOpen, setEachModalIsOpen, selectedEvent }) => {
    const { user } = useAuth0();
    const [eachAccount, setEachAccount] = useState({});
    const [deletePerfect, setDeletePerfect] = useState(false);
    useEffect(() => {
        fetchData('/api/accounts', setEachAccount, user, "e_mail", "email");
    }, [user]);
    const WeekChars = ["日", "月", "火", "水", "木", "金", "土"];

    return (
        <>
            <Transition appear show={eachModalIsOpen} as={Fragment}>
                <Dialog as="div" className="relative z-10" onClose={() => setEachModalIsOpen(false)}>
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
                                    {selectedEvent && (
                                        <div
                                            className="text-center border-8 bg-gray-100 pt-12 max-sm:pt-8 pb-12 px-16 max-sm:px-4 rounded-xl"
                                            style={{ borderColor: selectedEvent.color }}
                                        >
                                            <div className="flex items-center">
                                                <div className={`flex justify-center items-end w-full ${selectedEvent.role <= 2 && "w-11/12"}`}>
                                                    <div className="text-3xl font-bold break-all">
                                                        {selectedEvent.title}
                                                    </div>
                                                    <div className="flex flex-col items-start ml-4">
                                                        {format(new Date(parseInt(selectedEvent.date)), 'MM月dd日') + "(" + WeekChars[new Date(parseInt(selectedEvent.date)).getDay()] + ")"}
                                                    </div>
                                                </div>
                                                {eachAccount.role <= 2 && (
                                                    <Popover className="relative w-1/12">
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
                                                                <div className="bg-gray-200 px-4 py-2 rounded-md shadow-md cursor-pointer hover:underline" onClick={() => deleteData(`/delete/event/${selectedEvent.id}`, setDeletePerfect)}>
                                                                    削除
                                                                </div>
                                                            </Popover.Panel>
                                                        </Transition>
                                                    </Popover>
                                                )}
                                            </div>
                                            <div className="border-y-2 border-black py-1 mt-1 mb-2">{newLineUtil(selectedEvent.text)}</div>
                                            <div className="flex justify-between text-info text-xs">
                                                <div>
                                                    作成者:
                                                    <a href={`../selfintroduction/${selectedEvent.created_by_id}`} className="hover:underline">
                                                        {selectedEvent.created_by}
                                                    </a>
                                                </div>
                                                <div>
                                                    作成日時:
                                                    {eachNewsTimeFormat(selectedEvent.created_at)}
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>
            <ActionPerfect Perfect={deletePerfect} onClose={() => window.location.reload()} title={"Perfect"} text={"イベントの削除に成功しました。"} />
        </>
    );
};

export default EachEvent;