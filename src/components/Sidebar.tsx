import React, { useState, useEffect } from 'react';
import {
  Search,
  BookOpen,
  Star,
  Home,
  ChevronDown,
  ChevronRight,
  Mail,
} from 'lucide-react';
import {
  years,
  getSubjectsByYear,
  getUnitsBySubject,
  getTopicsByUnit,
  getTopicsBySubject,
  type YearId,
  type CategoryId,
} from '../data/content';
import { cn } from '../utils/cn';

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
}) => {
  const yearSubjects = getSubjectsByYear(activeYear);
  const [expandedSubject, setExpandedSubject] = useState<string | null>(null);

  // Sync expanded subject with active subject
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
          'fixed left-0 top-0 z-40 flex h-full w-72 flex-col border-r border-slate-200/80 bg-[#f5f5f7]/95 backdrop-blur-xl transition-transform duration-300 lg:static lg:translate-x-0',
          isOpen ? 'translate-x-0' : '-translate-x-full'
        )}
      >
        {/* Header */}
        <div className="flex items-center gap-2.5 border-b border-slate-200/60 px-5 py-4">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-slate-800 to-slate-900">
            <BookOpen size={14} className="text-white" />
          </div>
          <div>
            <h1 className="text-sm font-semibold text-slate-900">MBBS Resources</h1>
            <p className="text-[10px] text-slate-400">Organised study library</p>
          </div>
        </div>

        {/* Year Selector */}
        <div className="border-b border-slate-200/60 px-3 py-3">
          <div className="relative">
            <select
              value={activeYear}
              onChange={(e) => onYearChange(Number(e.target.value) as YearId)}
              className="w-full appearance-none rounded-lg bg-white px-3 py-2 pr-8 text-sm font-medium text-slate-800 shadow-sm ring-1 ring-slate-200/80 focus:outline-none focus:ring-2 focus:ring-blue-500/30"
            >
              {years.map((y) => (
                <option key={y.id} value={y.id}>
                  {y.label} — {y.subtitle}
                </option>
              ))}
            </select>
            <ChevronDown size={14} className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400" />
          </div>
        </div>

        {/* Search */}
        <div className="px-3 pt-3">
          <div className="flex items-center gap-2 rounded-lg bg-slate-200/50 px-3 py-2">
            <Search size={14} className="text-slate-400" />
            <input
              type="text"
              placeholder="Search topics…"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="w-full bg-transparent text-sm text-slate-700 placeholder:text-slate-400 focus:outline-none"
            />
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto px-3 py-3">
          {/* Quick Access */}
          <div className="mb-4">
            <p className="mb-1.5 px-2 text-[10px] font-semibold uppercase tracking-wider text-slate-400">
              Quick Access
            </p>
            <button
              onClick={() => onNavigate('home')}
              className={cn(
                'flex w-full items-center gap-2.5 rounded-lg px-2.5 py-1.5 text-sm transition-colors',
                activeView === 'home'
                  ? 'bg-blue-50 font-medium text-blue-600'
                  : 'text-slate-600 hover:bg-slate-100'
              )}
            >
              <Home size={15} className={activeView === 'home' ? 'text-blue-500' : 'text-slate-400'} />
              Overview
            </button>
            <button
              onClick={() => onNavigate('important')}
              className={cn(
                'flex w-full items-center gap-2.5 rounded-lg px-2.5 py-1.5 text-sm transition-colors',
                activeView === 'important'
                  ? 'bg-amber-50 font-medium text-amber-700'
                  : 'text-slate-600 hover:bg-slate-100'
              )}
            >
              <Star size={15} className={activeView === 'important' ? 'text-amber-500' : 'text-slate-400'} />
              Very Important
            </button>
            <button
              onClick={() => onNavigate('contribute')}
              className={cn(
                'flex w-full items-center gap-2.5 rounded-lg px-2.5 py-1.5 text-sm transition-colors',
                activeView === 'contribute'
                  ? 'bg-emerald-50 font-medium text-emerald-700'
                  : 'text-slate-600 hover:bg-slate-100'
              )}
            >
              <Mail size={15} className={activeView === 'contribute' ? 'text-emerald-500' : 'text-slate-400'} />
              Contribute
            </button>
          </div>

          {/* Subjects with chapters */}
          <div className="mb-2">
            <p className="mb-1.5 px-2 text-[10px] font-semibold uppercase tracking-wider text-slate-400">
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
                      className="flex h-7 w-6 shrink-0 items-center justify-center rounded text-slate-400 hover:text-slate-600"
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
                          ? 'bg-white font-medium text-slate-900 shadow-sm ring-1 ring-slate-200/60'
                          : isActiveSubject
                          ? 'font-medium text-slate-800'
                          : 'text-slate-600 hover:bg-slate-100'
                      )}
                    >
                      <span className="text-base">{subject.icon}</span>
                      <span className="flex-1 truncate">{subject.name}</span>
                      <span className="text-[10px] text-slate-300">{totalTopics}</span>
                    </button>
                  </div>

                  {/* Expanded: Chapters only */}
                  {isExpanded && (
                    <div className="ml-6 border-l border-slate-200/70 pl-2 pb-1 mt-0.5">
                      <p className="px-2 py-1 text-[10px] font-semibold uppercase tracking-wider text-slate-300">
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
                                ? 'bg-white font-medium text-slate-800 shadow-sm ring-1 ring-slate-200/60'
                                : 'text-slate-500 hover:bg-slate-100 hover:text-slate-700'
                            )}
                          >
                            <div
                              className={cn(
                                'h-1.5 w-1.5 shrink-0 rounded-full',
                                isActiveUnit ? 'bg-blue-400' : 'bg-slate-300'
                              )}
                            />
                            <span className="flex-1 truncate text-left">{unit.name}</span>
                            <span className="text-[10px] text-slate-300">{unitTopicCount}</span>
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
        <div className="border-t border-slate-200/60 px-5 py-3">
          <p
            className="text-[10px] text-slate-400 select-none cursor-default"
            onDoubleClick={() => onNavigate('admin')}
          >
            Built for focused study · No distractions
          </p>
        </div>
      </aside>
    </>
  );
};
