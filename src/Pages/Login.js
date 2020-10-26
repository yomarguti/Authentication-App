import React, { useState, useEffect } from 'react';

import logo from '../assets/devchallenges.svg';
import googleLogo from '../assets/Google.svg';
import facebookLogo from '../assets/Facebook.svg';
import twitterLogo from '../assets/Twitter.svg';
import githubLogo from '../assets/Gihub.svg';

import api from '../api/index';
import { config } from '../constants';

import Footer from '../components/Footer';

const OAUTH_BUTTONS = [
  {
    alt: 'Google Logo',
    src: googleLogo,
    url: '/auth/google',
  },
  {
    alt: 'Facebook Logo',
    src: facebookLogo,
    url: '/',
  },
  {
    alt: 'Twitter Logo',
    src: twitterLogo,
    url: '/',
  },
  {
    alt: 'Github Logo',
    src: githubLogo,
    url: '/auth/github',
  },
];

const Login = (props) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSignUp, setIsSignUp] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const token = JSON.parse(localStorage.getItem('token'));
    if (token) {
      props.history.push('/me');
    }
  }, [props.history]);

  const handleChangeEmail = (event) => {
    setError(null);
    setEmail(event.target.value);
  };

  const handleChangePassword = (event) => {
    setError(null);
    setPassword(event.target.value);
  };

  const handleClickLogin = () => {
    const newState = !isSignUp;
    setIsSignUp(newState);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const endpoint = isSignUp ? '/users' : '/users/login';
      const response = await api.post(endpoint, { email, password });
      localStorage.setItem('token', JSON.stringify(response.data.token));
      props.history.push('/me');
    } catch (error) {
      setError(error);
      console.log('error:', error);
    }
  };

  const welcomeMessage = isSignUp ? (
    <>
      <h1 className="font-bold text-lg pb-5">Join thousands of learners from around the world</h1>
      <p className="pb-6">
        Master web development by making real-life projects. There are multiple paths for you to
        choose
      </p>
    </>
  ) : (
    <h1 className="font-bold my-8">Login</h1>
  );

  const errorMessage = error ? (
    <div className="absolute top-sligth-over left-0 text-xs text-red-500">
      An error ocurred during Authentication
    </div>
  ) : null;

  const oauthRow = (
    <ul className="flex justify-around w-10/12">
      {OAUTH_BUTTONS.map(({ alt, src, url }) => {
        return (
          <li key={alt}>
            <a href={`${config.url.API_URL}${url}`} className="focus:outline-none">
              <img src={src} alt={alt} />
            </a>
          </li>
        );
      })}
    </ul>
  );

  return (
    <div className="flex flex-col h-screen sm:w-1w sm:mx-auto p-5">
      <div className="flex flex-col items-start pb-10 sm:p-12  sm:border border-gray-400 rounded-lg sm:mt-32">
        <img src={logo} alt="Logo" className="pb-5" />
        {welcomeMessage}
        <form className="w-full" onSubmit={handleSubmit}>
          <div className="flex items-baseline border border-gray-500 rounded-md p-3 mb-4">
            <i className="fas fa-envelope text-gray-600 mr-2"></i>
            <input
              type="email"
              placeholder="Email"
              className="outline-none flex-1"
              value={email}
              onChange={handleChangeEmail}
            />
          </div>
          <div className="flex items-baseline border border-gray-500 rounded-md p-3 mb-10 relative">
            <i className="fas fa-lock text-gray-600 mr-2"></i>
            <input
              type="password"
              placeholder="Password"
              className="outline-none flex-1"
              value={password}
              onChange={handleChangePassword}
            />
            {errorMessage}
          </div>
          <button
            className="bg-blue-bright hover:bg-blue-500 rounded-md text-white w-full p-2 mb-5 focus:outline-none"
            type="submit"
          >
            Start coding now
          </button>
        </form>
        <div className="flex flex-col mb-5 w-full items-center">
          <p className="pb-2 text-gray-500">or continue with these social profile</p>
          {oauthRow}
        </div>
        <div className="flex justify-center w-full">
          <p className="text-gray-500">Already a member?</p>
          <span>
            <button
              onClick={handleClickLogin}
              className="text-blue-500 pl-1 hover:text-blue-700 focus:outline-none"
            >
              {isSignUp ? 'Login' : 'Register'}
            </button>
          </span>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Login;
