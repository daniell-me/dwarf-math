# Claude Code Preferences

## Data Management
- **Always store data in TypeScript files with proper types** rather than JSON files
- This provides better type safety, IDE support, and maintainability
- Structure: `/src/data/filename.ts` with exported constants and interfaces

## Code Organization
- Prefer separate files for data models over inline definitions
- Use proper TypeScript interfaces and types for all data structures

## Development Process
- **Always run `npm run type-check` before considering any coding task complete**
- TypeScript errors must be resolved before the task is finished
- Use type checking to catch issues early rather than discovering them at runtime