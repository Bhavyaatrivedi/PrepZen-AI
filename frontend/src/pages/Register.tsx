import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

interface RegisterFormValues {
  name: string;
  email: string;
  password: string;
}

export default function Register() {
  const { register, handleSubmit, formState: { errors } } = useForm<RegisterFormValues>();
  const auth = useAuth();
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState('');

  const onSubmit = async (data: RegisterFormValues) => {
    try {
      await auth.register(data.email, data.password, data.name);
      navigate('/dashboard');
    } catch (err: any) {
      setErrorMessage(err.response?.data?.message || 'Registration failed. Please try again.');
    }
  };

  return (
    <main className="p-6 mx-auto max-w-md">
      <section className="p-6 bg-white dark:bg-gray-800 rounded shadow" aria-labelledby="register-heading">
        <h2 id="register-heading" className="text-2xl font-semibold mb-4">Create your PrepZen account</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
          <label className="block">
            <span className="text-sm font-medium">Full name</span>
            <input
              type="text"
              className="mt-1 w-full p-2 border rounded"
              {...register('name', { required: 'Please enter your name' })}
            />
            {errors.name && <span className="text-sm text-red-600">{errors.name.message}</span>}
          </label>

          <label className="block">
            <span className="text-sm font-medium">Email</span>
            <input
              type="email"
              className="mt-1 w-full p-2 border rounded"
              {...register('email', { required: 'Please enter your email' })}
            />
            {errors.email && <span className="text-sm text-red-600">{errors.email.message}</span>}
          </label>

          <label className="block">
            <span className="text-sm font-medium">Password</span>
            <input
              type="password"
              className="mt-1 w-full p-2 border rounded"
              {...register('password', { required: 'Password is required', minLength: { value: 8, message: 'Use at least 8 characters' } })}
            />
            {errors.password && <span className="text-sm text-red-600">{errors.password.message}</span>}
          </label>

          {errorMessage && <div className="text-sm text-red-600" role="alert">{errorMessage}</div>}

          <button type="submit" className="w-full px-4 py-2 bg-green-600 text-white rounded focus:outline-none focus:ring-2 focus:ring-green-500">
            Register
          </button>
        </form>
        <p className="mt-4 text-sm">
          Already have an account? <Link to="/login" className="text-indigo-600">Sign in</Link>
        </p>
      </section>
    </main>
  );
}
