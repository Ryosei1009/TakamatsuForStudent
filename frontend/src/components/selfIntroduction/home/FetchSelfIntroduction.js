import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { calculateGrade } from '../../../utils/AccountUtil';
import { newLineUtil } from '../../../utils/TextUtil';

const FetchSelfIntroduction = () => {
    const [accounts, setAccounts] = useState([]);
    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API_DOMAIN}/api/accounts`)
            .then((response) => {
                const data = response.data;
                setAccounts(data);
                console.log(data);
            })
            .catch((error) => {
                console.error(error.message);
            })
    }, [])

    return (
        <div className="mx-72 flex flex-wrap gap-x-16 gap-y-8  justify-center mt-16">
            {accounts.length > 0 ? (
                accounts.slice().reverse().map((item) => (
                    <a href={item.id} key={item.id} className="flex flex-col hover:opacity-70 w-1/4 bg-violet-300 bg-opacity-25 p-8">
                        <div className="flex w-full items-end justify-start">
                            <img className="w-1/3" src={`${process.env.REACT_APP_IMAGE_DOMAIN}/${item.icon_name}`} alt="" />
                            <div className="ml-8">
                                <div className="text-base">
                                    {calculateGrade(item.grade)}
                                </div>
                                <div className="text-2xl font-bold">
                                    {item.naming}
                                </div>
                                <div className="text-base">
                                    {item.name}
                                </div>
                            </div>
                        </div>
                        <div className="text-lg mt-6">
                            {newLineUtil(item.self_introduction)}
                        </div>
                    </a>
                ))) : (
                ""
            )}
        </div>
    )
}

export default FetchSelfIntroduction