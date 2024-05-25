import React from 'react';

import Signup from './components/Signup';
import Login from './components/Login';
import Find from './components/Find';
import Create from './components/Create';
import Attend from './components/Attend';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <div><Find/></div>,
    },
    {
      path: "/login",
      element: <div><Login/></div>,
    },
    {
      path: "/signup",
      element: <div><Signup/></div>,
    },
    {
      path: "/create",
      element: <div><Create/></div>,
    },
    {
      path: "/attend",
      element: <div><Attend/></div>,
    },
  ]);

  return (
    <RouterProvider router={router}>
      {router}
    </RouterProvider>
  );
}

export default App;