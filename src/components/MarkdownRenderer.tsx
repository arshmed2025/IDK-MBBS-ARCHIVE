import React from 'react';
import { Play } from 'lucide-react';

interface MarkdownRendererProps {
  content: string;
  onImageClick?: (src: string) => void;
  onVideoClick?: (url: string, title: string) => void;
  onPdfClick?: (url: string, title: string) => void;
}

export const MarkdownRenderer: React.FC<MarkdownRendererProps> = ({ content, onImageClick, onVideoClick, onPdfClick }) => {
  const lines = content.split('\n');
  const elements: React.ReactNode[] = [];
  let i = 0;
  let key = 0;

  const renderInline = (text: string): React.ReactNode[] => {
    const parts: React.ReactNode[] = [];
    let remaining = text;
    let k = 0;

    while (remaining.length > 0) {
      // Image
      const imgMatch = remaining.match(/^!\[([^\]]*)\]\(([^)]+)\)/);
      if (imgMatch) {
        parts.push(
          <figure key={k++} className="my-4">
            <div className="relative group">
              <img
                src={imgMatch[2]}
                alt={imgMatch[1]}
                className="w-full rounded-xl border border-zinc-200 dark:border-zinc-700 shadow-sm cursor-zoom-in transition-transform duration-200 hover:shadow-md"
                onClick={() => onImageClick?.(imgMatch[2])}
                draggable={false}
                onDragStart={(e) => e.preventDefault()}
              />
            </div>
            {imgMatch[1] && (
              <figcaption className="mt-2 text-center text-xs text-zinc-400 dark:text-zinc-500 italic">
                {imgMatch[1]}
              </figcaption>
            )}
          </figure>
        );
        remaining = remaining.slice(imgMatch[0].length);
        continue;
      }

      // Bold+Italic
      const biMatch = remaining.match(/^\*\*\*(.+?)\*\*\*/);
      if (biMatch) {
        parts.push(<strong key={k++} className="font-semibold italic text-zinc-800 dark:text-zinc-200">{biMatch[1]}</strong>);
        remaining = remaining.slice(biMatch[0].length);
        continue;
      }

      // Bold
      const boldMatch = remaining.match(/^\*\*(.+?)\*\*/);
      if (boldMatch) {
        parts.push(<strong key={k++} className="font-semibold text-zinc-800 dark:text-zinc-200">{boldMatch[1]}</strong>);
        remaining = remaining.slice(boldMatch[0].length);
        continue;
      }

      // Italic
      const italicMatch = remaining.match(/^\*(.+?)\*/);
      if (italicMatch) {
        parts.push(<em key={k++} className="italic text-zinc-600 dark:text-zinc-400">{italicMatch[1]}</em>);
        remaining = remaining.slice(italicMatch[0].length);
        continue;
      }

      // Code
      const codeMatch = remaining.match(/^`([^`]+)`/);
      if (codeMatch) {
        parts.push(
          <code key={k++} className="rounded-md bg-zinc-100 dark:bg-zinc-800 px-1.5 py-0.5 text-xs font-mono text-violet-600 dark:text-violet-400">
            {codeMatch[1]}
          </code>
        );
        remaining = remaining.slice(codeMatch[0].length);
        continue;
      }

      // Link
      const linkMatch = remaining.match(/^\[([^\]]+)\]\(([^)]+)\)/);
      if (linkMatch) {
        parts.push(
          <a key={k++} href={linkMatch[2]} target="_blank" rel="noopener noreferrer"
             className="text-violet-600 dark:text-violet-400 underline decoration-violet-300 dark:decoration-violet-700 hover:decoration-violet-500">
            {linkMatch[1]}
          </a>
        );
        remaining = remaining.slice(linkMatch[0].length);
        continue;
      }

      // Regular text
      const nextSpecial = remaining.slice(1).search(/[*`!\[]/);
      if (nextSpecial === -1) {
        parts.push(remaining);
        break;
      } else {
        parts.push(remaining.slice(0, nextSpecial + 1));
        remaining = remaining.slice(nextSpecial + 1);
      }
    }

    return parts;
  };

  while (i < lines.length) {
    const line = lines[i].trim();

    // Empty line
    if (line === '') { i++; continue; }

    // Headings
    if (line.startsWith('### ')) {
      elements.push(<h3 key={key++} className="mt-5 mb-2 text-sm font-semibold text-zinc-800 dark:text-zinc-200">{renderInline(line.slice(4))}</h3>);
      i++; continue;
    }
    if (line.startsWith('## ')) {
      elements.push(<h2 key={key++} className="mt-6 mb-2 text-base font-semibold text-zinc-900 dark:text-zinc-100">{renderInline(line.slice(3))}</h2>);
      i++; continue;
    }
    if (line.startsWith('# ')) {
      elements.push(<h1 key={key++} className="mt-6 mb-3 text-lg font-bold text-zinc-900 dark:text-zinc-100">{renderInline(line.slice(2))}</h1>);
      i++; continue;
    }

    // HR
    if (line === '---' || line === '***') {
      elements.push(<hr key={key++} className="my-4 border-zinc-200 dark:border-zinc-700" />);
      i++; continue;
    }

    // Blockquote
    if (line.startsWith('>')) {
      const bqLines: string[] = [];
      while (i < lines.length && lines[i].trim().startsWith('>')) {
        bqLines.push(lines[i].trim().replace(/^>\s?/, ''));
        i++;
      }
      elements.push(
        <blockquote key={key++} className="my-3 border-l-3 border-violet-400 dark:border-violet-500 bg-violet-50/50 dark:bg-violet-500/5 rounded-r-lg px-4 py-2.5 text-sm text-zinc-600 dark:text-zinc-400 italic">
          {bqLines.map((l, idx) => <div key={idx}>{renderInline(l)}</div>)}
        </blockquote>
      );
      continue;
    }

    // Table
    if (line.includes('|') && line.startsWith('|')) {
      const tableLines: string[] = [];
      while (i < lines.length && lines[i].trim().startsWith('|')) {
        tableLines.push(lines[i].trim());
        i++;
      }
      if (tableLines.length >= 2) {
        const parseRow = (r: string) => r.split('|').slice(1, -1).map(c => c.trim());
        const headers = parseRow(tableLines[0]);
        const dataRows = tableLines.slice(2);
        elements.push(
          <div key={key++} className="my-4 overflow-x-auto rounded-xl border border-zinc-200 dark:border-zinc-700">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-zinc-50 dark:bg-zinc-800">
                  {headers.map((h, idx) => (
                    <th key={idx} className="px-3 py-2 text-left text-xs font-semibold text-zinc-600 dark:text-zinc-300 border-b border-zinc-200 dark:border-zinc-700">
                      {renderInline(h)}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {dataRows.map((row, rIdx) => (
                  <tr key={rIdx} className="border-b border-zinc-100 dark:border-zinc-800 last:border-0">
                    {parseRow(row).map((cell, cIdx) => (
                      <td key={cIdx} className="px-3 py-2 text-zinc-600 dark:text-zinc-400">
                        {renderInline(cell)}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );
      }
      continue;
    }

    // Unordered list
    if (line.startsWith('- ') || line.startsWith('* ')) {
      const items: string[] = [];
      while (i < lines.length && (lines[i].trim().startsWith('- ') || lines[i].trim().startsWith('* '))) {
        items.push(lines[i].trim().replace(/^[-*]\s/, ''));
        i++;
      }
      elements.push(
        <ul key={key++} className="my-2 space-y-1 pl-1">
          {items.map((item, idx) => (
            <li key={idx} className="flex items-start gap-2 text-sm text-zinc-600 dark:text-zinc-400">
              <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-zinc-400 dark:bg-zinc-500" />
              <span>{renderInline(item)}</span>
            </li>
          ))}
        </ul>
      );
      continue;
    }

    // Numbered list
    if (/^\d+\.\s/.test(line)) {
      const items: string[] = [];
      while (i < lines.length && /^\d+\.\s/.test(lines[i].trim())) {
        items.push(lines[i].trim().replace(/^\d+\.\s/, ''));
        i++;
      }
      elements.push(
        <ol key={key++} className="my-2 space-y-1 pl-1">
          {items.map((item, idx) => (
            <li key={idx} className="flex items-start gap-2 text-sm text-zinc-600 dark:text-zinc-400">
              <span className="mt-0.5 shrink-0 text-xs font-medium text-zinc-400 dark:text-zinc-500 w-4 text-right">{idx + 1}.</span>
              <span>{renderInline(item)}</span>
            </li>
          ))}
        </ol>
      );
      continue;
    }

    // VIDEO block line
    const videoM = line.match(/^\[VIDEO:\s*([^\]]*)\]\(([^)]+)\)/);
    if (videoM) {
      const [, videoTitle, url] = videoM;
      elements.push(
        <div
          key={key++}
          role="button"
          tabIndex={0}
          onClick={() => onVideoClick?.(url, videoTitle)}
          onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && onVideoClick?.(url, videoTitle)}
          className="my-3 flex cursor-pointer items-center gap-3 rounded-xl bg-zinc-900 dark:bg-zinc-950 px-4 py-3 transition-colors hover:bg-zinc-800 dark:hover:bg-zinc-900"
        >
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-sky-500 text-white"><Play size={14} /></div>
          <div>
            <div className="text-sm font-semibold text-white">{videoTitle}</div>
            <div className="text-xs text-zinc-500 dark:text-zinc-400">Click to play</div>
          </div>
        </div>
      );
      i++; continue;
    }

    // PDF block line
    const pdfM = line.match(/^\[PDF:\s*([^\]]*)\]\(([^)]+)\)/);
    if (pdfM) {
      const [, pdfTitle, url] = pdfM;
      elements.push(
        <div
          key={key++}
          role="button"
          tabIndex={0}
          onClick={() => onPdfClick?.(url, pdfTitle)}
          onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && onPdfClick?.(url, pdfTitle)}
          className="my-3 flex cursor-pointer items-center gap-3 rounded-xl border border-orange-200 dark:border-orange-500/20 bg-orange-50 dark:bg-orange-500/10 px-4 py-3 transition-colors hover:bg-orange-100 dark:hover:bg-orange-500/15"
        >
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-orange-500 text-xs font-bold text-white">PDF</div>
          <div>
            <div className="text-sm font-semibold text-orange-700 dark:text-orange-400">{pdfTitle}</div>
            <div className="text-xs text-orange-400 dark:text-orange-500">Click to open</div>
          </div>
        </div>
      );
      i++; continue;
    }

    // Image line
    if (line.startsWith('![')) {
      elements.push(<div key={key++}>{renderInline(line)}</div>);
      i++; continue;
    }

    // Paragraph
    elements.push(
      <p key={key++} className="my-2 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
        {renderInline(line)}
      </p>
    );
    i++;
  }

  return <div className="prose-custom">{elements}</div>;
};
