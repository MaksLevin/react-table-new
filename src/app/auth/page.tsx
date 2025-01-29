'use client';

import { useState } from 'react';

export default function AuthPage() {
  const [activeTab, setActiveTab] = useState<'login' | 'register'>('login');

  return (
    <div className="flex items-center justify-center min-h-screen bg-light-background dark:bg-dark-background">
      <div className="w-full max-w-sm p-6 bg-white dark:bg-gray-800 rounded-lg shadow-2xl mt-6">
        <div className="text-center mb-4">
          <h2 className="text-xl font-semibold text-light-text dark:text-dark-text">
            {activeTab === 'login' ? 'Sign in' : 'Sign up'}
          </h2>
        </div>

        <div className="mb-6">
          <div className="flex justify-center w-full rounded-lg bg-gray-200 dark:bg-gray-700 p-1">
            <button
              className={`w-1/2 px-4 py-2 text-center font-medium rounded-lg transition-all duration-200 ease-in-out ${
                activeTab === 'login'
                  ? 'bg-light-primary text-white dark:bg-dark-primary dark:text-white'
                  : 'bg-transparent text-light-text dark:text-dark-text'
              }`}
              onClick={() => setActiveTab('login')}
            >
              Sign in
            </button>
            <button
              className={`w-1/2 px-4 py-2 text-center font-medium rounded-lg transition-all duration-200 ease-in-out ${
                activeTab === 'register'
                  ? 'bg-light-primary text-white dark:bg-dark-primary dark:text-white'
                  : 'bg-transparent text-light-text dark:text-dark-text'
              }`}
              onClick={() => setActiveTab('register')}
            >
              Sign up
            </button>
          </div>
        </div>

        <form className="space-y-4">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-light-text dark:text-dark-text"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              required
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-light-primary focus:border-light-primary dark:bg-gray-700 dark:text-white dark:border-gray-600"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-light-text dark:text-dark-text"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              required
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-light-primary focus:border-light-primary dark:bg-gray-700 dark:text-white dark:border-gray-600"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-light-primary text-white py-2 rounded-lg shadow-md hover:bg-light-secondary focus:ring-2 focus:ring-light-primary dark:bg-dark-primary dark:hover:bg-dark-secondary dark:focus:ring-dark-primary"
          >
            {activeTab === 'login' ? 'Sign in' : 'Sign up'}
          </button>
        </form>
      </div>
    </div>
  );
}
