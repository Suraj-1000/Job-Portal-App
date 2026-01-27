import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useForm, Controller } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';
import Joi from 'joi';
import FormInput from '../../../components/FormInput/FormInput.jsx';
import PasswordInput from '../../../components/PasswordInput/PasswordInput.jsx';
import '../../../css/user_authentication/auth.css';

const ForgotPassword = () => {
  const [step, setStep] = useState(1); // 1: email, 2: otp, 3: new password
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);
  const [sendingOtp, setSendingOtp] = useState(false);
  const navigate = useNavigate();

  // Schemas
  const emailSchema = Joi.object({
    email: Joi.string().email({ tlds: { allow: false } }).required().label('Email'),
  });

  const otpSchema = Joi.object({
    otp: Joi.string().length(6).required().pattern(/^[0-9]+$/).label('OTP').messages({
      'string.pattern.base': 'OTP must be 6 digits'
    }),
  });

  const passwordSchema = Joi.object({
    newPassword: Joi.string().min(6).required().label('New Password'),
    confirmPassword: Joi.any().valid(Joi.ref('newPassword')).required().label('Confirm Password').messages({
      'any.only': 'Passwords do not match',
    }),
  });

  // Forms
  const {
    register: registerEmail,
    handleSubmit: handleSubmitEmail,
    formState: { errors: errorsEmail, isSubmitting: isSubmittingEmail }
  } = useForm({
    resolver: joiResolver(emailSchema)
  });

  const {
    register: registerOtp,
    handleSubmit: handleSubmitOtp,
    formState: { errors: errorsOtp, isSubmitting: isSubmittingOtp },
    reset: resetOtp
  } = useForm({
    resolver: joiResolver(otpSchema)
  });

  const {
    handleSubmit: handleSubmitPassword,
    control: controlPassword,
    formState: { errors: errorsPassword, isSubmitting: isSubmittingPassword }
  } = useForm({
    resolver: joiResolver(passwordSchema)
  });

  // Handlers
  const handleSendOTP = async (values) => {
    setSendingOtp(true);
    try {
      const response = await fetch('http://localhost:5000/api/otp/send-forgot-password-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: values.email }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to send OTP');
      }

      toast.success('OTP sent to your email!');
      setEmail(values.email);
      setStep(2);
    } catch (err) {
      toast.error(err.message || 'Failed to send OTP');
    } finally {
      setSendingOtp(false);
    }
  };

  const handleVerifyOTP = async (values) => {
    setLoading(true);
    try {
      const response = await fetch('http://localhost:5000/api/otp/verify-forgot-password-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email, otp: values.otp }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Invalid or expired OTP');
      }

      setOtp(values.otp);
      setStep(3);
      toast.success('OTP verified! Now set your new password.');
    } catch (err) {
      toast.error(err.message || 'Invalid or expired OTP');
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async (values) => {
    setLoading(true);
    try {
      const response = await fetch('http://localhost:5000/api/otp/reset-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: email,
          otp: otp,
          newPassword: values.newPassword
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to reset password');
      }

      toast.success('Password reset successfully!');
      navigate('/login');
    } catch (err) {
      toast.error(err.message || 'Failed to reset password');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>Forgot Password</h2>

        {step === 1 && (
          <>
            <p className="forgot-password-text">Enter your email address and we'll send you an OTP to reset your password.</p>
            <form onSubmit={handleSubmitEmail(handleSendOTP)}>
              <FormInput
                label="Email"
                type="email"
                placeholder="Enter your email"
                error={errorsEmail.email}
                {...registerEmail('email')}
              />
              <button type="submit" disabled={sendingOtp || isSubmittingEmail}>
                {sendingOtp || isSubmittingEmail ? 'Sending OTP...' : 'Send OTP'}
              </button>
            </form>
          </>
        )}

        {step === 2 && (
          <>
            <p className="forgot-password-text">Enter the 6-digit OTP sent to your email.</p>
            <form onSubmit={handleSubmitOtp(handleVerifyOTP)}>
              <FormInput
                label="OTP"
                type="text"
                placeholder="Enter 6-digit OTP"
                maxLength="6"
                error={errorsOtp.otp}
                {...registerOtp('otp')}
              />
              <small className="otp-hint" style={{ display: 'block', marginTop: '-15px', marginBottom: '20px' }}>
                Check your email for the OTP code.
              </small>

              <div className="form-actions">
                <button type="button" className="btn-secondary" onClick={() => setStep(1)}>
                  Back
                </button>
                <button type="submit" disabled={loading || isSubmittingOtp}>
                  {loading || isSubmittingOtp ? 'Verifying...' : 'Verify OTP'}
                </button>
              </div>
            </form>
            <button
              type="button"
              className="btn-resend-otp"
              onClick={() => handleSendOTP({ email })}
              disabled={sendingOtp}
            >
              {sendingOtp ? 'Sending...' : 'Resend OTP'}
            </button>
          </>
        )}

        {step === 3 && (
          <>
            <p className="forgot-password-text">Enter your new password.</p>
            <form onSubmit={handleSubmitPassword(handleResetPassword)}>
              <div className="form-group">
                <label>New Password</label>
                <Controller
                  name="newPassword"
                  control={controlPassword}
                  render={({ field }) => (
                    <PasswordInput
                      {...field}
                      placeholder="Enter your password"
                      required
                      minLength="6"
                      showToggle={false}
                      className={errorsPassword.newPassword ? 'is-invalid' : ''}
                    />
                  )}
                />
                {errorsPassword.newPassword && (
                  <div className="error-message inline">{errorsPassword.newPassword.message}</div>
                )}
              </div>

              <div className="form-group">
                <label>Confirm Password</label>
                <Controller
                  name="confirmPassword"
                  control={controlPassword}
                  render={({ field }) => (
                    <PasswordInput
                      {...field}
                      placeholder="Confirm your password"
                      required
                      minLength="6"
                      showToggle={false}
                      className={errorsPassword.confirmPassword ? 'is-invalid' : ''}
                    />
                  )}
                />
                {errorsPassword.confirmPassword && (
                  <div className="error-message inline">{errorsPassword.confirmPassword.message}</div>
                )}
              </div>

              <div className="form-actions">
                <button type="button" className="btn-secondary" onClick={() => setStep(2)}>
                  Back
                </button>
                <button type="submit" disabled={loading || isSubmittingPassword}>
                  {loading || isSubmittingPassword ? 'Resetting...' : 'Reset Password'}
                </button>
              </div>
            </form>
          </>
        )}

        <p className="auth-link">
          Remember your password? <Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default ForgotPassword;
