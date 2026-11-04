/**
 * Fixed identifiers shared by the Client halves and the Host route.
 */

/** Sidebar panel id, used for both `sidebar.panellist` and the `main` key. */
const PANEL_ID = 'todos';

/** Locale namespace these dictionaries register under. */
const NS = 'todoProject';

/** Panellist order among the shipped sidebar icons. */
const PANEL_ORDER = 20;

/** Host route that reads and writes the JSON data file. */
const STATE_URL = '/api/todo-project';

/** Stable key for the fixed "Default" group (no project). */
const NO_PROJECT = '__none__';

/** The three per-group tabs. */
const TAB_ACTIVE = 'active';
const TAB_DONE = 'done';
const TAB_ENTRIES = 'entries';

/** Item kinds. `entry` is a note: plain text, no checkbox. */
const KIND_TODO = 'todo';
const KIND_ENTRY = 'entry';
