// ═══════════════════════════════════════════════════════════════════════════════
// YEAR 4 — Index
// ═══════════════════════════════════════════════════════════════════════════════

import { orthopaedicsTopics }  from './orthopaedics';
import { ophthalmologyTopics } from './ophthalmology';
import { entTopics }           from './ent';
import { dermatologyTopics }   from './dermatology';
import { psychiatryTopics }    from './psychiatry';
import { radiologyTopics }     from './radiology';
import type { Topic }          from '../types';

export const year4Topics: Topic[] = [
  ...orthopaedicsTopics,
  ...ophthalmologyTopics,
  ...entTopics,
  ...dermatologyTopics,
  ...psychiatryTopics,
  ...radiologyTopics,
];
