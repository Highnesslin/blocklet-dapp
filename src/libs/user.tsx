import {
  FC,
  PropsWithChildren,
  createContext,
  useContext,
  useEffect,
  useState,
  Dispatch,
  SetStateAction,
  useMemo,
} from 'react';
import { useSessionContext } from './session';

export type User = SessionType['session']['user'] | null;

const UserContext = createContext<{
  user: User;
  setUser: Dispatch<SetStateAction<User>>;
} | null>(null);

export const useUser = function () {
  const ctx = useContext(UserContext);
  if (!ctx) {
    throw new Error('请将组件放置在 <UserProvider /> 下');
  }
  return ctx;
};

export const UserProvider: FC<PropsWithChildren> = function ({ children }) {
  const [user, setUser] = useState<User>(null);
  const { session, api } = useSessionContext();

  useEffect(() => {
    if (!session.user) return;

    api.post('/api/login').then(({ data }) => {
      setUser({
        did: data.data.did,
        fullName: data.data.fullName,
        avatar: session.user.avatar,
        phone: data.data.phone,
        email: data.data.email,
      });
    });
  }, [api, session.user]);

  const shared = useMemo(() => ({ user, setUser }), [user, setUser]);

  return <UserContext.Provider value={shared}>{children}</UserContext.Provider>;
};
