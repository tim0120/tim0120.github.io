'use client';

import { useEffect } from 'react';

interface TweetEmbedProps {
  tweetId: string;
}

export default function TweetEmbed({ tweetId }: TweetEmbedProps) {
  useEffect(() => {
    // Load Twitter widget script
    const script = document.createElement('script');
    script.src = 'https://platform.twitter.com/widgets.js';
    script.async = true;
    document.body.appendChild(script);

    return () => {
      // Cleanup
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div className="flex justify-center max-w-md mx-auto">
      <blockquote className="twitter-tweet" data-theme="dark">
        <a href={`https://twitter.com/x/status/${tweetId}`}></a>
      </blockquote>
    </div>
  );
}
