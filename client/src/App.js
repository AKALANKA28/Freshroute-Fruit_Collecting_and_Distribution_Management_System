import "bootstrap-icons/font/bootstrap-icons.css";
import "remixicon/fonts/remixicon.css";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Dashboard from "./components/finance/Finance";
import Login from "./Website/LoginRegister/Login";
import Register from "./Website/LoginRegister/Register";
import AdminLogin from "./components/LoginRegister/AdminLogin";

import TDashboard from "./components/transportDashboard/TDashboard";
import BMDashboard from "./components/buyerManager/BMDashboard";
import RPDashboard from "./components/researchDashboard/RPDashboard";
import PDashboard from "./components/rpromotionDashboard/PDashboard";
import DriverDashboard from "./components/driver/DriverDashboard";
import OrderManagerHomePage from "./components/orderManagement/OrderManagerHomePage";
import QualityList from "./components/orderManagement/body/QualityList/QualityList";
import SMDashboard from "./components/supplierManagerDashboard/SMDashboard";
import SupplierDetails from "./components/supplierManagerDashboard/SupplierDetails";
import Coordinator from "./components/Coordinator/Coordinator";
import FruitType from "./components/Coordinator/FruitType";
import JoinWithUsStaff from "./components/Coordinator/JoinWithUsStaff";
import Category from "./components/Coordinator/Category";
import Salary from "./components/Coordinator/Salary";
import TransportFee from "./components/Coordinator/TransportFee";
import StaffManager from "./components/StaffManager/StaffManager";
import Employee from "./components/StaffManager/Employee";
import Unregistered from "./components/StaffManager/Unregistered";
import CalculateSalary from "./components/StaffManager/CalculateSalary";
import Notice from "./components/StaffManager/Notice";
import Message from "./components/StaffManager/Message";
import SalesPage from "./components/finance/SalesPage";
import SupplierRequests from "./components/supplierManagerDashboard/SupplierRequests";
import FDashboard from "./components/farmer/FDashboard";
import SupplyRequests from "./components/supplierManagerDashboard/SupplyRequests";
import ApprovedSupplies from "./components/supplierManagerDashboard/ApprovedSupplies";
import DeclinedSupplies from "./components/supplierManagerDashboard/DeclinedSupplies";
import SupplierLocations from "./components/supplierManagerDashboard/SupplierLocations";

import VehicleDetails from "./components/transportDashboard/VehicleDetails";
import ProcessDetails from "./components/transportDashboard/ProcessDetails";
import CoveringDetails from "./components/transportDashboard/CoveringDetails";

import OrderProcessorHomePage from "./components/orderProcessor/OrderProcessorHomePage";
import AssignedOrder from "./components/orderProcessor/body/AssignedOrders/AssignedOrderList"
import OngoingOrder from "./components/orderProcessor/body/OngoingOrders/OngoingOrderList"
import SupplierList from "./components/orderProcessor/body/SupplierList/SuppliersList"

import ExpensePage from "./components/finance/ExpensePage";
import ScheduleDetails from "./components/transportDashboard/ScheduleDetails";

import RequestedOrder from "./components/RequestedOrder/RequestedOrder";
import BuyerDashBoard from "./components/Buyer/BuyerDashBoard";
import NormalOrder from "./components/NormalOrder/NormalOrder";
import EditOrder from "./components/NormalOrder/EditOrder";

import PromotionPage from "./components/researchDashboard/PromotionPage";
import CompaignPage from "./components/researchDashboard/CompaignPage";
import ResourcePage from "./components/researchDashboard/ResourcePage";
import RevenuePage from "./components/rpromotionDashboard/RevenuePage";
import VolumePage from "./components/rpromotionDashboard/VolumePage";
import PricePage from "./components/rpromotionDashboard/PricePage";
import AccResourcePage from "./components/researchDashboard/AccResourcePage";

// import RequestedOrder from "./components/RequestedOrder/RequestedOrder";
// import BuyerDashBoard from "./components/Buyer/BuyerDashBoard";
// import NormalOrder from "./components/NormalOrder/NormalOrder";
// import EditOrder from "./components/NormalOrder/EditOrder";

import PredictionDetails from "./components/farmer/PredictionDetails";

import OMDashboard from "./components/orderManagement/body/OMDashboard";
import OPDashboard from "./components/orderProcessor/body/OPDashboard";
import RequestedOrderList from "./components/orderManagement/body/RequestedOrderList/RequestedOrderList";
import AssignedOrderList from "./components/orderManagement/body/AssignedOrderList/AssignedOrderList";
import CompletedOrderList from "./components/orderManagement/body/CompletedOrderList/CompletedOrderList";
import CompletedOrders from "./components/orderProcessor/body/CompletedOrders/CompletedOrderList";

import Home from "./Website/Home";
import About from "./Website/About";
import Shop from "./Website/Shop";
import Contact from "./Website/Contact";
import SingleProduct from "./Website/Shop/Products/SingleProduct";
import Cart from "./Website/Shop/Cart/Cart";
import Checkout from "./Website/Shop/Checkout/Checkout";
import Map from "./components/transportDashboard/Map";
import JoinWithUsSupplier from "./Website/JoinWithUs";
import JoinWithUsSelect from "./Website/JoinWithUsSelect";
import Drivers from "./components/transportDashboard/body/driverDetails/Drivers";
import DriverDetails from "./components/transportDashboard/DriverDetails";
import Approvals from "./components/finance/body/Approvals/Approvals";
import ApprovalPage from "./components/finance/ApprovalPage";
import PaymentsPage from "./components/finance/PaymentsPage";
import BuyerEdit from "./components/Buyer/Body/BuyerEdit"
import AddProduct from "./components/finance/AddProduct";
import DasboardAccess from "./components/DasboardAccess";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <div>
        <Home />
      </div>
    ),
  },

  {
    path: "/about",
    element: (
      <div>
        <About />
      </div>
    ),
  },

  {
    path: "/shop",
    element: (
      <div>
        <Shop />
      </div>
    ),
  },

  {
    path: "/cart",
    element: <Cart />,
  },

  {
    path: "/checkout",
    element: (
      <div>
        <Checkout />
      </div>
    ),
  },

  {
    path: "/JoinWithUsSelect",
    element: (
      <div>
        <JoinWithUsSelect />
      </div>
    ),
  },

  {
    path: "/JoinWithUsSupplier",
    element: (
      <div>
        <JoinWithUsSupplier />
      </div>
    ),
  },

  {
    path: "/JoinWithUsStaff",
    element: (
      <div>
        <JoinWithUsStaff />
      </div>
    ),
  },

  {
    path: "/contact",
    element: (
      <div>
        <Contact />
      </div>
    ),
  },

  {
    path: "/shop/:id",
    element: (
      <div>
        <SingleProduct />
      </div>
    ),
  },

  {
    path: "/admin",
    element: (
      <div>
        <AdminLogin />
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
    path: "/approvals",
    element: (
      <div>
        <ApprovalPage />
      </div>
    ),
  },

  {
    path: "/payments_page",
    element: (
      <div>
        <PaymentsPage />
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
    path: "/map",
    element: (
      <div>
        <Map />
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
    path: "/Driver",
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
        <OrderManagerHomePage />
      </div>
    ),
    children: [
      {
        path: "/OMDashboard/",
        element: <OMDashboard />,
      },
      {
        path: "/OMDashboard/QualityList",
        element: <QualityList isViewOnly={false}/>,
      },
      {
        path: "/OMDashboard/RequestedOrderList",
        element: <RequestedOrderList/>,
      },
      {
        path: "/OMDashboard/AssignedOrderList",
        element: <AssignedOrderList/>,
      },
      {
        path: "/OMDashboard/CompletedOrderList",
        element: <CompletedOrderList/>,
      },
      {
        path: "/OMDashboard/SupplierList",
        element: <SupplierList/>,
      }

    ]
  },

  {
    path: "/OPDashboard",
    element: (
        <div>
          <OrderProcessorHomePage />
        </div>
    ),
    children: [
      {
        path: "/OPDashboard/",
        element: <OPDashboard/>,
      },
      {
        path: "/OPDashboard/AssignedOrders",
        element: <AssignedOrder/>,
      },
      {
        path: "/OPDashboard/OngoingOrders",
        element: <OngoingOrder/>,
      },
      {
        path: "/OPDashboard/CompletedOrders",
        element: <CompletedOrders/>,
      },
      {
        path: "/OPDashboard/QualityList",
        element: <QualityList isViewOnly={true}/>,
      },
      {
        path: "/OPDashboard/SupplierList",
        element: <SupplierList/>,
      }
      

    ]
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
    path: "/SupplierRequests",
    element: (
      <div>
        <SupplierRequests />
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
    path: "/SupplyRequests",
    element: (
      <div>
        <SupplyRequests />
      </div>
    ),
  },

  {
    path: "/ApprovedSupplies",
    element: (
      <div>
        <ApprovedSupplies />
      </div>
    ),
  },

  {
    path: "/DeclinedSupplies",
    element: (
      <div>
        <DeclinedSupplies />
      </div>
    ),
  },

  {
    path: "/SupplierLocations",
    element: (
      <div>
        <SupplierLocations />
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
    path: "/RevenuePage",
    element: (
      <div>
        <RevenuePage />
      </div>
    ),
  },
  {
    path: "/VolumePage",
    element: (
      <div>
        <VolumePage />
      </div>
    ),
  },

  {
    path: "/PricePage",
    element: (
      <div>
        <PricePage />
      </div>
    ),
  },

  {
    path: "/CompaignPage",
    element: (
      <div>
        <CompaignPage />
      </div>
    ),
  },

  {
    path: "/ResourcePage",
    element: (
      <div>
        <ResourcePage />
      </div>
    ),
  },
  {
    path: "/AccResourcePage",
    element: (
      <div>
        <AccResourcePage />
      </div>
    ),
  },
  {
    path: "/PDashboard",
    element: (
      <div>
        <PDashboard />
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
    path: "/Unregistered",
    element: (
      <div>
        <Unregistered />
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
    path: "/Message",
    element: (
      <div>
        <Message />
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
    path: "/ProcessDetails",
    element: (
      <div>
        <ProcessDetails />
      </div>
    ),
  },
  {
    path: "/CoveringDetails",
    element: (
      <div>
        <CoveringDetails />
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
    path: "/BuyerEdit/:id",
    element: (
      <div>
        <BuyerEdit />
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

  {
    path: "/DriverDetails",
    element: (
      <div>
        <DriverDetails />
      </div>
    ),
  },

  {
    path: "/addproduct",
    element: (
      <div>
        <AddProduct />
      </div>
    ),
  },

  {
    path: "/dAccess",
    element: (
      <div>
        <DasboardAccess />
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
