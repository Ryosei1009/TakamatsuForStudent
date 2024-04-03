import { Fragment, React, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { newLineUtil } from '../../utils/TextUtil';
import { eachNewsTimeFormat } from '../../utils/TimeUtil';
import { deleteData, fetchData } from '../../utils/DatabaseUtil';
import { useAuth0 } from "@auth0/auth0-react";
import Modal from 'react-modal';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { TrashIcon } from '@heroicons/react/solid';
import { Popover, Transition } from '@headlessui/react';
import ActionPerfect from '../_util/ActionPerfect';

Modal.setAppElement("#root");

const EachNews = () => {
    const { user } = useAuth0();
    const [eachAccount, setEachAccount] = useState({});
    const [eachNews, setEachNews] = useState({});
    const { postId } = useParams();

    useEffect(() => {
        fetchData('/api/news', setEachNews, parseInt(postId), "id");
    }, [postId]);

    useEffect(() => {
        fetchData('/api/accounts', setEachAccount, user, "e_mail", "email");
    }, [user]);

    const [deletePerfect, setDeletePerfect] = useState(false);
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
            <div className="container mx-auto">
                <div className="max-w-4xl mx-auto p-8 max-sm:p-6 shadow-md max-sm:shadow-none bg-white max-sm:bg-bg-light">
                    <img src={`${process.env.REACT_APP_IMAGE_DOMAIN}/${eachNews.image_1}`} alt="" className="w-full mb-4 rounded-lg" />

                    <div className="flex justify-between">
                        <h1 className="text-3xl max-lg:text-2xl max-sm:text-xl font-bold text-gray-800 mb-2">
                            {eachNews.title}
                        </h1>
                        <div className="flex items-center">
                            {eachAccount.id === eachNews.created_by_id || eachAccount.role <= 2 ? (
                                <Popover className="relative">
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
                                            <div className="bg-gray-200 px-4 py-2 rounded-md shadow-md cursor-pointer hover:underline" onClick={() => deleteData(`/delete/news/${postId}`, setDeletePerfect)}>
                                                削除
                                            </div>
                                        </Popover.Panel>
                                    </Transition>
                                </Popover>
                            ) : ("")}
                        </div>
                    </div>

                    <div className="text-gray-700 mb-4">
                        {newLineUtil(eachNews.text || '')}
                    </div>

                    <div className="text-info">
                        {eachNewsTimeFormat(eachNews.created_at)}・
                        <a href={`../selfintroduction/${eachNews.created_by_id}`} className="hover:underline">
                            {eachNews.created_by}
                        </a>
                    </div>
                </div>
            </div>
            <ActionPerfect Perfect={deletePerfect} onClose={() => window.location.href = "/news/"} title={"Perfect"} text={"ニュースの削除に成功しました。"} />
        </>
    )
}

export default EachNews
