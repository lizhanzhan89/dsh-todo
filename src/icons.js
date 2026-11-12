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

function ChevronLeftIcon({ size = 13 }) {
  return h('svg', { width: size, height: size, viewBox: '0 0 16 16', 'aria-hidden': true },
    h('path', { d: 'M10 3.5L5.5 8 10 12.5', fill: 'none', stroke: 'currentColor', strokeWidth: 1.7, strokeLinecap: 'round', strokeLinejoin: 'round' }));
}

function ChevronRightIcon({ size = 13 }) {
  return h('svg', { width: size, height: size, viewBox: '0 0 16 16', 'aria-hidden': true },
    h('path', { d: 'M6 3.5L10.5 8 6 12.5', fill: 'none', stroke: 'currentColor', strokeWidth: 1.7, strokeLinecap: 'round', strokeLinejoin: 'round' }));
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

/* --- tab glyphs ---------------------------------------------------------- */

/**
 * "Active": an empty checkbox — the same square the row's checkbox would take,
 * so the tab reads as "not done yet" rather than as a generic circle.
 */
function CircleIcon({ size = 13 }) {
  return h('svg', { width: size, height: size, viewBox: '0 0 16 16', 'aria-hidden': true },
    h('rect', { x: 3, y: 3, width: 10, height: 10, rx: 2.4, fill: 'none', stroke: 'currentColor', strokeWidth: 1.5 }));
}

/** "Done": a ticked checkbox, filled so it reads at 13px. */
function DoneCircleIcon({ size = 13 }) {
  return h('svg', { width: size, height: size, viewBox: '0 0 16 16', 'aria-hidden': true },
    h('rect', { x: 3, y: 3, width: 10, height: 10, rx: 2.4, fill: 'currentColor' }),
    h('path', { d: 'M5.6 8.1l1.7 1.7 3.2-3.6', fill: 'none', stroke: 'var(--dsw-alias-bg-base)', strokeWidth: 1.6, strokeLinecap: 'round', strokeLinejoin: 'round' }));
}

/** "Notes": a page with a folded corner and two lines. */
function NoteIcon({ size = 13 }) {
  return h('svg', { width: size, height: size, viewBox: '0 0 16 16', 'aria-hidden': true },
    h('path', { d: 'M4 2.6h5l3 3v7.8a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V3.6a1 1 0 0 1 1-1z', fill: 'none', stroke: 'currentColor', strokeWidth: 1.4, strokeLinejoin: 'round' }),
    h('path', { d: 'M9 2.7v3h3', fill: 'none', stroke: 'currentColor', strokeWidth: 1.4, strokeLinejoin: 'round' }),
    h('path', { d: 'M5.6 9h4.8M5.6 11.3h3.2', fill: 'none', stroke: 'currentColor', strokeWidth: 1.3, strokeLinecap: 'round' }));
}

/**
 * "All": a 2x2 grid, one filled cell standing for each kind in the mix. A grid
 * reads as "everything collected" and cannot be mistaken for a checkbox, which
 * is what the three-bars glyph looked like next to the empty-circle one.
 */
function StackIcon({ size = 13 }) {
  return h('svg', { width: size, height: size, viewBox: '0 0 16 16', 'aria-hidden': true },
    h('rect', { x: 2.4, y: 2.4, width: 5, height: 5, rx: 1.3, fill: 'currentColor', opacity: .95 }),
    h('rect', { x: 8.6, y: 2.4, width: 5, height: 5, rx: 1.3, fill: 'currentColor', opacity: .45 }),
    h('rect', { x: 2.4, y: 8.6, width: 5, height: 5, rx: 1.3, fill: 'currentColor', opacity: .45 }),
    h('rect', { x: 8.6, y: 8.6, width: 5, height: 5, rx: 1.3, fill: 'currentColor', opacity: .95 }));
}

/**
 * The leading badge that marks a row's kind in the combined "All" tab. The icon
 * doubles as the tab glyph of that kind, so a row's badge and its tab look the
 * same.
 */
function KindBadge({ kind, label, size = 14 }) {
  // A todo takes the empty checkbox rather than the ticked one: a badge says
  // what the row *is*, and the ticked glyph would imply every todo is done.
  const Icon = kind === KIND_ENTRY ? NoteIcon : CircleIcon;
  return h('span', {
    className: 'tp-kind tp-kind-' + (kind === KIND_ENTRY ? 'note' : 'todo'),
    title: label,
    'aria-label': label,
  }, h(Icon, { size }));
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

/** A calendar page: the deadline control and the due-date badge. */
function CalendarIcon({ size = 13 }) {
  return h('svg', { width: size, height: size, viewBox: '0 0 16 16', 'aria-hidden': true },
    h('rect', { x: 2.6, y: 3.6, width: 10.8, height: 9.8, rx: 1.6, fill: 'none', stroke: 'currentColor', strokeWidth: 1.4 }),
    h('path', { d: 'M2.6 6.6h10.8M5.6 2.4v2.4M10.4 2.4v2.4', fill: 'none', stroke: 'currentColor', strokeWidth: 1.4, strokeLinecap: 'round' }));
}

/** A closed box: "archive". */
function ArchiveIcon({ size = 13 }) {
  return h('svg', { width: size, height: size, viewBox: '0 0 16 16', 'aria-hidden': true },
    h('rect', { x: 2.2, y: 3, width: 11.6, height: 3.4, rx: 1, fill: 'none', stroke: 'currentColor', strokeWidth: 1.4 }),
    h('path', { d: 'M3.4 6.4v6.2a1 1 0 0 0 1 1h7.2a1 1 0 0 0 1-1V6.4', fill: 'none', stroke: 'currentColor', strokeWidth: 1.4, strokeLinejoin: 'round' }),
    h('path', { d: 'M6.4 9.4h3.2', fill: 'none', stroke: 'currentColor', strokeWidth: 1.4, strokeLinecap: 'round' }));
}

/** A box with its lid lifted: "unarchive". */
function UnarchiveIcon({ size = 13 }) {
  return h('svg', { width: size, height: size, viewBox: '0 0 16 16', 'aria-hidden': true },
    h('rect', { x: 2.2, y: 2.2, width: 11.6, height: 3.2, rx: 1, fill: 'none', stroke: 'currentColor', strokeWidth: 1.4 }),
    h('path', { d: 'M3.4 5.6v6.6a1 1 0 0 0 1 1h7.2a1 1 0 0 0 1-1V5.6', fill: 'none', stroke: 'currentColor', strokeWidth: 1.4, strokeLinejoin: 'round' }),
    h('path', { d: 'M8 12v-3.4M6.6 10l1.4-1.4 1.4 1.4', fill: 'none', stroke: 'currentColor', strokeWidth: 1.3, strokeLinecap: 'round', strokeLinejoin: 'round' }));
}

/** A folder: the data-location line in the footer. */
function FolderIcon({ size = 13 }) {
  return h('svg', { width: size, height: size, viewBox: '0 0 16 16', 'aria-hidden': true },
    h('path', { d: 'M2.4 4.6a1 1 0 0 1 1-1h2.5l1.4 1.6h5.3a1 1 0 0 1 1 1v6.2a1 1 0 0 1-1 1H3.4a1 1 0 0 1-1-1V4.6z', fill: 'none', stroke: 'currentColor', strokeWidth: 1.4, strokeLinejoin: 'round' }));
}

/**
 * A plain cross: "clear". Smaller and thinner than `CloseIcon`, because it sits
 * on the corner of a 24px control and a full-weight X there reads as a close
 * button for the whole row.
 */
function CrossIcon({ size = 10 }) {
  return h('svg', { width: size, height: size, viewBox: '0 0 12 12', 'aria-hidden': true },
    h('path', { d: 'M3 3l6 6M9 3l-6 6', fill: 'none', stroke: 'currentColor', strokeWidth: 1.6, strokeLinecap: 'round' }));
}

/** A floppy-free "save" glyph: an arrow into a tray plus a corner mark. */
function SaveIcon({ size = 13 }) {
  return h('svg', { width: size, height: size, viewBox: '0 0 16 16', 'aria-hidden': true },
    h('path', { d: 'M8 2.5v6M5.6 6.1L8 8.5l2.4-2.4', fill: 'none', stroke: 'currentColor', strokeWidth: 1.5, strokeLinecap: 'round', strokeLinejoin: 'round' }),
    h('path', { d: 'M3 10.5v1.6a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1v-1.6', fill: 'none', stroke: 'currentColor', strokeWidth: 1.5, strokeLinecap: 'round' }));
}

/** A clock with an arrow running back: "restore to a moment". */
function HistoryIcon({ size = 13 }) {
  return h('svg', { width: size, height: size, viewBox: '0 0 16 16', 'aria-hidden': true },
    h('path', { d: 'M3 8a5 5 0 1 0 1.6-3.7', fill: 'none', stroke: 'currentColor', strokeWidth: 1.5, strokeLinecap: 'round' }),
    h('path', { d: 'M2.4 2.6v3h3', fill: 'none', stroke: 'currentColor', strokeWidth: 1.5, strokeLinecap: 'round', strokeLinejoin: 'round' }),
    h('path', { d: 'M8 5.6V8l1.9 1.1', fill: 'none', stroke: 'currentColor', strokeWidth: 1.4, strokeLinecap: 'round', strokeLinejoin: 'round' }));
}
