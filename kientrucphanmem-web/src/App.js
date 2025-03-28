import React, { useEffect } from "react";
import { BrowserRouter, Navigate,  Router, Route, Routes } from "react-router-dom";
// import logo from './logo.svg';
import './App.css';

// import React, { useEffect } from 'react';
import LoginContainer from './Container/LoginContainer';
// import Home from './Components/Home';
// import Register from './Components/Register';
// import Profile from './Components/Profile';
import { app_routes } from "./routes";

function App() {
    const [render, setRender] = React.useState(false);

    useEffect(() => {
        console.log('billlllllllllllllllllllllllllllllll');
        setRender(true);
    }, []); // [] means this effect will run once after the first render

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
            {/* <Navigate from="/" to="/login" /> */}
          </Routes>
        );
    };


        // return (
        //     <BrowserRouter>
        //       <Routes>
        //         <Route path="/login" element={<LoginContainer />} />
        //       </Routes>
        //     </BrowserRouter>
        //   );

    if (!render) {
        return null; // You can return some placeholder
    } else {
        return (
            <BrowserRouter>
              <React.Suspense 
            //   fallback={<Loading />}
              >
                {ROUTER_PAGE(
                //   this.props.oauth.logged ? app_logged_routes : app_routes
                  app_routes
                )}
              </React.Suspense>
          </BrowserRouter>
        );
    }
}

export default App;
