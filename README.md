# Andreea — Portfolio

Personal portfolio for a Business Informatics graduate applying for a first IT role: editorial design, glassmorphism, a timeline that draws itself on scroll and a logo marquee.

## Tech stack

- Vite, React 18, TypeScript (strict)
- Sass (SCSS) with CSS Modules
- ESLint (typescript-eslint, react, react-hooks, jsx-a11y) and Prettier
- Vitest and jsdom for tests
- `react-icons` for the technology logos (tree-shaken: only the icons in use are bundled)

## Scripts

| Script                            | What it does                       |
| --------------------------------- | ---------------------------------- |
| `npm run dev`                     | Start the dev server               |
| `npm run build`                   | Typecheck, then build to `dist/`   |
| `npm run preview`                 | Serve the production build locally |
| `npm run lint`                    | ESLint, zero warnings allowed      |
| `npm run typecheck`               | TypeScript without emitting        |
| `npm run format` / `format:check` | Prettier write / check             |
| `npm test`                        | Run the Vitest suite               |

## Project structure

```
src/
  main.tsx            Entry point
  App.tsx             Page composition
  data/               All site content, typed (profile, nav, facts, journey, projects, skills, technologies)
  types/              Shared types for the content
  components/
    ui/               Reusable building blocks (Marquee, ...)
  hooks/              Custom hooks (useInView, ...)
  lib/                Small helpers and constants (cn, constants)
  styles/             Sass tokens, mixins, keyframes and global base styles
```

The architecture separates four concerns: **data** (`src/data`), **logic** (`src/hooks`), **UI** (`src/components`) and **styles** (`src/styles` plus one CSS Module per component).

## How styles are organized

- `_tokens.scss` holds the design tokens as SCSS variables and emits no CSS.
- `_mixins.scss` holds reusable recipes (glass surface, mono label, serif heading, pill, focus ring) and media helpers (`desktop`, `reduced-motion`, ...).
- `_animations.scss` holds every `@keyframes`, as mixins, because CSS Modules scope keyframe names.
- `_base.scss` and `main.scss` are the global layer: reset, body and `:root` custom properties.
- Components import tokens and mixins with `@use`, nest at most three levels deep, and only set inline styles for truly dynamic values (passed as CSS custom properties).

Full conventions are in [CLAUDE.md](CLAUDE.md).

## Editing the content

All text, links, projects and timeline entries live in `src/data/`. Replace the placeholders marked `TODO`:

| What                    | Where                                                               |
| ----------------------- | ------------------------------------------------------------------- |
| Photo                   | `public/andreea.jpg`                                                |
| CV                      | `public/cv.pdf`                                                     |
| Email, LinkedIn         | `src/data/profile.ts`                                               |
| Live links for projects | `src/data/projects.ts` (`liveUrl`; leave it out to hide the button) |
| Marquee logos           | `src/data/technologies.ts` (one line per technology)                |

## Deploying

1. Push the repository to GitHub.
2. On [vercel.com](https://vercel.com) choose **Add New → Project** and select the repository. Vercel detects Vite automatically (build command `npm run build`, output directory `dist`).
3. Add the resulting URL to your CV and LinkedIn profile.
