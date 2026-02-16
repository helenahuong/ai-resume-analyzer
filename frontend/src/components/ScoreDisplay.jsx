import React, { useEffect, useState } from 'react';

const ScoreDisplay = ({ score }) => {
  const [animatedScore, setAnimatedScore] = useState(0);

  useEffect(() => {
    // Animate score counting up
    let currentScore = 0;
    const increment = score / 50; // Reach target in ~50 steps
    const timer = setInterval(() => {
      currentScore += increment;
      if (currentScore >= score) {
        setAnimatedScore(score);
        clearInterval(timer);
      } else {
        setAnimatedScore(Math.floor(currentScore));
      }
    }, 20);

    return () => clearInterval(timer);
  }, [score]);

  const percentage = score * 100; // Convert 0-1 to 0-100
  const radius = 60;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (percentage / 100) * circumference;

  const getColor = () => {
    if (percentage >= 75) return '#22c55e'; // green
    if (percentage >= 50) return '#eab308'; // yellow
    return '#ef4444'; // red
  };

  const getLabel = () => {
    if (percentage >= 75) return 'Excellent Match';
    if (percentage >= 50) return 'Good Match';
    return 'Needs Improvement';
  };

  return (
    <div className="flex flex-col items-center p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md animate-fade-in">
      <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4">
        Similarity Score
      </h3>

      <div className="relative w-40 h-40 mb-4">
        <svg className="transform -rotate-90" width="160" height="160">
          {/* Background circle */}
          <circle
            cx="80"
            cy="80"
            r={radius}
            stroke="#e5e7eb"
            strokeWidth="12"
            fill="none"
            className="dark:stroke-gray-700"
          />
          {/* Progress circle */}
          <circle
            cx="80"
            cy="80"
            r={radius}
            stroke={getColor()}
            strokeWidth="12"
            fill="none"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            strokeLinecap="round"
            className="transition-all duration-1000 ease-out"
          />
        </svg>

        {/* Score text */}
        <div className="absolute inset-0 flex items-center justify-center flex-col">
          <span className="text-4xl font-bold text-gray-800 dark:text-gray-200">
            {animatedScore}%
          </span>
          <span className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            Match
          </span>
        </div>
      </div>

      <div className={`px-4 py-2 rounded-full text-sm font-semibold ${
        percentage >= 75
          ? 'bg-success-500/10 text-success-500'
          : percentage >= 50
          ? 'bg-warning-500/10 text-warning-500'
          : 'bg-danger-500/10 text-danger-500'
      }`}>
        {getLabel()}
      </div>
    </div>
  );
};

export default ScoreDisplay;
