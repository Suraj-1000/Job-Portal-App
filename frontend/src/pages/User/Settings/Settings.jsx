import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useForm, Controller } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';
import Joi from 'joi';
import FormInput from '../../../components/FormInput/FormInput';
import PasswordInput from '../../../components/PasswordInput/PasswordInput';
import { useAuth } from '../../../context/AuthContext';


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
        <div className="py-8 bg-slate-50 min-h-[calc(100vh-140px)]">
            <div className="max-w-[1000px] mx-auto grid grid-cols-1 md:grid-cols-[280px_1fr] gap-8 px-6">
                <div className="bg-white rounded-xl p-6 h-fit shadow-sm">
                    <h3 className="text-lg font-bold text-slate-900 mb-5">Account Settings</h3>
                    <div className="flex flex-col gap-2">
                        <button
                            className={`p-3 text-left border border-transparent rounded-lg font-medium transition-all duration-200 cursor-pointer text-[0.95rem] ${activeTab === 'password' ? 'bg-indigo-600 text-white' : 'bg-transparent text-slate-500 hover:bg-slate-50 hover:text-indigo-600'}`}
                            onClick={() => handleTabChange('password')}
                        >
                            Change Password
                        </button>
                        <button
                            className={`p-3 text-left border border-transparent rounded-lg font-medium transition-all duration-200 cursor-pointer text-[0.95rem] ${activeTab === 'email' ? 'bg-indigo-600 text-white' : 'bg-transparent text-slate-500 hover:bg-slate-50 hover:text-indigo-600'}`}
                            onClick={() => handleTabChange('email')}
                        >
                            Update Email
                        </button>
                        <button
                            className={`p-3 text-left border border-transparent rounded-lg font-medium transition-all duration-200 cursor-pointer text-[0.95rem] ${activeTab === 'delete' ? 'bg-red-600 text-white' : 'bg-transparent text-slate-500 hover:bg-red-50 hover:text-red-600'}`}
                            onClick={() => handleTabChange('delete')}
                        >
                            Delete Account
                        </button>
                    </div>
                </div>

                <div className="bg-white rounded-xl p-6 md:p-10 shadow-sm">
                    {activeTab === 'password' && (
                        <div>
                            <h2 className="text-2xl font-bold text-slate-900 mb-2">Change Password</h2>
                            <p className="text-slate-500 text-sm mb-8">Recommended for account security. Avoid using same passwords as other accounts.</p>
                            <form onSubmit={handleSubmitPassword(handleChangePassword)} className="flex flex-col gap-6 max-w-[500px]">
                                <div className="mb-0">
                                    <label className="block mb-2 font-medium text-slate-700">Current Password</label>
                                    <Controller
                                        name="currentPassword"
                                        control={controlPassword}
                                        render={({ field }) => (
                                            <PasswordInput
                                                {...field}
                                                placeholder="Enter current password"
                                                showToggle={false}
                                                className={errorsPassword.currentPassword ? 'border-red-500' : ''}
                                            />
                                        )}
                                    />
                                    {errorsPassword.currentPassword && <div className="text-red-500 text-sm mt-1">{errorsPassword.currentPassword.message}</div>}
                                </div>
                                <div className="mb-0">
                                    <label className="block mb-2 font-medium text-slate-700">New Password</label>
                                    <Controller
                                        name="newPassword"
                                        control={controlPassword}
                                        render={({ field }) => (
                                            <PasswordInput
                                                {...field}
                                                placeholder="Enter new password"
                                                showToggle={false}
                                                className={errorsPassword.newPassword ? 'border-red-500' : ''}
                                            />
                                        )}
                                    />
                                    {errorsPassword.newPassword && <div className="text-red-500 text-sm mt-1">{errorsPassword.newPassword.message}</div>}
                                </div>
                                <div className="mb-0">
                                    <label className="block mb-2 font-medium text-slate-700">Confirm New Password</label>
                                    <Controller
                                        name="confirmPassword"
                                        control={controlPassword}
                                        render={({ field }) => (
                                            <PasswordInput
                                                {...field}
                                                placeholder="Confirm new password"
                                                showToggle={false}
                                                className={errorsPassword.confirmPassword ? 'border-red-500' : ''}
                                            />
                                        )}
                                    />
                                    {errorsPassword.confirmPassword && <div className="text-red-500 text-sm mt-1">{errorsPassword.confirmPassword.message}</div>}
                                </div>
                                <button type="submit" className="mt-3 px-6 py-3.5 bg-indigo-600 text-white rounded-lg font-semibold cursor-pointer transition-all hover:bg-indigo-700 hover:-translate-y-0.5 hover:shadow-lg disabled:bg-slate-300 disabled:cursor-not-allowed disabled:transform-none disabled:shadow-none" disabled={submitting || isSubmittingPassword}>
                                    {submitting || isSubmittingPassword ? 'Updating...' : 'Update Password'}
                                </button>
                            </form>
                        </div>
                    )}

                    {activeTab === 'email' && (
                        <div>
                            <h2 className="text-2xl font-bold text-slate-900 mb-2">Update Email</h2>
                            <p className="text-slate-500 text-sm mb-8">You will need to use the new email for future logins.</p>
                            <form onSubmit={handleSubmitEmail(handleUpdateEmail)} className="flex flex-col gap-6 max-w-[500px]">
                                <FormInput
                                    label="New Email Address"
                                    type="email"
                                    placeholder="Enter new email address"
                                    error={errorsEmail.newEmail}
                                    {...registerEmail('newEmail')}
                                />
                                <div className="mb-0">
                                    <label className="block mb-2 font-medium text-slate-700">Current Password</label>
                                    <Controller
                                        name="password"
                                        control={controlEmail}
                                        render={({ field }) => (
                                            <PasswordInput
                                                {...field}
                                                placeholder="Enter password to confirm"
                                                showToggle={false}
                                                className={errorsEmail.password ? 'border-red-500' : ''}
                                            />
                                        )}
                                    />
                                    {errorsEmail.password && <div className="text-red-500 text-sm mt-1">{errorsEmail.password.message}</div>}
                                </div>
                                <button type="submit" className="mt-3 px-6 py-3.5 bg-indigo-600 text-white rounded-lg font-semibold cursor-pointer transition-all hover:bg-indigo-700 hover:-translate-y-0.5 hover:shadow-lg disabled:bg-slate-300 disabled:cursor-not-allowed disabled:transform-none disabled:shadow-none" disabled={submitting || isSubmittingEmail}>
                                    {submitting || isSubmittingEmail ? 'Updating...' : 'Update Email'}
                                </button>
                            </form>
                        </div>
                    )}

                    {activeTab === 'delete' && (
                        <div>
                            <h2 className="text-2xl font-bold text-red-600 mb-2">Delete Account</h2>
                            <p className="text-slate-500 text-sm mb-8">Once you delete your account, there is no going back. Please be certain.</p>
                            <form onSubmit={handleSubmitDelete(handleDeleteAccount)} className="flex flex-col gap-6 max-w-[500px]">
                                <div className="mb-0">
                                    <label className="block mb-2 font-medium text-slate-700">Current Password</label>
                                    <Controller
                                        name="password"
                                        control={controlDelete}
                                        render={({ field }) => (
                                            <PasswordInput
                                                {...field}
                                                placeholder="Enter password to confirm"
                                                showToggle={false}
                                                className={errorsDelete.password ? 'border-red-500' : ''}
                                            />
                                        )}
                                    />
                                    {errorsDelete.password && <div className="text-red-500 text-sm mt-1">{errorsDelete.password.message}</div>}
                                </div>
                                <FormInput
                                    label='Type "DELETE" to confirm'
                                    type="text"
                                    placeholder="Type DELETE"
                                    error={errorsDelete.confirmDelete}
                                    {...registerDelete('confirmDelete')}
                                />
                                <button type="submit" className="mt-3 px-6 py-3.5 bg-red-600 text-white rounded-lg font-semibold cursor-pointer transition-all hover:bg-red-700 hover:-translate-y-0.5 hover:shadow-lg disabled:bg-slate-300 disabled:cursor-not-allowed disabled:transform-none disabled:shadow-none" disabled={submitting || isSubmittingDelete}>
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
