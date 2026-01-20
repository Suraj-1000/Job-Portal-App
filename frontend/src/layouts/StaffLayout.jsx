import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useState, useRef, useEffect } from 'react';
import {
    FaChartBar,
    FaBriefcase,
    FaFileAlt,
    FaEnvelope,
    FaUserCircle,
    FaKey,
    FaSignOutAlt
} from 'react-icons/fa';
import './AdminLayout.css'; // Reusing Admin CSS for now, can create StaffLayout.css later if needed

import LogoutModal from '../components/LogoutModal/LogoutModal';

const StaffLayout = () => {
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
        <div className="admin-layout"> {/* Reusing admin-layout class for styling */}
            <LogoutModal
                isOpen={showLogoutModal}
                onClose={() => setShowLogoutModal(false)}
                onConfirm={confirmLogout}
            />

            {/* Sidebar */}
            <aside className="admin-sidebar">
                <div className="sidebar-header">
                    <h2>StaffPortal</h2>
                </div>
                <nav className="sidebar-nav">
                    <Link to="/staff/dashboard" className={`nav-item ${isActive('/staff/dashboard')}`}>
                        <span className="nav-icon"><FaChartBar /></span> Dashboard
                    </Link>
                    <Link to="/staff/jobs" className={`nav-item ${isActive('/staff/jobs')}`}>
                        <span className="nav-icon"><FaBriefcase /></span> Job Management
                    </Link>
                    <Link to="/staff/applications" className={`nav-item ${isActive('/staff/applications')}`}>
                        <span className="nav-icon"><FaFileAlt /></span> Applications
                    </Link>
                    <Link to="/staff/inquiries" className={`nav-item ${isActive('/staff/inquiries')}`}>
                        <span className="nav-icon"><FaEnvelope /></span> Inquiries
                    </Link>
                </nav>
            </aside>

            {/* Main Content */}
            <main className="admin-main">
                <header className="admin-header">
                    <h3>Welcome Back, {user?.firstName}</h3>

                    {/* Check if user is actually staff to avoid unauthorized access visually (logic is in routes) */}
                    <div className="header-badge" style={{ marginRight: 'auto', marginLeft: '20px', background: '#e0e7ff', color: '#4f46e5', padding: '4px 8px', borderRadius: '4px', fontSize: '12px' }}>
                        STAFF
                    </div>

                    {/* User Profile Dropdown */}
                    <div className="header-user" ref={dropdownRef} onClick={toggleDropdown}>
                        <span>{user?.email}</span>
                        <div className="user-avatar">
                            {user?.firstName?.[0]}{user?.lastName?.[0]}
                        </div>

                        {showDropdown && (
                            <div className="profile-dropdown">
                                <Link to="/staff/profile" className="dropdown-item">
                                    <FaUserCircle /> Update Profile
                                </Link>
                                <Link to="/staff/change-password" className="dropdown-item">
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

export default StaffLayout;
