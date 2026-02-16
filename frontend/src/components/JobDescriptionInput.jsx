import React from 'react';

const JobDescriptionInput = ({ value, onChange }) => {
  const characterCount = value.length;
  const maxChars = 5000;

  return (
    <div className="mb-6">
      <label className="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-2">
        Job Description
      </label>

      <textarea
        value={value}
        onChange={onChange}
        rows={6}
        maxLength={maxChars}
        placeholder="Paste the job description here..."
        className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg
                   bg-white dark:bg-gray-700
                   text-gray-800 dark:text-gray-200
                   placeholder-gray-400 dark:placeholder-gray-500
                   focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent
                   transition-colors duration-200
                   resize-none"
        required
      />

      <div className="flex justify-between items-center mt-2">
        <p className="text-xs text-gray-500 dark:text-gray-400">
          Describe the role, required skills, qualifications, and responsibilities
        </p>
        <p className={`text-xs ${characterCount > maxChars * 0.9 ? 'text-warning-500' : 'text-gray-500 dark:text-gray-400'}`}>
          {characterCount} / {maxChars}
        </p>
      </div>
    </div>
  );
};

export default JobDescriptionInput;
