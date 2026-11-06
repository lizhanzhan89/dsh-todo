/**
 * Date rendering. Timestamps are stored as ISO strings (UTC) and shown in the
 * viewer's own locale and time zone.
 */

/** Local "YYYY/MM/DD HH:mm"-style stamp, or '' when the value is unusable. */
function formatTime(iso) {
  try {
    const date = new Date(iso);
    if (isNaN(date.getTime())) return '';
    return date.toLocaleString(undefined, {
      year: 'numeric', month: '2-digit', day: '2-digit',
      hour: '2-digit', minute: '2-digit',
    });
  } catch (e) {
    return '';
  }
}

/** Current time as the ISO string written into `completedAt` / `deletedAt`. */
function now() {
  return new Date().toISOString();
}

/* --- deadlines ------------------------------------------------------------ */

/**
 * A calendar day as a local `YYYY-MM-DD` string.
 *
 * `toISOString()` is deliberately not used: it converts to UTC, so east of
 * Greenwich an evening date rolls over to the next day and a todo due "today"
 * would show as due tomorrow.
 */
function dayKey(date) {
  const d = date || new Date();
  const pad = (n) => String(n).padStart(2, '0');
  return d.getFullYear() + '-' + pad(d.getMonth() + 1) + '-' + pad(d.getDate());
}

/** Whole days from today to a `YYYY-MM-DD` date; negative when overdue. */
function daysUntil(due) {
  if (!due) return null;
  const parts = String(due).split('-').map(Number);
  if (parts.length !== 3 || parts.some(isNaN)) return null;
  const target = new Date(parts[0], parts[1] - 1, parts[2]);
  const today = new Date();
  const start = new Date(today.getFullYear(), today.getMonth(), today.getDate());
  return Math.round((target.getTime() - start.getTime()) / 86400000);
}

/**
 * How a deadline reads: `overdue` / `today` / `soon` (within a week) / `later`.
 * The row styles by this class, so the urgency is not only in the text.
 */
function dueState(due) {
  const days = daysUntil(due);
  if (days === null) return null;
  if (days < 0) return 'overdue';
  if (days === 0) return 'today';
  return days <= 7 ? 'soon' : 'later';
}

/**
 * A deadline as the row shows it: the day, with the year only when it is not
 * this one. `11-06` today, `2027-03-01` for a date far enough out that leaving
 * the year off would be ambiguous.
 */
function shortDate(due) {
  if (!due) return '';
  const parts = String(due).split('-');
  if (parts.length !== 3) return String(due);
  const sameYear = Number(parts[0]) === new Date().getFullYear();
  return sameYear ? parts[1] + '-' + parts[2] : due;
}
