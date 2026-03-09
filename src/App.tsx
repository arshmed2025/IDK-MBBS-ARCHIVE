import { useState, useMemo, useCallback, useRef } from 'react';
import {
  Menu,
  BookOpen,
  FileText,
  Microscope,
  PenLine,
  Star,
  ArrowRight,
  Sparkles,
  ChevronRight,
} from 'lucide-react';
import { Sidebar } from './components/Sidebar';
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
  searchTopics,
  getImportantTopics,
  getStats,
  type YearId,
  type CategoryId,
} from './data/content';
import { cn } from './utils/cn';

type View = 'home' | 'subject' | 'unit' | 'important' | 'search' | 'contribute' | 'admin' | 'detail';

const categoryIcons: Record<CategoryId, React.ReactNode> = {
  topics: <BookOpen size={15} />,
  pyqs: <FileText size={15} />,
  histology: <Microscope size={15} />,
  notes: <PenLine size={15} />,
};

export function App() {
  const [activeYear, setActiveYear] = useState<YearId>(1);
  const [view, setView] = useState<View>('home');
  const [activeSubjectId, setActiveSubjectId] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState<CategoryId | null>(null);
  const [activeUnitId, setActiveUnitId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [subjectCategoryFilter, setSubjectCategoryFilter] = useState<CategoryId | null>(null);
  const [selectedTopic, setSelectedTopic] = useState<import('./data/content').Topic | null>(null);
  const prevViewRef = useRef<{ view: View; subjectId: string | null; unitId: string | null }>({ view: 'home', subjectId: null, unitId: null });

  const handleNavigate = useCallback(
    (newView: string, subjectId?: string | null, category?: CategoryId | null, unitId?: string | null) => {
      setView(newView as View);
      setActiveSubjectId(subjectId ?? null);
      setActiveCategory(category ?? null);
      setActiveUnitId(unitId ?? null);
      setSubjectCategoryFilter(null);
      setSidebarOpen(false);
    },
    []
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

  const handleSearchChange = useCallback(
    (q: string) => {
      setSearchQuery(q);
      if (q.trim()) {
        setView('search');
      } else {
        setView('home');
      }
    },
    []
  );

  const handleViewDetail = useCallback(
    (topic: import('./data/content').Topic) => {
      prevViewRef.current = { view, subjectId: activeSubjectId, unitId: activeUnitId };
      setSelectedTopic(topic);
      setView('detail');
    },
    [view, activeSubjectId, activeUnitId]
  );

  const handleBackFromDetail = useCallback(() => {
    const prev = prevViewRef.current;
    setView(prev.view);
    setActiveSubjectId(prev.subjectId);
    setActiveUnitId(prev.unitId);
    setSelectedTopic(null);
  }, []);

  const stats = useMemo(() => getStats(activeYear), [activeYear]);
  const yearLabel = activeYear === 1 ? 'Year 1' : activeYear === 2 ? 'Year 2' : activeYear === 3 ? 'Year 3' : 'Year 4';

  // ─── Render Content ─────────────────────────────────────────────────────────

  const renderContent = () => {
    // Topic detail view
    if (view === 'detail' && selectedTopic) {
      return <TopicDetail topic={selectedTopic} onBack={handleBackFromDetail} />;
    }

    // Contribute view (public)
    if (view === 'contribute') {
      return <ContributePage onBack={() => handleNavigate('home')} />;
    }

    // Admin guide (hidden — double-click footer to access)
    if (view === 'admin') {
      return <ContentGuide onBack={() => handleNavigate('home')} />;
    }

    // Home
    if (view === 'home') {
      return (
        <HomeView
          year={activeYear}
          stats={stats}
          onNavigate={handleNavigate}
          onViewDetail={handleViewDetail}
        />
      );
    }

    // Subject view — all topics grouped by unit, with category filter tabs
    if (view === 'subject' && activeSubjectId) {
      const subject = subjects.find(s => s.id === activeSubjectId);
      if (!subject) return null;

      const subjectUnits = getUnitsBySubject(activeSubjectId);
      const allSubjectTopics = getTopicsBySubject(activeSubjectId);

      const getFilteredTopics = (unitId: string) => {
        const unitTopics = getTopicsByUnit(unitId);
        if (subjectCategoryFilter) {
          return unitTopics.filter(t => t.category === subjectCategoryFilter);
        }
        return unitTopics;
      };

      const categoryCounts = categories.map(cat => ({
        ...cat,
        count: allSubjectTopics.filter(t => t.category === cat.id).length,
      }));

      return (
        <div>
          {/* Subject header */}
          <div className="mb-6">
            <div className="flex items-center gap-3">
              <span className="text-3xl">{subject.icon}</span>
              <div>
                <h2 className="text-xl font-bold text-slate-900">{subject.name}</h2>
                <p className="text-sm text-slate-400">
                  {allSubjectTopics.length} items across {subjectUnits.length} chapters
                </p>
              </div>
            </div>
          </div>

          {/* Category filter tabs */}
          <div className="mb-5 flex gap-2 overflow-x-auto pb-1">
            <button
              onClick={() => setSubjectCategoryFilter(null)}
              className={cn(
                'shrink-0 rounded-full px-3.5 py-1.5 text-xs font-medium transition-colors',
                !subjectCategoryFilter
                  ? 'bg-slate-900 text-white'
                  : 'bg-slate-100 text-slate-500 hover:bg-slate-200'
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
                    'flex shrink-0 items-center gap-1.5 rounded-full px-3.5 py-1.5 text-xs font-medium transition-colors',
                    subjectCategoryFilter === cat.id
                      ? 'bg-slate-900 text-white'
                      : 'bg-slate-100 text-slate-500 hover:bg-slate-200'
                  )}
                >
                  {categoryIcons[cat.id]}
                  {cat.name}
                  <span className="ml-0.5 opacity-60">{cat.count}</span>
                </button>
              );
            })}
          </div>

          {/* Units with topics */}
          {subjectUnits.map(unit => {
            const unitTopics = getFilteredTopics(unit.id);
            if (unitTopics.length === 0) return null;

            return (
              <div key={unit.id} className="mb-6">
                <div className="mb-2.5 flex items-center gap-2 px-1">
                  <div className="h-1.5 w-1.5 rounded-full bg-slate-300" />
                  <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                    {unit.name}
                  </h3>
                  <span className="text-[10px] text-slate-300">({unitTopics.length})</span>
                </div>
                <div className="space-y-1.5">
                  {unitTopics.map(topic => (
                    <TopicItem key={topic.id} topic={topic} onViewDetail={handleViewDetail} />
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      );
    }

    // Unit view — single chapter's topics
    if (view === 'unit' && activeSubjectId && activeUnitId) {
      const subject = subjects.find(s => s.id === activeSubjectId);
      const unit = units.find(u => u.id === activeUnitId);
      if (!subject || !unit) return null;

      const unitTopics = getTopicsByUnit(activeUnitId);

      const categoryCounts = categories.map(cat => ({
        ...cat,
        count: unitTopics.filter(t => t.category === cat.id).length,
      }));

      const filteredTopics = subjectCategoryFilter
        ? unitTopics.filter(t => t.category === subjectCategoryFilter)
        : unitTopics;

      return (
        <div>
          {/* Header with breadcrumb */}
          <div className="mb-6">
            <div className="mb-2 flex items-center gap-1.5 text-xs text-slate-400">
              <button
                onClick={() => handleNavigate('subject', activeSubjectId)}
                className="hover:text-slate-600 transition-colors"
              >
                {subject.icon} {subject.name}
              </button>
              <ChevronRight size={10} />
              <span className="text-slate-600">{unit.name}</span>
            </div>
            <h2 className="text-xl font-bold text-slate-900">{unit.name}</h2>
            <p className="text-sm text-slate-400">
              {unitTopics.length} items in this chapter
            </p>
          </div>

          {/* Category filter tabs */}
          <div className="mb-5 flex gap-2 overflow-x-auto pb-1">
            <button
              onClick={() => setSubjectCategoryFilter(null)}
              className={cn(
                'shrink-0 rounded-full px-3.5 py-1.5 text-xs font-medium transition-colors',
                !subjectCategoryFilter
                  ? 'bg-slate-900 text-white'
                  : 'bg-slate-100 text-slate-500 hover:bg-slate-200'
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
                    'flex shrink-0 items-center gap-1.5 rounded-full px-3.5 py-1.5 text-xs font-medium transition-colors',
                    subjectCategoryFilter === cat.id
                      ? 'bg-slate-900 text-white'
                      : 'bg-slate-100 text-slate-500 hover:bg-slate-200'
                  )}
                >
                  {categoryIcons[cat.id]}
                  {cat.name}
                  <span className="ml-0.5 opacity-60">{cat.count}</span>
                </button>
              );
            })}
          </div>

          {/* Topics list */}
          <div className="space-y-1.5">
            {filteredTopics.map(topic => (
              <TopicItem key={topic.id} topic={topic} onViewDetail={handleViewDetail} />
            ))}
          </div>

          {filteredTopics.length === 0 && (
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <p className="text-sm text-slate-400">No items in this category</p>
            </div>
          )}
        </div>
      );
    }

    // Important view
    if (view === 'important') {
      const importantTopics = getImportantTopics(activeYear);
      const yearSubjects = getSubjectsByYear(activeYear);

      return (
        <div>
          <div className="mb-6 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-50">
              <Star size={18} className="fill-amber-400 text-amber-400" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-slate-900">High Yield Topics</h2>
              <p className="text-sm text-slate-400">
                {importantTopics.length} must-review items — {yearLabel}
              </p>
            </div>
          </div>

          {yearSubjects.map(subject => {
            const subjectImportant = importantTopics.filter(t => t.subjectId === subject.id);
            if (subjectImportant.length === 0) return null;

            return (
              <div key={subject.id} className="mb-6">
                <div className="mb-2.5 flex items-center gap-2 px-1">
                  <span className="text-lg">{subject.icon}</span>
                  <h3 className="text-sm font-semibold text-slate-700">{subject.name}</h3>
                  <span className="text-xs text-slate-400">({subjectImportant.length})</span>
                </div>
                <div className="space-y-1.5">
                  {subjectImportant.map(topic => (
                    <TopicItem key={topic.id} topic={topic} showSubject onViewDetail={handleViewDetail} />
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      );
    }

    // Search view
    if (view === 'search') {
      const results = searchTopics(searchQuery, activeYear);

      return (
        <div>
          <div className="mb-6">
            <h2 className="text-xl font-bold text-slate-900">Search Results</h2>
            <p className="text-sm text-slate-400">
              {results.length} result{results.length !== 1 ? 's' : ''} for &ldquo;{searchQuery}&rdquo; in {yearLabel}
            </p>
          </div>

          {results.length > 0 ? (
            <div className="space-y-1.5">
              {results.map(topic => (
                <TopicItem key={topic.id} topic={topic} showSubject onViewDetail={handleViewDetail} />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-100">
                <Sparkles size={24} className="text-slate-300" />
              </div>
              <p className="text-sm font-medium text-slate-400">No topics found</p>
              <p className="mt-1 text-xs text-slate-300">Try a different search term</p>
            </div>
          )}
        </div>
      );
    }

    return null;
  };

  return (
    <div className="flex h-screen bg-[#fafafa] font-[Inter,system-ui,sans-serif]">
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
      />

      <main className="flex-1 overflow-y-auto">
        {/* Mobile top bar */}
        <div className="sticky top-0 z-20 flex items-center gap-3 border-b border-slate-200/60 bg-[#fafafa]/80 px-4 py-3 backdrop-blur-xl lg:hidden">
          <button
            onClick={() => setSidebarOpen(true)}
            className="rounded-lg p-1.5 hover:bg-slate-100"
          >
            <Menu size={20} className="text-slate-600" />
          </button>
          <h1 className="text-sm font-semibold text-slate-700">MBBS {yearLabel}</h1>
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
  year,
  stats,
  onNavigate,
  onViewDetail,
}: {
  year: YearId;
  stats: ReturnType<typeof getStats>;
  onNavigate: (view: string, subjectId?: string | null, category?: CategoryId | null) => void;
  onViewDetail: (topic: import('./data/content').Topic) => void;
}) {
  const yearSubjects = getSubjectsByYear(year);
  const importantTopics = getImportantTopics(year).slice(0, 6);
  const yearLabel = year === 1 ? 'Year 1' : year === 2 ? 'Year 2' : year === 3 ? 'Year 3' : 'Year 4';

  return (
    <div>
      {/* Welcome */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
          MBBS {yearLabel}
        </h1>
        <p className="mt-1 text-sm text-slate-400">
          {stats.total} resources organised across {yearSubjects.length} subjects
        </p>
      </div>

      {/* Stats */}
      <div className="mb-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
        {[
          { label: 'Topics', count: stats.topics, color: 'from-blue-500 to-blue-600', icon: <BookOpen size={16} /> },
          { label: 'PYQs', count: stats.pyqs, color: 'from-violet-500 to-violet-600', icon: <FileText size={16} /> },
          { label: 'Histology', count: stats.histology, color: 'from-emerald-500 to-emerald-600', icon: <Microscope size={16} /> },
          { label: 'Notes', count: stats.notes, color: 'from-orange-500 to-orange-600', icon: <PenLine size={16} /> },
        ].map(stat => (
          <div key={stat.label} className="rounded-2xl border border-slate-100 bg-white p-4 shadow-sm">
            <div className={cn('mb-2 inline-flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br text-white', stat.color)}>
              {stat.icon}
            </div>
            <p className="text-2xl font-bold text-slate-900">{stat.count}</p>
            <p className="text-xs text-slate-400">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Subjects */}
      <div className="mb-8">
        <h2 className="mb-3 text-sm font-semibold text-slate-700">Subjects</h2>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {yearSubjects.map(subject => {
            const count = getTopicsBySubject(subject.id).length;
            const unitCount = getUnitsBySubject(subject.id).length;
            return (
              <button
                key={subject.id}
                onClick={() => onNavigate('subject', subject.id)}
                className="group flex items-center gap-4 rounded-2xl border border-slate-100 bg-white p-4 text-left transition-all hover:border-slate-200 hover:shadow-md hover:shadow-slate-100 active:scale-[0.98]"
              >
                <span className="text-3xl">{subject.icon}</span>
                <div className="flex-1">
                  <h3 className="text-sm font-semibold text-slate-800">{subject.name}</h3>
                  <p className="mt-0.5 text-xs text-slate-400">
                    {count} topics · {unitCount} chapters
                  </p>
                </div>
                <ArrowRight
                  size={16}
                  className="text-slate-300 transition-transform group-hover:translate-x-0.5 group-hover:text-slate-400"
                />
              </button>
            );
          })}
        </div>
      </div>

      {/* High Yield */}
      {importantTopics.length > 0 && (
        <div>
          <div className="mb-3 flex items-center justify-between">
            <h2 className="text-sm font-semibold text-slate-700">
              <Star size={13} className="mr-1 inline fill-amber-400 text-amber-400" />
              High Yield
            </h2>
            <button
              onClick={() => onNavigate('important')}
              className="flex items-center gap-1 text-xs text-blue-500 hover:text-blue-600"
            >
              View all ({getImportantTopics(year).length})
              <ChevronRight size={12} />
            </button>
          </div>
          <div className="space-y-1.5">
            {importantTopics.map(topic => (
              <TopicItem key={topic.id} topic={topic} showSubject onViewDetail={onViewDetail} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
