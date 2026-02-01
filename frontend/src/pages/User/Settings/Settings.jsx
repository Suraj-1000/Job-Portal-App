import { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useForm } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';
import Joi from 'joi';
import { useAuth } from '../../../context/AuthContext';
import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"


const Settings = () => {
    const { refreshUser } = useAuth();
    const [searchParams, setSearchParams] = useSearchParams();
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState(searchParams.get('tab') || 'password');

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
    const passwordForm = useForm({
        resolver: joiResolver(passwordSchema),
        defaultValues: {
            currentPassword: '',
            newPassword: '',
            confirmPassword: ''
        }
    });

    const emailForm = useForm({
        resolver: joiResolver(emailSchema),
        defaultValues: {
            newEmail: '',
            password: ''
        }
    });

    const deleteForm = useForm({
        resolver: joiResolver(deleteSchema),
        defaultValues: {
            password: '',
            confirmDelete: ''
        }
    });

    // Handlers
    const handleChangePassword = async (values) => {
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
                passwordForm.reset();
            } else {
                toast.error(data.message || 'Failed to change password');
            }
        } catch (error) {
            console.error('Error changing password:', error);
            toast.error('An error occurred');
        }
    };

    const handleUpdateEmail = async (values) => {
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
                emailForm.reset();
            } else {
                toast.error(data.message || 'Failed to update email');
            }
        } catch (error) {
            console.error('Error updating email:', error);
            toast.error('An error occurred');
        }
    };

    const handleDeleteAccount = async (values) => {
        if (!window.confirm('Are you absolutely sure you want to delete your account? This action cannot be undone.')) {
            return;
        }

        try {
            const token = localStorage.getItem('accessToken');
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
                navigate('/login');
            } else {
                const data = await response.json();
                toast.error(data.message || 'Failed to delete account');
            }
        } catch (error) {
            console.error('Error deleting account:', error);
            toast.error('An error occurred');
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
                            <Form {...passwordForm}>
                                <form onSubmit={passwordForm.handleSubmit(handleChangePassword)} className="flex flex-col gap-6 max-w-[500px]">
                                    <FormField
                                        control={passwordForm.control}
                                        name="currentPassword"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Current Password</FormLabel>
                                                <FormControl>
                                                    <Input type="password" placeholder="Enter current password" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={passwordForm.control}
                                        name="newPassword"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>New Password</FormLabel>
                                                <FormControl>
                                                    <Input type="password" placeholder="Enter new password" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={passwordForm.control}
                                        name="confirmPassword"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Confirm New Password</FormLabel>
                                                <FormControl>
                                                    <Input type="password" placeholder="Confirm new password" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <Button type="submit" className="mt-3 bg-indigo-600 hover:bg-indigo-700" disabled={passwordForm.formState.isSubmitting}>
                                        {passwordForm.formState.isSubmitting ? 'Updating...' : 'Update Password'}
                                    </Button>
                                </form>
                            </Form>
                        </div>
                    )}

                    {activeTab === 'email' && (
                        <div>
                            <h2 className="text-2xl font-bold text-slate-900 mb-2">Update Email</h2>
                            <p className="text-slate-500 text-sm mb-8">You will need to use the new email for future logins.</p>
                            <Form {...emailForm}>
                                <form onSubmit={emailForm.handleSubmit(handleUpdateEmail)} className="flex flex-col gap-6 max-w-[500px]">
                                    <FormField
                                        control={emailForm.control}
                                        name="newEmail"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>New Email Address</FormLabel>
                                                <FormControl>
                                                    <Input type="email" placeholder="Enter new email address" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={emailForm.control}
                                        name="password"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Current Password</FormLabel>
                                                <FormControl>
                                                    <Input type="password" placeholder="Enter password to confirm" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <Button type="submit" className="mt-3 bg-indigo-600 hover:bg-indigo-700" disabled={emailForm.formState.isSubmitting}>
                                        {emailForm.formState.isSubmitting ? 'Updating...' : 'Update Email'}
                                    </Button>
                                </form>
                            </Form>
                        </div>
                    )}

                    {activeTab === 'delete' && (
                        <div>
                            <h2 className="text-2xl font-bold text-red-600 mb-2">Delete Account</h2>
                            <p className="text-slate-500 text-sm mb-8">Once you delete your account, there is no going back. Please be certain.</p>
                            <Form {...deleteForm}>
                                <form onSubmit={deleteForm.handleSubmit(handleDeleteAccount)} className="flex flex-col gap-6 max-w-[500px]">
                                    <FormField
                                        control={deleteForm.control}
                                        name="password"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Current Password</FormLabel>
                                                <FormControl>
                                                    <Input type="password" placeholder="Enter password to confirm" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={deleteForm.control}
                                        name="confirmDelete"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Type "DELETE" to confirm</FormLabel>
                                                <FormControl>
                                                    <Input type="text" placeholder="Type DELETE" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <Button type="submit" variant="destructive" className="mt-3" disabled={deleteForm.formState.isSubmitting}>
                                        {deleteForm.formState.isSubmitting ? 'Deleting...' : 'Permanently Delete Account'}
                                    </Button>
                                </form>
                            </Form>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Settings;
