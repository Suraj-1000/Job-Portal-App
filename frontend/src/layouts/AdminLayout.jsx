import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useState, useRef, useEffect } from 'react';
import {
    FaChartBar,
    FaUsers,
    FaBriefcase,
    FaTags,
    FaFileAlt,
    FaEnvelope,
    FaUserCircle,
    FaKey,
    FaSignOutAlt
} from 'react-icons/fa';
import './AdminLayout.css';

import LogoutModal from '../components/LogoutModal/LogoutModal';

const AdminLayout = () => {
    const { user, logout } = useAuth();
    const location = useLocation();
    const navigate = useNavigate();
    const [showDropdown, setShowDropdown] = useState(false);
    const [showLogoutModal, setShowLogoutModal] = useState(false);
    const dropdownRef = useRef(null);

    const handleLogoutClick = () => {
        setShowLogoutModal(true);
        setShowDropdown(false);
    };

    const confirmLogout = () => {
        logout();
        navigate('/login');
    };

    const isActive = (path) => location.pathname === path ? 'active' : '';

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setShowDropdown(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const toggleDropdown = () => setShowDropdown(!showDropdown);

    return (
        <div className="admin-layout">
            <LogoutModal
                isOpen={showLogoutModal}
                onClose={() => setShowLogoutModal(false)}
                onConfirm={confirmLogout}
            />

            {/* Sidebar */}
            <aside className="admin-sidebar">
                <div className="sidebar-header">
                    <h2>AdminPortal</h2>
                </div>
                <nav className="sidebar-nav">
                    <Link to="/admin/dashboard" className={`nav-item ${isActive('/admin/dashboard')}`}>
                        <span className="nav-icon"><FaChartBar /></span> Dashboard
                    </Link>
                    <Link to="/admin/users" className={`nav-item ${isActive('/admin/users')}`}>
                        <span className="nav-icon"><FaUsers /></span> User Management
                    </Link>
                    <Link to="/admin/jobs" className={`nav-item ${isActive('/admin/jobs')}`}>
                        <span className="nav-icon"><FaBriefcase /></span> Job Management
                    </Link>
                    <Link to="/admin/categories" className={`nav-item ${isActive('/admin/categories')}`}>
                        <span className="nav-icon"><FaTags /></span> Category Setup
                    </Link>
                    <Link to="/admin/applications" className={`nav-item ${isActive('/admin/applications')}`}>
                        <span className="nav-icon"><FaFileAlt /></span> Applications
                    </Link>
                    <Link to="/admin/inquiries" className={`nav-item ${isActive('/admin/inquiries')}`}>
                        <span className="nav-icon"><FaEnvelope /></span> Inquiries
                    </Link>
                </nav>
            </aside>

            {/* Main Content */}
            <main className="admin-main">
                <header className="admin-header">
                    <h3>Welcome Back, {user?.firstName}</h3>

                    {/* User Profile Dropdown */}
                    <div className="header-user" ref={dropdownRef} onClick={toggleDropdown}>
                        <span>{user?.email}</span>
                        <div className="user-avatar">
                            {user?.firstName?.[0]}{user?.lastName?.[0]}
                        </div>

                        {showDropdown && (
                            <div className="profile-dropdown">
                                <Link to="/admin/profile" className="dropdown-item">
                                    <FaUserCircle /> Update Profile
                                </Link>
                                <Link to="/admin/change-password" className="dropdown-item">
                                    <FaKey /> Change Password
                                </Link>
                                <div onClick={(e) => { e.stopPropagation(); handleLogoutClick(); }} className="dropdown-item danger">
                                    <FaSignOutAlt /> Logout
                                </div>
                            </div>
                        )}
                    </div>
                </header>
                <div className="admin-content">
                    <Outlet />
                </div>
            </main>
        </div>
    );
};

export default AdminLayout;
