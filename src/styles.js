/**
 * Panel stylesheet, injected by `apply` as one `<style data-dsh-todo>` tag.
 *
 * Rules use only `--dsw-alias-*` theme tokens so the panel follows light/dark
 * switching; every class is namespaced with `tp-`. The file is a plain string
 * because the browser artifact is not transpiled: no template literal here so a
 * concatenating build cannot break on inner backticks.
 */
const CSS = `
.tp-page{width:100%;min-width:0;height:100%;min-height:0;color:var(--dsw-alias-label-primary);background:var(--dsw-alias-bg-base);font-size:14px;line-height:1.6;display:flex;overflow:hidden}
.tp-nav{flex:none;width:190px;min-height:0;display:flex;flex-direction:column;border-right:.5px solid var(--dsw-alias-border-l1);background:var(--dsw-alias-bg-layer-1);overflow:hidden}
.tp-nav-head{padding:24px 16px 8px;font-size:12px;font-weight:600;color:var(--dsw-alias-label-secondary);letter-spacing:.02em;text-transform:uppercase}
.tp-nav-list{flex:1;min-height:0;overflow:auto;padding:4px 8px 24px;display:flex;flex-direction:column;gap:2px}
.tp-nav-item{display:flex;align-items:center;gap:8px;width:100%;text-align:left;border:0;background:transparent;color:var(--dsw-alias-label-secondary);font:inherit;font-size:13px;line-height:18px;padding:7px 10px;border-radius:8px;cursor:pointer}
.tp-nav-item:hover{background:var(--dsw-alias-bg-layer-2);color:var(--dsw-alias-label-primary)}
.tp-nav-item:focus-visible{outline:2px solid var(--dsw-alias-brand-primary);outline-offset:2px}
.tp-nav-item.is-active{background:var(--dsw-alias-bg-layer-2);color:var(--dsw-alias-label-primary);font-weight:500}
.tp-nav-grip.is-blank{opacity:0}
/* Two drop zones for a dragged project, sharing one look: they only exist while
   a project is being dragged, and they collapse to nothing otherwise. Archive
   sits above delete, so the recoverable outcome is the one reached first. */
.tp-nav-drop{display:none;margin:4px 8px 0;padding:8px 10px;align-items:center;gap:8px;border:.5px dashed var(--dsw-alias-border-l2);border-radius:10px;color:var(--dsw-alias-label-secondary);font-size:12px;line-height:16px;transition:border-color .12s,background .12s,color .12s}
.tp-nav.is-dragging .tp-nav-drop{display:flex}
.tp-nav-drop.is-hot{border-color:var(--dsw-alias-brand-primary);background:var(--dsw-alias-bg-layer-2);color:var(--dsw-alias-label-primary)}
.tp-nav-drop.trash.is-hot{border-color:var(--dsw-alias-state-error-primary);color:var(--dsw-alias-state-error-primary)}
/* A hairline between the project rows and the cross-project views: the rows
   above are groups of items, the three below are ways of looking at all of them. */
.tp-nav-sep{height:.5px;margin:6px 4px;background:var(--dsw-alias-border-l1)}

.tp-nav-drop-icon{flex:none;display:inline-flex;align-items:center}
.tp-nav-drop-text{flex:1;min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
.tp-nav-count{transition:opacity .12s}
.tp-nav-item.is-draggable{cursor:grab}
.tp-nav-item.is-draggable:active{cursor:grabbing}
.tp-nav-item.is-dragging{opacity:.45}
.tp-nav-item.is-drop-target{box-shadow:inset 0 2px 0 0 var(--dsw-alias-brand-primary);background:var(--dsw-alias-bg-layer-2)}
.tp-nav-grip{flex:none;color:var(--dsw-alias-label-secondary);font-size:12px;opacity:0;transition:opacity .12s}
.tp-nav-item:hover .tp-nav-grip,.tp-nav-item.is-dragging .tp-nav-grip{opacity:1}
.tp-nav-name{flex:1;min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
.tp-nav-count{flex:none;font-size:11px;font-variant-numeric:tabular-nums;color:var(--dsw-alias-label-secondary);background:var(--dsw-alias-bg-base);border-radius:9px;padding:0 6px;min-width:18px;text-align:center}
.tp-nav-empty{padding:8px 12px;color:var(--dsw-alias-label-secondary);font-size:12px}
.tp-nav-foot{flex:none;padding:8px;border-top:.5px solid var(--dsw-alias-border-l1)}
/* Export and import share one row above "New project". */
.tp-nav-data{display:flex;gap:6px;margin:0 0 8px;padding:6px;border-radius:10px}
/* The wash behind these buttons is the area's, so the buttons themselves stay
   transparent until hovered. */
.tp-nav-data .tp-btn{background:transparent;border-color:transparent}
.tp-nav-data .tp-btn:hover{background:var(--dsw-alias-bg-base);border-color:var(--dsw-alias-border-l1)}
.tp-nav-data-btn{flex:1;justify-content:center;min-width:0;height:30px;padding:0 6px;font-size:12px;gap:4px;white-space:nowrap}
.tp-nav-data-btn svg{flex:none}
.tp-nav-data-btn:disabled,.tp-nav-data-btn.is-busy{cursor:default;opacity:.55}
.tp-nav-data-btn:disabled:hover,.tp-nav-data-btn.is-busy:hover{background:var(--dsw-alias-bg-layer-1);border-color:var(--dsw-alias-border-l2)}
label.tp-nav-data-btn{cursor:pointer}
.tp-nav-new{width:100%;justify-content:center}
.tp-nav-create{display:flex;flex-direction:column;gap:6px}
/* Taller than the plain input: this field is a one-off action, and at 32px it
   read as an inline chip next to the buttons under it.
   One rule only. An earlier attempt kept a second copy that the base .tp-input
   rule overrode at equal specificity, which is what made the height look
   ignored. The element selector raises specificity so there is no tie left to
   lose. min-height and line-height are repeated on purpose: an input's used
   height is driven by the line box, so a rule that only set height would still
   look unchanged whenever something else overrode it. */
.tp-nav-create input.tp-input{height:52px;min-height:52px;line-height:20px;font-size:15px;padding:0 14px;border-radius:12px}
.tp-nav-create-actions{display:flex;gap:6px}
.tp-nav-create-actions .tp-btn{flex:1;justify-content:center;height:30px;padding:0 8px}
.tp-pane{flex-direction:column;flex:1;min-width:0;min-height:0;display:flex}
.tp-scroll{scrollbar-gutter:stable;flex:1;min-height:0;overflow:auto}
.tp-content{max-width:820px;margin:0 auto;padding:0 clamp(20px,4vw,44px) 48px}
.tp-head{margin-bottom:20px;padding-top:28px}
.tp-head h1{margin:0;font-size:20px;font-weight:500;line-height:28px;display:flex;align-items:baseline;gap:8px}
/* The build stamp: small, quiet, and only there to identify the loaded code. */
.tp-build{font-size:11px;font-weight:400;line-height:16px;color:var(--dsw-alias-label-secondary);font-variant-numeric:tabular-nums}
.tp-head p{margin:4px 0 0;color:var(--dsw-alias-label-secondary);font-size:13px;line-height:20px}
.tp-toolbar{display:flex;flex-wrap:wrap;align-items:center;gap:8px;margin-bottom:20px}
.tp-btn{border:.5px solid var(--dsw-alias-border-l2);background:var(--dsw-alias-bg-layer-1);color:var(--dsw-alias-label-primary);border-radius:10px;height:32px;padding:0 12px;font:inherit;font-size:13px;cursor:pointer;display:inline-flex;align-items:center;gap:6px;transition:background .15s,border-color .15s}
.tp-btn:hover{background:var(--dsw-alias-bg-layer-2);border-color:var(--dsw-alias-border-l1)}
.tp-btn:focus-visible{outline:2px solid var(--dsw-alias-brand-primary);outline-offset:2px}
.tp-btn-primary{background:var(--dsw-alias-brand-primary);border-color:var(--dsw-alias-brand-primary);color:#fff}
.tp-btn-primary:hover{background:var(--dsw-alias-brand-primary);opacity:.9}
.tp-input{box-sizing:border-box;flex:1;min-width:0;height:34px;border:.5px solid var(--dsw-alias-border-l2);background:var(--dsw-alias-bg-base);color:var(--dsw-alias-label-primary);border-radius:10px;padding:0 12px;font:inherit;font-size:14px;outline:none;transition:border-color .15s}
.tp-input::placeholder{color:var(--dsw-alias-label-secondary)}
.tp-input:focus{border-color:var(--dsw-alias-brand-primary)}
.tp-search-group{flex:none;display:flex;align-items:center;gap:12px}
.tp-search{position:relative;display:flex;align-items:center;gap:8px;width:clamp(150px,26vw,260px)}
.tp-search-toggle{flex:none;display:inline-flex;align-items:center;gap:6px;font-size:13px;color:var(--dsw-alias-label-secondary);cursor:pointer;user-select:none;white-space:nowrap}
.tp-search-toggle:hover{color:var(--dsw-alias-label-primary)}
.tp-search-check{width:14px;height:14px;margin:0;accent-color:var(--dsw-alias-brand-primary);cursor:pointer}
.tp-search-check:focus-visible{outline:2px solid var(--dsw-alias-brand-primary);outline-offset:2px}
.tp-tab.is-filtered .tp-tab-count{opacity:.9}
.tp-head-title{flex:1;min-width:0}
.tp-search-glyph{position:absolute;left:11px;display:inline-flex;color:var(--dsw-alias-label-secondary);pointer-events:none}
.tp-search-input{padding-left:32px;padding-right:30px}
.tp-search-input::-webkit-search-cancel-button{display:none}
.tp-search-clear{position:absolute;right:5px}
.tp-group{border:.5px solid var(--dsw-alias-border-l2);border-radius:14px;background:var(--dsw-alias-bg-layer-1);margin-bottom:14px;overflow:hidden;scroll-margin-top:16px}
.tp-group-head{display:grid;grid-template-columns:minmax(0,1fr) auto minmax(0,1fr);align-items:center;gap:12px;padding:8px 12px;border-bottom:.5px solid var(--dsw-alias-border-l1)}
.tp-group-side{display:flex;align-items:center;min-width:0}
.tp-group-side-left{justify-content:flex-start}
.tp-group-side-right{justify-content:flex-end}
.tp-group-center{display:flex;align-items:center;justify-content:center;min-width:0}
.tp-group-title{min-width:0;margin:0;text-align:center;font-size:15px;font-weight:600;line-height:22px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
.tp-icon-btn{flex:none;width:26px;height:26px;border:0;border-radius:8px;background:transparent;color:var(--dsw-alias-label-secondary);cursor:pointer;display:inline-flex;align-items:center;justify-content:center;padding:0}
.tp-icon-btn:hover{background:var(--dsw-alias-bg-layer-2);color:var(--dsw-alias-state-error-primary)}
.tp-icon-btn:focus-visible{outline:2px solid var(--dsw-alias-brand-primary);outline-offset:2px}
.tp-todos{list-style:none;margin:0;padding:6px;display:flex;flex-direction:column;gap:4px}
.tp-todo{position:relative;display:flex;align-items:flex-start;gap:10px;padding:10px 8px 10px 12px;border-radius:10px;transition:background .12s}
/* Hover deepens the wash slightly instead of swapping in a token colour, which
   would replace the kind's tint with a neutral one on every mouse-over. */
/* Each row carries a faint wash instead of the old left bar: it marks the row
   without an edge that has to line up with anything. Hover swaps in a token
   layer, which reads as "this one" rather than as a different kind of row.
   The wash itself is set inline per kind (see rowTint in components/row.js),
   because it differs per kind and React owns that value. */
.tp-todo{touch-action:manipulation}
.tp-todo:hover{background:var(--dsw-alias-bg-layer-2)}
.tp-check{flex:none;width:18px;height:18px;margin-top:2px;border-radius:50%;border:1.5px solid var(--dsw-alias-border-l1);background:transparent;cursor:pointer;display:inline-flex;align-items:center;justify-content:center;padding:0;color:#fff}
.tp-check.is-done{background:var(--dsw-alias-state-success-primary);border-color:var(--dsw-alias-state-success-primary)}
.tp-check:focus-visible{outline:2px solid var(--dsw-alias-brand-primary);outline-offset:2px}
/* pre-wrap keeps the newlines a user typed and still wraps long lines. The row
   shows the whole item: it is the record, and hiding part of it behind an
   ellipsis makes a three-line note look like a truncated one. Only the editor
   is bounded to three rows. */
.tp-todo-text{flex:1;min-width:0;overflow-wrap:anywhere;font-size:14px;line-height:22px;white-space:pre-wrap}
.tp-todo.is-todo .tp-todo-text{font-weight:500}
.tp-todo.tp-entry .tp-todo-text{font-size:13.5px;color:var(--dsw-alias-label-secondary)}
.tp-editable{cursor:text;border-radius:4px;padding:1px 3px;margin:-1px -3px}
.tp-editable:hover{background:var(--dsw-alias-bg-base);box-shadow:0 0 0 1px var(--dsw-alias-border-l1)}
/* The inline editor is sized in JS to the text it holds: one row for a short
   item, up to three, then it scrolls. A fixed three-row field was tried first
   and left two empty rows under a one-line todo. The row height is the same
   68px ceiling, so the list does not jump when the editor opens. */
.tp-edit-input{height:auto;font-size:14px;line-height:20px;padding:4px 8px;margin:-4px 0;resize:none;overflow-y:auto;max-height:68px;font-family:inherit}
.tp-edit-btn{opacity:0;transition:opacity .12s}
.tp-todo:hover .tp-edit-btn,.tp-edit-btn:focus-visible{opacity:1}
.tp-todo.is-done .tp-todo-text{color:var(--dsw-alias-label-secondary);text-decoration:line-through}
.tp-locked{cursor:default}
.tp-add-inline{display:flex;align-items:flex-end;gap:6px;min-width:0;max-width:100%}
/* The field grows with its container. It used to be capped at
   clamp(80px,14vw,150px), which is 150px on any screen wider than ~1070px: that
   cap, not the layout, was why narrowing the button freed nothing. flex:1 with
   a 16em basis lets the field take whatever the header leaves, and 16em reads
   as the placeholder's natural width. */
.tp-add-inline .tp-input{height:32px;font-size:13px;padding:0 10px;width:auto;flex:1 1 16em;max-width:100%;min-width:0}
/* The add button is a square "+", so the field beside it gets the width the
   label used to take: roughly three more characters at 13px. */
.tp-add-btn{width:30px;height:30px;padding:0;justify-content:center;flex:none;align-self:flex-start}
.tp-add-btn svg{flex:none}
/* The add field is a one-row textarea so it can hold newlines: 30px tall at one
   line, growing to a small ceiling before it scrolls. */
.tp-add-inline textarea.tp-add-input{height:auto;min-height:30px;max-height:96px;line-height:20px;padding:5px 10px;resize:none;overflow-y:auto;font-family:inherit}
.tp-add-inline .tp-btn{height:30px;padding:0 10px;font-size:13px;flex:none;align-self:flex-start}
/* Beats the rule directly above, which ties on specificity and would give the
   "+" button back its 10px padding and stop it being a 30px square. */
.tp-add-inline .tp-btn.tp-add-btn{width:30px;height:30px;padding:0;justify-content:center}
/* A strip under the group header for the "All" tab's own switch. */
.tp-group-tools{display:flex;justify-content:flex-end;padding:6px 14px 0}
.tp-inline-toggle{display:inline-flex;align-items:center;gap:6px;font-size:12px;line-height:16px;color:var(--dsw-alias-label-secondary);cursor:pointer;user-select:none}
.tp-inline-toggle:hover{color:var(--dsw-alias-label-primary)}
.tp-empty{padding:26px 16px;text-align:center;color:var(--dsw-alias-label-secondary);font-size:13px}
.tp-empty strong{display:block;margin-bottom:4px;color:var(--dsw-alias-label-primary);font-weight:500}
.tp-muted{color:var(--dsw-alias-label-secondary)}
.tp-tabs{display:flex;align-items:center;gap:4px;padding:0;min-width:0;flex-wrap:wrap}
.tp-tab{height:28px;border:0;background:transparent;color:var(--dsw-alias-label-secondary);font:inherit;font-size:13px;cursor:pointer;padding:0 8px;border-radius:14px;display:inline-flex;align-items:center;gap:5px;white-space:nowrap}
.tp-tab svg{flex:none;opacity:.85}
.tp-tab.is-active svg{opacity:1}
.tp-tab:hover{background:var(--dsw-alias-bg-layer-2)}
.tp-tab.is-active{background:var(--dsw-alias-bg-layer-2);color:var(--dsw-alias-label-primary);font-weight:500}
.tp-tab:focus-visible{outline:2px solid var(--dsw-alias-brand-primary);outline-offset:2px}
.tp-tab-count{color:var(--dsw-alias-label-secondary);font-size:12px;font-variant-numeric:tabular-nums}
.tp-todo-main{flex:1;min-width:0;display:flex;flex-direction:column;gap:2px}
/* The grip is the only draggable element, so it always shows a grab cursor even
   while invisible, which tells the mouse where a drag can start. */
.tp-row-grip{flex:none;width:12px;color:var(--dsw-alias-label-secondary);font-size:12px;line-height:22px;cursor:grab;opacity:0;transition:opacity .12s;text-align:center;user-select:none}
.tp-row-grip:active{cursor:grabbing}
.tp-todo:hover .tp-row-grip,.tp-todo.is-dragging .tp-row-grip{opacity:1}
.tp-todo.is-dragging{opacity:.45}
.tp-todo.is-drop-target{box-shadow:inset 0 2px 0 0 var(--dsw-alias-brand-primary)}
.tp-todo-time{color:var(--dsw-alias-label-secondary);font-size:12px;line-height:16px}
/* Kind badge: only the combined "All" tab shows one, because only there do
   todos and notes share a column. */
.tp-kind{flex:none;display:inline-flex;align-items:center;justify-content:center;width:20px;height:20px;margin-top:1px;border-radius:6px}
.tp-kind-todo{color:var(--dsw-alias-brand-primary);background:var(--dsw-alias-bg-layer-2)}
.tp-kind-note{color:var(--dsw-alias-label-secondary);background:var(--dsw-alias-bg-layer-1)}
.tp-todos.is-mixed .tp-todo.has-kind{padding-left:4px;gap:8px}
.tp-nav-trash{margin-top:6px;padding-top:9px;border-top:.5px solid var(--dsw-alias-border-l1);border-radius:0 0 8px 8px}
.tp-nav-trash-icon{flex:none;display:inline-flex;align-items:center;color:var(--dsw-alias-label-secondary)}
.tp-head-row{display:flex;align-items:center;justify-content:space-between;gap:16px;flex-wrap:wrap}
.tp-head-row .tp-head-actions{align-self:center}
.tp-head-actions{display:flex;align-items:center;gap:8px;flex:none}
.tp-btn-sm{height:28px;padding:0 10px;font-size:12px;border-radius:8px}
.tp-btn-danger{color:var(--dsw-alias-state-error-primary)}
.tp-btn-danger:hover{border-color:var(--dsw-alias-state-error-primary);color:var(--dsw-alias-state-error-primary)}
.tp-trash-list{padding:0;display:flex;flex-direction:column;gap:2px}
.tp-trash-row{align-items:center;gap:12px;padding:10px 12px;border-radius:12px;background:var(--dsw-alias-bg-layer-1);border:.5px solid var(--dsw-alias-border-l1)}
.tp-trash-row:hover{background:var(--dsw-alias-bg-layer-2)}
.tp-trash-title{display:flex;align-items:center;gap:6px;color:var(--dsw-alias-label-secondary);font-size:12px;line-height:16px}
.tp-trash-kind{border-radius:6px;padding:0 6px;background:var(--dsw-alias-bg-base)}
.tp-trash-project{overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
/* Status line for export/import: floats over the pane so nothing shifts. */
.tp-pane{position:relative}
.tp-notice{position:absolute;left:50%;bottom:16px;transform:translateX(-50%);max-width:min(520px,calc(100% - 32px));display:flex;align-items:center;gap:10px;padding:8px 8px 8px 14px;border-radius:10px;border:.5px solid var(--dsw-alias-border-l2);background:var(--dsw-alias-bg-layer-1);box-shadow:0 6px 20px rgba(0,0,0,.12);font-size:13px;line-height:18px;color:var(--dsw-alias-label-primary);z-index:2}
.tp-notice.is-error{border-color:var(--dsw-alias-state-error-primary);color:var(--dsw-alias-state-error-primary)}
.tp-notice-text{flex:1;min-width:0}
.tp-notice-close{flex:none}

/* --- deadline view -------------------------------------------------------
   A flat list per bucket: date, text, project. It is a view of the whole store
   rather than a group, so it has no tabs and no add field - the row's own
   project is the way back to editing it. */
.tp-due-section{margin-bottom:18px}
.tp-due-section-title{display:flex;align-items:center;gap:8px;margin:0 0 6px;padding:0 2px;font-size:12px;font-weight:600;line-height:16px;letter-spacing:.02em;color:var(--dsw-alias-label-secondary)}
.tp-due-section-title.is-overdue{color:var(--dsw-alias-state-error-primary)}
.tp-due-section-title.is-today{color:var(--dsw-alias-brand-primary)}
.tp-due-section-count{font-size:11px;font-weight:400;font-variant-numeric:tabular-nums;color:var(--dsw-alias-label-secondary);background:var(--dsw-alias-bg-base);border-radius:9px;padding:0 6px;min-width:18px;text-align:center}
.tp-due-list{list-style:none;margin:0;padding:0;display:flex;flex-direction:column;gap:2px}
.tp-due-row{display:flex;align-items:center;gap:12px;padding:8px 12px;border-radius:10px;border:.5px solid var(--dsw-alias-border-l1);background:var(--dsw-alias-bg-layer-1)}
.tp-due-row:hover{background:var(--dsw-alias-bg-layer-2)}
.tp-due-row-date{flex:none;display:inline-flex;align-items:center;gap:5px;min-width:74px;font-size:12px;line-height:16px;font-variant-numeric:tabular-nums;color:var(--dsw-alias-label-secondary)}
.tp-due-row-text{flex:1;min-width:0;font-size:14px;line-height:22px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
.tp-due-row-project{flex:none;display:inline-flex;align-items:center;gap:4px;max-width:140px;border:0;background:transparent;border-radius:7px;padding:2px 6px;font:inherit;font-size:12px;line-height:16px;color:var(--dsw-alias-label-secondary);cursor:pointer;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
.tp-due-row-project:hover{background:var(--dsw-alias-bg-base);color:var(--dsw-alias-label-primary)}
.tp-due-row-project svg{flex:none}

/* --- backup page ---------------------------------------------------------
   One row per snapshot: kind, when, file name, restore. The manual kind is the
   accented one because it is the one the user made on purpose. */
.tp-backup-note{display:flex;align-items:center;gap:6px;margin:-8px 0 18px;font-size:11px;line-height:16px;color:var(--dsw-alias-label-secondary);word-break:break-all}
.tp-backup-section{margin-bottom:22px}
.tp-backup-section-title{display:flex;align-items:center;gap:8px;margin:0 0 4px;font-size:13px;font-weight:600;line-height:18px;color:var(--dsw-alias-label-primary)}
.tp-backup-section-count{font-size:11px;font-weight:400;font-variant-numeric:tabular-nums;color:var(--dsw-alias-label-secondary);background:var(--dsw-alias-bg-base);border-radius:9px;padding:0 6px;min-width:18px;text-align:center}
.tp-backup-section-hint{margin:0 0 8px;font-size:12px;line-height:16px;color:var(--dsw-alias-label-secondary)}
.tp-backup-list{list-style:none;margin:0;padding:0;display:flex;flex-direction:column;gap:2px}
.tp-backup-row{display:flex;align-items:center;gap:10px;padding:8px 10px;border-radius:10px;border:.5px solid var(--dsw-alias-border-l1);background:var(--dsw-alias-bg-layer-1)}
.tp-backup-row:hover{background:var(--dsw-alias-bg-layer-2)}
.tp-backup-row.is-broken{opacity:.65}
.tp-backup-kind{flex:none;font-size:11px;line-height:16px;border-radius:6px;padding:0 6px;background:var(--dsw-alias-bg-base);color:var(--dsw-alias-label-secondary)}
.tp-backup-kind.is-manual{color:var(--dsw-alias-brand-primary)}
.tp-backup-when{flex:none;min-width:132px;font-size:12px;line-height:16px;font-variant-numeric:tabular-nums;color:var(--dsw-alias-label-primary)}
.tp-backup-name{flex:1;min-width:0;font-size:11px;line-height:16px;color:var(--dsw-alias-label-secondary);overflow:hidden;text-overflow:ellipsis;white-space:nowrap;font-family:ui-monospace,SFMono-Regular,Menlo,monospace}
.tp-backup-broken{flex:none;font-size:11px;line-height:16px;color:var(--dsw-alias-state-error-primary)}
.tp-backup-restore{flex:none}
.tp-backup-actions{flex:none;display:inline-flex;align-items:center;gap:4px}
/* The confirm pair replaces the row's buttons, so the row has to stay the same
   height and the two answers have to be the eye-catching part. */
.tp-backup-confirm{flex:none;display:inline-flex;align-items:center;gap:4px}
.tp-backup-row.is-confirming{border-color:var(--dsw-alias-state-error-primary)}
.tp-backup-row.is-confirming .tp-backup-name{color:var(--dsw-alias-label-primary)}
.tp-backup-delete{width:26px;height:26px}
.tp-notice.is-error .tp-notice-close:hover{color:var(--dsw-alias-state-error-primary)}

/* --- deadlines ------------------------------------------------------------
   The control is a glyph, not a field: a date input on every row would read as
   a form. The real date input is invisible and stretched over the glyph, so the
   click lands on it and the browser opens its own picker in the right place. */
.tp-due-wrap{position:relative;flex:none;display:inline-flex;align-items:center;justify-content:center;width:24px;height:24px;border-radius:7px;color:var(--dsw-alias-label-secondary);cursor:pointer;opacity:0;transition:opacity .12s,background .12s,color .12s}
.tp-todo:hover .tp-due-wrap,.tp-due-wrap:focus-within,.tp-due-wrap.has-value{opacity:1}
.tp-due-wrap:hover{background:var(--dsw-alias-bg-layer-2);color:var(--dsw-alias-label-primary)}
.tp-due-wrap.has-value{color:var(--dsw-alias-brand-primary)}
/* A deadline that is due or late colours the glyph, so the row says it even
   before the badge below is read. */
.tp-due-wrap.is-today{color:var(--dsw-alias-brand-primary)}
.tp-due-wrap.is-overdue{color:var(--dsw-alias-state-error-primary)}
.tp-due-wrap svg{pointer-events:none}
.tp-due-input{position:absolute;inset:0;width:100%;height:100%;padding:0;border:0;margin:0;background:transparent;opacity:0;cursor:pointer;-webkit-appearance:none;appearance:none}
.tp-due-input::-webkit-date-and-time-value{color:transparent}
.tp-due-input:focus-visible{outline:none}
.tp-due-wrap:focus-within{outline:2px solid var(--dsw-alias-brand-primary);outline-offset:1px}
/* Clearing rides on the same control and only exists once there is a date. */
.tp-due-clear{position:absolute;right:-5px;top:-5px;width:13px;height:13px;padding:0;border:0;border-radius:50%;background:var(--dsw-alias-bg-layer-2);color:var(--dsw-alias-label-secondary);display:none;align-items:center;justify-content:center;cursor:pointer}
.tp-due-wrap.has-value:hover .tp-due-clear{display:inline-flex}
.tp-due-clear:hover{background:var(--dsw-alias-state-error-primary);color:#fff}


/* The badge sits under the text with the finish time. Colour carries urgency:
   overdue is the error colour, today is the brand accent, the rest stays quiet. */
.tp-todo-meta{display:flex;align-items:center;gap:10px;min-height:16px}
.tp-todo-meta:empty{display:none}
.tp-due{display:inline-flex;align-items:center;gap:4px;font-size:12px;line-height:16px;color:var(--dsw-alias-label-secondary);font-variant-numeric:tabular-nums}
.tp-due.is-today{color:var(--dsw-alias-brand-primary);font-weight:500}
.tp-due.is-soon{color:var(--dsw-alias-label-primary)}
.tp-due.is-overdue{color:var(--dsw-alias-state-error-primary);font-weight:500}
.tp-due.is-done{color:var(--dsw-alias-label-secondary);opacity:.7}
.tp-due-rel{font-size:11px}
.tp-due.is-done .tp-due-date{text-decoration:line-through}

/* --- archive -------------------------------------------------------------- */
.tp-nav-archive{margin-top:2px}
.tp-archived-head{padding-top:12px}
.tp-archived-counts{display:flex;align-items:center;gap:8px;font-size:12px;line-height:16px;color:var(--dsw-alias-label-secondary)}
.tp-archived-overdue{color:var(--dsw-alias-state-error-primary)}
/* The archived rows keep the board's layout but not its drag affordances. */
.tp-row-grip.is-inert{opacity:0;cursor:default}
.tp-archived .tp-todo:hover{background:var(--dsw-alias-bg-layer-2)}

/* The quiet data-folder line in the footer: one row, one tooltip, no path in
   sight until it is asked for. */
.tp-nav-path{display:flex;align-items:center;gap:5px;margin-top:6px;padding:0 2px;font-size:11px;line-height:16px;color:var(--dsw-alias-label-secondary);cursor:default}
.tp-nav-path svg{flex:none;opacity:.75}
.tp-nav-path-text{overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
`;
