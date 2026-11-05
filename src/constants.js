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
 * keeps a row's height predictable while editing.
 */
const EDIT_ROWS = 3;

/**
 * Chars shown on one line of a collapsed multi-line row before it is cut. A
 * textarea's `cols` is measured in characters, so the cut has to be made in
 * characters too: the long line is what would otherwise blow the row's height.
 */
const COLLAPSED_CHARS = 58;

/** Text lines shown by a collapsed multi-line row; the rest is cut with "…". */
const COLLAPSED_LINES = 3;
