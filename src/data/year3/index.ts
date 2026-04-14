// ═══════════════════════════════════════════════════════════════════════════════
// YEAR 3 — Index
// ═══════════════════════════════════════════════════════════════════════════════

import { medicineTopics }   from './medicine';
import { surgeryTopics }    from './surgery';
import { obgTopics }        from './obg';
import { pediatricsTopics } from './pediatrics';
import type { Topic }       from '../types';

export const year3Topics: Topic[] = [
  ...medicineTopics,
  ...surgeryTopics,
  ...obgTopics,
  ...pediatricsTopics,
];
