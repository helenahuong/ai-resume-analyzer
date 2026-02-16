import React, { useState, useEffect } from 'react';
import { Toaster, toast } from 'react-hot-toast';
import Header from './components/Header';
import FileUpload from './components/FileUpload';
import JobDescriptionInput from './components/JobDescriptionInput';
import LoadingSpinner from './components/LoadingSpinner';
import AnalysisResults from './components/AnalysisResults';
import { useResumeAnalysis } from './hooks/useResumeAnalysis';

const App = () => {
  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem('darkMode');
    return saved === 'true';
  });
  const [file, setFile] = useState(null);
  const [jobDescription, setJobDescription] = useState('');
  const { analyzeResume, loading, error, result, reset } = useResumeAnalysis();

  // Apply dark mode class to document root
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('darkMode', darkMode);
  }, [darkMode]);

  // Show error toast when error occurs
  useEffect(() => {
    if (error) {
      toast.error(error, {
        duration: 5000,
        position: 'top-center',
      });
    }
  }, [error]);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!file) {
      toast.error('Please upload a resume');
      return;
    }

    if (!jobDescription.trim()) {
      toast.error('Please enter a job description');
      return;
    }

    try {
      await analyzeResume(file, jobDescription);
      toast.success('Analysis complete!');
    } catch (err) {
      // Error is already handled by useResumeAnalysis hook
      console.error('Analysis failed:', err);
    }
  };

  const handleReset = () => {
    setFile(null);
    setJobDescription('');
    reset();
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      <Toaster />

      <Header darkMode={darkMode} toggleDarkMode={toggleDarkMode} />

      <main className="container mx-auto px-4 py-8 max-w-6xl">
        {!result && !loading && (
          <div className="animate-fade-in">
            {/* Hero Section */}
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-800 dark:text-white mb-4">
                Optimize Your Resume with AI
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                Get instant insights on how well your resume matches a job description.
                Powered by advanced AI technology.
              </p>
            </div>

            {/* Form */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 max-w-3xl mx-auto">
              <form onSubmit={handleSubmit}>
                <FileUpload file={file} setFile={setFile} />

                <JobDescriptionInput
                  value={jobDescription}
                  onChange={(e) => setJobDescription(e.target.value)}
                />

                <div className="flex gap-4">
                  <button
                    type="submit"
                    disabled={loading || !file || !jobDescription.trim()}
                    className="flex-1 px-8 py-4 bg-primary-500 text-white rounded-lg
                             hover:bg-primary-600 disabled:bg-gray-300 dark:disabled:bg-gray-600
                             disabled:cursor-not-allowed transition-colors duration-200
                             font-semibold text-lg shadow-md hover:shadow-lg
                             transform hover:scale-[1.02] active:scale-[0.98]"
                  >
                    {loading ? 'Analyzing...' : 'Analyze Resume'}
                  </button>

                  {(file || jobDescription) && (
                    <button
                      type="button"
                      onClick={handleReset}
                      className="px-6 py-4 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200
                               rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600
                               transition-colors duration-200 font-semibold"
                    >
                      Reset
                    </button>
                  )}
                </div>
              </form>

              {/* Features */}
              <div className="grid md:grid-cols-3 gap-4 mt-8 pt-8 border-t border-gray-200 dark:border-gray-700">
                <div className="text-center">
                  <div className="text-3xl mb-2">🎯</div>
                  <h4 className="font-semibold text-gray-800 dark:text-gray-200 mb-1">
                    Keyword Matching
                  </h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Find what's missing
                  </p>
                </div>
                <div className="text-center">
                  <div className="text-3xl mb-2">💡</div>
                  <h4 className="font-semibold text-gray-800 dark:text-gray-200 mb-1">
                    AI Insights
                  </h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Strengths & weaknesses
                  </p>
                </div>
                <div className="text-center">
                  <div className="text-3xl mb-2">📊</div>
                  <h4 className="font-semibold text-gray-800 dark:text-gray-200 mb-1">
                    Match Score
                  </h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Instant feedback
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {loading && <LoadingSpinner />}

        {result && !loading && <AnalysisResults result={result} />}
      </main>

      {/* Footer */}
      <footer className="mt-16 py-8 text-center text-gray-600 dark:text-gray-400 text-sm">
        <p>Powered by OpenAI GPT & Advanced NLP Technology</p>
      </footer>
    </div>
  );
};

export default App;
