'use client';

import { useRef, useState, useEffect } from 'react';
import Link from 'next/link';
import ThemeAwareSvg from './ThemeAwareSvg';

type LogoLink = {
  href: string;
  src: string;
  label: string;
};

export default function HoverLogos({ links }: { links: LogoLink[] }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        setMousePos({
          x: e.clientX - rect.left,
          y: e.clientY - rect.top,
        });
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const getLogoScale = (index: number) => {
    if (!containerRef.current) return 1;

    const logos = containerRef.current.querySelectorAll('a');
    if (!logos[index]) return 1;

    const rect = logos[index].getBoundingClientRect();
    const containerRect = containerRef.current.getBoundingClientRect();

    const logoCenterX = rect.left - containerRect.left + rect.width / 2;
    const logoCenterY = rect.top - containerRect.top + rect.height / 2;

    const distance = Math.sqrt(
      Math.pow(mousePos.x - logoCenterX, 2) +
      Math.pow(mousePos.y - logoCenterY, 2)
    );

    const maxDistance = 100;
    const normalizedDistance = distance / maxDistance;
    const scale = Math.max(1, 1.5 - normalizedDistance * normalizedDistance * normalizedDistance * 0.5);
    return Math.min(scale, 1.5);
  };

  return (
    <div
      ref={containerRef}
      className="flex justify-center space-x-5 mt-1 mb-4"
    >
      {links.map((link, index) => (
        <Link
          key={index}
          href={link.href}
          aria-label={link.label}
          style={{
            display: 'inline-block',
            transform: `scale(${getLogoScale(index)})`,
            transition: 'transform 0.12s cubic-bezier(0.34, 1.56, 0.64, 1)',
            transformOrigin: 'center center',
          }}
        >
          <ThemeAwareSvg src={link.src} className="!w-3 !h-3" />
        </Link>
      ))}
    </div>
  );
}
