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

// The river: one unbroken road of water with a raft riding it as you scroll.
const page = document.querySelector('.river-page');
if (page) {
  const NS = 'http://www.w3.org/2000/svg';
  const svg = document.createElementNS(NS, 'svg');
  svg.classList.add('river-svg');
  svg.setAttribute('aria-hidden', 'true');
  const layers = [['#0D1312', 1.28], ['#2A7F8E', 1], ['#EDE8DC', .12]].map(([color, scale]) => {
    const p = document.createElementNS(NS, 'path');
    p.setAttribute('stroke', color);
    p.dataset.scale = scale;
    svg.append(p);
    return p;
  });
  layers[2].setAttribute('stroke-dasharray', '60 120');
  page.prepend(svg);
  const raft = document.createElement('div');
  raft.className = 'river-raft';
  raft.setAttribute('aria-hidden', 'true');
  raft.innerHTML = '<svg viewBox="0 0 120 72"><path d="M6 44c0-7 6-10 12-10h84c7 0 12 4 12 10s-6 14-14 14H20C12 58 6 51 6 44z" fill="#BFEBD9" stroke="#0D1312" stroke-width="3"/><g fill="#EDE8DC"><circle cx="38" cy="21" r="8"/><circle cx="62" cy="19" r="8"/><circle cx="86" cy="21" r="8"/></g><g fill="#0D1312"><rect x="30" y="28" width="16" height="8"/><rect x="54" y="26" width="16" height="10"/><rect x="78" y="28" width="16" height="8"/></g><path d="M26 22 12 66M74 20l18 46" stroke="#EDE8DC" stroke-width="3"/></svg>';
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
    const p = layers[1].getPointAtLength(lo);
    const q = layers[1].getPointAtLength(Math.min(total, lo + 4));
    const tilt = Math.max(-16, Math.min(16, (q.x - p.x) * 3));
    const w = raft.offsetWidth;
    const x = Math.max(w / 2, Math.min(page.clientWidth - w / 2, p.x));
    raft.style.transform = `translate(${x - w / 2}px,${p.y - w * .42}px) rotate(${tilt}deg)`;
    // On phones the raft rides small behind the text on the edge, and grows while crossing.
    raft.classList.toggle('rail', mobile && (p.x < 24 || p.x > page.clientWidth - 24));
    layers[2].setAttribute('stroke-dashoffset', -lo * .6);
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

// The Falls: one WebGL scene. Water pours in front of the name, the camera pushes through it,
// then sheets of water wash in each thing Havila offers.
function startFalls(hero) {
  const canvas = hero.querySelector('.hero-water');
  const photoEl = hero.querySelector('.hero-photo img');
  const gl = canvas.getContext('webgl', { antialias: false, alpha: false, powerPreference: 'high-performance' });
  if (!gl) return null;
  const vs = 'attribute vec2 p;varying vec2 v;void main(){v=p*.5+.5;gl_Position=vec4(p,0.,1.);}';
  const fs = `precision highp float;varying vec2 v;
  uniform sampler2D tA,tB,tL;uniform vec2 sA,sB,ptr;uniform float time,mixT,falls,zoom,reveal,lScale,mist,speed,ripple,kbA,kbB,ready,over;
  float h(vec2 p){return fract(sin(dot(p,vec2(127.1,311.7)))*43758.5453);}
  float n(vec2 p){vec2 i=floor(p),f=fract(p);f=f*f*(3.-2.*f);return mix(mix(h(i),h(i+vec2(1,0)),f.x),mix(h(i+vec2(0,1)),h(i+1.),f.x),f.y);}
  float fbm(vec2 p){float a=.5,s=0.;for(int i=0;i<4;i++){s+=a*n(p);p*=2.03;a*=.5;}return s;}
  vec2 cov(vec2 q,vec2 s){return (q-.5)*s+.5;}
  void main(){
    vec2 p=vec2(v.x,1.-v.y);
    vec2 focus=vec2(.56,.5);
    vec2 q=(p-focus)/zoom+focus;
    vec2 d=p-ptr;float l=length(d*vec2(sA.y/sA.x,1.));
    vec2 rip=normalize(d+.0001)*sin(l*46.-time*7.)*exp(-l*6.)*.03*ripple;
    q+=rip;
    // Falls stage
    vec2 ua=cov(q,sA);
    vec3 base=texture2D(tA,ua).rgb;
    vec3 base2=texture2D(tA,ua+vec2(0.,.012)).rgb;
    float lum=dot(base+base2,vec3(.15,.295,.055));
    float sat=max(max(base.r,base.g),base.b)-min(min(base.r,base.g),base.b);
    float box=smoothstep(.26,.33,ua.x)*(1.-smoothstep(.84,.92,ua.x))*smoothstep(.1,.2,ua.y)*(1.-smoothstep(.68,.78,ua.y));
    float m=smoothstep(.2,.5,lum)*(1.-smoothstep(.28,.55,sat))*box*falls;
    float fast=time*(3.+speed*6.);
    float s1=n(vec2(ua.x*150.,ua.y*5.-fast));
    float s2=n(vec2(ua.x*340.+s1,ua.y*11.-fast*1.7));
    float streak=s1*.6+s2*.4;
    vec3 ca=texture2D(tA,ua+vec2((streak-.5)*.01*m,(streak-.5)*.05*m)).rgb;
    ca=mix(ca,vec3(.76+.42*streak),m*.82);
    // Pool: rocks stay, water below the falls shivers and foams
    float pool=smoothstep(.66,.74,ua.y)*falls;
    vec2 pw=vec2(fbm(vec2(ua.x*18.,ua.y*38.-time*.9)),fbm(vec2(ua.x*22.+4.,ua.y*30.-time*1.2)))-.5;
    ca=mix(ca,texture2D(tA,ua+pw*.022).rgb,pool);
    float foam=smoothstep(.5,.78,fbm(vec2(ua.x*16.,ua.y*26.-time*1.6)))*smoothstep(.62,.7,ua.y)*(1.-smoothstep(.76,.88,ua.y))*box*falls;
    ca+=foam*.5;
    // The name sits behind the water
    vec2 lc=vec2(.5,.47);
    vec2 lu=(p-lc)/lScale+lc+vec2(0.,(streak-.5)*.012*m)+rip;
    float L=texture2D(tL,lu).a*step(0.,lu.x)*step(lu.x,1.)*step(0.,lu.y)*step(lu.y,1.);
    L*=step(1.-reveal,1.-p.y+.0)+step(.999,reveal);
    L=min(L,1.)*falls;
    ca=mix(ca,vec3(.93,.91,.86),L*(1.-m*over)*(1.-foam));
    // Mist climbs from the base and swallows the frame as you enter
    float mf=fbm(vec2(p.x*5.+time*.12,p.y*6.+time*.5));
    float mb=smoothstep(.45,1.,p.y)*.34*falls;
    float mistA=clamp(mb*mf*1.6+mist*(.55+mf),0.,1.);
    ca=mix(ca,vec3(.92,.96,.95),mistA);
    float sp=step(.9965,h(floor(vec2(p.x*90.,p.y*14.-time*(5.+speed*12.)))));
    ca+=sp*speed*.55*falls;
    // Offer photos: alive with a slow current
    vec2 cur=vec2(fbm(p*5.+time*.18),fbm(p*5.+7.-time*.14))-.5;
    if(falls<.5){ca=texture2D(tA,cov((p-.5)/kbA+.5+cur*.006+rip,sA)).rgb;}
    // A sheet of water runs down the screen and leaves the next picture behind it
    float edge=mixT*1.55-.2-(n(vec2(p.x*11.,3.+time*.15))*.26+n(vec2(p.x*43.,8.))*.09);
    float w=smoothstep(0.,.03,edge-p.y);
    float band=smoothstep(.0,.05,edge-p.y)*(1.-smoothstep(.05,.2,edge-p.y));
    vec2 ub=(p-.5)/kbB+.5+cur*.006+rip+vec2(0.,-band*.06)+vec2((n(vec2(p.y*30.,time))-.5)*band*.03,0.);
    vec3 cb=texture2D(tB,cov(ub,sB)).rgb;
    vec3 c=mix(ca,cb,w*ready);
    c+=band*(.3+.4*n(vec2(p.x*130.,p.y*8.-time*5.)))*step(.001,mixT)*ready;
    gl_FragColor=vec4(c,1.);
  }`;
  const sh = (type, src) => { const x = gl.createShader(type); gl.shaderSource(x, src); gl.compileShader(x); return x; };
  const pr = gl.createProgram();
  gl.attachShader(pr, sh(gl.VERTEX_SHADER, vs));
  gl.attachShader(pr, sh(gl.FRAGMENT_SHADER, fs));
  gl.linkProgram(pr);
  if (!gl.getProgramParameter(pr, gl.LINK_STATUS)) return null;
  gl.useProgram(pr);
  gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer());
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
  const loc = gl.getAttribLocation(pr, 'p');
  gl.enableVertexAttribArray(loc);
  gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);
  const cache = {};
  const U = (n) => cache[n] || (cache[n] = gl.getUniformLocation(pr, n));
  const makeTex = (src) => {
    const t = gl.createTexture();
    gl.activeTexture(gl.TEXTURE3); // Scratch unit, so an upload never disturbs a live binding
    gl.bindTexture(gl.TEXTURE_2D, t);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, src);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    return t;
  };
  const items = hero.querySelectorAll('.offer');
  const stage = canvas.parentElement;
  // Slide 0 is the falls; 1 onward are the offers, loaded in the background.
  const stone = document.createElement('canvas');
  stone.width = stone.height = 2;
  const sx = stone.getContext('2d'); sx.fillStyle = '#141B19'; sx.fillRect(0, 0, 2, 2);
  const slides = [{ el: photoEl }, ...[...items].map((o) => ({ el: o.querySelector('img') })), { tex: makeTex(stone), ratio: 1 }];
  const loadSlide = (sl) => {
    if (sl.tex || sl.loading) return;
    sl.loading = true;
    const im = new Image();
    im.onload = () => { sl.tex = makeTex(im); sl.ratio = im.width / im.height; };
    const want = Math.min(touch ? 1280 : 1800, innerWidth * Math.min(devicePixelRatio || 1, 2));
    const sizes = sl.el.srcset.split(',').map((x) => x.trim().split(' ')).map(([u, w]) => [u, parseInt(w, 10)]).sort((m, k) => m[1] - k[1]);
    im.src = (sizes.find(([, w]) => w >= want) || sizes[sizes.length - 1])[0];
  };
  const coverOf = (ratio) => { const c = canvas.width / canvas.height; return c > ratio ? [1, ratio / c] : [c / ratio, 1]; };
  const narrow = innerWidth <= 820;
  const state = { over: 0, p: 0, target: 0, reveal: 0, ptr: [.5, .4], ptrT: [.5, .4], ripple: 0, running: false, scale: touch ? 1 : Math.min(devicePixelRatio || 1, 1.5), slow: 0, last: 0 };
  let letters;
  const drawLetters = () => {
    const W = Math.min(1800, stage.clientWidth * 1.5), H = W * stage.clientHeight / stage.clientWidth;
    const c = document.createElement('canvas');
    c.width = W; c.height = H;
    const x = c.getContext('2d');
    x.fillStyle = '#fff'; x.textAlign = 'center'; x.textBaseline = 'middle';
    let size = 100;
    x.font = `${size}px Anton, Impact, sans-serif`;
    size = Math.min(100 * (W * .93) / x.measureText('HAVILA').width, H * .62);
    x.font = `${size}px Anton, Impact, sans-serif`;
    x.fillText('HAVILA', W / 2, H * .47);
    if (letters) gl.deleteTexture(letters);
    letters = makeTex(c);
    gl.activeTexture(gl.TEXTURE2);
    gl.bindTexture(gl.TEXTURE_2D, letters);
    gl.uniform1i(U('tL'), 2);
  };
  const resize = () => {
    canvas.width = stage.clientWidth * state.scale;
    canvas.height = stage.clientHeight * state.scale;
    gl.viewport(0, 0, canvas.width, canvas.height);
  };
  const smooth = (a, b, x) => { const t = Math.min(1, Math.max(0, (x - a) / (b - a))); return t * t * (3 - 2 * t); };
  const COUNT = items.length;
  const INTRO = .2;
  let current = -1;
  const setOffer = (i) => {
    if (i === current) return;
    current = i;
    items.forEach((o, k) => { const on = k === i; o.classList.toggle('on', on); });
  };
  const frame = (ms) => {
    if (!state.running) return;
    const dt = ms - state.last; state.last = ms;
    if (dt > 34) { state.slow++; if (state.slow > 90 && state.scale > .7) { state.scale = Math.max(.7, state.scale * .75); state.slow = 0; resize(); } } else if (state.slow > 0) state.slow -= .25;
    state.p += (state.target - state.p) * .09;
    state.ptr[0] += (state.ptrT[0] - state.ptr[0]) * .08;
    state.ptr[1] += (state.ptrT[1] - state.ptr[1]) * .08;
    state.ripple *= .975;
    const p = state.p;
    let a, b, mixT, kbA = 1.04, kbB = 1.04;
    if (p < INTRO) { a = 0; b = 1; mixT = smooth(.145, INTRO, p); } else {
      const seg = Math.min(COUNT - .0001, (p - INTRO) / (1 - INTRO) * COUNT);
      const i = Math.floor(seg), f = seg - i;
      a = i + 1; b = i + 2;
      mixT = smooth(i === COUNT - 1 ? .6 : .72, i === COUNT - 1 ? .96 : 1, f);
      kbA = 1.16 - f * .12; kbB = 1.16;
    }
    const shown = a === 0 ? 0 : (mixT > .55 ? b - 1 : a - 1);
    setOffer(p < INTRO * .92 || shown >= COUNT ? -1 : shown);
    hero.classList.toggle('in-offers', p >= INTRO * .92);
    hero.classList.toggle('reel-done', shown >= COUNT);
    loadSlide(slides[a]); loadSlide(slides[b]); if (slides[b + 1]) loadSlide(slides[b + 1]);
    const A = slides[a], B = slides[b];
    if (A.tex) {
      gl.activeTexture(gl.TEXTURE0); gl.bindTexture(gl.TEXTURE_2D, A.tex); gl.uniform1i(U('tA'), 0);
      gl.activeTexture(gl.TEXTURE1); gl.bindTexture(gl.TEXTURE_2D, (B.tex || A.tex)); gl.uniform1i(U('tB'), 1);
      const ca = coverOf(A.ratio), cb = coverOf((B.tex ? B : A).ratio);
      gl.uniform2f(U('sA'), ca[0], ca[1]); gl.uniform2f(U('sB'), cb[0], cb[1]);
      const intro = Math.min(1, p / INTRO);
      gl.uniform1f(U('falls'), a === 0 ? 1 : 0);
      gl.uniform1f(U('time'), ms / 1000);
      gl.uniform1f(U('mixT'), mixT);
      gl.uniform1f(U('ready'), B.tex ? 1 : 0);
      gl.uniform1f(U('zoom'), 1 + Math.pow(intro, 2) * 2.1);
      gl.uniform1f(U('lScale'), 1 + Math.pow(intro, 3) * 7);
      gl.uniform1f(U('reveal'), state.reveal);
      gl.uniform1f(U('over'), state.over);
      gl.uniform1f(U('mist'), smooth(.1, .17, p));
      gl.uniform1f(U('speed'), intro);
      gl.uniform1f(U('kbA'), kbA); gl.uniform1f(U('kbB'), kbB);
      gl.uniform1f(U('ripple'), Math.min(1, state.ripple));
      gl.uniform2f(U('ptr'), state.ptr[0], state.ptr[1]);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
    }
    requestAnimationFrame(frame);
  };
  state.play = () => { if (!state.running) { state.running = true; requestAnimationFrame(frame); } };
  state.pause = () => { state.running = false; };
  const begin = () => {
    resize();
    drawLetters();
    loadSlide(slides[0]);
    hero.classList.add('gl-on');
    canvas.classList.add('live');
    gsap.to(state, { reveal: 1, duration: 1.5, ease: 'power3.out', delay: .15 });
    gsap.to(state, { over: narrow ? .28 : .8, duration: 2.2, ease: 'power2.inOut', delay: 1.7 });
    state.play();
  };
  (document.fonts ? document.fonts.load('100px Anton').then(() => document.fonts.ready) : Promise.resolve()).then(begin, begin);
  addEventListener('resize', () => { resize(); drawLetters(); });
  const move = (e) => {
    const r = stage.getBoundingClientRect();
    state.ptrT = [(e.clientX - r.left) / r.width, (e.clientY - r.top) / r.height];
    state.ripple = Math.min(1.4, state.ripple + .1);
  };
  stage.addEventListener('pointermove', move, { passive: true });
  stage.addEventListener('pointerdown', (e) => { move(e); state.ptr = [...state.ptrT]; state.ripple = 1.4; }, { passive: true });
  state.setOffer = setOffer;
  return state;
}

// The sound of the falls, generated in the browser and only on request
function setupSound(btn, hero) {
  let ctx, gain;
  btn.addEventListener('click', () => {
    if (!ctx) {
      ctx = new (window.AudioContext || window.webkitAudioContext)();
      const len = ctx.sampleRate * 4;
      const buf = ctx.createBuffer(2, len, ctx.sampleRate);
      for (let c = 0; c < 2; c++) { const d = buf.getChannelData(c); let l = 0; for (let i = 0; i < len; i++) { l = (l + .04 * (Math.random() * 2 - 1)) / 1.04; d[i] = l * 3.2; } }
      const src = ctx.createBufferSource(); src.buffer = buf; src.loop = true;
      const f = ctx.createBiquadFilter(); f.type = 'lowpass'; f.frequency.value = 1500;
      gain = ctx.createGain(); gain.gain.value = 0;
      src.connect(f).connect(gain).connect(ctx.destination); src.start();
      ScrollTrigger.create({ trigger: hero, start: 'top top', end: 'bottom top', onUpdate: (s) => { if (btn.getAttribute('aria-pressed') === 'true') gain.gain.setTargetAtTime(.5 * (1 - s.progress), ctx.currentTime, .2); } });
    }
    const on = btn.getAttribute('aria-pressed') !== 'true';
    btn.setAttribute('aria-pressed', on);
    btn.textContent = on ? 'Mute the falls' : 'Hear the falls';
    ctx.resume();
    gain.gain.setTargetAtTime(on ? .5 : 0, ctx.currentTime, .3);
  });
}

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

  // Hero: the falls, then the whole offer
  const hero = document.querySelector('[data-hero]');
  if (hero) {
    const falls = startFalls(hero);
    const foot = hero.querySelector('.hero-foot');
    gsap.from(foot.children, { y: 30, autoAlpha: 0, duration: 1, stagger: .1, delay: .7, ease: 'power3.out' });
    gsap.to(foot, { autoAlpha: 0, y: -40, ease: 'power2.in', scrollTrigger: { trigger: hero, start: 'top top', end: '6% top', scrub: .3 } });
    const items = [...hero.querySelectorAll('.offer')];
    ScrollTrigger.create({ trigger: hero, start: 'top top', end: 'bottom bottom',
      onUpdate: (s) => {
        if (falls) { falls.target = s.progress; return; }
        // No WebGL: the same reel as a simple crossfade over real photos
        const i = s.progress < .2 ? -1 : Math.min(items.length - 1, Math.floor((s.progress - .2) / .8 * items.length));
        items.forEach((o, k) => o.classList.toggle('on', k === i));
        hero.classList.toggle('in-offers', i >= 0);
      },
    });
    if (falls) new IntersectionObserver(([e]) => { if (e.isIntersecting) falls.play(); else falls.pause(); }).observe(hero);
    const sound = hero.querySelector('.sound');
    if (sound) setupSound(sound, hero);
    // Offer links stay reachable by keyboard: focusing one scrolls the reel to it
    items.forEach((o, i) => o.addEventListener('focus', () => {
      const top = hero.getBoundingClientRect().top + scrollY;
      const span = hero.offsetHeight - innerHeight;
      scrollTo(0, top + span * (.2 + (i + .4) / items.length * .8));
    }));
  }

  // Statement lights up word by word as you read
  document.querySelectorAll('[data-say]').forEach((el) => {
    el.setAttribute('aria-label', el.textContent);
    el.innerHTML = el.textContent.split(' ').map((w) => `<span class="say-w" aria-hidden="true">${w}</span>`).join(' ');
    gsap.fromTo(el.querySelectorAll('.say-w'), { opacity: .13 }, { opacity: 1, stagger: .5, ease: 'none', scrollTrigger: { trigger: el, start: 'top 82%', end: 'bottom 45%', scrub: .4 } });
  });

  // The fall: day burns down to the campfire
  const fall = document.querySelector('[data-fall]');
  if (fall) {
    const pics = fall.querySelectorAll('.fall-pic');
    gsap.set([pics[1], pics[2]], { clipPath: 'circle(0% at 50% 62%)' });
    gsap.timeline({ scrollTrigger: { trigger: fall, start: 'top top', end: 'bottom bottom', scrub: .5 } })
      .fromTo(pics[0].querySelector('img'), { scale: 1.02 }, { scale: 1.3, ease: 'none', duration: 1 }, 0)
      .to(pics[1], { clipPath: 'circle(120% at 50% 62%)', ease: 'power2.in', duration: .42 }, .08)
      .fromTo(pics[1].querySelector('img'), { scale: 1.3 }, { scale: 1, ease: 'none', duration: .6 }, .08)
      .to(pics[2], { clipPath: 'circle(120% at 50% 62%)', ease: 'power2.in', duration: .4 }, .55)
      .fromTo(pics[2].querySelector('img'), { scale: 1.3 }, { scale: 1, ease: 'none', duration: .45 }, .55);
    gsap.from(fall.querySelectorAll('.fall-copy>.lead,.fall-copy>.btn'), { y: 40, autoAlpha: 0, stagger: .1, duration: .9, ease: 'power3.out', scrollTrigger: { trigger: fall, start: 'top 30%', once: true } });
  }

  // The pile: real photos are hurled onto the table one after another while the screen is pinned
  const pile = document.querySelector('[data-pile]');
  if (pile) {
    const cards = gsap.utils.toArray('.pile-card', pile);
    const landed = [-4, 3, -2, 5, -5, 3];
    const tl = gsap.timeline({ scrollTrigger: { trigger: pile, start: 'top top', end: 'bottom bottom', scrub: .35 } });
    cards.forEach((c, i) => {
      const dir = i % 2 ? 1 : -1;
      const start = () => ({ x: dir * innerWidth * 1.15, y: (i % 3 - 1) * innerHeight * .5, rotation: dir * 38, scale: 1.5 });
      if (i === 0) { gsap.set(c, { rotation: landed[0] }); gsap.from(c, { ...start(), ease: 'expo.out', duration: 1.1, scrollTrigger: { trigger: pile, start: 'top 75%', toggleActions: 'play none none reverse' } }); return; }
      tl.fromTo(c, start(), { x: dir * Math.min(innerWidth * .05, 60), y: (i % 2 ? -1 : 1) * Math.min(innerHeight * .03, 24), rotation: landed[i], scale: 1, ease: 'power4.out', duration: 1 }, i - 1);
      tl.to(cards[i - 1], { scale: .92, duration: .6, ease: 'power2.out' }, i - .9);
      tl.fromTo(c, { filter: 'brightness(1.22)' }, { filter: 'brightness(1)', duration: .5, ease: 'none' }, i - .6);
    });
    tl.to({}, { duration: .5 });
  }

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
