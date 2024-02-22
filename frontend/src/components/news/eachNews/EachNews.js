import { React, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { newLineUtil } from '../../../utils/TextUtil';
import { eachNewsTimeFormat } from '../../../utils/TimeUtil';

const EachNews = () => {
    const [eachNews, setEachNews] = useState({});
    const { postId } = useParams();

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API_DOMAIN}/api/news`)
            .then((response) => {
                const data = response.data;
                for (let i = 0; i < data.length; i++) {
                    if (data[i].id === parseInt(postId)) {
                        setEachNews(data[i]);
                        break; // 見つかったらループを抜ける
                    }
                }
            })
            .catch((error) => {
                console.error(error.message);
            });
    }, [postId]);

    const { title, text, created_at, created_by, image_1 } = eachNews;

    return (
        <>
            <div className="mx-72 px-8 py-8">
                <div className="text-5xl font-bold mb-10">
                    <span className="border-b-2 p-3 border-black block">
                        {title}
                    </span>
                </div>
                <div className="text-xl mx-3">
                    <div className="border-gray-500">
                        {newLineUtil(text || '')}
                    </div>
                    <a target="_blank" rel="noreferrer" href={`${process.env.REACT_APP_IMAGE_DOMAIN}/${image_1}`}>
                        <img className="rounded-3xl my-4 hover:opacity-80 hover:rounded-none duration-300 inline-block" src={`${process.env.REACT_APP_IMAGE_DOMAINA}/${image_1}`} alt="" />
                    </a>
                </div>
                <div className="text-info">
                    {eachNewsTimeFormat(created_at)}・
                    <a href={`./${postId}`} className="hover:underline">
                        {created_by}
                    </a>
                </div>
            </div>
        </>
    )
}

export default EachNews
