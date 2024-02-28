import React, { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import LogoutButton from "../_util/account/LogoutButton";
import axios from "axios";
import { calculateGrade, getAccountData, isStudent } from "../../utils/AccountUtil";
import Icon from "./Icon";
import { eachNewsTimeFormat } from "../../utils/TimeUtil";

const Profile = () => {
  const { user } = useAuth0();
  const [eachAccount, setEachAccount] = useState({});
  const { naming, grade, self_introduction, skill, hobby, url_1, url_2, url_3, url_4, role, update_at } = eachAccount;
  const [formData, setFormData] = useState({
    id: '',
    name: '',
    e_mail: '',
    naming: '',
    grade: '',
    self_introduction: '',
    skill: '',
    hobby: '',
    url_1: '',
    url_2: '',
    url_3: '',
    url_4: '',
    role: ''
  });

  useEffect(() => {
    getAccountData(user, setEachAccount);
  }, [user]);

  const handleChange = (event) => {
    const { name, defaultValue } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: defaultValue,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const formDataToSend = new FormData();

      formDataToSend.append('id', eachAccount.id);
      formDataToSend.append('name', user.name);
      formDataToSend.append('e_mail', user.email);
      formDataToSend.append('naming', event.target.elements.naming.value);
      formDataToSend.append('icon_name', eachAccount.icon_name);
      formDataToSend.append('grade', event.target.elements.grade.value);
      formDataToSend.append('self_introduction', event.target.elements.self_introduction.value);
      formDataToSend.append('skill', event.target.elements.skill.value);
      formDataToSend.append('hobby', event.target.elements.hobby.value);
      formDataToSend.append('url_1', event.target.elements.url_1.value);
      formDataToSend.append('url_2', event.target.elements.url_2.value);
      formDataToSend.append('url_3', event.target.elements.url_3.value);
      formDataToSend.append('url_4', event.target.elements.url_4.value);
      formDataToSend.append('role', eachAccount.role);

      const response = await axios.post(`${process.env.REACT_APP_API_DOMAIN}/upload/accounts`, formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      console.log('Response from server:', response.data);
      alert('PERFECT!!!');
      window.location.reload();
    } catch (error) {
      console.error('Error uploading data:', error);
    }
  };

  return (
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
          <input className="w-96 max-sm:w-80 px-3 py-1 bg-stone-100 rounded-md border-1" type="text" name="naming" defaultValue={formData.naming ? formData.naming : naming} onChange={handleChange} />
        </div>

        {parseInt(role) === 3 || role === undefined ? (
          <div className="mb-2">
            <div className="font-bold mb-1">
              卒業予定
            </div>
            <input className="w-18 pl-3 py-1 bg-stone-100 rounded-md border-1" type="text" name="grade" defaultValue={formData.grade ? formData.grade : grade} onChange={handleChange} />
            <span className="ml-1">年3月 {role === undefined ? "" : calculateGrade(formData.grade ? formData.grade : grade)}</span>
          </div>) : (
          ""
        )}

        <div className="mb-2">
          <div className="font-bold mb-1">
            自己紹介
          </div>
          <textarea className="w-96 max-sm:w-80 h-24 px-3 py-1 bg-stone-100 rounded-md border-1" type="text" name="self_introduction" defaultValue={formData.self_introduction ? formData.self_introduction : self_introduction} onChange={handleChange} />
        </div>

        <div className="mb-2">
          <div className="font-bold mb-1">
            スキル
          </div>
          <textarea className="w-96 max-sm:w-80 h-24 px-3 py-1 bg-stone-100 rounded-md border-1" type="text" name="skill" defaultValue={formData.skill ? formData.skill : skill} onChange={handleChange} />
        </div>

        <div className="mb-2">
          <div className="font-bold mb-1">
            趣味
          </div>
          <textarea className="w-96 max-sm:w-80 h-24 px-3 py-1 bg-stone-100 rounded-md border-1" type="text" name="hobby" defaultValue={formData.hobby ? formData.hobby : hobby} onChange={handleChange} />
        </div>

        <div className="mb-2">
          <div className="font-bold mb-1">
            URL
          </div>
          <input className="mb-1 w-96 max-sm:w-80 px-3 py-1 bg-stone-100 rounded-md border-1" type="text" name="url_1" defaultValue={formData.url_1 ? formData.url_1 : url_1} onChange={handleChange} />
          <input className="mb-1 w-96 max-sm:w-80 px-3 py-1 bg-stone-100 rounded-md border-1" type="text" name="url_2" defaultValue={formData.url_2 ? formData.url_2 : url_2} onChange={handleChange} />
          <input className="mb-1 w-96 max-sm:w-80 px-3 py-1 bg-stone-100 rounded-md border-1" type="text" name="url_3" defaultValue={formData.url_3 ? formData.url_3 : url_3} onChange={handleChange} />
          <input className="mb-1 w-96 max-sm:w-80 px-3 py-1 bg-stone-100 rounded-md border-1" type="text" name="url_4" defaultValue={formData.url_4 ? formData.url_4 : url_4} onChange={handleChange} />
        </div>

        <div>
          <button type="submit" class="bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-6 max-sm:px-3 rounded">
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
  );
};

export default Profile;