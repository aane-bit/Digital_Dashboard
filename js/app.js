/** Wiring: hash router, presentation mode, filters and search. */
(function (DD) {
  'use strict';

  const { data, views, charts } = DD;
  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => Array.from(root.querySelectorAll(selector));

  const pageIds = data.pages.map((p) => p.id);
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const state = {
    pageIndex: -1,
    chartReady: false,
    countersPlayed: false,
    presentation: false,
    taskPhase: 'all',
    taskStatus: 'all',
  };

  // ---- Initial render ----------------------------------------------------

  function renderStatic() {
    $('#desktop-nav').innerHTML = views.desktopNav(data.pages);
    $('#mobile-menu').innerHTML = views.mobileNav(data.pages);
    $('#metrics-grid').innerHTML = views.metrics(data.metrics);
    $('#solutions-grid').innerHTML = views.solutions(data.solutions);
    $('#smart-grid').innerHTML = views.smart(data.smart);
    $('#task-summary').innerHTML = views.taskSummary(data.tasks);
    $('#reference-list').innerHTML = views.references(data.references);
    $('#page-total').textContent = pageIds.length;
    $$('[data-authors]').forEach((el) => (el.textContent = data.project.authors.join(', ')));

    const statuses = Array.from(new Set(data.tasks.map((t) => t.status)));
    $('#task-status').innerHTML =
      '<option value="all">All statuses</option>' +
      statuses.map((s) => `<option value="${views.esc(s)}">${views.esc(s)}</option>`).join('');
  }

  // ---- Router ------------------------------------------------------------

  const indexFromHash = () => Math.max(0, pageIds.indexOf(location.hash.replace(/^#\/?/, '')));

  function go(pageId) {
    if (pageIds.includes(pageId)) location.hash = `/${pageId}`;
  }

  function step(delta) {
    const next = state.pageIndex + delta;
    if (next >= 0 && next < pageIds.length) go(pageIds[next]);
  }

  function showPage(index, { firstLoad = false } = {}) {
    if (index === state.pageIndex) return;
    state.pageIndex = index;
    const page = data.pages[index];

    $$('.page-view').forEach((section) => section.classList.toggle('active', section.id === `page-${page.id}`));
    $$('.nav-btn').forEach((btn) => {
      if (btn.dataset.nav === page.id) btn.setAttribute('aria-current', 'page');
      else btn.removeAttribute('aria-current');
    });

    $('#current-page-num').textContent = index + 1;
    $('#prev-btn').disabled = index === 0;
    $('#next-btn').disabled = index === pageIds.length - 1;
    document.title = `${page.label} | ${data.project.shortTitle}`;

    if (!firstLoad) {
      window.scrollTo({ top: 0, behavior: prefersReducedMotion ? 'auto' : 'smooth' });
      $('#main').focus({ preventScroll: true });
    }

    if (page.id === 'overview') initOverview();
  }

  // ---- Overview: chart + animated counters -------------------------------

  function initOverview() {
    if (!state.chartReady) {
      state.chartReady = true;
      charts.initDisparityChart($('#disparityChart'), data.chart.bars);
    }
    if (!state.countersPlayed) {
      state.countersPlayed = true;
      if (!prefersReducedMotion) $$('[data-count-to]').forEach(animateCounter);
    }
  }

  function animateCounter(el) {
    const to = Number(el.dataset.countTo);
    const decimals = Number(el.dataset.decimals);
    const suffix = el.dataset.suffix || '';
    const duration = 900;
    const start = performance.now();

    function frame(now) {
      const t = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - t, 3);
      el.textContent = (to * eased).toFixed(decimals) + suffix;
      if (t < 1) requestAnimationFrame(frame);
    }
    requestAnimationFrame(frame);
  }

  // ---- Presentation mode -------------------------------------------------

  function setPresentation(on) {
    state.presentation = on;
    document.documentElement.classList.toggle('presentation-mode', on);
    const btn = $('#pres-toggle-btn');
    btn.setAttribute('aria-pressed', String(on));
    $('#pres-text').textContent = on ? 'Exit Presentation' : 'Presentation Mode';
    $('#pres-icon').className = `fa-solid ${on ? 'fa-compress' : 'fa-expand'}`;
  }

  // ---- Mobile menu -------------------------------------------------------

  function setMobileMenu(open) {
    $('#mobile-menu').classList.toggle('hidden', !open);
    $('#mobile-menu-btn').setAttribute('aria-expanded', String(open));
  }

  // ---- Timeline ----------------------------------------------------------

  function renderTasks() {
    const { taskPhase, taskStatus } = state;
    const visible = data.tasks.filter(
      (t) => (taskPhase === 'all' || t.phase === taskPhase) && (taskStatus === 'all' || t.status === taskStatus)
    );
    $('#task-filters').innerHTML = views.taskFilters(data.tasks, data.phases, taskPhase);
    $('#task-list-container').innerHTML = views.taskRows(visible, data.defaultOwner);
    $('#task-count').textContent = `Showing ${visible.length} of ${data.tasks.length} tasks`;
  }

  // ---- References --------------------------------------------------------

  function searchReferences() {
    const query = $('#ref-search').value.trim().toLowerCase();
    const items = $$('.ref-item');
    let shown = 0;
    items.forEach((item) => {
      const match = item.textContent.toLowerCase().includes(query);
      item.hidden = !match;
      if (match) shown++;
    });
    $('#ref-status').textContent = query ? `${shown} of ${items.length} citations match` : '';
    $('#ref-empty').hidden = shown > 0;
  }

  // ---- Events ------------------------------------------------------------

  function bindEvents() {
    document.addEventListener('click', (e) => {
      const nav = e.target.closest('[data-nav]');
      if (nav) {
        go(nav.dataset.nav);
        setMobileMenu(false);
        return;
      }
      const phase = e.target.closest('[data-phase]');
      if (phase) {
        state.taskPhase = phase.dataset.phase;
        renderTasks();
      }
    });

    window.addEventListener('hashchange', () => showPage(indexFromHash()));

    $('#prev-btn').addEventListener('click', () => step(-1));
    $('#next-btn').addEventListener('click', () => step(1));
    $('#pres-toggle-btn').addEventListener('click', () => setPresentation(!state.presentation));
    $('#mobile-menu-btn').addEventListener('click', () => setMobileMenu($('#mobile-menu').classList.contains('hidden')));
    $('#ref-search').addEventListener('input', searchReferences);
    $('#task-status').addEventListener('change', (e) => {
      state.taskStatus = e.target.value;
      renderTasks();
    });

    // Arrow keys page through the deck, P toggles presentation, Esc exits it.
    document.addEventListener('keydown', (e) => {
      if (e.defaultPrevented || e.altKey || e.ctrlKey || e.metaKey) return;
      if (e.target instanceof Element && e.target.closest('input, textarea, select, [contenteditable]')) return;
      if (e.key === 'ArrowRight') step(1);
      else if (e.key === 'ArrowLeft') step(-1);
      else if (e.key === 'p' || e.key === 'P') setPresentation(!state.presentation);
      else if (e.key === 'Escape') {
        if (state.presentation) setPresentation(false);
        setMobileMenu(false);
      }
    });
  }

  // ---- Boot --------------------------------------------------------------

  renderStatic();
  renderTasks();
  bindEvents();
  showPage(indexFromHash(), { firstLoad: true });
})(window.DD);
