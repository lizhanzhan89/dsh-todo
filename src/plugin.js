/**
 * Plugin wiring: registers the locale dictionaries, the stylesheet, the sidebar
 * icon and the page. Everything is owned by an effect, so unloading the plugin
 * (or collapsing the sidebar) removes what `apply` added.
 */
const plugin = {
  inject: ['slots', 'locale'],
  apply(ctx) {
    ctx.effect(() => ctx.locale.register(NS, { en, zh }), 'dsh-todo: dictionaries');
    ctx.effect(() => {
      const style = document.createElement('style');
      style.setAttribute('data-dsh-todo', '');
      style.textContent = CSS;
      document.head.appendChild(style);
      return () => { style.remove(); };
    }, 'dsh-todo: styles');

    const t = ctx.locale.bind(NS);

    // The page: same key as the sidebar icon, so the icon opens this panel.
    ctx.slots.inject('main', () => ctx.slots.register({
      name: 'main',
      key: PANEL_ID,
      inject: () => ({ t }),
    }, TodoPage));

    // The sidebar icon, rendered inside the global panel list.
    ctx.slots.inject('sidebar.panellist', () => ctx.slots.register({
      name: 'sidebar.panellist',
      id: PANEL_ID,
      order: PANEL_ORDER,
      label: () => t('panel'),
    }, function TodoPanelIcon({ size }) {
      return h(TodoIcon, { size });
    }));
  },
};

return plugin;
