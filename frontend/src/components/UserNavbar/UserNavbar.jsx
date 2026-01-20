import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaUser, FaBriefcase, FaHeart, FaCog, FaSignOutAlt, FaChevronDown, FaArrowRight } from 'react-icons/fa';
import './UserNavbar.css';
import { useAuth } from '../../context/AuthContext';



const UserNavbar = () => {
    const { user, logout } = useAuth();
    const [showProfileDropdown, setShowProfileDropdown] = useState(false);
    const [showJobsDropdown, setShowJobsDropdown] = useState(false);
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <nav className="user-navbar">
            <div className="navbar-container">
                {/* Logo */}
                <Link to="/user/home" className="navbar-logo">
                    <span className="logo-text">Job<span className="logo-highlight">Portal</span></span>
                </Link>

                {/* Navigation Links */}
                <div className="navbar-links">
                    <Link to="/user/home" className="nav-link">Home</Link>

                    <div
                        className="nav-item-dropdown-wrapper"
                        onMouseEnter={() => setShowJobsDropdown(true)}
                        onMouseLeave={() => setShowJobsDropdown(false)}
                    >
                        <Link to="/user/find-jobs" className="nav-link dropdown-trigger">
                            Find Jobs <FaChevronDown className="dropdown-arrow" />
                        </Link>

                        {showJobsDropdown && (
                            <div className="mega-menu-container">
                                <div className="mega-menu-content">
                                    <h3>Browse by Category</h3>
                                    <div className="mega-menu-grid">
                                        {['IT & Software', 'Healthcare', 'Marketing', 'Finance',
                                            'Education', 'Hospitality', 'Design', 'Customer Service'].map((cat, i) => (
                                                <Link key={i} to={`/user/find-jobs?category=${encodeURIComponent(cat)}`} className="mega-menu-item">
                                                    {cat}
                                                </Link>
                                            ))}
                                    </div>
                                    <div className="mega-menu-footer">
                                        <Link to="/user/find-jobs" className="view-all-link">View All Jobs <FaArrowRight /></Link>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                    <Link to="/user/about" className="nav-link">About Us</Link>
                    <Link to="/user/contact" className="nav-link">Contact Us</Link>
                </div>

                {/* Profile Dropdown */}
                <div className="navbar-profile">
                    <button
                        className="profile-button"
                        onClick={() => setShowProfileDropdown(!showProfileDropdown)}
                    >
                        <div className="profile-avatar">
                            {user?.name?.charAt(0)?.toUpperCase() || 'U'}
                        </div>
                        <div className="profile-info">
                            <span className="profile-name">{user?.name || 'User'}</span>
                        </div>
                        <FaChevronDown className={`dropdown-icon ${showProfileDropdown ? 'open' : ''}`} />
                    </button>

                    {showProfileDropdown && (
                        <div className="profile-dropdown">
                            {/* User Info Header */}
                            <div className="dropdown-header">
                                <div className="header-avatar">
                                    {user?.name?.charAt(0)?.toUpperCase() || 'U'}
                                </div>
                                <div className="header-info">
                                    <div className="header-name">{user?.name || 'User'}</div>
                                    <div className="header-email">{user?.email || 'user@example.com'}</div>
                                </div>
                            </div>

                            <div className="dropdown-divider"></div>

                            <Link to="/user/profile" className="dropdown-item">
                                <FaUser />
                                <span>Update Profile</span>
                            </Link>
                            <Link to="/user/applied-jobs" className="dropdown-item">
                                <FaBriefcase />
                                <span>Applied Jobs</span>
                            </Link>
                            <Link to="/user/favorites" className="dropdown-item">
                                <FaHeart />
                                <span>Favorite Jobs</span>
                            </Link>
                            <Link to="/user/profile?tab=password" className="dropdown-item">
                                <FaCog />
                                <span>Settings</span>
                            </Link>

                            <div className="dropdown-divider"></div>

                            <button className="dropdown-item logout" onClick={handleLogout}>
                                <FaSignOutAlt />
                                <span>Log Out</span>
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default UserNavbar;
