import React from 'react';
import { useForm } from 'react-hook-form';
import { useAuth } from '../contexts/AuthContext';

export default function Register() {
  const { register: r, handleSubmit } = useForm();
  const auth = useAuth();

  const onSubmit = async (data: any) => {
    try {
      await auth.register(data.email, data.password, data.name);
      alert('Registered');
    } catch (err: any) {
      alert(err.response?.data?.message || 'Register failed');
    }
  };

  return (
    <div className="p-4 bg-white dark:bg-gray-800 rounded shadow">
      <h2 className="text-xl font-semibold mb-2">Register</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-2">
        <input className="w-full p-2 border rounded" placeholder="Name" {...r('name')} />
        <input className="w-full p-2 border rounded" placeholder="Email" {...r('email')} />
        <input type="password" className="w-full p-2 border rounded" placeholder="Password" {...r('password')} />
        <button className="px-4 py-2 bg-green-600 text-white rounded">Register</button>
      </form>
    </div>
  );
}
