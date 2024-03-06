import React, { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import LogoutButton from "../_util/account/LogoutButton";
import axios from "axios";
import { calculateGrade, isStudent } from "../../utils/AccountUtil";
import Icon from "./Icon";
import { eachNewsTimeFormat } from "../../utils/TimeUtil";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { fetchData } from "../../utils/DatabaseUtil";

const Profile = () => {
  const { user } = useAuth0();
  const [eachAccount, setEachAccount] = useState({});
  const { naming, grade, self_introduction, skill, hobby, url_1, url_2, url_3, url_4, role, update_at } = eachAccount;
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

  useEffect(() => {
    fetchData('/api/accounts', setEachAccount, user, "email", ".email");
  }, [user]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
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

      await axios.post(`${process.env.REACT_APP_API_DOMAIN}/upload/accounts`, formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      window.location.reload();
    } catch (error) {
      console.error('データのアップロード中にエラーが発生しました:', error);
    }
  };

  return (
    <>
      <HelmetProvider>
        <Helmet>
          <title>
            Profile - TCFS
          </title>
        </Helmet>
      </HelmetProvider>
      <div className="mx-96 max-2xl:mx-64 max-xl:mx-52 max-lg:mx-36 max-md:mx-24 max-sm:mx-8 my-8">
        <div className="text-4xl font-bold my-6">
          Your profile
        </div>
        {eachAccount.id ? (
          <Icon />
        ) : ""}
        <form onSubmit={handleSubmit}>
          <div className="mb-2">
            <div className="font-bold mb-1">
              Naming
            </div>
            <input
              placeholder="Nっち"
              maxLength={20}
              className="w-96 max-sm:w-80 px-3 py-1 bg-stone-100 rounded-md border-1"
              type="text"
              name="naming"
              defaultValue={naming}
              onChange={handleChange}
            />
          </div>

          {parseInt(role) === 3 || role === undefined ? (
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
                defaultValue={grade}
                onChange={handleChange}
              />
              <span className="ml-1">年3月 {role === undefined ? "" : calculateGrade(formData.grade ? formData.grade : grade)}</span>
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
              defaultValue={self_introduction}
              onChange={handleChange}
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
              defaultValue={skill}
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
              defaultValue={hobby}
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
              defaultValue={url_1}
              onChange={handleChange}
            />
            <input
              placeholder="https://example.com"
              maxLength={128}
              className="mb-1 w-96 max-sm:w-80 px-3 py-1 bg-stone-100 rounded-md border-1"
              type="text"
              name="url_2"
              defaultValue={url_2}
              onChange={handleChange}
            />
            <input
              placeholder="https://example.com"
              maxLength={128}
              className="mb-1 w-96 max-sm:w-80 px-3 py-1 bg-stone-100 rounded-md border-1"
              type="text"
              name="url_3"
              defaultValue={url_3}
              onChange={handleChange}
            />
            <input
              placeholder="https://example.com"
              maxLength={128}
              className="mb-1 w-96 max-sm:w-80 px-3 py-1 bg-stone-100 rounded-md border-1"
              type="text"
              name="url_4"
              defaultValue={url_4}
              onChange={handleChange}
            />
          </div>

          <div>
            <button type="submit" className="bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-6 max-sm:px-3 rounded">
              更新
            </button>
            <span className="ml-4 max-sm:ml-2">
              {update_at ? "最終更新 " + eachNewsTimeFormat(update_at) : ""}
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
              <input className="w-96 max-sm:w-80 px-3 py-1 text-gray-500 bg-stone-100 rounded-md border-1" type="text" disabled value={isStudent(role)} />
            </div>
          </div>
        </form>
        <LogoutButton />
      </div>
    </>
  );
};

export default Profile;