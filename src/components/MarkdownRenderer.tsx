import React from 'react';

interface MarkdownRendererProps {
  content: string;
  onImageClick?: (src: string) => void;
}

export const MarkdownRenderer: React.FC<MarkdownRendererProps> = ({ content, onImageClick }) => {
  const lines = content.split('\n');
  const elements: React.ReactNode[] = [];
  let i = 0;

  while (i < lines.length) {
    const line = lines[i];
    const trimmed = line.trim();

    // Skip empty lines
    if (!trimmed) {
      i++;
      continue;
    }

    // Headings
    if (trimmed.startsWith('### ')) {
      elements.push(
        <h3 key={i} className="mt-5 mb-2 text-base font-semibold text-stone-800 dark:text-neutral-100">
          {renderInline(trimmed.slice(4))}
        </h3>
      );
      i++;
      continue;
    }
    if (trimmed.startsWith('## ')) {
      elements.push(
        <h2 key={i} className="mt-6 mb-2 text-lg font-bold text-stone-900 dark:text-neutral-50">
          {renderInline(trimmed.slice(3))}
        </h2>
      );
      i++;
      continue;
    }
    if (trimmed.startsWith('# ')) {
      elements.push(
        <h1 key={i} className="mt-6 mb-3 text-xl font-bold text-stone-900 dark:text-neutral-50">
          {renderInline(trimmed.slice(2))}
        </h1>
      );
      i++;
      continue;
    }

    // Horizontal rule
    if (trimmed === '---' || trimmed === '***') {
      elements.push(<hr key={i} className="my-4 border-stone-200 dark:border-neutral-700" />);
      i++;
      continue;
    }

    // Image
    const imgMatch = trimmed.match(/^!\[([^\]]*)\]\(([^)]+)\)$/);
    if (imgMatch) {
      const alt = imgMatch[1];
      const src = imgMatch[2];
      elements.push(
        <figure key={i} className="my-4 print-img">
          <div
            className="relative cursor-zoom-in overflow-hidden rounded-xl border border-stone-200 dark:border-neutral-700 bg-stone-50 dark:bg-neutral-800"
            onClick={() => onImageClick?.(src)}
          >
            <img
              src={src}
              alt={alt}
              className="w-full object-contain"
              loading="lazy"
              draggable={false}
              onDragStart={(e) => e.preventDefault()}
            />
          </div>
          {alt && (
            <figcaption className="mt-1.5 text-center text-xs text-stone-400 dark:text-neutral-500">
              {alt}
            </figcaption>
          )}
        </figure>
      );
      i++;
      continue;
    }

    // Table
    if (trimmed.includes('|') && trimmed.startsWith('|')) {
      const tableLines: string[] = [];
      while (i < lines.length && lines[i].trim().startsWith('|')) {
        tableLines.push(lines[i].trim());
        i++;
      }
      elements.push(renderTable(tableLines, elements.length));
      continue;
    }

    // Blockquote
    if (trimmed.startsWith('> ')) {
      const quoteLines: string[] = [];
      while (i < lines.length && lines[i].trim().startsWith('> ')) {
        quoteLines.push(lines[i].trim().slice(2));
        i++;
      }
      elements.push(
        <blockquote key={elements.length} className="my-3 border-l-3 border-amber-300 dark:border-amber-600 bg-amber-50/50 dark:bg-amber-900/10 py-2 pl-4 pr-3 rounded-r-lg">
          {quoteLines.map((ql, qi) => (
            <p key={qi} className="text-sm text-stone-600 dark:text-neutral-300 italic">{renderInline(ql)}</p>
          ))}
        </blockquote>
      );
      continue;
    }

    // Unordered list
    if (trimmed.startsWith('- ') || trimmed.startsWith('* ')) {
      const listItems: string[] = [];
      while (i < lines.length && (lines[i].trim().startsWith('- ') || lines[i].trim().startsWith('* '))) {
        listItems.push(lines[i].trim().slice(2));
        i++;
      }
      elements.push(
        <ul key={elements.length} className="my-2 space-y-1 pl-4">
          {listItems.map((item, li) => (
            <li key={li} className="text-sm text-stone-700 dark:text-neutral-300 list-disc marker:text-stone-300 dark:marker:text-neutral-600">
              {renderInline(item)}
            </li>
          ))}
        </ul>
      );
      continue;
    }

    // Ordered list
    const olMatch = trimmed.match(/^\d+\.\s/);
    if (olMatch) {
      const listItems: string[] = [];
      while (i < lines.length && /^\d+\.\s/.test(lines[i].trim())) {
        listItems.push(lines[i].trim().replace(/^\d+\.\s/, ''));
        i++;
      }
      elements.push(
        <ol key={elements.length} className="my-2 space-y-1 pl-4">
          {listItems.map((item, li) => (
            <li key={li} className="text-sm text-stone-700 dark:text-neutral-300 list-decimal marker:text-stone-400 dark:marker:text-neutral-500">
              {renderInline(item)}
            </li>
          ))}
        </ol>
      );
      continue;
    }

    // Paragraph
    elements.push(
      <p key={i} className="my-2 text-sm leading-relaxed text-stone-700 dark:text-neutral-300">
        {renderInline(trimmed)}
      </p>
    );
    i++;
  }

  return <div>{elements}</div>;
};

// Render inline formatting
function renderInline(text: string): React.ReactNode {
  const parts: React.ReactNode[] = [];
  // Match: bold-italic, bold, italic, code, images inline, links
  const regex = /(\*\*\*(.+?)\*\*\*|\*\*(.+?)\*\*|\*(.+?)\*|`([^`]+)`|!\[([^\]]*)\]\(([^)]+)\)|\[([^\]]+)\]\(([^)]+)\))/g;

  let lastIndex = 0;
  let match;

  while ((match = regex.exec(text)) !== null) {
    // Text before match
    if (match.index > lastIndex) {
      parts.push(text.slice(lastIndex, match.index));
    }

    if (match[2]) {
      // Bold italic
      parts.push(<strong key={match.index} className="font-semibold italic text-stone-800 dark:text-neutral-100">{match[2]}</strong>);
    } else if (match[3]) {
      // Bold
      parts.push(<strong key={match.index} className="font-semibold text-stone-800 dark:text-neutral-100">{match[3]}</strong>);
    } else if (match[4]) {
      // Italic
      parts.push(<em key={match.index} className="italic text-stone-600 dark:text-neutral-300">{match[4]}</em>);
    } else if (match[5]) {
      // Code
      parts.push(
        <code key={match.index} className="rounded bg-stone-100 dark:bg-neutral-800 px-1.5 py-0.5 text-xs font-mono text-stone-700 dark:text-neutral-300">
          {match[5]}
        </code>
      );
    } else if (match[6] !== undefined && match[7]) {
      // Inline image
      parts.push(
        <img key={match.index} src={match[7]} alt={match[6]} className="inline-block max-h-64 rounded" draggable={false} />
      );
    } else if (match[8] && match[9]) {
      // Link
      parts.push(
        <a key={match.index} href={match[9]} target="_blank" rel="noopener noreferrer" className="text-amber-600 dark:text-amber-400 underline underline-offset-2 hover:text-amber-700 dark:hover:text-amber-300">
          {match[8]}
        </a>
      );
    }

    lastIndex = match.index + match[0].length;
  }

  if (lastIndex < text.length) {
    parts.push(text.slice(lastIndex));
  }

  return parts.length === 1 ? parts[0] : <>{parts}</>;
}

// Render table
function renderTable(tableLines: string[], keyBase: number): React.ReactNode {
  const parseRow = (line: string) =>
    line.split('|').slice(1, -1).map(cell => cell.trim());

  if (tableLines.length < 2) return null;

  const headers = parseRow(tableLines[0]);
  // Skip separator line (index 1)
  const bodyLines = tableLines.slice(2);

  return (
    <div key={keyBase} className="my-4 overflow-x-auto rounded-xl border border-stone-200 dark:border-neutral-700">
      <table className="w-full text-sm">
        <thead>
          <tr className="bg-stone-50 dark:bg-neutral-800">
            {headers.map((h, hi) => (
              <th key={hi} className="border-b border-stone-200 dark:border-neutral-700 px-3 py-2 text-left text-xs font-semibold text-stone-600 dark:text-neutral-300">
                {renderInline(h)}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {bodyLines.map((row, ri) => {
            const cells = parseRow(row);
            return (
              <tr key={ri} className={ri % 2 === 0 ? 'bg-white dark:bg-neutral-900' : 'bg-stone-50/50 dark:bg-neutral-800/50'}>
                {cells.map((cell, ci) => (
                  <td key={ci} className="border-b border-stone-100 dark:border-neutral-800 px-3 py-2 text-stone-700 dark:text-neutral-300">
                    {renderInline(cell)}
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
