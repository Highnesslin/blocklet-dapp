import { Suspense, createElement } from 'react';
import { Typography, Tabs, Tab } from '@mui/material';
import EmailIcon from '@mui/icons-material/Email';
import PhoneAndroidIcon from '@mui/icons-material/PhoneAndroid';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import routes, { renderSkeleton } from '@/routes';
import { useUser } from '@/libs/user';

function Layout() {
  const { user } = useUser();
  const { pathname } = useLocation();
  const navigate = useNavigate();

  // TODO: 1. 对未登录的用户做额外操作
  if (!user) return null;

  return (
    <div className="flex-1">
      {/* 个人信息 */}
      <div className="flex flex-col items-center w-full mx-auto">
        <img className="size-30 mt-10 rounded-full" src={user.avatar} alt="头像" />
        <Typography variant="h5">{user.fullName}</Typography>
        <div className="flex">
          <PhoneAndroidIcon className="w-2" />
          <div>{user.phone}</div>
        </div>
        <div className="flex">
          <EmailIcon className="w-2" />
          <div>{user.email}</div>
        </div>
      </div>

      {/* 导航路由 */}
      <Tabs className="mt-2" value={pathname} centered>
        {routes.map((route) => (
          <Tab key={route.path} value={route.path} label={route.title} onClick={() => navigate(route.path)} />
        ))}
      </Tabs>

      {/* 路由视图 */}
      <div className="flex items-center justify-center mt-4 mx-auto w-64 md:w-half">
        {/* // TODO: 2. 将来这里加入 ErrorBoundary */}
        <Suspense fallback={renderSkeleton(pathname)}>
          <Routes>
            {routes.map((route) => (
              <Route key={route.path} path={route.path} element={createElement(route.element)} />
            ))}
          </Routes>
        </Suspense>
      </div>
    </div>
  );
}

export default Layout;
