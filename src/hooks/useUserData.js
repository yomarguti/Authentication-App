import { useEffect, useState } from 'react';
import api from '../api/index';

const useUserData = ({ history }) => {
  const initialState = {
    name: '',
    bio: '',
    email: '',
    phone: '',
    password: '',
  };

  const [userData, setUserData] = useState(initialState);

  useEffect(() => {
    const fetchAuth = async () => {
      try {
        const token = JSON.parse(localStorage.getItem('token'));
        const response = await api.get('/users/me', {
          headers: { Authorization: `Bearer ${token}` },
        });
        const { user } = response.data;

        setUserData({ ...user });
      } catch (error) {
        localStorage.removeItem('token');
        history.push('/');
        console.log('error:', error);
      }
    };

    fetchAuth();
  }, [history]);

  return {
    userData,
    setUserData,
  };
};

export default useUserData;
