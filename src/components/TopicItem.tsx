import { Star, BookOpen, FileText, Microscope, PenLine, Eye } from 'lucide-react';
import type { Topic, CategoryId } from '../data/content';
import { subjects } from '../data/content';
import { cn } from '../utils/cn';

interface TopicItemProps {
  topic: Topic;
  showSubject?: boolean;
  onViewDetail?: (topic: Topic) => void;
}

const categoryMeta: Record<CategoryId, { icon: React.ReactNode; label: string; color: string }> = {
  topics: { icon: <BookOpen size={11} />, label: 'Topic', color: 'bg-blue-50 text-blue-600' },
  pyqs: { icon: <FileText size={11} />, label: 'PYQ', color: 'bg-violet-50 text-violet-600' },
  histology: { icon: <Microscope size={11} />, label: 'Histo', color: 'bg-emerald-50 text-emerald-600' },
  notes: { icon: <PenLine size={11} />, label: 'Note', color: 'bg-orange-50 text-orange-600' },
};

export const TopicItem: React.FC<TopicItemProps> = ({ topic, showSubject, onViewDetail }) => {
  const cat = categoryMeta[topic.category];
  const subject = subjects.find(s => s.id === topic.subjectId);
  const hasContent = !!topic.content && topic.content.trim().length > 0;

  return (
    <div
      className={cn(
        'flex w-full items-center gap-3 rounded-xl border bg-white px-4 py-3 transition-all',
        hasContent
          ? 'border-slate-100 hover:border-slate-200 hover:shadow-sm'
          : 'border-slate-100'
      )}
    >
      {/* Star */}
      {topic.important && (
        <Star size={12} className="shrink-0 fill-amber-400 text-amber-400" />
      )}

      {/* Title & badges */}
      <div className="min-w-0 flex-1">
        <h3
          className={cn(
            'truncate text-sm font-medium',
            hasContent ? 'text-slate-800' : 'text-slate-500'
          )}
        >
          {topic.title}
        </h3>
        <div className="mt-1 flex items-center gap-2">
          <span
            className={cn(
              'inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-medium',
              cat.color
            )}
          >
            {cat.icon}
            {cat.label}
          </span>
          {showSubject && subject && (
            <span className="text-[10px] text-slate-400">
              {subject.icon} {subject.name}
            </span>
          )}
        </div>
      </div>

      {/* View more button — only if topic has content */}
      {hasContent && onViewDetail && (
        <button
          onClick={() => onViewDetail(topic)}
          className="flex shrink-0 items-center gap-1.5 rounded-lg bg-blue-50 px-3 py-1.5 text-[11px] font-medium text-blue-600 transition-colors hover:bg-blue-100 active:scale-95"
        >
          <Eye size={12} />
          View
        </button>
      )}
    </div>
  );
};
