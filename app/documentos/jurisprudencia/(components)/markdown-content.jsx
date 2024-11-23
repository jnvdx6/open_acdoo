import ReactMarkdown from 'react-markdown';
import { ScrollArea } from "@/components/ui/scroll-area";

const MarkdownContent = ({ content }) => (
  <ScrollArea className="h-[700px]">
    <ReactMarkdown
      className="prose dark:prose-invert max-w-none"
      components={{
        // Headings
        h1: ({ node, ...props }) => (
          <h1 className="text-2xl font-bold text-[#FF6B35] mb-4 mt-6" {...props} />
        ),
        h2: ({ node, ...props }) => (
          <h2 className="text-xl font-bold text-[#FF6B35] mb-3 mt-5" {...props} />
        ),
        h3: ({ node, ...props }) => (
          <h3 className="text-lg font-bold text-[#FF6B35] mb-2 mt-4" {...props} />
        ),
        // Paragraphs
        p: ({ node, ...props }) => (
          <p className="text-neutral-700 dark:text-neutral-300 mb-4 leading-relaxed" {...props} />
        ),
        // Lists
        ul: ({ node, ...props }) => (
          <ul className="list-disc pl-6 mb-4 space-y-2 text-neutral-700 dark:text-neutral-300" {...props} />
        ),
        ol: ({ node, ...props }) => (
          <ol className="list-decimal pl-6 mb-4 space-y-2 text-neutral-700 dark:text-neutral-300" {...props} />
        ),
        li: ({ node, ...props }) => (
          <li className="mb-1" {...props} />
        ),
        // Emphasis
        em: ({ node, ...props }) => (
          <em className="italic text-neutral-600 dark:text-neutral-400" {...props} />
        ),
        strong: ({ node, ...props }) => (
          <strong className="font-bold text-neutral-800 dark:text-neutral-200" {...props} />
        ),
        // Blockquotes
        blockquote: ({ node, ...props }) => (
          <blockquote className="border-l-4 border-[#FF6B35] pl-4 my-4 text-neutral-600 dark:text-neutral-400 italic" {...props} />
        ),
        // Code blocks
        code: ({ node, inline, ...props }) => (
          inline ?
            <code className="bg-neutral-100 dark:bg-neutral-800 px-1 rounded text-sm font-mono" {...props} /> :
            <code className="block bg-neutral-100 dark:bg-neutral-800 p-4 rounded-lg text-sm font-mono overflow-x-auto my-4" {...props} />
        ),
        // Horizontal rules
        hr: ({ node, ...props }) => (
          <hr className="my-6 border-neutral-200 dark:border-neutral-700" {...props} />
        ),
        // Links
        a: ({ node, ...props }) => (
          <a className="text-[#FF6B35] hover:text-[#FF8C61] underline" {...props} />
        ),
        // Tables
        table: ({ node, ...props }) => (
          <div className="overflow-x-auto my-4">
            <table className="min-w-full divide-y divide-neutral-200 dark:divide-neutral-700" {...props} />
          </div>
        ),
        thead: ({ node, ...props }) => (
          <thead className="bg-neutral-50 dark:bg-neutral-800" {...props} />
        ),
        th: ({ node, ...props }) => (
          <th className="px-4 py-3 text-left text-sm font-semibold text-neutral-900 dark:text-neutral-100" {...props} />
        ),
        td: ({ node, ...props }) => (
          <td className="px-4 py-3 text-sm text-neutral-700 dark:text-neutral-300" {...props} />
        ),
      }}
    >
      {content}
    </ReactMarkdown>
  </ScrollArea>
);

export default MarkdownContent;