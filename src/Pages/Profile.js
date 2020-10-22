import React, { useState } from 'react';
import NavBar from '../components/NavBar';

import profilePlaceholder from '../assets/profile-placeholder.svg';
import Footer from '../components/Footer';

import useUserData from '../hooks/useUserData';
import ShowProfile from '../components/ShowProfile';
import EditProfile from '../components/EditProfile';

import api from '../api/index';

const Profile = (props) => {
  const { userData, setUserData } = useUserData(props);
  const [editMode, setEditMode] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [avatar, setAvatar] = useState(null);
  const [filePreview, setFilePreview] = useState(null);

  const srcAvatar = filePreview
    ? filePreview
    : userData.profileImage
    ? `http://localhost:3001/users/me/avatar/${userData.profileImage}`
    : profilePlaceholder;

  const handleChangeMode = () => {
    setEditMode(!editMode);
  };

  const handleChangeForm = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setError(null);
    setUserData({ ...userData, [name]: value });
  };

  const handleImageChange = (event) => {
    setAvatar(event.target.files[0]);
    setFilePreview(URL.createObjectURL(event.target.files[0]));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      let formData = new FormData();
      const { name, email, phone, bio } = userData;
      formData.append('name', name);
      formData.append('email', email);
      formData.append('phone', phone);
      formData.append('bio', bio);

      if (password !== '') formData.append('password', password);
      if (avatar) {
        formData.append('profileImage', avatar);
        formData.append('avatar', true);
      }

      const user = await api.patch('/users/me', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      if (user) {
        setEditMode(false);
      }
    } catch (e) {
      setError(e);
    }
  };

  const showContent = editMode ? (
    <EditProfile
      profileData={{ ...userData }}
      srcAvatar={srcAvatar}
      handleChange={handleChangeForm}
      password={password}
      setPassword={setPassword}
      error={error}
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
        <NavBar srcImage={srcAvatar} />
      </div>
      <div className="sm:w-larger">
        {showContent}
        <Footer />
      </div>
    </div>
  );
};

export default Profile;
