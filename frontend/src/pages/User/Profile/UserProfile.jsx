import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';
import Joi from 'joi';
import { useAuth } from '../../../context/AuthContext';
import { FaUser, FaLock, FaCamera, FaSave, FaEnvelope, FaPhone, FaMapMarkerAlt } from 'react-icons/fa';
import { toast } from 'react-toastify';
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
import { Textarea } from "@/components/ui/textarea"


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
    const profileForm = useForm({
        resolver: joiResolver(profileSchema),
        defaultValues: {
            firstName: '',
            lastName: '',
            phone: '',
            address: '',
            bio: ''
        }
    });

    const passwordForm = useForm({
        resolver: joiResolver(passwordSchema),
        defaultValues: {
            currentPassword: '',
            newPassword: '',
            confirmPassword: ''
        }
    });

    useEffect(() => {
        if (user) {
            profileForm.reset({
                firstName: user.firstName || '',
                lastName: user.lastName || '',
                phone: user.phone || '',
                address: user.address || '',
                bio: user.bio || ''
            });
        }
    }, [user, profileForm]);

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
            passwordForm.reset();
        } catch (error) {
            console.error('Error changing password:', error);
            toast.error(error.message || 'Failed to change password');
        }
    };

    return (
        <div className="pb-16 font-sans text-slate-900 bg-slate-50 min-h-screen">
            <div className="max-w-[1000px] mx-auto pt-8 px-5">
                {/* Profile Header */}
                <div className="bg-white rounded-2xl overflow-hidden shadow-sm mb-8">
                    <div className="h-40 bg-gradient-to-br from-indigo-600 to-indigo-700"></div>
                    <div className="px-10 pb-8 flex flex-col md:flex-row items-center md:items-end gap-8 -mt-16 text-center md:text-left">
                        <div className="w-[120px] h-[120px] rounded-full bg-white border-4 border-white shadow-md flex items-center justify-center text-[3rem] font-bold text-indigo-600 relative shrink-0">
                            {user?.firstName?.[0]}{user?.lastName?.[0]}
                            <button className="absolute bottom-0 right-0 w-9 h-9 rounded-full bg-slate-900 text-white border-2 border-white flex items-center justify-center text-base cursor-pointer transition-transform hover:scale-110">
                                <FaCamera />
                            </button>
                        </div>
                        <div className="flex-1 pb-2.5">
                            <h1 className="text-3xl font-bold text-slate-900 mb-2">{user?.firstName} {user?.lastName}</h1>
                            <p className="inline-block px-3 py-1 bg-indigo-100 text-indigo-600 rounded-full text-sm font-semibold mb-4">{user?.role || 'Job Seeker'}</p>
                            <div className="flex flex-wrap justify-center md:justify-start gap-6 text-slate-500 text-[0.95rem]">
                                <span className="flex items-center gap-2"><FaEnvelope /> {user?.email}</span>
                                <span className="flex items-center gap-2"><FaPhone /> {user?.phone || 'Add phone'}</span>
                                <span className="flex items-center gap-2"><FaMapMarkerAlt /> {user?.address || 'Add location'}</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-[260px_1fr] gap-8">
                    {/* Sidebar Tabs */}
                    <aside className="flex flex-col gap-2.5">
                        <button
                            className={`flex items-center gap-3 p-4 bg-white border-0 rounded-xl text-slate-500 font-medium text-left cursor-pointer transition-all duration-200 text-base hover:bg-slate-50 hover:text-indigo-600 ${activeTab === 'profile' ? 'bg-white text-indigo-600 shadow-sm border-l-4 border-indigo-600' : ''}`}
                            onClick={() => setActiveTab('profile')}
                        >
                            <FaUser /> Personal Information
                        </button>
                        <button
                            className={`flex items-center gap-3 p-4 bg-white border-0 rounded-xl text-slate-500 font-medium text-left cursor-pointer transition-all duration-200 text-base hover:bg-slate-50 hover:text-indigo-600 ${activeTab === 'password' ? 'bg-white text-indigo-600 shadow-sm border-l-4 border-indigo-600' : ''}`}
                            onClick={() => setActiveTab('password')}
                        >
                            <FaLock /> Security & Password
                        </button>
                    </aside>

                    {/* Main Content Area */}
                    <main className="bg-white rounded-2xl p-8 shadow-sm">
                        {activeTab === 'profile' && (
                            <Form {...profileForm}>
                                <form className="flex flex-col gap-6" onSubmit={profileForm.handleSubmit(handleUpdateProfile)}>
                                    <h2 className="mb-2 pb-4 border-b border-slate-100 text-xl font-bold text-slate-900">Personal Information</h2>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <FormField
                                            control={profileForm.control}
                                            name="firstName"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>First Name</FormLabel>
                                                    <FormControl>
                                                        <Input {...field} placeholder="First Name" />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        <FormField
                                            control={profileForm.control}
                                            name="lastName"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Last Name</FormLabel>
                                                    <FormControl>
                                                        <Input {...field} placeholder="Last Name" />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </div>
                                    <div className="mb-0">
                                        <FormLabel className="block mb-2 text-slate-700">Email Address</FormLabel>
                                        <Input type="email" defaultValue={user?.email} disabled className="bg-slate-50 text-slate-400 cursor-not-allowed" />
                                        <span className="block mt-1.5 text-sm text-slate-400">Email cannot be changed</span>
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <FormField
                                            control={profileForm.control}
                                            name="phone"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Phone Number</FormLabel>
                                                    <FormControl>
                                                        <Input {...field} placeholder="+1 (555) 000-0000" />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        <FormField
                                            control={profileForm.control}
                                            name="address"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Location</FormLabel>
                                                    <FormControl>
                                                        <Input {...field} placeholder="City, Country" />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </div>
                                    <div>
                                        <FormField
                                            control={profileForm.control}
                                            name="bio"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Professional Bio</FormLabel>
                                                    <FormControl>
                                                        <Textarea {...field} placeholder="Tell us about yourself..." className="resize-none" rows={4} />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </div>

                                    <div className="flex justify-end gap-4 mt-4 pt-5 border-t border-slate-50">
                                        <Button variant="outline" type="button" onClick={() => profileForm.reset()}>Cancel</Button>
                                        <Button type="submit" className="bg-indigo-600 hover:bg-indigo-700" disabled={profileForm.formState.isSubmitting}>
                                            <FaSave className="mr-2" /> {profileForm.formState.isSubmitting ? 'Saving...' : 'Save Changes'}
                                        </Button>
                                    </div>
                                </form>
                            </Form>
                        )}

                        {activeTab === 'password' && (
                            <Form {...passwordForm}>
                                <form className="flex flex-col gap-6" onSubmit={passwordForm.handleSubmit(handleChangePassword)}>
                                    <h2 className="mb-2 pb-4 border-b border-slate-100 text-xl font-bold text-slate-900">Change Password</h2>
                                    <FormField
                                        control={passwordForm.control}
                                        name="currentPassword"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Current Password</FormLabel>
                                                <FormControl>
                                                    <Input type="password" {...field} />
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
                                                    <Input type="password" {...field} />
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
                                                    <Input type="password" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <div className="flex justify-end gap-4 mt-4 pt-5 border-t border-slate-50">
                                        <Button variant="outline" type="button" onClick={() => passwordForm.reset()}>Cancel</Button>
                                        <Button type="submit" className="bg-indigo-600 hover:bg-indigo-700" disabled={passwordForm.formState.isSubmitting}>
                                            <FaSave className="mr-2" /> {passwordForm.formState.isSubmitting ? 'Updating...' : 'Update Password'}
                                        </Button>
                                    </div>
                                </form>
                            </Form>
                        )}
                    </main>
                </div>
            </div>
        </div>
    );
};

export default UserProfile;
