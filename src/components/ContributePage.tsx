import { ArrowLeft, Mail, FileText, Image, BookOpen, Send, Heart, CheckCircle2 } from 'lucide-react';

interface ContributePageProps {
  onBack: () => void;
}

export function ContributePage({ onBack }: ContributePageProps) {
  const email = 'your.email@gmail.com'; // ← Change this to your actual email

  return (
    <div className="max-w-2xl animate-fade-up">
      <div className="mb-8">
        <button onClick={onBack} className="mb-4 flex items-center gap-1.5 text-xs text-zinc-400 dark:text-zinc-500 transition-colors hover:text-violet-600 dark:hover:text-violet-400 cursor-pointer">
          <ArrowLeft size={14} /> Back
        </button>
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-50 dark:bg-emerald-500/10">
            <Heart size={22} className="text-emerald-500" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">Contribute</h1>
            <p className="text-sm text-zinc-400 dark:text-zinc-500">Help your batchmates by sharing resources</p>
          </div>
        </div>
      </div>

      <section className="mb-8">
        <h2 className="mb-4 text-sm font-semibold text-zinc-700 dark:text-zinc-300">What you can share</h2>
        <div className="grid gap-3 sm:grid-cols-2">
          {[
            { icon: FileText, color: 'bg-sky-50 dark:bg-sky-500/10 text-sky-500', title: 'PYQs', desc: 'Previous year question papers — photos or PDFs' },
            { icon: Image, color: 'bg-violet-50 dark:bg-violet-500/10 text-violet-500', title: 'Histology Slides', desc: 'Labelled histology images or microscope photos' },
            { icon: BookOpen, color: 'bg-amber-50 dark:bg-amber-500/10 text-amber-500', title: 'Scanned Notes', desc: 'Handwritten notes, mnemonics, summary sheets' },
            { icon: CheckCircle2, color: 'bg-emerald-50 dark:bg-emerald-500/10 text-emerald-500', title: 'Corrections', desc: 'Found a mistake? Wrong chapter? Let us know' },
          ].map(item => (
            <div key={item.title} className="rounded-2xl border border-zinc-100 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-5 transition-all duration-200 hover:border-zinc-200 dark:hover:border-zinc-700">
              <div className={`mb-3 flex h-10 w-10 items-center justify-center rounded-xl ${item.color}`}>
                <item.icon size={18} />
              </div>
              <h3 className="text-sm font-semibold text-zinc-800 dark:text-zinc-200">{item.title}</h3>
              <p className="mt-1 text-xs leading-relaxed text-zinc-400 dark:text-zinc-500">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mb-8">
        <h2 className="mb-4 text-sm font-semibold text-zinc-700 dark:text-zinc-300">How to send</h2>
        <div className="rounded-2xl border border-zinc-100 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-6">
          <div className="space-y-5">
            <div className="flex gap-4">
              <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-zinc-100 dark:bg-zinc-800 text-xs font-bold text-zinc-500 dark:text-zinc-400">1</div>
              <div>
                <p className="text-sm font-medium text-zinc-800 dark:text-zinc-200">Send an email to</p>
                <a href={`mailto:${email}?subject=MBBS Resource Contribution`} className="mt-1.5 inline-flex items-center gap-2 rounded-xl bg-violet-50 dark:bg-violet-500/10 px-4 py-2.5 text-sm font-medium text-violet-700 dark:text-violet-400 transition-colors hover:bg-violet-100 dark:hover:bg-violet-500/20">
                  <Mail size={16} /> {email}
                </a>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-zinc-100 dark:bg-zinc-800 text-xs font-bold text-zinc-500 dark:text-zinc-400">2</div>
              <div>
                <p className="text-sm font-medium text-zinc-800 dark:text-zinc-200">Include these details</p>
                <div className="mt-2 space-y-1.5">
                  {['Subject — Anatomy, Physiology, etc.', 'Chapter — Upper Limb, CVS, etc.', 'Type — PYQ / Notes / Histology / Topic', 'Year — Which exam year (for PYQs)'].map(item => (
                    <div key={item} className="flex items-center gap-2 text-xs text-zinc-500 dark:text-zinc-400">
                      <div className="h-1 w-1 rounded-full bg-zinc-300 dark:bg-zinc-600" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-zinc-100 dark:bg-zinc-800 text-xs font-bold text-zinc-500 dark:text-zinc-400">3</div>
              <div>
                <p className="text-sm font-medium text-zinc-800 dark:text-zinc-200">Attach files</p>
                <p className="mt-1 text-xs text-zinc-400 dark:text-zinc-500">PDFs, images, photos of notes — anything works</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="mb-4 text-sm font-semibold text-zinc-700 dark:text-zinc-300">Example email</h2>
        <div className="rounded-2xl border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800/50 p-5">
          <div className="space-y-2 text-sm text-zinc-600 dark:text-zinc-400">
            <p><span className="text-xs font-semibold uppercase text-zinc-400 dark:text-zinc-500">Subject: </span>Anatomy PYQ 2024</p>
            <div className="border-t border-zinc-200 dark:border-zinc-700 pt-2">
              <p>Hi,</p>
              <p className="mt-2">Sharing Anatomy PYQ from 2024 annual exam.</p>
              <p className="mt-1">Subject: Anatomy</p>
              <p>Chapter: Upper Limb + Thorax</p>
              <p>Type: PYQ</p>
              <p className="mt-2">Attached the scanned paper (3 pages).</p>
              <p className="mt-2 text-zinc-400 dark:text-zinc-500">— Your Name</p>
            </div>
          </div>
        </div>
      </section>

      <section className="mb-6 rounded-2xl border border-violet-100 dark:border-violet-500/10 bg-gradient-to-b from-violet-50/80 dark:from-violet-500/5 to-white dark:to-zinc-900 p-6 text-center">
        <div className="mb-3 text-3xl">📬</div>
        <h2 className="mb-2 text-lg font-semibold text-zinc-900 dark:text-zinc-50">Every contribution helps</h2>
        <p className="mx-auto mb-5 max-w-sm text-sm leading-relaxed text-zinc-500 dark:text-zinc-400">
          Even a single PYQ photo or a page of notes can save someone hours of searching. Your name will be credited.
        </p>
        <a
          href={`mailto:${email}?subject=MBBS Resource Contribution`}
          className="inline-flex items-center gap-2 rounded-xl bg-zinc-800 dark:bg-zinc-100 px-6 py-3 text-sm font-medium text-white dark:text-zinc-900 transition-all duration-200 hover:bg-zinc-700 dark:hover:bg-zinc-200 active:scale-[0.98] cursor-pointer"
        >
          <Send size={16} /> Send via Email
        </a>
      </section>
    </div>
  );
}
