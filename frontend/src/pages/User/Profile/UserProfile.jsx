import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';
import Joi from 'joi';
import { useAuth } from '../../../context/AuthContext';
import { FaUser, FaLock, FaCamera, FaSave, FaEnvelope, FaPhone, FaMapMarkerAlt } from 'react-icons/fa';
import { toast } from 'react-toastify';
import FormInput from '../../../components/FormInput/FormInput';
import './UserProfile.css';

const UserProfile = () => {
    const { user, login } = useAuth();
    const location = useLocation();
    const [activeTab, setActiveTab] = useState('profile');

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const tab = params.get('tab');
        if (tab) setActiveTab(tab);
    }, [location.search]);

    // Schemas
    const profileSchema = Joi.object({
        firstName: Joi.string().required().label('First Name'),
        lastName: Joi.string().required().label('Last Name'),
        phone: Joi.string().allow('', null).label('Phone Number'),
        address: Joi.string().allow('', null).label('Location'),
        bio: Joi.string().allow('', null).label('Professional Bio')
    });

    const passwordSchema = Joi.object({
        currentPassword: Joi.string().required().label('Current Password'),
        newPassword: Joi.string().min(6).required().label('New Password'),
        confirmPassword: Joi.string().valid(Joi.ref('newPassword')).required().label('Confirm Password').messages({
            'any.only': 'Passwords do not match'
        })
    });

    // Forms
    const {
        register: registerProfile,
        handleSubmit: handleSubmitProfile,
        reset: resetProfile,
        formState: { errors: errorsProfile, isSubmitting: isSubmittingProfile }
    } = useForm({
        resolver: joiResolver(profileSchema),
        defaultValues: {
            firstName: '',
            lastName: '',
            phone: '',
            address: '',
            bio: ''
        }
    });

    const {
        register: registerPassword,
        handleSubmit: handleSubmitPassword,
        reset: resetPassword,
        formState: { errors: errorsPassword, isSubmitting: isSubmittingPassword }
    } = useForm({
        resolver: joiResolver(passwordSchema)
    });

    useEffect(() => {
        if (user) {
            resetProfile({
                firstName: user.firstName || '',
                lastName: user.lastName || '',
                phone: user.phone || '',
                address: user.address || '',
                bio: user.bio || ''
            });
        }
    }, [user, resetProfile]);

    // Handlers
    const handleUpdateProfile = async (values) => {
        try {
            const token = localStorage.getItem('token');
            const response = await fetch(`http://localhost:5000/api/users/${user.id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(values),
            });

            const data = await response.json();

            if (!response.ok) throw new Error(data.message || 'Failed to update profile');

            login(data, token);
            toast.success('Profile updated successfully!');
        } catch (error) {
            console.error('Error updating profile:', error);
            toast.error(error.message || 'Failed to update profile');
        }
    };

    const handleChangePassword = async (values) => {
        try {
            const token = localStorage.getItem('token');
            const response = await fetch('http://localhost:5000/api/user/change-password', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    currentPassword: values.currentPassword,
                    newPassword: values.newPassword
                }),
            });

            const data = await response.json();

            if (!response.ok) throw new Error(data.message || 'Failed to change password');

            toast.success('Password updated successfully!');
            resetPassword();
        } catch (error) {
            console.error('Error changing password:', error);
            toast.error(error.message || 'Failed to change password');
        }
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
                            <form className="settings-form" onSubmit={handleSubmitProfile(handleUpdateProfile)}>
                                <h2>Personal Information</h2>
                                <div className="form-row">
                                    <FormInput
                                        label="First Name"
                                        error={errorsProfile.firstName}
                                        {...registerProfile('firstName')}
                                    />
                                    <FormInput
                                        label="Last Name"
                                        error={errorsProfile.lastName}
                                        {...registerProfile('lastName')}
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Email Address</label>
                                    <input type="email" defaultValue={user?.email} disabled className="disabled-input" />
                                    <span className="input-hint">Email cannot be changed</span>
                                </div>
                                <div className="form-row">
                                    <FormInput
                                        label="Phone Number"
                                        placeholder="+1 (555) 000-0000"
                                        error={errorsProfile.phone}
                                        {...registerProfile('phone')}
                                    />
                                    <FormInput
                                        label="Location"
                                        placeholder="City, Country"
                                        error={errorsProfile.address}
                                        {...registerProfile('address')}
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Professional Bio</label>
                                    <textarea
                                        rows="4"
                                        placeholder="Tell us about yourself..."
                                        className={`form-input ${errorsProfile.bio ? 'is-invalid' : ''}`}
                                        {...registerProfile('bio')}
                                    />
                                    {errorsProfile.bio && <div className="error-message inline">{errorsProfile.bio.message}</div>}
                                </div>

                                <div className="form-actions">
                                    <button type="button" className="btn-cancel" onClick={() => resetProfile()}>Cancel</button>
                                    <button type="submit" className="btn-save" disabled={isSubmittingProfile}>
                                        <FaSave /> {isSubmittingProfile ? 'Saving...' : 'Save Changes'}
                                    </button>
                                </div>
                            </form>
                        )}

                        {activeTab === 'password' && (
                            <form className="settings-form" onSubmit={handleSubmitPassword(handleChangePassword)}>
                                <h2>Change Password</h2>
                                <FormInput
                                    label="Current Password"
                                    type="password"
                                    error={errorsPassword.currentPassword}
                                    {...registerPassword('currentPassword')}
                                />
                                <FormInput
                                    label="New Password"
                                    type="password"
                                    error={errorsPassword.newPassword}
                                    {...registerPassword('newPassword')}
                                />
                                <FormInput
                                    label="Confirm New Password"
                                    type="password"
                                    error={errorsPassword.confirmPassword}
                                    {...registerPassword('confirmPassword')}
                                />
                                <div className="form-actions">
                                    <button type="button" className="btn-cancel" onClick={() => resetPassword()}>Cancel</button>
                                    <button type="submit" className="btn-save" disabled={isSubmittingPassword}>
                                        <FaSave /> {isSubmittingPassword ? 'Updating...' : 'Update Password'}
                                    </button>
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
