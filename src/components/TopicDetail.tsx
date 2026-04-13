import React, { useState } from 'react';
import { ArrowLeft, Printer, Star, ZoomIn, X } from 'lucide-react';
import { type Topic, subjects, units } from '../data/index';
import { MarkdownRenderer } from './MarkdownRenderer';
import { cn } from '../utils/cn';

interface TopicDetailProps {
  topic: Topic;
  onBack: () => void;
}

const catLabels: Record<string, string> = {
  topics: 'T',
  pyq_pdfs: 'PYQ PDFs',
  pyqs: 'PYQs',
  notes: 'N',
  histology: 'H',
  radiology: 'R',
};

const catColors: Record<string, string> = {
  topics: 'bg-sky-100 text-sky-700 dark:bg-sky-500/10 dark:text-sky-400',
  pyq_pdfs: 'bg-rose-100 text-rose-700 dark:bg-rose-500/10 dark:text-rose-400',
  pyqs: 'bg-purple-100 text-purple-700 dark:bg-purple-500/10 dark:text-purple-400',
  histology: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400',
  radiology: 'bg-cyan-100 text-cyan-700 dark:bg-cyan-500/10 dark:text-cyan-400',
  notes: 'bg-orange-100 text-orange-700 dark:bg-orange-500/10 dark:text-orange-400',
};

export const TopicDetail: React.FC<TopicDetailProps> = ({ topic, onBack }) => {
  const [zoomedImage, setZoomedImage] = useState<string | null>(null);
  const [videoModal, setVideoModal] = useState<{ url: string; title: string } | null>(null);
  const [pdfModal, setPdfModal]     = useState<{ url: string; title: string } | null>(null);
  const subject = subjects.find(s => s.id === topic.subjectId);
  const unit = units.find(u => u.id === topic.unitId);

  const handlePrint = () => window.print();

  return (
    <div className="animate-fade-up">
      {/* Top bar */}
      <div className="flex items-center justify-between mb-6 no-print">
        <button
          onClick={onBack}
          className="flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-sm text-zinc-500 dark:text-zinc-400 transition-all duration-200 hover:text-violet-600 dark:hover:text-violet-400 hover:bg-violet-50 dark:hover:bg-violet-500/10 cursor-pointer"
        >
          <ArrowLeft size={15} />
          Back
        </button>
        <button
          onClick={handlePrint}
          className="flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-sm text-zinc-500 dark:text-zinc-400 transition-all duration-200 hover:text-violet-600 dark:hover:text-violet-400 hover:bg-violet-50 dark:hover:bg-violet-500/10 cursor-pointer"
        >
          <Printer size={15} />
          Save as PDF
        </button>
      </div>

      {/* Content Card */}
      <div id="print-area" className="rounded-2xl border border-zinc-200/90 dark:border-zinc-800/90 bg-white/95 dark:bg-zinc-900/95 shadow-[0_4px_24px_-8px_rgb(0_0_0/0.08)] dark:shadow-[0_4px_32px_-12px_rgb(0_0_0/0.45)] overflow-hidden ring-1 ring-black/[0.03] dark:ring-white/[0.06]">
        {/* Print header */}
        <div className="print-only hidden px-6 py-3 border-b border-zinc-200 text-xs text-zinc-500">
          MBBS RESOURCES
        </div>

        {/* Header */}
        <div className="relative px-6 pt-6 pb-4 border-b border-zinc-100 dark:border-zinc-800 bg-gradient-to-b from-violet-50/40 to-transparent dark:from-violet-500/[0.06] dark:to-transparent">
          {/* Breadcrumb */}
          <div className="flex items-center gap-1.5 text-xs text-zinc-400 dark:text-zinc-500 mb-3">
            <span>{subject?.icon}</span>
            <span>{subject?.name}</span>
            <span>›</span>
            <span>{unit?.name}</span>
          </div>

          <h1 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100 mb-3">
            {topic.title}
          </h1>

          <div className="flex flex-wrap items-center gap-2">
            <span className={cn('rounded-full px-2.5 py-0.5 text-xs font-medium', catColors[topic.category])}>
              {catLabels[topic.category] || topic.category}
            </span>
            {topic.important && (
              <span className="flex items-center gap-1 rounded-full bg-amber-50 dark:bg-amber-500/10 px-2.5 py-0.5 text-xs font-medium text-amber-600 dark:text-amber-400">
                <Star size={10} className="fill-amber-400 text-amber-400" />
                Very Important
              </span>
            )}
          </div>
        </div>

        {/* Body */}
        <div className="px-6 py-5">
          {topic.content ? (
            <MarkdownRenderer
              content={topic.content}
              onImageClick={(src) => setZoomedImage(src)}
              onVideoClick={(url, title) => setVideoModal({ url, title })}
              onPdfClick={(url, title) => setPdfModal({ url, title })}
            />
          ) : (
            <p className="text-sm text-zinc-400 dark:text-zinc-500 italic">No notes added yet.</p>
          )}

          {/* Tip for visual content */}
          {(topic.category === 'histology' || topic.category === 'radiology') && topic.content && (
            <div className="mt-5 flex items-center gap-2 rounded-lg bg-violet-50 dark:bg-violet-500/10 px-4 py-2.5 text-xs text-violet-600 dark:text-violet-400 no-print">
              <ZoomIn size={14} />
              Click any image to zoom in
            </div>
          )}
        </div>

        {/* Credits */}
        {topic.content && (topic.by || topic.editor) && (
          <div className="px-6 pb-5">
            <div className="border-t border-zinc-100 dark:border-zinc-800 pt-4 flex flex-wrap gap-x-5 gap-y-1 text-xs text-zinc-400 dark:text-zinc-500">
              {topic.by && (
                <span>
                  <span className="font-medium text-zinc-500 dark:text-zinc-400">Contributor</span>{' '}
                  {topic.by}
                </span>
              )}
              {topic.editor && (
                <span>
                  <span className="font-medium text-zinc-500 dark:text-zinc-400">Editor</span>{' '}
                  {topic.editor}
                </span>
              )}
            </div>
          </div>
        )}

        {/* Print footer */}
        <div className="print-only hidden px-6 py-3 border-t border-zinc-200 text-[10px] text-zinc-400 text-center">
          MBBS Resources · {subject?.name} · {unit?.name} · For personal study use only
        </div>
      </div>

      {/* Zoomed image overlay */}
      {zoomedImage && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 no-print"
          onClick={() => setZoomedImage(null)}
        >
          <button
            className="absolute top-4 right-4 rounded-full bg-white/10 p-2 text-white hover:bg-white/20 transition-colors cursor-pointer"
            onClick={() => setZoomedImage(null)}
          >
            <X size={20} />
          </button>
          <img
            src={zoomedImage}
            alt="Zoomed"
            className="max-h-[90vh] max-w-[90vw] rounded-xl object-contain"
            draggable={false}
          />
        </div>
      )}

      {/* Video modal */}
      {videoModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 no-print"
          onClick={() => setVideoModal(null)}
        >
          <div className="relative w-full max-w-3xl" onClick={e => e.stopPropagation()}>
            <div className="mb-3 flex items-center justify-between">
              <p className="text-sm font-semibold text-white">{videoModal.title}</p>
              <button
                type="button"
                title="Close video"
                onClick={() => setVideoModal(null)}
                className="rounded-full bg-white/10 p-1.5 text-white hover:bg-white/20 transition-colors cursor-pointer"
              >
                <X size={18} />
              </button>
            </div>
            <video controls autoPlay className="w-full rounded-xl" src={videoModal.url} />
          </div>
        </div>
      )}

      {/* PDF modal */}
      {pdfModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 no-print"
          onClick={() => setPdfModal(null)}
        >
          <div
            className="relative flex h-[85vh] w-full max-w-4xl flex-col"
            onClick={e => e.stopPropagation()}
          >
            <div className="mb-3 flex items-center justify-between">
              <p className="text-sm font-semibold text-white">{pdfModal.title}</p>
              <button
                type="button"
                title="Close PDF"
                onClick={() => setPdfModal(null)}
                className="rounded-full bg-white/10 p-1.5 text-white hover:bg-white/20 transition-colors cursor-pointer"
              >
                <X size={18} />
              </button>
            </div>
            <iframe
              src={pdfModal.url.replace('/view', '/preview')}
              className="h-full w-full rounded-xl border-0"
              title={pdfModal.title}
            />
          </div>
        </div>
      )}
    </div>
  );
};
