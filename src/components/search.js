/**
 * Search field in the title row, plus the "include completed" switch beside it.
 *
 * Typing filters the board in place: rows and groups that do not match are
 * hidden, and the completed todos join the results only when the box is ticked.
 * Escape or the clear button resets the query.
 */

/**
 * @param {object} api { t, query, setQuery, includeDone, setIncludeDone }
 */
function renderSearch(api) {
  const { t, query, setQuery, includeDone, setIncludeDone } = api;

  return h('div', { className: 'tp-search-group' },
    h('div', { className: 'tp-search' },
      h('span', { className: 'tp-search-glyph', 'aria-hidden': true }, h(SearchIcon, { size: 14 })),
      h('input', {
        className: 'tp-input tp-search-input',
        type: 'search',
        value: query,
        placeholder: t('searchPlaceholder'),
        onChange: (event) => setQuery(event.target.value),
        onKeyDown: (event) => {
          if (event.key === 'Escape') { event.preventDefault(); setQuery(''); }
        },
        'aria-label': t('searchPlaceholder'),
      }),
      query
        ? h('button', {
            type: 'button',
            className: 'tp-icon-btn tp-search-clear',
            'aria-label': t('searchClear'),
            title: t('searchClear'),
            onClick: () => setQuery(''),
          }, h(CloseIcon, { size: 12 }))
        : null),
    h('label', { className: 'tp-search-toggle', title: t('searchIncludeDone') },
      h('input', {
        type: 'checkbox',
        className: 'tp-search-check',
        checked: includeDone,
        onChange: (event) => setIncludeDone(Boolean(event.target.checked)),
      }),
      h('span', null, t('searchIncludeDone'))));
}
