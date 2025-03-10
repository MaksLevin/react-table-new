'use client';

import React, { useState } from 'react';
import TableSettingsForm from '@/modules/form/tableSettingsForm';
import Table from '@/modules/table/table';
import {
  TableSettingsProvider,
  useTableSettings,
} from '@/context/tableSettingsContext';
import { Button } from '@/components/button';
import { TableSettings } from '@/constants/tableSettingsForm';

const AppContent: React.FC = () => {
  const [showSettings, setShowSettings] = useState(true);
  const { setSettings } = useTableSettings();

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
    <TableSettingsProvider>
      <AppContent />
    </TableSettingsProvider>
  );
};

export default App;
