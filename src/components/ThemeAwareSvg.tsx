"use client"

import React from 'react';
import { useTheme } from '@/context/ThemeContext';

const ThemeAwareSvg = ({ src }: { src: string }) => {
  const { theme } = useTheme();
  const [svgContent, setSvgContent] = React.useState('');

  React.useEffect(() => {
    const loadSvg = async () => {
      try {
        const response = await fetch(src);
        const text = await response.text();
        
        // Use theme directly from your context
        const themeColor = theme === 'dark' ? 'currentColor' : 'currentColor';
        const modifiedSvg = text
          .replace(/fill="([^none].*?)"/g, `fill="${themeColor}"`)
          .replace(/stroke="([^none].*?)"/g, `stroke="${themeColor}"`);
        
        setSvgContent(modifiedSvg);
      } catch (error) {
        console.error('Error loading SVG:', error);
      }
    };

    if (src) loadSvg();
  }, [src, theme]);

  return <div dangerouslySetInnerHTML={{ __html: svgContent }} />;
};

export default ThemeAwareSvg;