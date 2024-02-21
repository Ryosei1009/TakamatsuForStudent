import React from 'react'
import { useEffect, useState } from 'react'
import { newsListTimeFormat } from '../../../utils/TimeUtil';
import { truncateText } from '../../../utils/TextUtil';
import axios from 'axios';

const FetchNews = () => {
    const [news, setNews] = useState([]);
    useEffect(() => {
        axios.get("/api/news")
            .then((response) => {
                const data = response.data;
                setNews(data);
            })
            .catch((error) => {
                console.error(error.message);
            });
    }, []);

    return (
        <div className="mx-72 border-l-4 border-black pl-10">
            {news.length > 0 ? (
                news.slice().reverse().map((item) => (
                    <a href={item.id} key={item.id} className="flex items-center my-8 pr-4 rounded-xl hover:opacity-90">
                        <div className="w-2/5">
                            <img className="w-full rounded-xl" src={`http://localhost:8000/${item.image_1}`} alt="" />
                        </div>
                        <div className="w-3/5 ml-12">
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

export default FetchNews