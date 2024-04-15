import './app.css';

import { BrowserRouter as Router } from 'react-router-dom';
import Header from '@blocklet/ui-react/lib/Header';
import Footer from '@blocklet/ui-react/lib/Footer';
import { SessionProvider } from './libs/session';
import { UserProvider } from './libs/user';
import Layout from './pages/Layout';

function App() {
  return (
    <div className="flex flex-col w-screen h-screen">
      <Header
        meta={{
          navigation: [
            {
              icon: 'mdi:alpha-t-box',
              link: '/',
              section: 'header',
              title: {
                en: 'terminal',
                zh: '终端',
              },
            },
          ],
        }}
      />
      <Layout />
      <Footer />
    </div>
  );
}

export default function () {
  // While the blocklet is deploy to a sub path, this will be work properly.
  const basename = !window.blocklet ? '/' : window.blocklet.prefix;

  return (
    <SessionProvider>
      <UserProvider>
        <Router basename={basename}>
          <App />
        </Router>
      </UserProvider>
    </SessionProvider>
  );
}
