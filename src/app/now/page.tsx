import { getTweet } from "react-tweet/api";
import AsciiArt from "@/components/AsciiArt";
import { imageToAscii } from "@/lib/ascii";

// The tweet to surface. Update this id when you want a newer one shown.
const TWEET_ID = "2051340656153645171";

export default async function NowPage() {
  let tweet:
    | {
        text: string;
        created_at: string;
        id_str: string;
        user: { screen_name: string };
        mediaDetails?: { type: string; media_url_https: string }[];
        photos?: { url: string }[];
      }
    | undefined;
  try {
    tweet = await getTweet(TWEET_ID);
  } catch {
    tweet = undefined;
  }

  const photo =
    tweet?.mediaDetails?.find((m) => m.type === "photo")?.media_url_https ??
    tweet?.photos?.[0]?.url;
  // Converted at build time so the static page ships with the art inline.
  const ascii = photo ? await imageToAscii(photo) : undefined;

  const tweetUrl = tweet
    ? `https://x.com/${tweet.user.screen_name}/status/${tweet.id_str}`
    : `https://x.com/thkostolansky`;

  return (
    <div className="max-w-full">
      {tweet ? (
        // The whole card links to the tweet; text inside is still selectable.
        <a
          href={tweetUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="group block w-full max-w-[26rem] border border-gray-400/70 p-4 no-underline transition-colors hover:border-gray-500 dark:border-gray-600 dark:hover:border-gray-400"
        >
          <div className="mb-2 text-xs text-gray-500 dark:text-gray-400">
            @{tweet.user.screen_name}
          </div>
          <p className="whitespace-pre-wrap text-sm text-[color:var(--foreground)]">
            {tweet.text.replace(/\s*https:\/\/t\.co\/\S+\s*$/, "").trim()}
          </p>
          {ascii && <AsciiArt art={ascii} className="mt-3" />}
          <div className="mt-3 text-xs text-gray-500 group-hover:text-gray-700 dark:text-gray-400 dark:group-hover:text-gray-300">
            {new Date(tweet.created_at).toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
              year: "numeric",
            })}
          </div>
        </a>
      ) : (
        <p className="text-sm text-gray-500 dark:text-gray-400">
          couldn&apos;t load the tweet —{" "}
          <a href={tweetUrl} className="underline" target="_blank" rel="noopener noreferrer">
            see it on x
          </a>
        </p>
      )}
    </div>
  );
}
