/* eslint-disable no-unused-vars */
import './App.css';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import store, { persistor } from './redux/store';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Loader from './components/Loader';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCurrentUser, clearUser } from './redux/slices/authSlice.js';
import socket from './socket/socket.js';
import { useSocketOnline } from './socket/socket';

// Import axios config to enable interceptors
import './utils/axiosConfig';

// Protected Route and Guest Route
import ProtectedRoute from './components/App/ProtectedRoute.jsx';
import { GuestRoute } from './components/App/GuestRoute.jsx';

// Connection Guard
import ConnectionGuard from './components/App/ConnectionGuard.jsx';

// Pages
import SignupPage from './pages/Signup';
import LoginPage from './pages/Login.jsx';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './pages/Home';
import AddDonationPage from './pages/AddDonation';
import MyDonationsPage from './pages/MyDonation';
import Analytics from './pages/Analytics';
import NearbyNGOs from './pages/NearbyNGOs';
import Profile from './pages/Profile';
import AboutUsPage from './pages/AboutUs.jsx';
import HowItWorksPage from './pages/HowItWorks.jsx';
import ImpactReport from './pages/ImpactReport.jsx';
import ScheduledPickups from './pages/SchedulePickups.jsx';
import DonationAlerts from './pages/DonationAlerts.jsx';
import PrivacyAndPolicy from './pages/PrivacyAndPolicy.jsx';
import SafetyGuidelines from './pages/SafetyGuideline.jsx';
import ContactSupport from './pages/ContactPage.jsx';
import ForgotPasswordPage from './pages/ForgetPasswrod.jsx';
import ResetPasswordPage from './pages/ResetPasswordpage.jsx';
import NGOFeedbackPage from './pages/NGOFeedbackPage.jsx';
import UserAndFeedback from './pages/UserAndFeedback.jsx';

// Admin Components
import AdminUsersPage from './pages/admin/AllUsers.jsx';
import AdminNGOPage from './pages/admin/AllNgo.jsx';
import AllDonations from './pages/admin/AllDonation.jsx';
import SelectUser from './pages/admin/SelectUser.jsx';
import DonationDetailsPage from './pages/admin/SelectDonation.jsx';
import AdminSupportDashboard from './pages/admin/SupportCenter.jsx';
import AdminDashboard from './pages/admin/AdminDashboard.jsx';
import AdminLayout from './pages/admin/AdminLayout.jsx';
import ModernProfilePage from './pages/admin/Profile.jsx';
import SettingsPage from './pages/admin/Settings.jsx';
import FAQPage from './pages/Faqs.jsx';

// Token validation utility
const isTokenExpired = (token) => {
  if (!token) return true;

  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    const currentTime = Date.now() / 1000;
    return payload.exp < currentTime;
  } catch (error) {
    return true;
  }
};

// App Content Component
const AppContent = () => {
  const dispatch = useDispatch();
  const { userInfo, token } = useSelector((state) => state.auth);

  // Check token validity on app load
  useEffect(() => {
    const localToken = localStorage.getItem('token');

    // If no token in localStorage or persisted state, clear user
    if (!localToken && !token) {
      dispatch(clearUser());
      return;
    }

    // If token exists, check if it's expired
    if (localToken && isTokenExpired(localToken)) {
      dispatch(clearUser());
      localStorage.removeItem('token');
      localStorage.removeItem('userInfo');
      return;
    }

    // If user info doesn't exist but token is valid, fetch current user
    if (!userInfo && localToken && !isTokenExpired(localToken)) {
      dispatch(getCurrentUser());
    }
  }, [dispatch, userInfo, token]);

  // Socket connection
  useEffect(() => {
    if (userInfo?._id && token) {
      socket.emit("user-online", { userId: userInfo._id });
    }
  }, [userInfo, token]);

  // Consistent use of _id
  useSocketOnline(userInfo?._id);

  return (
    <>
      {/* Conditionally render Navbar and Footer - hide for admin */}
      {userInfo?.role !== "admin" && <Navbar />}

      <Routes>
        {/* Guest Routes - Only for non-logged-in users */}
        <Route
          path="/signup"
          element={
            <GuestRoute>
              <SignupPage />
            </GuestRoute>
          }
        />
        <Route
          path="/login"
          element={
            <GuestRoute>
              <LoginPage />
            </GuestRoute>
          }
        />
        <Route
          path="/forgot-password"
          element={
            <GuestRoute>
              <ForgotPasswordPage />
            </GuestRoute>
          }
        />

        {/* Public Routes - Accessible to everyone */}
        <Route path="/password/reset/:token" element={<ResetPasswordPage />} />
        <Route path="/privacy" element={<PrivacyAndPolicy />} />
        <Route path="/safety" element={<SafetyGuidelines />} />
        <Route path="/contact" element={<ContactSupport />} />
        <Route path="/aboutus" element={<AboutUsPage />} />
        <Route path="/how-it-works" element={<HowItWorksPage />} />
        <Route path="/faqs" element={<FAQPage/>}/>

        {/* Root Route - Different based on user role */}
        <Route
          path="/"
          element={
            userInfo?.role === "admin" ? (
              <ProtectedRoute role="admin">
                <AdminLayout>
                  <AdminDashboard />
                </AdminLayout>
              </ProtectedRoute>
            ) : (
              <HomePage />
            )
          }
        />

        {/* Protected Routes - Only for logged-in users */}
        <Route
          path="/add-donation"
          element={
            <ProtectedRoute>
              <AddDonationPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/my-donations"
          element={
            <ProtectedRoute>
              <MyDonationsPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/analytics"
          element={
            <ProtectedRoute>
              <Analytics />
            </ProtectedRoute>
          }
        />
        <Route
          path="/nearby-ngos"
          element={
            <ProtectedRoute>
              <NearbyNGOs />
            </ProtectedRoute>
          }
        />
        <Route
          path="/ngos"
          element={
            <ProtectedRoute>
              <UserAndFeedback />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />

        {/* NGO Routes - Only for NGO role users */}
        <Route
          path="/donationalerts"
          element={
            <ProtectedRoute role="ngo">
              <DonationAlerts />
            </ProtectedRoute>
          }
        />
        <Route
          path="/scheduledPickups"
          element={
            <ProtectedRoute role="ngo">
              <ScheduledPickups />
            </ProtectedRoute>
          }
        />
        <Route
          path="/impact"
          element={
            <ProtectedRoute role="ngo">
              <ImpactReport />
            </ProtectedRoute>
          }
        />
        <Route
          path="/user"
          element={
            <ProtectedRoute role="ngo">
              <NGOFeedbackPage />
            </ProtectedRoute>
          }
        />

        {/* Admin Routes - Only for admin role users with proper layout */}
        <Route
          path="/all-users"
          element={
            <ProtectedRoute role="admin">
              <AdminLayout>
                <AdminUsersPage />
              </AdminLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/all-ngos"
          element={
            <ProtectedRoute role="admin">
              <AdminLayout>
                <AdminNGOPage />
              </AdminLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/all-donations"
          element={
            <ProtectedRoute role="admin">
              <AdminLayout>
                <AllDonations />
              </AdminLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/profile"
          element={
            <ProtectedRoute role="admin">
              <AdminLayout>
                <ModernProfilePage />
              </AdminLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/select-user/:id"
          element={
            <ProtectedRoute role="admin">
              <AdminLayout>
                <SelectUser />
              </AdminLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/select-donation/:id"
          element={
            <ProtectedRoute role="admin">
              <AdminLayout>
                <DonationDetailsPage />
              </AdminLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/support-center"
          element={
            <ProtectedRoute role="admin">
              <AdminLayout>
                <AdminSupportDashboard />
              </AdminLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/settings"
          element={
            <ProtectedRoute role="admin">
              <AdminLayout>
                <SettingsPage />
              </AdminLayout>
            </ProtectedRoute>
          }
        />

        {/* Global Fallback Route */}
        <Route
          path="*"
          element={
            userInfo?.role === "admin" ? (
              <Navigate to="/" replace />
            ) : (
              <HomePage />
            )
          }
        />
      </Routes>

      {/* Footer also hidden for admin */}
      {userInfo?.role !== "admin" && <Footer />}

      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </>
  );
};

// Main App Component
function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={<Loader />} persistor={persistor}>
        <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
          <ConnectionGuard>
            <AppContent />
          </ConnectionGuard>
        </Router>
      </PersistGate>
    </Provider>
  );
}

export default App;