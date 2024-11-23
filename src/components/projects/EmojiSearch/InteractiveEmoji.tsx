import React, { useState, useEffect } from 'react';

export default function InteractiveEmoji({
  emojiChar: char,
  onEmojiClick
}:{
  emojiChar: string,
  onEmojiClick: () => void
}) {
  const emojiRegex = /(\p{Emoji_Presentation}|\p{Emoji}\uFE0F)/u;
  if (!emojiRegex.test(char)) {
    throw new Error(`Input must be a single emoji character, got ${char}`);
  }

  return (
    <div
      className="ease-out transform transition-transform duration-75 hover:scale-125 hover:cursor-pointer"
      onClick={() => {
        navigator.clipboard.writeText(char);
        onEmojiClick();
      }}
      onTouchStart={async (e) => {
        e.preventDefault();
        e.currentTarget.style.transform = 'scale(1.25)';
        await handleMobileCopy(char, e.currentTarget);
      }}
      onTouchEnd={(e) => {
        e.preventDefault();
        e.currentTarget.style.transform = 'scale(1)';
        onEmojiClick();
      }}
    >
      {char}
    </div>
  )
}

export function RandomInteractiveEmoji({ onEmojiClick }: { onEmojiClick: () => void }) {
  const [emojis, setEmojis] = useState<string[]>([]);

  useEffect(() => {
    const fetchEmojis = async () => {
      const response = await fetch('/data/characters.txt');
      const text = await response.text();
      setEmojis(text.split('\n')); // Assuming each emoji is on a new line
    };

    fetchEmojis().catch(error => {
      console.error('Error fetching emojis:', error);
    });
  }, []);

  if (emojis.length === 0) {
    return null;
  }
  const randomIdx = Math.floor(Math.random() * emojis.length);
  const randomEmoji = emojis[randomIdx];
  if (!randomEmoji) {
    return null;
  }

  return (
    <InteractiveEmoji emojiChar={randomEmoji} onEmojiClick={onEmojiClick} />
  );
}

const handleMobileCopy = async (char: string, element: HTMLElement): Promise<boolean> => {
  try {
    element.style.transform = 'scale(1.25)';

    // Prefer the modern API
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(char);
      return true;
    }

    // If we're here, clipboard API isn't available (mainly older iOS Safari)
    // Show warning in console for developers
    console.warn('Using deprecated fallback clipboard API. Please ensure site is served over HTTPS for best compatibility.');
    
    const textArea = document.createElement('textarea');
    textArea.value = char;
    
    textArea.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 2em;
      height: 2em;
      padding: 0;
      border: none;
      outline: none;
      boxShadow: none;
      background: transparent;
      opacity: 0;
    `;

    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();

    try {
      // TypeScript will still warn about this, but we can ignore it
      // document.execCommand('copy') is used as a fallback for iOS Safari
      document.execCommand('copy');
      return true;
    } finally {
      document.body.removeChild(textArea);
    }
  } catch (err) {
    console.error('Copy failed:', err);
    return false;
  }
};