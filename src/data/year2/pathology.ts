// ═══════════════════════════════════════════════════════════════════════════════
// YEAR 2 — Pathology
// ═══════════════════════════════════════════════════════════════════════════════

import { topic, histo, radio, type Topic } from '../types';

export const pathologyTopics: Topic[] = [

  topic('pathology', 'path-general', '⭐ Inflammation — Acute & Chronic'),
  topic('pathology', 'path-general', 'Cell Injury & Necrosis'),
  topic('pathology', 'path-general', '⭐ Neoplasia — Classification'),
  topic('pathology', 'path-general', 'Thrombosis & Embolism'),
  topic('pathology', 'path-general', 'Edema — Pathogenesis'),
  topic('pathology', 'path-general', 'Amyloidosis'),
  topic('pathology', 'path-hemato', '⭐ Anemia — Classification'),
  topic('pathology', 'path-hemato', 'Leukemia — Types'),
  topic('pathology', 'path-hemato', 'Lymphoma — Hodgkin vs NHL'),
  topic('pathology', 'path-hemato', 'Bleeding Disorders'),
  topic('pathology', 'path-systemic', 'Atherosclerosis'),
  topic('pathology', 'path-systemic', 'Valvular Heart Disease — Pathology'),
  topic('pathology', 'path-systemic', 'Lung Tumors'),
  topic('pathology', 'path-systemic', 'Liver — Cirrhosis Pathology'),
  topic('pathology', 'path-clinical', 'Tumor Markers'),
  topic('pathology', 'path-clinical', 'Immunohistochemistry Basics'),
  histo('pathology', 'path-general', '⭐ Granuloma — Histology'),
  histo('pathology', 'path-hemato', 'Peripheral Smear — Iron Deficiency'),
  radio('pathology', 'path-systemic', 'Lung Consolidation — X-ray'),
];
