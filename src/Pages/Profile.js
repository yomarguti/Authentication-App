import React, { useState } from 'react';
import NavBar from '../components/NavBar';

import profilePlaceholder from '../assets/profile-placeholder.svg';
import Footer from '../components/Footer';

import useUserData from '../hooks/useUserData';
import ShowProfile from '../components/ShowProfile';
import EditProfile from '../components/EditProfile';

import api from '../api/index';
import { config } from '../constants';

const Profile = (props) => {
  const { userData, setUserData } = useUserData(props);
  const [editMode, setEditMode] = useState(false);
  const [error, setError] = useState(null);
  const [avatar, setAvatar] = useState(null);
  const [filePreview, setFilePreview] = useState(null);

  const srcAvatar = filePreview
    ? filePreview
    : userData.profileImage
    ? `${config.url.API_URL}/users/me/avatar/${userData.profileImage}`
    : profilePlaceholder;

  const handleChangeMode = () => {
    setEditMode(!editMode);
  };

  const handleImageChange = (event) => {
    setAvatar(event.target.files[0]);
    setFilePreview(URL.createObjectURL(event.target.files[0]));
  };

  const handleSubmit = async (event, formDataObject) => {
    event.preventDefault();

    const { name, email, phone, bio, password } = formDataObject;

    try {
      let formData = new FormData();
      formData.append('name', name);
      formData.append('email', email);
      formData.append('phone', phone);
      formData.append('bio', bio);

      if (password !== '') formData.append('password', password);
      if (avatar) {
        formData.append('profileImage', avatar);
        formData.append('avatar', true);
      }

      const response = await api.patch('/users/me', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      const { user } = response.data;

      if (user) {
        setEditMode(false);
        setUserData({ ...user });
      }
    } catch (e) {
      setError(e);
    }
  };

  const showContent = editMode ? (
    <EditProfile
      profileData={{ ...userData }}
      srcAvatar={srcAvatar}
      error={error}
      handleError={setError}
      handleImageChange={handleImageChange}
      handleSubmit={handleSubmit}
      onChangeMode={handleChangeMode}
    />
  ) : (
    <ShowProfile
      profileData={{ ...userData }}
      srcAvatar={srcAvatar}
      onChangeMode={handleChangeMode}
    />
  );

  return (
    <div className="flex flex-col sm:items-center">
      <div className="px-5 w-full">
        <NavBar srcImage={srcAvatar} username={userData.name} />
      </div>
      <div className="sm:w-larger">
        {showContent}
        <Footer />
      </div>
    </div>
  );
};

export default Profile;
