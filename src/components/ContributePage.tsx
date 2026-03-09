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
          className="mb-4 flex items-center gap-1.5 text-xs text-slate-400 transition-colors hover:text-slate-600"
        >
          <ArrowLeft size={14} />
          Back
        </button>

        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-50">
            <Heart size={22} className="text-emerald-500" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Contribute</h1>
            <p className="text-sm text-slate-400">
              Help your batchmates by sharing resources
            </p>
          </div>
        </div>
      </div>

      {/* What you can share */}
      <section className="mb-8">
        <h2 className="mb-4 text-sm font-semibold text-slate-700">What you can share</h2>
        <div className="grid gap-3 sm:grid-cols-2">
          <div className="rounded-2xl border border-slate-100 bg-white p-5 transition-colors hover:border-slate-200">
            <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50">
              <FileText size={18} className="text-blue-500" />
            </div>
            <h3 className="text-sm font-semibold text-slate-800">PYQs</h3>
            <p className="mt-1 text-xs leading-relaxed text-slate-400">
              Previous year question papers — photos or PDFs
            </p>
          </div>

          <div className="rounded-2xl border border-slate-100 bg-white p-5 transition-colors hover:border-slate-200">
            <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-violet-50">
              <Image size={18} className="text-violet-500" />
            </div>
            <h3 className="text-sm font-semibold text-slate-800">Histology Slides</h3>
            <p className="mt-1 text-xs leading-relaxed text-slate-400">
              Labelled histology images or microscope photos
            </p>
          </div>

          <div className="rounded-2xl border border-slate-100 bg-white p-5 transition-colors hover:border-slate-200">
            <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-amber-50">
              <BookOpen size={18} className="text-amber-500" />
            </div>
            <h3 className="text-sm font-semibold text-slate-800">Scanned Notes</h3>
            <p className="mt-1 text-xs leading-relaxed text-slate-400">
              Handwritten notes, mnemonics, summary sheets
            </p>
          </div>

          <div className="rounded-2xl border border-slate-100 bg-white p-5 transition-colors hover:border-slate-200">
            <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50">
              <CheckCircle2 size={18} className="text-emerald-500" />
            </div>
            <h3 className="text-sm font-semibold text-slate-800">Corrections</h3>
            <p className="mt-1 text-xs leading-relaxed text-slate-400">
              Found a mistake? Wrong chapter? Let us know
            </p>
          </div>
        </div>
      </section>

      {/* How to send */}
      <section className="mb-8">
        <h2 className="mb-4 text-sm font-semibold text-slate-700">How to send</h2>
        <div className="rounded-2xl border border-slate-100 bg-white p-6">
          <div className="space-y-5">
            {/* Step 1 */}
            <div className="flex gap-4">
              <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-slate-100 text-xs font-bold text-slate-500">
                1
              </div>
              <div>
                <p className="text-sm font-medium text-slate-800">
                  Send an email to
                </p>
                <a
                  href={`mailto:${email}?subject=MBBS Resource Contribution`}
                  className="mt-1.5 inline-flex items-center gap-2 rounded-xl bg-blue-50 px-4 py-2.5 text-sm font-medium text-blue-600 transition-colors hover:bg-blue-100"
                >
                  <Mail size={16} />
                  {email}
                </a>
              </div>
            </div>

            {/* Step 2 */}
            <div className="flex gap-4">
              <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-slate-100 text-xs font-bold text-slate-500">
                2
              </div>
              <div>
                <p className="text-sm font-medium text-slate-800">
                  Include these details
                </p>
                <div className="mt-2 space-y-1.5">
                  <div className="flex items-center gap-2 text-xs text-slate-500">
                    <div className="h-1 w-1 rounded-full bg-slate-300" />
                    <span><strong className="text-slate-600">Subject</strong> — Anatomy, Physiology, etc.</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-slate-500">
                    <div className="h-1 w-1 rounded-full bg-slate-300" />
                    <span><strong className="text-slate-600">Chapter</strong> — Upper Limb, CVS, etc.</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-slate-500">
                    <div className="h-1 w-1 rounded-full bg-slate-300" />
                    <span><strong className="text-slate-600">Type</strong> — PYQ / Notes / Histology / Topic</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-slate-500">
                    <div className="h-1 w-1 rounded-full bg-slate-300" />
                    <span><strong className="text-slate-600">Year</strong> — Which exam year (for PYQs)</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Step 3 */}
            <div className="flex gap-4">
              <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-slate-100 text-xs font-bold text-slate-500">
                3
              </div>
              <div>
                <p className="text-sm font-medium text-slate-800">
                  Attach files
                </p>
                <p className="mt-1 text-xs text-slate-400">
                  PDFs, images, photos of notes — anything works
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Example email */}
      <section className="mb-8">
        <h2 className="mb-4 text-sm font-semibold text-slate-700">Example email</h2>
        <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
          <div className="space-y-2 text-sm text-slate-600">
            <p>
              <span className="text-xs font-semibold uppercase text-slate-400">Subject: </span>
              Anatomy PYQ 2024
            </p>
            <div className="border-t border-slate-200 pt-2">
              <p>Hi,</p>
              <p className="mt-2">Sharing Anatomy PYQ from 2024 annual exam.</p>
              <p className="mt-1">Subject: Anatomy</p>
              <p>Chapter: Upper Limb + Thorax</p>
              <p>Type: PYQ</p>
              <p className="mt-2">Attached the scanned paper (3 pages).</p>
              <p className="mt-2 text-slate-400">— Your Name</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="mb-6 rounded-2xl border border-emerald-100 bg-gradient-to-b from-emerald-50/80 to-white p-6 text-center">
        <div className="mb-3 text-3xl">📬</div>
        <h2 className="mb-2 text-lg font-semibold text-slate-900">Every contribution helps</h2>
        <p className="mx-auto mb-5 max-w-sm text-sm leading-relaxed text-slate-500">
          Even a single PYQ photo or a page of notes can save someone hours of searching. Your name will be credited.
        </p>
        <a
          href={`mailto:${email}?subject=MBBS Resource Contribution`}
          className="inline-flex items-center gap-2 rounded-xl bg-slate-900 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-slate-800 active:scale-[0.98]"
        >
          <Send size={16} />
          Send via Email
        </a>
      </section>
    </div>
  );
}
