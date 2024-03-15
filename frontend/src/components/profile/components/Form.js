import React, { useState } from 'react'
import { postData } from '../../../utils/DatabaseUtil';
import { calculateGrade, isStudent } from '../../../utils/AccountUtil';
import { eachNewsTimeFormat } from '../../../utils/TimeUtil';

const Form = ({ eachAccount, user }) => {
    const [formData, setFormData] = useState({
        naming: '',
        grade: '',
        self_introduction: '',
        skill: '',
        hobby: '',
        url_1: '',
        url_2: '',
        url_3: '',
        url_4: ''
    });

    const handleSubmit = async (event) => {
        event.preventDefault();

        const formDataToSend = new FormData();

        formDataToSend.append('id', eachAccount.id);
        formDataToSend.append('name', user.name);
        formDataToSend.append('e_mail', user.email);
        formDataToSend.append('naming', formData.naming ? formData.naming : eachAccount.naming);
        formDataToSend.append('icon_name', eachAccount.icon_name);
        formDataToSend.append('grade', formData.grade ? formData.grade : eachAccount.grade);
        formDataToSend.append('self_introduction', formData.self_introduction ? formData.self_introduction : eachAccount.self_introduction);
        formDataToSend.append('skill', formData.skill ? formData.skill : eachAccount.skill);
        formDataToSend.append('hobby', formData.hobby ? formData.hobby : eachAccount.hobby);
        formDataToSend.append('url_1', formData.url_1 ? formData.url_1 : eachAccount.url_1);
        formDataToSend.append('url_2', formData.url_2 ? formData.url_2 : eachAccount.url_2);
        formDataToSend.append('url_3', formData.url_3 ? formData.url_3 : eachAccount.url_3);
        formDataToSend.append('url_4', formData.url_4 ? formData.url_4 : eachAccount.url_4);
        formDataToSend.append('role', eachAccount.role);

        postData('/upload/accounts', formDataToSend, true);
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="mb-2">
                <div className="font-bold mb-1">
                    ニックネーム
                </div>
                <input
                    placeholder="Nっち"
                    maxLength={20}
                    className="w-96 max-sm:w-80 px-3 py-1 bg-stone-100 rounded-md border-1"
                    type="text"
                    name="naming"
                    defaultValue={eachAccount.naming}
                    onChange={handleChange}
                />
            </div>

            {parseInt(eachAccount.role) === 3 || parseInt(eachAccount.role) === 0 || eachAccount.role === undefined ? (
                <div className="mb-2">
                    <div className="font-bold mb-1">
                        卒業予定
                    </div>
                    <input
                        placeholder="2026"
                        maxLength={4}
                        className="w-18 pl-3 py-1 bg-stone-100 rounded-md border-1"
                        type="text"
                        name="grade"
                        defaultValue={eachAccount.grade}
                        onChange={handleChange}
                    />
                    <span className="ml-1">年3月 {eachAccount.role === undefined ? "" : calculateGrade(formData.grade ? formData.grade : eachAccount.grade)}</span>
                </div>) : (
                ""
            )}

            <div className="mb-2">
                <div className="font-bold mb-1">
                    自己紹介
                </div>
                <textarea
                    placeholder="週3で通ってます！仲良くしてね！"
                    className="w-96 max-sm:w-80 h-24 px-3 py-1 bg-stone-100 rounded-md border-1"
                    type="text"
                    name="self_introduction"
                    defaultValue={eachAccount.self_introduction}
                    onChange={handleChange}
                    maxLength={200}
                />
            </div>

            <div className="mb-2">
                <div className="font-bold mb-1">
                    スキル
                </div>
                <textarea
                    placeholder="絵描ける"
                    className="w-96 max-sm:w-80 h-24 px-3 py-1 bg-stone-100 rounded-md border-1"
                    type="text"
                    name="skill"
                    defaultValue={eachAccount.skill}
                    onChange={handleChange}
                />
            </div>

            <div className="mb-2">
                <div className="font-bold mb-1">
                    趣味
                </div>
                <textarea
                    placeholder="カラオケ"
                    className="w-96 max-sm:w-80 h-24 px-3 py-1 bg-stone-100 rounded-md border-1"
                    type="text"
                    name="hobby"
                    defaultValue={eachAccount.hobby}
                    onChange={handleChange}
                />
            </div>

            <div className="mb-2">
                <div className="font-bold mb-1">
                    URL
                </div>
                <input
                    placeholder="https://example.com"
                    maxLength={128}
                    className="mb-1 w-96 max-sm:w-80 px-3 py-1 bg-stone-100 rounded-md border-1"
                    type="text"
                    name="url_1"
                    defaultValue={eachAccount.url_1}
                    onChange={handleChange}
                />
                <input
                    placeholder="https://example.com"
                    maxLength={128}
                    className="mb-1 w-96 max-sm:w-80 px-3 py-1 bg-stone-100 rounded-md border-1"
                    type="text"
                    name="url_2"
                    defaultValue={eachAccount.url_2}
                    onChange={handleChange}
                />
                <input
                    placeholder="https://example.com"
                    maxLength={128}
                    className="mb-1 w-96 max-sm:w-80 px-3 py-1 bg-stone-100 rounded-md border-1"
                    type="text"
                    name="url_3"
                    defaultValue={eachAccount.url_3}
                    onChange={handleChange}
                />
                <input
                    placeholder="https://example.com"
                    maxLength={128}
                    className="mb-1 w-96 max-sm:w-80 px-3 py-1 bg-stone-100 rounded-md border-1"
                    type="text"
                    name="url_4"
                    defaultValue={eachAccount.url_4}
                    onChange={handleChange}
                />
            </div>

            <div>
                <button type="submit" className="bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-6 max-sm:px-3 rounded">
                    更新
                </button>
                <span className="ml-4 max-sm:ml-2">
                    {eachAccount.update_at ? "最終更新 " + eachNewsTimeFormat(eachAccount.update_at) : ""}
                </span>
            </div>

            <div className="my-8">
                <div className="mb-2">
                    <div className="font-bold mb-1">
                        ID
                    </div>
                    <input className="w-96 max-sm:w-80 px-3 py-1 text-gray-500 bg-stone-100 rounded-md border-1" type="text" disabled value={eachAccount.id} />
                </div>
                <div className="mb-2">
                    <div className="font-bold mb-1">
                        名前
                    </div>
                    <input className="w-96 max-sm:w-80 px-3 py-1 text-gray-500 bg-stone-100 rounded-md border-1" type="text" disabled value={user.name} />
                </div>
                <div className="mb-2">
                    <div className="font-bold mb-1">
                        e-mail
                    </div>
                    <input className="w-96 max-sm:w-80 px-3 py-1 text-gray-500 bg-stone-100 rounded-md border-1" type="text" disabled value={user.email} />
                </div>
                <div className="mb-2">
                    <div className="font-bold mb-1">
                        生徒/教員
                    </div>
                    <input className="w-96 max-sm:w-80 px-3 py-1 text-gray-500 bg-stone-100 rounded-md border-1" type="text" disabled value={isStudent(eachAccount.role)} />
                </div>
            </div>
        </form>
    )
}

export default Form