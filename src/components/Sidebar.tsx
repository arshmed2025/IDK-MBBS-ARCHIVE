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
    if (activeSubjectId) {
      setExpandedSubject(activeSubjectId);
    }
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
          className="fixed inset-0 z-30 bg-black/20 backdrop-blur-sm lg:hidden"
          onClick={onToggle}
        />
      )}

      <aside
        className={cn(
          'fixed left-0 top-0 z-40 flex h-full w-72 flex-col border-r transition-transform duration-300 lg:static lg:translate-x-0',
          'border-stone-200/80 bg-stone-50/95 backdrop-blur-xl',
          'dark:border-neutral-800 dark:bg-neutral-900/95',
          isOpen ? 'translate-x-0' : '-translate-x-full'
        )}
      >
        {/* Header */}
        <div className="flex items-center gap-2.5 border-b border-stone-200/60 dark:border-neutral-800 px-5 py-4">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-amber-500 to-orange-600">
            <BookOpen size={14} className="text-white" />
          </div>
          <div>
            <h1 className="text-sm font-semibold text-stone-900 dark:text-neutral-100">MBBS Resources</h1>
            <p className="text-[10px] text-stone-400 dark:text-neutral-500">Organised study library</p>
          </div>
        </div>

        {/* Year Selector */}
        <div className="border-b border-stone-200/60 dark:border-neutral-800 px-3 py-3">
          <div className="relative">
            <select
              value={activeYear}
              onChange={(e) => onYearChange(Number(e.target.value) as YearId)}
              className="w-full appearance-none rounded-lg bg-white dark:bg-neutral-800 px-3 py-2 pr-8 text-sm font-medium text-stone-800 dark:text-neutral-200 shadow-sm ring-1 ring-stone-200/80 dark:ring-neutral-700 focus:outline-none focus:ring-2 focus:ring-amber-500/40"
            >
              {years.map((y) => (
                <option key={y.id} value={y.id}>
                  {y.label} — {y.subtitle}
                </option>
              ))}
            </select>
            <ChevronDown size={14} className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-stone-400" />
          </div>
        </div>

        {/* Search */}
        <div className="px-3 pt-3">
          <div className="flex items-center gap-2 rounded-lg bg-stone-200/40 dark:bg-neutral-800 px-3 py-2">
            <Search size={14} className="text-stone-400 dark:text-neutral-500" />
            <input
              type="text"
              placeholder="Search topics…"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="w-full bg-transparent text-sm text-stone-700 dark:text-neutral-200 placeholder:text-stone-400 dark:placeholder:text-neutral-500 focus:outline-none"
            />
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto px-3 py-3">
          {/* Quick Access */}
          <div className="mb-4">
            <p className="mb-1.5 px-2 text-[10px] font-semibold uppercase tracking-wider text-stone-400 dark:text-neutral-500">
              Quick Access
            </p>
            <button
              onClick={() => onNavigate('home')}
              className={cn(
                'flex w-full items-center gap-2.5 rounded-lg px-2.5 py-1.5 text-sm transition-colors',
                activeView === 'home'
                  ? 'bg-amber-50 dark:bg-amber-900/20 font-medium text-amber-700 dark:text-amber-400'
                  : 'text-stone-600 dark:text-neutral-400 hover:bg-stone-100 dark:hover:bg-neutral-800'
              )}
            >
              <Home size={15} className={activeView === 'home' ? 'text-amber-600 dark:text-amber-400' : 'text-stone-400 dark:text-neutral-500'} />
              Overview
            </button>
            <button
              onClick={() => onNavigate('important')}
              className={cn(
                'flex w-full items-center gap-2.5 rounded-lg px-2.5 py-1.5 text-sm transition-colors',
                activeView === 'important'
                  ? 'bg-amber-50 dark:bg-amber-900/20 font-medium text-amber-700 dark:text-amber-400'
                  : 'text-stone-600 dark:text-neutral-400 hover:bg-stone-100 dark:hover:bg-neutral-800'
              )}
            >
              <Star size={15} className={activeView === 'important' ? 'text-amber-500 dark:text-amber-400' : 'text-stone-400 dark:text-neutral-500'} />
              Very Important
            </button>
            <button
              onClick={() => onNavigate('contribute')}
              className={cn(
                'flex w-full items-center gap-2.5 rounded-lg px-2.5 py-1.5 text-sm transition-colors',
                activeView === 'contribute'
                  ? 'bg-emerald-50 dark:bg-emerald-900/20 font-medium text-emerald-700 dark:text-emerald-400'
                  : 'text-stone-600 dark:text-neutral-400 hover:bg-stone-100 dark:hover:bg-neutral-800'
              )}
            >
              <Mail size={15} className={activeView === 'contribute' ? 'text-emerald-500 dark:text-emerald-400' : 'text-stone-400 dark:text-neutral-500'} />
              Contribute
            </button>
          </div>

          {/* Subjects with chapters */}
          <div className="mb-2">
            <p className="mb-1.5 px-2 text-[10px] font-semibold uppercase tracking-wider text-stone-400 dark:text-neutral-500">
              Subjects
            </p>

            {yearSubjects.map((subject) => {
              const isExpanded = expandedSubject === subject.id;
              const isActiveSubject = activeSubjectId === subject.id;
              const subjectUnits = getUnitsBySubject(subject.id);
              const totalTopics = getTopicsBySubject(subject.id).length;

              return (
                <div key={subject.id} className="mb-0.5">
                  {/* Subject Header Row */}
                  <div className="flex items-center">
                    <button
                      onClick={(e) => handleToggleExpand(e, subject.id)}
                      className="flex h-7 w-6 shrink-0 items-center justify-center rounded text-stone-400 hover:text-stone-600 dark:text-neutral-500 dark:hover:text-neutral-300"
                    >
                      <ChevronRight
                        size={12}
                        className={cn(
                          'transition-transform duration-200',
                          isExpanded && 'rotate-90'
                        )}
                      />
                    </button>

                    <button
                      onClick={() => handleSubjectClick(subject.id)}
                      className={cn(
                        'flex flex-1 items-center gap-2 rounded-lg px-2 py-1.5 text-sm transition-colors',
                        isActiveSubject && (activeView === 'subject') && !activeUnitId && !activeCategory
                          ? 'bg-white dark:bg-neutral-800 font-medium text-stone-900 dark:text-neutral-100 shadow-sm ring-1 ring-stone-200/60 dark:ring-neutral-700'
                          : isActiveSubject
                          ? 'font-medium text-stone-800 dark:text-neutral-200'
                          : 'text-stone-600 dark:text-neutral-400 hover:bg-stone-100 dark:hover:bg-neutral-800'
                      )}
                    >
                      <span className="text-base">{subject.icon}</span>
                      <span className="flex-1 truncate">{subject.name}</span>
                      <span className="text-[10px] text-stone-300 dark:text-neutral-600">{totalTopics}</span>
                    </button>
                  </div>

                  {/* Expanded: Chapters only */}
                  {isExpanded && (
                    <div className="ml-6 border-l border-stone-200/70 dark:border-neutral-700/70 pl-2 pb-1 mt-0.5">
                      <p className="px-2 py-1 text-[10px] font-semibold uppercase tracking-wider text-stone-300 dark:text-neutral-600">
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
                              'flex w-full items-center gap-2 rounded-md px-2 py-1 text-xs transition-colors',
                              isActiveUnit
                                ? 'bg-white dark:bg-neutral-800 font-medium text-stone-800 dark:text-neutral-100 shadow-sm ring-1 ring-stone-200/60 dark:ring-neutral-700'
                                : 'text-stone-500 dark:text-neutral-400 hover:bg-stone-100 dark:hover:bg-neutral-800 hover:text-stone-700 dark:hover:text-neutral-300'
                            )}
                          >
                            <div
                              className={cn(
                                'h-1.5 w-1.5 shrink-0 rounded-full',
                                isActiveUnit ? 'bg-amber-400' : 'bg-stone-300 dark:bg-neutral-600'
                              )}
                            />
                            <span className="flex-1 truncate text-left">{unit.name}</span>
                            <span className="text-[10px] text-stone-300 dark:text-neutral-600">{unitTopicCount}</span>
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

        {/* Footer with theme toggle */}
        <div className="border-t border-stone-200/60 dark:border-neutral-800 px-5 py-3">
          {/* Theme Toggle */}
          <div className="mb-3 flex items-center justify-center">
            <div className="inline-flex items-center rounded-lg bg-stone-200/50 dark:bg-neutral-800 p-0.5">
              <button
                onClick={() => onThemeChange('light')}
                className={cn(
                  'flex items-center gap-1 rounded-md px-2.5 py-1 text-[11px] font-medium transition-all',
                  theme === 'light'
                    ? 'bg-white dark:bg-neutral-700 text-amber-600 dark:text-amber-400 shadow-sm'
                    : 'text-stone-400 dark:text-neutral-500 hover:text-stone-600 dark:hover:text-neutral-300'
                )}
                title="Light mode"
              >
                <Sun size={12} />
              </button>
              <button
                onClick={() => onThemeChange('system')}
                className={cn(
                  'flex items-center gap-1 rounded-md px-2.5 py-1 text-[11px] font-medium transition-all',
                  theme === 'system'
                    ? 'bg-white dark:bg-neutral-700 text-amber-600 dark:text-amber-400 shadow-sm'
                    : 'text-stone-400 dark:text-neutral-500 hover:text-stone-600 dark:hover:text-neutral-300'
                )}
                title="System theme"
              >
                <Monitor size={12} />
              </button>
              <button
                onClick={() => onThemeChange('dark')}
                className={cn(
                  'flex items-center gap-1 rounded-md px-2.5 py-1 text-[11px] font-medium transition-all',
                  theme === 'dark'
                    ? 'bg-white dark:bg-neutral-700 text-amber-600 dark:text-amber-400 shadow-sm'
                    : 'text-stone-400 dark:text-neutral-500 hover:text-stone-600 dark:hover:text-neutral-300'
                )}
                title="Dark mode"
              >
                <Moon size={12} />
              </button>
            </div>
          </div>

          <p
            className="text-[10px] text-stone-400 dark:text-neutral-600 select-none cursor-default text-center"
            onDoubleClick={() => onNavigate('admin')}
          >
            Built for focused study · No distractions
          </p>
        </div>
      </aside>
    </>
  );
};
