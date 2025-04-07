import React from 'react';

// Pages
const LoginContainer = React.lazy(() => import('./Container/LoginContainer'));
const RegisterContainer = React.lazy(() => import('./Container/RegisterContainer'));
const ForgotPassword = React.lazy(() => import('./Container/ForgotPassword'));
const ProfileContainer = React.lazy(() => import('./Container/ProfileContainer'));
const FindUserContainer = React.lazy(() => import('./Container/FindUserContainer'));
const RequestFriendsContainer = React.lazy(() => import('./Container/RequestFriendsContainer'));
const FriendsConversationContainer = React.lazy(() => import('./Container/FriendsConversationContainer'));
const GroupsConversationContainer = React.lazy(() => import('./Container/GroupsConversationContainer'));
const CreateGroupContainer = React.lazy(() => import('./Container/CreateGroupContainer'));

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
  // default route
  {
    path: '/',
    component: LoginContainer,
  }

];

const app_logged_routes = [
  { path: '/profile', component: ProfileContainer }, // Profile page
  { path: '/find-user', component: FindUserContainer }, // Find user page
  { path: '/request-friends', component: RequestFriendsContainer }, // Friends page
  { path: '/friends', component: FriendsConversationContainer }, // Friends page
  { path: '/groups', component: GroupsConversationContainer }, // Groups page
  { path: '/create-group', component: CreateGroupContainer }, // Create group page
  ...all_routes,
  // default route
  {
    path: '/',
    component: ProfileContainer,
  }
];

export { app_routes, app_logged_routes };
