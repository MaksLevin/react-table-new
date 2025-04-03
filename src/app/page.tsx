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
  const { settings, setSettings } = useTableSettings();
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
        <div className="w-full h-full">
          <TableSettingsForm
            onSave={handleSaveSettings}
            initialSettings={settings}
          />
        </div>
      ) : (
        <div className="flex flex-col w-full min-h-screen dark:bg-neutral-800">
          <Button
            variant={'secondary'}
            onClick={() => setShowSettings(true)}
            className="self-start mb-4 mt-[1rem] ml-[1rem]"
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
  return <AppContent />;
};

export default App;
