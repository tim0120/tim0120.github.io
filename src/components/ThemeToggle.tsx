'use client'

import { useTheme } from '@/context/ThemeContext';

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  const getThemeIcon = () => {
    switch (theme) {
      case 'light':
        return '🌞';
      case 'dark':
        return '🌜';
      case 'system':
        return '💻';
    }
  };

  const getThemeDescription = () => {
    switch (theme) {
      case 'light':
        return 'Light mode';
      case 'dark':
        return 'Dark mode';
      case 'system':
        return 'System theme';
    }
  };

  return (
    <button
      onClick={toggleTheme}
      className="text-xl"
      aria-label="Switch theme"
      title={getThemeDescription()}
    >
      {getThemeIcon()}
    </button>
  );
}