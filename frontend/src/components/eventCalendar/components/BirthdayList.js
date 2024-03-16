import React, { useEffect, useState } from 'react'
import { fetchData } from '../../../utils/DatabaseUtil';
import Loading from '../../_util/Loading';

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
        <div className="flex justify-center">
            <table>
                <thead>
                    <tr>
                        <th>名前</th>
                        <th>誕生日</th>
                    </tr>
                </thead>
                <tbody>
                    {accounts.length > 0 ? (
                        accounts.slice().map((item) => (
                        <tr>
                            <th>
                                {item.naming ? (item.naming) : (item.name)}
                            </th>
                            <th>
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
    )
}

export default BirthdayList