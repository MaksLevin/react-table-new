'use client';

import { useTheme } from '@/context/themeContext';

export const ThemeToggle = () => {
  const { isDarkMode, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className={`
        px-4 py-2 rounded-lg transition-colors font-medium
        ${
          isDarkMode
            ? 'bg-neutral-800 text-textColor-50 hover:bg-neutral-700'
            : 'bg-neutral-100 text-textColor-200 hover:bg-neutral-200'
        }
      `}
    >
      Switch to {isDarkMode ? 'light' : 'dark'} theme
    </button>
  );
};
