import React, { useState } from 'react';

import NavBar from '../components/NavBar';
import profilePlaceholder from '../assets/profile-placeholder.svg';
import Footer from '../components/Footer';

import useUserData from '../hooks/useUserData';

import api from '../api/index';

const EditProfile = (props) => {
  const { userData, setUserData } = useUserData(props);
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [avatar, setAvatar] = useState(null);

  const { email, name, phone, bio, profileImage } = userData;

  const srcAvatar = profileImage
    ? `http://localhost:3001/users/me/avatar/${profileImage}`
    : profilePlaceholder;

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setError(null);
    setUserData({ ...userData, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

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

      const token = JSON.parse(localStorage.getItem('token'));
      const user = await api.patch('/users/me', formData, {
        headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'multipart/form-data' },
      });

      if (user) {
        props.history.push('/me');
      }
    } catch (e) {
      setError(e);
    }
  };

  const handleImageChange = (event) => {
    setAvatar(event.target.files[0]);
  };

  const errorMessage = error ? (
    <div className="absolute top-sligth-over left-0 text-xs text-red-500">
      Data not saved to database. Try again.
    </div>
  ) : null;

  return (
    <div className="flex flex-col px-5 sm:items-center">
      <NavBar srcImage={srcAvatar} />
      <div className="sm:w-larger">
        <Footer />
      </div>
    </div>
  );
};

export default EditProfile;
