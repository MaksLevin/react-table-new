'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context';
import { Button, Input, Typography } from '@/components';

export default function AuthForm() {
  const { user, signIn, signUp } = useAuth();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<'login' | 'register'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (user) {
      router.push('/');
    }
  }, [user, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    try {
      if (activeTab === 'login') {
        await signIn(email, password);
      } else {
        await signUp(email, password);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Authentication failed');
    }
  };

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

        {error && (
          <p className="text-red-500 text-sm text-center mb-4">{error}</p>
        )}

        <form className="space-y-4" onSubmit={handleSubmit}>
          <Input
            id="email"
            type="email"
            onChange={(e) => setEmail(e.target.value)}
            required
            className="dark:inputVariants({ theme: 'dark' })"
          />
          <Input
            id="password"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
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
