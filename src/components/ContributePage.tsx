import { ArrowLeft, Mail, FileText, Image, BookOpen, Send, Heart, CheckCircle2 } from 'lucide-react';

interface ContributePageProps {
  onBack: () => void;
}

export function ContributePage({ onBack }: ContributePageProps) {
  const email = 'your.email@gmail.com'; // ← Change this to your actual email

  return (
    <div className="max-w-2xl">
      {/* Header */}
      <div className="mb-8">
        <button
          onClick={onBack}
          className="mb-4 flex items-center gap-1.5 text-xs text-stone-400 dark:text-neutral-500 transition-colors hover:text-stone-600 dark:hover:text-neutral-300"
        >
          <ArrowLeft size={14} />
          Back
        </button>

        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-50 dark:bg-emerald-900/20">
            <Heart size={22} className="text-emerald-500 dark:text-emerald-400" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-stone-900 dark:text-neutral-50">Contribute</h1>
            <p className="text-sm text-stone-400 dark:text-neutral-500">
              Help your batchmates by sharing resources
            </p>
          </div>
        </div>
      </div>

      {/* What you can share */}
      <section className="mb-8">
        <h2 className="mb-4 text-sm font-semibold text-stone-700 dark:text-neutral-300">What you can share</h2>
        <div className="grid gap-3 sm:grid-cols-2">
          <div className="rounded-2xl border border-stone-100 dark:border-neutral-800 bg-white dark:bg-neutral-900 p-5 transition-colors hover:border-stone-200 dark:hover:border-neutral-700">
            <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 dark:bg-blue-900/20">
              <FileText size={18} className="text-blue-500 dark:text-blue-400" />
            </div>
            <h3 className="text-sm font-semibold text-stone-800 dark:text-neutral-200">PYQs</h3>
            <p className="mt-1 text-xs leading-relaxed text-stone-400 dark:text-neutral-500">
              Previous year question papers — photos or PDFs
            </p>
          </div>

          <div className="rounded-2xl border border-stone-100 dark:border-neutral-800 bg-white dark:bg-neutral-900 p-5 transition-colors hover:border-stone-200 dark:hover:border-neutral-700">
            <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-violet-50 dark:bg-violet-900/20">
              <Image size={18} className="text-violet-500 dark:text-violet-400" />
            </div>
            <h3 className="text-sm font-semibold text-stone-800 dark:text-neutral-200">Histology Slides</h3>
            <p className="mt-1 text-xs leading-relaxed text-stone-400 dark:text-neutral-500">
              Labelled histology images or microscope photos
            </p>
          </div>

          <div className="rounded-2xl border border-stone-100 dark:border-neutral-800 bg-white dark:bg-neutral-900 p-5 transition-colors hover:border-stone-200 dark:hover:border-neutral-700">
            <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-amber-50 dark:bg-amber-900/20">
              <BookOpen size={18} className="text-amber-500 dark:text-amber-400" />
            </div>
            <h3 className="text-sm font-semibold text-stone-800 dark:text-neutral-200">Scanned Notes</h3>
            <p className="mt-1 text-xs leading-relaxed text-stone-400 dark:text-neutral-500">
              Handwritten notes, mnemonics, summary sheets
            </p>
          </div>

          <div className="rounded-2xl border border-stone-100 dark:border-neutral-800 bg-white dark:bg-neutral-900 p-5 transition-colors hover:border-stone-200 dark:hover:border-neutral-700">
            <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 dark:bg-emerald-900/20">
              <CheckCircle2 size={18} className="text-emerald-500 dark:text-emerald-400" />
            </div>
            <h3 className="text-sm font-semibold text-stone-800 dark:text-neutral-200">Corrections</h3>
            <p className="mt-1 text-xs leading-relaxed text-stone-400 dark:text-neutral-500">
              Found a mistake? Wrong chapter? Let us know
            </p>
          </div>
        </div>
      </section>

      {/* How to send */}
      <section className="mb-8">
        <h2 className="mb-4 text-sm font-semibold text-stone-700 dark:text-neutral-300">How to send</h2>
        <div className="rounded-2xl border border-stone-100 dark:border-neutral-800 bg-white dark:bg-neutral-900 p-6">
          <div className="space-y-5">
            <div className="flex gap-4">
              <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-stone-100 dark:bg-neutral-800 text-xs font-bold text-stone-500 dark:text-neutral-400">
                1
              </div>
              <div>
                <p className="text-sm font-medium text-stone-800 dark:text-neutral-200">
                  Send an email to
                </p>
                <a
                  href={`mailto:${email}?subject=MBBS Resource Contribution`}
                  className="mt-1.5 inline-flex items-center gap-2 rounded-xl bg-amber-50 dark:bg-amber-900/20 px-4 py-2.5 text-sm font-medium text-amber-700 dark:text-amber-400 transition-colors hover:bg-amber-100 dark:hover:bg-amber-900/30"
                >
                  <Mail size={16} />
                  {email}
                </a>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-stone-100 dark:bg-neutral-800 text-xs font-bold text-stone-500 dark:text-neutral-400">
                2
              </div>
              <div>
                <p className="text-sm font-medium text-stone-800 dark:text-neutral-200">
                  Include these details
                </p>
                <div className="mt-2 space-y-1.5">
                  <div className="flex items-center gap-2 text-xs text-stone-500 dark:text-neutral-400">
                    <div className="h-1 w-1 rounded-full bg-stone-300 dark:bg-neutral-600" />
                    <span><strong className="text-stone-600 dark:text-neutral-300">Subject</strong> — Anatomy, Physiology, etc.</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-stone-500 dark:text-neutral-400">
                    <div className="h-1 w-1 rounded-full bg-stone-300 dark:bg-neutral-600" />
                    <span><strong className="text-stone-600 dark:text-neutral-300">Chapter</strong> — Upper Limb, CVS, etc.</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-stone-500 dark:text-neutral-400">
                    <div className="h-1 w-1 rounded-full bg-stone-300 dark:bg-neutral-600" />
                    <span><strong className="text-stone-600 dark:text-neutral-300">Type</strong> — PYQ / Notes / Histology / Topic</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-stone-500 dark:text-neutral-400">
                    <div className="h-1 w-1 rounded-full bg-stone-300 dark:bg-neutral-600" />
                    <span><strong className="text-stone-600 dark:text-neutral-300">Year</strong> — Which exam year (for PYQs)</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-stone-100 dark:bg-neutral-800 text-xs font-bold text-stone-500 dark:text-neutral-400">
                3
              </div>
              <div>
                <p className="text-sm font-medium text-stone-800 dark:text-neutral-200">
                  Attach files
                </p>
                <p className="mt-1 text-xs text-stone-400 dark:text-neutral-500">
                  PDFs, images, photos of notes — anything works
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Example email */}
      <section className="mb-8">
        <h2 className="mb-4 text-sm font-semibold text-stone-700 dark:text-neutral-300">Example email</h2>
        <div className="rounded-2xl border border-stone-200 dark:border-neutral-700 bg-stone-50 dark:bg-neutral-800/50 p-5">
          <div className="space-y-2 text-sm text-stone-600 dark:text-neutral-400">
            <p>
              <span className="text-xs font-semibold uppercase text-stone-400 dark:text-neutral-500">Subject: </span>
              Anatomy PYQ 2024
            </p>
            <div className="border-t border-stone-200 dark:border-neutral-700 pt-2">
              <p>Hi,</p>
              <p className="mt-2">Sharing Anatomy PYQ from 2024 annual exam.</p>
              <p className="mt-1">Subject: Anatomy</p>
              <p>Chapter: Upper Limb + Thorax</p>
              <p>Type: PYQ</p>
              <p className="mt-2">Attached the scanned paper (3 pages).</p>
              <p className="mt-2 text-stone-400 dark:text-neutral-500">— Your Name</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="mb-6 rounded-2xl border border-emerald-100 dark:border-emerald-900/30 bg-gradient-to-b from-emerald-50/80 dark:from-emerald-900/10 to-white dark:to-neutral-900 p-6 text-center">
        <div className="mb-3 text-3xl">📬</div>
        <h2 className="mb-2 text-lg font-semibold text-stone-900 dark:text-neutral-50">Every contribution helps</h2>
        <p className="mx-auto mb-5 max-w-sm text-sm leading-relaxed text-stone-500 dark:text-neutral-400">
          Even a single PYQ photo or a page of notes can save someone hours of searching. Your name will be credited.
        </p>
        <a
          href={`mailto:${email}?subject=MBBS Resource Contribution`}
          className="inline-flex items-center gap-2 rounded-xl bg-stone-800 dark:bg-neutral-100 px-6 py-3 text-sm font-medium text-white dark:text-neutral-900 transition-colors hover:bg-stone-700 dark:hover:bg-neutral-200 active:scale-[0.98]"
        >
          <Send size={16} />
          Send via Email
        </a>
      </section>
    </div>
  );
}
