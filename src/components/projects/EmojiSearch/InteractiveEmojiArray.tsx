import { useState, useEffect } from 'react';
import clsx from 'clsx';
import InteractiveEmoji from "./InteractiveEmoji";

interface Props {
  emojiList: string[],
  onEmojiClick: () => void
}

type ScreenSize = 'sm' | 'md' | 'lg';

function getScreenSize(): ScreenSize {
  const width = window.innerWidth;
  if (width < 640) return 'sm';        // < 640px
  if (width < 1024) return 'md';       // 640px - 1023px
  return 'lg';                         // >= 1024px
}

export default function InteractiveEmojiArray({
  emojiList,
  onEmojiClick
}: Props) {
  const [screenSize, setScreenSize] = useState<ScreenSize>(() => getScreenSize());

  useEffect(() => {
    const updateGrid = () => {
      setScreenSize(getScreenSize());
    };

    updateGrid();
    window.addEventListener('resize', updateGrid);
    return () => window.removeEventListener('resize', updateGrid);
  }, []);

  // Define grid classes for each screen size
  let gridColsRows = '';
  if (screenSize === 'sm') {
    gridColsRows = 'grid-cols-6 grid-rows-5';
  } else if (screenSize === 'md') {
    gridColsRows = 'grid-cols-6 grid-rows-5';
  } else {
    gridColsRows = 'grid-cols-10 grid-rows-3';
  }

  return (
    <>
      <div className={clsx(
        "text-4xl sm:text-5xl grid gap-3 sm:gap-4 md:gap-5",
        gridColsRows
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