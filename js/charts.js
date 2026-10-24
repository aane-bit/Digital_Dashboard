/** Chart.js setup. Fails soft: the page stays usable if the CDN is unreachable. */
(function (DD) {
  'use strict';

  const TONE_COLORS = {
    emerald: '16, 185, 129',
    red: '239, 68, 68',
    amber: '245, 158, 11',
    blue: '59, 130, 246',
    purple: '168, 85, 247',
  };

  // Draws each bar's value above it.
  const valueLabels = {
    id: 'valueLabels',
    afterDatasetsDraw(chart) {
      const { ctx } = chart;
      const values = chart.data.datasets[0].data;
      ctx.save();
      ctx.font = '600 12px Inter, sans-serif';
      ctx.fillStyle = '#e2e8f0';
      ctx.textAlign = 'center';
      chart.getDatasetMeta(0).data.forEach((bar, i) => ctx.fillText(`${values[i]}%`, bar.x, bar.y - 6));
      ctx.restore();
    },
  };

  function initDisparityChart(canvas, bars) {
    if (!canvas) return null;
    if (!window.Chart) {
      canvas.replaceWith(
        Object.assign(document.createElement('p'), {
          className: 'text-sm text-slate-400',
          textContent: 'The chart could not be loaded. Figures are listed in the summary cards above.',
        })
      );
      return null;
    }

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    return new Chart(canvas.getContext('2d'), {
      type: 'bar',
      plugins: [valueLabels],
      data: {
        labels: bars.map((b) => b.label),
        datasets: [
          {
            label: 'Coverage / Access (%)',
            data: bars.map((b) => b.value),
            backgroundColor: bars.map((b) => `rgba(${TONE_COLORS[b.tone]}, 0.8)`),
            hoverBackgroundColor: bars.map((b) => `rgba(${TONE_COLORS[b.tone]}, 1)`),
            borderRadius: 8,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        animation: reduceMotion ? false : { duration: 900, easing: 'easeOutQuart' },
        layout: { padding: { top: 22 } },
        plugins: {
          legend: { display: false },
          tooltip: {
            callbacks: {
              title: (items) => [].concat(items[0].label).join(' '),
              label: (item) => ` ${item.formattedValue}%`,
            },
          },
        },
        scales: {
          y: {
            beginAtZero: true,
            max: 100,
            grid: { color: 'rgba(255, 255, 255, 0.1)' },
            ticks: { color: '#94a3b8', callback: (v) => `${v}%` },
          },
          x: {
            grid: { display: false },
            ticks: { color: '#94a3b8' },
          },
        },
      },
    });
  }

  DD.charts = { initDisparityChart };
})(window.DD);
