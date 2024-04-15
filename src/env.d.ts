declare var blocklet: { prefix: string } | undefined;

declare module '*.svg';

declare module '@arcblock/did-connect/*';
declare module 'nedb-promise';

declare interface SessionType {
  api: import('axios').Axios;
  session: {
    user: {
      did: string;
      fullName: string;
      avatar: string;
      phone: string;
      email?: string;
    };
  };
}
