// Menu, the home page river, filters, rate toggles and the room lightbox.
const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;

const menuBtn = document.querySelector('.menu-btn');
const siteNav = document.getElementById('site-nav');
menuBtn?.addEventListener('click', () => {
  const open = siteNav.classList.toggle('open');
  menuBtn.setAttribute('aria-expanded', open);
  menuBtn.textContent = open ? 'Close' : 'Menu';
});
document.querySelector('.dock-menu')?.addEventListener('click', (e) => { e.stopPropagation(); menuBtn.click(); });
document.addEventListener('click', (e) => {
  if (siteNav?.classList.contains('open') && !siteNav.contains(e.target) && e.target !== menuBtn) menuBtn.click();
});
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && siteNav?.classList.contains('open')) { menuBtn.click(); menuBtn.focus(); }
});

// The river: one unbroken line threaded through anchors marked data-river="desktopX,mobileX".
const page = document.querySelector('.river-page');
if (page) {
  const NS = 'http://www.w3.org/2000/svg';
  const svg = document.createElementNS(NS, 'svg');
  svg.classList.add('river-svg');
  svg.setAttribute('aria-hidden', 'true');
  const layers = [['#101E1A', 1.28], ['#1596CE', 1], ['#8FE0F7', .2]].map(([color, scale]) => {
    const p = document.createElementNS(NS, 'path');
    p.setAttribute('stroke', color);
    p.dataset.scale = scale;
    svg.append(p);
    return p;
  });
  layers[2].setAttribute('stroke-dasharray', '90 46 28 150');
  page.prepend(svg);
  const raft = document.createElement('div');
  raft.className = 'river-raft';
  raft.setAttribute('aria-hidden', 'true');
  raft.innerHTML = `<svg viewBox="0 0 120 72"><path d="M6 44c0-7 6-10 12-10h84c7 0 12 4 12 10s-6 14-14 14H20C12 58 6 51 6 44z" fill="#FFB703" stroke="#101E1A" stroke-width="4"/><path d="M14 47h92" stroke="#F2502F" stroke-width="5"/><g stroke="#101E1A" stroke-width="3"><circle cx="38" cy="20" r="8" fill="#F2502F"/><rect x="30" y="27" width="16" height="9" fill="#07564A"/><circle cx="62" cy="18" r="8" fill="#FFF8E1"/><rect x="54" y="26" width="16" height="9" fill="#F2502F"/><circle cx="86" cy="20" r="8" fill="#F2502F"/><rect x="78" y="27" width="16" height="9" fill="#17144A"/><path d="M26 22 12 66M74 20l18 46" fill="none"/></g></svg>`;
  if (!reduce) page.append(raft);

  let total = 0;
  let mobile = false;
  const trace = () => {
    mobile = innerWidth <= 820;
    const width = page.clientWidth;
    const pageTop = page.getBoundingClientRect().top + scrollY;
    const box = (el) => { const r = el.getBoundingClientRect(); return { top: r.top + scrollY - pageTop, bottom: r.bottom + scrollY - pageTop, height: r.height }; };
    let anchors;
    if (mobile) {
      // On phones the river hugs alternating edges and crosses in the gap between sections.
      anchors = [];
      [...page.querySelectorAll(':scope > section')].forEach((sec, i) => {
        const r = box(sec);
        const x = i % 2 ? 7 : width - 7;
        anchors.push({ x, y: r.top + 62 }, { x, y: r.bottom - 62 });
      });
    } else {
      anchors = [...page.querySelectorAll('[data-river]')].map((el) => {
        const r = box(el);
        return { x: Number(el.dataset.river.split(',')[0]) * width / 100, y: r.top + r.height / 2 };
      }).sort((a, b) => a.y - b.y);
    }
    if (anchors.length < 2) return;
    let d = `M${anchors[0].x} ${anchors[0].y}`;
    for (let i = 0; i < anchors.length - 1; i++) {
      const a = anchors[i], b = anchors[i + 1], k = (b.y - a.y) * .5;
      d += ` C${a.x} ${a.y + k} ${b.x} ${b.y - k} ${b.x} ${b.y}`;
    }
    const stroke = mobile ? 10 : Math.max(16, Math.min(30, width * .022));
    layers.forEach((p) => { p.setAttribute('d', d); p.setAttribute('stroke-width', stroke * p.dataset.scale); });
    svg.style.height = `${page.scrollHeight}px`;
    svg.setAttribute('viewBox', `0 0 ${width} ${page.scrollHeight}`);
    svg.setAttribute('preserveAspectRatio', 'none');
    total = layers[1].getTotalLength();
    place();
  };
  // Find the point on the river level with the reading line, so the raft keeps pace with the page.
  const place = () => {
    if (!total || !raft.isConnected) return;
    const target = innerHeight * .55 - page.getBoundingClientRect().top;
    let lo = 0, hi = total;
    for (let i = 0; i < 18; i++) {
      const mid = (lo + hi) / 2;
      if (layers[1].getPointAtLength(mid).y < target) lo = mid; else hi = mid;
    }
    const at = lo;
    const p = layers[1].getPointAtLength(at);
    const q = layers[1].getPointAtLength(Math.min(total, at + 4));
    const tilt = Math.max(-16, Math.min(16, (q.x - p.x) * 3));
    const w = raft.offsetWidth;
    const x = Math.max(w / 2, Math.min(page.clientWidth - w / 2, p.x));
    raft.style.transform = `translate(${x - w / 2}px,${p.y - w * .42}px) rotate(${tilt}deg)`;
    // On phones the raft only shows while crossing, so it never sits over reading text.
    raft.classList.toggle('away', mobile && (p.x < 24 || p.x > page.clientWidth - 24));
    layers[2].setAttribute('stroke-dashoffset', -at * .6);
  };
  let tick = false;
  addEventListener('scroll', () => {
    if (tick) return;
    tick = true;
    requestAnimationFrame(() => { place(); tick = false; });
  }, { passive: true });
  new ResizeObserver(trace).observe(page);
  addEventListener('load', trace);
  document.fonts?.ready.then(trace);
  trace();
}

// Adventure filter
const chips = [...document.querySelectorAll('[data-filter]')];
if (chips.length) {
  const items = [...document.querySelectorAll('.act-item[data-group]')];
  const count = document.getElementById('filter-count');
  chips.forEach((chip) => chip.addEventListener('click', () => {
    chips.forEach((c) => c.setAttribute('aria-pressed', c === chip));
    const f = chip.dataset.filter;
    let n = 0;
    items.forEach((it) => { const show = f === 'all' || it.dataset.group === f; it.hidden = !show; if (show) n++; });
    if (count) count.textContent = `${n} ${n === 1 ? 'activity' : 'activities'}`;
  }));
}

// Resident and non-resident price switch, remembered between pages
const store = {
  get() { try { return localStorage.getItem('havila-res'); } catch { return null; } },
  set(v) { try { localStorage.setItem('havila-res', v); } catch { /* private mode */ } },
};
const setRes = (mode) => {
  document.querySelectorAll('[data-res]').forEach((el) => { el.textContent = mode === 'non' ? el.dataset.non : el.dataset.resident; });
  document.querySelectorAll('[data-res-btn]').forEach((b) => b.setAttribute('aria-pressed', b.dataset.resBtn === mode));
  store.set(mode);
  document.dispatchEvent(new CustomEvent('havila-res', { detail: mode }));
};
window.havilaRes = () => (store.get() === 'non' ? 'non' : 'res');
document.querySelectorAll('[data-res-btn]').forEach((b) => b.addEventListener('click', () => setRes(b.dataset.resBtn)));
if (document.querySelector('[data-res],[data-res-btn]')) setRes(window.havilaRes());

// Room lightbox
const lb = document.getElementById('lb');
if (lb) {
  document.querySelectorAll('[data-lb]').forEach((b) => b.addEventListener('click', () => {
    const img = b.querySelector('img');
    const big = lb.querySelector('img');
    big.src = img.currentSrc || img.src;
    big.alt = img.alt;
    lb.querySelector('p').textContent = img.alt;
    lb.showModal();
  }));
  lb.addEventListener('click', (e) => { if (e.target === lb) lb.close(); });
}

// Activities saved for the planner, shared with plan.js through one draft
const draft = {
  read() { try { return JSON.parse(localStorage.getItem('havila-plan')) || {}; } catch { return {}; } },
  write(d) { try { localStorage.setItem('havila-plan', JSON.stringify(d)); return true; } catch { return false; } },
};
window.havilaDraft = draft;
const showCount = () => {
  const n = (draft.read().activities || []).length;
  document.querySelectorAll('[data-tray-count]').forEach((el) => { el.textContent = n ? `(${n})` : ''; });
};
window.havilaCount = showCount;
showCount();
document.querySelectorAll('[data-add]').forEach((btn) => {
  const paint = () => {
    const on = (draft.read().activities || []).includes(btn.dataset.add);
    btn.textContent = on ? 'Added. Tap to remove' : 'Add to my plan';
    btn.toggleAttribute('data-added', on);
  };
  paint();
  btn.addEventListener('click', (e) => {
    const d = draft.read();
    const list = new Set(d.activities || []);
    if (list.has(btn.dataset.add)) list.delete(btn.dataset.add); else list.add(btn.dataset.add);
    d.activities = [...list];
    if (!draft.write(d)) return; // Storage blocked: the link still opens the planner with this activity.
    e.preventDefault();
    paint();
    showCount();
  });
});
