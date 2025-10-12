export type Theme = 'light' | 'dark' | 'system';

export interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
  actualTheme: 'light' | 'dark'; // The actual theme being displayed (resolves system to light/dark)
}