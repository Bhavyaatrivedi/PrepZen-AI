import React, { useState } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import Landing from './pages/Landing';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import { AuthProvider } from './contexts/AuthContext';

const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
          <Landing />
          <div className="p-4">
            <div className="max-w-4xl mx-auto">
              <Dashboard />
            </div>
          </div>
        </div>
      </AuthProvider>
    </QueryClientProvider>
  );
}
