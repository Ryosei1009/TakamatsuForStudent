import React from 'react'
import { useEffect, useState } from 'react'
import { newsListTimeFormat } from '../../../utils/TimeUtil';
import { truncateText } from '../../../utils/TextUtil';
import { fetchData } from '../../../utils/Fetch';

const NewsList = () => {
    const [news, setNews] = useState([]);
    useEffect(() => {
        fetchData('/api/news', setNews);
    }, []);

    return (
        <div className="mx-72 max-2xl:mx-36 max-xl:mx-24 max-lg:mx-12 max-md:mx-8 border-l-4 border-black pl-10">
            {news.length > 0 ? (
                news.slice().reverse().map((item) => (
                    <a href={`./${item.id}`} key={item.id} className="flex items-center max-sm:flex-col my-8 rounded-xl hover:opacity-90">
                        <div className="max-xl:w-1/2 w-2/5 max-sm:w-full">
                            <img className="w-full rounded-xl" src={`${process.env.REACT_APP_IMAGE_DOMAIN}/${item.image_1}`} alt="" />
                        </div>
                        <div className="max-md:w-2/5 w-1/2 ml-12 max-md:ml-6 max-sm:w-full max-sm:my-6">
                            <div className="flex items-end">
                                <p className="text-2xl">{newsListTimeFormat(item.created_at)}</p>
                                <p className="ml-6 text-lg">{item.created_by}</p>
                            </div>
                            <p className="text-4xl mt-5 ml-12 font-bold">{item.title}</p>
                            <p className="text-gray-600 leading-6 text-xl mt-5">{truncateText(item.text)}</p>
                        </div>
                    </a>
                ))
            ) : (
                <p>No news available.</p>
            )}
        </div>
    )
}

export default NewsList