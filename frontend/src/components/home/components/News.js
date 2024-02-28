import React, { useEffect, useState } from 'react'
import { newsListTimeFormat } from '../../../utils/TimeUtil';
import { lastestTruncateText } from '../../../utils/TextUtil';
import { fetchData } from '../../../utils/Fetch';

const News = () => {
    const [news, setNews] = useState([]);
    useEffect(() => {
        fetchData('/api/news', setNews);
    }, []);
    return (
        <div className="border-y-8 border-black pb-16">
            <div className="ml-44 max-xl:ml-18 max-sm:ml-4 font-bold text-5xl max-md:text-4xl my-8 hover:underline hover:opacity-70">
                <a href="/news">
                    Lastest News
                </a>
            </div>
            <div className="flex justify-center max-md:flex-col max-md:items-center mx-28 max-xl:mx-8 max-lg:mx-3 gap-16 max-2xl:gap-8 max-lg:gap-6 mt-8">
                {news.slice().reverse().slice(0, 3).map((item) => (
                    <a href={`/news/${item.id}`} className="hover:opacity-70 w-full max-md:w-3/4 max-sm:w-11/12 bg-violet-200 rounded-3xl px-8 pt-10 pb-5 max-xl:px-6 max-xl:pt-8 max-xl:pb-4 max-lg:px-4 max-lg:pt-5 max-lg:pb-3 max-md:px-6 max-md:pt-8 max-md:pb-4">
                        <div className="flex justify-center">
                            <img className="w-23/24" src={`${process.env.REACT_APP_IMAGE_DOMAIN}/${item.image_1}`} alt="" />
                        </div>
                        <div className="mt-4 pt-2 border-t-3 border-black">
                            <div className="text-3xl max-xl:text-2xl max-sm:text-lg font-bold ml-2">
                                {item.title}
                            </div>
                            <div className="border-l-2 border-black pl-2 mt-1 ml-1 text-2xl max-xl:text-lg max-sm:text-base">
                                {lastestTruncateText(item.text)}
                            </div>
                            <div className="text-xl max-xl:text-base mt-1">
                                {newsListTimeFormat(item.created_at)}
                            </div>
                        </div>
                    </a>
                ))}
            </div>
        </div>
    )
}

export default News