'use client';

import { useState } from 'react';
import Button from '@/components/button';
import Input from '@/components/input';
import { Typography } from '@/components/typography';

export default function AuthPage() {
  const [activeTab, setActiveTab] = useState<'login' | 'register'>('login');

  return (
    <div className="flex items-center justify-center min-h-screen bg-brand-lightGray dark:bg-neutral-900">
      <div className="w-full max-w-sm p-6 bg-brand-white dark:bg-neutral-800 rounded-2xl shadow-2xl mt-6">
        <div className="text-center mb-4">
          <Typography variant="standard" size="h1">
            {activeTab === 'login' ? 'Sign in' : 'Sign up'}
          </Typography>
        </div>

        <div className="mb-6">
          <div className="flex justify-center w-full rounded-lg bg-neutral-200 dark:bg-neutral-700 p-1">
            <Button
              onClick={() => setActiveTab('login')}
              variant={activeTab === 'login' ? 'primary' : 'text'}
              className="w-1/2"
            >
              Sign in
            </Button>
            <Button
              onClick={() => setActiveTab('register')}
              variant={activeTab === 'register' ? 'primary' : 'text'}
              className="w-1/2"
            >
              Sign up
            </Button>
          </div>
        </div>

        <form className="space-y-4">
          <Input
            id="email"
            type="email"
            required
            className="dark:inputVariants({ theme: 'dark' })"
          />
          <Input
            id="password"
            type="password"
            required
            className="dark:inputVariants({ theme: 'dark' })"
          />

          <Button type="submit" className="w-full">
            {activeTab === 'login' ? 'Sign in' : 'Sign up'}
          </Button>
        </form>
      </div>
    </div>
  );
}
