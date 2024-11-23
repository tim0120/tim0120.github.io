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
        await navigator.clipboard.writeText(char);
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