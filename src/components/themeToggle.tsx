'use client';

import { useTheme } from '@/context/themeContext';

export const ThemeToggle = () => {
  const { isDarkMode, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className={`
        px-4 py-2 rounded-lg 
        ${isDarkMode ? 'text-dark-text bg-dark-primary hover:bg-dark-secondary' : 'text-light-text bg-light-primary hover:bg-light-secondary'} 
        transition-colors
      `}
    >
      Switch to {isDarkMode ? 'light' : 'dark'} theme
    </button>
  );
};
