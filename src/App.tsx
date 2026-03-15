import { useState, useEffect, useMemo, useCallback, useRef } from 'react';
import {
  Menu,
  BookOpen,
  FileText,
  FileDown,
  Microscope,
  ScanLine,
  PenLine,
  Star,
  ArrowRight,
  Sparkles,
  ChevronRight,
} from 'lucide-react';
import { Sidebar, type ThemeMode } from './components/Sidebar';
import { TopicItem } from './components/TopicItem';
import { TopicDetail } from './components/TopicDetail';
import { ContentGuide } from './components/ContentGuide';
import { ContributePage } from './components/ContributePage';
import {
  subjects,
  units,
  categories,
  getSubjectsByYear,
  getUnitsBySubject,
  getTopicsByUnit,
  getTopicsBySubject,
  getTopicsByYearAndCategory,
  searchTopics,
  getImportantTopics,
  getStats,
  type YearId,
  type CategoryId,
  type Topic,
} from './data/index';
import { cn } from './utils/cn';

type View = 'home' | 'subject' | 'unit' | 'important' | 'search' | 'contribute' | 'admin' | 'detail' | 'category';

const categoryIcons: Record<CategoryId, React.ReactNode> = {
  topics: <BookOpen size={15} />,
  pyq_pdfs: <FileDown size={15} />,
  pyqs: <FileText size={15} />,
  histology: <Microscope size={15} />,
  radiology: <ScanLine size={15} />,
  notes: <PenLine size={15} />,
};

const categoryColors: Record<CategoryId, string> = {
  topics: 'from-sky-500 to-sky-600',
  pyq_pdfs: 'from-rose-500 to-rose-600',
  pyqs: 'from-purple-500 to-purple-600',
  histology: 'from-emerald-500 to-emerald-600',
  radiology: 'from-cyan-500 to-cyan-600',
  notes: 'from-orange-500 to-orange-600',
};

const categoryBigIcons: Record<CategoryId, React.ReactNode> = {
  topics: <BookOpen size={20} />,
  pyq_pdfs: <FileDown size={20} />,
  pyqs: <FileText size={20} />,
  histology: <Microscope size={20} />,
  radiology: <ScanLine size={20} />,
  notes: <PenLine size={20} />,
};

// ─── Theme ────────────────────────────────────────────────────────────────────

function getInitialTheme(): ThemeMode {
  try {
    const saved = localStorage.getItem('theme');
    if (saved === 'light' || saved === 'dark' || saved === 'system') return saved;
  } catch {}
  return 'system';
}

function applyTheme(theme: ThemeMode) {
  const root = document.documentElement;
  if (theme === 'dark') {
    root.classList.add('dark');
  } else if (theme === 'light') {
    root.classList.remove('dark');
  } else {
    if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }
}

// ─── Copy Protection ──────────────────────────────────────────────────────────

function setupCopyProtection() {
  const prevent = (e: Event) => e.preventDefault();
  document.addEventListener('copy', prevent);
  document.addEventListener('cut', prevent);
  document.addEventListener('paste', prevent);
  document.addEventListener('contextmenu', prevent);
  document.addEventListener('dragstart', prevent);
  return () => {
    document.removeEventListener('copy', prevent);
    document.removeEventListener('cut', prevent);
    document.removeEventListener('paste', prevent);
    document.removeEventListener('contextmenu', prevent);
    document.removeEventListener('dragstart', prevent);
  };
}

export function App() {
  const [activeYear, setActiveYear] = useState<YearId>(1);
  const [view, setView] = useState<View>('home');
  const [activeSubjectId, setActiveSubjectId] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState<CategoryId | null>(null);
  const [activeUnitId, setActiveUnitId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [subjectCategoryFilter, setSubjectCategoryFilter] = useState<CategoryId | null>(null);
  const [selectedTopic, setSelectedTopic] = useState<Topic | null>(null);
  const [theme, setTheme] = useState<ThemeMode>(getInitialTheme);
  const prevViewRef = useRef<{ view: View; subjectId: string | null; unitId: string | null; category: CategoryId | null }>({ view: 'home', subjectId: null, unitId: null, category: null });

  useEffect(() => {
    applyTheme(theme);
    try { localStorage.setItem('theme', theme); } catch {}
  }, [theme]);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-color-scheme: dark)');
    const handler = () => { if (theme === 'system') applyTheme('system'); };
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, [theme]);

  useEffect(() => setupCopyProtection(), []);

  const handleThemeChange = useCallback((t: ThemeMode) => setTheme(t), []);

  const handleNavigate = useCallback(
    (newView: string, subjectId?: string | null, category?: CategoryId | null, unitId?: string | null) => {
      setView(newView as View);
      setActiveSubjectId(subjectId ?? null);
      setActiveCategory(category ?? null);
      setActiveUnitId(unitId ?? null);
      setSubjectCategoryFilter(null);
      setSidebarOpen(false);
    }, []
  );

  const handleYearChange = useCallback((year: YearId) => {
    setActiveYear(year);
    setView('home');
    setActiveSubjectId(null);
    setActiveCategory(null);
    setActiveUnitId(null);
    setSubjectCategoryFilter(null);
    setSearchQuery('');
  }, []);

  const handleSearchChange = useCallback((q: string) => {
    setSearchQuery(q);
    setView(q.trim() ? 'search' : 'home');
  }, []);

  const handleViewDetail = useCallback((topic: Topic) => {
    prevViewRef.current = { view, subjectId: activeSubjectId, unitId: activeUnitId, category: activeCategory };
    setSelectedTopic(topic);
    setView('detail');
  }, [view, activeSubjectId, activeUnitId, activeCategory]);

  const handleBackFromDetail = useCallback(() => {
    const prev = prevViewRef.current;
    setView(prev.view);
    setActiveSubjectId(prev.subjectId);
    setActiveUnitId(prev.unitId);
    setActiveCategory(prev.category);
    setSelectedTopic(null);
  }, []);

  const handleCategoryClick = useCallback((categoryId: CategoryId) => {
    setActiveCategory(categoryId);
    setView('category');
    setSidebarOpen(false);
  }, []);

  const stats = useMemo(() => getStats(activeYear), [activeYear]);
  const yearLabel = `Year ${activeYear}`;

  // ─── Render ─────────────────────────────────────────────────────────────────

  const renderContent = () => {
    if (view === 'detail' && selectedTopic) {
      return <TopicDetail topic={selectedTopic} onBack={handleBackFromDetail} />;
    }

    if (view === 'contribute') return <ContributePage onBack={() => handleNavigate('home')} />;
    if (view === 'admin') return <ContentGuide onBack={() => handleNavigate('home')} />;

    // Category view
    if (view === 'category' && activeCategory) {
      const cat = categories.find(c => c.id === activeCategory);
      if (!cat) return null;
      const categoryTopics = getTopicsByYearAndCategory(activeYear, activeCategory);
      const yearSubjects = getSubjectsByYear(activeYear);

      return (
        <div className="animate-fade-up">
          <div className="mb-6">
            <button onClick={() => handleNavigate('home')} className="mb-3 flex items-center gap-1.5 text-xs text-zinc-400 hover:text-violet-600 dark:text-zinc-500 dark:hover:text-violet-400 transition-colors cursor-pointer">
              <ChevronRight size={10} className="rotate-180" /> Back to overview
            </button>
            <div className="flex items-center gap-3">
              <div className={cn('flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br text-white', categoryColors[activeCategory])}>
                {categoryBigIcons[activeCategory]}
              </div>
              <div>
                <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-50">{cat.name}</h2>
                <p className="text-sm text-zinc-400 dark:text-zinc-500">{categoryTopics.length} items in {yearLabel}</p>
              </div>
            </div>
          </div>

          {yearSubjects.map(subject => {
            const subjectTopics = categoryTopics.filter(t => t.subjectId === subject.id);
            if (subjectTopics.length === 0) return null;
            const subjectUnits = getUnitsBySubject(subject.id);

            return (
              <div key={subject.id} className="mb-8">
                <div className="mb-3 flex items-center gap-2 px-1">
                  <span className="text-lg">{subject.icon}</span>
                  <h3 className="text-sm font-semibold text-zinc-700 dark:text-zinc-300">{subject.name}</h3>
                  <span className="text-xs text-zinc-400 dark:text-zinc-500">({subjectTopics.length})</span>
                </div>

                {subjectUnits.map(unit => {
                  const unitTopics = subjectTopics.filter(t => t.unitId === unit.id);
                  if (unitTopics.length === 0) return null;
                  return (
                    <div key={unit.id} className="mb-4 ml-3">
                      <div className="mb-2 flex items-center gap-2 px-1">
                        <div className="h-1.5 w-1.5 rounded-full bg-zinc-300 dark:bg-zinc-600" />
                        <h4 className="text-xs font-medium uppercase tracking-wider text-zinc-400 dark:text-zinc-500">{unit.name}</h4>
                        <span className="text-[10px] text-zinc-300 dark:text-zinc-600">({unitTopics.length})</span>
                      </div>
                      <div className="space-y-1.5">
                        {unitTopics.map(topic => <TopicItem key={topic.id} topic={topic} onViewDetail={handleViewDetail} />)}
                      </div>
                    </div>
                  );
                })}
              </div>
            );
          })}

          {categoryTopics.length === 0 && (
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <p className="text-sm text-zinc-400 dark:text-zinc-500">No {cat.name.toLowerCase()} added yet</p>
            </div>
          )}
        </div>
      );
    }

    // Home
    if (view === 'home') {
      return <HomeView year={activeYear} stats={stats} onNavigate={handleNavigate} onViewDetail={handleViewDetail} onCategoryClick={handleCategoryClick} />;
    }

    // Subject view
    if (view === 'subject' && activeSubjectId) {
      const subject = subjects.find(s => s.id === activeSubjectId);
      if (!subject) return null;
      const subjectUnits = getUnitsBySubject(activeSubjectId);
      const allSubjectTopics = getTopicsBySubject(activeSubjectId);

      const getFiltered = (unitId: string) => {
        const ut = getTopicsByUnit(unitId);
        return subjectCategoryFilter ? ut.filter(t => t.category === subjectCategoryFilter) : ut;
      };

      const categoryCounts = categories.map(cat => ({ ...cat, count: allSubjectTopics.filter(t => t.category === cat.id).length }));

      return (
        <div className="animate-fade-up">
          <div className="mb-6">
            <div className="flex items-center gap-3">
              <span className="text-3xl">{subject.icon}</span>
              <div>
                <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-50">{subject.name}</h2>
                <p className="text-sm text-zinc-400 dark:text-zinc-500">{allSubjectTopics.length} items across {subjectUnits.length} chapters</p>
              </div>
            </div>
          </div>

          <div className="mb-5 flex gap-2 overflow-x-auto pb-1">
            <button
              onClick={() => setSubjectCategoryFilter(null)}
              className={cn(
                'shrink-0 rounded-full px-3.5 py-1.5 text-xs font-medium transition-all duration-200 cursor-pointer',
                !subjectCategoryFilter
                  ? 'bg-zinc-800 dark:bg-zinc-100 text-white dark:text-zinc-900'
                  : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-500 dark:text-zinc-400 hover:bg-zinc-200 dark:hover:bg-zinc-700'
              )}
            >
              All ({allSubjectTopics.length})
            </button>
            {categoryCounts.map(cat => {
              if (cat.count === 0) return null;
              return (
                <button
                  key={cat.id}
                  onClick={() => setSubjectCategoryFilter(cat.id)}
                  className={cn(
                    'flex shrink-0 items-center gap-1.5 rounded-full px-3.5 py-1.5 text-xs font-medium transition-all duration-200 cursor-pointer',
                    subjectCategoryFilter === cat.id
                      ? 'bg-zinc-800 dark:bg-zinc-100 text-white dark:text-zinc-900'
                      : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-500 dark:text-zinc-400 hover:bg-zinc-200 dark:hover:bg-zinc-700'
                  )}
                >
                  {categoryIcons[cat.id]}
                  {cat.name}
                  <span className="ml-0.5 opacity-60">{cat.count}</span>
                </button>
              );
            })}
          </div>

          {subjectUnits.map(unit => {
            const unitTopics = getFiltered(unit.id);
            if (unitTopics.length === 0) return null;
            return (
              <div key={unit.id} className="mb-6">
                <div className="mb-2.5 flex items-center gap-2 px-1">
                  <div className="h-1.5 w-1.5 rounded-full bg-zinc-300 dark:bg-zinc-600" />
                  <h3 className="text-xs font-semibold uppercase tracking-wider text-zinc-400 dark:text-zinc-500">{unit.name}</h3>
                  <span className="text-[10px] text-zinc-300 dark:text-zinc-600">({unitTopics.length})</span>
                </div>
                <div className="space-y-1.5">
                  {unitTopics.map(topic => <TopicItem key={topic.id} topic={topic} onViewDetail={handleViewDetail} />)}
                </div>
              </div>
            );
          })}
        </div>
      );
    }

    // Unit view
    if (view === 'unit' && activeSubjectId && activeUnitId) {
      const subject = subjects.find(s => s.id === activeSubjectId);
      const unit = units.find(u => u.id === activeUnitId);
      if (!subject || !unit) return null;
      const unitTopics = getTopicsByUnit(activeUnitId);
      const categoryCounts = categories.map(cat => ({ ...cat, count: unitTopics.filter(t => t.category === cat.id).length }));
      const filteredTopics = subjectCategoryFilter ? unitTopics.filter(t => t.category === subjectCategoryFilter) : unitTopics;

      return (
        <div className="animate-fade-up">
          <div className="mb-6">
            <div className="mb-2 flex items-center gap-1.5 text-xs text-zinc-400 dark:text-zinc-500">
              <button onClick={() => handleNavigate('subject', activeSubjectId)} className="hover:text-violet-600 dark:hover:text-violet-400 transition-colors cursor-pointer">
                {subject.icon} {subject.name}
              </button>
              <ChevronRight size={10} />
              <span className="text-zinc-600 dark:text-zinc-300">{unit.name}</span>
            </div>
            <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-50">{unit.name}</h2>
            <p className="text-sm text-zinc-400 dark:text-zinc-500">{unitTopics.length} items in this chapter</p>
          </div>

          <div className="mb-5 flex gap-2 overflow-x-auto pb-1">
            <button
              onClick={() => setSubjectCategoryFilter(null)}
              className={cn(
                'shrink-0 rounded-full px-3.5 py-1.5 text-xs font-medium transition-all duration-200 cursor-pointer',
                !subjectCategoryFilter
                  ? 'bg-zinc-800 dark:bg-zinc-100 text-white dark:text-zinc-900'
                  : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-500 dark:text-zinc-400 hover:bg-zinc-200 dark:hover:bg-zinc-700'
              )}
            >
              All ({unitTopics.length})
            </button>
            {categoryCounts.map(cat => {
              if (cat.count === 0) return null;
              return (
                <button
                  key={cat.id}
                  onClick={() => setSubjectCategoryFilter(cat.id)}
                  className={cn(
                    'flex shrink-0 items-center gap-1.5 rounded-full px-3.5 py-1.5 text-xs font-medium transition-all duration-200 cursor-pointer',
                    subjectCategoryFilter === cat.id
                      ? 'bg-zinc-800 dark:bg-zinc-100 text-white dark:text-zinc-900'
                      : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-500 dark:text-zinc-400 hover:bg-zinc-200 dark:hover:bg-zinc-700'
                  )}
                >
                  {categoryIcons[cat.id]}
                  {cat.name}
                  <span className="ml-0.5 opacity-60">{cat.count}</span>
                </button>
              );
            })}
          </div>

          <div className="space-y-1.5">
            {filteredTopics.map(topic => <TopicItem key={topic.id} topic={topic} onViewDetail={handleViewDetail} />)}
          </div>

          {filteredTopics.length === 0 && (
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <p className="text-sm text-zinc-400 dark:text-zinc-500">No items in this category</p>
            </div>
          )}
        </div>
      );
    }

    // Very Important
    if (view === 'important') {
      const importantTopics = getImportantTopics(activeYear);
      const yearSubjects = getSubjectsByYear(activeYear);

      return (
        <div className="animate-fade-up">
          <div className="mb-6 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-50 dark:bg-amber-500/10">
              <Star size={18} className="fill-amber-400 text-amber-400" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-50">Very Important</h2>
              <p className="text-sm text-zinc-400 dark:text-zinc-500">{importantTopics.length} must-review items — {yearLabel}</p>
            </div>
          </div>

          {yearSubjects.map(subject => {
            const si = importantTopics.filter(t => t.subjectId === subject.id);
            if (si.length === 0) return null;
            return (
              <div key={subject.id} className="mb-6">
                <div className="mb-2.5 flex items-center gap-2 px-1">
                  <span className="text-lg">{subject.icon}</span>
                  <h3 className="text-sm font-semibold text-zinc-700 dark:text-zinc-300">{subject.name}</h3>
                  <span className="text-xs text-zinc-400 dark:text-zinc-500">({si.length})</span>
                </div>
                <div className="space-y-1.5">
                  {si.map(topic => <TopicItem key={topic.id} topic={topic} showSubject onViewDetail={handleViewDetail} />)}
                </div>
              </div>
            );
          })}
        </div>
      );
    }

    // Search
    if (view === 'search') {
      const results = searchTopics(searchQuery, activeYear);
      return (
        <div className="animate-fade-up">
          <div className="mb-6">
            <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-50">Search Results</h2>
            <p className="text-sm text-zinc-400 dark:text-zinc-500">{results.length} result{results.length !== 1 ? 's' : ''} for &ldquo;{searchQuery}&rdquo; in {yearLabel}</p>
          </div>

          {results.length > 0 ? (
            <div className="space-y-1.5">
              {results.map(topic => <TopicItem key={topic.id} topic={topic} showSubject onViewDetail={handleViewDetail} />)}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-zinc-100 dark:bg-zinc-800">
                <Sparkles size={24} className="text-zinc-300 dark:text-zinc-600" />
              </div>
              <p className="text-sm font-medium text-zinc-400 dark:text-zinc-500">No topics found</p>
              <p className="mt-1 text-xs text-zinc-300 dark:text-zinc-600">Try a different search term</p>
            </div>
          )}
        </div>
      );
    }

    return null;
  };

  return (
    <div className="flex h-screen bg-[#fafafa] dark:bg-[#18181b] font-[Inter,system-ui,sans-serif]">
      <Sidebar
        activeYear={activeYear}
        activeView={view}
        activeSubjectId={activeSubjectId}
        activeCategory={activeCategory}
        activeUnitId={activeUnitId}
        onNavigate={handleNavigate}
        onYearChange={handleYearChange}
        searchQuery={searchQuery}
        onSearchChange={handleSearchChange}
        isOpen={sidebarOpen}
        onToggle={() => setSidebarOpen(false)}
        theme={theme}
        onThemeChange={handleThemeChange}
      />

      <main className="flex-1 overflow-y-auto">
        <div className="sticky top-0 z-20 flex items-center gap-3 border-b border-zinc-200 dark:border-zinc-800 bg-[#fafafa]/80 dark:bg-[#18181b]/80 px-4 py-3 backdrop-blur-xl lg:hidden">
          <button onClick={() => setSidebarOpen(true)} className="rounded-lg p-1.5 hover:bg-zinc-100 dark:hover:bg-zinc-800 cursor-pointer">
            <Menu size={20} className="text-zinc-600 dark:text-zinc-400" />
          </button>
          <button onClick={() => { setView('home'); setSidebarOpen(false); }} className="text-sm font-semibold text-zinc-700 dark:text-zinc-200 hover:text-violet-600 dark:hover:text-violet-400 transition-colors cursor-pointer">
            MBBS {yearLabel}
          </button>
        </div>

        <div className="mx-auto max-w-5xl px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
          {renderContent()}
        </div>
      </main>
    </div>
  );
}

// ─── Home View ────────────────────────────────────────────────────────────────

function HomeView({
  year, stats, onNavigate, onViewDetail, onCategoryClick,
}: {
  year: YearId;
  stats: ReturnType<typeof getStats>;
  onNavigate: (view: string, subjectId?: string | null, category?: CategoryId | null) => void;
  onViewDetail: (topic: Topic) => void;
  onCategoryClick: (categoryId: CategoryId) => void;
}) {
  const yearSubjects = getSubjectsByYear(year);
  const importantTopics = getImportantTopics(year).slice(0, 6);
  const yearLabel = `Year ${year}`;

  const tiles: { id: CategoryId; label: string; count: number; color: string; icon: React.ReactNode }[] = [
    { id: 'topics', label: 'Topics', count: stats.topics, color: 'from-sky-500 to-sky-600', icon: <BookOpen size={18} /> },
    { id: 'pyq_pdfs', label: 'PYQ PDFs', count: stats.pyq_pdfs, color: 'from-rose-500 to-rose-600', icon: <FileDown size={18} /> },
    { id: 'pyqs', label: 'PYQs', count: stats.pyqs, color: 'from-purple-500 to-purple-600', icon: <FileText size={18} /> },
    { id: 'notes', label: 'Notes', count: stats.notes, color: 'from-orange-500 to-orange-600', icon: <PenLine size={18} /> },
    { id: 'histology', label: 'Histology', count: stats.histology, color: 'from-emerald-500 to-emerald-600', icon: <Microscope size={18} /> },
    { id: 'radiology', label: 'Radiology', count: stats.radiology, color: 'from-cyan-500 to-cyan-600', icon: <ScanLine size={18} /> },
  ];
  const filteredTiles = tiles.filter(t => t.count > 0);

  return (
    <div className="animate-fade-up">
      <div className="mb-8">
        <h1 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-3xl">MBBS {yearLabel}</h1>
        <p className="mt-1 text-sm text-zinc-400 dark:text-zinc-500">{stats.total} resources organised across {yearSubjects.length} subjects</p>
      </div>

      {filteredTiles.length > 0 && (
        <div className="mb-8 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
          {filteredTiles.map(tile => (
            <button
              key={tile.id}
              onClick={() => onCategoryClick(tile.id)}
              className="group rounded-2xl border border-zinc-100 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-4 text-left shadow-sm transition-all duration-200 hover:border-violet-200 dark:hover:border-violet-500/20 hover:shadow-md active:scale-[0.97] cursor-pointer"
            >
              <div className={cn('mb-2 inline-flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br text-white transition-transform duration-200 group-hover:scale-110', tile.color)}>
                {tile.icon}
              </div>
              <p className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">{tile.count}</p>
              <p className="text-xs text-zinc-400 dark:text-zinc-500">{tile.label}</p>
            </button>
          ))}
        </div>
      )}

      <div className="mb-8">
        <h2 className="mb-3 text-sm font-semibold text-zinc-700 dark:text-zinc-300">Subjects</h2>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {yearSubjects.map(subject => {
            const count = getTopicsBySubject(subject.id).length;
            const unitCount = getUnitsBySubject(subject.id).length;
            return (
              <button
                key={subject.id}
                onClick={() => onNavigate('subject', subject.id)}
                className="group flex items-center gap-4 rounded-2xl border border-zinc-100 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-4 text-left transition-all duration-200 hover:border-violet-200 dark:hover:border-violet-500/20 hover:shadow-md active:scale-[0.98] cursor-pointer"
              >
                <span className="text-3xl">{subject.icon}</span>
                <div className="flex-1">
                  <h3 className="text-sm font-semibold text-zinc-800 dark:text-zinc-200">{subject.name}</h3>
                  <p className="mt-0.5 text-xs text-zinc-400 dark:text-zinc-500">{count} topics · {unitCount} chapters</p>
                </div>
                <ArrowRight size={16} className="text-zinc-300 dark:text-zinc-600 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:text-violet-500 dark:group-hover:text-violet-400" />
              </button>
            );
          })}
        </div>
      </div>

      {importantTopics.length > 0 && (
        <div>
          <div className="mb-3 flex items-center justify-between">
            <h2 className="text-sm font-semibold text-zinc-700 dark:text-zinc-300">
              <Star size={13} className="mr-1 inline fill-amber-400 text-amber-400" />
              Very Important
            </h2>
            <button onClick={() => onNavigate('important')} className="flex items-center gap-1 text-xs text-violet-600 hover:text-violet-700 dark:text-violet-400 dark:hover:text-violet-300 cursor-pointer">
              View all ({getImportantTopics(year).length})
              <ChevronRight size={12} />
            </button>
          </div>
          <div className="space-y-1.5">
            {importantTopics.map(topic => <TopicItem key={topic.id} topic={topic} showSubject onViewDetail={onViewDetail} />)}
          </div>
        </div>
      )}
    </div>
  );
}
