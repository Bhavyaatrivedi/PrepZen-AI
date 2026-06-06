import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

interface LoginFormValues {
  email: string;
  password: string;
}

export default function Login() {
  const { register, handleSubmit, formState: { errors } } = useForm<LoginFormValues>();
  const auth = useAuth();
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState('');

  const onSubmit = async (data: LoginFormValues) => {
    try {
      await auth.login(data.email, data.password);
      navigate('/dashboard');
    } catch (err: any) {
      setErrorMessage(err.response?.data?.message || 'Login failed. Please check your credentials.');
    }
  };

  return (
    <main className="p-6 mx-auto max-w-md">
      <section className="p-6 bg-white dark:bg-gray-800 rounded shadow" aria-labelledby="login-heading">
        <h2 id="login-heading" className="text-2xl font-semibold mb-4">Student Login</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
          <label className="block">
            <span className="text-sm font-medium">Email</span>
            <input
              type="email"
              autoComplete="email"
              className="mt-1 w-full p-2 border rounded"
              {...register('email', { required: 'Enter your email' })}
            />
            {errors.email && <span className="text-sm text-red-600">{errors.email.message}</span>}
          </label>

          <label className="block">
            <span className="text-sm font-medium">Password</span>
            <input
              type="password"
              autoComplete="current-password"
              className="mt-1 w-full p-2 border rounded"
              {...register('password', { required: 'Enter your password' })}
            />
            {errors.password && <span className="text-sm text-red-600">{errors.password.message}</span>}
          </label>

          {errorMessage && <div className="text-sm text-red-600" role="alert">{errorMessage}</div>}

          <button type="submit" className="w-full px-4 py-2 bg-blue-600 text-white rounded focus:outline-none focus:ring-2 focus:ring-blue-500">
            Log in
          </button>
        </form>
        <p className="mt-4 text-sm">
          New to PrepZen? <Link to="/register" className="text-indigo-600">Create an account</Link>
        </p>
      </section>
    </main>
  );
}
