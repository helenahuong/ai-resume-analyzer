import React from 'react';
import ScoreDisplay from './ScoreDisplay';
import KeywordList from './KeywordList';
import InsightCard from './InsightCard';

const AnalysisResults = ({ result }) => {
  if (!result) return null;

  const scorePercentage = result.similarity_score !== null
    ? Math.round(result.similarity_score * 100)
    : 0;

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">
          Analysis Results
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          Here's how your resume matches the job description
        </p>
      </div>

      {/* Score Display */}
      <div className="flex justify-center">
        <ScoreDisplay score={scorePercentage} />
      </div>

      {/* Keywords */}
      <KeywordList
        matchingKeywords={result.matching_keywords || []}
        missingKeywords={result.missing_keywords || []}
      />

      {/* Insights Grid */}
      <div className="grid md:grid-cols-2 gap-6">
        <InsightCard
          title="Strengths"
          content={result.strengths}
          type="strengths"
        />
        <InsightCard
          title="Areas for Improvement"
          content={result.weaknesses}
          type="weaknesses"
        />
      </div>

      {/* Action Button */}
      <div className="flex justify-center pt-6">
        <button
          onClick={() => window.location.reload()}
          className="px-8 py-3 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors duration-200 font-semibold shadow-md hover:shadow-lg"
        >
          Analyze Another Resume
        </button>
      </div>
    </div>
  );
};

export default AnalysisResults;
