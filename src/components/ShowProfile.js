import React from 'react';

const ShowProfile = ({ srcAvatar, profileData, onChangeMode }) => {
  const { name, bio, phone, email } = profileData;
  return (
    <>
      <h1 className="text-center text-4xl">Personal info</h1>
      <p className="text-center text-lg text-gray-500 pb-10">
        Basic info, like your name and photo
      </p>
      <div className="sm:border rounded-lg sm:divide-y divide-gray-400 sm:w-larger pb-3">
        <div className="flex w-full justify-between px-5 pb-10 sm:py-3 sm:items-center">
          <div className="flex flex-col items-start w-1/2 sm:px-10">
            <span className="text-2xl">Profile</span>
            <span className="text-sm text-gray-500">Some info may be visible to other people</span>
          </div>
          <button
            className="border border-gray-400 rounded-large m-5 py-3 px-6 focus:outline-none hover:bg-gray-400"
            onClick={onChangeMode}
          >
            Edit
          </button>
        </div>
        <ul className="divide-y divide-gray-400">
          <li className="flex justify-between sm:justify-start items-center px-5 h-32">
            <span className="text-gray-500 sm:px-10 sm:w-4/12">PHOTO</span>
            <img src={srcAvatar} alt="profile" className="w-24 rounded-lg" />
          </li>
          <li className="flex justify-between sm:justify-start items-center px-5 h-24">
            <span className="text-gray-500 sm:px-10  sm:w-4/12">NAME</span>
            <span className="text-lg">{name}</span>
          </li>
          <li className="flex justify-between sm:justify-start  items-center px-5 h-24">
            <span className="text-gray-500 sm:px-10 sm:w-4/12">BIO</span>
            <span className="text-lg">{bio}</span>
          </li>
          <li className="flex justify-between sm:justify-start  items-center px-5 h-24">
            <span className="text-gray-500 sm:px-10 sm:w-4/12">PHONE</span>
            <span className="text-lg">{phone}</span>
          </li>
          <li className="flex justify-between sm:justify-start  items-center px-5 h-24">
            <span className="text-gray-500 sm:px-10 sm:w-4/12">EMAIL</span>
            <span className="text-lg">{email}</span>
          </li>
          <li className="flex justify-between sm:justify-start  items-center px-5 h-24">
            <span className="text-gray-500 sm:px-10 sm:w-4/12">PASSWORD</span>
            <span className="text-lg">**********</span>
          </li>
        </ul>
      </div>
    </>
  );
};

export default ShowProfile;
