/**
 * Pure rendering: turns data from data.js into HTML strings.
 * Nothing here touches the router or global state.
 */
(function (DD) {
  'use strict';

  // Full class names are listed (not built by concatenation) so Tailwind's
  // runtime scanner can always see them.
  const TONES = {
    blue:    { text: 'text-blue-400',    tint: 'bg-blue-500/10',    hover: 'hover:border-blue-500/40' },
    emerald: { text: 'text-emerald-400', tint: 'bg-emerald-500/10', hover: 'hover:border-emerald-500/40' },
    amber:   { text: 'text-amber-400',   tint: 'bg-amber-500/10',   hover: 'hover:border-amber-500/40' },
    purple:  { text: 'text-purple-400',  tint: 'bg-purple-500/10',  hover: 'hover:border-purple-500/40' },
    cyan:    { text: 'text-cyan-400',    tint: 'bg-cyan-500/10',    hover: 'hover:border-cyan-500/40' },
    rose:    { text: 'text-rose-400',    tint: 'bg-rose-500/10',    hover: 'hover:border-rose-500/40' },
    red:     { text: 'text-red-400',     tint: 'bg-red-500/10',     hover: 'hover:border-red-500/40' },
  };

  const STATUS_STYLES = {
    'Completed':   { dot: 'bg-emerald-400', badge: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' },
    'In Progress': { dot: 'bg-amber-400',   badge: 'bg-amber-500/10 text-amber-400 border-amber-500/20' },
    'Pending':     { dot: 'bg-slate-600',   badge: 'bg-slate-800 text-slate-400 border-slate-700' },
    'Planned':     { dot: 'bg-slate-600',   badge: 'bg-slate-800 text-slate-400 border-slate-700' },
  };

  const esc = (value) =>
    String(value).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

  const icon = (name, extra = '') => `<i class="fa-solid ${name} ${extra}" aria-hidden="true"></i>`;

  const phaseLabel = (phase) => `Phase ${phase.replace('phase', '')}`;

  const formatMetric = (m) => (m.text !== undefined ? m.text : m.value.toFixed(m.decimals) + (m.suffix || ''));

  // ---- Navigation --------------------------------------------------------

  function desktopNav(pages) {
    return pages
      .map(
        (p) => `
        <button type="button" data-nav="${p.id}" class="nav-btn px-3 py-2 rounded-lg text-xs font-medium text-slate-300 hover:text-white hover:bg-slate-800 flex items-center space-x-2 whitespace-nowrap transition-all">
          ${icon(p.icon, TONES[p.tone].text)}<span>${esc(p.label)}</span>
        </button>`
      )
      .join('');
  }

  function mobileNav(pages) {
    return pages
      .map(
        (p) => `
        <button type="button" data-nav="${p.id}" class="nav-btn w-full text-left px-3 py-2 rounded-lg text-sm font-medium text-slate-300 hover:bg-slate-800 flex items-center space-x-3">
          ${icon(p.icon, `${TONES[p.tone].text} w-5`)}<span>${esc(p.mobileLabel || p.label)}</span>
        </button>`
      )
      .join('');
  }

  // ---- Overview ----------------------------------------------------------

  function metrics(items) {
    return items
      .map((m) => {
        const t = TONES[m.tone];
        const countAttrs = m.value !== undefined
          ? ` data-count-to="${m.value}" data-decimals="${m.decimals}" data-suffix="${esc(m.suffix || '')}"`
          : '';
        return `
        <article class="bg-slate-800/60 p-5 rounded-xl border border-slate-700/60 ${t.hover} transition-all">
          <div class="flex justify-between items-start">
            <h3 class="text-xs font-medium text-slate-400">${esc(m.label)}</h3>
            <div class="p-2 ${t.tint} ${t.text} rounded-lg">${icon(m.icon)}</div>
          </div>
          <div class="text-3xl font-bold text-white mt-2"${countAttrs}>${esc(formatMetric(m))}</div>
          <p class="text-xs text-slate-400 mt-1">${esc(m.caption)}</p>
        </article>`;
      })
      .join('');
  }

  // ---- Solutions ---------------------------------------------------------

  function solutions(items) {
    return items
      .map((s) => {
        const t = TONES[s.tone];
        const cardBorder = s.featured ? 'border-amber-500/40 shadow-lg bg-slate-800/90' : 'border-slate-700 bg-slate-800/80';
        const rankBadge = s.featured
          ? 'bg-amber-500 text-slate-950 font-extrabold shadow-md'
          : 'bg-slate-700 text-slate-200 font-bold';
        const footer = s.action
          ? `<button type="button" data-nav="${s.action.target}" class="w-full py-2 bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 text-xs font-semibold rounded-lg border border-amber-500/30 transition-all flex items-center justify-center space-x-1">
               <span>${esc(s.action.label)}</span>${icon('fa-angle-right')}
             </button>`
          : `<div class="text-xs text-slate-400 border-t border-slate-700/50 pt-2 flex justify-between gap-3">
               <span>${esc(s.facts[0])}</span><span class="text-right">${esc(s.facts[1])}</span>
             </div>`;
        return `
        <article class="rounded-2xl p-5 border ${cardBorder} relative flex flex-col justify-between">
          <div class="absolute -top-3 -right-3 w-8 h-8 rounded-full ${rankBadge} flex items-center justify-center text-sm" aria-label="Rank ${s.rank}">#${s.rank}</div>
          <div>
            <div class="flex items-center space-x-3 mb-3">
              <div class="p-3 ${t.tint} ${t.text} rounded-xl">${icon(s.icon, 'text-xl')}</div>
              <div>
                <h3 class="text-base font-bold text-white">${esc(s.title)}</h3>
                <span class="text-xs ${t.text} font-medium">${esc(s.tag)}</span>
              </div>
            </div>
            <p class="text-xs text-slate-300 leading-relaxed mb-4">${esc(s.description)}</p>
          </div>
          ${footer}
        </article>`;
      })
      .join('');
  }

  // ---- SMART -------------------------------------------------------------

  function smart(items) {
    return items
      .map((s) => {
        const t = TONES[s.tone];
        return `
        <article class="bg-slate-800/80 p-5 rounded-2xl border border-slate-700 flex items-start space-x-4${s.wide ? ' md:col-span-2' : ''}">
          <div class="w-12 h-12 rounded-xl ${t.tint} ${t.text} flex items-center justify-center font-bold text-xl flex-shrink-0" aria-hidden="true">${esc(s.letter)}</div>
          <div>
            <h3 class="text-base font-bold text-white">${esc(s.name)}</h3>
            <p class="text-xs text-slate-300 mt-1 leading-relaxed">${esc(s.text)}</p>
          </div>
        </article>`;
      })
      .join('');
  }

  // ---- Timeline ----------------------------------------------------------

  function taskSummary(tasks) {
    const total = tasks.length;
    const count = (status) => tasks.filter((t) => t.status === status).length;
    const done = count('Completed');
    const pct = Math.round((done / total) * 100);
    const chips = ['Completed', 'In Progress', 'Pending', 'Planned']
      .map((status) => {
        const n = count(status);
        return n
          ? `<span class="flex items-center gap-1.5"><span class="w-2 h-2 rounded-full ${STATUS_STYLES[status].dot}"></span>${n} ${esc(status)}</span>`
          : '';
      })
      .join('');
    return `
      <div class="flex items-baseline justify-between mb-2">
        <h3 class="text-sm font-bold text-white">Overall progress</h3>
        <span class="text-sm text-slate-300"><strong class="text-white">${done}</strong> of ${total} tasks complete (${pct}%)</span>
      </div>
      <div class="h-2.5 rounded-full bg-slate-900 overflow-hidden" role="progressbar" aria-label="Tasks completed" aria-valuemin="0" aria-valuemax="${total}" aria-valuenow="${done}">
        <div class="progress-fill h-full rounded-full bg-gradient-to-r from-emerald-500 to-emerald-400" style="width:${pct}%"></div>
      </div>
      <div class="flex flex-wrap gap-x-5 gap-y-1 mt-3 text-xs text-slate-400">${chips}</div>`;
  }

  function taskFilters(tasks, phases, activePhase) {
    const button = (value, label, n) =>
      `<button type="button" class="filter-btn" data-phase="${value}" aria-pressed="${value === activePhase}">${esc(label)} <span class="opacity-70">(${n})</span></button>`;
    return (
      button('all', 'All', tasks.length) +
      phases.map((p) => button(p, phaseLabel(p), tasks.filter((t) => t.phase === p).length)).join('')
    );
  }

  function taskRows(tasks, defaultOwner) {
    if (!tasks.length) {
      return '<p class="p-6 text-sm text-slate-400 text-center">No tasks match these filters.</p>';
    }
    return tasks
      .map((t) => {
        const style = STATUS_STYLES[t.status];
        return `
        <div class="p-4 flex items-center justify-between gap-3 hover:bg-slate-800/50 transition-all">
          <div class="flex items-center space-x-3 min-w-0">
            <div class="w-2.5 h-2.5 rounded-full flex-shrink-0 ${style.dot}"></div>
            <div class="min-w-0">
              <h4 class="text-xs sm:text-sm font-semibold text-white">Task ${t.id}: ${esc(t.title)}</h4>
              <span class="text-xs text-slate-400">${esc(phaseLabel(t.phase))} &middot; Lead: ${esc(t.owner || defaultOwner)}</span>
            </div>
          </div>
          <span class="px-2.5 py-1 rounded-full text-xs font-medium border flex-shrink-0 ${style.badge}">${esc(t.status)}</span>
        </div>`;
      })
      .join('');
  }

  // ---- References --------------------------------------------------------

  function referenceHtml(r) {
    const head = `${esc(r.author)} (${esc(r.year)}).`;
    if (r.type === 'article') {
      const link = `<a href="${esc(r.url)}" target="_blank" rel="noopener noreferrer" class="text-blue-400 underline hover:text-blue-300 break-all">${esc(r.url)}</a>`;
      return `${head} ${esc(r.title)}. <em>${esc(r.journal)}</em>, ${esc(r.volume)}, Article ${esc(r.article)}. ${link}`;
    }
    return `${head} <em>${esc(r.title)}</em>. ${esc(r.publisher)}.`;
  }

  // APA hanging indent: first line flush, continuation lines indented.
  function references(items) {
    return items.map((r) => `<li class="ref-item pl-8 -indent-8">${referenceHtml(r)}</li>`).join('');
  }

  DD.views = { esc, desktopNav, mobileNav, metrics, solutions, smart, taskSummary, taskFilters, taskRows, references };
})(window.DD);
