import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const features = [
  {
    name: 'AI-Powered Analysis',
    description: 'Our advanced AI analyzes your resume to extract key information and create a professional portfolio.',
    icon: '🤖',
  },
  {
    name: 'Instant Website Generation',
    description: 'Get a beautiful, responsive website in minutes, no coding required.',
    icon: '⚡',
  },
  {
    name: 'Customizable Design',
    description: 'Choose from multiple professional templates and customize to match your style.',
    icon: '🎨',
  },
  {
    name: 'Mobile Responsive',
    description: 'Your portfolio looks great on any device, from desktop to mobile.',
    icon: '📱',
  },
];

const About: React.FC = () => {
  return (
    <div className="bg-white">
      <div className="relative isolate px-6 pt-14 lg:px-8">
        <div className="mx-auto max-w-2xl py-32 sm:py-48 lg:py-56">
          <div className="text-center">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl"
            >
              About AutoSite
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="mt-6 text-lg leading-8 text-gray-600"
            >
              AutoSite is an AI-powered platform that transforms your resume into a professional portfolio website.
              Our mission is to help professionals showcase their skills and experience in a modern, engaging way.
            </motion.p>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:text-center">
          <h2 className="text-base font-semibold leading-7 text-primary-600">How It Works</h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Everything you need to create your portfolio
          </p>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            Our platform combines cutting-edge AI technology with beautiful design to create the perfect portfolio website.
          </p>
        </div>

        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
          <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-4">
            {features.map((feature) => (
              <motion.div
                key={feature.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                className="flex flex-col"
              >
                <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-gray-900">
                  <span className="text-2xl">{feature.icon}</span>
                  {feature.name}
                </dt>
                <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-600">
                  <p className="flex-auto">{feature.description}</p>
                </dd>
              </motion.div>
            ))}
          </dl>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-6 lg:px-8 mt-32">
        <div className="mx-auto max-w-2xl lg:text-center">
          <h2 className="text-base font-semibold leading-7 text-primary-600">Technology Stack</h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Built with modern technologies
          </p>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            AutoSite is built using cutting-edge technologies to ensure the best possible experience.
          </p>
        </div>

        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            <div className="rounded-lg bg-white p-6 shadow-lg">
              <h3 className="text-lg font-semibold text-gray-900">Frontend</h3>
              <ul className="mt-4 space-y-2 text-gray-600">
                <li>• React with TypeScript</li>
                <li>• Tailwind CSS</li>
                <li>• Framer Motion</li>
                <li>• React Router</li>
              </ul>
            </div>
            <div className="rounded-lg bg-white p-6 shadow-lg">
              <h3 className="text-lg font-semibold text-gray-900">Backend</h3>
              <ul className="mt-4 space-y-2 text-gray-600">
                <li>• Flask</li>
                <li>• Python</li>
                <li>• spaCy NLP</li>
                <li>• OpenCV</li>
              </ul>
            </div>
            <div className="rounded-lg bg-white p-6 shadow-lg">
              <h3 className="text-lg font-semibold text-gray-900">AI & Processing</h3>
              <ul className="mt-4 space-y-2 text-gray-600">
                <li>• PDF Processing</li>
                <li>• Image Recognition</li>
                <li>• Text Extraction</li>
                <li>• Template Generation</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-6 lg:px-8 mt-32 mb-32">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Ready to create your portfolio?
          </h2>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            Join thousands of professionals who have already created their portfolio websites with AutoSite.
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Link
              to="/upload"
              className="rounded-md bg-primary-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-primary-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600"
            >
              Get started
            </Link>
            <a
              href="https://github.com/yourusername/autosite"
              className="text-sm font-semibold leading-6 text-gray-900"
            >
              View on GitHub <span aria-hidden="true">→</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About; 