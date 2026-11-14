/* Public GitHub activity. Never requires tokens or exposes private contributions. */
(() => {
  const target = document.querySelector('[data-github-activity]');
  if (!target) return;
  const account = 'wsollers';
  const endpoint = `https://api.github.com/users/${encodeURIComponent(account)}/events/public?per_page=30`;
  const allowed = new Set(['PushEvent', 'PullRequestEvent', 'CreateEvent', 'ReleaseEvent', 'IssuesEvent']);
  const verbs = {
    PushEvent: 'Pushed code to', PullRequestEvent: 'Contributed a pull request to',
    CreateEvent: 'Created a branch or repository in', ReleaseEvent: 'Published a release in',
    IssuesEvent: 'Updated an issue in'
  };
  function fallback() {
    target.replaceChildren();
    const li = document.createElement('li');
    const dot = document.createElement('span'); dot.className = 'activity-dot'; dot.setAttribute('aria-hidden','true');
    const wrapper = document.createElement('div');
    wrapper.textContent = 'Recent public activity is not available here right now. ';
    const link = document.createElement('a'); link.href = 'https://github.com/wsollers'; link.textContent = 'See activity on GitHub';
    wrapper.append(link); li.append(dot, wrapper); target.append(li);
  }
  const aborter = new AbortController();
  const timeout = setTimeout(() => aborter.abort(), 8500);
  fetch(endpoint, {signal: aborter.signal, headers:{Accept:'application/vnd.github+json'}})
    .then(response => { if (!response.ok) throw Error(`HTTP ${response.status}`); return response.json(); })
    .then(events => {
      if (!Array.isArray(events)) throw Error('Unexpected GitHub response');
      const selected = events.filter(e => allowed.has(e.type) && e.repo && e.created_at).slice(0, 4);
      if (!selected.length) return fallback();
      target.replaceChildren();
      for (const event of selected) {
        const li = document.createElement('li');
        const dot = document.createElement('span'); dot.className = 'activity-dot'; dot.setAttribute('aria-hidden','true');
        const wrapper = document.createElement('div');
        const verb = document.createElement('span'); verb.textContent = `${verbs[event.type]} `;
        const link = document.createElement('a');
        const repoName = event.repo.name.replace(/^wsollers\//, '');
        link.textContent = repoName;
        link.href = `https://github.com/${event.repo.name.split('/').map(encodeURIComponent).join('/')}`;
        const time = document.createElement('time');
        time.dateTime = event.created_at;
        time.textContent = new Date(event.created_at).toLocaleDateString(undefined,{month:'short',day:'numeric',year:'numeric'});
        wrapper.append(verb,link,time);li.append(dot,wrapper);target.append(li);
      }
    })
    .catch(fallback)
    .finally(() => clearTimeout(timeout));
})();
