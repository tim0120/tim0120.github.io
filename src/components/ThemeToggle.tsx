'use client'

import { useTheme } from '@/context/ThemeContext';

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="transition-colors"
      aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} theme`}
    >
      {theme === 'light' ? '🌚' : '🌞'}
      {/* Alternative: use text instead of emoji */}
      {/* {theme === 'light' ? 'Dark' : 'Light'} */}
    </button>
  );
}