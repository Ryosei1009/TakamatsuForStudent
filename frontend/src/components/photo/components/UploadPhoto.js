import React, { useEffect, useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { getAccountData } from '../../../utils/AccountUtil';
import axios from 'axios';

const UploadPhotoForm = ({ formData, previewUrl, imageDimensions, handleChange, handleImageChange, handleSubmit }) => (
  <form onSubmit={handleSubmit} className="p-4">
    <input type="text" name="title" value={formData.title} onChange={handleChange} required placeholder="タイトル" className="block w-full border border-gray-300 rounded-md px-3 py-2 mb-2 focus:outline-none focus:border-blue-500" />
    <select
      name="tags"
      value={formData.tags}
      onChange={handleChange}
      required
      className="block w-full border border-gray-300 rounded-md px-3 py-2 mb-2 focus:outline-none focus:border-blue-500"
    >
      <option value="" disabled>選択してください。</option>
      <option value="放課後">放課後</option>
      <option value="イベント">イベント</option>
      <option value="その他">その他</option>
    </select>
    {previewUrl && (
      <div className="mb-2">
        <img src={previewUrl} alt="Preview" className="w-full h-auto rounded-md" />
      </div>
    )}
    <input type="file" accept="image/*" name="image" onChange={handleImageChange} className="w-full border border-gray-300 rounded-md px-3 py-2 mb-2 focus:outline-none focus:border-blue-500 cursor-pointer" required />
    <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600">送信</button>
  </form>
);

const FilterDropdown = ({ searchTerm, handleSearchChange }) => (
  <div className="p-4">
    <select
      value={searchTerm}
      onChange={handleSearchChange}
      required
      className="block w-full border border-gray-300 rounded-md px-3 py-2 mb-2 focus:outline-none focus:border-blue-500"
    >
      <option value="" disabled>選択してください。</option>
      <option value="放課後">放課後</option>
      <option value="イベント">イベント</option>
      <option value="その他">その他</option>
      <option value="">リセット</option>
    </select>
  </div>
);

const UploadPhoto = ({ onSearch }) => {
  const [previewUrl, setPreviewUrl] = useState(null);
  const { user } = useAuth0();
  const [eachAccount, setEachAccount] = useState({});
  const [imageDimensions, setImageDimensions] = useState({ width: 0, height: 0 });
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    getAccountData(user, setEachAccount);
  }, [user]);

  const [formData, setFormData] = useState({
    title: '',
    image_name: '',
    tags: ''
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setFormData((prevData) => ({
      ...prevData,
      image_name: file,
    }));
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result);
      };
      reader.readAsDataURL(file);

      const img = new Image();
      img.onload = () => {
        setImageDimensions({ width: img.width, height: img.height });
      };
      img.src = URL.createObjectURL(file);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const formDataToSend = new FormData();
      formDataToSend.append('title', formData.title);
      formDataToSend.append('image_name', formData.image_name);
      formDataToSend.append('tags', formData.tags);
      formDataToSend.append('width', imageDimensions.width);
      formDataToSend.append('height', imageDimensions.height);
      formDataToSend.append('created_by', eachAccount.naming);
      formDataToSend.append('created_by_id', eachAccount.id);

      const response = await axios.post(`${process.env.REACT_APP_API_DOMAIN}/upload/photos`, formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log('Response from server:', response.data);
      alert('PERFECT!!!');
      window.location.reload();
    } catch (error) {
      console.error('Error uploading data:', error);
    }
  };

  const toggleOpen = () => {
    setIsOpen(!isOpen);
  };

  const handleSearchChange = (event) => {
    const newSearchTerm = event.target.value;
    setSearchTerm(newSearchTerm);
    onSearch(newSearchTerm);
  };

  return (
    <div className="relative h-screen">
      <input type="checkbox" className="hidden" id="openSidebarMenu" checked={isOpen} onChange={toggleOpen} />
      <label htmlFor="openSidebarMenu" className="fixed z-50 cursor-pointer top-6 max-sm:top-20 left-6">
        <div className="absolute h-14 w-14 bg-white z-30 -top-4 -left-4 rounded-2xl"></div>
        <div className={`absolute h-1 w-6 bg-black transform origin-center transition-all z-40 ${isOpen ? 'rotate-135 top-2' : ''}`}></div>
        <div className={`absolute h-1 w-6 bg-black transition-all z-40 ${isOpen ? 'opacity-0' : 'top-2 opacity-100'}`}></div>
        <div className={`absolute h-1 w-6 bg-black transform origin-center transition-all z-40 ${isOpen ? '-rotate-135 top-2' : 'top-4'}`}></div>
      </label>

      <div id="sidebarMenu" className={`h-full top-0 bg-white fixed left-0 w-80 transform ${isOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 z-20 rounded-r-3xl`}>
        <div className="top-16 max-sm:top-28 absolute">
          <div className="ml-4 text-3xl font-bold">
            Upload Photo
          </div>
          <UploadPhotoForm formData={formData} previewUrl={previewUrl} imageDimensions={imageDimensions} handleChange={handleChange} handleImageChange={handleImageChange} handleSubmit={handleSubmit} />

          <div className="ml-4 mt-4 text-3xl font-bold">
            フィルタリグ
          </div>
          <FilterDropdown searchTerm={searchTerm} handleSearchChange={handleSearchChange} />
        </div>
      </div>
    </div>
  );
}

export default UploadPhoto;