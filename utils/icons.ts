/**
 * Minimal, consistent line icons rendered inline as SVG.
 * Keeping icons in code (not icon fonts or sprite libraries) keeps the
 * frontend lightweight and CSP-clean. All icons share a 24x24 grid and
 * 1.6 stroke, inherit `currentColor`, and are decorative by default.
 *
 * Usage in EJS (trusted, first-party markup):
 *   <%- icon('chart', 'h-6 w-6 text-clay') %>
 */

const PATHS: Record<string, string> = {
  'arrow-right': '<path d="M5 12h14M13 6l6 6-6 6"/>',
  'arrow-up-right': '<path d="M7 17 17 7M8 7h9v9"/>',
  check: '<path d="m5 12.5 4.5 4.5L19 7"/>',
  route:
    '<circle cx="6" cy="19" r="2.4"/><circle cx="18" cy="5" r="2.4"/><path d="M8.4 19H14a3.6 3.6 0 0 0 0-7.2H10A3.6 3.6 0 0 1 10 4.6h5.6"/>',
  chart:
    '<path d="M4 4v15a1 1 0 0 0 1 1h15"/><path d="M8 16v-4M12.5 16V9M17 16v-6"/>',
  shield:
    '<path d="M12 3.2 19 6v5.2c0 4.4-3 7.6-7 9.4-4-1.8-7-5-7-9.4V6z"/><path d="m9 12 2.2 2.2L15.5 10"/>',
  database:
    '<ellipse cx="12" cy="6" rx="7" ry="3"/><path d="M5 6v12c0 1.66 3.13 3 7 3s7-1.34 7-3V6"/><path d="M5 12c0 1.66 3.13 3 7 3s7-1.34 7-3"/>',
  compass:
    '<circle cx="12" cy="12" r="9"/><path d="m15.2 8.8-2 4.4-4.4 2 2-4.4z"/>',
  users:
    '<circle cx="9" cy="8" r="3.2"/><path d="M3.5 20a5.5 5.5 0 0 1 11 0"/><path d="M16 5.2a3.2 3.2 0 0 1 0 6M17.5 14.4A5.5 5.5 0 0 1 20.5 20"/>',
  layers:
    '<path d="m12 3 8 4.5-8 4.5-8-4.5z"/><path d="m4 12 8 4.5L20 12"/><path d="m4 16.5 8 4.5 8-4.5"/>',
  gauge:
    '<path d="M4.5 18a8.5 8.5 0 1 1 15 0"/><path d="M12 14.5 16 9"/><circle cx="12" cy="14.5" r="1.3"/>',
  mail:
    '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="m4 7 8 6 8-6"/>',
  phone:
    '<path d="M6.5 4h3l1.5 4-2 1.4a11 11 0 0 0 5.6 5.6L16 13l4 1.5v3a2 2 0 0 1-2.2 2A15.5 15.5 0 0 1 4.5 6.2 2 2 0 0 1 6.5 4Z"/>',
  document:
    '<path d="M7 3h7l4 4v13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1Z"/><path d="M14 3v4h4M9 12h6M9 16h6"/>',
  sliders:
    '<path d="M5 8h9M18 8h1M5 16h1M10 16h9"/><circle cx="16" cy="8" r="2"/><circle cx="8" cy="16" r="2"/>',
  lock:
    '<rect x="5" y="11" width="14" height="9" rx="2"/><path d="M8 11V8a4 4 0 0 1 8 0v3"/>',
};

function icon(name: string, classes = 'h-6 w-6'): string {
  const body = PATHS[name];
  if (!body) return '';
  return (
    `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" ` +
    `stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false" ` +
    `class="${classes}">${body}</svg>`
  );
}

export { icon, PATHS };
