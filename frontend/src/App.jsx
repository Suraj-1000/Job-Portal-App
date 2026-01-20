import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Import AuthProvider
import { AuthProvider } from './context/AuthContext';

// Import Pages
import Login from './pages/User_Authentication/login/login';
import Signup from './pages/User_Authentication/signup/signup';
import ForgotPassword from './pages/User_Authentication/forgot-password/forgotpassword';
import NotFound from './pages/NotFound/NotFound';

import AdminLayout from './layouts/AdminLayout';
import StaffLayout from './layouts/StaffLayout';
import UserLayout from './layouts/UserLayout';
import AdminDashboard from './pages/Admin/Home/AdminDashboard';
import StaffDashboard from './pages/Staff/Home/StaffDashboard';
import UserManagement from './pages/Admin/Users/UserManagement';
import JobManagement from './pages/Admin/Jobs/JobManagement';
import CategorySetup from './pages/Admin/Categories/CategorySetup';
import Applications from './pages/Admin/Applications/Applications';
import Inquiries from './pages/Admin/Inquries/Inquiries';
import AdminProfile from './pages/Admin/Profile/AdminProfile';

// User Pages
import Home from './pages/User/Home/Home';
import FindJobs from './pages/User/FindJobs/FindJobs';
import AboutUs from './pages/User/AboutUs/AboutUs';
import ContactUs from './pages/User/ContactUs/ContactUs';
import UserProfile from './pages/User/Profile/UserProfile';
import AppliedJobs from './pages/User/AppliedJobs/AppliedJobs';
import FavoriteJobs from './pages/User/FavoriteJobs/FavoriteJobs';


function App() {
    useEffect(() => {
        // Simple health check log
        axios.get('http://localhost:5000/')
            .then(response => console.log('Backend Health:', response.data))
            .catch(error => console.error('Backend Error:', error));
    }, []);

    return (
        <Router>
            <AuthProvider>
                <ToastContainer />
                <Routes>
                    {/* Redirect root to login for now */}
                    <Route path="/" element={<Navigate to="/login" replace />} />

                    <Route path="/login" element={<Login />} />
                    <Route path="/signup" element={<Signup />} />
                    <Route path="/forgot-password" element={<ForgotPassword />} />


                    {/* Admin Routes */}
                    <Route path="/admin" element={<AdminLayout />}>
                        <Route index element={<Navigate to="dashboard" replace />} />
                        <Route path="dashboard" element={<AdminDashboard />} />
                        <Route path="users" element={<UserManagement />} />
                        <Route path="jobs" element={<JobManagement />} />
                        <Route path="categories" element={<CategorySetup />} />
                        <Route path="applications" element={<Applications />} />
                        <Route path="inquiries" element={<Inquiries />} />
                        <Route path="profile" element={<AdminProfile activeTab="profile" />} />
                        <Route path="change-password" element={<AdminProfile activeTab="password" />} />
                    </Route>

                    {/* Staff Routes */}
                    <Route path="/staff" element={<StaffLayout />}>
                        <Route index element={<Navigate to="dashboard" replace />} />
                        <Route path="dashboard" element={<StaffDashboard />} />
                        {/* Reuse Admin components for now, ideally should be staff specific versions or have role checks */}
                        <Route path="jobs" element={<JobManagement />} />
                        <Route path="applications" element={<Applications />} />
                        <Route path="inquiries" element={<Inquiries />} />
                        <Route path="profile" element={<AdminProfile activeTab="profile" />} />
                        <Route path="change-password" element={<AdminProfile activeTab="password" />} />
                    </Route>

                    {/* User Routes */}
                    <Route path="/user" element={<UserLayout />}>
                        <Route index element={<Navigate to="home" replace />} />
                        <Route path="home" element={<Home />} />
                        <Route path="find-jobs" element={<FindJobs />} />
                        <Route path="about" element={<AboutUs />} />
                        <Route path="contact" element={<ContactUs />} />
                        <Route path="profile" element={<UserProfile />} />
                        <Route path="applied-jobs" element={<AppliedJobs />} />
                        <Route path="favorites" element={<FavoriteJobs />} />
                        {/* Redirect settings to profile with password tab */}
                        <Route path="settings" element={<Navigate to="/user/profile?tab=password" replace />} />
                    </Route>

                    {/* Fallback route */}
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </AuthProvider>
        </Router>
    );
}

export default App;