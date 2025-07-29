
import React from 'react';
import ReactDOM from 'react-dom/client'; 
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.min.css'; 
import 'bootstrap/dist/js/bootstrap.bundle.min.js';


import Home from './Home';              
import ProfilesPage from './ProfilesPage'; 
import ErrorPage from './ErrorPage';
import ProfileDetail from './ProfileDetail'; 
import Layout from './Layout'
import MovieDatabase from './MovieDatabase';

// Add Layout to all the pages.
const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />, 
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Home />
      },
      {
        path: '/movies',
        element: <MovieDatabase />,
      },
      {
        path: 'Profilespage',
        element: <ProfilesPage />,
        children: [
          {
            path: 'profile/:profileId',
            element: <ProfileDetail />,
          },
        ],
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />                   
    
  </React.StrictMode>
);

