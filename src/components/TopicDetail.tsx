import React, { useState } from 'react';
import { ArrowLeft, Printer, Star, ZoomIn, X } from 'lucide-react';
import { type Topic, subjects, units, categories } from '../data/index';
import { MarkdownRenderer } from './MarkdownRenderer';


interface TopicDetailProps {
  topic: Topic;
  onBack: () => void;
}

export const TopicDetail: React.FC<TopicDetailProps> = ({ topic, onBack }) => {
  const [zoomedImage, setZoomedImage] = useState<string | null>(null);
  const subject = subjects.find(s => s.id === topic.subjectId);
  const unit = units.find(u => u.id === topic.unitId);
  const cat = categories.find(c => c.id === topic.category);

  const handlePrint = () => window.print();

  return (
    <div>
      {/* Top bar */}
      <div className="mb-6 flex items-center justify-between no-print">
        <button
          onClick={onBack}
          className="flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-sm font-medium text-stone-500 dark:text-neutral-400 transition-colors hover:bg-stone-100 dark:hover:bg-neutral-800 hover:text-stone-700 dark:hover:text-neutral-200"
        >
          <ArrowLeft size={15} />
          Back
        </button>

        {topic.content && (
          <button
            onClick={handlePrint}
            className="flex items-center gap-1.5 rounded-lg bg-stone-100 dark:bg-neutral-800 px-3 py-1.5 text-sm font-medium text-stone-600 dark:text-neutral-300 transition-colors hover:bg-stone-200 dark:hover:bg-neutral-700"
          >
            <Printer size={14} />
            Save as PDF
          </button>
        )}
      </div>

      {/* Printable area */}
      <div id="print-area">
        {/* Print header */}
        <div className="print-only border-b border-stone-200 pb-3 mb-4">
          <p className="text-[10px] uppercase tracking-widest text-stone-400 font-semibold">MBBS Resources</p>
        </div>

        {/* Breadcrumb */}
        <div className="mb-3 flex items-center gap-1.5 text-xs text-stone-400 dark:text-neutral-500">
          {subject && <span>{subject.icon} {subject.name}</span>}
          {unit && (
            <>
              <span className="text-stone-300 dark:text-neutral-600">›</span>
              <span>{unit.name}</span>
            </>
          )}
        </div>

        {/* Title */}
        <div className="mb-6">
          <div className="flex items-start gap-3">
            <div className="flex-1">
              <h1 className="text-2xl font-bold tracking-tight text-stone-900 dark:text-neutral-50">
                {topic.title}
              </h1>
              <div className="mt-2 flex flex-wrap items-center gap-2">
                {cat && (
                  <span className="rounded-full bg-stone-100 dark:bg-neutral-800 px-2.5 py-0.5 text-[11px] font-medium text-stone-500 dark:text-neutral-400">
                    {cat.icon} {cat.name}
                  </span>
                )}
                {topic.important && (
                  <span className="flex items-center gap-1 rounded-full bg-amber-50 dark:bg-amber-900/20 px-2.5 py-0.5 text-[11px] font-medium text-amber-700 dark:text-amber-400">
                    <Star size={10} className="fill-amber-400 text-amber-400" />
                    Very Important
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        {topic.content ? (
          <div className="topic-content">
            <div className="rounded-2xl border border-stone-100 dark:border-neutral-800 bg-white dark:bg-neutral-900 p-5 sm:p-7">
              <MarkdownRenderer
                content={topic.content}
                onImageClick={(src) => setZoomedImage(src)}
              />
            </div>

            {/* Tip for histology/radiology */}
            {(topic.category === 'histology' || topic.category === 'radiology') && (
              <p className="mt-3 text-center text-xs text-stone-400 dark:text-neutral-500 no-print">
                <ZoomIn size={12} className="mr-1 inline" />
                Click any image to zoom in
              </p>
            )}
          </div>
        ) : (
          <div className="rounded-2xl border border-stone-100 dark:border-neutral-800 bg-white dark:bg-neutral-900 p-8 text-center">
            <p className="text-sm text-stone-400 dark:text-neutral-500">No notes added yet</p>
          </div>
        )}

        {/* Credits — below content */}
        {topic.content && (topic.by || topic.editor) && (
          <div className="credits-section mt-5 border-t border-stone-100 dark:border-neutral-800 pt-4">
            <div className="flex flex-wrap items-center gap-4 text-xs text-stone-400 dark:text-neutral-500">
              {topic.by && (
                <span>
                  <span className="font-medium text-stone-500 dark:text-neutral-400">Contributor</span>{' '}
                  {topic.by}
                </span>
              )}
              {topic.editor && (
                <span>
                  <span className="font-medium text-stone-500 dark:text-neutral-400">Editor</span>{' '}
                  {topic.editor}
                </span>
              )}
            </div>
          </div>
        )}

        {/* Print footer */}
        <div className="print-only border-t border-stone-200 pt-3 mt-8">
          <p className="text-[9px] text-stone-400 text-center">
            MBBS Resources
            {subject ? ` · ${subject.name}` : ''}
            {unit ? ` · ${unit.name}` : ''}
            {' · For personal study use only'}
          </p>
        </div>
      </div>

      {/* Image zoom modal */}
      {zoomedImage && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 no-print"
          onClick={() => setZoomedImage(null)}
        >
          <button
            className="absolute right-4 top-4 rounded-full bg-white/10 p-2 text-white hover:bg-white/20"
            onClick={() => setZoomedImage(null)}
          >
            <X size={20} />
          </button>
          <img
            src={zoomedImage}
            alt="Zoomed"
            className="max-h-[90vh] max-w-[90vw] rounded-lg object-contain"
            draggable={false}
          />
        </div>
      )}
    </div>
  );
};
