import React from 'react';

// Pages
const LoginContainer = React.lazy(() => import('./Container/LoginContainer'));
const RegisterContainer = React.lazy(() => import('./Container/RegisterContainer'));
const ForgotPassword = React.lazy(() => import('./Container/ForgotPassword'));
const Home = React.lazy(() => import('./Container/Home'));
const Profile = React.lazy(() => import('./Container/Profile'));

const all_routes = [
  // {path: '/404', component: Page404},
];

const app_routes = [
  {
    path: '/login',
    component: LoginContainer,
  },
  {
    path: '/register',
    component: RegisterContainer,
  },
  {
    path: '/forgot-password',
    component: ForgotPassword,
  },
...all_routes,
];

const app_logged_routes = [
  { path: '/', component: Home }, // Home page
  { path: '/profile', component: Profile }, // Profile page
  ...all_routes,
];

export { app_routes, app_logged_routes };
