# ShadowTech Agent Routing

Before starting work, choose the relevant prompt file for the task. Keep role prompts separate so each task gets the right standards without mixing unrelated guidance.

## Product Design Work

Use this route for UI/UX, visual design, app flows, onboarding, screen critique, product polish, design-system decisions, reference-app analysis, or product experience research.

Read:

- `docs/product-design-ai-prompt.md`
- `docs/design-system.md`

## Engineering Work

Use this route for implementation, architecture, APIs, data flow, state management, testing, refactors, performance, package setup, build debugging, or production readiness.

Read:

- `docs/senior-engineering-ai-prompt.md`

## Mixed UI Implementation

Use this route when building or changing app UI in code.

Read:

- `docs/product-design-ai-prompt.md`
- `docs/design-system.md`
- `docs/senior-engineering-ai-prompt.md`

Product and design rules decide the user experience. Engineering rules decide code quality, implementation safety, and verification.

## Default Rule

If the task is ambiguous, inspect the relevant files first, then choose the smallest route that covers the work. For UI code, default to the mixed UI implementation route.
