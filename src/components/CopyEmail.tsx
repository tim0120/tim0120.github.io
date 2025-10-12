'use client';

import { useState } from 'react';

interface CopyEmailProps {
  email: string;
  obscured: string;
}

export default function CopyEmail({ email, obscured }: CopyEmailProps) {
  const [copied, setCopied] = useState(false);

  const handleClick = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  return (
    <button
      onClick={handleClick}
      className="text-xs font-mono underline decoration-gray-300 hover:decoration-gray-500 dark:decoration-gray-600 dark:hover:decoration-gray-400 transition-colors cursor-pointer"
      title={copied ? 'Copied!' : 'Click to copy email'}
    >
      {copied ? 'Copied!' : obscured}
    </button>
  );
}
