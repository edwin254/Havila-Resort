// Menu, prices, filters, plan tray and the River Run motion system.
const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
const touch = matchMedia('(hover: none)').matches;

const menuBtn = document.querySelector('.menu-btn');
const siteNav = document.getElementById('site-nav');
const toggleMenu = () => {
  const open = siteNav.classList.toggle('open');
  menuBtn.setAttribute('aria-expanded', open);
  menuBtn.textContent = open ? 'Close' : 'Menu';
  const dockMenu = document.querySelector('.dock-menu');
  if (dockMenu) dockMenu.textContent = open ? 'Close' : 'Menu';
};
menuBtn?.addEventListener('click', toggleMenu);
document.querySelector('.dock-menu')?.addEventListener('click', (e) => { e.stopPropagation(); toggleMenu(); });
document.addEventListener('click', (e) => {
  if (siteNav?.classList.contains('open') && !siteNav.contains(e.target) && e.target !== menuBtn) toggleMenu();
});
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && siteNav?.classList.contains('open')) { toggleMenu(); menuBtn.focus(); }
});

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
    if (!reduce && window.gsap) gsap.fromTo(items.filter((i) => !i.hidden), { y: 26, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: .5, stagger: .035, ease: 'power3.out', overwrite: true });
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
  const label = () => {
    const on = (draft.read().activities || []).includes(btn.dataset.add);
    btn.textContent = on ? 'Added. Tap to remove' : 'Add to my plan';
    btn.toggleAttribute('data-added', on);
  };
  label();
  btn.addEventListener('click', (e) => {
    const d = draft.read();
    const list = new Set(d.activities || []);
    if (list.has(btn.dataset.add)) list.delete(btn.dataset.add); else list.add(btn.dataset.add);
    d.activities = [...list];
    if (!draft.write(d)) return; // Storage blocked: the link still opens the planner with this activity.
    e.preventDefault();
    label();
    showCount();
    if (!reduce && window.gsap) gsap.fromTo(btn, { scale: .92 }, { scale: 1, duration: .6, ease: 'elastic.out(1,.4)' });
  });
});

// Motion system. Everything is visible without it; tweens animate from hidden only once GSAP runs.
function splitWords(el) {
  const label = [...el.childNodes].map((c) => c.textContent).join(' ').trim().replace(/\s+/g, ' ');
  const build = (node) => {
    const frag = document.createDocumentFragment();
    node.childNodes.forEach((c) => {
      if (c.nodeType === 3) {
        c.textContent.split(/(\s+)/).forEach((w) => {
          if (!w) return;
          if (/^\s+$/.test(w)) { frag.append(' '); return; }
          const line = document.createElement('span'); line.className = 'line'; line.style.display = 'inline-block';
          const inner = document.createElement('span'); inner.textContent = w; line.append(inner); frag.append(line);
        });
      } else if (c.nodeType === 1) {
        const copy = c.cloneNode(false); copy.append(build(c)); frag.append(copy);
      }
    });
    return frag;
  };
  const out = build(el);
  el.textContent = '';
  el.append(out);
  el.setAttribute('aria-label', label);
  [...el.children].forEach((c) => c.setAttribute('aria-hidden', 'true'));
  return [...el.querySelectorAll('.line>span')];
}

function runMotion() {
  const { gsap, ScrollTrigger } = window;
  if (!gsap || !ScrollTrigger) return;
  gsap.registerPlugin(ScrollTrigger);
  let lenis;
  if (window.Lenis && !touch) {
    lenis = new Lenis({ lerp: .1 });
    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add((t) => lenis.raf(t * 1000));
    gsap.ticker.lagSmoothing(0);
  }

  // Reading progress
  const bar = document.createElement('div');
  bar.className = 'progress';
  bar.setAttribute('aria-hidden', 'true');
  document.body.append(bar);
  gsap.to(bar, { scaleX: 1, ease: 'none', scrollTrigger: { start: 0, end: 'max', scrub: .2 } });

  // Header ducks on the way down, returns on the way up
  const top = document.querySelector('.top');
  ScrollTrigger.create({ start: 0, end: 'max', onUpdate: (s) => {
    top.classList.toggle('up', s.direction === 1 && s.scroll() > 240);
    top.classList.toggle('solid', s.scroll() > 80);
  } });

  // Headlines rise out of a mask, word by word, and every photo is unveiled and drifts
  document.querySelectorAll('main h1:not(.hero-word),main h2:not(.summary h2)').forEach((h) => {
    const words = splitWords(h);
    gsap.from(words, { yPercent: 115, rotate: 5, duration: 1.05, stagger: .055, ease: 'power4.out', scrollTrigger: { trigger: h, start: 'top 90%', once: true } });
  });
  // Photos are thrown in at a hard angle and land slanted, tied to the scroll in both directions
  const throwIn = (el, i, tilt = 2.4, reach = 170) => {
    const dir = i % 2 ? 1 : -1;
    gsap.fromTo(el, { x: reach * dir, y: 90, rotation: 13 * dir, scale: .8 }, { x: 0, y: 0, rotation: tilt * dir, scale: 1, ease: 'power3.out', scrollTrigger: { trigger: el, start: 'top 108%', end: 'top 58%', scrub: .35 } });
  };
  document.querySelectorAll('main .pic').forEach((pic, i) => {
    if (pic.closest('.hero,.fall,.rooms,.tile,.pile,.strip,.close-photo')) return;
    throwIn(pic, i);
    const img = pic.querySelector('img');
    gsap.fromTo(img, { scale: 1.3, yPercent: -9 }, { scale: 1.12, yPercent: 9, ease: 'none', scrollTrigger: { trigger: pic, start: 'top bottom', end: 'bottom top', scrub: .4 } });
  });
  document.querySelectorAll('.rooms button').forEach((b, i) => throwIn(b, i, 1.6, 120));
  document.querySelectorAll('.tile').forEach((t, i) => {
    throwIn(t, i, i === 0 ? 1.4 : 2.6, 260);
    gsap.fromTo(t.querySelector('img'), { scale: 1.32, yPercent: -8 }, { scale: 1.12, yPercent: 8, ease: 'none', scrollTrigger: { trigger: t, start: 'top bottom', end: 'bottom top', scrub: .4 } });
  });
  if (document.querySelector('.adventure-wall')) gsap.from('.tile .flash', { scale: 0, rotate: -14, duration: .7, stagger: .12, delay: .5, ease: 'back.out(2.2)', scrollTrigger: { trigger: '.adventure-wall', start: 'top 85%', once: true } });
  // Lists and boards cascade in
  [['.board', '.board-row,tbody tr'], ['.act-list', '.act-item'], ['.steps-list', 'li'], ['.bullets', 'li']].forEach(([wrap, kids]) => {
    document.querySelectorAll(wrap).forEach((w) => {
      const items = w.querySelectorAll(kids);
      if (items.length) gsap.from(items, { x: -30, autoAlpha: 0, duration: .7, stagger: .05, ease: 'power3.out', scrollTrigger: { trigger: w, start: 'top 85%', once: true } });
    });
  });
  document.querySelectorAll('main .lead:not([data-say]),main .actions').forEach((el) => {
    if (el.closest('.hero,.fall')) return;
    gsap.from(el, { y: 34, autoAlpha: 0, duration: .9, ease: 'power3.out', scrollTrigger: { trigger: el, start: 'top 92%', once: true } });
  });
  document.querySelectorAll('.route-line').forEach((p) => {
    const len = p.getTotalLength();
    gsap.fromTo(p, { strokeDasharray: len, strokeDashoffset: len }, { strokeDashoffset: 0, duration: 2.2, ease: 'power2.inOut', scrollTrigger: { trigger: p.closest('svg'), start: 'top 80%', once: true } });
  });

  // Statement lights up word by word as you read
  document.querySelectorAll('[data-say]').forEach((el) => {
    el.setAttribute('aria-label', el.textContent);
    el.innerHTML = el.textContent.split(' ').map((w) => `<span class="say-w" aria-hidden="true">${w}</span>`).join(' ');
    gsap.fromTo(el.querySelectorAll('.say-w'), { opacity: .13 }, { opacity: 1, stagger: .5, ease: 'none', scrollTrigger: { trigger: el, start: 'top 82%', end: 'bottom 45%', scrub: .4 } });
  });

  // Closing line swells as it arrives
  document.querySelectorAll('.close h2').forEach((h) => {
    gsap.fromTo(h, { scale: .72 }, { scale: 1, ease: 'none', scrollTrigger: { trigger: h, start: 'top bottom', end: 'center center', scrub: .4 } });
  });

  // Buttons lean toward the pointer
  if (!touch) {
    document.querySelectorAll('.btn').forEach((b) => {
      const x = gsap.quickTo(b, 'x', { duration: .5, ease: 'power3.out' });
      const y = gsap.quickTo(b, 'y', { duration: .5, ease: 'power3.out' });
      b.addEventListener('pointermove', (e) => { const r = b.getBoundingClientRect(); x((e.clientX - r.left - r.width / 2) * .22); y((e.clientY - r.top - r.height / 2) * .32); });
      b.addEventListener('pointerleave', () => { x(0); y(0); });
    });
  }
  addEventListener('load', () => ScrollTrigger.refresh());
  document.fonts?.ready.then(() => ScrollTrigger.refresh());
}
if (!reduce) runMotion();
