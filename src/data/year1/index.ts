// ═══════════════════════════════════════════════════════════════════════════════
// YEAR 1 — Index
// ═══════════════════════════════════════════════════════════════════════════════

import { anatomyTopics }      from './anatomy';
import { physiologyTopics }   from './physiology';
import { biochemistryTopics } from './biochemistry';
import type { Topic }         from '../types';

export const year1Topics: Topic[] = [
  ...anatomyTopics,
  ...physiologyTopics,
  ...biochemistryTopics,
];
