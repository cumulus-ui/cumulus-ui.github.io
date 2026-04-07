# Astro Docs Site Plan

## Context

Build an SSR docs/showcase site for `@cumulus-ui/components` using Astro + Lit SSR.
Replace the current hash-router demo app with a proper docs site at `/components/{name}`.

## Architecture Decision

**Astro v5+ with `@semantic-ui/astro-lit`** for Lit SSR integration.

Why Astro over Next.js (what Cloudscape uses):
- Native web component SSR via Declarative Shadow DOM
- Static-first with SSR opt-in — fast, no JS needed for static content
- File-based routing, content collections for component docs
- MDX for mixing docs prose with live component examples

Risk: `@lit-labs/ssr` is a Labs project, `@semantic-ui/astro-lit` is community-maintained.
Mitigation: Fallback to client-only rendering (`client:only="lit"`) if SSR breaks for specific components.

## Project Structure

```
docs/                              ← new Astro project at repo root
├── astro.config.mjs
├── package.json
├── src/
│   ├── content/
│   │   └── components/            ← MDX docs per component
│   │       ├── badge.mdx
│   │       ├── checkbox.mdx
│   │       ├── spinner.mdx
│   │       └── ...
│   ├── content.config.ts          ← content collection schema
│   ├── components/
│   │   ├── ComponentPreview.astro  ← live component demo wrapper
│   │   ├── PropsTable.astro        ← auto-generated props table
│   │   ├── CodeBlock.astro         ← syntax-highlighted code
│   │   ├── ThemeToggle.astro       ← light/dark mode switch
│   │   └── Sidebar.astro           ← navigation sidebar
│   ├── layouts/
│   │   ├── BaseLayout.astro        ← html shell, global CSS, fonts
│   │   └── ComponentLayout.astro   ← sidebar + content + props table
│   ├── pages/
│   │   ├── index.astro             ← landing page
│   │   ├── getting-started.astro
│   │   └── components/
│   │       └── [name].astro        ← dynamic route per component
│   └── styles/
│       └── global.css              ← Cloudscape tokens + normalize
└── tsconfig.json
```

The `docs/` package imports `@cumulus-ui/components` from the sibling `src/` directory.
This keeps the component library and docs site separate but co-located.

## Implementation Waves

### Wave 1: Foundation (4 tasks)
1. Scaffold Astro project in `docs/`
2. Install `@semantic-ui/astro-lit`, configure SSR integration
3. Set up Cloudscape design tokens (global CSS, dark mode toggle)
4. Create BaseLayout with fonts, tokens, theme toggle

### Wave 2: Component Pages (4 tasks)
5. Define content collection schema for component docs
6. Create `ComponentLayout.astro` with sidebar navigation
7. Create `[name].astro` dynamic route with `getStaticPaths()`
8. Write MDX docs for the 4 golden components (badge, spinner, icon, checkbox)

### Wave 3: Live Demos (3 tasks)
9. Create `ComponentPreview.astro` — renders Lit component with `client:visible`
10. Create `PropsTable.astro` — auto-generate from component interfaces.ts
11. Add light/dark mode preview toggle per component demo

### Wave 4: Polish (3 tasks)
12. Add syntax-highlighted code blocks for usage examples
13. Style with Cloudscape design tokens (spacing, typography, colors)
14. Deploy config (static output or SSR adapter)

## Dark Mode Strategy

Same as Cloudscape: CSS class toggle on `<body>`.
- `applyMode('dark')` adds `awsui-dark-mode` class
- All components use CSS custom properties that auto-switch
- Theme preference persisted in localStorage
- Inline script in `<head>` prevents flash of wrong theme

## SSR Gotchas to Watch

1. **Non-reflected properties**: Use `reflect: true` on props that must be visible in SSR HTML
2. **Browser-only APIs**: Keep `window.*`, `IntersectionObserver`, etc. out of `render()` — use `firstUpdated()` instead
3. **Declarative Shadow DOM**: Requires Chrome 111+, Safari 16.4+, Firefox 123+. Polyfill auto-injected.
4. **Integration order**: Put `lit()` first in `astro.config.mjs` to avoid global shim conflicts

## Relationship to Existing Demo App

The current demo app (`demo/` with Vite + hash router) stays for visual testing.
The Astro docs site is the public-facing documentation.

Eventually the demo app's permutation pages could be embedded in the docs site
via `<iframe>` or direct component rendering, but that's a future optimization.

## Dependencies

```json
{
  "@semantic-ui/astro-lit": "^5.3.0",
  "astro": "^5.0.0",
  "@astrojs/mdx": "^4.0.0",
  "lit": "^3.2.0",
  "@webcomponents/template-shadowroot": "^0.2.0",
  "@cumulus-ui/components": "workspace:*"
}
```
