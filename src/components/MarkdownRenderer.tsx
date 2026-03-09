import React from 'react';

interface MarkdownRendererProps {
  content: string;
  onImageClick?: (src: string) => void;
}

export const MarkdownRenderer: React.FC<MarkdownRendererProps> = ({
  content,
  onImageClick,
}) => {
  const lines = content.split('\n');
  const elements: React.ReactNode[] = [];
  let i = 0;
  let key = 0;

  const parseInline = (text: string): React.ReactNode[] => {
    const parts: React.ReactNode[] = [];
    const regex =
      /(!?\[([^\]]*)\]\(([^)]+)\)|\*\*\*(.+?)\*\*\*|\*\*(.+?)\*\*|\*(.+?)\*|`(.+?)`)/g;
    let lastIndex = 0;
    let match;

    while ((match = regex.exec(text)) !== null) {
      if (match.index > lastIndex) {
        parts.push(text.slice(lastIndex, match.index));
      }

      // Image: ![alt](src)
      if (match[0].startsWith('![')) {
        const alt = match[2] || '';
        const src = match[3] || '';
        parts.push(
          <figure key={`img-${match.index}`} className="my-4">
            <div className="img-protected relative overflow-hidden rounded-xl border border-slate-200 shadow-sm">
              <img
                src={src}
                alt={alt}
                loading="lazy"
                className={`w-full ${
                  onImageClick
                    ? 'cursor-zoom-in transition-transform hover:scale-[1.01]'
                    : ''
                }`}
                onClick={() => onImageClick?.(src)}
              />
            </div>
            {alt && (
              <figcaption className="mt-2 text-center text-xs text-slate-400">
                {alt}
              </figcaption>
            )}
          </figure>
        );
      }
      // Link: [text](url)
      else if (match[0].startsWith('[')) {
        const linkText = match[2] || '';
        const href = match[3] || '';
        parts.push(
          <a
            key={`a-${match.index}`}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 underline decoration-blue-200 underline-offset-2 hover:decoration-blue-400"
          >
            {linkText}
          </a>
        );
      }
      // Bold italic
      else if (match[4]) {
        parts.push(
          <strong
            key={`bi-${match.index}`}
            className="font-semibold italic text-slate-900"
          >
            {match[4]}
          </strong>
        );
      }
      // Bold
      else if (match[5]) {
        parts.push(
          <strong
            key={`b-${match.index}`}
            className="font-semibold text-slate-900"
          >
            {match[5]}
          </strong>
        );
      }
      // Italic
      else if (match[6]) {
        parts.push(
          <em key={`i-${match.index}`} className="italic text-slate-700">
            {match[6]}
          </em>
        );
      }
      // Code
      else if (match[7]) {
        parts.push(
          <code
            key={`c-${match.index}`}
            className="rounded bg-slate-100 px-1.5 py-0.5 font-mono text-sm text-rose-600"
          >
            {match[7]}
          </code>
        );
      }

      lastIndex = match.index + match[0].length;
    }

    if (lastIndex < text.length) {
      parts.push(text.slice(lastIndex));
    }
    return parts.length > 0 ? parts : [text];
  };

  const isStandaloneImage = (line: string): boolean => {
    return /^\s*!\[[^\]]*\]\([^)]+\)\s*$/.test(line);
  };

  while (i < lines.length) {
    const line = lines[i];

    if (line.trim() === '') {
      i++;
      continue;
    }

    // H1
    if (line.startsWith('# ')) {
      elements.push(
        <h1
          key={key++}
          className="mb-1 text-2xl font-bold tracking-tight text-slate-900"
        >
          {line.slice(2)}
        </h1>
      );
      i++;
      continue;
    }

    // H2
    if (line.startsWith('## ')) {
      elements.push(
        <h2
          key={key++}
          className="mb-1 mt-6 text-lg font-semibold text-slate-800"
        >
          {line.slice(3)}
        </h2>
      );
      i++;
      continue;
    }

    // H3
    if (line.startsWith('### ')) {
      elements.push(
        <h3
          key={key++}
          className="mb-1 mt-4 text-base font-semibold text-slate-700"
        >
          {line.slice(4)}
        </h3>
      );
      i++;
      continue;
    }

    // Horizontal rule
    if (line.trim() === '---' || line.trim() === '***') {
      elements.push(<hr key={key++} className="my-4 border-slate-200" />);
      i++;
      continue;
    }

    // Standalone image line
    if (isStandaloneImage(line)) {
      elements.push(<div key={key++}>{parseInline(line.trim())}</div>);
      i++;
      continue;
    }

    // Table
    if (
      line.includes('|') &&
      i + 1 < lines.length &&
      lines[i + 1].includes('---')
    ) {
      const tableRows: string[][] = [];
      let j = i;
      while (j < lines.length && lines[j].includes('|')) {
        const cells = lines[j]
          .split('|')
          .map((c) => c.trim())
          .filter((c) => c !== '' && !c.match(/^-+$/));
        if (cells.length > 0 && !lines[j].match(/^\|?\s*-+/)) {
          tableRows.push(cells);
        }
        j++;
      }
      if (tableRows.length > 0) {
        elements.push(
          <div key={key++} className="my-3 overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr>
                  {tableRows[0].map((cell, ci) => (
                    <th
                      key={ci}
                      className="border-b border-slate-200 px-3 py-2 text-left font-semibold text-slate-700"
                    >
                      {parseInline(cell)}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {tableRows.slice(1).map((row, ri) => (
                  <tr
                    key={ri}
                    className={ri % 2 === 0 ? 'bg-slate-50/50' : ''}
                  >
                    {row.map((cell, ci) => (
                      <td
                        key={ci}
                        className="border-b border-slate-100 px-3 py-2 text-slate-600"
                      >
                        {parseInline(cell)}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );
      }
      i = j;
      continue;
    }

    // Ordered list
    if (/^\d+\.\s/.test(line.trim())) {
      const items: React.ReactNode[] = [];
      while (i < lines.length && /^\d+\.\s/.test(lines[i].trim())) {
        items.push(
          <li key={key++} className="text-slate-600">
            {parseInline(lines[i].trim().replace(/^\d+\.\s/, ''))}
          </li>
        );
        i++;
      }
      elements.push(
        <ol key={key++} className="my-2 ml-5 list-decimal space-y-1 text-sm">
          {items}
        </ol>
      );
      continue;
    }

    // Unordered list
    if (line.trim().startsWith('- ')) {
      const items: React.ReactNode[] = [];
      while (i < lines.length && lines[i].trim().startsWith('- ')) {
        items.push(
          <li key={key++} className="text-slate-600">
            {parseInline(lines[i].trim().slice(2))}
          </li>
        );
        i++;
      }
      elements.push(
        <ul key={key++} className="my-2 ml-5 list-disc space-y-1 text-sm">
          {items}
        </ul>
      );
      continue;
    }

    // Blockquote
    if (line.trim().startsWith('> ')) {
      const quoteLines: string[] = [];
      while (i < lines.length && lines[i].trim().startsWith('> ')) {
        quoteLines.push(lines[i].trim().slice(2));
        i++;
      }
      elements.push(
        <blockquote
          key={key++}
          className="my-3 border-l-3 border-blue-200 bg-blue-50/50 px-4 py-2 text-sm italic text-slate-600"
        >
          {quoteLines.map((ql, qi) => (
            <p key={qi}>{parseInline(ql)}</p>
          ))}
        </blockquote>
      );
      continue;
    }

    // Paragraph
    elements.push(
      <p
        key={key++}
        className="my-1.5 text-sm leading-relaxed text-slate-600"
      >
        {parseInline(line)}
      </p>
    );
    i++;
  }

  return <div className="prose-custom space-y-0">{elements}</div>;
};
