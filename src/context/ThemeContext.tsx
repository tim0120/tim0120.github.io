'use client';

import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { Theme, ThemeContextType } from '@/types/theme';

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>('system');
  const [actualTheme, setActualTheme] = useState<'light' | 'dark'>('light');

  // Function to get the actual theme based on system preference
  const getSystemTheme = (): 'light' | 'dark' => {
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  };

  // Apply the actual theme to the document
  const applyTheme = (themeToApply: 'light' | 'dark') => {
    setActualTheme(themeToApply);
    document.documentElement.classList.toggle('dark', themeToApply === 'dark');
  };

  useEffect(() => {
    // Check stored theme preference
    const storedTheme = localStorage.getItem('theme') as Theme | null;

    if (storedTheme && (storedTheme === 'light' || storedTheme === 'dark' || storedTheme === 'system')) {
      setTheme(storedTheme);
      const themeToApply = storedTheme === 'system' ? getSystemTheme() : storedTheme;
      applyTheme(themeToApply);
    } else {
      // Default to system
      setTheme('system');
      applyTheme(getSystemTheme());
    }
  }, []);

  useEffect(() => {
    // Listen for system theme changes
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

    const handleChange = (e: MediaQueryListEvent) => {
      if (theme === 'system') {
        applyTheme(e.matches ? 'dark' : 'light');
      }
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prevTheme => {
      // Cycle starts by flipping the parity of whatever's currently shown:
      // system → opposite-of-system → matches-system → system → …
      const sys = getSystemTheme();
      const opp: 'light' | 'dark' = sys === 'dark' ? 'light' : 'dark';
      let newTheme: Theme;
      if (prevTheme === 'system') {
        newTheme = opp;
      } else if (prevTheme === opp) {
        newTheme = sys;
      } else {
        newTheme = 'system';
      }

      localStorage.setItem('theme', newTheme);
      const themeToApply = newTheme === 'system' ? getSystemTheme() : newTheme;
      applyTheme(themeToApply);

      return newTheme;
    });
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, actualTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}