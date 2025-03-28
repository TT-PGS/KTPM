import React from 'react';

// Pages
const LoginContainer = React.lazy(() => import('./Container/LoginContainer'));
const RegisterContainer = React.lazy(() => import('./Container/RegisterContainer'));

const app_routes = [
  {
    path: '/login',
    component: LoginContainer,
  },
  {
    path: '/register',
    component: RegisterContainer,
  },
  //Page404
  // { path: '/', exact: false, name: 'NOT FOUND', component: Page404 },
];

const app_logged_routes = [
  // { path: '/', exact: true, name: 'Home' },
];

export { app_routes, app_logged_routes };
