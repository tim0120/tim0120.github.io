"use client"

import Image from "next/image";

const ThemeAwareSvg = ({ src, className = '' }: { src: string; className?: string }) => {
  return (
    <Image
      src={src}
      alt=""
      width={24}
      height={24}
      className={`inline-block w-6 h-6 ${className}`}
      aria-hidden="true"
    />
  );
};

export default ThemeAwareSvg;