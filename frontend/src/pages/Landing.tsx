import React from 'react';
import { motion } from 'framer-motion';

export default function Landing() {
  return (
    <div className="container mx-auto p-6">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold mb-4">PrepZen AI</h1>
        <p className="mb-6">AI Mental Wellness Copilot for Competitive Exam Students</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 bg-white dark:bg-gray-800 rounded shadow">Login</div>
          <div className="p-4 bg-white dark:bg-gray-800 rounded shadow">Register</div>
        </div>
      </motion.div>
    </div>
  );
}
