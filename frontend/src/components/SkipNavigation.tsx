import React from 'react';

export default function SkipNavigation() {
  return (
    <div className="sr-only focus-within:not-sr-only">
      <a href="#main-content" className="inline-block p-3 bg-indigo-600 text-white rounded shadow-lg focus:outline-none focus:ring-2 focus:ring-indigo-500">
        Skip to main content
      </a>
    </div>
  );
}
