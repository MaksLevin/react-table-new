'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

import { Button } from '@/components/button';
import { Table } from '@/modules/table/table';
import { TableSettingsForm } from '@/modules/form/tableSettingsForm';

import {
  TableSettingsProvider,
  useTableSettings,
} from '@/context/tableSettingsContext';
import { AuthProvider, useAuth } from '@/context/authContext';

import { TableSettings } from '@/constants/tableSettingsForm';

const AppContent: React.FC = () => {
  const [showSettings, setShowSettings] = useState(true);
  const { setSettings } = useTableSettings();
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push('/auth');
    }
  }, [user, router]);

  const handleSaveSettings = (newSettings: TableSettings) => {
    setSettings(newSettings);
    setShowSettings(false);
  };

  return (
    <div className="flex flex-col items-center">
      {showSettings ? (
        <div className="w-full max-w-lg">
          <TableSettingsForm onSave={handleSaveSettings} />
        </div>
      ) : (
        <div className="w-full">
          <Button
            variant={'secondary'}
            onClick={() => setShowSettings(true)}
            className="mb-4"
          >
            Show Settings
          </Button>
          <Table />
        </div>
      )}
    </div>
  );
};

const App: React.FC = () => {
  return (
    <AuthProvider>
      <TableSettingsProvider>
        <AppContent />
      </TableSettingsProvider>
    </AuthProvider>
  );
};

export default App;
