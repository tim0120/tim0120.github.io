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

function SingleJumper(
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

const numEmojis = 6;

export default function LoadingAnimation() {
  const [time, setTime] = useState(0);
  const [emojiComponents] = useState(() => 
    Array.from({ length: numEmojis }).map((_, index) => <RandomInteractiveEmoji key={index}/>)
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(prevTime => prevTime + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const jumpIdx = time % numEmojis;
  
  return (
    <>
    <div className="text-4xl text-center flex justify-center space-x-4 mt-4">
      {emojiComponents.map((emojiComponent, i) => (
        <SingleJumper key={i} emoji={emojiComponent} idx={i} jumpIdx={jumpIdx} />
      ))}
    </div>
    <div className="text-sm text-center mt-2 text-gray-500">
      Searching{'.'.repeat((time % 3) + 1)}
    </div>
    </>
  );
}