'use client';

import { useState } from 'react';
import Image from 'next/image';

export default function ClickableProfileImage() {
  const [isClicked, setIsClicked] = useState(false);

  const handleClick = () => {
    setIsClicked(true);
    setTimeout(() => setIsClicked(false), 200);
  };

  return (
    <Image
      src="/images/face.jpg"
      alt="My face"
      width={400}
      height={400}
      onClick={handleClick}
      className={`mx-auto w-[6.6rem] h-[6.6rem] rounded-[30%] object-cover object-center transition-transform duration-200 hover:scale-105 cursor-pointer ${
        isClicked ? 'scale-[1.155]' : ''
      }`}
    />
  );
}
