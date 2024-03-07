import React, { useEffect, useState } from 'react'
import { eachNewsTimeFormat } from '../../../utils/TimeUtil';
import { TrashIcon } from '@heroicons/react/solid';
import { deleteData, fetchData } from '../../../utils/DatabaseUtil';
import { useAuth0 } from '@auth0/auth0-react';
import Modal from 'react-modal';

Modal.setAppElement("#root");

const EachPhoto = ({ modalIsOpen, selectedPhoto, setSelectedPhoto, setModalIsOpen, handleShowPopupClick, showPopup }) => {
    const { user } = useAuth0();
    const [eachAccount, setEachAccount] = useState({});

    useEffect(() => {
        fetchData('/api/accounts', setEachAccount, user, "e_mail", "email");
    }, [user]);
    return (
        <>
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={() => {
                    setSelectedPhoto(null);
                    setModalIsOpen(false);
                }}
                overlayClassName="fixed inset-0 bg-black bg-opacity-50 transition-opacity"
                className={`transition-opacity w-full max-w-240 max-lg:max-w-23/24 bg-gray-100 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 absolute pt-12 max-sm:pt-8 pb-5 px-16 max-sm:px-4 rounded-xl outline-none`}
            >
                {parseInt(eachAccount.id) === selectedPhoto.created_by_id || parseInt(eachAccount.role) <= 2 ? (
                    <div className="flex justify-end">
                        <TrashIcon className="w-7 h-7 cursor-pointer fill-red-700" onClick={() => handleShowPopupClick()} />
                        {showPopup && (
                            <div className="top-19 right-7 cursor-pointer hover:underline hover:opacity-90 absolute z-10 bg-white border rounded shadow-sm py-2 px-4 text-red-500" onClick={() => deleteData(`/delete/photos/${selectedPhoto.id}`, '')}>
                                削除
                            </div>
                        )}
                    </div>
                ) : ("")}
                <div className="text-center p-4 pt-0">
                    <div className="text-4xl font-bold mb-2">{selectedPhoto.title}</div>
                    <div className="text-xl mb-8">{selectedPhoto.tags}</div>
                    <div className="flex flex-col items-center">
                        <img
                            src={`${process.env.REACT_APP_IMAGE_DOMAIN}/${selectedPhoto.image_name}`}
                            alt=""
                            className="h-full w-full"
                        />
                    </div>
                    <div className="flex justify-between mt-2 text-xs text-info">
                        <div>
                            作成者：
                            <a href={`../selfintroduction/${selectedPhoto.created_by_id}`} className="hover:underline">
                                {selectedPhoto.created_by}
                            </a>
                        </div>
                        <div>
                            {eachNewsTimeFormat(selectedPhoto.created_at)}
                        </div>
                    </div>
                </div>
            </Modal>
        </>
    )
}

export default EachPhoto