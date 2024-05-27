import React, { useEffect, useState } from 'react';
import { fetchData } from '../../../utils/DatabaseUtil';
import { truncateText } from '../../../utils/TextUtil';
import { calculateGrade } from '../../../utils/AccountUtil';
import Loading from '../../_util/Loading';

const SelfIntroductionList = () => {
    const [accounts, setAccounts] = useState([]);
    const [timer, setTimer] = useState(false);

    useEffect(() => {
        fetchData('/api/accounts', setAccounts);
        setTimeout(() => {
            setTimer(true);
        }, 500)
    }, []);

    const renderAccounts = (roleFilter, secondRoleFilter = null) => (
        <div className="mx-72 max-2xl:mx-36 max-xl:mx-24 max-lg:mx-12 max-md:mx-8">
            <div className="mx-12 max-2xl:mx-0 flex flex-wrap gap-x-16 gap-y-8  justify-center my-8">
                {accounts.length > 0 ? (
                    accounts
                        .filter((account) => account.role === roleFilter || account.role === secondRoleFilter)
                        .slice()
                        .map((item) => (
                            <a href={item.id} key={item.id}
                                className={`flex flex-col hover:opacity-70 w-1/3 max-lg:w-3/4 max-md:w-4/5 max-sm:w-11/12 bg-opacity-25 p-8 max-md:p-7
                            ${roleFilter === 1 ? "bg-violet-500" : roleFilter === 2 ? "bg-violet-400" : "bg-violet-300"}`}
                            >
                                <div className="flex w-full items-end justify-start">
                                    <img className="w-1/3" src={item.icon_name ? (`${process.env.REACT_APP_IMAGE_DOMAIN}/${item.icon_name}`) : (`/images/accounts/default.jpeg`)} alt="" />
                                    <div className="ml-8">
                                        <div className="text-base text-black">
                                            {roleFilter === 1 ? "メンター" : roleFilter === 2 ? "TA" : calculateGrade(item.grade)}
                                        </div>
                                        <div className="text-2xl font-bold text-black">
                                            {item.naming}
                                        </div>
                                        <div className="text-base text-black">
                                            {item.name}
                                        </div>
                                    </div>
                                </div>
                                <div className="text-lg max-ms:text-base mt-6 text-black">
                                    {truncateText(item.comment, 100)}
                                </div>
                            </a>
                        ))) : (
                    <>
                        {timer ? (
                            <div className="text-3xl max-xl:text-2xl max-sm:text-lg font-bold ml-2 text-red-500">
                                サーバーが落ちている可能性があります。運営にお問い合わせください。
                            </div>
                        ) : (
                            <Loading />
                        )}
                    </>
                )}
            </div>
        </div>
    );

    return (
        <div>
            {renderAccounts(1)}
            {renderAccounts(2)}
            {renderAccounts(3, 0)}
        </div>
    );
};

export default SelfIntroductionList;