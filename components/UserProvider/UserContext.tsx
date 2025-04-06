import { createContext, useContext } from 'react';

export const UserContext = createContext<IUserContext>({
  name: 'Вы',
  setName: () => {},
  email: '',
  setEmail: () => {},
});

export const useUser = () => {
  return useContext(UserContext);
};

export interface IUserContext {
  name: string;
  setName: (value: string) => void;
  email: string;
  setEmail: (value: string) => void;
}
