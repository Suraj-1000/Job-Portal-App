import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useAuth } from '../../../context/AuthContext.jsx';
import { useForm, Controller } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';
import Joi from 'joi';
import FormInput from '../../../components/FormInput/FormInput.jsx';
import PasswordInput from '../../../components/PasswordInput/PasswordInput.jsx';
import '../../../css/user_authentication/auth.css';

const Login = () => {
  const [serverError, setServerError] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth();

  const loginSchema = Joi.object({
    email: Joi.string().email({ tlds: { allow: false } }).required().label('Email'),
    password: Joi.string().min(6).required().label('Password'),
  });

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: joiResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (values) => {
    setServerError('');

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
      setServerError(err.message);
      toast.error(err.message);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>Login</h2>
        {serverError && <div className="error-message">{serverError}</div>}

        <form onSubmit={handleSubmit(onSubmit)}>
          <FormInput
            label="Email"
            type="email"
            placeholder="Enter your email address"
            error={errors.email}
            {...register('email')}
          />

          <div className="form-group">
            <label>Password</label>
            <Controller
              name="password"
              control={control}
              render={({ field }) => (
                <PasswordInput
                  {...field}
                  placeholder="Enter your password (e.g., MyP@ssw0rd123)"
                  required
                  showToggle={false}
                  className={errors.password ? 'is-invalid' : ''}
                />
              )}
            />
            {errors.password && (
              <div className="error-message inline">{errors.password.message}</div>
            )}
          </div>

          <button type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Logging in...' : 'Login'}
          </button>
        </form>

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

