import React from 'react'
import { useEffect, useState } from 'react'
import { newsListTimeFormat } from '../../../utils/TimeUtil';
import { truncateText } from '../../../utils/TextUtil';
import { fetchData } from '../../../utils/DatabaseUtil';
import Loading from '../../_util/Loading';

const NewsList = () => {
    const [news, setNews] = useState([]);
    const [timer, setTimer] = useState(false);
    useEffect(() => {
        fetchData('/api/news', setNews);
        setTimeout(() => {
            setTimer(true);
        }, 500)
    }, []);

    return (
        <div className="mx-72 max-2xl:mx-36 max-xl:mx-24 max-lg:mx-12 max-md:mx-8 border-l-4 border-black max-sm:border-l-0 max-sm:pl-0 pl-10">
            {news.length > 0 ? (
                news.slice().reverse().map((item) => (
                    <a href={`./${item.id}`} key={item.id} className="flex items-center max-sm:flex-col my-8 rounded-xl hover:opacity-90">
                        <div className="max-xl:w-1/2 w-2/5 max-sm:w-full">
                            <img className="rounded-xl" src={`${process.env.REACT_APP_IMAGE_DOMAIN}/${item.image_1}`} alt="" />
                        </div>
                        <div className="max-md:w-2/5 w-1/2 ml-12 max-md:ml-0 max-sm:w-full max-sm:my-3">
                            <div className="flex items-end">
                                <p className="text-2xl text-black">{newsListTimeFormat(item.created_at)}</p>
                                <p className="ml-6 text-lg text-black">{item.created_by}</p>
                            </div>
                            <p className="text-4xl text-black max-md:text-2xl mt-5 max-sm:mt-2 ml-12 max-xl:ml-8 max-md:ml-6 max-sm:ml-4 font-bold">{item.title}</p>
                            <p className="text-gray-600 leading-6 text-xl mt-5 max-sm:mt-2">{truncateText(item.text, 45)}</p>
                        </div>
                    </a>
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
        </div>
    )
}

export default NewsList