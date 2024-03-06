import { React, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { newLineUtil } from '../../utils/TextUtil';
import { eachNewsTimeFormat } from '../../utils/TimeUtil';
import { deleteData, fetchData } from '../../utils/DatabaseUtil';
import { useAuth0 } from "@auth0/auth0-react";
import Modal from 'react-modal';
import { Helmet, HelmetProvider } from 'react-helmet-async';

Modal.setAppElement("#root");

const EachNews = () => {
    const { user } = useAuth0();
    const [eachAccount, setEachAccount] = useState({});
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [eachNews, setEachNews] = useState({});
    const { postId } = useParams();

    useEffect(() => {
        fetchData('/api/news', setEachNews, parseInt(postId), "id");
    }, [postId]);

    useEffect(() => {
        fetchData('/api/accounts', setEachAccount, user, "email", ".email");
    }, [user]);

    function handleModalClick() {
        setModalIsOpen(true);
    }

    return (
        <>
            <HelmetProvider>
                <Helmet>
                    <title>
                        {eachNews.title ? (
                            `${eachNews.title} `
                        ) : (
                            "Error: Get title "
                        )}
                        - TCFS
                    </title>
                </Helmet>
            </HelmetProvider>
            <div className="mx-72 max-2xl:mx-36 max-xl:mx-24 max-lg:mx-12 max-md:mx-8 max-sm:mx-4 py-8">
                <div className="text-5xl max-md:text-3xl max-sm:text-xl font-bold mb-10 max-sm:mb-4 border-b-2 p-3 border-black flex justify-between">
                    <span className="block">
                        {eachNews.title}
                    </span>
                    {eachAccount.id === eachNews.created_by_id || eachAccount.role <= 2 ? (
                        <button
                            onClick={handleModalClick}
                            className="cursor-pointer text-2xl max-md:text-xl max-sm:text-base bg-red-700 hover:bg-red-800 text-white px-4 py-2 max-md:px-2 max-sm:py-1  font-bold rounded"
                        >
                            削除
                        </button>
                    ) : ("")}
                </div>
                <div className="text-xl max-sm:text-base mx-3">
                    <div className="border-gray-500">
                        {newLineUtil(eachNews.text || '')}
                    </div>
                    <img className="rounded-3xl my-4 duration-300 inline-block" src={`${process.env.REACT_APP_IMAGE_DOMAIN}/${eachNews.image_1}`} alt="" />
                </div>
                <div className="text-info">
                    {eachNewsTimeFormat(eachNews.created_at)}・
                    <a href={`../selfintroduction/${eachNews.created_by_id}`} className="hover:underline">
                        {eachNews.created_by}
                    </a>
                </div>
            </div>
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={() => {
                    setModalIsOpen(false);
                }}
                overlayClassName="fixed inset-0 transition-opacity bg-black bg-opacity-50"
                className={`w-full max-w-240 max-md:max-w-90vw max-md:max-h-90vh top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 absolute rounded-xl outline-none transition-opacity overflow-auto max-h-full m-auto`}
            >
                <div className="bg-white px-4 py-2 border rounded shadow flex justify-between items-center">
                    <p className="text-lg">本当に削除しますか？</p>
                    <div className="flex">
                        <button
                            onClick={() => { setModalIsOpen(false); }}
                            className="mr-2 hover:underline cursor-pointer text-2xl max-md:text-xl max-sm:text-base text-gray-600 rounded"
                        >
                            キャンセル
                        </button>
                        <button
                            onClick={() => deleteData(`/delete/news/${postId}`, '/news/')}
                            className="cursor-pointer text-2xl max-md:text-xl max-sm:text-base bg-red-700 hover:bg-red-800 text-white px-4 py-2 max-md:px-2 max-sm:py-1 font-bold rounded"
                        >
                            削除
                        </button>
                    </div>
                </div>
            </Modal>
        </>
    )
}

export default EachNews
