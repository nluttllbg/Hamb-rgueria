# CLAUDE.md — PROJECT DEVELOPMENT RULES

## Core Rules
- This project must strictly follow the provided Design System (`Burger in Casa — Design System`) and visual reference.
- The Design System is the single source of truth for all visual decisions.
- Never redesign, reinterpret, simplify, or arbitrarily modify the approved visual identity.
- Keep the exact 6-section order: Header → Hero → Duo de cards → Destaque + features → Banda Rodízio → Footer.
- Never use UI gradients (other than the Hero readability scrim), never use more than 3 UI background colors (charcoal `#231E1C`, cream `#F7F1E3`, yellow `#F4B41C`), and keep exactly one colored highlight per display title.

## Mandatory Animation Architecture
- Lenis MUST be used for smooth scrolling throughout the website.
- GSAP MUST be used for all movement animations.
- GSAP ScrollTrigger MUST control all scroll-based animations.
- Lenis and ScrollTrigger MUST be properly synchronized via `lenis.on('scroll', ScrollTrigger.update)` and `gsap.ticker`.
- All GSAP animations must be properly initialized and cleaned up inside React components.
- Use `gsap.context()` / `useGsap` hook and `gsap.matchMedia()` for responsive animations.
- Avoid duplicate ScrollTrigger instances.
- Never animate the same property simultaneously with CSS transitions and GSAP.
- Avoid independent scroll systems (`window.scrollTo` for animated scrolling).
- Respect `prefers-reduced-motion` accessibility settings.

## Technology Stack
- React 19 + Vite + TypeScript
- Tailwind CSS v4
- GSAP + GSAP ScrollTrigger
- Lenis Smooth Scroll
- Phosphor Icons (`@phosphor-icons/react`, weight `fill`)

## Development Rules
- Follow the original Design System tokens, typography, spacing, radii, and proportions.
- Maintain reusable components (`src/components/ui`, `src/components/layout`, `src/components/sections`, `src/components/svg`).
- Keep code modular and maintainable; decouple pure business logic (e.g. `src/utils/hours.ts`) and test with `node:test`.
- Use semantic HTML (`<header>`, `<nav>`, `<main>`, `<section>`, `<footer>`, single `<h1>`, `<h2>` per section).
- Optimize images (`fetchPriority="high"` for Hero, `loading="lazy"` for secondary images).
- Prevent layout shifts.
- Ensure responsive behavior across 360px, 375px, 390px, 414px, 768px, 1024px, 1280px, 1440px, and 1920px.
- Never introduce horizontal overflow.
- Preserve accessibility (WCAG AA contrast, `focus-visible` yellow ring, touch targets >= 44px on mobile, keyboard-navigable drawer).

## Animation Standards
- Use `power3.out` for cinematic entrance animations unless the Design System specifies otherwise.
- Use staggered sequences (`stagger: 0.2`) for grouped elements in the pinned cinematic ScrollTrigger sequence.
- Prefer `transform` and `opacity` (and `clip-path` where appropriate) for performance.
- Avoid excessive animation.
- Use ScrollTrigger for scroll-based scenes and desktop pinning (`>= 1024px`).
- Properly clean up animations when components unmount.

## Final Validation
Before completing the project, verify:
- Visual fidelity against the Design System.
- Responsiveness (360px through 1920px).
- Navigation functionality (smooth scroll + external WhatsApp, Instagram, Maps, and menu links).
- Animation synchronization (Lenis + GSAP ScrollTrigger).
- ScrollTrigger behavior and pin cleanup.
- Performance and zero layout shift.
- Accessibility and `prefers-reduced-motion`.
- Absence of horizontal overflow.
- Absence of console errors.
