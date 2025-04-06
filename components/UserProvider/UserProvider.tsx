'use client';

import { useEffect, useState } from 'react';
import { UserContext } from './UserContext';

export default function UserProvider({ children }: { children: any }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  useEffect(() => {
    console.log('Hi!');
    setName(localStorage.getItem('nickname') || '');
    setEmail(localStorage.getItem('email') || '');
  }, []);

  const changeName = (value: string) => {
    setName(value);
    localStorage.setItem('nickname', value);
  };

  const changeEmail = (value: string) => {
    setEmail(value);
    localStorage.setItem('email', value);
  };

  return (
    <UserContext.Provider
      value={{
        name,
        setName: changeName,
        email,
        setEmail: changeEmail,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}
