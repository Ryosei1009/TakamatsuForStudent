import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { calculateGrade, isStudent } from '../../../utils/AccountUtil';

const EachSelfIntroduction = () => {
    const [eachAccount, setEachAccount] = useState({});
    const { postId } = useParams();

    useEffect(() => {
        axios.get("/api/accounts")
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
                <img src={`http://localhost:8000/${icon_name}`} alt="" className="border-black border-1 rounded-full w-48 mb-1" />
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
                    <div className="text-6xl font-bold mt-3 ml-3">
                        {naming}
                    </div>
                    <div className="text-3xl ml-2">
                        {name}
                    </div>
                </div>
            </div>
            <div className="text-xl">
                <div className="mb-2">
                    <div className="font-bold mb-1 text-2xl">
                        {self_introduction ? "自己紹介" : ""}
                    </div>
                    <div className="ml-3">
                        {self_introduction}
                    </div>
                </div>

                <div className="mb-2">
                    <div className="font-bold mb-1 text-2xl">
                        {skill ? "スキル" : ""}
                    </div>
                    <div className="ml-3">
                        {skill}
                    </div>
                </div>

                <div className="mb-2">
                    <div className="font-bold mb-1 text-2xl">
                        {hobby ? "趣味" : ""}
                    </div>
                    <div className="ml-3">
                        {hobby}
                    </div>
                </div>

                <div className="mb-2">
                    <div className="font-bold mb-1 text-2xl">
                        {url_1 || url_2 || url_3 || url_4 ? "URL" : ""}
                    </div>
                    <div className="ml-3">
                        {url_1}
                    </div>
                    <div className="ml-3">
                        {url_2}
                    </div>
                    <div className="ml-3">
                        {url_3}
                    </div>
                    <div className="ml-3">
                        {url_4}
                    </div>
                </div>

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