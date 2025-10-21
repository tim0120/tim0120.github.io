import { Tweet } from 'react-tweet';

interface TweetEmbedProps {
  tweetId: string;
}

export default function TweetEmbed({ tweetId }: TweetEmbedProps) {
  return (
    <div className="flex justify-center">
      <Tweet id={tweetId} />
    </div>
  );
}
