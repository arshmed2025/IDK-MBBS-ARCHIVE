import React, { useState, useEffect } from 'react';
import {
  Search,
  BookOpen,
  Star,
  Home,
  ChevronDown,
  ChevronRight,
  Mail,
  Sun,
  Moon,
  Monitor,
} from 'lucide-react';
import {
  years,
  getSubjectsByYear,
  getUnitsBySubject,
  getTopicsByUnit,
  getTopicsBySubject,
  type YearId,
  type CategoryId,
} from '../data/index';
import { cn } from '../utils/cn';
import { SubjectBadge } from '../utils/subjectColours';

export type ThemeMode = 'light' | 'dark' | 'system';

interface SidebarProps {
  activeYear: YearId;
  activeView: string;
  activeSubjectId: string | null;
  activeCategory: CategoryId | null;
  activeUnitId: string | null;
  onNavigate: (view: string, subjectId?: string | null, category?: CategoryId | null, unitId?: string | null) => void;
  onYearChange: (year: YearId) => void;
  searchQuery: string;
  onSearchChange: (q: string) => void;
  isOpen: boolean;
  onToggle: () => void;
  theme: ThemeMode;
  onThemeChange: (theme: ThemeMode) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeYear,
  activeView,
  activeSubjectId,
  activeCategory,
  activeUnitId,
  onNavigate,
  onYearChange,
  searchQuery,
  onSearchChange,
  isOpen,
  onToggle,
  theme,
  onThemeChange,
}) => {
  const yearSubjects = getSubjectsByYear(activeYear);
  const [expandedSubject, setExpandedSubject] = useState<string | null>(null);

  useEffect(() => {
    if (activeSubjectId) setExpandedSubject(activeSubjectId);
  }, [activeSubjectId]);

  const handleSubjectClick = (subjectId: string) => {
    if (expandedSubject === subjectId) {
      onNavigate('subject', subjectId);
    } else {
      setExpandedSubject(subjectId);
      onNavigate('subject', subjectId);
    }
  };

  const handleToggleExpand = (e: React.MouseEvent, subjectId: string) => {
    e.stopPropagation();
    setExpandedSubject(expandedSubject === subjectId ? null : subjectId);
  };

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/30 backdrop-blur-sm lg:hidden"
          onClick={onToggle}
        />
      )}

      <aside
        className={cn(
          'fixed left-0 top-0 z-40 flex h-full w-72 flex-col border-r transition-transform duration-300 lg:static lg:translate-x-0',
          'border-zinc-200/90 bg-zinc-50/90 backdrop-blur-xl',
          'dark:border-zinc-800/90 dark:bg-zinc-950/90',
          'lg:shadow-[4px_0_32px_-16px_rgb(0_0_0/0.08)] dark:lg:shadow-[4px_0_32px_-16px_rgb(0_0_0/0.35)]',
          isOpen ? 'translate-x-0' : '-translate-x-full'
        )}
      >
        {/* Header */}
        <div className="flex items-center gap-2.5 border-b border-zinc-200 dark:border-zinc-800 px-5 py-4">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-violet-500 to-purple-600 shadow-sm">
            <BookOpen size={14} className="text-white" />
          </div>
          <div>
            <h1 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">MBBS Resources</h1>
            <p className="text-[10px] text-zinc-400 dark:text-zinc-500">Organised study library</p>
          </div>
        </div>

        {/* Year Selector */}
        <div className="border-b border-zinc-200 dark:border-zinc-800 px-3 py-3">
          <div className="relative">
            <select
              value={activeYear}
              onChange={(e) => onYearChange(Number(e.target.value) as YearId)}
              className="w-full appearance-none rounded-lg bg-white dark:bg-zinc-800 px-3 py-2 pr-8 text-sm font-medium text-zinc-800 dark:text-zinc-200 shadow-sm ring-1 ring-zinc-200 dark:ring-zinc-700 focus:outline-none focus:ring-2 focus:ring-violet-500/40"
            >
              {years.map((y) => (
                <option key={y.id} value={y.id}>{y.label} — {y.subtitle}</option>
              ))}
            </select>
            <ChevronDown size={14} className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400" />
          </div>
        </div>

        {/* Search */}
        <div className="px-3 pt-3">
          <div className="flex items-center gap-2 rounded-xl border border-transparent bg-zinc-100/90 px-3 py-2 transition-colors focus-within:border-violet-300/50 focus-within:bg-white dark:bg-zinc-800/80 dark:focus-within:border-violet-500/30 dark:focus-within:bg-zinc-800">
            <Search size={14} className="shrink-0 text-zinc-400 dark:text-zinc-500" />
            <input
              type="text"
              placeholder="Search topics…"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="w-full min-w-0 bg-transparent text-sm text-zinc-700 dark:text-zinc-200 placeholder:text-zinc-400 dark:placeholder:text-zinc-500 focus:outline-none"
            />
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto px-3 py-3">
          {/* Quick Access */}
          <div className="mb-4">
            <p className="mb-1.5 px-2 text-[10px] font-semibold uppercase tracking-wider text-zinc-400 dark:text-zinc-500">
              Quick Access
            </p>
            <button
              onClick={() => onNavigate('home')}
              className={cn(
                'flex w-full items-center gap-2.5 rounded-lg px-2.5 py-1.5 text-sm transition-all duration-200',
                activeView === 'home'
                  ? 'bg-sky-50 dark:bg-sky-500/10 font-medium text-sky-700 dark:text-sky-400'
                  : 'text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800'
              )}
            >
              <Home size={15} className={activeView === 'home' ? 'text-violet-600 dark:text-violet-400' : 'text-zinc-400 dark:text-zinc-500'} />
              Overview
            </button>
            <button
              onClick={() => onNavigate('important')}
              className={cn(
                'flex w-full items-center gap-2.5 rounded-lg px-2.5 py-1.5 text-sm transition-all duration-200',
                activeView === 'important'
                  ? 'bg-sky-50 dark:bg-sky-500/10 font-medium text-sky-700 dark:text-sky-400'
                  : 'text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800'
              )}
            >
              <Star size={15} className={activeView === 'important' ? 'text-amber-500' : 'text-zinc-400 dark:text-zinc-500'} />
              Very Important
            </button>
            <button
              onClick={() => onNavigate('contribute')}
              className={cn(
                'flex w-full items-center gap-2.5 rounded-lg px-2.5 py-1.5 text-sm transition-all duration-200',
                activeView === 'contribute'
                  ? 'bg-sky-50 dark:bg-sky-500/10 font-medium text-sky-700 dark:text-sky-400'
                  : 'text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800'
              )}
            >
              <Mail size={15} className={activeView === 'contribute' ? 'text-violet-500 dark:text-violet-400' : 'text-zinc-400 dark:text-zinc-500'} />
              Contribute
            </button>
          </div>

          {/* Subjects */}
          <div className="mb-2">
            <p className="mb-1.5 px-2 text-[10px] font-semibold uppercase tracking-wider text-zinc-400 dark:text-zinc-500">
              Subjects
            </p>

            {yearSubjects.map((subject) => {
              const isExpanded = expandedSubject === subject.id;
              const isActiveSubject = activeSubjectId === subject.id;
              const subjectUnits = getUnitsBySubject(subject.id);
              const totalTopics = getTopicsBySubject(subject.id).length;

              return (
                <div key={subject.id} className="mb-0.5">
                  <div className="flex items-center">
                    <button
                      onClick={(e) => handleToggleExpand(e, subject.id)}
                      className="flex h-7 w-6 shrink-0 items-center justify-center rounded text-zinc-400 hover:text-zinc-600 dark:text-zinc-500 dark:hover:text-zinc-300"
                    >
                      <ChevronRight
                        size={12}
                        className={cn('transition-transform duration-200', isExpanded && 'rotate-90')}
                      />
                    </button>

                    <button
                      onClick={() => handleSubjectClick(subject.id)}
                      className={cn(
                        'flex flex-1 items-center gap-2 rounded-lg px-2 py-1.5 text-sm transition-all duration-200',
                        isActiveSubject && activeView === 'subject' && !activeUnitId && !activeCategory
                          ? 'bg-white dark:bg-zinc-800 font-medium text-zinc-900 dark:text-zinc-100 shadow-sm ring-1 ring-zinc-200 dark:ring-zinc-700'
                          : isActiveSubject
                          ? 'font-medium text-zinc-800 dark:text-zinc-200'
                          : 'text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800'
                      )}
                    >
                      <SubjectBadge subjectId={subject.id} subjectName={subject.name} size="sm" />
                      <span className="flex-1 truncate">{subject.name}</span>
                      <span className="text-[10px] text-zinc-300 dark:text-zinc-600">{totalTopics}</span>
                    </button>
                  </div>

                  {isExpanded && (
                    <div className="ml-6 border-l border-zinc-200 dark:border-zinc-700 pl-2 pb-1 mt-0.5 animate-fade-up">
                      <p className="px-2 py-1 text-[10px] font-semibold uppercase tracking-wider text-zinc-300 dark:text-zinc-600">
                        Chapters
                      </p>
                      {subjectUnits.map((unit) => {
                        const unitTopicCount = getTopicsByUnit(unit.id).length;
                        const isActiveUnit = activeView === 'unit' && activeUnitId === unit.id;

                        return (
                          <button
                            key={unit.id}
                            onClick={() => onNavigate('unit', subject.id, null, unit.id)}
                            className={cn(
                              'flex w-full items-center gap-2 rounded-md px-2 py-1 text-xs transition-all duration-200',
                              isActiveUnit
                                ? 'bg-white dark:bg-zinc-800 font-medium text-zinc-800 dark:text-zinc-100 shadow-sm ring-1 ring-zinc-200 dark:ring-zinc-700'
                                : 'text-zinc-500 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800 hover:text-zinc-700 dark:hover:text-zinc-300'
                            )}
                          >
                            <div className={cn(
                              'h-1.5 w-1.5 shrink-0 rounded-full',
                              isActiveUnit ? 'bg-sky-500' : 'bg-zinc-300 dark:bg-zinc-600'
                            )} />
                            <span className="flex-1 truncate text-left">{unit.name}</span>
                            <span className="text-[10px] text-zinc-300 dark:text-zinc-600">{unitTopicCount}</span>
                          </button>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </nav>

        {/* Footer */}
        <div className="border-t border-zinc-200 dark:border-zinc-800 px-5 py-3">
          <div className="mb-3 flex items-center justify-center">
            <div className="inline-flex items-center rounded-lg bg-zinc-100 dark:bg-zinc-800 p-0.5">
              {([
                { mode: 'light' as ThemeMode, icon: Sun, label: 'Light' },
                { mode: 'system' as ThemeMode, icon: Monitor, label: 'System' },
                { mode: 'dark' as ThemeMode, icon: Moon, label: 'Dark' },
              ]).map(({ mode, icon: Icon, label }) => (
                <button
                  key={mode}
                  onClick={() => onThemeChange(mode)}
                  className={cn(
                    'flex items-center gap-1 rounded-md px-2.5 py-1 text-[11px] font-medium transition-all duration-200',
                    theme === mode
                      ? 'bg-white dark:bg-zinc-700 text-sky-600 dark:text-sky-400 shadow-sm'
                      : 'text-zinc-400 dark:text-zinc-500 hover:text-zinc-600 dark:hover:text-zinc-300'
                  )}
                  title={label}
                >
                  <Icon size={12} />
                </button>
              ))}
            </div>
          </div>

          <p
            className="text-[10px] text-zinc-400 dark:text-zinc-600 select-none cursor-default text-center"
            onDoubleClick={() => onNavigate('admin')}
          >
            Built for focused study
          </p>
        </div>
      </aside>
    </>
  );
};
