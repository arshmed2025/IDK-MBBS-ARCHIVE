import { useState } from 'react';
import {
  ArrowLeft,
  Star,
  BookOpen,
  FileText,
  FileDown,
  Microscope,
  ScanLine,
  PenLine,
  X,
  ZoomIn,
  Printer,
} from 'lucide-react';
import type { Topic, CategoryId } from '../data/content';
import { subjects, units } from '../data/content';
import { MarkdownRenderer } from './MarkdownRenderer';
import { cn } from '../utils/cn';

interface TopicDetailProps {
  topic: Topic;
  onBack: () => void;
}

const categoryMeta: Record<
  CategoryId,
  { icon: React.ReactNode; label: string; color: string; bg: string }
> = {
  topics: {
    icon: <BookOpen size={14} />,
    label: 'Topic',
    color: 'text-blue-600',
    bg: 'bg-blue-50',
  },
  pyq_pdfs: {
    icon: <FileDown size={14} />,
    label: 'PYQ PDF',
    color: 'text-rose-600',
    bg: 'bg-rose-50',
  },
  pyqs: {
    icon: <FileText size={14} />,
    label: 'Previous Year Question',
    color: 'text-violet-600',
    bg: 'bg-violet-50',
  },
  histology: {
    icon: <Microscope size={14} />,
    label: 'Histology',
    color: 'text-emerald-600',
    bg: 'bg-emerald-50',
  },
  radiology: {
    icon: <ScanLine size={14} />,
    label: 'Radiology',
    color: 'text-cyan-600',
    bg: 'bg-cyan-50',
  },
  notes: {
    icon: <PenLine size={14} />,
    label: 'Notes',
    color: 'text-orange-600',
    bg: 'bg-orange-50',
  },
};

export const TopicDetail: React.FC<TopicDetailProps> = ({ topic, onBack }) => {
  const [zoomedImage, setZoomedImage] = useState<string | null>(null);
  const subject = subjects.find((s) => s.id === topic.subjectId);
  const unit = units.find((u) => u.id === topic.unitId);
  const cat = categoryMeta[topic.category];

  const handlePrint = () => {
    window.print();
  };

  return (
    <>
      <div className="mx-auto max-w-3xl">
        {/* Top bar */}
        <div className="no-print mb-5 flex items-center justify-between">
          <button
            onClick={onBack}
            className="flex items-center gap-2 rounded-lg px-2 py-1.5 text-sm text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-600"
          >
            <ArrowLeft size={16} />
            Back
          </button>

          {topic.content && (
            <button
              onClick={handlePrint}
              className="flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-sm text-slate-500 shadow-sm transition-all hover:border-slate-300 hover:bg-slate-50 hover:text-slate-700"
            >
              <Printer size={15} />
              Save as PDF
            </button>
          )}
        </div>

        {/* Printable area */}
        <div id="print-area">
          {/* Print header */}
          <div className="print-only">
            <p className="text-[7.5pt] uppercase tracking-[0.05em] text-gray-400">MBBS Resources</p>
            <div className="mb-4 mt-1 border-b border-gray-200" />
          </div>

          {/* Breadcrumb */}
          <div className="mb-3 flex flex-wrap items-center gap-1.5 text-xs text-slate-400">
            {subject && (
              <>
                <span>{subject.icon} {subject.name}</span>
                <span className="text-slate-300">/</span>
              </>
            )}
            {unit && (
              <>
                <span>{unit.name}</span>
                <span className="text-slate-300">/</span>
              </>
            )}
            <span className="text-slate-500">{topic.title}</span>
          </div>

          {/* Title */}
          <h1 className="mb-3 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
            {topic.title}
          </h1>

          {/* Meta badges */}
          <div className="mb-6 flex flex-wrap items-center gap-2">
            <span className={cn('inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium', cat.bg, cat.color)}>
              {cat.icon}
              {cat.label}
            </span>
            {topic.important && (
              <span className="inline-flex items-center gap-1 rounded-full bg-amber-50 px-3 py-1 text-xs font-medium text-amber-600">
                <Star size={12} className="fill-amber-400" />
                Very Important
              </span>
            )}
          </div>

          {/* Divider */}
          <div className="mb-6 border-t border-slate-100" />

          {/* Content */}
          <div className="topic-content">
            {topic.content ? (
              <MarkdownRenderer
                content={topic.content}
                onImageClick={(src) => setZoomedImage(src)}
              />
            ) : (
              <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-slate-200 py-16 text-center">
                <p className="text-sm text-slate-400">No notes added yet</p>
                <p className="mt-1 text-xs text-slate-300">
                  Content will appear here when added
                </p>
              </div>
            )}
          </div>

          {/* Tip for histology/radiology */}
          {(topic.category === 'histology' || topic.category === 'radiology') && topic.content && (
            <div className="no-print mt-8 rounded-xl border border-emerald-100 bg-emerald-50/50 px-4 py-3">
              <p className="text-xs text-emerald-700">
                <ZoomIn size={12} className="mr-1.5 inline" />
                <strong>Tip:</strong> Click on any image to zoom in and study details.
              </p>
            </div>
          )}

          {/* Print footer */}
          <div className="print-only mt-10">
            <div className="border-t border-gray-200 pb-2" />
            <p className="text-center text-[7pt] tracking-[0.02em] text-gray-400">
              MBBS Resources &middot; {subject?.name}
              {unit ? ` \u00B7 ${unit.name}` : ''} &middot; For personal study use only
            </p>
          </div>
        </div>
      </div>

      {/* Image zoom overlay */}
      {zoomedImage && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm"
          onClick={() => setZoomedImage(null)}
        >
          <button
            onClick={() => setZoomedImage(null)}
            className="absolute right-4 top-4 rounded-full bg-white/10 p-2 text-white transition-colors hover:bg-white/20"
          >
            <X size={20} />
          </button>
          <img
            src={zoomedImage}
            alt="Zoomed view"
            className="max-h-[90vh] max-w-[95vw] rounded-lg object-contain shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </>
  );
};
