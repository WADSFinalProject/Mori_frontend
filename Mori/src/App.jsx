import { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"; 
import Login from './components/auth/Login';
import SetPassword from './components/auth/SetPassword';
import ResetPassword from './components/auth/ResetPassword';
import ResetVerification from './components/auth/ResetVerification';
import CentraHome from './components/Centra/CentraHome';
import Shipping from './components/Centra/Shipping/Shipping';
import CentraNavigation from './components/Centra/CentraNavigation';
import EditBatch from './components/Centra/Collector/EditBatch';
import CollectorMain from './components/Centra/Collector/CollectorMain';
import CentraProcessor from './components/Centra/Processor/CentraProcessor';
import ShipDetails from './components/Centra/Shipping/ShipDetails';
import RegisterAccount from './components/Admin/RegisterAccount';
import HarborHome from './components/HarborGuard/Home/HarborHome';
import CentraNotif from './components/Centra/CentraNotif';
import ConfirmShipment from './components/HarborGuard/ConfirmShipment';
import ArrangeShipment from './components/Centra/Shipping/ArrangeShipment';
import HarborNavigation from './components/HarborGuard/HarborNavigation';
import DryingMachine from './components/Centra/Processor/DryingMachine';
import FlouringMachine from './components/Centra/Processor/FlouringMachine';
import HarborNotif from './components/HarborGuard/HarborNotif';
import ShippingInformation from './components/XYZ/Desktop/ShippingInformation';
import XYZHome from './components/XYZ/Mobile/XYZHome';
import XYZNavigation from './components/XYZ/Mobile/XYZNavigation';

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
        <Route path="/EditBatch" element={<EditBatch />} />
        <Route path="/CollectorMain" element={<CollectorMain />} />
        <Route path="/centraprocessor" element={<CentraProcessor />} />
        <Route path="/shipdetails" element={<ShipDetails />} />
        <Route path="/registerAccount" element={<RegisterAccount />} />
        <Route path="/harborHome" element={<HarborHome />} />
        <Route path="/centranotif" element={<CentraNotif />} />
        <Route path="/confirmshipment" element={<ConfirmShipment />} />
        <Route path="/arrangeshipment" element={<ArrangeShipment />} />
        <Route path="/harbornavigation" element={<HarborNavigation />} />
        <Route path="/dryingmachine/:machineNumber" element={<DryingMachine />} />
        <Route path="/flouringmachine/:machineNumber" element={<FlouringMachine />} />
        <Route path="/shippinginformation" element={<ShippingInformation />} />
        <Route path="/harbornotif" element={<HarborNotif />} />
        <Route path="/XYZHome" element={<XYZHome />} />
        <Route path="/XYZNavigation" element={<XYZNavigation />} />
      </Routes>
    </Router>
  );
}

export default App;
