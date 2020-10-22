import React, { useState, useEffect } from 'react';

import logo from '../assets/devchallenges.svg';
import googleLogo from '../assets/Google.svg';
import facebookLogo from '../assets/Facebook.svg';
import twitterLogo from '../assets/Twitter.svg';
import githubLogo from '../assets/Gihub.svg';

import api from '../api/index';

import Footer from '../components/Footer';

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
          <ul className="flex justify-around w-10/12">
            <li>
              <a
                href="https://auth-app-dev-challenge.herokuapp.com/auth/google"
                className="focus:outline-none"
              >
                <img src={googleLogo} alt="Google Logo" />
              </a>
            </li>
            <li>
              <a href="/" className="focus:outline-none">
                <img src={facebookLogo} alt="Google Logo" />
              </a>
            </li>
            <li>
              <a
                href="https://auth-app-dev-challenge.herokuapp.com/auth/twitter"
                className="focus:outline-none"
              >
                <img src={twitterLogo} alt="Google Logo" />
              </a>
            </li>
            <li>
              <a
                href="https://auth-app-dev-challenge.herokuapp.com/auth/github"
                className="focus:outline-none"
              >
                <img src={githubLogo} alt="Github Logo" />
              </a>
            </li>
          </ul>
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
