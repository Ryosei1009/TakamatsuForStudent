import { React, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { newLineUtil } from '../../utils/TextUtil';
import { eachNewsTimeFormat } from '../../utils/TimeUtil';
import { fetchData } from '../../utils/Fetch';

const EachNews = () => {
    const [eachNews, setEachNews] = useState({});
    const { postId } = useParams();

    useEffect(() => {
        fetchData('/api/news', (data) => {
            for (let i = 0; i < data.length; i++) {
                if (data[i].id === parseInt(postId)) {
                    setEachNews(data[i]);
                    break;
                }
            }
        });
    }, [postId]);

    return (
        <>
            <div className="mx-72 px-8 py-8">
                <div className="text-5xl font-bold mb-10">
                    <span className="border-b-2 p-3 border-black block">
                        {eachNews.title}
                    </span>
                </div>
                <div className="text-xl mx-3">
                    <div className="border-gray-500">
                        {newLineUtil(eachNews.text || '')}
                    </div>
                    <a target="_blank" rel="noreferrer" href={`${process.env.REACT_APP_IMAGE_DOMAIN}/${eachNews.image_1}`}>
                        <img className="rounded-3xl my-4 hover:opacity-80 hover:rounded-none duration-300 inline-block" src={`${process.env.REACT_APP_IMAGE_DOMAIN}/${eachNews.image_1}`} alt="" />
                    </a>
                </div>
                <div className="text-info">
                    {eachNewsTimeFormat(eachNews.created_at)}・
                    <a href={`../selfintroduction/${eachNews.created_by_id}`} className="hover:underline">
                        {eachNews.created_by}
                    </a>
                </div>
            </div>
        </>
    )
}

export default EachNews
