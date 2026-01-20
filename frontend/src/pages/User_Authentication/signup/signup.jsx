import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import Joi from 'joi';
import { joiValidator } from '../../../utils/joiValidator';
import InputField from '../../../components/InputField/InputField.jsx';
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
  const [error, setError] = useState('');
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

  const handleSendOTP = async (values, { setSubmitting }) => {
    setFormData((prev) => ({ ...prev, ...values }));
    setSendingOtp(true);
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
      setError(err.message);
    } finally {
      setSendingOtp(false);
      setSubmitting(false);
    }
  };

  const handleVerifyOTP = async (values, { setSubmitting }) => {
    setFormData((prev) => ({ ...prev, otp: values.otp }));
    setLoading(true);
    setError('');

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
      setError(err.message || 'An error occurred during signup');
      toast.error(err.message || 'An error occurred during signup');
    } finally {
      setLoading(false);
      setSubmitting(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>Sign Up</h2>
        {error && <div className="error-message">{error}</div>}

        {step === 1 && (
          <>
            <p className="forgot-password-text">Enter your details to create an account. We'll send you an OTP to verify your email.</p>
            <Formik
              enableReinitialize
              initialValues={{
                firstName: formData.firstName,
                lastName: formData.lastName,
                email: formData.email,
                password: formData.password,
              }}
              validate={joiValidator(detailsSchema)}
              onSubmit={handleSendOTP}
            >
              {({ isSubmitting, handleChange }) => (
                <Form>
                  <div className="form-row">
                    <InputField
                      label="First Name"
                      name="firstName"
                      type="text"
                      placeholder="First Name"
                      onChange={(e) => { handleChange(e); setError(''); }}
                    />

                    <InputField
                      label="Last Name"
                      name="lastName"
                      type="text"
                      placeholder="Last Name"
                      onChange={(e) => { handleChange(e); setError(''); }}
                    />
                  </div>

                  <div className="form-row">
                    <InputField
                      label="Email"
                      name="email"
                      type="email"
                      placeholder="Email Address"
                      onChange={(e) => { handleChange(e); setError(''); }}
                    />

                    <div className="form-group" style={{ marginBottom: 0 }}>
                      <label>Password</label>
                      <Field name="password">
                        {({ field, meta }) => (
                          <PasswordInput
                            {...field}
                            value={field.value}
                            onChange={(e) => { field.onChange(e); setError(''); }}
                            placeholder="Password"
                            required
                            minLength="6"
                            showToggle={false}
                            className={meta.touched && meta.error ? 'is-invalid' : ''}
                          />
                        )}
                      </Field>
                      <ErrorMessage name="password" component="div" className="error-message inline" />
                    </div>
                  </div>
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
            <p className="forgot-password-text">Enter the 6-digit OTP sent to your email to complete registration.</p>
            <Formik
              enableReinitialize
              initialValues={{ otp: formData.otp }}
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
                  <small className="otp-hint" style={{ display: 'block', marginTop: '-15px', marginBottom: '20px' }}>Check your email ({formData.email}) for the OTP code.</small>

                  <div className="form-actions">
                    <button type="button" className="btn-secondary" onClick={() => {
                      setStep(1);
                      setFormData({ ...formData, otp: '' });
                    }}>
                      Back
                    </button>
                    <button type="submit" disabled={loading || isSubmitting}>
                      {loading || isSubmitting ? 'Verifying...' : 'Verify & Sign Up'}
                    </button>
                  </div>
                </Form>
              )}
            </Formik>
            <button
              type="button"
              className="btn-resend-otp"
              onClick={() => handleSendOTP(formData, { setSubmitting: () => { } })}
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

