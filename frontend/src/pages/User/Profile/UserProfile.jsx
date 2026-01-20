import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext';
import { FaUser, FaLock, FaCamera, FaSave, FaEnvelope, FaPhone, FaMapMarkerAlt } from 'react-icons/fa';
import { toast } from 'react-toastify';
import './UserProfile.css';

const UserProfile = () => {
    const { user } = useAuth();
    const location = useLocation();
    const [activeTab, setActiveTab] = useState('profile');

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const tab = params.get('tab');
        if (tab) setActiveTab(tab);
    }, [location.search]);

    const handleSave = (e) => {
        e.preventDefault();
        toast.success('Profile updated successfully!');
    };

    return (
        <div className="profile-page">
            <div className="profile-container">
                {/* Profile Header */}
                <div className="profile-header-card">
                    <div className="profile-cover"></div>
                    <div className="profile-info-wrapper">
                        <div className="profile-avatar-large">
                            {user?.firstName?.[0]}{user?.lastName?.[0]}
                            <button className="upload-btn"><FaCamera /></button>
                        </div>
                        <div className="profile-text">
                            <h1>{user?.firstName} {user?.lastName}</h1>
                            <p className="role-badge">{user?.role || 'Job Seeker'}</p>
                            <div className="profile-meta">
                                <span><FaEnvelope /> {user?.email}</span>
                                <span><FaPhone /> {user?.phone || 'Add phone'}</span>
                                <span><FaMapMarkerAlt /> {user?.address || 'Add location'}</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="profile-content-grid">
                    {/* Sidebar Tabs */}
                    <aside className="profile-sidebar">
                        <button
                            className={`tab-btn ${activeTab === 'profile' ? 'active' : ''}`}
                            onClick={() => setActiveTab('profile')}
                        >
                            <FaUser /> Personal Information
                        </button>
                        <button
                            className={`tab-btn ${activeTab === 'password' ? 'active' : ''}`}
                            onClick={() => setActiveTab('password')}
                        >
                            <FaLock /> Security & Password
                        </button>
                    </aside>

                    {/* Main Content Area */}
                    <main className="profile-main-content">
                        {activeTab === 'profile' && (
                            <form className="settings-form" onSubmit={handleSave}>
                                <h2>Personal Information</h2>
                                <div className="form-row">
                                    <div className="form-group">
                                        <label>First Name</label>
                                        <input type="text" defaultValue={user?.firstName} />
                                    </div>
                                    <div className="form-group">
                                        <label>Last Name</label>
                                        <input type="text" defaultValue={user?.lastName} />
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label>Email Address</label>
                                    <input type="email" defaultValue={user?.email} disabled className="disabled-input" />
                                    <span className="input-hint">Email cannot be changed</span>
                                </div>
                                <div className="form-row">
                                    <div className="form-group">
                                        <label>Phone Number</label>
                                        <input type="tel" placeholder="+1 (555) 000-0000" />
                                    </div>
                                    <div className="form-group">
                                        <label>Location</label>
                                        <input type="text" placeholder="City, Country" />
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label>Professional Bio</label>
                                    <textarea rows="4" placeholder="Tell us about yourself..."></textarea>
                                </div>

                                <div className="form-actions">
                                    <button type="button" className="btn-cancel">Cancel</button>
                                    <button type="submit" className="btn-save"><FaSave /> Save Changes</button>
                                </div>
                            </form>
                        )}

                        {activeTab === 'password' && (
                            <form className="settings-form" onSubmit={handleSave}>
                                <h2>Change Password</h2>
                                <div className="form-group">
                                    <label>Current Password</label>
                                    <input type="password" />
                                </div>
                                <div className="form-group">
                                    <label>New Password</label>
                                    <input type="password" />
                                </div>
                                <div className="form-group">
                                    <label>Confirm New Password</label>
                                    <input type="password" />
                                </div>
                                <div className="form-actions">
                                    <button type="button" className="btn-cancel">Cancel</button>
                                    <button type="submit" className="btn-save"><FaSave /> Update Password</button>
                                </div>
                            </form>
                        )}
                    </main>
                </div>
            </div>
        </div>
    );
};

export default UserProfile;
