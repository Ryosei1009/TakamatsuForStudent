import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';
import { DotsHorizontalIcon } from '@heroicons/react/solid';
import { newLineUtil } from '../../../utils/TextUtil';
import { eachNewsTimeFormat } from '../../../utils/TimeUtil';
import { format } from 'date-fns';
import { getAccountData } from '../../../utils/AccountUtil';
import { useAuth0 } from "@auth0/auth0-react";

Modal.setAppElement("#root");

const EachEvent = ({ isOpen, onClose, event, showPopup, onTogglePopup, onDelete }) => {
    const { user } = useAuth0();
    const [eachAccount, setEachAccount] = useState({});
    useEffect(() => {
        getAccountData(user, setEachAccount);
    }, [user]);
    const WeekChars = ["日", "月", "火", "水", "木", "金", "土"];

    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onClose}
            overlayClassName="fixed inset-0 bg-white bg-opacity-70 transition-opacity"
            className={`transition-opacity w-full max-w-120 top-42/100 left-1/2 -translate-x-1/2 -translate-y-1/2 absolute outline-none`}
        >
            {event &&
                <>
                    <div
                        className="text-center border-8 bg-gray-100 pt-12 max-sm:pt-8 pb-12 px-16 max-sm:px-4 rounded-xl"
                        style={{ borderColor: event.color }}
                    >
                        <div className="flex items-center">
                            <div className={`flex justify-center items-end w-full ${event.role <= 2 && "w-11/12"}`}>
                                <div className="text-3xl font-bold">
                                    {event.title}
                                </div>
                                <div className="flex flex-col items-start ml-4">
                                    {format(new Date(event.date * 1000), 'MM月dd日') + "(" + WeekChars[new Date(event.date * 1000).getDay()] + ")"}
                                </div>
                            </div>
                            {eachAccount.role <= 2 && (
                                <div className="w-1/12">
                                    <DotsHorizontalIcon onClick={onTogglePopup} className="h-5 w-5 cursor-pointer" />
                                    {showPopup && (
                                        <div className="cursor-pointer hover:underline hover:opacity-90 absolute z-10 bg-white border rounded shadow-sm py-2 px-4 text-red-500" onClick={onDelete(event.id)}>
                                            削除
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                        <div className="border-y-2 border-black py-1 mt-1 mb-2">{newLineUtil(event.text)}</div>
                        <div className="flex justify-between text-info text-xs">
                            <div>
                                作成者:
                                <a href={`../selfintroduction/${event.created_by_id}`} className="hover:underline">
                                    {event.created_by}
                                </a>
                            </div>
                            <div>
                                作成日時:
                                {eachNewsTimeFormat(event.created_at)}
                            </div>
                        </div>
                    </div>
                </>
            }
        </Modal>
    );
};

export default EachEvent;