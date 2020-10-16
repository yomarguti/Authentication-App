import { useEffect, useState } from 'react';
import api from '../api/index';

const useUserData = ({ history, match }) => {
  const initialState = {
    name: '',
    bio: '',
    email: '',
    phone: '',
    profileImage: null,
  };

  const { token: urlToken } = match.params;
  const localToken = JSON.parse(localStorage.getItem('token'));
  const token = localToken ? localToken : urlToken;

  if (urlToken && !localToken) {
    localStorage.setItem('token', JSON.stringify(urlToken));
  }

  const [userData, setUserData] = useState(initialState);

  useEffect(() => {
    const fetchAuth = async () => {
      try {
        const response = await api.get('/users/me', {
          headers: { Authorization: `Bearer ${token}` },
        });
        const user = response.data.user;
        setUserData({ ...user });
      } catch (error) {
        localStorage.removeItem('token');
        history.push('/');
        console.log('error:', error);
      }
    };

    fetchAuth();
  }, [history, token]);

  return {
    userData,
    setUserData,
  };
};

export default useUserData;
