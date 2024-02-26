import { useAuth0 } from '@auth0/auth0-react';
import React, { useEffect, useState } from 'react'
import { getAccountData } from '../../../utils/AccountUtil';
import axios from 'axios';

const UploadPhoto = () => {
  const [previewUrl, setPreviewUrl] = useState(null);
  const { user } = useAuth0();
  const [eachAccount, setEachAccount] = useState({});
  const [imageDimensions, setImageDimensions] = useState({ width: 0, height: 0 });
  const [isOpen, setIsOpen] = useState(false);

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
    setIsOpen(isOpen => !isOpen);
  };

  return isOpen ? (
    <div className="w-64">
      <button onClick={toggleOpen}>
        ◾️
      </button>
      <form onSubmit={handleSubmit}>
        <input type="text" name="title" value={formData.text} onChange={handleChange} required placeholder="タイトル" />
        <input type="text" name="tags" value={formData.tags} onChange={handleChange} required placeholder="tag" />
        {previewUrl && (
          <div>
            <img src={previewUrl} alt="Preview" />
          </div>
        )}
        <input type="file" accept="image/*" name="image_name" onChange={handleImageChange} className="" required />
        <button type="submit">送信</button>
      </form>
    </div>
  ) : (
    <div className="w-8 h-8 fixed z-50">
      <button onClick={toggleOpen}>
        ◾️
      </button>
    </div>
  );
}

export default UploadPhoto