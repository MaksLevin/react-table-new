'use client';

import { useState } from 'react';
import Button from '@/components/button';
import Input from '@/components/input';

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
            <Button
              onClick={() => setActiveTab('login')}
              className={`w-1/2 px-4 py-2 text-center font-medium rounded-lg transition-all duration-200 ease-in-out ${
                activeTab === 'login'
                  ? 'bg-light-primary text-white dark:bg-dark-primary'
                  : 'bg-transparent text-light-text dark:text-dark-text'
              }`}
            >
              Sign in
            </Button>
            <Button
              onClick={() => setActiveTab('register')}
              className={`w-1/2 px-4 py-2 text-center font-medium rounded-lg transition-all duration-200 ease-in-out ${
                activeTab === 'register'
                  ? 'bg-light-primary text-white dark:bg-dark-primary'
                  : 'bg-transparent text-light-text dark:text-dark-text'
              }`}
            >
              Sign up
            </Button>
          </div>
        </div>

        <form className="space-y-4">
          <Input id="email" type="email" required />
          <Input id="password" type="password" required />

          <Button
            type="submit"
            className="w-full bg-light-primary text-white hover:bg-light-secondary dark:bg-dark-primary dark:hover:bg-dark-secondary"
          >
            {activeTab === 'login' ? 'Sign in' : 'Sign up'}
          </Button>
        </form>
      </div>
    </div>
  );
}
