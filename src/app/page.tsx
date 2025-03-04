'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

import { useAuth } from '@/context';

import TableSettingsForm from '@/modules/form/tableSettingsForm';

export default function Page() {
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push('/auth');
    }
  }, [user, router]);

  return <TableSettingsForm />;
}
