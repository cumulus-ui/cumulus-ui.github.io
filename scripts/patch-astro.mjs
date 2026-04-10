import { readFileSync, writeFileSync } from 'node:fs';

const file = 'node_modules/astro/dist/runtime/server/jsx.js';
const content = readFileSync(file, 'utf8');

const original = 'vnode.type !== ClientOnlyPlaceholder):';
const replacement = "vnode.type !== ClientOnlyPlaceholder && !vnode.type.includes('-')):";

if (content.includes(replacement)) {
  console.log('astro/jsx: patch already applied');
} else if (content.includes(original)) {
  writeFileSync(file, content.replace(original, replacement));
  console.log('astro/jsx: patch applied');
} else {
  console.error('astro/jsx: patch failed — target string not found');
  process.exit(1);
}
