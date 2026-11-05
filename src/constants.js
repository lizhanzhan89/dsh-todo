/**
 * Fixed identifiers shared by the Client halves and the Host route.
 */

/** Sidebar panel id, used for both `sidebar.panellist` and the `main` key. */
const PANEL_ID = 'todos';

/** Locale namespace these dictionaries register under. */
const NS = 'dshTodo';

/** Panellist order among the shipped sidebar icons. */
const PANEL_ORDER = 20;

/** Host route that reads and writes the JSON data file. */
const STATE_URL = '/api/dsh-todo';

/** Stable key for the fixed "Default" group (no project). */
const NO_PROJECT = '__none__';

/**
 * The four per-group tabs. `TAB_ALL` mixes open todos, completed todos and
 * notes, and is the only tab whose rows carry a kind badge.
 */
const TAB_ALL = 'all';
const TAB_ACTIVE = 'active';
const TAB_DONE = 'done';
const TAB_ENTRIES = 'entries';

/** Item kinds. `entry` is a note: plain text, no checkbox. */
const KIND_TODO = 'todo';
const KIND_ENTRY = 'entry';

/**
 * Text rows the inline editor opens with. An item may span many lines, so the
 * field shows three of them and scrolls beyond that instead of growing, which
 * keeps a row's height predictable while editing. A shorter item gets a shorter
 * field: the editor is sized to the text, never taller than this.
 */
const EDIT_ROWS = 3;

/**
 * Build stamp shown next to the panel title. Bump it on every shipped change:
 * the panel is served as an immutable bundle picked by file metadata, so when
 * a fix "does not apply" this number says whether the browser got the new code
 * at all. It is a diagnostic, not a release number.
 */
const BUILD = '2026-11-05.7';
