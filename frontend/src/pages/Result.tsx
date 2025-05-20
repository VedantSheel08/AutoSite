import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowDownTrayIcon, ArrowPathIcon } from '@heroicons/react/24/outline';

const Result: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { sitePath } = location.state || {};

  if (!sitePath) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900">No Result Found</h2>
          <p className="mt-2 text-gray-600">
            Please go back and generate your portfolio first.
          </p>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => navigate('/upload')}
            className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
          >
            Go to Upload
          </motion.button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Your Portfolio is Ready!
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              Your professional portfolio website has been generated successfully.
            </p>
          </motion.div>
        </div>

        <div className="mt-12">
          <div className="bg-white shadow-xl rounded-lg overflow-hidden">
            <div className="aspect-w-16 aspect-h-9">
              <iframe
                src={`http://localhost:5000/${sitePath}`}
                className="w-full h-[600px]"
                title="Generated Portfolio"
              />
            </div>
          </div>

          <div className="mt-8 flex justify-center space-x-4">
            <motion.a
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              href={`http://localhost:5000/${sitePath}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
            >
              <ArrowPathIcon className="h-5 w-5 mr-2" />
              View Full Site
            </motion.a>

            <motion.a
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              href={`http://localhost:5000/${sitePath}`}
              download
              className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
            >
              <ArrowDownTrayIcon className="h-5 w-5 mr-2" />
              Download
            </motion.a>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => navigate('/upload')}
              className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
            >
              Create Another
            </motion.button>
          </div>
        </div>

        <div className="mt-12 bg-white shadow rounded-lg p-6">
          <h3 className="text-lg font-medium text-gray-900">What's Next?</h3>
          <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="relative rounded-lg border border-gray-300 bg-white px-6 py-5 shadow-sm flex items-center space-x-3 hover:border-gray-400 focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-primary-500">
              <div className="flex-shrink-0">
                <span className="text-2xl">🎨</span>
              </div>
              <div className="flex-1 min-w-0">
                <a href="#" className="focus:outline-none">
                  <span className="absolute inset-0" aria-hidden="true" />
                  <p className="text-sm font-medium text-gray-900">Customize Your Design</p>
                  <p className="text-sm text-gray-500">Change colors, fonts, and layout</p>
                </a>
              </div>
            </div>

            <div className="relative rounded-lg border border-gray-300 bg-white px-6 py-5 shadow-sm flex items-center space-x-3 hover:border-gray-400 focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-primary-500">
              <div className="flex-shrink-0">
                <span className="text-2xl">🚀</span>
              </div>
              <div className="flex-1 min-w-0">
                <a href="#" className="focus:outline-none">
                  <span className="absolute inset-0" aria-hidden="true" />
                  <p className="text-sm font-medium text-gray-900">Deploy Your Site</p>
                  <p className="text-sm text-gray-500">Get a custom domain and hosting</p>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Result; 