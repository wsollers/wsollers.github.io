/* Site-wide progressive enhancement: light/dark preference and active navigation. */
(() => {
  const root = document.documentElement;
  const key = 'ws-theme';
  const button = document.querySelector('[data-theme-toggle]');
  let initial;
  try { initial = localStorage.getItem(key); } catch { /* storage may be unavailable */ }
  if (initial === 'light' || initial === 'dark') root.dataset.theme = initial;
  if (!root.dataset.theme) root.dataset.theme = 'dark';
  function updateLabel() {
    if (!button) return;
    const isDark = root.dataset.theme === 'dark';
    button.setAttribute('aria-label', `Switch to ${isDark ? 'light' : 'dark'} theme`);
    button.setAttribute('title', `Switch to ${isDark ? 'light' : 'dark'} theme`);
    button.textContent = isDark ? '☼' : '◐';
  }
  updateLabel();
  button?.addEventListener('click', () => {
    root.dataset.theme = root.dataset.theme === 'dark' ? 'light' : 'dark';
    try { localStorage.setItem(key, root.dataset.theme); } catch { /* ignore */ }
    updateLabel();
  });
  const year = document.querySelector('[data-year]');
  if (year) year.textContent = String(new Date().getFullYear());
})();
