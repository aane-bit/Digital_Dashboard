# Digital_Dashboard

Interactive policy-brief dashboard: *Bridging the Philippine Digital Divide*.
A static site (no build step), so it works on GitHub Pages as-is.

## Run locally

Open `index.html` directly, or serve the folder:

```bash
python -m http.server 8000
```

Then visit <http://localhost:8000>. Pages have deep links (`#/solutions`, `#/timeline`, ...).

## Structure

```
index.html        Page shell and the static narrative content
css/styles.css    Styles Tailwind utilities can't express (page transitions, focus, presentation mode)
js/data.js        All content: pages, metrics, solutions, SMART, tasks, references
js/views.js       Pure functions that turn data into HTML
js/charts.js      Chart.js configuration
js/app.js         Hash router, filters, search, presentation mode, keyboard shortcuts
```

To update content, edit `js/data.js`. For example, change a task's `status` and the progress bar updates itself.

## Shortcuts

- `←` / `→` previous / next page
- `P` toggle presentation mode, `Esc` exit it
