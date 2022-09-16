import { Navigate, useRoutes } from 'react-router-dom';
// layouts
import DashboardLayout from './layouts/dashboard';
import LogoOnlyLayout from './layouts/LogoOnlyLayout';
//

import Users from './pages/User';
import Login from './pages/Login';
import NotFound from './pages/Page404';
import Products from './pages/Products';
import DashboardApp from './pages/DashboardApp';

import AuthGuard from "./guards/AuthGuard";
import GuestGuard from "./guards/GuestGuard";

// ----------------------------------------------------------------------

export default function Router() {
  return useRoutes([
    {
      path: '/dashboard',
      element:          <AuthGuard>
        <DashboardLayout />
      </AuthGuard>,
      children: [
        { path: 'app', element: <DashboardApp /> },
        { path: 'charge/:id', element: <Users /> },

        { path: 'products', element: <Products /> },
      ],
    },
    {
      path: '/',
      element:<GuestGuard> <LogoOnlyLayout /> </GuestGuard>,
      children: [
        { path: '/', element: <Login /> },
        { path: 'login', element: <Login /> },
        { path: '404', element: <NotFound /> },
        { path: '*', element: <Navigate to="/404" /> },
      ],
    },
    {
      path: '*',
      element: <Navigate to="/404" replace />,
    },
  ]);
}
