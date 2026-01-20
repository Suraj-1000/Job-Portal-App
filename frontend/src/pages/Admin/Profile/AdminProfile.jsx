import { useState, useEffect } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import Joi from 'joi';
import { toast } from 'react-toastify';
import { useAuth } from '../../../context/AuthContext';
import { joiValidator } from '../../../utils/joiValidator';
import InputField from '../../../components/InputField/InputField';
import PasswordInput from '../../../components/PasswordInput/PasswordInput';

const AdminProfile = ({ activeTab = 'profile' }) => {
    const { user, login } = useAuth();
    const [tab, setTab] = useState(activeTab);

    useEffect(() => {
        setTab(activeTab);
    }, [activeTab]);

    // Update Profile Logic
    const profileSchema = Joi.object({
        firstName: Joi.string().required().label('First Name'),
        lastName: Joi.string().required().label('Last Name'),
        email: Joi.string().email({ tlds: { allow: false } }).required().label('Email'),
        phone: Joi.string().allow('').optional().label('Phone'),
        gender: Joi.string().valid('Male', 'Female', 'Others').allow('').optional().label('Gender'),
        dateOfBirth: Joi.date().allow('').optional().label('Date of Birth'),
    });

    const handleUpdateProfile = async (values, { setSubmitting }) => {
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

            // Update local user context (if you have a way to refresh or just manually update)
            // Assuming login() can update user data without new token if token passed is same/null
            login(data, token);
            toast.success('Profile updated successfully');
        } catch (error) {
            toast.error(error.message);
        } finally {
            setSubmitting(false);
        }
    };

    // Change Password Logic
    const passwordSchema = Joi.object({
        password: Joi.string().min(6).required().label('New Password'),
        confirmPassword: Joi.any().valid(Joi.ref('password')).required().label('Confirm Password').messages({
            'any.only': 'Passwords do not match',
        }),
    });

    const handleChangePassword = async (values, { setSubmitting, resetForm }) => {
        try {
            const token = localStorage.getItem('token');
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
            resetForm();
        } catch (error) {
            toast.error(error.message);
        } finally {
            setSubmitting(false);
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
                    <Formik
                        initialValues={{
                            firstName: user?.firstName || '',
                            lastName: user?.lastName || '',
                            email: user?.email || '',
                            phone: user?.phone || '',
                            gender: user?.gender || '',
                            dateOfBirth: user?.dateOfBirth || ''
                        }}
                        enableReinitialize
                        validate={joiValidator(profileSchema)}
                        onSubmit={handleUpdateProfile}
                    >
                        {({ isSubmitting }) => (
                            <Form>
                                <InputField label="First Name" name="firstName" placeholder="First Name" />
                                <InputField label="Last Name" name="lastName" placeholder="Last Name" />
                                <InputField label="Email" name="email" type="email" placeholder="Email" />
                                <InputField label="Phone" name="phone" placeholder="Phone Number" />

                                <div className="form-group">
                                    <label>Gender</label>
                                    <Field as="select" name="gender" className="form-input">
                                        <option value="">Select Gender</option>
                                        <option value="Male">Male</option>
                                        <option value="Female">Female</option>
                                        <option value="Others">Others</option>
                                    </Field>
                                    <ErrorMessage name="gender" component="div" className="error-message inline" />
                                </div>

                                <InputField label="Date of Birth" name="dateOfBirth" type="date" />

                                <button type="submit" disabled={isSubmitting} className="btn-primary" style={{ marginTop: '20px' }}>
                                    {isSubmitting ? 'Updating...' : 'Save Changes'}
                                </button>
                            </Form>
                        )}
                    </Formik>
                )}

                {tab === 'password' && (
                    <Formik
                        initialValues={{ password: '', confirmPassword: '' }}
                        validate={joiValidator(passwordSchema)}
                        onSubmit={handleChangePassword}
                    >
                        {({ isSubmitting }) => (
                            <Form>
                                <div className="form-group">
                                    <label>New Password</label>
                                    <Field name="password">
                                        {({ field, meta }) => (
                                            <PasswordInput
                                                {...field}
                                                placeholder="New Password"
                                                className={meta.touched && meta.error ? 'is-invalid' : ''}
                                            />
                                        )}
                                    </Field>
                                    <ErrorMessage name="password" component="div" className="error-message inline" />
                                </div>

                                <div className="form-group">
                                    <label>Confirm Password</label>
                                    <Field name="confirmPassword">
                                        {({ field, meta }) => (
                                            <PasswordInput
                                                {...field}
                                                placeholder="Confirm Password"
                                                className={meta.touched && meta.error ? 'is-invalid' : ''}
                                            />
                                        )}
                                    </Field>
                                    <ErrorMessage name="confirmPassword" component="div" className="error-message inline" />
                                </div>

                                <button type="submit" disabled={isSubmitting} className="btn-primary" style={{ marginTop: '20px' }}>
                                    {isSubmitting ? 'Updating...' : 'Change Password'}
                                </button>
                            </Form>
                        )}
                    </Formik>
                )}
            </div>
        </div>
    );
};

export default AdminProfile;
