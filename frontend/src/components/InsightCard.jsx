import React from 'react';
import { FaLightbulb, FaExclamationTriangle } from 'react-icons/fa';

const InsightCard = ({ title, content, type = 'strengths' }) => {
  const isStrengths = type === 'strengths';

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 animate-slide-up">
      <div className="flex items-center space-x-3 mb-4">
        <div className={`p-2 rounded-lg ${
          isStrengths
            ? 'bg-success-500/10 text-success-500'
            : 'bg-warning-500/10 text-warning-500'
        }`}>
          {isStrengths ? (
            <FaLightbulb className="w-5 h-5" />
          ) : (
            <FaExclamationTriangle className="w-5 h-5" />
          )}
        </div>
        <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
          {title}
        </h3>
      </div>

      <div className="prose dark:prose-invert max-w-none">
        <p className="text-gray-700 dark:text-gray-300 whitespace-pre-line leading-relaxed">
          {content || `No ${type} identified.`}
        </p>
      </div>
    </div>
  );
};

export default InsightCard;
