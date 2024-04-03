import "bootstrap-icons/font/bootstrap-icons.css";
import "remixicon/fonts/remixicon.css";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

import Dashboard from "./components/finance/Finance";
import Login from "./components/LoginRegister/Login";
// import Register from "./components/LoginRegister/Register";
import TDashboard from "./components/transportDashboard/TDashboard";
import BMDashboard from "./components/buyerManager/BMDashboard";
import RPDashboard from "./components/researchDashboard/RPDashboard";
import DriverDashboard from "./components/driver/DriverDashboard";
import OMDashboard from "./components/orderManagement/OMDashboard";
import SMDashboard from "./components/supplierManagerDashboard/SMDashboard";
import SupplierDetails from "./components/supplierManagerDashboard/SupplierDetails";
import Coordinator from "./components/Coordinator/Coordinator";
import FruitType from "./components/Coordinator/FruitType";
import Category from "./components/Coordinator/Category";
import Salary from "./components/Coordinator/Salary";
import TransportFee from "./components/Coordinator/TransportFee";
import StaffManager from "./components/StaffManager/StaffManager";
import Employee from "./components/StaffManager/Employee";
import CalculateSalary from "./components/StaffManager/CalculateSalary";
import Notice from "./components/StaffManager/Notice";
import SalesPage from "./components/finance/SalesPage";

import FDashboard from "./components/farmer/FDashboard";

import VehicleDetails from "./components/transportDashboard/VehicleDetails";

import OPDashboard from "./components/orderProcessor/OPDashboard";
import QualityList from "./components/orderManagement/QualityList";

import ExpensePage from "./components/finance/ExpensePage";
import ScheduleDetails from "./components/transportDashboard/ScheduleDetails";


import RequestedOrder from './components/RequestedOrder/RequestedOrder';
import BuyerDashBoard from './components/Buyer/BuyerDashBoard';
import NormalOrder from './components/NormalOrder/NormalOrder';
import EditOrder from './components/NormalOrder/EditOrder';
import PromotionPage from "./components/researchDashboard/PromotionPage";

//import RequestedOrder from "./components/RequestedOrder/RequestedOrder";
//import BuyerDashBoard from "./components/Buyer/BuyerDashBoard";
//import NormalOrder from "./components/NormalOrder/NormalOrder";
//import EditOrder from "./components/NormalOrder/EditOrder";


import { createBrowserRouter, RouterProvider } from "react-router-dom";
import PredictionDetails from "./components/farmer/PredictionDetails";

import Website from "./Website/Website";

const router = createBrowserRouter([
  {
    path: "/freshroute",
    element: (
      <div>
        <Website />
      </div>
    ),
  },

  {
    path: "/login",
    element: (
      <div>
        <Login />
      </div>
    ),
  },

  // {
  //   path: "/register",
  //   element: (
  //     <div>
  //       <Register />
  //     </div>
  //   ),
  // },

  {
    path: "/",
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
    path: "/FDashboard",
    element: (
      <div>
        <FDashboard />
      </div>
    ),
  },

  {
    path: "/PredictionDetails",
    element: (
      <div>
        <PredictionDetails />
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
    path: "/Category",
    element: (
      <div>
        <Category />
      </div>
    ),
  },

  {
    path: "/RequestedOrder",
    element: (
      <div>
        <RequestedOrder />
      </div>
    ),
  },

  {
    path: "/BuyerDashboard",
    element: (
      <div>
        <BuyerDashBoard />
      </div>
    ),
  },

  {
    path: "/NormalOrder",
    element: (
      <div>
        <NormalOrder />
      </div>
    ),
  },

  {
    path: "/EditOrder/:id",
    element: (
      <div>
        <EditOrder />
      </div>
    ),
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
    path: "/PromotionPage",
    element: (
      <div>
        <PromotionPage />
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
    path: "/Notice",
    element: (
      <div>
        <Notice />
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
    path: "/OPDashboard",
    element: (
      <div>
        <OPDashboard />
      </div>
    ),
  },
  {
    path: "/QualityList",
    element: (
      <div>
        <QualityList />
      </div>
    ),
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
  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;