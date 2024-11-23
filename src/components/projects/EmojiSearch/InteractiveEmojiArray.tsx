import { useState, useEffect } from 'react';
import clsx from 'clsx';
import InteractiveEmoji from "./InteractiveEmoji";

interface Props {
  emojiList: string[],
  onEmojiClick: () => void
}

export default function InteractiveEmojiArray({
  emojiList,
  onEmojiClick
}: Props) {
  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth < 640);

  useEffect(() => {
    const updateGrid = () => {
      setIsSmallScreen(window.innerWidth < 640);
    };

    updateGrid();
    window.addEventListener('resize', updateGrid);
    return () => window.removeEventListener('resize', updateGrid);
  }, []);

  return (
    <>
      <div className={clsx(
        "text-5xl sm:text-5xl grid gap-4 sm:gap-4",
        {
          'grid-cols-6 grid-rows-5': isSmallScreen,
          'grid-cols-10 grid-rows-3': !isSmallScreen
        }
      )}>
        {emojiList.map((emoji, i) => (
          <div key={i} className="flex justify-center">
            <InteractiveEmoji emojiChar={emoji} onEmojiClick={onEmojiClick} />
          </div>
        ))}
      </div>
      <div className="text-center mt-3 text-xs text-gray-500">
        Click to copy!
      </div>
    </>
  );
}