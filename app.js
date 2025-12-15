// Minimal SPA for the BonkWithFriends hub
const CONTENT_URL = 'data/content.json';
let CONTENT = null;

async function fetchContent(){
  try{
    const resp = await fetch(CONTENT_URL);
    CONTENT = await resp.json();
  }catch(e){
    console.error('Failed to load content.json', e);
    CONTENT = {downloads:[], tutorials:[], wiki:[], updates:[], bugs:[], trackers:[], countdowns:[]};
  }
}

function el(html){ const template = document.createElement('template'); template.innerHTML = html.trim(); return template.content.firstChild; }

function formatDateISO(iso){
  try{ return new Date(iso).toLocaleString(); }catch(e){ return iso; }
}

function renderHome(){
  const page = document.createElement('div');
  page.className = 'page';
  page.innerHTML = `
    <section class="card">
      <h1 class="h1">Welcome to BonkWithFriends Hub</h1>
      <p class="small">This is a placeholder hub with downloads, tutorials, wiki, status, bug list, progress trackers and countdowns. Use <a href="#/ui-test">UI Test</a> to see all components.</p>
    </section>
    <div class="grid-2">
      <div>
        <div class="card">
          <h2 class="h2">Latest Releases</h2>
          <div id="latest-downloads"></div>
        </div>

        <div class="card" style="margin-top:12px">
          <h2 class="h2">Recent Updates</h2>
          <div id="recent-updates"></div>
        </div>
      </div>

      <aside>
        <div class="card">
          <h2 class="h2">Trackers</h2>
          <div id="trackers"></div>
        </div>

        <div class="card" style="margin-top:12px">
          <h2 class="h2">Countdowns</h2>
          <div id="countdowns"></div>
        </div>
      </aside>
    </div>
  `;
  // populate latest downloads
  const dlEl = page.querySelector('#latest-downloads');
  (CONTENT.downloads || []).slice(0,3).forEach(d=>{
    const row = el(`<div class="download-row">
      <div>
        <div style="font-weight:700">${d.title}</div>
        <div class="meta">${d.platform} • ${d.size}</div>
      </div>
      <div style="display:flex;flex-direction:column;align-items:flex-end;gap:8px">
        <a class="btn" href="${d.url}">Download</a>
        <div class="small">${d.notes}</div>
      </div>
    </div>`);
    dlEl.appendChild(row);
  });

  // updates
  const upEl = page.querySelector('#recent-updates');
  (CONTENT.updates || []).slice(0,4).forEach(u=>{
    const node = el(`<div style="padding:8px 0;border-top:1px dashed rgba(255,255,255,0.02)">
      <div style="font-weight:700">${u.title}</div>
      <div class="small">${formatDateISO(u.date)} — ${u.description}</div>
    </div>`);
    upEl.appendChild(node);
  });

  // trackers
  const tEl = page.querySelector('#trackers');
  (CONTENT.trackers || []).forEach(t=>{
    const wrap = el(`<div style="margin-bottom:12px">
      <div style="display:flex;justify-content:space-between;align-items:center">
        <div><strong>${t.title}</strong><div class="small">Owner: ${t.owner}</div></div>
        <div class="small">${t.progress}%</div>
      </div>
      <div class="progress" aria-hidden="true"><i data-progress="${t.progress}"></i></div>
    </div>`);
    tEl.appendChild(wrap);
  });

  // countdowns
  const cEl = page.querySelector('#countdowns');
  (CONTENT.countdowns || []).forEach(c=>{
    const wrap = el(`<div style="margin-bottom:8px">
      <div style="display:flex;justify-content:space-between;align-items:center">
        <div class="small">${c.title}</div>
        <div class="small" data-until="${c.until}">—</div>
      </div>
    </div>`);
    cEl.appendChild(wrap);
  });

  return page;
}

function renderDownloads(){
  const page = el(`<div class="page">
    <section class="card">
      <h1 class="h1">Downloads</h1>
      <p class="small">Pick a release to download. All links are placeholders.</p>
      <div id="downloads-list"></div>
    </section>
  </div>`);
  const list = page.querySelector('#downloads-list');
  (CONTENT.downloads || []).forEach(d=>{
    const item = el(`<div class="download-row">
      <div>
        <div style="font-weight:700">${d.title}</div>
        <div class="meta">${d.platform} • ${d.size}</div>
      </div>
      <div style="display:flex;flex-direction:column;align-items:flex-end;gap:8px">
        <a class="btn" href="${d.url}">Download</a>
        <div class="small">${d.notes}</div>
      </div>
    </div>`);
    list.appendChild(item);
  });
  return page;
}

function renderTutorials(){
  const page = el(`<div class="page">
    <section class="card">
      <h1 class="h1">Tutorials</h1>
      <p class="small">Step-by-step guides and walkthroughs.</p>
      <div class="item-list" id="tutorials-list"></div>
    </section>
  </div>`);
  const list = page.querySelector('#tutorials-list');
  (CONTENT.tutorials || []).forEach(t=>{
    const it = el(`<div class="item">
      <h3>${t.title}</h3>
      <div class="small">${t.summary}</div>
      <div style="margin-top:8px"><a class="btn ghost" href="${t.url}">Open</a></div>
    </div>`);
    list.appendChild(it);
  });
  return page;
}

function renderWiki(){
  const page = el(`<div class="page">
    <section class="card">
      <h1 class="h1">Wiki</h1>
      <p class="small">Community-maintained knowledge base.</p>
      <div id="wiki-list" class="item-list"></div>
    </section>
  </div>`);
  const list = page.querySelector('#wiki-list');
  (CONTENT.wiki || []).forEach(w=>{
    const it = el(`<div class="item">
      <h3>${w.title}</h3>
      <div class="small">${w.content}</div>
      <div style="margin-top:8px"><a class="btn ghost" href="#/wiki/${w.id}">Read</a></div>
    </div>`);
    list.appendChild(it);
  });
  return page;
}

function renderStatus(){
  const page = el(`<div class="page">
    <section class="card">
      <h1 class="h1">Update Status</h1>
      <p class="small">Timeline and recent logs.</p>
      <div id="updates-list"></div>
    </section>
  </div>`);
  const list = page.querySelector('#updates-list');
  (CONTENT.updates || []).forEach(u=>{
    const it = el(`<div style="padding:10px 0;border-top:1px dashed rgba(255,255,255,0.02)">
      <div style="font-weight:700">${u.title}</div>
      <div class="small">${formatDateISO(u.date)}</div>
      <div style="margin-top:6px">${u.description}</div>
    </div>`);
    list.appendChild(it);
  });
  return page;
}

function renderBugs(){
  const page = el(`<div class="page">
    <section class="card">
      <h1 class="h1">Known Bugs</h1>
      <p class="small">Community-reported issues with status and severity.</p>
      <div id="bugs-list"></div>
    </section>
  </div>`);
  const list = page.querySelector('#bugs-list');
  (CONTENT.bugs || []).forEach(b=>{
    const node = el(`<div class="bug-item">
      <div>
        <div style="font-weight:700">${b.title}</div>
        <div class="small">Reported by ${b.reporter} • ${b.severity}</div>
      </div>
      <div style="text-align:right">
        <div class="badge">${b.status}</div>
        <div class="small" style="margin-top:8px">${b.notes}</div>
      </div>
    </div>`);
    list.appendChild(node);
  });
  return page;
}

function renderUITest(){
  // UI playground with many placeholders
  const page = el(`<div class="page">
    <section class="card">
      <h1 class="h1">UI Test Playground</h1>
      <p class="small">This page shows all components and placeholders for testing visuals and behavior.</p>

      <h2 class="h2" style="margin-top:12px">Buttons</h2>
      <div class="ui-grid">
        <div class="card"><a class="btn">Primary</a></div>
        <div class="card"><a class="btn ghost">Ghost</a></div>
        <div class="card"><button class="btn" disabled>Disabled</button></div>
      </div>

      <h2 class="h2" style="margin-top:12px">Progress Bars</h2>
      <div class="card" id="ui-progress-list"></div>

      <h2 class="h2" style="margin-top:12px">Countdowns</h2>
      <div class="card" id="ui-countdown-list"></div>

      <h2 class="h2" style="margin-top:12px">Bug Items</h2>
      <div class="card" id="ui-bug-list"></div>

      <h2 class="h2" style="margin-top:12px">Misc</h2>
      <div class="card">
        <div class="kv"><div>Key</div><div class="small">Value</div></div>
        <div style="height:12px"></div>
        <div class="kv"><div>Another</div><div class="small">Placeholder</div></div>
      </div>

    </section>
  </div>`);
  const pList = page.querySelector('#ui-progress-list');
  (CONTENT.trackers || []).concat([
    {id:'_demo_90', title:'Demo 90%', progress:90, owner:'@demo'},
    {id:'_demo_5', title:'Demo 5%', progress:5, owner:'@demo'}
  ]).forEach(t=>{
    const wrap = el(`<div style="margin-bottom:12px">
      <div style="display:flex;justify-content:space-between"><div><strong>${t.title}</strong><div class="small">Owner: ${t.owner}</div></div><div class="small">${t.progress}%</div></div>
      <div class="progress"><i data-progress="${t.progress}"></i></div>
    </div>`);
    pList.appendChild(wrap);
  });

  const cdList = page.querySelector('#ui-countdown-list');
  (CONTENT.countdowns || []).concat([{id:'ui-fake', title:'Demo countdown', until:new Date(Date.now()+3600*1000).toISOString()}]).forEach(c=>{
    const node = el(`<div style="margin-bottom:8px"><div class="small">${c.title}</div><div class="small" data-until="${c.until}">—</div></div>`);
    cdList.appendChild(node);
  });

  const bugList = page.querySelector('#ui-bug-list');
  (CONTENT.bugs || []).forEach(b=>{
    const node = el(`<div class="bug-item">
      <div><div style="font-weight:700">${b.title}</div><div class="small">${b.severity} • reported by ${b.reporter}</div></div>
      <div style="text-align:right"><div class="badge">${b.status}</div></div>
    </div>`);
    bugList.appendChild(node);
  });

  return page;
}

function mount(node){
  const app = document.getElementById('app');
  app.innerHTML = '';
  app.appendChild(node);
  // animate progress bars
  document.querySelectorAll('.progress > i').forEach(i=>{
    const p = Number(i.dataset.progress || 0);
    requestAnimationFrame(()=>{ i.style.width = p + '%'; });
  });
  // initialize countdowns
  initCountdowns();
}

function initCountdowns(){
  function tick(){
    document.querySelectorAll('[data-until]').forEach(el=>{
      const until = el.getAttribute('data-until');
      const now = new Date();
      const diff = new Date(until) - now;
      if(isNaN(diff)){ el.textContent = 'invalid'; return; }
      if(diff <= 0){ el.textContent = 'now'; return; }
      const days = Math.floor(diff / (1000*60*60*24));
      const hours = Math.floor((diff%(1000*60*60*24))/(1000*60*60));
      const mins = Math.floor((diff%(1000*60*60))/(1000*60));
      const secs = Math.floor((diff%(1000*60))/1000);
      el.textContent = `${days}d ${hours}h ${mins}m ${secs}s`;
    });
  }
  tick();
  if(window._cw_interval) clearInterval(window._cw_interval);
  window._cw_interval = setInterval(tick, 1000);
}

function handleRoute(){
  const hash = location.hash || '#/';
  if(!CONTENT) return;
  if(hash.startsWith('#/downloads')) mount(renderDownloads());
  else if(hash.startsWith('#/tutorials')) mount(renderTutorials());
  else if(hash.startsWith('#/wiki')) mount(renderWiki());
  else if(hash.startsWith('#/status')) mount(renderStatus());
  else if(hash.startsWith('#/bugs')) mount(renderBugs());
  else if(hash.startsWith('#/ui-test')) mount(renderUITest());
  else mount(renderHome());
}

async function init(){
  await fetchContent();
  handleRoute();
  window.addEventListener('hashchange', handleRoute);
  // menu toggle on mobile
  document.getElementById('menu-toggle').addEventListener('click', ()=>{
    document.getElementById('main-nav').classList.toggle('show');
  });
}

init();
