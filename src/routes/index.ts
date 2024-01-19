import { lazy } from 'react';

const Dashboard = lazy(() => import('../pages/Dashboard'));
const AllOrders = lazy(() => import('../pages/AllOrders'));
const NewOrder = lazy(() => import('../pages/NewOrder'));
const ConfirmedOrders = lazy(() => import('../pages/ConfirmedOrders'));
const PendingOrders = lazy(() => import('../pages/PendingOrders'));

const coreRoutes = [
  {
    path: '/',
    title: 'Dashboard',
    component: Dashboard,
  },
  {
    path: '/all-orders',
    title: 'All Orders',
    component: AllOrders,
  },
  {
    path: '/confirmed-orders',
    title: 'Confirmed Orders',
    component: ConfirmedOrders,
  },
  {
    path: '/pending-orders',
    title: 'Pending Orders',
    component: PendingOrders,
  },
  {
    path: '/new-order',
    title: 'New Order',
    component: NewOrder,
  },
];

const routes = [...coreRoutes];
export default routes;
