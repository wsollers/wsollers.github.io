const destination = "https://foundations-tablet-test.bracedbasket1.chatgpt.site/signin-with-chatgpt?return_to=%2F";
const key = "aim-foundations-review-v1";
let saved = null;
try { saved = localStorage.getItem(key); } catch {}
if ("serviceWorker" in navigator) navigator.serviceWorker.register("./sw.js").catch(() => {});
if ("caches" in window) caches.keys().then(keys => Promise.all(keys.filter(name => name.startsWith("aim-foundations-web-")).map(name => caches.delete(name)))).catch(() => {});
if (saved) {
  document.getElementById("old-progress").hidden = false;
  document.getElementById("export-progress").addEventListener("click", () => {
    const url = URL.createObjectURL(new Blob([saved], {type:"application/json"}));
    const link = document.createElement("a");
    link.href = url; link.download = "aim-foundations-progress.json"; link.click();
    setTimeout(() => URL.revokeObjectURL(url), 2000);
    document.getElementById("export-status").textContent = "Backup downloaded. After signing in, open Progress and backups → Import.";
  });
} else {
  // Keep a normal link available if automatic navigation is blocked.
  location.replace(destination);
}
