import Markdown from 'markdown-to-jsx';

export default function MarkdownRenderer({ content }: { content: string }) {
  return (
    <article className="prose dark:prose-invert max-w-none">
      <Markdown>{content}</Markdown>
    </article>
  );
}