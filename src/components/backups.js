/**
 * The backup page: take a manual snapshot, and restore any snapshot - automatic
 * or manual - over the current content.
 *
 * Two different verbs live here, and the page keeps them apart on purpose:
 *
 *   备份   copies what is on disk. Cheap, safe, no confirmation needed.
 *   恢复   replaces everything. It is the destructive one: a snapshot of the
 *          current content is taken first by the Host, but the user still has to
 *          say yes, because "put it all back" is not something to do by accident.
 *
 * This is not the "import" in the sidebar footer: import merges into what is
 * there, restore replaces it. Both exist because both are wanted at different
 * moments.
 */

/**
 * One backup row: when, which kind, how big, and the restore button.
 *
 * A broken file is shown with its button disabled rather than hidden: the user
 * should know the file is there and that it cannot be used.
 */
function backupRow(backup, api) {
  const { t } = api;
  const kindLabel = backup.kind === 'manual' ? t('backupKindManual') : t('backupKindAuto');
  return h('li', {
    key: backup.name,
    className: 'tp-backup-row' + (backup.ok ? '' : ' is-broken'),
  },
    h('span', { className: 'tp-backup-kind is-' + backup.kind }, kindLabel),
    h('span', { className: 'tp-backup-when' }, formatBackupStamp(backup.stamp)),
    h('span', { className: 'tp-backup-name', title: backup.name }, backup.name),
    backup.ok
      ? null
      : h('span', { className: 'tp-backup-broken' }, t('backupBroken')),
    h('button', {
      type: 'button',
      className: 'tp-btn tp-btn-sm tp-btn-danger tp-backup-restore',
      disabled: !backup.ok || api.restoring !== null,
      title: backup.ok ? t('restoreHint') : t('backupBroken'),
      onClick: () => api.restoreFromBackup(backup),
    }, api.restoring === backup.name ? t('restoring') : t('restore')));
}

/**
 * The whole page.
 *
 * @param {object} api { t, state, setView }
 */
function renderBackups(api) {
  const { t, state, setView } = api;
  const meta = state.meta || {};
  const backups = Array.isArray(meta.backups) ? meta.backups : [];
  const autos = backups.filter((b) => b.kind === 'auto');
  const manuals = backups.filter((b) => b.kind === 'manual');

  const section = (title, hint, list) => h('section', { className: 'tp-backup-section' },
    h('h2', { className: 'tp-backup-section-title' }, title,
      h('span', { className: 'tp-backup-section-count' }, String(list.length))),
    hint ? h('p', { className: 'tp-backup-section-hint' }, hint) : null,
    list.length
      ? h('ul', { className: 'tp-backup-list' }, list.map((backup) => backupRow(backup, api)))
      : h('div', { className: 'tp-empty' }, h('strong', null, t('backupNone')), t('backupNoneHint')));

  return h('div', { className: 'tp-content' },
    h('header', { className: 'tp-head tp-head-row' },
      h('div', null,
        h('h1', null, t('backups')),
        h('p', null, t('backupPageHint'))),
      h('div', { className: 'tp-head-actions' },
        h('button', {
          type: 'button',
          className: 'tp-btn',
          onClick: () => setView('board'),
        }, t('back')),
        h('button', {
          type: 'button',
          className: 'tp-btn tp-btn-primary' + (api.backingUp ? ' is-busy' : ''),
          disabled: api.backingUp,
          title: t('backupNowHint'),
          onClick: api.backupNow,
        }, h(SaveIcon, { size: 13 }), api.backingUp ? t('backingUp') : t('backupNow')))),
    h('div', { className: 'tp-backup-note' },
      h(FolderIcon, { size: 12 }),
      h('span', null, meta.backupDir || '')),
    section(t('backupManual'), t('backupManualHint'), manuals),
    section(
      t('backupAuto'),
      t('backupAutoHint').replace('{keep}', String(meta.keep || 7)),
      autos));
}
