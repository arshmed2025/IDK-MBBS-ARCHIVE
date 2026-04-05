import {
  BookOpen,
  ChevronRight,
  FileDown,
  FileText,
  Microscope,
  PenLine,
  ScanLine,
} from 'lucide-react';
import type { CategoryId } from '../data/index';
import { cn } from '../utils/cn';

type CategoryStats = {
  topics: number;
  pyq_pdfs: number;
  pyqs: number;
  notes: number;
  histology: number;
  radiology: number;
};

type TileDef = {
  id: CategoryId;
  title: string;
  /** Word after the count, e.g. "202 topics" */
  unit: string;
  icon: React.ReactNode;
  /** Left edge: width + color (no gradients) */
  accent: string;
  /** Icon wrapper: soft tint, no gradient */
  iconSurface: string;
  iconGlyph: string;
};

const TILES: TileDef[] = [
  {
    id: 'topics',
    title: 'Topics',
    unit: 'topics',
    icon: <BookOpen size={18} strokeWidth={2} />,
    accent: 'border-l-[3px] border-l-sky-500',
    iconSurface: 'bg-sky-50 dark:bg-sky-950/40',
    iconGlyph: 'text-sky-700 dark:text-sky-400',
  },
  {
    id: 'pyq_pdfs',
    title: 'PYQ PDFs',
    unit: 'PYQ PDFs',
    icon: <FileDown size={18} strokeWidth={2} />,
    accent: 'border-l-[3px] border-l-rose-500',
    iconSurface: 'bg-rose-50 dark:bg-rose-950/40',
    iconGlyph: 'text-rose-700 dark:text-rose-400',
  },
  {
    id: 'pyqs',
    title: 'PYQs',
    unit: 'PYQs',
    icon: <FileText size={18} strokeWidth={2} />,
    accent: 'border-l-[3px] border-l-violet-500',
    iconSurface: 'bg-violet-50 dark:bg-violet-950/40',
    iconGlyph: 'text-violet-700 dark:text-violet-400',
  },
  {
    id: 'notes',
    title: 'Notes',
    unit: 'notes',
    icon: <PenLine size={18} strokeWidth={2} />,
    accent: 'border-l-[3px] border-l-amber-500',
    iconSurface: 'bg-amber-50 dark:bg-amber-950/40',
    iconGlyph: 'text-amber-800 dark:text-amber-400',
  },
  {
    id: 'histology',
    title: 'Histology',
    unit: 'histology',
    icon: <Microscope size={18} strokeWidth={2} />,
    accent: 'border-l-[3px] border-l-emerald-500',
    iconSurface: 'bg-emerald-50 dark:bg-emerald-950/40',
    iconGlyph: 'text-emerald-800 dark:text-emerald-400',
  },
  {
    id: 'radiology',
    title: 'Radiology',
    unit: 'radiology',
    icon: <ScanLine size={18} strokeWidth={2} />,
    accent: 'border-l-[3px] border-l-cyan-500',
    iconSurface: 'bg-cyan-50 dark:bg-cyan-950/40',
    iconGlyph: 'text-cyan-800 dark:text-cyan-400',
  },
];

function countFor(stats: CategoryStats, id: CategoryId): number {
  switch (id) {
    case 'topics':
      return stats.topics;
    case 'pyq_pdfs':
      return stats.pyq_pdfs;
    case 'pyqs':
      return stats.pyqs;
    case 'notes':
      return stats.notes;
    case 'histology':
      return stats.histology;
    case 'radiology':
      return stats.radiology;
    default:
      return 0;
  }
}

interface BrowseCategoryTilesProps {
  stats: CategoryStats;
  onCategoryClick: (id: CategoryId) => void;
}

export function BrowseCategoryTiles({ stats, onCategoryClick }: BrowseCategoryTilesProps) {
  const visible = TILES.filter((t) => countFor(stats, t.id) > 0);

  if (visible.length === 0) return null;

  return (
    <div className="mb-10">
      <h3 className="mb-3 text-xs font-semibold uppercase tracking-[0.12em] text-zinc-500 dark:text-zinc-500">
        By resource type
      </h3>
      <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-3 lg:grid-cols-6">
        {visible.map((tile) => {
          const n = countFor(stats, tile.id);
          return (
            <button
              key={tile.id}
              type="button"
              onClick={() => onCategoryClick(tile.id)}
              className={cn(
                'group flex flex-col rounded-xl border border-zinc-200/95 bg-white text-left transition-all dark:border-zinc-800 dark:bg-zinc-900/80',
                'pl-3.5 pr-3 py-3.5 sm:pl-4 sm:pr-3.5 sm:py-4',
                tile.accent,
                'hover:border-zinc-300 hover:bg-zinc-50/80 dark:hover:border-zinc-600 dark:hover:bg-zinc-900',
                'active:scale-[0.99]',
                'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-500/60',
              )}
            >
              <div className="mb-3 flex items-start justify-between gap-2">
                <div
                  className={cn(
                    'flex h-9 w-9 shrink-0 items-center justify-center rounded-lg',
                    tile.iconSurface,
                    tile.iconGlyph,
                  )}
                >
                  {tile.icon}
                </div>
                <ChevronRight
                  className="mt-1 h-4 w-4 shrink-0 text-zinc-300 opacity-0 transition group-hover:translate-x-px group-hover:opacity-100 dark:text-zinc-600"
                  aria-hidden
                />
              </div>
              <p className="text-[10px] font-medium uppercase tracking-wide text-zinc-400 dark:text-zinc-500">
                {tile.title}
              </p>
              <p className="mt-2 leading-none">
                <span className="text-xl font-semibold tabular-nums tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-2xl">
                  {n.toLocaleString()}
                </span>
                <span className="text-sm font-normal text-zinc-500 dark:text-zinc-400"> {tile.unit}</span>
              </p>
            </button>
          );
        })}
      </div>
    </div>
  );
}
