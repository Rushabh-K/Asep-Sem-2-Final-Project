import React from 'react';

import { Icon } from '@chakra-ui/react';
import {
  MdBarChart,
  MdPerson,
  MdHome,
  MdOutlineShoppingCart,
  MdFoodBank,
  MdChat,
} from 'react-icons/md';

// Admin Imports
import MainDashboard from 'views/admin/default';
import NFTMarketplace from 'views/admin/marketplace';
import Profile from 'views/admin/profile';
import DataTables from 'views/admin/dataTables';
import NGODashboard from 'views/admin/ngo';
import ChatbotView from 'views/admin/chatbot';

// Auth Imports
import SignIn from 'views/auth/signIn';

// Hidden routes (not shown in sidebar)
export const hiddenRoutes = [
  {
    name: 'Sign In',
    layout: '/auth',
    path: '/sign-in',
    component: <SignIn />,
  }
];

// Sidebar routes
const routes = [
  {
    name: 'NGO Dashboard',
    layout: '/admin',
    path: '/ngo-dashboard',
    icon: <Icon as={MdFoodBank} width="20px" height="20px" color="inherit" />,
    component: <NGODashboard />,
  },
  {
    name: 'Main Dashboard',
    layout: '/admin',
    path: '/default',
    icon: <Icon as={MdHome} width="20px" height="20px" color="inherit" />,
    component: <MainDashboard />,
  },
  {
    name: 'NFT Marketplace',
    layout: '/admin',
    path: '/nft-marketplace',
    icon: (
      <Icon
        as={MdOutlineShoppingCart}
        width="20px"
        height="20px"
        color="inherit"
      />
    ),
    component: <NFTMarketplace />,
    secondary: true,
  },
  {
    name: 'Data Tables',
    layout: '/admin',
    icon: <Icon as={MdBarChart} width="20px" height="20px" color="inherit" />,
    path: '/data-tables',
    component: <DataTables />,
  },
  {
    name: 'Profile',
    layout: '/admin',
    path: '/profile',
    icon: <Icon as={MdPerson} width="20px" height="20px" color="inherit" />,
    component: <Profile />,
  },
  {
    name: 'FoodLink Assistant',
    layout: '/admin',
    path: '/chatbot',
    icon: <Icon as={MdChat} width="20px" height="20px" color="inherit" />,
    component: <ChatbotView />,
  }
];

export default routes;
