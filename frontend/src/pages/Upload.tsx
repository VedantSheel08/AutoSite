import React, { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDropzone } from 'react-dropzone';
import { motion } from 'framer-motion';
import axios from 'axios';

const Upload: React.FC = () => {
  const navigate = useNavigate();
  const [resume, setResume] = useState<File | null>(null);
  const [headshot, setHeadshot] = useState<File | null>(null);
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const onDropResume = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (file) {
      setResume(file);
      setError('');
    }
  }, []);

  const onDropHeadshot = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (file) {
      setHeadshot(file);
      setError('');
    }
  }, []);

  const { getRootProps: getResumeRootProps, getInputProps: getResumeInputProps, isDragActive: isResumeDragActive } = useDropzone({
    onDrop: onDropResume,
    accept: {
      'application/pdf': ['.pdf'],
      'image/*': ['.png', '.jpg', '.jpeg']
    },
    maxFiles: 1
  });

  const { getRootProps: getHeadshotRootProps, getInputProps: getHeadshotInputProps, isDragActive: isHeadshotDragActive } = useDropzone({
    onDrop: onDropHeadshot,
    accept: {
      'image/*': ['.png', '.jpg', '.jpeg']
    },
    maxFiles: 1
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!resume) {
      setError('Please upload your resume');
      return;
    }

    setLoading(true);
    setError('');

    const formData = new FormData();
    formData.append('resume', resume);
    if (headshot) {
      formData.append('headshot', headshot);
    }
    formData.append('name', name);

    try {
      const response = await axios.post('http://localhost:5000/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.data.success) {
        navigate('/result', { state: { sitePath: response.data.site_path } });
      } else {
        setError(response.data.error || 'Something went wrong');
      }
    } catch (err) {
      setError('Failed to upload files. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Create Your Portfolio
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            Upload your resume and optional headshot to generate your professional portfolio website.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="mt-12 space-y-8">
          <div>
            <label className="block text-sm font-medium text-gray-700">Your Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
              placeholder="Enter your full name"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Resume (PDF or Image)</label>
            <div
              {...getResumeRootProps()}
              className={`mt-1 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10 ${
                isResumeDragActive ? 'border-primary-500 bg-primary-50' : ''
              }`}
            >
              <div className="text-center">
                <input {...getResumeInputProps()} />
                <div className="mt-4 flex text-sm leading-6 text-gray-600">
                  <span className="relative cursor-pointer rounded-md bg-white font-semibold text-primary-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-primary-600 focus-within:ring-offset-2 hover:text-primary-500">
                    {resume ? resume.name : 'Upload a file'}
                  </span>
                  <p className="pl-1">or drag and drop</p>
                </div>
                <p className="text-xs leading-5 text-gray-600">PDF, PNG, JPG up to 10MB</p>
              </div>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Headshot (Optional)</label>
            <div
              {...getHeadshotRootProps()}
              className={`mt-1 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10 ${
                isHeadshotDragActive ? 'border-primary-500 bg-primary-50' : ''
              }`}
            >
              <div className="text-center">
                <input {...getHeadshotInputProps()} />
                <div className="mt-4 flex text-sm leading-6 text-gray-600">
                  <span className="relative cursor-pointer rounded-md bg-white font-semibold text-primary-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-primary-600 focus-within:ring-offset-2 hover:text-primary-500">
                    {headshot ? headshot.name : 'Upload a file'}
                  </span>
                  <p className="pl-1">or drag and drop</p>
                </div>
                <p className="text-xs leading-5 text-gray-600">PNG, JPG up to 10MB</p>
              </div>
            </div>
          </div>

          {error && (
            <div className="rounded-md bg-red-50 p-4">
              <div className="flex">
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-red-800">{error}</h3>
                </div>
              </div>
            </div>
          )}

          <div className="flex justify-center">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={loading}
              className={`rounded-md bg-primary-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-primary-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600 ${
                loading ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              {loading ? 'Generating...' : 'Generate Portfolio'}
            </motion.button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Upload; 