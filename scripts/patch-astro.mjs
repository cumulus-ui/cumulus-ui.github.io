import { readFileSync, writeFileSync } from 'node:fs';

const file = 'node_modules/astro/dist/runtime/server/jsx.js';
const content = readFileSync(file, 'utf8');
const patched = content.replace(
  'vnode.type !== ClientOnlyPlaceholder:',
  "vnode.type !== ClientOnlyPlaceholder && !vnode.type.includes('-'):"
);

if (content === patched) {
  console.log('⚠️  Astro patch target not found — may already be fixed or changed');
} else {
  writeFileSync(file, patched);
  console.log('✅ Patched astro JSX handler for custom element hydration');
}
