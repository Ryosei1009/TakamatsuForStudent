import React, { useEffect, useState } from 'react'
import { calculateGrade } from '../../../utils/AccountUtil';
import { newLineUtil } from '../../../utils/TextUtil';
import { fetchData } from '../../../utils/Fetch';

const FetchSelfIntroduction = () => {
    const [accounts, setAccounts] = useState([]);
    useEffect(() => {
        fetchData('/api/accounts', setAccounts)
    }, [])

    return (
        <div className="mt-16">
            <div className="mx-72 max-2xl:mx-36 max-xl:mx-24 max-lg:mx-12 max-md:mx-8 text-5xl max-xl:text-4xl max-md:text-3xl font-bold border-b-4 pb-4 max-md:pb-2 border-black">
                メンター
            </div>
            <div className="mx-12 max-2xl:mx-0 flex flex-wrap gap-x-16 gap-y-8  justify-center my-8">
                {accounts.filter((account) => { return account.role.includes(1) }).slice().reverse().map((item) => (
                    <a href={item.id} key={item.id} className="flex flex-col hover:opacity-70 w-1/4 max-xl:w-1/3 max-lg:w-3/4 max-md:w-4/5 max-sm:w-10/12 bg-violet-300 bg-opacity-25 p-8">
                        <div className="flex w-full items-end justify-start">
                            <img className="w-1/3" src={item.icon_name ? (`${process.env.REACT_APP_IMAGE_DOMAIN}/${item.icon_name}`) : (`/images/accounts/default.jpeg`)} alt="" />
                            <div className="ml-8">
                                <div className="text-base">
                                    {parseInt(item.role) === 3 || item.role === undefined ? (
                                        calculateGrade(item.grade)
                                    ) : (
                                        parseInt(item.role) === 2 ? (
                                            "TA"
                                        ) : (
                                            "メンター"
                                        )
                                    )}
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
                ))}
            </div>
            <div className="mx-72 max-2xl:mx-36 max-xl:mx-24 max-lg:mx-12 max-md:mx-8 text-5xl max-xl:text-4xl max-md:text-3xl font-bold border-b-4 pb-4 max-md:pb-2 border-black">
                TA
            </div>
            <div className="mx-12 max-2xl:mx-0 flex flex-wrap gap-x-16 gap-y-8  justify-center my-8">
                {accounts.filter((account) => { return account.role.includes(2) }).slice().reverse().map((item) => (
                    <a href={item.id} key={item.id} className="flex flex-col hover:opacity-70 w-1/4 max-xl:w-1/3 max-lg:w-3/4 max-md:w-4/5 max-sm:w-10/12 bg-violet-300 bg-opacity-25 p-8">
                        <div className="flex w-full items-end justify-start">
                            <img className="w-1/3" src={item.icon_name ? (`${process.env.REACT_APP_IMAGE_DOMAIN}/${item.icon_name}`) : (`/images/accounts/default.jpeg`)} alt="" />
                            <div className="ml-8">
                                <div className="text-base">
                                    {parseInt(item.role) === 3 || item.role === undefined ? (
                                        calculateGrade(item.grade)
                                    ) : (
                                        parseInt(item.role) === 2 ? (
                                            "TA"
                                        ) : (
                                            "メンター"
                                        )
                                    )}
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
                ))}
            </div>
            <div className="mx-72 max-2xl:mx-36 max-xl:mx-24 max-lg:mx-12 max-md:mx-8 text-5xl max-xl:text-4xl max-md:text-3xl font-bold border-b-4 pb-4 max-md:pb-2 border-black">
                生徒
            </div>
            <div className="mx-12 max-2xl:mx-0 flex flex-wrap gap-x-16 gap-y-8  justify-center my-8">
                {accounts.filter((account) => { return account.role.includes(3) }).slice().reverse().map((item) => (
                    <a href={item.id} key={item.id} className="flex flex-col hover:opacity-70 w-1/4 max-xl:w-1/3 max-lg:w-3/4 max-md:w-4/5 max-sm:w-10/12 bg-violet-300 bg-opacity-25 p-8">
                        <div className="flex w-full items-end justify-start">
                            <img className="w-1/3" src={item.icon_name ? (`${process.env.REACT_APP_IMAGE_DOMAIN}/${item.icon_name}`) : (`/images/accounts/default.jpeg`)} alt="" />
                            <div className="ml-8">
                                <div className="text-base">
                                    {parseInt(item.role) === 3 || item.role === undefined ? (
                                        calculateGrade(item.grade)
                                    ) : (
                                        parseInt(item.role) === 2 ? (
                                            "TA"
                                        ) : (
                                            "メンター"
                                        )
                                    )}
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
                ))}
            </div>
        </div>
    )
}

export default FetchSelfIntroduction