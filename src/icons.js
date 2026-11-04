/**
 * Inline SVG icons. Every icon takes `size` and inherits `currentColor`; each is
 * drawn from the plugin's own paths, so no external assets are loaded.
 */

function CheckIcon({ size = 12 }) {
  return h('svg', { width: size, height: size, viewBox: '0 0 16 16', 'aria-hidden': true },
    h('path', { d: 'M3 8.5l3 3 7-7', fill: 'none', stroke: 'currentColor', strokeWidth: 2, strokeLinecap: 'round', strokeLinejoin: 'round' }));
}

function PlusIcon({ size = 13 }) {
  return h('svg', { width: size, height: size, viewBox: '0 0 16 16', 'aria-hidden': true },
    h('path', { d: 'M8 3v10M3 8h10', fill: 'none', stroke: 'currentColor', strokeWidth: 2, strokeLinecap: 'round' }));
}

function TrashIcon({ size = 14 }) {
  return h('svg', { width: size, height: size, viewBox: '0 0 16 16', 'aria-hidden': true },
    h('path', { d: 'M2.5 4h11M6 4V2.5h4V4M4 4l.7 9a1 1 0 001 .9h4.6a1 1 0 001-.9L12 4', fill: 'none', stroke: 'currentColor', strokeWidth: 1.4, strokeLinecap: 'round', strokeLinejoin: 'round' }));
}

function PencilIcon({ size = 14 }) {
  return h('svg', { width: size, height: size, viewBox: '0 0 16 16', 'aria-hidden': true },
    h('path', { d: 'M11.2 2.6a1.2 1.2 0 011.7 0l.5.5a1.2 1.2 0 010 1.7L5.6 12.6l-2.4.6.6-2.4 7.4-7.4z', fill: 'none', stroke: 'currentColor', strokeWidth: 1.3, strokeLinejoin: 'round' }),
    h('path', { d: 'M10.3 3.5l2.2 2.2', fill: 'none', stroke: 'currentColor', strokeWidth: 1.3, strokeLinecap: 'round' }));
}

function SearchIcon({ size = 14 }) {
  return h('svg', { width: size, height: size, viewBox: '0 0 16 16', 'aria-hidden': true },
    h('circle', { cx: 7, cy: 7, r: 4.3, fill: 'none', stroke: 'currentColor', strokeWidth: 1.5 }),
    h('path', { d: 'M10.3 10.3L14 14', fill: 'none', stroke: 'currentColor', strokeWidth: 1.5, strokeLinecap: 'round' }));
}

function CloseIcon({ size = 12 }) {
  return h('svg', { width: size, height: size, viewBox: '0 0 16 16', 'aria-hidden': true },
    h('path', { d: 'M4 4l8 8M12 4l-8 8', fill: 'none', stroke: 'currentColor', strokeWidth: 1.6, strokeLinecap: 'round' }));
}

/** Sidebar glyph: the checklist mark supplied to `sidebar.panellist`. */
function TodoIcon({ size = 18 }) {
  return h('svg', { width: size, height: size, viewBox: '0 0 24 24', 'aria-hidden': true, style: { display: 'block' } },
    h('path', { d: 'M4 7.5l2 2 3.5-4', fill: 'none', stroke: 'currentColor', strokeWidth: 2, strokeLinecap: 'round', strokeLinejoin: 'round' }),
    h('path', { d: 'M4 16.5l2 2 3.5-4', fill: 'none', stroke: 'currentColor', strokeWidth: 2, strokeLinecap: 'round', strokeLinejoin: 'round', opacity: 0.55 }),
    h('path', { d: 'M12 8h8M12 17h8', fill: 'none', stroke: 'currentColor', strokeWidth: 2, strokeLinecap: 'round' }));
}

/** Download arrow into a tray: "export". */
function DownloadIcon({ size = 13 }) {
  return h('svg', { width: size, height: size, viewBox: '0 0 16 16', 'aria-hidden': true },
    h('path', { d: 'M8 2.5v7.5M5 7.2l3 3 3-3', fill: 'none', stroke: 'currentColor', strokeWidth: 1.5, strokeLinecap: 'round', strokeLinejoin: 'round' }),
    h('path', { d: 'M2.8 12.6h10.4', fill: 'none', stroke: 'currentColor', strokeWidth: 1.5, strokeLinecap: 'round' }));
}

/** Tray with an upward arrow: "import". */
function UploadIcon({ size = 13 }) {
  return h('svg', { width: size, height: size, viewBox: '0 0 16 16', 'aria-hidden': true },
    h('path', { d: 'M8 10.5V3M5 5.8l3-3 3 3', fill: 'none', stroke: 'currentColor', strokeWidth: 1.5, strokeLinecap: 'round', strokeLinejoin: 'round' }),
    h('path', { d: 'M2.8 12.6h10.4', fill: 'none', stroke: 'currentColor', strokeWidth: 1.5, strokeLinecap: 'round' }));
}

/** Two arrows chasing each other in a circle: "sync". */
function SyncIcon({ size = 13 }) {
  return h('svg', { width: size, height: size, viewBox: '0 0 16 16', 'aria-hidden': true },
    h('path', {
      d: 'M13 8a5 5 0 0 1-8.4 3.6M3 8a5 5 0 0 1 8.4-3.6',
      fill: 'none',
      stroke: 'currentColor',
      strokeWidth: 1.5,
      strokeLinecap: 'round',
    }),
    h('path', { d: 'M11.4 1.9v2.7H8.7', fill: 'none', stroke: 'currentColor', strokeWidth: 1.5, strokeLinecap: 'round', strokeLinejoin: 'round' }),
    h('path', { d: 'M4.6 14.1v-2.7h2.7', fill: 'none', stroke: 'currentColor', strokeWidth: 1.5, strokeLinecap: 'round', strokeLinejoin: 'round' }));
}
