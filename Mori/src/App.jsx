import { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/authContext';
import { setupInterceptors } from './contexts/api';

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
import XYZShippingInformationMobile from './components/XYZ/Mobile/XYZShippingInformationMobile';
import Dashboard from './components/XYZ/Laptop/Dashboard';
import StockBooking from './components/XYZ/Laptop/StockBooking/StockBooking';
import StockManagement from './components/XYZ/Mobile/StockManagement';
import StockDetail from './components/XYZ/Mobile/StockDetails';
import XYZHome from './components/XYZ/Mobile/XYZHome';
import XYZNotif from './components/XYZ/XYZNotif';
import XYZNavigation from './components/XYZ/Mobile/XYZNavigation';
import SchedulePickup from './components/XYZ/Mobile/SchedulePickup';
import AcceptedPackages from './components/XYZ/Laptop/AcceptedPackages/AcceptedPackages';
import Invoice from './components/XYZ/Laptop/Invoice';
import XYZShippingInformation from './components/XYZ/Laptop/XYZShippingInformation/XYZShippingInformation';
import AdminDashboard from './components/Admin/Dashboard';
import DashboardContent from './components/Admin/DashboardContent';
import CentraDetailsMachine from './components/Admin/CentraDetailsMachine/CentraDetailsMachine';
import ShippingInformationGlobal from './components/global/ShippingInformationGlobal';
import Unauthorized from './components/Unauthorized'; // Add this import

const RoleBasedRoute = ({ allowedRoles, children }) => {
  const { accessToken, getRole } = useAuth();
  const userRole = getRole();

  if (!accessToken) {
    return <Navigate to="/" />;
  }

  // Check role authorization if roles are defined and redirect if not authorized
  if (allowedRoles && !allowedRoles.includes(userRole)) {
    return <Navigate to="/unauthorized" />;
  }

  // Return children if authenticated and authorized
  return children;
};

function App() {
  const { accessToken, setToken } = useAuth();

  useEffect(() => {
    setupInterceptors(accessToken, setToken);
  }, [accessToken, setToken]);

  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* AUTH */}
          <Route path="/" element={<Login />} />
          <Route path="/setpassword" element={<SetPassword />} />
          <Route path="/resetpassword" element={<ResetPassword />} />
          <Route path="/resetverification" element={<ResetVerification />} />

          {/* CENTRA */}
          <Route path="/centra/*" element={
            <RoleBasedRoute allowedRoles={['Centra']}>
              <Routes>
                <Route path="home" element={<CentraHome />} />
                <Route path="shipping" element={<Shipping />} />
                <Route path="navigation" element={<CentraNavigation />} />
                <Route path="editbatch" element={<EditBatch />} />
                <Route path="collector" element={<CollectorMain />} />
                <Route path="processor" element={<CentraProcessor />} />
                <Route path="notification" element={<CentraNotif />} />
                <Route path="arrangeshipment" element={<ArrangeShipment />} />
                <Route path="shipdetails" element={<ShipDetails />} />
              </Routes>
            </RoleBasedRoute>
          } />

          {/* HARBOUR GUARD */}
          <Route path="/harbor/*" element={
            <RoleBasedRoute allowedRoles={['Guard']}>
              <Routes>
                <Route path="home" element={<HarborHome />} />
                <Route path="confirmshipment" element={<ConfirmShipment />} />
                <Route path="navigation" element={<HarborNavigation />} />
                <Route path="notification" element={<HarborNotif />} />
                <Route path="harbornotif" element={<HarborNotif />} />
              </Routes>
            </RoleBasedRoute>
          } />

          {/* XYZ MOBILE */}
          <Route path="/xyz/*" element={
            <RoleBasedRoute allowedRoles={['xyz']}>
              <Routes>
                <Route path="/m/stockmanagement" element={<StockManagement />} />
                <Route path="/m/home" element={<XYZHome />} />
                <Route path="/m/notification" element={<XYZNotif />} />
                <Route path="/m/navigation" element={<XYZNavigation />} />
                <Route path="/m/shippinginformation" element={<XYZShippingInformationMobile />} />
                <Route path="/m/schedulepickup" element={<SchedulePickup />} />
                <Route path="/m/acceptedpackages" element={<AcceptedPackages />} />
                <Route path="/d/xyz-dashboard" element={<Dashboard />} />
              </Routes>
            </RoleBasedRoute>
          } />

          {/* ADMIN */}
          <Route path="/admin/*" element={
            <RoleBasedRoute allowedRoles={['xyzDesktop']}>
              <Routes>
                <Route path="/admin-dashboard" element={<AdminDashboard />} />
              </Routes>
            </RoleBasedRoute>
          } />

          {/* Other routes */}
          <Route path="/XYZShippingInformation" element={<XYZShippingInformation />} />
          <Route path="/dryingmachine/:machineNumber" element={<DryingMachine />} />
          <Route path="/flouringmachine/:machineNumber" element={<FlouringMachine />} />
          <Route path="/dashboardContent" element={<DashboardContent />} />
          <Route path="/centradetailsmachine" element={<CentraDetailsMachine />} />
          <Route path="/stockdetail/:location" element={<StockDetail />} />
          <Route path="/shippinginformationglobal" element={<ShippingInformationGlobal />} />
          <Route path="/unauthorized" element={<Unauthorized />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
