import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useForm, Controller } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';
import Joi from 'joi';
import FormInput from '../../../components/FormInput/FormInput';
import PasswordInput from '../../../components/PasswordInput/PasswordInput';
import { useAuth } from '../../../context/AuthContext';
import './Settings.css';

const Settings = () => {
    const { refreshUser } = useAuth();
    const [searchParams, setSearchParams] = useSearchParams();
    const [activeTab, setActiveTab] = useState(searchParams.get('tab') || 'password');
    const [submitting, setSubmitting] = useState(false);

    useEffect(() => {
        const tab = searchParams.get('tab');
        if (tab) setActiveTab(tab);
    }, [searchParams]);

    const handleTabChange = (tab) => {
        setActiveTab(tab);
        setSearchParams({ tab });
    };

    // Schemas
    const passwordSchema = Joi.object({
        currentPassword: Joi.string().required().label('Current Password'),
        newPassword: Joi.string().min(6).required().label('New Password'),
        confirmPassword: Joi.string().valid(Joi.ref('newPassword')).required().label('Confirm Password').messages({
            'any.only': 'Passwords do not match'
        })
    });

    const emailSchema = Joi.object({
        newEmail: Joi.string().email({ tlds: { allow: false } }).required().label('New Email'),
        password: Joi.string().required().label('Password')
    });

    const deleteSchema = Joi.object({
        password: Joi.string().required().label('Password'),
        confirmDelete: Joi.string().valid('DELETE').required().label('Confirmation').messages({
            'any.only': 'Please type DELETE to confirm'
        })
    });

    // Forms
    const {
        control: controlPassword,
        handleSubmit: handleSubmitPassword,
        reset: resetPasswordForm,
        formState: { errors: errorsPassword, isSubmitting: isSubmittingPassword }
    } = useForm({
        resolver: joiResolver(passwordSchema)
    });

    const {
        register: registerEmail,
        control: controlEmail,
        handleSubmit: handleSubmitEmail,
        reset: resetEmailForm,
        formState: { errors: errorsEmail, isSubmitting: isSubmittingEmail }
    } = useForm({
        resolver: joiResolver(emailSchema)
    });

    const {
        register: registerDelete,
        control: controlDelete,
        handleSubmit: handleSubmitDelete,
        formState: { errors: errorsDelete, isSubmitting: isSubmittingDelete }
    } = useForm({
        resolver: joiResolver(deleteSchema)
    });

    // Handlers
    const handleChangePassword = async (values) => {
        setSubmitting(true);
        try {
            const token = localStorage.getItem('token');
            const response = await fetch('http://localhost:5000/api/user/change-password', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(values)
            });

            const data = await response.json();
            if (response.ok) {
                toast.success('Password changed successfully!');
                resetPasswordForm();
            } else {
                toast.error(data.message || 'Failed to change password');
            }
        } catch (error) {
            console.error('Error changing password:', error);
            toast.error('An error occurred');
        } finally {
            setSubmitting(false);
        }
    };

    const handleUpdateEmail = async (values) => {
        setSubmitting(true);
        try {
            const token = localStorage.getItem('token');
            const response = await fetch('http://localhost:5000/api/user/update-email', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(values)
            });

            const data = await response.json();
            if (response.ok) {
                toast.success('Email updated successfully!');
                refreshUser();
                resetEmailForm();
            } else {
                toast.error(data.message || 'Failed to update email');
            }
        } catch (error) {
            console.error('Error updating email:', error);
            toast.error('An error occurred');
        } finally {
            setSubmitting(false);
        }
    };

    const handleDeleteAccount = async (values) => {
        if (!window.confirm('Are you absolutely sure you want to delete your account? This action cannot be undone.')) {
            return;
        }

        setSubmitting(true);
        try {
            const token = localStorage.getItem('token');
            const response = await fetch('http://localhost:5000/api/user/account', {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ password: values.password })
            });

            if (response.ok) {
                toast.success('Account deleted successfully. We\'re sorry to see you go.');
                localStorage.removeItem('token');
                localStorage.removeItem('user');
                window.location.href = '/login';
            } else {
                const data = await response.json();
                toast.error(data.message || 'Failed to delete account');
            }
        } catch (error) {
            console.error('Error deleting account:', error);
            toast.error('An error occurred');
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="settings-page">
            <div className="settings-container">
                <div className="settings-sidebar">
                    <h3>Account Settings</h3>
                    <div className="settings-tabs">
                        <button
                            className={`tab-btn ${activeTab === 'password' ? 'active' : ''}`}
                            onClick={() => handleTabChange('password')}
                        >
                            Change Password
                        </button>
                        <button
                            className={`tab-btn ${activeTab === 'email' ? 'active' : ''}`}
                            onClick={() => handleTabChange('email')}
                        >
                            Update Email
                        </button>
                        <button
                            className={`tab-btn danger ${activeTab === 'delete' ? 'active' : ''}`}
                            onClick={() => handleTabChange('delete')}
                        >
                            Delete Account
                        </button>
                    </div>
                </div>

                <div className="settings-content">
                    {activeTab === 'password' && (
                        <div className="settings-section">
                            <h2>Change Password</h2>
                            <p className="section-desc">Recommended for account security. Avoid using same passwords as other accounts.</p>
                            <form onSubmit={handleSubmitPassword(handleChangePassword)} className="settings-form">
                                <div className="form-group">
                                    <label>Current Password</label>
                                    <Controller
                                        name="currentPassword"
                                        control={controlPassword}
                                        render={({ field }) => (
                                            <PasswordInput
                                                {...field}
                                                placeholder="Enter current password"
                                                showToggle={false}
                                                className={errorsPassword.currentPassword ? 'is-invalid' : ''}
                                            />
                                        )}
                                    />
                                    {errorsPassword.currentPassword && <div className="error-message inline">{errorsPassword.currentPassword.message}</div>}
                                </div>
                                <div className="form-group">
                                    <label>New Password</label>
                                    <Controller
                                        name="newPassword"
                                        control={controlPassword}
                                        render={({ field }) => (
                                            <PasswordInput
                                                {...field}
                                                placeholder="Enter new password"
                                                showToggle={false}
                                                className={errorsPassword.newPassword ? 'is-invalid' : ''}
                                            />
                                        )}
                                    />
                                    {errorsPassword.newPassword && <div className="error-message inline">{errorsPassword.newPassword.message}</div>}
                                </div>
                                <div className="form-group">
                                    <label>Confirm New Password</label>
                                    <Controller
                                        name="confirmPassword"
                                        control={controlPassword}
                                        render={({ field }) => (
                                            <PasswordInput
                                                {...field}
                                                placeholder="Confirm new password"
                                                showToggle={false}
                                                className={errorsPassword.confirmPassword ? 'is-invalid' : ''}
                                            />
                                        )}
                                    />
                                    {errorsPassword.confirmPassword && <div className="error-message inline">{errorsPassword.confirmPassword.message}</div>}
                                </div>
                                <button type="submit" className="btn-save" disabled={submitting || isSubmittingPassword}>
                                    {submitting || isSubmittingPassword ? 'Updating...' : 'Update Password'}
                                </button>
                            </form>
                        </div>
                    )}

                    {activeTab === 'email' && (
                        <div className="settings-section">
                            <h2>Update Email</h2>
                            <p className="section-desc">You will need to use the new email for future logins.</p>
                            <form onSubmit={handleSubmitEmail(handleUpdateEmail)} className="settings-form">
                                <FormInput
                                    label="New Email Address"
                                    type="email"
                                    placeholder="Enter new email address"
                                    error={errorsEmail.newEmail}
                                    {...registerEmail('newEmail')}
                                />
                                <div className="form-group">
                                    <label>Current Password</label>
                                    <Controller
                                        name="password"
                                        control={controlEmail}
                                        render={({ field }) => (
                                            <PasswordInput
                                                {...field}
                                                placeholder="Enter password to confirm"
                                                showToggle={false}
                                                className={errorsEmail.password ? 'is-invalid' : ''}
                                            />
                                        )}
                                    />
                                    {errorsEmail.password && <div className="error-message inline">{errorsEmail.password.message}</div>}
                                </div>
                                <button type="submit" className="btn-save" disabled={submitting || isSubmittingEmail}>
                                    {submitting || isSubmittingEmail ? 'Updating...' : 'Update Email'}
                                </button>
                            </form>
                        </div>
                    )}

                    {activeTab === 'delete' && (
                        <div className="settings-section">
                            <h2 className="danger-text">Delete Account</h2>
                            <p className="section-desc">Once you delete your account, there is no going back. Please be certain.</p>
                            <form onSubmit={handleSubmitDelete(handleDeleteAccount)} className="settings-form">
                                <div className="form-group">
                                    <label>Current Password</label>
                                    <Controller
                                        name="password"
                                        control={controlDelete}
                                        render={({ field }) => (
                                            <PasswordInput
                                                {...field}
                                                placeholder="Enter password to confirm"
                                                showToggle={false}
                                                className={errorsDelete.password ? 'is-invalid' : ''}
                                            />
                                        )}
                                    />
                                    {errorsDelete.password && <div className="error-message inline">{errorsDelete.password.message}</div>}
                                </div>
                                <FormInput
                                    label='Type "DELETE" to confirm'
                                    type="text"
                                    placeholder="Type DELETE"
                                    error={errorsDelete.confirmDelete}
                                    {...registerDelete('confirmDelete')}
                                />
                                <button type="submit" className="btn-delete" disabled={submitting || isSubmittingDelete}>
                                    {submitting || isSubmittingDelete ? 'Deleting...' : 'Permanently Delete Account'}
                                </button>
                            </form>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Settings;
