import { useState, useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';
import Joi from 'joi';
import { toast } from 'react-toastify';
import { useAuth } from '../../../context/AuthContext';
import FormInput from '../../../components/FormInput/FormInput';
import PasswordInput from '../../../components/PasswordInput/PasswordInput';

const AdminProfile = ({ activeTab = 'profile' }) => {
    const { user, login } = useAuth();
    const [tab, setTab] = useState(activeTab);

    useEffect(() => {
        setTab(activeTab);
    }, [activeTab]);

    // Schemas
    const profileSchema = Joi.object({
        firstName: Joi.string().required().label('First Name'),
        lastName: Joi.string().required().label('Last Name'),
        email: Joi.string().email({ tlds: { allow: false } }).required().label('Email'),
        phone: Joi.string().allow('').optional().label('Phone'),
        gender: Joi.string().valid('Male', 'Female', 'Others').allow('').optional().label('Gender'),
        dateOfBirth: Joi.date().allow('').optional().label('Date of Birth'),
    });

    const passwordSchema = Joi.object({
        password: Joi.string().min(6).required().label('New Password'),
        confirmPassword: Joi.string().valid(Joi.ref('password')).required().label('Confirm Password').messages({
            'any.only': 'Passwords do not match',
        }),
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
            email: '',
            phone: '',
            gender: '',
            dateOfBirth: ''
        }
    });

    const {
        control: controlPassword,
        handleSubmit: handleSubmitPassword,
        reset: resetPassword,
        formState: { errors: errorsPassword, isSubmitting: isSubmittingPassword }
    } = useForm({
        resolver: joiResolver(passwordSchema)
    });

    // Reset profile form when user data is available
    useEffect(() => {
        if (user) {
            resetProfile({
                firstName: user.firstName || '',
                lastName: user.lastName || '',
                email: user.email || '',
                phone: user.phone || '',
                gender: user.gender || '',
                dateOfBirth: user.dateOfBirth ? new Date(user.dateOfBirth).toISOString().split('T')[0] : ''
            });
        }
    }, [user, resetProfile]);

    // Handlers
    const handleUpdateProfile = async (values) => {
        try {
            const token = localStorage.getItem('accessToken');
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

            // Update local user context
            login(data, token);
            toast.success('Profile updated successfully');
        } catch (error) {
            toast.error(error.message);
        }
    };

    const handleChangePassword = async (values) => {
        try {
            const token = localStorage.getItem('accessToken');
            const response = await fetch(`http://localhost:5000/api/users/${user.id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ password: values.password }),
            });

            const data = await response.json();

            if (!response.ok) throw new Error(data.message || 'Failed to update password');

            toast.success('Password changed successfully');
            resetPassword();
        } catch (error) {
            toast.error(error.message);
        }
    };

    return (
        <div style={{ maxWidth: '600px', margin: '0 auto' }}>
            <h1>Account Settings</h1>

            <div style={{ display: 'flex', gap: '20px', marginBottom: '30px', borderBottom: '1px solid #ddd' }}>
                <button
                    onClick={() => setTab('profile')}
                    style={{
                        padding: '10px 20px',
                        background: 'none',
                        border: 'none',
                        borderBottom: tab === 'profile' ? '2px solid #6c5ce7' : 'none',
                        color: tab === 'profile' ? '#6c5ce7' : '#636e72',
                        fontWeight: '600',
                        cursor: 'pointer'
                    }}
                >
                    Update Profile
                </button>
                <button
                    onClick={() => setTab('password')}
                    style={{
                        padding: '10px 20px',
                        background: 'none',
                        border: 'none',
                        borderBottom: tab === 'password' ? '2px solid #6c5ce7' : 'none',
                        color: tab === 'password' ? '#6c5ce7' : '#636e72',
                        fontWeight: '600',
                        cursor: 'pointer'
                    }}
                >
                    Change Password
                </button>
            </div>

            <div style={{ background: 'white', padding: '30px', borderRadius: '12px', boxShadow: '0 4px 6px rgba(0,0,0,0.05)' }}>
                {tab === 'profile' && (
                    <form onSubmit={handleSubmitProfile(handleUpdateProfile)}>
                        <FormInput
                            label="First Name"
                            placeholder="First Name"
                            error={errorsProfile.firstName}
                            {...registerProfile('firstName')}
                        />
                        <FormInput
                            label="Last Name"
                            placeholder="Last Name"
                            error={errorsProfile.lastName}
                            {...registerProfile('lastName')}
                        />
                        <FormInput
                            label="Email"
                            type="email"
                            placeholder="Email"
                            error={errorsProfile.email}
                            {...registerProfile('email')}
                        />
                        <FormInput
                            label="Phone"
                            placeholder="Phone Number"
                            error={errorsProfile.phone}
                            {...registerProfile('phone')}
                        />

                        <div className="form-group">
                            <label>Gender</label>
                            <select
                                className={`form-input ${errorsProfile.gender ? 'is-invalid' : ''}`}
                                {...registerProfile('gender')}
                            >
                                <option value="">Select Gender</option>
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                                <option value="Others">Others</option>
                            </select>
                            {errorsProfile.gender && <div className="error-message inline">{errorsProfile.gender.message}</div>}
                        </div>

                        <FormInput
                            label="Date of Birth"
                            type="date"
                            error={errorsProfile.dateOfBirth}
                            {...registerProfile('dateOfBirth')}
                        />

                        <button type="submit" disabled={isSubmittingProfile} className="btn-primary" style={{ marginTop: '20px' }}>
                            {isSubmittingProfile ? 'Updating...' : 'Save Changes'}
                        </button>
                    </form>
                )}

                {tab === 'password' && (
                    <form onSubmit={handleSubmitPassword(handleChangePassword)}>
                        <div className="form-group">
                            <label>New Password</label>
                            <Controller
                                name="password"
                                control={controlPassword}
                                render={({ field }) => (
                                    <PasswordInput
                                        {...field}
                                        placeholder="New Password"
                                        className={errorsPassword.password ? 'is-invalid' : ''}
                                    />
                                )}
                            />
                            {errorsPassword.password && <div className="error-message inline">{errorsPassword.password.message}</div>}
                        </div>

                        <div className="form-group">
                            <label>Confirm Password</label>
                            <Controller
                                name="confirmPassword"
                                control={controlPassword}
                                render={({ field }) => (
                                    <PasswordInput
                                        {...field}
                                        placeholder="Confirm Password"
                                        className={errorsPassword.confirmPassword ? 'is-invalid' : ''}
                                    />
                                )}
                            />
                            {errorsPassword.confirmPassword && <div className="error-message inline">{errorsPassword.confirmPassword.message}</div>}
                        </div>

                        <button type="submit" disabled={isSubmittingPassword} className="btn-primary" style={{ marginTop: '20px' }}>
                            {isSubmittingPassword ? 'Updating...' : 'Change Password'}
                        </button>
                    </form>
                )}
            </div>
        </div>
    );
};

export default AdminProfile;
