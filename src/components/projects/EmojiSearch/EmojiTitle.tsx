import { useState } from "react"
import { RandomInteractiveEmoji } from "./InteractiveEmoji"

const numEmojis = 3
const title = 'Emoji\nSearch'

function PageTitle({ onEmojiClick }: { onEmojiClick: () => void }) {
  const [emojis] = useState(() => 
    Array.from({ length: numEmojis }).map((_, index) => (
      <RandomInteractiveEmoji key={index} onEmojiClick={onEmojiClick} />
    ))
  );

  return (
    <div className="mb-8 relative">
      <div className="relative z-10">
        <h1 className="text-5xl sm:text-6xl font-bold flex flex-col justify-center items-center whitespace-pre-line text-center">{title}</h1>
        <div className="absolute -bottom-4 -left-4 transform text-3xl">
          {/* bottom left */}
          {emojis[0]}
        </div>
        <div className="absolute -bottom-5 -right-6 transform text-4xl">
          {/* bottom right */}
          {emojis[1]}
        </div>
        <div className="absolute -top-2 -right-1 transform text-2xl">
          {emojis[2]}
        </div>
      </div>
    </div>
  );
}

export default PageTitle;
