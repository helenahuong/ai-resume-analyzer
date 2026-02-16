import React from 'react';
import { FaCheck, FaTimes } from 'react-icons/fa';

const KeywordList = ({ matchingKeywords, missingKeywords }) => {
  const KeywordChip = ({ keyword, isMatching }) => (
    <div
      className={`inline-flex items-center space-x-2 px-3 py-1.5 rounded-full text-sm font-medium transition-all duration-200 ${
        isMatching
          ? 'bg-success-500/10 text-success-500 border border-success-500/20'
          : 'bg-danger-500/10 text-danger-500 border border-danger-500/20'
      }`}
    >
      {isMatching ? (
        <FaCheck className="w-3 h-3" />
      ) : (
        <FaTimes className="w-3 h-3" />
      )}
      <span>{keyword}</span>
    </div>
  );

  return (
    <div className="space-y-6 animate-slide-up">
      {/* Matching Keywords */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
            Matching Keywords
          </h3>
          <span className="px-3 py-1 bg-success-500/10 text-success-500 rounded-full text-sm font-semibold">
            {matchingKeywords.length}
          </span>
        </div>

        {matchingKeywords.length > 0 ? (
          <div className="flex flex-wrap gap-2">
            {matchingKeywords.map((keyword, index) => (
              <KeywordChip key={index} keyword={keyword} isMatching={true} />
            ))}
          </div>
        ) : (
          <p className="text-gray-500 dark:text-gray-400 text-sm italic">
            No matching keywords found
          </p>
        )}
      </div>

      {/* Missing Keywords */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
            Missing Keywords
          </h3>
          <span className="px-3 py-1 bg-danger-500/10 text-danger-500 rounded-full text-sm font-semibold">
            {missingKeywords.length}
          </span>
        </div>

        {missingKeywords.length > 0 ? (
          <div className="flex flex-wrap gap-2">
            {missingKeywords.map((keyword, index) => (
              <KeywordChip key={index} keyword={keyword} isMatching={false} />
            ))}
          </div>
        ) : (
          <p className="text-gray-500 dark:text-gray-400 text-sm italic">
            No missing keywords - Great job!
          </p>
        )}

        {missingKeywords.length > 0 && (
          <p className="mt-4 text-sm text-gray-600 dark:text-gray-400">
            💡 Consider adding these keywords to your resume to improve your match score.
          </p>
        )}
      </div>
    </div>
  );
};

export default KeywordList;
