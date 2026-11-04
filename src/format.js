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
