

import 'bootstrap-icons/font/bootstrap-icons.css';
import 'remixicon/fonts/remixicon.css';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';


import Dashboard from './components/finance/Dashboard';
import Login from './components/LoginRegister/Login'
import Register from './components/LoginRegister/Register'
import TDashboard from './components/transportDashboard/TDashboard';
import BMDashboard from './components/buyerManager/BMDashboard';
import RPDashboard from './components/researchDashboard/RPDashboard';
import DriverDashboard from './components/driver/DriverDashboard';
import OMDashboard from './components/orderManagement/OMDashboard';
import SMDashboard from './components/supplierManagerDashboard/SMDashboard';
import Coordinator from './components/Coordinator/Coordinator';
import StaffManager from './components/StaffManager/StaffManager';
import SupplierDetails from './components/supplierManagerDashboard/SupplierDetails';



import{createBrowserRouter, RouterProvider} from 'react-router-dom'
// import Background from './Website/Background/Background';
// import Navbar from './Website/Navbar/Navbar';

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

  {
    path: '/tdashboard',
    element: <div><TDashboard /></div>
  },
 
  {
    path: '/BMDashboard',
    element: <div><BMDashboard /></div>
  },

  {
    path: '/RPDashboard',
    element: <div><RPDashboard /></div>
  },

  {
    path: '/DriverDashboard',
    element: <div><DriverDashboard /></div>
  },

  {
    path: '/OMDashboard',
    element: <div><OMDashboard /></div>
  },

  {
    path: '/SMDashboard',
    element: <div><SMDashboard /></div>
  },

  {
    path: '/SupplierDetails',
    element: <div><SupplierDetails /></div>
  },

  {
    path: '/Coordinator',
    element: <div><Coordinator /></div>
  },

  {
    path: '/StaffManager',
    element: <div><StaffManager /></div>
  },

  



])

function App() {

  // let heroData = [
  //   {text1: "Dive into", text2: "what you love"},
  //   {text1: "Indulge", text2: "your passion"},
  //   {text1: "Give in to", text2: "your passions"},

  // ]

  // const [heroCount, setHeroCount] = useState(1);
  // const [playStatus, setPlayStatus] = useState(false);
  return (
    <div >
      {/* <Background playStatus = {playStatus} heroCount = {heroCount} />
      <Navbar /> */}
      <RouterProvider router={router}/>
    </div>
  );
}

export default App;
