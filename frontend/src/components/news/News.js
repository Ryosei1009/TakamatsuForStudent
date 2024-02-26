import React, { useEffect, useState } from 'react'
import NewsList from "./components/NewsList"
import UploadNews from './components/UploadNews';
import { getAccountData } from '../../utils/AccountUtil';
import { useAuth0 } from '@auth0/auth0-react';

const News = () => {
    const [uploadOpen, setUploadOpen] = useState(false);
    const [eachAccount, setEachAccount] = useState({});
    const { user } = useAuth0();

    useEffect(() => {
        getAccountData(user, setEachAccount);
    }, [user]);

    const toggleUpload = () => {
        setUploadOpen(prevOpen => !prevOpen);
    };

    return (
        <>
            <div className="flex items-center justify-around mt-10">
                <p className="text-6xl font-bold">News</p>
                {parseInt(eachAccount.role) === 3 || parseInt(eachAccount.role) === 2 ? (
                    <button onClick={toggleUpload} className="text-2xl text-white px-6 py-3 rounded-xl border-2 bg-indigo-600 hover:bg-indigo-700">Upload</button>
                ) : ("")}
            </div>
            {parseInt(eachAccount.role) === 3 || parseInt(eachAccount.role) === 2 ? (
                <UploadNews isOpen={uploadOpen} />
            ) : ("")}
            <div>
                <NewsList />
            </div>
        </>
    )
}

export default News