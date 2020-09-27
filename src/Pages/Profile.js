import React from 'react';
import NavBar from '../components/NavBar';

import profileImage from '../assets/profile.jpg';
import Footer from '../components/Footer';

const Profile = (props) => {
  return (
    <div className="flex flex-col sm:items-center">
      <div className="px-5 w-full">
        <NavBar />
      </div>
      <div>
        <h1 className="text-center text-4xl">Personal info</h1>
        <p className="text-center text-lg text-gray-500 pb-10">
          Basic info, like your name and photo
        </p>
        <div className="sm:border rounded-lg sm:divide-y divide-gray-400 sm:w-larger pb-3">
          <div className="flex w-full justify-between px-5 pb-10 sm:py-3 sm:items-center">
            <div className="flex flex-col items-start w-1/2 sm:px-10">
              <span className="text-2xl">Profile</span>
              <span className="text-sm text-gray-500">
                Some info may be visible to other people
              </span>
            </div>
            <button
              className="border border-gray-400 rounded-large m-5 py-3 px-6 focus:outline-none hover:bg-gray-400"
              onClick={() => props.history.push('/edit-profile')}
            >
              Edit
            </button>
          </div>
          <ul className="divide-y divide-gray-400">
            <li className="flex justify-between sm:justify-start items-center px-5 h-32">
              <span className="text-gray-500 sm:px-10 sm:w-4/12">PHOTO</span>
              <img src={profileImage} alt="profile" className="w-24 rounded-lg" />
            </li>
            <li className="flex justify-between sm:justify-start items-center px-5 h-24">
              <span className="text-gray-500 sm:px-10  sm:w-4/12">NAME</span>
              <span className="text-lg">Yomar Gutierrez</span>
            </li>
            <li className="flex justify-between sm:justify-start  items-center px-5 h-24">
              <span className="text-gray-500 sm:px-10 sm:w-4/12">BIO</span>
              <span className="text-lg">I am a software developer</span>
            </li>
            <li className="flex justify-between sm:justify-start  items-center px-5 h-24">
              <span className="text-gray-500 sm:px-10 sm:w-4/12">EMAIL</span>
              <span className="text-lg">yomar.guti@gmail.com</span>
            </li>
            <li className="flex justify-between sm:justify-start  items-center px-5 h-24">
              <span className="text-gray-500 sm:px-10 sm:w-4/12">PASSWORD</span>
              <span className="text-lg">**********</span>
            </li>
          </ul>
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default Profile;
