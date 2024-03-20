import "bootstrap-icons/font/bootstrap-icons.css";
import "remixicon/fonts/remixicon.css";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";

import Dashboard from "./components/finance/Finance";
import Login from "./components/LoginRegister/Login";
import Register from "./components/LoginRegister/Register";
import TDashboard from "./components/transportDashboard/TDashboard";
import BMDashboard from "./components/buyerManager/BMDashboard";
import RPDashboard from "./components/researchDashboard/RPDashboard";
import DriverDashboard from "./components/driver/DriverDashboard";
import OMDashboard from "./components/orderManagement/OMDashboard";
import SMDashboard from "./components/supplierManagerDashboard/SMDashboard";
import SupplierDetails from "./components/supplierManagerDashboard/SupplierDetails";
import Coordinator from "./components/Coordinator/Coordinator";
import FruitType from "./components/Coordinator/FruitType";
import Salary from "./components/Coordinator/Salary";
import TransportFee from "./components/Coordinator/TransportFee";
import StaffManager from "./components/StaffManager/StaffManager";
import Employee from "./components/StaffManager/Employee";
import CalculateSalary from "./components/StaffManager/CalculateSalary";
import SalesPage from "./components/finance/SalesPage";
import VehicleDetails from "./components/transportDashboard/VehicleDetails";

import OPDashboard from './components/orderProcessor/OPDashboard';
import QualityList from './components/orderManagement/QualityList';

import ExpensePage from "./components/finance/ExpensePage";
import ScheduleDetails from "./components/transportDashboard/ScheduleDetails";




import RequestedOrder from './components/RequestedOrder/RequestedOrder';
import BuyerDashBoard from './components/Buyer/BuyerDashBoard';
import NormalOrder from './components/NormalOrder/NormalOrder';
import EditOrder from './components/NormalOrder/EditOrder';

import { createBrowserRouter, RouterProvider } from "react-router-dom";

// import Background from './Website/Background/Background';
// import Navbar from './Website/Navbar/Navbar';

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <div>
        <Login />
      </div>
    ),
  },

  {
    path: "/register",
    element: (
      <div>
        <Register />
      </div>
    ),
  },

  {
    path: "/finance",
    element: (
      <div>
        <Dashboard />
      </div>
    ),
  },

  {
    path: "/tdashboard",
    element: (
      <div>
        <TDashboard />
      </div>
    ),
  },

  {
    path: "/BMDashboard",
    element: (
      <div>
        <BMDashboard />
      </div>
    ),
  },

  {
    path: "/RPDashboard",
    element: (
      <div>
        <RPDashboard />
      </div>
    ),
  },

  {
    path: "/DriverDashboard",
    element: (
      <div>
        <DriverDashboard />
      </div>
    ),
  },

  {
    path: "/OMDashboard",
    element: (
      <div>
        <OMDashboard />
      </div>
    ),
  },

  {
    path: "/SMDashboard",
    element: (
      <div>
        <SMDashboard />
      </div>
    ),
  },

  {
    path: "/SupplierDetails",
    element: (
      <div>
        <SupplierDetails />
      </div>
    ),
  },

  {
    path: "/Coordinator",
    element: (
      <div>
        <Coordinator />
      </div>
    ),
  },

  {
    path: "/FruitType",
    element: (
      <div>
        <FruitType />
      </div>
    ),
  },

  {
    path: '/RequestedOrder',
    element: <div><RequestedOrder/></div>
  },

  {
    path: '/BuyerDashboard',
    element: <div><BuyerDashBoard/></div>
  },

  {
    path: '/NormalOrder',
    element: <div><NormalOrder/></div>
  },

  {
    path: '/EditOrder/:id',
    element: <div><EditOrder/></div>
  },



  {
    path: "/Salary",
    element: (
      <div>
        <Salary />
      </div>
    ),
  },

  {
    path: "/TransportFee",
    element: (
      <div>
        <TransportFee />
      </div>
    ),
  },

  {
    path: "/StaffManager",
    element: (
      <div>
        <StaffManager />
      </div>
    ),
  },

  {
    path: "/Employee",
    element: (
      <div>
        <Employee />
      </div>
    ),
  },

  {
    path: "/CalculateSalary",
    element: (
      <div>
        <CalculateSalary />
      </div>
    ),
  },

  {
    path: "/SalesPage",
    element: (
      <div>
        <SalesPage />
      </div>
    ),
  },

  {
    path: "/VehicleDetails",
    element: (
      <div>
        <VehicleDetails />
      </div>
    ),
  },

  {

    path: '/OPDashboard',
    element: <div><OPDashboard /></div>
  },
  {
    path: '/QualityList',
    element: <div><QualityList /></div>
  },
  {
    path: "/ExpensePage",
    element: (
      <div>
        <ExpensePage />
      </div>
    ),
  },

  {
    path: "/ScheduleDetails",
    element: (
      <div>
        <ScheduleDetails />
      </div>
    ),
  },

]);

function App() {
  // let heroData = [
  //   {text1: "Dive into", text2: "what you love"},
  //   {text1: "Indulge", text2: "your passion"},
  //   {text1: "Give in to", text2: "your passions"},

  // ]

  // const [heroCount, setHeroCount] = useState(1);
  // const [playStatus, setPlayStatus] = useState(false);
  return (
    <div>
      {/* <Background playStatus = {playStatus} heroCount = {heroCount} />
      <Navbar /> */}
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
