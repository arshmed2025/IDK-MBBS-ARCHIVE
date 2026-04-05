import React from 'react';
import { Star, Eye } from 'lucide-react';
import { type Topic, categories, subjects } from '../data/index';
import { cn } from '../utils/cn';

interface TopicItemProps {
  topic: Topic;
  showSubject?: boolean;
  onViewDetail: (topic: Topic) => void;
}

const shortLabels: Record<string, string> = {
  topics: 'T',
  pyq_pdfs: 'PYQ PDFs',
  pyqs: 'PYQs',
  notes: 'N',
  histology: 'H',
  radiology: 'R',
};

const badgeColors: Record<string, string> = {
  topics: 'bg-sky-100 text-sky-700 dark:bg-sky-500/10 dark:text-sky-400',
  pyq_pdfs: 'bg-rose-100 text-rose-700 dark:bg-rose-500/10 dark:text-rose-400',
  pyqs: 'bg-purple-100 text-purple-700 dark:bg-purple-500/10 dark:text-purple-400',
  histology: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400',
  radiology: 'bg-cyan-100 text-cyan-700 dark:bg-cyan-500/10 dark:text-cyan-400',
  notes: 'bg-orange-100 text-orange-700 dark:bg-orange-500/10 dark:text-orange-400',
};

export const TopicItem: React.FC<TopicItemProps> = ({ topic, showSubject, onViewDetail }) => {
  const cat = categories.find(c => c.id === topic.category);
  const hasContent = !!topic.content;
  const subjectLabel = subjects.find(s => s.id === topic.subjectId)?.name;

  return (
    <div
      className={cn(
        'group flex items-center gap-3 rounded-xl px-3.5 py-2.5 transition-all duration-200',
        'bg-white/90 dark:bg-zinc-900/90 backdrop-blur-[2px]',
        'border border-zinc-100/90 dark:border-zinc-800/90 shadow-[0_1px_2px_rgb(0_0_0/0.04)]',
        hasContent && 'hover:border-violet-200/90 dark:hover:border-violet-500/25 hover:shadow-md hover:-translate-y-px',
      )}
    >
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          {topic.important && (
            <Star size={12} className="shrink-0 fill-amber-400 text-amber-400" />
          )}
          <span className="text-sm text-zinc-800 dark:text-zinc-100 truncate">
            {topic.title}
          </span>
        </div>
        {showSubject && (
          <p className="mt-0.5 text-[11px] text-zinc-400 dark:text-zinc-500 truncate">
            {subjectLabel ?? topic.subjectId}
          </p>
        )}
      </div>

      {cat && (
        <span className={cn(
          'shrink-0 rounded-full px-2 py-0.5 text-[10px] font-medium',
          badgeColors[topic.category] || 'bg-zinc-100 text-zinc-500 dark:bg-zinc-800 dark:text-zinc-400'
        )}>
          {shortLabels[topic.category] || cat.name}
        </span>
      )}

      {hasContent && (
        <button
          onClick={() => onViewDetail(topic)}
          className="shrink-0 flex items-center gap-1 rounded-lg bg-violet-50 dark:bg-violet-500/10 px-2.5 py-1 text-[11px] font-medium text-violet-600 dark:text-violet-400 transition-all duration-200 hover:bg-violet-100 dark:hover:bg-violet-500/20 active:scale-95 cursor-pointer"
        >
          <Eye size={11} />
          View
        </button>
      )}
    </div>
  );
};
