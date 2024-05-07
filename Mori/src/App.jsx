import { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"; 
import Login from './components/auth/Login';
import SetPassword from './components/auth/SetPassword';
import ResetPassword from './components/auth/ResetPassword';
import ResetVerification from './components/auth/ResetVerification';
import CentraHome from './components/Centra/CentraHome';
import Shipping from './components/Centra/Shipping/Shipping'
import CentraNavigation from './components/Centra/CentraNavigation'
import EditBatch from './components/Centra/Collector/EditBatch';
import CollectorMain from './components/Centra/Collector/CollectorMain';
import Processor from './components/Centra/Processor/Processor'
import ShipDetails from './components/Centra/Shipping/ShipDetails'
import RegisterAccount from './components/Admin/RegisterAccount'
import HarborHome from './components/HarborGuard/HarborHome'
import CentraNotif from './components/Centra/CentraNotif'

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
        <Route path="/processor" element={<Processor />} />
        <Route path="/shipdetails" element={<ShipDetails />} />
        <Route path="/registerAccount" element={<RegisterAccount />} />
        <Route path="/harborHome" element={<HarborHome />} />
        <Route path="/centranotif" element={<CentraNotif />} />
      </Routes>
    </Router>
  );
}

export default App;