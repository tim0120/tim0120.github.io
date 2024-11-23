import InteractiveEmoji from "./InteractiveEmoji";
import { RandomInteractiveEmoji } from "./InteractiveEmoji";

// function SingleSpinner() {
//   return (
//     <>
//     <div style={{
//       animation: `
//         ellipse 4s linear infinite,
//         scale 4s ease infinite
//       `
//     }}>
//      <RandomInteractiveEmoji />
//     </div>
    
//     <style>{`
//       @keyframes ellipse {
//         from { transform: translate(-50%, -50%) rotate(0deg) translate(0px, 0px) }
//         to { transform: translate(-50%, -50%) rotate(360deg) translate(0px, 0px) }
//       }
//       @keyframes scale {
//         0%, 100% { scale: 1 }
//         50% { scale: 0.5 }
//       }
//     `}</style>
//     </>
//   );
// }

import { useEffect, useState } from 'react';

function Jumper(
  props: { 
    emoji: JSX.Element, 
    idx: number, 
    jumpIdx: number 
  }
) {
  const { emoji, idx, jumpIdx: jumpTime } = props;
  return (
    <>
    <div style={{
      animation: idx === jumpTime ? 'jump 1s ease infinite alternate' : 'none'
    }}>
     <div>{emoji}</div>
    </div>
    
    <style>{`
      @keyframes jump {
        0% { transform: translateY(0) }
        50% { transform: translateY(-20px) }
        100% { transform: translateY(0) }
      }
    `}</style>
    </>
  );
}

function Naysayer(
  props: { 
    emoji: JSX.Element, 
    idx: number, 
    moveIdx: number 
  }
) {
  const { emoji, idx, moveIdx: moveTime } = props;
  return (
    <>
    <div style={{
      animation: idx === moveTime ? 'naysay 1s ease forwards' : 'none'
    }}>
     <div>{emoji}</div>
    </div>
    
    <style>{`
      @keyframes naysay {
        0% { transform: translateX(0) }
        33% { transform: translateX(5px) }
        66% { transform: translateX(-5px) }
        100% { transform: translateX(0) }
      }
    `}</style>
    </>
  );
}

const numEmojis = 6;
const failureEmojis = ['😢', '😭', '😞', '😔', '😟', '😕', '⛔', '👻', '💣', '💔', '❓', '🧌', '🥚', '⚠️', '😡', '👿', '🥺', '☣️'];
const getRandomFailureEmojis = (count: number, emojis: string[]): string[] => {
  const shuffled = [...emojis].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
};
const selectedFailureEmojis = getRandomFailureEmojis(numEmojis, failureEmojis);

export default function LoadingAnimation({
  status,
  onEmojiClick
}: {
  status: 'loading' | 'failed'
  onEmojiClick: () => void
}) {
  const [time, setTime] = useState(0);
  const [emojiComponents] = useState(() => 
    status === 'loading' 
      ? Array.from({ length: numEmojis }).map((_, index) => <RandomInteractiveEmoji key={index} onEmojiClick={onEmojiClick}/>)
      : Array.from({ length: numEmojis }).map((_, index) => <InteractiveEmoji key={index} emojiChar={selectedFailureEmojis[index]} onEmojiClick={onEmojiClick}/>)
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(prevTime => prevTime + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const animationIdx = time % numEmojis;
  
  return (
    <>
    <div className="text-4xl text-center flex justify-center space-x-4 mt-4">
      {emojiComponents.map((emojiComponent, i) => (
        status === 'loading' ? 
          <Jumper key={i} emoji={emojiComponent} idx={i} jumpIdx={animationIdx} /> :
          <Naysayer key={i} emoji={emojiComponent} idx={i} moveIdx={animationIdx} />
      ))}
    </div>
    <div className="text-sm text-center mt-2 text-gray-500">
      {status === 'loading' ? `Searching${'.'.repeat((time % 3) + 1)}` : <>Sorry, we were not ready for that request!<br/><strong>Please try resubmitting!</strong></>}
    </div>
    </>
  );
}