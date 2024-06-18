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
import XYZShippingInformationMobile from "./components/XYZ/Mobile/XYZShippingInformationMobile";
import Dashboard from "./components/XYZ/Laptop/Dashboard";
import StockBooking from "./components/XYZ/Laptop/StockBooking/StockBooking";
import StockManagement from "./components/XYZ/Mobile/StockManagement";
import StockDetail from "./components/XYZ/Mobile/StockDetails";
import XYZHome from "./components/XYZ/Mobile/XYZHome";
import XYZNotif from "./components/XYZ/XYZNotif";
import XYZNavigation from "./components/XYZ/Mobile/XYZNavigation";
import SchedulePickup from "./components/XYZ/Mobile/SchedulePickup";
import ArrivalConfirmation from "./components/XYZ/Mobile/ArrivalConfirmation";
import ReceptionNotes from "./components/XYZ/Mobile/ReceptionNotes";
import XYZShipDetails from "./components/XYZ/Mobile/XYZShipDetails";
import AcceptedPackages from "./components/XYZ/Laptop/AcceptedPackages/AcceptedPackages";
import Invoice from "./components/XYZ/Laptop/Invoice";
import XYZShippingInformation from "./components/XYZ/Laptop/XYZShippingInformation/XYZShippingInformation";
import AdminDashboard from "./components/Admin/Dashboard";
import DashboardContent from "./components/Admin/DashboardContent";

import CentraDetailsMachine from "./components/Admin/CentraDetailsMachine/CentraDetailsMachine";
import ShippingInformationGlobal from "./components/global/ShippingInformationGlobal";


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/setpassword" element={<SetPassword />} />
        <Route path="/resetpassword" element={<ResetPassword />} />
        <Route path="/resetverification" element={<ResetVerification />} />

        {/* CENTRA */}
        <Route path="/centra/home" element={<CentraHome />} />
        <Route path="/centra/shipping" element={<Shipping />} />
        <Route path="/centra/navigation" element={<CentraNavigation />} />
        <Route path="/editbatch" element={<EditBatch />} />
        <Route path="/centra/collector" element={<CollectorMain />} />
        <Route path="/centra/processor" element={<CentraProcessor />} />
        <Route path="/centra/notification" element={<CentraNotif />} />
        <Route path="/centra/arrangeshipment" element={<ArrangeShipment />} />
        <Route path="/dryingmachine/:machineNumber" element={<DryingMachine />} />
        <Route path="/flouringmachine/:machineNumber" element={<FlouringMachine />} />
        {/* ini harus ngikutin shipment idnya */}
        <Route path="/centra/shipdetails/:awb" element={<ShipDetails />} />

        {/* HARBOUR GUARD */}
        <Route path="/harbor/home" element={<HarborHome />} />
        <Route path="/harbor/confirmshipment" element={<ConfirmShipment />} />
        <Route path="/harbor/navigation" element={<HarborNavigation />} />
        <Route path="/harbor/notification" element={<HarborNotif />} />

        <Route path="/acceptedpackages" element={<AcceptedPackages />} />
        <Route path="/schedulepickup" element={<SchedulePickup />} />
        <Route path="/stockbooking" element={<StockBooking />} />
        <Route path="/XYZShippingInformation" element={<XYZShippingInformation />} />
        <Route path="/harbornotif" element={<HarborNotif />} />
        <Route path="/xyz-dashboard" element={<Dashboard />} />
        <Route path="/xyz-stock-booking" element={<StockBooking />} />

        {/* XYZ MOBILE */}
        <Route path="/xyz/m/stockmanagement" element={<StockManagement />} />
        <Route path="/xyz/m/home" element={<XYZHome />} />
        <Route path="/xyz/m/notification" element={<XYZNotif />} />
        <Route path="/xyz/m/navigation" element={<XYZNavigation />} />
        <Route path="/xyz/m/arrivalconfirmation" element={<ArrivalConfirmation />}/>
        <Route path="/xyz/m/receptionnotes" element={<ReceptionNotes />}/>
        <Route path="/xyz/m/shippinginformation" element={<XYZShippingInformationMobile />}/>
        {/* hrs ikutin shipment id */}
        <Route path="/xyz/m/shipmentdetails" element={<XYZShipDetails />}/>

        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route path="/invoice" element={<Invoice />} />
        <Route path="/dashboardContent" element={<DashboardContent />} />
        <Route path="/centradetailsmachine" element={<CentraDetailsMachine />} />
        <Route path="/stockdetail/:location" element={<StockDetail />} />

        <Route path="/shippinginformationglobal" element={<ShippingInformationGlobal />} />


      </Routes>
    </Router>
  );
}

export default App;
