import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { newsListTimeFormat } from '../../../utils/TimeUtil';
import { lastestTruncateText } from '../../../utils/TextUtil';

const News = () => {
    const [news, setNews] = useState([]);
    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API_DOMAIN}/api/news`)
            .then((response) => {
                const data = response.data;
                setNews(data);
            })
            .catch((error) => {
                console.error(error.message);
            });
    }, []);
    return (
        <div className="border-y-8 border-black pb-16">
            <div className="ml-44 max-xl:ml-18 max-sm:ml-4 font-bold text-5xl my-8">
                Lastest News
            </div>
            <div className="flex justify-center max-md:flex-col max-md:items-center mx-28 max-xl:mx-0 gap-16 max-lg:gap-6 mt-8">
                {news.slice().reverse().slice(0, 3).map((item) => (
                    <div className="w-1/4 max-md:w-1/2 max-sm:w-4/5 bg-violet-200 rounded-3xl px-8 pt-10 pb-5 max-xl:px-6 max-xl:pt-8 max-xl:pb-4 max-lg:px-4 max-lg:pt-5 max-lg:pb-3 max-md:px-6 max-md:pt-8 max-md:pb-4">
                        <div className="flex justify-center">
                            <img className="w-23/24" src={`${process.env.REACT_APP_IMAGE_DOMAIN}/${item.image_1}`} alt="" />
                        </div>
                        <div className="mt-4 pt-2 border-t-3 border-black">
                            <div className="text-2xl font-bold ml-4">
                                {item.title}
                            </div>
                            <div className="border-l-2 border-black pl-2 mt-1 ml-1 text-lg">
                                {lastestTruncateText(item.text)}
                            </div>
                            <div className="text-xl mt-1">
                                {newsListTimeFormat(item.created_at)}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default News