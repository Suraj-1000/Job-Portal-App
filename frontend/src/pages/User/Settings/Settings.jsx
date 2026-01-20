import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Formik, Form } from 'formik';
import Joi from 'joi';
import { joiValidator } from '../../../utils/joiValidator';
import InputField from '../../../components/InputField/InputField';
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

    const handleChangePassword = async (values, { resetForm }) => {
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
                resetForm();
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

    const handleUpdateEmail = async (values, { resetForm }) => {
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
                resetForm();
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
                            <Formik
                                initialValues={{ currentPassword: '', newPassword: '', confirmPassword: '' }}
                                validate={joiValidator(passwordSchema)}
                                onSubmit={handleChangePassword}
                            >
                                {({ isSubmitting }) => (
                                    <Form className="settings-form">
                                        <div className="form-group">
                                            <label>Current Password</label>
                                            <PasswordInput name="currentPassword" placeholder="Enter current password" />
                                        </div>
                                        <div className="form-group">
                                            <label>New Password</label>
                                            <PasswordInput name="newPassword" placeholder="Enter new password" />
                                        </div>
                                        <div className="form-group">
                                            <label>Confirm New Password</label>
                                            <PasswordInput name="confirmPassword" placeholder="Confirm new password" />
                                        </div>
                                        <button type="submit" className="btn-save" disabled={submitting || isSubmitting}>
                                            {submitting || isSubmitting ? 'Updating...' : 'Update Password'}
                                        </button>
                                    </Form>
                                )}
                            </Formik>
                        </div>
                    )}

                    {activeTab === 'email' && (
                        <div className="settings-section">
                            <h2>Update Email</h2>
                            <p className="section-desc">You will need to use the new email for future logins.</p>
                            <Formik
                                initialValues={{ newEmail: '', password: '' }}
                                validate={joiValidator(emailSchema)}
                                onSubmit={handleUpdateEmail}
                            >
                                {({ isSubmitting }) => (
                                    <Form className="settings-form">
                                        <InputField
                                            label="New Email Address"
                                            name="newEmail"
                                            type="email"
                                            placeholder="Enter new email address"
                                        />
                                        <div className="form-group">
                                            <label>Current Password</label>
                                            <PasswordInput name="password" placeholder="Enter password to confirm" />
                                        </div>
                                        <button type="submit" className="btn-save" disabled={submitting || isSubmitting}>
                                            {submitting || isSubmitting ? 'Updating...' : 'Update Email'}
                                        </button>
                                    </Form>
                                )}
                            </Formik>
                        </div>
                    )}

                    {activeTab === 'delete' && (
                        <div className="settings-section">
                            <h2 className="danger-text">Delete Account</h2>
                            <p className="section-desc">Once you delete your account, there is no going back. Please be certain.</p>
                            <Formik
                                initialValues={{ password: '', confirmDelete: '' }}
                                validate={joiValidator(deleteSchema)}
                                onSubmit={handleDeleteAccount}
                            >
                                {({ isSubmitting }) => (
                                    <Form className="settings-form">
                                        <div className="form-group">
                                            <label>Current Password</label>
                                            <PasswordInput name="password" placeholder="Enter password to confirm" />
                                        </div>
                                        <InputField
                                            label='Type "DELETE" to confirm'
                                            name="confirmDelete"
                                            type="text"
                                            placeholder="Type DELETE"
                                        />
                                        <button type="submit" className="btn-delete" disabled={submitting || isSubmitting}>
                                            {submitting || isSubmitting ? 'Deleting...' : 'Permanently Delete Account'}
                                        </button>
                                    </Form>
                                )}
                            </Formik>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Settings;
