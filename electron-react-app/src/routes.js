/*!

=========================================================
* Light Bootstrap Dashboard React - v2.0.0
=========================================================

* Product Page: https://www.creative-tim.com/product/light-bootstrap-dashboard-react
* Copyright 2020 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/light-bootstrap-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import Dashboard from './views/Dashboard.js';
import UserProfile from './views/UserProfile.js';
import TableList from './views/TableList.js';
import Typography from './views/Typography.js';
import Icons from './views/Icons.js';
import Maps from './views/Maps.js';
import Notifications from './views/Notifications.js';
import Upgrade from './views/Upgrade.js';
import Sales from './views/Sales.js';
import Stocks from './views/Stocks.js';
import SalesHistory from './views/SalesHistory.js';

const dashboardRoutes = [
  {
    path: '/sales',
    name: 'Sales',
    icon: 'nc-icon nc-cart-simple',
    component: Sales,
    layout: '/admin',
  },
  {
    path: '/sale-history',
    name: 'Sales History',
    icon: 'nc-icon nc-paper-2',
    component: SalesHistory,
    layout: '/admin',
  },
  {
    path: '/stocks',
    name: 'Stock Management',
    icon: 'nc-icon nc-delivery-fast',
    component: Stocks,
    layout: '/admin',
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    icon: 'nc-icon nc-chart-bar-32',
    component: Dashboard,
    layout: '/admin',
  },
  // {
  //   path: '/user',
  //   name: 'User Profile',
  //   icon: 'nc-icon nc-circle-09',
  //   component: UserProfile,
  //   layout: '/admin',
  // },
  // {
  //   path: '/table',
  //   name: 'Table List',
  //   icon: 'nc-icon nc-notes',
  //   component: TableList,
  //   layout: '/admin',
  // },
  // {
  //   path: '/typography',
  //   name: 'Typography',
  //   icon: 'nc-icon nc-paper-2',
  //   component: Typography,
  //   layout: '/admin',
  // },
  // {
  //   path: '/icons',
  //   name: 'Icons',
  //   icon: 'nc-icon nc-atom',
  //   component: Icons,
  //   layout: '/admin',
  // },
  // {
  //   path: '/maps',
  //   name: 'Maps',
  //   icon: 'nc-icon nc-pin-3',
  //   component: Maps,
  //   layout: '/admin',
  // },
  // {
  //   path: '/notifications',
  //   name: 'Notifications',
  //   icon: 'nc-icon nc-bell-55',
  //   component: Notifications,
  //   layout: '/admin',
  // },
];

export default dashboardRoutes;
