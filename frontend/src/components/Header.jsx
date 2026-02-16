import React from 'react';
import { FaMoon, FaSun } from 'react-icons/fa';

const Header = ({ darkMode, toggleDarkMode }) => {
  return (
    <header className="bg-white dark:bg-gray-800 shadow-md transition-colors duration-300">
      <div className="container mx-auto px-4 py-6 flex justify-between items-center">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-primary-500 rounded-lg flex items-center justify-center">
            <span className="text-white text-xl font-bold">AI</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-white">
            Resume Analyzer
          </h1>
        </div>

        <button
          onClick={toggleDarkMode}
          className="p-3 rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors duration-200"
          aria-label="Toggle dark mode"
        >
          {darkMode ? (
            <FaSun className="w-5 h-5 text-yellow-400" />
          ) : (
            <FaMoon className="w-5 h-5 text-gray-600" />
          )}
        </button>
      </div>
    </header>
  );
};

export default Header;
