import React, { useEffect } from "react";
import { BrowserRouter, Route, Routes, Navigate, useNavigate} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux"; // Import useDispatch
import { fetchUserData } from './redux/actions/userActions'; // Import the action
import { AUTH_TOKEN_KEY } from './constants/user'; // Import the constant
import Loading from './Components/Loading'; // Import the Loading component
// import logo from './logo.svg';
import './App.css';

// import React, { useEffect } from 'react';
import LoginContainer from './Container/LoginContainer';
// import Home from './Components/Home';
// import Register from './Components/Register';
// import Profile from './Components/Profile';
import { app_routes, app_logged_routes } from "./routes";

function App() {
    const [render, setRender] = React.useState(false);
    const dispatch = useDispatch(); // Initialize Redux dispatch
    // const navigate = useNavigate(); // Initialize useNavigate

    // Get the user's login status from Redux
    const isLoggedIn = useSelector((state) => !!state.user.user);
    console.log('isLoggedIn', isLoggedIn);
    console.log('state.user.user', useSelector((state) => state.user.user));

    useEffect(() => {
        // check local storage has token or not, if yes then fetch user data
        if (localStorage.getItem(AUTH_TOKEN_KEY)) {
            dispatch(fetchUserData());
        }
        else {
          // Redirect to login if no token is found
          // navigate('/login');
        }
        setRender(true);
    }, []); // [] means this effect will run only once

    const ROUTER_PAGE = (routes) => {
        console.log('bill-----------', routes);
        return (
            <Routes>
            {routes.map((route, idx) => {
              return route.component ? (
                <Route
                  key={idx}
                  path={route.path}
                  element={<route.component />}
                />
              ) : null;
            })}
             {/* Handle 404 - Redirect to login if the route is not found */}
             {/* <Route path="*" element={<Navigate to="/404" replace />} /> */}
          </Routes>
        );
    };

    if (!render) {
        return null; // You can return some placeholder
    } else {
        return (
            <BrowserRouter>
              <React.Suspense 
              fallback={<Loading />}
              >
                {ROUTER_PAGE(
                  isLoggedIn ? app_logged_routes : app_routes // Dynamically switch routes
                )}
              </React.Suspense>
          </BrowserRouter>
        );
    }
}

export default App;
