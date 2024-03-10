import React, { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { fetchData } from "../../utils/DatabaseUtil";

const Header = () => {
    const { isAuthenticated, user } = useAuth0();
    const [eachAccount, setEachAccount] = useState({});
    useEffect(() => {
        fetchData('/api/accounts', setEachAccount, user, "e_mail", "email");
    }, [user]);

    return (
        <>
            <header className="flex bg-opacity-40 bg-white dark:bg-dark-nav justify-around items-center h-16 w-full text-black dark:text-dark duration-300">
                {isAuthenticated && (
                    <ul className="flex items-center text-xl max-sm:text-base font-bold">
                        <li className="list-none inline-block mr-5 max-sm:mr-3">
                            <a href="/" className="block text-center hover:opacity-40 duration-300">
                                <img src="/images/logo/logo.png" alt="" className="w-11 max-sm:w-10" />
                            </a>
                        </li>
                        <li className="list-none inline-block mr-5 max-sm:mr-2">
                            <a href="/news/" className="hover:opacity-40">ニュース</a>
                        </li>
                        <li className="list-none inline-block mr-5 max-sm:mr-2">
                            <a href="/event/" className="hover:opacity-40">イベント</a>
                        </li>
                        <li className="list-none inline-block mr-5 max-sm:mr-2">
                            <a href="/photo/" className="hover:opacity-40">写真</a>
                        </li>
                        <li className="list-none inline-block mr-5 max-sm:mr-2">
                            <a href="/selfintroduction/" className="hover:opacity-40">自己紹介</a>
                        </li>
                    </ul>
                )}

                <div className="flex items-center">
                    {isAuthenticated && (
                        <div>
                            <a href="/profile/" >
                                <img className="w-12 rounded-full" src={eachAccount.icon_name === undefined || eachAccount.icon_name === "" || !eachAccount ? `/images/accounts/default.jpeg` : `${process.env.REACT_APP_IMAGE_DOMAIN}/${eachAccount.icon_name}`} alt="" />
                            </a>
                        </div>
                    )}
                </div>
            </header>
        </>
    )
}

export default Header