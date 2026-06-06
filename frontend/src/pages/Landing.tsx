import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

export default function Landing() {
  return (
    <main id="main-content" className="container mx-auto p-6">
      <motion.section initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="max-w-4xl mx-auto">
        <header className="mb-8">
          <p className="text-sm uppercase tracking-[0.3em] text-indigo-600">Student wellness</p>
          <h1 className="text-4xl font-bold mt-3 text-gray-900 dark:text-gray-100">PrepZen AI</h1>
          <p className="mt-4 text-lg text-gray-700 dark:text-gray-300">
            Personalized mental wellness and exam readiness support for students preparing for competitive exams and board assessments.
          </p>
        </header>

        <div className="grid gap-4 md:grid-cols-2">
          <article className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow-sm">
            <h2 className="text-2xl font-semibold mb-3">Why PrepZen?</h2>
            <ul className="space-y-2 text-gray-700 dark:text-gray-300">
              <li>• Track mood, sleep, stress, and study habits.</li>
              <li>• Identify study triggers and exam anxiety drivers.</li>
              <li>• Receive AI-powered reflections and recovery suggestions.</li>
              <li>• Build resilience for mock tests, results, and last-minute pressure.</li>
            </ul>
          </article>

          <aside className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow-sm">
            <h2 className="text-2xl font-semibold mb-3">Get started</h2>
            <p className="text-gray-700 dark:text-gray-300 mb-4">Use PrepZen to build a daily wellness practice around your exam prep journey.</p>
            <div className="space-y-3">
              <Link to="/register" className="block w-full text-center px-4 py-3 bg-indigo-600 text-white rounded focus:outline-none focus:ring-2 focus:ring-indigo-500">
                Create account
              </Link>
              <Link to="/login" className="block w-full text-center px-4 py-3 border border-gray-300 rounded text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500">
                Sign in
              </Link>
            </div>
          </aside>
        </div>
      </motion.section>
    </main>
  );
}
