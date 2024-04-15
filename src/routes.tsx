import { lazy } from 'react';
import { Skeleton } from '@mui/material';

const routes = [
  {
    path: '/',
    title: '介绍',
    element: lazy(() => import('./pages/Home/Home')),
    skeleton: <Skeleton variant="rounded" width={210} height={60} />,
  },
  {
    path: '/edit',
    title: '编辑',
    element: lazy(() => import('./pages/EditUser/EditUser')),
    skeleton: <Skeleton variant="rounded" width={210} height={60} />,
  },
  {
    path: '/imagemask',
    title: '图片隐写',
    element: lazy(() => import('./pages/Imagemask/Imagemask')),
    skeleton: <Skeleton variant="rounded" width={210} height={60} />,
  },
];

// TODO: 3. 针对每个页面可以返回其自定义的占位图
export const renderSkeleton = function (pathname: string) {
  const activeRoute = routes.find((route) => route.path === pathname);
  if (!activeRoute) return <div>spin...</div>;

  return activeRoute.skeleton;
};

export default routes;
