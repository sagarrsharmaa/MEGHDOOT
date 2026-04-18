import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'

import {createBrowserRouter , RouterProvider} from 'react-router'


import {  UnAuthLayout } from './layout/index.js'
import {Home , About , Dashboard} from './pages/index.js'


const router  = createBrowserRouter([
  {
    path: "/",
    element: <UnAuthLayout /> ,
    children:[     
      {
        path :  "/",
        element : <Home />
      },
      {
        path :  "/about",
        element : <About />
      },
      {
        path : '/dashboard',
        element : <Dashboard />
      },
    ]
  } ,
  
  
])

createRoot(document.getElementById('root')).render(
  <StrictMode>

    <RouterProvider router={router} />
    

  </StrictMode>,
)
