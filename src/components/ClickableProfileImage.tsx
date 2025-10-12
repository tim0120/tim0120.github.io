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
      src="/images/face.png"
      alt="My face"
      width={96}
      height={96}
      onClick={handleClick}
      className={`mx-auto w-22 h-22 sm:w-[6.6rem] sm:h-[6.6rem] rounded-[30%] object-cover object-[center_30%] transition-transform duration-200 hover:scale-105 cursor-pointer ${
        isClicked ? 'scale-[1.155]' : ''
      }`}
    />
  );
}
