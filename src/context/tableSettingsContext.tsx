import React, { createContext, useContext, useState } from 'react';
import { TableSettings, initialValues } from '@/constants/tableSettingsForm';

interface TableSettingsContextProps {
  settings: TableSettings;
  setSettings: React.Dispatch<React.SetStateAction<TableSettings>>;
}

const TableSettingsContext = createContext<
  TableSettingsContextProps | undefined
>(undefined);

export const useTableSettings = () => {
  const context = useContext(TableSettingsContext);
  if (!context) {
    throw new Error(
      'useTableSettings must be used within a TableSettingsProvider'
    );
  }
  return context;
};

interface TableSettingsProviderProps {
  children: React.ReactNode;
}

export const TableSettingsProvider: React.FC<TableSettingsProviderProps> = ({
  children,
}) => {
  const [settings, setSettings] = useState<TableSettings>(initialValues);

  return (
    <TableSettingsContext.Provider value={{ settings, setSettings }}>
      {children}
    </TableSettingsContext.Provider>
  );
};
