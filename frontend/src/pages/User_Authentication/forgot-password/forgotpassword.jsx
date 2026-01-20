import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import Joi from 'joi';
import { joiValidator } from '../../../utils/joiValidator';
import InputField from '../../../components/InputField/InputField.jsx';
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

  // Handlers
  const handleSendOTP = async (values, { setSubmitting }) => {
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
      setSubmitting(false);
    }
  };

  const handleVerifyOTP = async (values, { setSubmitting }) => {
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
      setSubmitting(false);
    }
  };

  const handleResetPassword = async (values, { setSubmitting }) => {
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
      setSubmitting(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>Forgot Password</h2>

        {step === 1 && (
          <>
            <p className="forgot-password-text">Enter your email address and we'll send you an OTP to reset your password.</p>
            <Formik
              initialValues={{ email: email || '' }}
              validate={joiValidator(emailSchema)}
              onSubmit={handleSendOTP}
            >
              {({ isSubmitting }) => (
                <Form>
                  <InputField
                    label="Email"
                    name="email"
                    type="email"
                    placeholder="Enter your email"
                  />
                  <button type="submit" disabled={sendingOtp || isSubmitting}>
                    {sendingOtp || isSubmitting ? 'Sending OTP...' : 'Send OTP'}
                  </button>
                </Form>
              )}
            </Formik>
          </>
        )}

        {step === 2 && (
          <>
            <p className="forgot-password-text">Enter the 6-digit OTP sent to your email.</p>
            <Formik
              initialValues={{ otp: '' }}
              validate={joiValidator(otpSchema)}
              onSubmit={handleVerifyOTP}
            >
              {({ isSubmitting }) => (
                <Form>
                  <InputField
                    label="OTP"
                    name="otp"
                    type="text"
                    placeholder="Enter 6-digit OTP"
                    maxLength="6"
                  />
                  <small className="otp-hint" style={{ display: 'block', marginTop: '-15px', marginBottom: '20px' }}>
                    Check your email for the OTP code.
                  </small>

                  <div className="form-actions">
                    <button type="button" className="btn-secondary" onClick={() => setStep(1)}>
                      Back
                    </button>
                    <button type="submit" disabled={loading || isSubmitting}>
                      {loading || isSubmitting ? 'Verifying...' : 'Verify OTP'}
                    </button>
                  </div>
                </Form>
              )}
            </Formik>
            <button
              type="button"
              className="btn-resend-otp"
              onClick={() => handleSendOTP({ email }, { setSubmitting: () => { } })}
              disabled={sendingOtp}
            >
              {sendingOtp ? 'Sending...' : 'Resend OTP'}
            </button>
          </>
        )}

        {step === 3 && (
          <>
            <p className="forgot-password-text">Enter your new password.</p>
            <Formik
              initialValues={{ newPassword: '', confirmPassword: '' }}
              validate={joiValidator(passwordSchema)}
              onSubmit={handleResetPassword}
            >
              {({ isSubmitting }) => (
                <Form>
                  <div className="form-group">
                    <label>New Password</label>
                    <Field name="newPassword">
                      {({ field, meta }) => (
                        <PasswordInput
                          {...field}
                          value={field.value}
                          onChange={field.onChange}
                          placeholder="Enter your password"
                          required
                          minLength="6"
                          showToggle={false}
                          className={meta.touched && meta.error ? 'is-invalid' : ''}
                        />
                      )}
                    </Field>
                    <ErrorMessage name="newPassword" component="div" className="error-message inline" />
                  </div>

                  <div className="form-group">
                    <label>Confirm Password</label>
                    <Field name="confirmPassword">
                      {({ field, meta }) => (
                        <PasswordInput
                          {...field}
                          value={field.value}
                          onChange={field.onChange}
                          placeholder="Confirm your password"
                          required
                          minLength="6"
                          showToggle={false}
                          className={meta.touched && meta.error ? 'is-invalid' : ''}
                        />
                      )}
                    </Field>
                    <ErrorMessage name="confirmPassword" component="div" className="error-message inline" />
                  </div>

                  <div className="form-actions">
                    <button type="button" className="btn-secondary" onClick={() => setStep(2)}>
                      Back
                    </button>
                    <button type="submit" disabled={loading || isSubmitting}>
                      {loading || isSubmitting ? 'Resetting...' : 'Reset Password'}
                    </button>
                  </div>
                </Form>
              )}
            </Formik>
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
