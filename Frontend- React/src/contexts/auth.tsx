import React, { ReactElement, createContext, useEffect, useState } from 'react';
import api from '../services/api';

interface AuthContextState {
  // user: string | null;
  token: string | null;
  signin: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string) => Promise<void>;
  signed: boolean | null;
}

const AuthContext = createContext<AuthContextState>({} as AuthContextState);

export const AuthProvider: React.FC<{ children?: ReactElement }> = ({
  children,
}) => {
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const loadingStoreData = () => {
      const storageToken = localStorage.getItem('@Auth:token');
      setToken(storageToken);
    };
    loadingStoreData();
  }, [token]);

  const signin = async (email: string, password: string) => {
    try {
      const { data } = await api.post('/auth/signin', { email, password });
      if (data.error) {
        alert(data.error);
      } else {
        const access_token = data.access_token;
        setToken(access_token);
        api.defaults.headers.common['Authorization'] = `Bearer ${access_token}`;
        localStorage.setItem('@Auth:token', access_token);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const signup = async (email: string, password: string) => {
    try {
      const { data } = await api.post('/auth/signup', { email, password });
      if (data.error) {
        alert(data.error);
      } else {
        console.log('New User Created', data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        token,
        signed: !!token,
        signin,
        signup,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
