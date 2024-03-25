import React, { useEffect } from 'react'
import { useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { fetchData } from '../../../../utils/DatabaseUtil';
import UploadDevNews from './UploadNews';
import EachNews from './EachNews';

export const itemType = (item) => {
    switch (item) {
        case 1:
            return (
                <p className="text-center text-base max-sm:text-sm font-bold bg-red-500 text-white px-4 py-1 rounded-lg w-24">
                    重要
                </p>
            );
        case 2:
            return (
                <p className="text-center text-base max-sm:text-sm font-bold bg-green-500 text-white px-4 py-1 rounded-lg w-24">
                    ニュース
                </p>
            );
        case 3:
            return (
                <p className="text-center text-base max-sm:text-sm font-bold bg-blue-500 text-white px-4 py-1 rounded-lg w-24">
                    更新情報
                </p>
            );
        case 4:
            return (
                <p className="text-center text-base max-sm:text-sm font-bold bg-orange-500 text-white px-4 py-1 rounded-lg w-24">
                    FAQ
                </p>
            );
        case 5:
            return (
                <p className="text-center text-base max-sm:text-sm font-bold bg-gray-500 text-white px-4 py-1 rounded-lg w-24">
                    その他
                </p>
            );
        default:
            return (
                <p className="text-center text-base max-sm:text-sm font-bold bg-gray-500 text-white px-4 py-1 rounded-lg w-24">
                    その他
                </p>
            );
    }
}

const DevNews = () => {
    const [newsLength, setNewsLength] = useState(3);

    const { user } = useAuth0();
    const [eachAccount, setEachAccount] = useState({});
    const [devNews, setDevNews] = useState([]);
    useEffect(() => {
        fetchData('/api/accounts', setEachAccount, user, "e_mail", "email");
        fetchData('/api/dev_news', setDevNews);
    }, [user])


    return (
        <>
            <div className="border-dotted border-t-2 border-black mx-16 max-md:mx-0 my-4">
                <EachNews devNews={devNews} newsLength={newsLength} eachAccount={eachAccount} />
                <div className="flex mt-3">
                    <div onClick={() => setNewsLength(newsLength + 3)} className="bg-orange-300 hover:bg-orange-500 rounded-xl px-4 py-2 cursor-pointer text-white font-bold">
                        More
                    </div>
                    {eachAccount.role === 0 && (
                        <>
                            <UploadDevNews />
                        </>
                    )}
                </div>
            </div>
        </>
    )
}

export default DevNews