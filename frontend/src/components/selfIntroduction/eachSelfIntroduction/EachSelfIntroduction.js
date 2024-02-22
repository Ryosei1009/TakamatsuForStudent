import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { calculateGrade, isStudent } from '../../../utils/AccountUtil';
import { newLineUtil } from '../../../utils/TextUtil';

const EachSelfIntroduction = () => {
    const [eachAccount, setEachAccount] = useState({});
    const { postId } = useParams();

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API_DOMAIN}/api/accounts`)
            .then((response) => {
                const data = response.data;
                for (let i = 0; i < data.length; i++) {
                    if (data[i].id === parseInt(postId)) {
                        setEachAccount(data[i]);
                        break; // 見つかったらループを抜ける
                    }
                }
            })
            .catch((error) => {
                console.error(error.message);
            });
    }, [postId]);

    const { id, name, icon_name, naming, grade, self_introduction, skill, hobby, url_1, url_2, url_3, url_4, role } = eachAccount;

    return (
        <div className="mx-96 my-8">
            <div className="text-4xl font-bold my-6">
                {naming}のプロフィール
            </div>
            <div className="flex items-end justify-start mb-12">
                <img src={`${process.env.REACT_APP_IMAGE_DOMAIN}/${icon_name}`} alt="" className="border-black border-1 rounded-full w-48 mb-1" />
                <div className="ml-16">
                    <div className="text-3xl">
                        {parseInt(role) === 3 || role === undefined ? (
                            calculateGrade(grade)
                        ) : (
                            parseInt(role) === 2 ? (
                                "TA"
                            ) : (
                                "メンター"
                            )
                        )}
                    </div>
                    <div className="text-5xl font-bold mt-3 ml-3">
                        {naming}
                    </div>
                    <div className="text-3xl mt-3 ml-2">
                        {name}
                    </div>
                </div>
            </div>
            <div className="text-xl">
                {self_introduction ? (
                    <div className="mb-2">
                        <div className="font-bold mb-1 text-2xl">
                            自己紹介
                        </div>
                        <div className="ml-3">
                            {newLineUtil(self_introduction)}
                        </div>
                    </div>
                ) : ""}



                {skill ? (
                    <div className="mb-2">
                        <div className="font-bold mb-1 text-2xl">
                            スキル
                        </div>
                        <div className="ml-3">
                            {newLineUtil(skill)}
                        </div>
                    </div>
                ) : ""}


                {hobby ? (
                    <div className="mb-2">
                        <div className="font-bold mb-1 text-2xl">
                            趣味
                        </div>
                        <div className="ml-3">
                            {newLineUtil(hobby)}
                        </div>
                    </div>
                ) : ""}

                {url_1 || url_2 || url_3 || url_4 ? (
                    <div className="mb-2">
                        <div className="font-bold mb-1 text-2xl">
                            URL
                        </div>
                        {url_1 && (
                            <a className="ml-3 hover:underline text-blue-500" href={url_1}>
                                {url_1}
                            </a>
                        )}
                        {url_2 && (
                            <a className="ml-3 hover:underline text-blue-500" href={url_2}>
                                {url_2}
                            </a>
                        )}
                        {url_3 && (
                            <a className="ml-3 hover:underline text-blue-500" href={url_3}>
                                {url_3}
                            </a>
                        )}
                        {url_4 && (
                            <a className="ml-3 hover:underline text-blue-500" href={url_4}>
                                {url_4}
                            </a>
                        )}
                    </div>
                ) : null}

                <div className="mb-2">
                    <div className="font-bold mb-1 text-2xl">
                        ID
                    </div>
                    <div className="ml-3">
                        {id}
                    </div>
                </div>
                <div className="mb-2">
                    <div className="font-bold mb-1 text-2xl">
                        生徒/教員
                    </div>
                    <div className="ml-3">
                        {isStudent(role)}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default EachSelfIntroduction