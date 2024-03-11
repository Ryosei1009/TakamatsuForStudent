import React from 'react'
import { useEffect, useState } from 'react'
import { newsListTimeFormat } from '../../../utils/TimeUtil';
import { newLineUtil, truncateText } from '../../../utils/TextUtil';
import { fetchData } from '../../../utils/DatabaseUtil';
import Loading from '../../_util/Loading';

const DevNews = () => {
    const [news, setNews] = useState([]);
    const [timer, setTimer] = useState(false);
    const [textOpen, setTextOpen] = useState(false);
    const [selectedId, setSelectedId] = useState(null);
    const [newsLength, setNewsLength] = useState(3);

    const handleTextClick = (item) => {
        setTextOpen(!textOpen);
        setSelectedId(item.id);
    }

    useEffect(() => {
        fetchData('/api/news', setNews);
        setTimeout(() => {
            setTimer(true);
        }, 500)
    }, []);

    return (
        <div>
            {news.length > 0 ? (
                news.slice().reverse().slice(0, newsLength).map((item) => (
                    <div key={item.id} className="flex items-center max-sm:flex-col mt-8 rounded-xl">
                        <div className="max-xl:w-1/2 w-2/5 max-sm:w-full">
                            <img className="rounded-xl" src={`${process.env.REACT_APP_IMAGE_DOMAIN}/${item.image_1}`} alt="" />
                        </div>
                        <div className="max-md:w-2/5 w-1/2 ml-8 max-md:ml-0 max-sm:w-full max-sm:my-3">
                            <div className="flex items-end">
                                <p className="text-xl">{newsListTimeFormat(item.created_at)}</p>
                            </div>
                            <p className="text-3xl max-md:text-2xl mt-5 max-sm:mt-2 ml-8 max-xl:ml-6 max-md:ml-4 max-sm:ml-2 font-bold">{item.title}</p>
                            <p
                                className="text-gray-600 leading-6 text-xl mt-5 max-sm:mt-2 cursor-pointer"
                                onClick={() => handleTextClick(item)}
                            >
                                {textOpen ? (
                                    selectedId === item.id ? (
                                        newLineUtil(item.text)
                                    ) : (
                                        truncateText(item.text)
                                    )) : (
                                    truncateText(item.text)
                                )}
                            </p>
                        </div>
                    </div>
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
            <div className="flex justify-end" onClick={() => setNewsLength(newsLength + 3)}>
                <div className="bg-orange-300 rounded-xl px-4 py-2 cursor-pointer text-white">
                More
                </div>
            </div>
        </div>
    )
}

export default DevNews