import { useContext } from 'react';
import { createAuthServiceSessionContext } from '@arcblock/did-connect/lib/Session';

const { SessionProvider, SessionContext, SessionConsumer } = createAuthServiceSessionContext();

function useSessionContext() {
  const info = useContext<SessionType>(SessionContext);
  return info;
}

export { SessionProvider, SessionConsumer, useSessionContext };
