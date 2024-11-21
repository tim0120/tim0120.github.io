'use client'

import { useTheme } from '@/context/ThemeContext';

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      // className="text-xl hover:scale-125 transition-transform duration-100 ease-in-out"
      className="text-xl"
      aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} theme`}
    >
      {theme === 'light' ? '🌚' : '🌞'}
      {/* Alternative: use text instead of emoji */}
      {/* {theme === 'light' ? 'Dark' : 'Light'} */}
    </button>
  );
}