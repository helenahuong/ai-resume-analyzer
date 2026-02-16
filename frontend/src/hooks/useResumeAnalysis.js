import { useState } from 'react';
import api from '../utils/api';

export const useResumeAnalysis = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [result, setResult] = useState(null);

  const analyzeResume = async (resumeFile, jobDescription) => {
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const formData = new FormData();
      formData.append('resume', resumeFile);
      formData.append('job_description', jobDescription);

      const response = await api.post('/analyze', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      setResult(response.data);
      return response.data;
    } catch (err) {
      const errorMessage = err.response?.data?.detail ||
                          err.message ||
                          'Failed to analyze resume. Please try again.';
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const reset = () => {
    setLoading(false);
    setError(null);
    setResult(null);
  };

  return {
    analyzeResume,
    loading,
    error,
    result,
    reset,
  };
};
