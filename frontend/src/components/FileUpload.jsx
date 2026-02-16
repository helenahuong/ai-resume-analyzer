import React, { useState } from 'react';
import { FaCloudUploadAlt, FaFilePdf, FaFileWord, FaTimes } from 'react-icons/fa';

const FileUpload = ({ file, setFile }) => {
  const [dragActive, setDragActive] = useState(false);

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleChange = (e) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  const handleFile = (selectedFile) => {
    const validTypes = [
      'application/pdf',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'application/msword'
    ];

    if (!validTypes.includes(selectedFile.type)) {
      alert('Please upload a PDF or DOCX file');
      return;
    }

    const maxSize = 5 * 1024 * 1024; // 5MB
    if (selectedFile.size > maxSize) {
      alert('File size must be less than 5MB');
      return;
    }

    setFile(selectedFile);
  };

  const removeFile = () => {
    setFile(null);
  };

  const getFileIcon = () => {
    if (!file) return null;
    const extension = file.name.split('.').pop().toLowerCase();
    if (extension === 'pdf') {
      return <FaFilePdf className="w-8 h-8 text-red-500" />;
    } else {
      return <FaFileWord className="w-8 h-8 text-blue-500" />;
    }
  };

  return (
    <div className="mb-6">
      <label className="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-2">
        Upload Resume
      </label>

      {!file ? (
        <div
          className={`relative border-2 border-dashed rounded-lg p-8 text-center transition-all duration-200 ${
            dragActive
              ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20'
              : 'border-gray-300 dark:border-gray-600 hover:border-primary-400 dark:hover:border-primary-500'
          }`}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        >
          <input
            type="file"
            id="file-upload"
            accept=".pdf,.doc,.docx"
            onChange={handleChange}
            className="hidden"
          />

          <FaCloudUploadAlt className="w-16 h-16 mx-auto mb-4 text-gray-400 dark:text-gray-500" />

          <p className="text-lg mb-2 text-gray-700 dark:text-gray-200">
            Drag & drop your resume here
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
            or
          </p>

          <label
            htmlFor="file-upload"
            className="inline-block px-6 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 cursor-pointer transition-colors duration-200"
          >
            Browse Files
          </label>

          <p className="text-xs text-gray-500 dark:text-gray-400 mt-4">
            Supports: PDF, DOC, DOCX (Max 5MB)
          </p>
        </div>
      ) : (
        <div className="border border-gray-300 dark:border-gray-600 rounded-lg p-4 bg-gray-50 dark:bg-gray-700 animate-fade-in">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              {getFileIcon()}
              <div>
                <p className="text-sm font-medium text-gray-800 dark:text-gray-200">
                  {file.name}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  {(file.size / 1024).toFixed(2)} KB
                </p>
              </div>
            </div>

            <button
              onClick={removeFile}
              className="p-2 rounded-lg bg-red-100 dark:bg-red-900/30 hover:bg-red-200 dark:hover:bg-red-900/50 text-red-600 dark:text-red-400 transition-colors duration-200"
              aria-label="Remove file"
            >
              <FaTimes className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default FileUpload;
