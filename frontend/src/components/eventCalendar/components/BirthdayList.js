import React, { useEffect, useState } from 'react'
import { fetchData } from '../../../utils/DatabaseUtil';
import Loading from '../../_util/Loading';
import { Helmet, HelmetProvider } from 'react-helmet-async';

const BirthdayList = () => {
    const [accounts, setAccounts] = useState([]);
    const [timer, setTimer] = useState(false);

    useEffect(() => {
        fetchData('/api/accounts', setAccounts);
        setTimeout(() => {
            setTimer(true);
        }, 500)
    }, []);
    return (
        <>
            <HelmetProvider>
                <Helmet>
                    <title>誕生日一覧 - TCFS</title>
                </Helmet>
            </HelmetProvider>
            <div className="flex justify-center">
                <table className="text-lg">
                    <thead>
                        <tr>
                            <th className="px-2">名前</th>
                            <th className="px-2">ニックネーム</th>
                            <th className="px-2">誕生日</th>
                        </tr>
                    </thead>
                    <tbody>
                        {accounts.length > 0 ? (
                            accounts.slice().map((item) => (
                                <tr>
                                    <th className="px-3">
                                        {item.name}
                                    </th>
                                    <th className="px-3">
                                        {item.naming ? (item.naming) : ("")}
                                    </th>
                                    <th className="px-3">
                                        {item.birthmonth + "月" + item.birthday + "日"}
                                    </th>
                                </tr>
                            ))
                        ) : (
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
                    </tbody>
                </table>
            </div>
        </>
    )
}

export default BirthdayList