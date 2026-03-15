import React from 'react';
import { Star, Eye } from 'lucide-react';
import { type Topic, categories } from '../data/index';
import { cn } from '../utils/cn';

interface TopicItemProps {
  topic: Topic;
  showSubject?: boolean;
  onViewDetail: (topic: Topic) => void;
}

const categoryStyles: Record<string, string> = {
  topics: 'bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400',
  pyq_pdfs: 'bg-rose-50 text-rose-600 dark:bg-rose-900/20 dark:text-rose-400',
  pyqs: 'bg-violet-50 text-violet-600 dark:bg-violet-900/20 dark:text-violet-400',
  histology: 'bg-emerald-50 text-emerald-600 dark:bg-emerald-900/20 dark:text-emerald-400',
  radiology: 'bg-cyan-50 text-cyan-600 dark:bg-cyan-900/20 dark:text-cyan-400',
  notes: 'bg-orange-50 text-orange-600 dark:bg-orange-900/20 dark:text-orange-400',
};

export const TopicItem: React.FC<TopicItemProps> = ({ topic, showSubject, onViewDetail }) => {
  const cat = categories.find(c => c.id === topic.category);
  const hasContent = !!topic.content;

  return (
    <div
      className={cn(
        'group flex items-center gap-3 rounded-xl px-3.5 py-2.5 transition-all',
        'bg-white dark:bg-neutral-900',
        'border border-stone-100 dark:border-neutral-800',
        'hover:border-stone-200 dark:hover:border-neutral-700',
        'hover:shadow-sm',
      )}
    >
      {/* Title area */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          {topic.important && (
            <Star size={12} className="shrink-0 fill-amber-400 text-amber-400" />
          )}
          <span className="text-sm text-stone-800 dark:text-neutral-100 truncate">
            {topic.title}
          </span>
        </div>
        {showSubject && (
          <p className="mt-0.5 text-[11px] text-stone-400 dark:text-neutral-500 truncate">
            {topic.subjectId}
          </p>
        )}
      </div>

      {/* Category badge */}
      {cat && (
        <span className={cn(
          'shrink-0 rounded-full px-2 py-0.5 text-[10px] font-medium',
          categoryStyles[topic.category] || 'bg-stone-100 text-stone-500 dark:bg-neutral-800 dark:text-neutral-400'
        )}>
          {cat.name}
        </span>
      )}

      {/* View button — only for topics with content */}
      {hasContent && (
        <button
          onClick={() => onViewDetail(topic)}
          className="shrink-0 flex items-center gap-1 rounded-lg bg-amber-50 dark:bg-amber-900/20 px-2.5 py-1 text-[11px] font-medium text-amber-700 dark:text-amber-400 transition-all hover:bg-amber-100 dark:hover:bg-amber-900/30 active:scale-95"
        >
          <Eye size={11} />
          View
        </button>
      )}
    </div>
  );
};
