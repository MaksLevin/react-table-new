'use client';

import { ThemeProvider } from '@/context/themeContext';
import { AuthProvider } from '@/context/authContext';
import { TableSettingsProvider } from '@/context/tableSettingsContext';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <TableSettingsProvider>
        <ThemeProvider>{children}</ThemeProvider>
      </TableSettingsProvider>
    </AuthProvider>
  );
}
