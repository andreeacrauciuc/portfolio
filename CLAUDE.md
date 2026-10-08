# Engineering standards: Andreea's portfolio

## Context

Personal portfolio (Vite + React + TypeScript + Sass) for a Business Informatics graduate applying for her first IT job. The code itself is part of the portfolio: recruiters and engineers will read it. Act as a senior frontend engineer doing a code review on your own work.

## Principles

- Separation of concerns: data / logic (hooks) / UI (components) / styles are never mixed in one file.
- One responsibility per file and per function. Prefer small, composable pieces over big ones. Aim for under ~120 lines per component.
- Readability over cleverness. Names explain intent (`useActiveSection`, not `useScroll2`). No abbreviations.
- No dead code, no commented-out code, no unused imports, no TODOs left silently (placeholders for user content stay clearly marked TODO).
- No magic numbers or strings: thresholds, breakpoints, durations and colors live in constants or style tokens.
- Do not over-engineer: no abstractions without at least two real uses, no memoization without a measured reason.

## Structure

- Folder layout: `src/{components/{ui,layout,sections}, hooks, data, types, styles, lib}`. Each section/component lives in its own folder with its `.tsx`, `.module.scss` and (if needed) `index.ts`.
- Named exports only (no default exports except where the tooling requires them). Absolute imports with the `@` alias.
- Content lives only in `src/data` and is typed. Components receive data through typed props.

## TypeScript

- Strict mode, no `any`, no non-null assertions without a comment, explicit types on public props and hook return values, derive types from data where possible.

## React

- Function components, hooks only. Effects have correct dependencies and cleanup. Side effects (scroll, resize, observers, mouse) live in custom hooks, never inline in components.
- Do not store per-frame values in React state. Use refs and CSS custom properties for scroll/mouse-driven visuals. Animate only `transform` and `opacity`.
- Lists use stable keys (never the array index when data has an id).

## Styles (Sass)

- Tokens, mixins and keyframes live in `src/styles`:
  - `_tokens.scss`: SCSS variables (colors, fonts, radii, spacing, easing, durations, z-index, breakpoint). It emits no CSS. The `custom-properties` mixin exposes the runtime-relevant ones on `:root`.
  - `_mixins.scss`: reusable recipes (`glass-surface`, `mono-label`, `serif-heading`, `pill`, `focus-ring`) and media helpers (`desktop`, `reduced-motion`, `motion-safe`, `motion-safe-hover`). Emits no CSS.
  - `_animations.scss`: every `@keyframes`, each wrapped in a mixin because CSS Modules scope keyframe names. Include the mixin in the module that uses the animation.
  - `_base.scss`: reset, body, typography, focus ring, global reduced-motion rule, `:root` custom properties.
  - `main.scss`: the global entry. It forwards tokens, mixins and animations and is the only file that emits global CSS.
- Components use `@use "tokens" as t;` and `@use "mixins" as m;` (resolved through Vite `loadPaths`). Always `@use`, never `@import`. Never `@use` `main.scss` or `_base.scss` from a component, to avoid duplicated global output.
- One CSS Module per component (`Name.module.scss`). Class names are short, meaningful and BEM-ish (`.card`, `.card__title`, `.is-active`).
- Nest for states and child elements, but never deeper than 3 levels.
- No inline styles except truly dynamic values passed as CSS custom properties (scroll progress, pointer position, per-item index or color).
- Mobile first, with real media queries through the `desktop` mixin, not JS width checks. Support `prefers-reduced-motion` properly: content is always visible and usable.
- Reusable patterns (glass surface, mono label, pill) exist once, as mixins or components. Never copy-paste them.

## Accessibility, performance, SEO

- Semantic HTML, real links for navigation (`href="#id"`), skip link, visible focus states, keyboard support, AA contrast, meaningful alt text, aria only where native HTML is not enough.
- Optimized images with width/height, fonts preloaded, no layout shift, small bundle, Lighthouse 95+ on mobile.
- Complete meta tags, Open Graph, JSON-LD, `robots.txt`, `sitemap.xml`.

## Git

- Work only inside this folder's own git repository. Never touch or stage anything outside it.
- One conventional commit per phase (`feat:`, `refactor:`, `chore:`, `test:`, `docs:`), small and focused, imperative messages.

## Definition of done (check before finishing ANY phase)

1. `npm run lint`, `typecheck`, `test` and `build` all pass with zero warnings.
2. The site looks and behaves exactly like before (compare in the browser, desktop and 390px mobile).
3. No file mixes data, logic and styling. No duplicated code. No unused code.
4. Briefly list what changed and anything to check or replace by hand.

## Never

- Never change the visual design or invent content, metrics, employers or certificates.
- Never add dependencies without saying why.
- Never claim something works without running it.
