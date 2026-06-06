import React from 'react';

export default function LoadingIndicator() {
  return (
    <div className="min-h-[240px] flex items-center justify-center p-8 text-gray-600 dark:text-gray-300" role="status" aria-live="polite">
      <div className="inline-flex items-center gap-2">
        <div className="h-4 w-4 animate-pulse rounded-full bg-indigo-600 dark:bg-indigo-400" />
        <span>Loading content...</span>
      </div>
    </div>
  );
}
