import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaUser, FaBriefcase, FaHeart, FaCog, FaSignOutAlt, FaChevronDown, FaArrowRight } from 'react-icons/fa';

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
        <nav className="sticky top-0 z-[1000] bg-white/95 backdrop-blur-[10px] shadow-sm border-b border-black/5">
            <div className="max-w-[1400px] mx-auto px-6 py-4 flex justify-between items-center">
                {/* Logo */}
                <Link to="/user/home" className="no-underline text-2xl font-extrabold text-slate-900 flex items-center">
                    <span className="logo-text">Job<span className="text-indigo-600">Portal</span></span>
                </Link>

                {/* Navigation Links */}
                <div className="flex items-center gap-8">
                    <Link to="/user/home" className="text-slate-500 no-underline font-medium text-base transition-all duration-200 relative py-2 hover:text-indigo-600">Home</Link>

                    <div
                        className="relative inline-block group"
                        onMouseEnter={() => setShowJobsDropdown(true)}
                        onMouseLeave={() => setShowJobsDropdown(false)}
                    >
                        <Link to="/user/find-jobs" className="flex items-center gap-1.5 cursor-pointer text-slate-500 no-underline font-medium text-base transition-all duration-200 py-2 hover:text-indigo-600">
                            Find Jobs <FaChevronDown className="text-[0.8rem] transition-transform duration-200 group-hover:rotate-180" />
                        </Link>

                        {showJobsDropdown && (
                            <div className="absolute top-full left-1/2 -translate-x-1/2 w-[600px] pt-5 animate-[fadeInDown_0.2s_ease-out]">
                                <div className="bg-white p-6 rounded-xl shadow-xl border border-slate-100">
                                    <h3 className="text-[0.9rem] text-slate-400 uppercase tracking-wide mb-4 font-semibold">Browse by Category</h3>
                                    <div className="grid grid-cols-4 gap-4 mb-5">
                                        {['IT & Software', 'Healthcare', 'Marketing', 'Finance',
                                            'Education', 'Hospitality', 'Design', 'Customer Service'].map((cat, i) => (
                                                <Link key={i} to={`/user/find-jobs?category=${encodeURIComponent(cat)}`} className="p-2 px-3 bg-slate-50 rounded-md text-slate-600 no-underline text-[0.9rem] text-center transition-all duration-200 border border-transparent hover:bg-indigo-50 hover:text-indigo-600 hover:border-indigo-100">
                                                    {cat}
                                                </Link>
                                            ))}
                                    </div>
                                    <div className="flex justify-end pt-4 border-t border-slate-100">
                                        <Link to="/user/find-jobs" className="flex items-center gap-1.5 text-indigo-600 font-semibold text-[0.9rem] no-underline transition-[gap] duration-200 hover:gap-2.5">View All Jobs <FaArrowRight /></Link>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                    <Link to="/user/about" className="text-slate-500 no-underline font-medium text-base transition-all duration-200 relative py-2 hover:text-indigo-600">About Us</Link>
                    <Link to="/user/contact" className="text-slate-500 no-underline font-medium text-base transition-all duration-200 relative py-2 hover:text-indigo-600">Contact Us</Link>
                </div>

                {/* Profile Dropdown */}
                <div className="relative">
                    <button
                        className="flex items-center gap-2.5 bg-transparent border border-slate-200 p-1.5 px-3 rounded-full cursor-pointer transition-all duration-200 hover:bg-slate-50 hover:border-slate-300"
                        onClick={() => setShowProfileDropdown(!showProfileDropdown)}
                    >
                        <div className="w-8 h-8 bg-indigo-600 text-white rounded-full flex items-center justify-center font-bold text-[0.9rem]">
                            {user?.name?.charAt(0)?.toUpperCase() || 'U'}
                        </div>
                        <div className="text-left">
                            <span className="block font-semibold text-slate-900 text-[0.9rem]">{user?.name || 'User'}</span>
                        </div>
                        <FaChevronDown className={`text-[0.8rem] text-slate-400 transition-transform duration-200 ${showProfileDropdown ? 'rotate-180' : ''}`} />
                    </button>

                    {showProfileDropdown && (
                        <div className="absolute top-[calc(100%+12px)] right-0 w-[260px] bg-white rounded-xl shadow-lg border border-slate-100 p-2 animate-[slideIn_0.2s_ease-out]">
                            {/* User Info Header */}
                            <div className="p-3 flex items-center gap-3">
                                <div className="w-10 h-10 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center font-bold">
                                    {user?.name?.charAt(0)?.toUpperCase() || 'U'}
                                </div>
                                <div className="overflow-hidden">
                                    <div className="font-semibold text-slate-900 text-[0.95rem]">{user?.name || 'User'}</div>
                                    <div className="text-[0.8rem] text-slate-500 whitespace-nowrap overflow-hidden text-ellipsis">{user?.email || 'user@example.com'}</div>
                                </div>
                            </div>

                            <div className="h-px bg-slate-100 my-1.5"></div>

                            <Link to="/user/profile" className="flex items-center gap-2.5 p-2.5 px-3 no-underline text-slate-600 text-[0.9rem] font-medium rounded-lg transition-all duration-200 bg-transparent border-none w-full cursor-pointer hover:bg-slate-50 hover:text-slate-900">
                                <FaUser />
                                <span>Update Profile</span>
                            </Link>
                            <Link to="/user/applied-jobs" className="flex items-center gap-2.5 p-2.5 px-3 no-underline text-slate-600 text-[0.9rem] font-medium rounded-lg transition-all duration-200 bg-transparent border-none w-full cursor-pointer hover:bg-slate-50 hover:text-slate-900">
                                <FaBriefcase />
                                <span>Applied Jobs</span>
                            </Link>
                            <Link to="/user/favorites" className="flex items-center gap-2.5 p-2.5 px-3 no-underline text-slate-600 text-[0.9rem] font-medium rounded-lg transition-all duration-200 bg-transparent border-none w-full cursor-pointer hover:bg-slate-50 hover:text-slate-900">
                                <FaHeart />
                                <span>Favorite Jobs</span>
                            </Link>
                            <Link to="/user/profile?tab=password" className="flex items-center gap-2.5 p-2.5 px-3 no-underline text-slate-600 text-[0.9rem] font-medium rounded-lg transition-all duration-200 bg-transparent border-none w-full cursor-pointer hover:bg-slate-50 hover:text-slate-900">
                                <FaCog />
                                <span>Settings</span>
                            </Link>

                            <div className="h-px bg-slate-100 my-1.5"></div>

                            <button className="flex items-center gap-2.5 p-2.5 px-3 no-underline text-[0.9rem] font-medium rounded-lg transition-all duration-200 bg-transparent border-none w-full cursor-pointer text-red-500 hover:bg-red-50 hover:text-red-700" onClick={handleLogout}>
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
