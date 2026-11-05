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
