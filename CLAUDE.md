# IDK-MBBS-Archive

React + TypeScript + Vite static website for MBBS students.
No backend. No database. No API calls.

## Stack
- React + TypeScript
- Vite (build tool)
- Tailwind CSS
- All content in src/data/ as .ts files

## Structure
- src/components/ → all UI components
- src/data/ → year1.ts to year4.ts (all content lives here)
- dist/ → built output, never edit manually

## Design system
- minimal and colorful

## Rules for all agents
- Never touch src/data/ files (that's the content agent's job)
- Always run npm run build after changes
- Keep all functionality, only change what's asked