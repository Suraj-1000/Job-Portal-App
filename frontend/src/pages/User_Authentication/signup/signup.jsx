import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useForm, Controller } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';
import Joi from 'joi';
import FormInput from '../../../components/FormInput/FormInput.jsx';
import PasswordInput from '../../../components/PasswordInput/PasswordInput.jsx';
import '../../../css/user_authentication/auth.css';

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
  const {
    register: registerDetails,
    handleSubmit: handleSubmitDetails,
    control: controlDetails,
    formState: { errors: errorsDetails, isSubmitting: isSubmittingDetails },
  } = useForm({
    resolver: joiResolver(detailsSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
    },
  });

  // Form hooks for Step 2
  const {
    register: registerOtp,
    handleSubmit: handleSubmitOtp,
    formState: { errors: errorsOtp, isSubmitting: isSubmittingOtp },
    reset: resetOtp
  } = useForm({
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
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));

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
    <div className="auth-container">
      <div className="auth-card">
        <h2>Sign Up</h2>
        {serverError && <div className="error-message">{serverError}</div>}

        {step === 1 && (
          <>
            <p className="forgot-password-text">Enter your details to create an account. We'll send you an OTP to verify your email.</p>
            <form onSubmit={handleSubmitDetails(handleSendOTP)}>
              <div className="form-row">
                <FormInput
                  label="First Name"
                  placeholder="First Name"
                  error={errorsDetails.firstName}
                  {...registerDetails('firstName')}
                />

                <FormInput
                  label="Last Name"
                  placeholder="Last Name"
                  error={errorsDetails.lastName}
                  {...registerDetails('lastName')}
                />
              </div>

              <div className="form-row">
                <FormInput
                  label="Email"
                  type="email"
                  placeholder="Email Address"
                  error={errorsDetails.email}
                  {...registerDetails('email')}
                />

                <div className="form-group" style={{ marginBottom: 0 }}>
                  <label>Password</label>
                  <Controller
                    name="password"
                    control={controlDetails}
                    render={({ field }) => (
                      <PasswordInput
                        {...field}
                        placeholder="Password"
                        required
                        minLength="6"
                        showToggle={false}
                        className={errorsDetails.password ? 'is-invalid' : ''}
                      />
                    )}
                  />
                  {errorsDetails.password && (
                    <div className="error-message inline">{errorsDetails.password.message}</div>
                  )}
                </div>
              </div>
              <button type="submit" disabled={sendingOtp || isSubmittingDetails}>
                {sendingOtp || isSubmittingDetails ? 'Sending OTP...' : 'Send OTP'}
              </button>
            </form>
          </>
        )}

        {step === 2 && (
          <>
            <p className="forgot-password-text">Enter the 6-digit OTP sent to your email to complete registration.</p>
            <form onSubmit={handleSubmitOtp(handleVerifyOTP)}>
              <FormInput
                label="OTP"
                type="text"
                placeholder="Enter 6-digit OTP"
                maxLength="6"
                error={errorsOtp.otp}
                {...registerOtp('otp')}
              />
              <small className="otp-hint" style={{ display: 'block', marginTop: '-15px', marginBottom: '20px' }}>Check your email ({formData.email}) for the OTP code.</small>

              <div className="form-actions">
                <button type="button" className="btn-secondary" onClick={() => {
                  setStep(1);
                  resetOtp({ otp: '' });
                }}>
                  Back
                </button>
                <button type="submit" disabled={loading || isSubmittingOtp}>
                  {loading || isSubmittingOtp ? 'Verifying...' : 'Verify & Sign Up'}
                </button>
              </div>
            </form>
            <button
              type="button"
              className="btn-resend-otp"
              onClick={() => handleSendOTP(formData)}
              disabled={sendingOtp}
            >
              {sendingOtp ? 'Sending...' : 'Resend OTP'}
            </button>
          </>
        )}

        <p className="auth-link">
          Already have an account? <a href="/login">Login</a>
        </p>
      </div>
    </div>
  );
};

export default Signup;

