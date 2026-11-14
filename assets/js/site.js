/* Small, site-wide theme preference and footer year. */
(() => {
  const root = document.documentElement;
  const key = "ws-theme";
  const toggle = document.querySelector("[data-theme-toggle]");
  let stored;
  try { stored = localStorage.getItem(key); } catch { /* optional storage */ }
  root.dataset.theme = stored === "dark" ? "dark" : "light";
  const render = () => {
    if (!toggle) return;
    const dark = root.dataset.theme === "dark";
    toggle.textContent = dark ? "☼" : "◐";
    toggle.setAttribute("aria-label", dark ? "Switch to light mode" : "Switch to dark mode");
    toggle.setAttribute("title", dark ? "Switch to light mode" : "Switch to dark mode");
  };
  render();
  toggle?.addEventListener("click", () => {
    root.dataset.theme = root.dataset.theme === "dark" ? "light" : "dark";
    try { localStorage.setItem(key, root.dataset.theme); } catch { /* optional storage */ }
    render();
  });
  document.querySelectorAll("[data-year]").forEach(el => {el.textContent = String(new Date().getFullYear());});
})();
