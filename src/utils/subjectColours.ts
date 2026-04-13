// src/utils/subjectColours.ts

/** One hex colour per subject ID. Used as badge background, card left-border, sidebar active tint. */
export const SUBJECT_COLOURS: Record<string, string> = {
  anatomy:       '#7c3aed',
  physiology:    '#e11d48',
  biochemistry:  '#d97706',
  pathology:     '#ea580c',
  pharmacology:  '#16a34a',
  microbiology:  '#0d9488',
  forensic:      '#475569',
  medicine:      '#2563eb',
  surgery:       '#dc2626',
  obg:           '#c026d3',
  peds:          '#65a30d',
  ortho:         '#ca8a04',
  ophthalmology: '#0284c7',
  ent:           '#4338ca',
  dermatology:   '#db2777',
  psychiatry:    '#9333ea',
  radiology_sub: '#0891b2',
};

/** Returns the hex colour for a subject, falling back to zinc if unknown. */
export function subjectColour(subjectId: string): string {
  return SUBJECT_COLOURS[subjectId] ?? '#71717a';
}

/** 2-letter monogram derived from the subject name (e.g. "Anatomy" → "An"). */
export function subjectMonogram(name: string): string {
  const clean = name.trim();
  return clean.length >= 2 ? clean[0].toUpperCase() + clean[1].toLowerCase() : clean.toUpperCase();
}

interface SubjectBadgeProps {
  subjectId: string;
  subjectName: string;
  /** 'md' = 36×36px (landing cards), 'sm' = 22×22px (sidebar rows) */
  size?: 'md' | 'sm';
}

/** Solid-colour rounded square with a 2-letter monogram. No emoji. */
export function SubjectBadge({ subjectId, subjectName, size = 'md' }: SubjectBadgeProps) {
  const colour = subjectColour(subjectId);
  const monogram = subjectMonogram(subjectName);
  const dim = size === 'sm' ? 22 : 36;
  const fontSize = size === 'sm' ? 9 : 12;

  return (
    <div
      style={{
        width: dim,
        height: dim,
        minWidth: dim,
        backgroundColor: colour,
        borderRadius: size === 'sm' ? 5 : 8,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize,
        fontWeight: 700,
        color: 'white',
        flexShrink: 0,
        letterSpacing: '0.02em',
      }}
      aria-hidden
    >
      {monogram}
    </div>
  );
}
