// ═══════════════════════════════════════════════════════════════════════════════
// YEAR 2 — Index
// ═══════════════════════════════════════════════════════════════════════════════

import { pathologyTopics }    from './pathology';
import { pharmacologyTopics } from './pharmacology';
import { microbiologyTopics } from './microbiology';
import { forensicTopics }     from './forensic';
import type { Topic }         from '../types';

export const year2Topics: Topic[] = [
  ...pathologyTopics,
  ...pharmacologyTopics,
  ...microbiologyTopics,
  ...forensicTopics,
];
