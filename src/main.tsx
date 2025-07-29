
import React from 'react';
import ReactDOM from 'react-dom/client'; 
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.min.css'; 
import 'bootstrap/dist/js/bootstrap.bundle.min.js'

import Home from './Home';              
import ProfilesPage from './ProfilesPage'; 
import ErrorPage from './ErrorPage';
import ProfileDetail from './ProfileDetail'; 


const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
    errorElement: <ErrorPage />,
  },
  {
    path: '/Profilespage',
    element: <ProfilesPage />,
    children: [
      {
        path: 'profile/:profileId', // ✅ no leading slash!
        element: <ProfileDetail />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />                   
    
  </React.StrictMode>
);

