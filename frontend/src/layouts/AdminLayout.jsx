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
    return (
        <div className="flex min-h-screen bg-slate-50">
            <LogoutModal
                isOpen={showLogoutModal}
                onClose={() => setShowLogoutModal(false)}
                onConfirm={confirmLogout}
            />

            {/* Sidebar */}
            <aside className="w-[260px] bg-gradient-to-b from-slate-800 to-black text-white flex flex-col py-5 fixed h-screen overflow-y-auto transition-transform duration-300 z-[1000] md:-translate-x-full md:[&.open]:translate-x-0">
                <div className="px-6 pb-5 border-b border-white/10 mb-5">
                    <h2 className="text-2xl font-bold m-0 bg-gradient-to-r from-[#0984e3] to-[#6c5ce7] bg-clip-text text-transparent">AdminPortal</h2>
                </div>
                <nav className="flex flex-col gap-1.5 px-2.5">
                    <Link to="/admin/dashboard" className={`p-3 px-4 rounded-lg text-slate-400 no-underline font-medium transition-all duration-200 flex items-center gap-3 hover:bg-white/10 hover:text-white hover:translate-x-1.5 ${isActive('/admin/dashboard') === 'active' ? 'bg-white/10 text-white translate-x-1.5' : ''}`}>
                        <span className="text-[1.1rem] flex items-center justify-center w-6"><FaChartBar /></span> Dashboard
                    </Link>
                    <Link to="/admin/users" className={`p-3 px-4 rounded-lg text-slate-400 no-underline font-medium transition-all duration-200 flex items-center gap-3 hover:bg-white/10 hover:text-white hover:translate-x-1.5 ${isActive('/admin/users') === 'active' ? 'bg-white/10 text-white translate-x-1.5' : ''}`}>
                        <span className="text-[1.1rem] flex items-center justify-center w-6"><FaUsers /></span> User Management
                    </Link>
                    <Link to="/admin/jobs" className={`p-3 px-4 rounded-lg text-slate-400 no-underline font-medium transition-all duration-200 flex items-center gap-3 hover:bg-white/10 hover:text-white hover:translate-x-1.5 ${isActive('/admin/jobs') === 'active' ? 'bg-white/10 text-white translate-x-1.5' : ''}`}>
                        <span className="text-[1.1rem] flex items-center justify-center w-6"><FaBriefcase /></span> Job Management
                    </Link>
                    <Link to="/admin/categories" className={`p-3 px-4 rounded-lg text-slate-400 no-underline font-medium transition-all duration-200 flex items-center gap-3 hover:bg-white/10 hover:text-white hover:translate-x-1.5 ${isActive('/admin/categories') === 'active' ? 'bg-white/10 text-white translate-x-1.5' : ''}`}>
                        <span className="text-[1.1rem] flex items-center justify-center w-6"><FaTags /></span> Category Setup
                    </Link>
                    <Link to="/admin/applications" className={`p-3 px-4 rounded-lg text-slate-400 no-underline font-medium transition-all duration-200 flex items-center gap-3 hover:bg-white/10 hover:text-white hover:translate-x-1.5 ${isActive('/admin/applications') === 'active' ? 'bg-white/10 text-white translate-x-1.5' : ''}`}>
                        <span className="text-[1.1rem] flex items-center justify-center w-6"><FaFileAlt /></span> Applications
                    </Link>
                    <Link to="/admin/inquiries" className={`p-3 px-4 rounded-lg text-slate-400 no-underline font-medium transition-all duration-200 flex items-center gap-3 hover:bg-white/10 hover:text-white hover:translate-x-1.5 ${isActive('/admin/inquiries') === 'active' ? 'bg-white/10 text-white translate-x-1.5' : ''}`}>
                        <span className="text-[1.1rem] flex items-center justify-center w-6"><FaEnvelope /></span> Inquiries
                    </Link>
                </nav>
            </aside>

            {/* Main Content */}
            <main className="flex-1 ml-[260px] flex flex-col min-w-0 md:ml-0">
                <header className="bg-white h-16 px-8 flex items-center justify-between shadow-sm">
                    <h3>Welcome Back, {user?.firstName}</h3>

                    {/* User Profile Dropdown */}
                    <div className="flex items-center gap-4 relative cursor-pointer group" ref={dropdownRef} onClick={toggleDropdown}>
                        <span>{user?.email}</span>
                        <div className="w-9 h-9 bg-[#6c5ce7] rounded-full text-white flex items-center justify-center font-semibold transition-shadow duration-200 group-hover:shadow-[0_0_0_3px_rgba(108,92,231,0.2)]">
                            {user?.firstName?.[0]}{user?.lastName?.[0]}
                        </div>

                        {showDropdown && (
                            <div className="absolute top-[120%] right-0 bg-white min-w-[200px] rounded-lg shadow-lg py-2 origin-top-right animate-[dropdownSlide_0.2s_ease-out] border border-slate-100 z-[100]">
                                <Link to="/admin/profile" className="p-2.5 px-5 flex items-center gap-2.5 text-slate-800 no-underline text-[0.95rem] transition-colors duration-200 cursor-pointer hover:bg-slate-50 hover:text-[#6c5ce7]">
                                    <FaUserCircle /> Update Profile
                                </Link>
                                <Link to="/admin/change-password" className="p-2.5 px-5 flex items-center gap-2.5 text-slate-800 no-underline text-[0.95rem] transition-colors duration-200 cursor-pointer hover:bg-slate-50 hover:text-[#6c5ce7]">
                                    <FaKey /> Change Password
                                </Link>
                                <div onClick={(e) => { e.stopPropagation(); handleLogoutClick(); }} className="p-2.5 px-5 flex items-center gap-2.5 text-[#e17055] border-t border-slate-100 mt-1.5 pt-3 transition-colors duration-200 cursor-pointer hover:bg-red-50 hover:text-[#d63031]">
                                    <FaSignOutAlt /> Logout
                                </div>
                            </div>
                        )}
                    </div>
                </header>
                <div className="p-8 flex-1 overflow-y-auto">
                    <Outlet />
                </div>
            </main>
        </div>
    );
    );
};

export default AdminLayout;
