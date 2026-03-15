// ─── Re-export types & metadata ──────────────────────────────────────────────

export {
  type YearId,
  type CategoryId,
  type Subject,
  type Unit,
  type Topic,
  years,
  categories,
  subjects,
  units,
} from './types';

// ─── Import year data ────────────────────────────────────────────────────────

import { year1Topics } from './year1';
import { year2Topics } from './year2';
import { year3Topics } from './year3';
import { year4Topics } from './year4';
import { subjects, units, type YearId, type CategoryId, type Topic } from './types';

// ─── Combined topics ─────────────────────────────────────────────────────────

export const topics: Topic[] = [
  ...year1Topics,
  ...year2Topics,
  ...year3Topics,
  ...year4Topics,
];

// ─── Computed Helpers ────────────────────────────────────────────────────────

export function getSubjectsByYear(year: YearId) {
  return subjects.filter(s => s.year === year);
}

export function getUnitsBySubject(subjectId: string) {
  return units.filter(u => u.subjectId === subjectId).sort((a, b) => a.order - b.order);
}

export function getTopicsByUnit(unitId: string) {
  return topics.filter(t => t.unitId === unitId);
}

export function getTopicsBySubject(subjectId: string) {
  return topics.filter(t => t.subjectId === subjectId);
}

export function getTopicsBySubjectAndCategory(subjectId: string, categoryId: CategoryId) {
  return topics.filter(t => t.subjectId === subjectId && t.category === categoryId);
}

export function getTopicsByYear(year: YearId) {
  const yearSubjects = getSubjectsByYear(year);
  const subjectIds = new Set(yearSubjects.map(s => s.id));
  return topics.filter(t => subjectIds.has(t.subjectId));
}

export function getTopicsByYearAndCategory(year: YearId, categoryId: CategoryId) {
  return getTopicsByYear(year).filter(t => t.category === categoryId);
}

export function searchTopics(query: string, year?: YearId) {
  const q = query.toLowerCase();
  let pool = topics;
  if (year) pool = getTopicsByYear(year);
  return pool.filter(t => t.title.toLowerCase().includes(q));
}

export function getImportantTopics(year?: YearId) {
  const pool = year ? getTopicsByYear(year) : topics;
  return pool.filter(t => t.important);
}

export function getStats(year?: YearId) {
  const pool = year ? getTopicsByYear(year) : topics;
  return {
    topics: pool.filter(t => t.category === 'topics').length,
    pyq_pdfs: pool.filter(t => t.category === 'pyq_pdfs').length,
    pyqs: pool.filter(t => t.category === 'pyqs').length,
    histology: pool.filter(t => t.category === 'histology').length,
    radiology: pool.filter(t => t.category === 'radiology').length,
    notes: pool.filter(t => t.category === 'notes').length,
    total: pool.length,
    important: pool.filter(t => t.important).length,
  };
}
