import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useAuth } from '../../../context/AuthContext.jsx';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import Joi from 'joi';
import { joiValidator } from '../../../utils/joiValidator';
import InputField from '../../../components/InputField/InputField.jsx';
import PasswordInput from '../../../components/PasswordInput/PasswordInput.jsx';
import '../../../css/user_authentication/auth.css';

const Login = () => {
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth();

  const loginSchema = Joi.object({
    email: Joi.string().email({ tlds: { allow: false } }).required().label('Email'),
    password: Joi.string().min(6).required().label('Password'),
  });

  const handleSubmit = async (values, { setSubmitting }) => {
    setError('');

    try {
      const response = await fetch('http://localhost:5000/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: values.email, password: values.password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Login failed');
      }

      // Save token and update state
      login(data.user, data.token);

      toast.success('Login successful!');

      // Redirect based on role
      const role = data.user.role;
      if (role === 'admin' || role === 'superadmin') {
        navigate('/admin/dashboard');
      } else if (role === 'staff') {
        navigate('/staff/dashboard');
      } else {
        navigate('/user/home');
      }
    } catch (err) {
      setError(err.message);
      toast.error(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>Login</h2>
        {error && <div className="error-message">{error}</div>}
        <Formik
          initialValues={{ email: '', password: '' }}
          validate={joiValidator(loginSchema)}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form>
              <InputField
                label="Email"
                name="email"
                type="email"
                placeholder="Enter your email address"
              />

              <div className="form-group">
                <label>Password</label>
                <Field name="password">
                  {({ field, meta }) => (
                    <>
                      <PasswordInput
                        {...field}
                        value={field.value}
                        onChange={field.onChange}
                        placeholder="Enter your password (e.g., MyP@ssw0rd123)"
                        required
                        showToggle={false}
                        className={meta.touched && meta.error ? 'is-invalid' : ''}
                      />
                    </>
                  )}
                </Field>
                <ErrorMessage name="password" component="div" className="error-message inline" />
              </div>
              <button type="submit" disabled={isSubmitting}>
                {isSubmitting ? 'Logging in...' : 'Login'}
              </button>
            </Form>
          )}
        </Formik>
        <div className="auth-links">
          <p className="auth-link">
            Don't have an account? <Link to="/signup">Sign up</Link>
          </p>
          <p className="auth-link">
            <Link to="/forgot-password">Forgot Password?</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;

