import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
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
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

const Signup = () => {
  const [step, setStep] = useState(1); // 1: enter details, 2: verify OTP
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    otp: ''
  });
  const [serverError, setServerError] = useState('');
  const [loading, setLoading] = useState(false);
  const [sendingOtp, setSendingOtp] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const detailsSchema = Joi.object({
    firstName: Joi.string().trim().required().label('First Name'),
    lastName: Joi.string().trim().required().label('Last Name'),
    email: Joi.string().email({ tlds: { allow: false } }).required().label('Email'),
    password: Joi.string().min(6).required().label('Password'),
  });

  const otpSchema = Joi.object({
    otp: Joi.string().length(6).required().pattern(/^[0-9]+$/).label('OTP').messages({
      'string.pattern.base': 'OTP must be 6 digits'
    }),
  });

  // Form hooks for Step 1
  const detailsForm = useForm({
    resolver: joiResolver(detailsSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
    },
  });

  // Form hooks for Step 2
  const otpForm = useForm({
    resolver: joiResolver(otpSchema),
    defaultValues: {
      otp: '',
    },
  });

  const handleSendOTP = async (values) => {
    setFormData((prev) => ({ ...prev, ...values }));
    setSendingOtp(true);
    setServerError('');

    try {
      const response = await fetch('http://localhost:5000/api/otp/send-signup-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: values.email }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to send OTP');
      }

      toast.success('OTP sent to your email!');
      setStep(2);
    } catch (err) {
      toast.error(err.message || 'Failed to send OTP');
      setServerError(err.message);
    } finally {
      setSendingOtp(false);
    }
  };

  const handleVerifyOTP = async (values) => {
    setFormData((prev) => ({ ...prev, otp: values.otp }));
    setLoading(true);
    setServerError('');

    try {
      const response = await fetch('http://localhost:5000/api/otp/verify-signup-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          password: formData.password,
          otp: values.otp
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Signup failed');
      }

      // Save token and user data
      login(data.user, data.accessToken, data.refreshToken);

      toast.success('Account created successfully!');

      // Redirect based on role
      const role = data.user.role;
      if (role === 'superadmin') navigate('/superadmin/dashboard');
      else navigate('/user/home');
    } catch (err) {
      console.error('Signup error:', err);
      setServerError(err.message || 'An error occurred during signup');
      toast.error(err.message || 'An error occurred during signup');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8">
      <Card className="w-full max-w-lg shadow-lg">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center">Sign Up</CardTitle>
          <CardDescription className="text-center">
            create a new account to get started
          </CardDescription>
        </CardHeader>
        <CardContent>
          {serverError && (
            <div className="bg-red-50 text-red-500 text-sm p-3 rounded-md mb-4 border border-red-200">
              {serverError}
            </div>
          )}

          {step === 1 && (
            <Form {...detailsForm}>
              <form onSubmit={detailsForm.handleSubmit(handleSendOTP)} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={detailsForm.control}
                    name="firstName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>First Name</FormLabel>
                        <FormControl>
                          <Input placeholder="First Name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={detailsForm.control}
                    name="lastName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Last Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Last Name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={detailsForm.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input type="email" placeholder="name@example.com" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={detailsForm.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input type="password" placeholder="Create a password" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button type="submit" className="w-full bg-indigo-600 hover:bg-indigo-700" disabled={sendingOtp || detailsForm.formState.isSubmitting}>
                  {sendingOtp || detailsForm.formState.isSubmitting ? 'Sending OTP...' : 'Send OTP'}
                </Button>
              </form>
            </Form>
          )}

          {step === 2 && (
            <Form {...otpForm}>
              <form onSubmit={otpForm.handleSubmit(handleVerifyOTP)} className="space-y-4">
                <div className="text-center text-sm text-slate-500 mb-4">
                  Enter the 6-digit OTP sent to <strong>{formData.email}</strong>
                </div>
                <FormField
                  control={otpForm.control}
                  name="otp"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>OTP Code</FormLabel>
                      <FormControl>
                        <Input placeholder="123456" maxLength={6} className="text-center text-lg tracking-widest" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="flex gap-3 pt-2">
                  <Button type="button" variant="outline" className="flex-1" onClick={() => {
                    setStep(1);
                    otpForm.reset({ otp: '' });
                  }}>
                    Back
                  </Button>
                  <Button type="submit" className="flex-1 bg-indigo-600 hover:bg-indigo-700" disabled={loading || otpForm.formState.isSubmitting}>
                    {loading || otpForm.formState.isSubmitting ? 'Verifying...' : 'Verify & Sign Up'}
                  </Button>
                </div>
              </form>
              <div className="mt-4 text-center">
                <button
                  type="button"
                  className="text-sm text-indigo-600 hover:text-indigo-500 font-medium disabled:opacity-50 disabled:cursor-not-allowed bg-transparent border-0 cursor-pointer"
                  onClick={() => handleSendOTP(formData)}
                  disabled={sendingOtp}
                >
                  {sendingOtp ? 'Sending...' : 'Resend OTP'}
                </button>
              </div>
            </Form>
          )}
        </CardContent>
        <CardFooter className="flex justify-center text-sm text-slate-500">
          Already have an account?{' '}
          <Link to="/login" className="ml-1 text-indigo-600 hover:text-indigo-500 font-medium">
            Login
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Signup;

