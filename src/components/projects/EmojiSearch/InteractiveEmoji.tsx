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
      onTouchStart={(e) => {
        e.currentTarget.style.transform = 'scale(1.25)';
      }}
      onTouchEnd={async (e) => {
        e.currentTarget.style.transform = 'scale(1)';
        await handleMobileCopy(char);
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

// hacky workaround for mobile copy
const handleMobileCopy = async (char: string): Promise<boolean> => {
  try {
    // Try the modern API first, doesn't work on Safari for iOS 18.1.1
    if (navigator.clipboard && window.isSecureContext) {
      try {
        await navigator.clipboard.writeText(char);
        return true;
      } catch (err) {
        console.warn('Modern clipboard API failed, falling back to deprecated method:', err);
      }
    }

    // Fallback to deprecated version if modern API fails or is unavailable
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