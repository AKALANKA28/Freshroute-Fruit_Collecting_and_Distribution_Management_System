import 'bootstrap-icons/font/bootstrap-icons.css';
import 'remixicon/fonts/remixicon.css';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';


import './App.css';
import Dashboard from './components/dashboard/Dashboard';
import Login from './components/LoginRegister/Login'
import Register from './components/LoginRegister/Register'


import{createBrowserRouter, RouterProvider} from 'react-router-dom'

const router = createBrowserRouter([
  {
    path: '/',
    element: <div><Login /></div>
  },

  {
    path: '/register',
    element: <div><Register /></div>
  },

  {
    path: '/dashboard',
    element: <div><Dashboard /></div>
  },

  
 

])

function App() {
  return (
    <div >
      <RouterProvider router={router}/> 
    </div>
  );
}

export default App;
