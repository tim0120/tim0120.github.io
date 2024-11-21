import InteractiveEmoji from "./InteractiveEmoji";

interface Props {
  emojiList: string[]
}

export default function InteractiveEmojiArray({ emojiList }: Props) {
  return (
    <>
      <div className="text-3xl sm:text-4xl grid grid-cols-10 grid-rows-3 gap-2">
        {emojiList.map((emoji, i) => (
          <div key={i} className="flex justify-center">
            <InteractiveEmoji emojiChar={emoji} />
          </div>
        ))}
      </div>
      <div className="text-center mt-3 text-xs text-gray-500">
        Click to copy!
      </div>
    </>
  );
}