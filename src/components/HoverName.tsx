'use client';

import { useRef, useState, useEffect } from 'react';

export default function HoverName({ name }: { name: string }) {
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

  const getLetterScale = (index: number) => {
    if (!containerRef.current) return 1;

    const letters = containerRef.current.querySelectorAll('span');
    if (!letters[index]) return 1;

    const rect = letters[index].getBoundingClientRect();
    const containerRect = containerRef.current.getBoundingClientRect();

    const letterCenterX = rect.left - containerRect.left + rect.width / 2;
    const letterCenterY = rect.top - containerRect.top + rect.height / 2;

    const distance = Math.sqrt(
      Math.pow(mousePos.x - letterCenterX, 2) +
      Math.pow(mousePos.y - letterCenterY, 2)
    );

    const maxDistance = 100;
    const normalizedDistance = distance / maxDistance;
    const scale = Math.max(1, 1.75 - normalizedDistance * normalizedDistance * normalizedDistance * 0.75);
    return Math.min(scale, 1.75);
  };

  return (
    <div
      ref={containerRef}
      className="inline-block"
    >
      {name.split('').map((char, index) => (
        <span
          key={index}
          style={{
            display: 'inline-block',
            transform: `scale(${getLetterScale(index)})`,
            transition: 'transform 0.12s cubic-bezier(0.34, 1.56, 0.64, 1)',
            transformOrigin: 'center center',
          }}
        >
          {char === ' ' ? '\u00A0' : char}
        </span>
      ))}
    </div>
  );
}
