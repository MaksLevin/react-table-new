'use client';

import { ThemeProvider } from '@/context/themeContext';
import { AuthProvider } from '@/context/authContext';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <ThemeProvider>{children}</ThemeProvider>
    </AuthProvider>
  );
}
