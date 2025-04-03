'use client';

import { useTheme } from '@/context/themeContext';
import { Button } from '@/components/button';

export const ThemeToggle = () => {
  const { isDarkMode, toggleTheme } = useTheme();

  return (
    <Button variant="secondary" onClick={toggleTheme}>
      Switch to {isDarkMode ? 'light' : 'dark'} theme
    </Button>
  );
};
