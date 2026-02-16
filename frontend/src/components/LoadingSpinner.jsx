import React from 'react';
import { FaSpinner } from 'react-icons/fa';

const LoadingSpinner = () => {
  return (
    <div className="flex flex-col items-center justify-center py-16 animate-fade-in">
      <FaSpinner className="w-16 h-16 text-primary-500 animate-spin mb-4" />
      <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-2">
        Analyzing Resume
      </h3>
      <p className="text-gray-600 dark:text-gray-400 text-center max-w-md">
        Our AI is carefully analyzing your resume against the job description.
        This may take a moment...
      </p>

      <div className="mt-8 space-y-3 w-full max-w-md">
        {/* Skeleton loaders */}
        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse w-5/6"></div>
        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse w-4/6"></div>
      </div>
    </div>
  );
};

export default LoadingSpinner;
