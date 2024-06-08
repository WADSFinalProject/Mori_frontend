import { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Login from "./components/auth/Login";
import SetPassword from "./components/auth/SetPassword";
import ResetPassword from "./components/auth/ResetPassword";
import ResetVerification from "./components/auth/ResetVerification";
import CentraHome from "./components/Centra/CentraHome";
import Shipping from "./components/Centra/Shipping/Shipping";
import CentraNavigation from "./components/Centra/CentraNavigation";
import EditBatch from "./components/Centra/Collector/EditBatch";
import CollectorMain from "./components/Centra/Collector/CollectorMain";
import CentraProcessor from "./components/Centra/Processor/CentraProcessor";
import ShipDetails from "./components/Centra/Shipping/ShipDetails";
import RegisterAccount from "./components/Admin/RegisterAccount";
import HarborHome from "./components/HarborGuard/Home/HarborHome";
import CentraNotif from "./components/Centra/CentraNotif";
import ConfirmShipment from "./components/HarborGuard/ConfirmShipment";
import ArrangeShipment from "./components/Centra/Shipping/ArrangeShipment";
import HarborNavigation from "./components/HarborGuard/HarborNavigation";
import DryingMachine from "./components/Centra/Processor/DryingMachine";
import FlouringMachine from "./components/Centra/Processor/FlouringMachine";
import HarborNotif from "./components/HarborGuard/HarborNotif";
import ShippingInformation from "./components/XYZ/Mobile/ShippingInformation";
import Dashboard from "./components/XYZ/Laptop/Dashboard";
import StockBooking from "./components/XYZ/Laptop/StockBooking";
import StockManagement from "./components/XYZ/Mobile/StockManagement";
import StockDetail from "./components/XYZ/Mobile/StockDetails";
import XYZHome from "./components/XYZ/Mobile/XYZHome";
import XYZNotif from "./components/XYZ/XYZNotif";
import XYZNavigation from "./components/XYZ/Mobile/XYZNavigation";
import SchedulePickup from "./components/XYZ/Mobile/SchedulePickup";
import AcceptedPackages from "./components/XYZ/Laptop/AcceptedPackages/AcceptedPackages";
import Invoice from "./components/XYZ/Laptop/Invoice";
import XYZShippingInformation from "./components/XYZ/Laptop/XYZShippingInformation/XYZShippingInformation";
import AdminDashboard from "./components/Admin/Dashboard";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/setpassword" element={<SetPassword />} />
        <Route path="/resetpassword" element={<ResetPassword />} />
        <Route path="/resetverification" element={<ResetVerification />} />
        <Route path="/centrahome" element={<CentraHome />} />
        <Route path="/centrashipping" element={<Shipping />} />
        <Route path="/centranavigation" element={<CentraNavigation />} />
        <Route path="/editbatch" element={<EditBatch />} />
        <Route path="/collectormain" element={<CollectorMain />} />
        <Route path="/centraprocessor" element={<CentraProcessor />} />
        <Route path="/shipdetails" element={<ShipDetails />} />
        <Route path="/registeraccount" element={<RegisterAccount />} />
        <Route path="/harborhome" element={<HarborHome />} />
        <Route path="/centranotif" element={<CentraNotif />} />
        <Route path="/confirmshipment" element={<ConfirmShipment />} />
        <Route path="/arrangeshipment" element={<ArrangeShipment />} />
        <Route path="/harbornavigation" element={<HarborNavigation />} />
        <Route path="/schedulepickup" element={<SchedulePickup />} />
        <Route path="/stockbooking" element={<StockBooking />} />
        <Route path="/acceptedpackages" element={<AcceptedPackages />} />
        <Route path="/XYZShippingInformation" element={<XYZShippingInformation />} />
        <Route path="/dryingmachine/:machineNumber" element={<DryingMachine />} />
        <Route path="/flouringmachine/:machineNumber" element={<FlouringMachine />} />
        <Route path="/shippinginformation" element={<ShippingInformation />} />
        <Route path="/harbornotif" element={<HarborNotif />} />
        <Route path="/xyz-dashboard" element={<Dashboard />} />
        <Route path="/xyz-stock-booking" element={<StockBooking />} />
        <Route path="/xyz-stockmanagement" element={<StockManagement />} />
        <Route path="/stockdetail/:location" element={<StockDetail />} />
        <Route path="/XYZHome" element={<XYZHome />} />
        <Route path="/XYZNotif" element={<XYZNotif />} />
        <Route path="/XYZNavigation" element={<XYZNavigation />} />

        <Route path="/admin-dashboard" element={<AdminDashboard />} />
      </Routes>
    </Router>
  );
}

export default App;