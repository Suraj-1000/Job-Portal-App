import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Import AuthProvider
import { AuthProvider } from './context/AuthContext';

// Import Pages
import Login from './pages/user-authentication/login/login';
import Signup from './pages/user-authentication/signup/signup';
import ForgotPassword from './pages/user-authentication/forgot-password/forgotPassword';
import NotFound from './pages/not-found/notFound';

import AdminLayout from './layouts/AdminLayout';
import StaffLayout from './layouts/StaffLayout';
import UserLayout from './layouts/UserLayout';
import AdminDashboard from './pages/admin/home/adminDashboard';
import StaffDashboard from './pages/staff/home/staffDashboard';
import UserManagement from './pages/admin/users/userManagement';
import JobManagement from './pages/admin/jobs/jobManagement';
import CategorySetup from './pages/admin/categories/categorySetup';
import Applications from './pages/admin/applications/applications';
import Inquiries from './pages/admin/inquiries/inquiries';
import AdminProfile from './pages/admin/profile/adminProfile';

// User Pages
import Home from './pages/user/home/home';
import FindJobs from './pages/user/find-jobs/findJobs';
import AboutUs from './pages/user/about-us/aboutUs';
import ContactUs from './pages/user/contact-us/contactUs';
import UserProfile from './pages/user/profile/userProfile';
import AppliedJobs from './pages/user/applied-jobs/appliedJobs';
import FavoriteJobs from './pages/user/favorite-jobs/favoriteJobs';


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