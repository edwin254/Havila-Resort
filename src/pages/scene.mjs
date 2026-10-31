// The hand-painted hero: Mt. Kenya, Gaturi Hills, Kirengete Falls, a raft and camp on the island.
const rays = Array.from({ length: 14 }, (_, i) => {
  const a = (i * Math.PI) / 7;
  const b = a + Math.PI / 14;
  const r = 2200;
  return `<path d="M1180 250L${1180 + r * Math.cos(a)} ${250 + r * Math.sin(a)}L${1180 + r * Math.cos(b)} ${250 + r * Math.sin(b)}Z"/>`;
}).join('');

const tree = (x, y, s, c = '#07564A') => `<g transform="translate(${x} ${y}) scale(${s})"><path d="M-5 0h10l-2-70H-3z" fill="#101E1A"/><path d="M-70-62c10-30 46-32 70-26 26-8 60-4 70 26-30 10-112 10-140 0z" fill="${c}" stroke="#101E1A" stroke-width="5"/></g>`;

export const heroScene = `
<svg class="hero-scene" viewBox="0 0 1600 1000" preserveAspectRatio="xMidYMax slice" role="img" aria-label="A painted scene of Kirengete Falls, a raft on the River Tana, tents on the island and Mt. Kenya behind">
  <rect width="1600" height="1000" fill="#FFB703"/>
  <g fill="#FFC93A">${rays}</g>
  <circle cx="1180" cy="250" r="120" fill="#FFF8E1" stroke="#101E1A" stroke-width="6"/>
  <g class="s-mtn"><path d="M780 560l150-250 46 60 44-96 80 116 58-44 190 214z" fill="#26416F" stroke="#101E1A" stroke-width="6" stroke-linejoin="round"/>
  <path d="M908 346l22-36 46 60 44-96 42 62-24 26-22-22-22 30-26-24-22 28z" fill="#FFF8E1" stroke="#101E1A" stroke-width="4" stroke-linejoin="round"/></g>
  <path d="M0 610c130-90 300-120 470-74s260 40 420-14 460-60 710 44v434H0z" fill="#2FB457" stroke="#101E1A" stroke-width="6"/>
  <path d="M0 690c190-70 340-60 500-16s250 30 340-4l60 330H0z" fill="#17935F" stroke="#101E1A" stroke-width="6"/>
  <path d="M1600 660c-150-40-260-30-390 6l-80 334h470z" fill="#17935F" stroke="#101E1A" stroke-width="6"/>
  <g class="s-falls">
  <path d="M740 640c50-30 330-34 400-4l40 220H700z" fill="#7A3A1E" stroke="#101E1A" stroke-width="6"/>
  <path d="M800 640c60-14 180-14 250 0l30 214H780z" fill="#3CC1EE" stroke="#101E1A" stroke-width="6"/>
  <g fill="none" stroke="#FFF8E1" stroke-linecap="round">
    <path class="falls-run" d="M830 646v210" stroke-width="16"/>
    <path class="falls-run b" d="M880 642v214" stroke-width="10"/>
    <path class="falls-run" d="M930 640v216" stroke-width="20"/>
    <path class="falls-run b" d="M980 642v214" stroke-width="10"/>
    <path class="falls-run" d="M1030 644v212" stroke-width="16"/>
  </g>
  </g>
  <!-- River below -->
  <path d="M640 860c200-30 420-34 620-4 150 24 260 60 340 56v88H0V944c180 10 420-30 640-84z" fill="#3CC1EE" stroke="#101E1A" stroke-width="6"/>
  <g fill="none" stroke="#FFF8E1" stroke-linecap="round" stroke-width="8">
    <path class="flow" d="M60 972c240-10 480-60 720-84"/>
    <path class="flow" d="M880 880c200 0 420 40 700 76"/>
    <path class="flow" d="M420 980c260-20 600-66 980-22"/>
  </g>
  <ellipse class="s-falls" cx="930" cy="862" rx="190" ry="24" fill="#FFF8E1"/>
  <!-- Island camp -->
  <path d="M1190 836c70-30 240-30 320 8-50 30-260 34-320-8z" fill="#2FB457" stroke="#101E1A" stroke-width="6"/>
  <g stroke="#101E1A" stroke-width="5" stroke-linejoin="round">
    <path d="M1250 826l48-72 48 72z" fill="#F2502F"/><path d="M1298 754l-16 72h32z" fill="#FFF8E1"/>
    <path d="M1360 830l38-58 38 58z" fill="#FFB703"/><path d="M1398 772l-12 58h24z" fill="#101E1A"/>
  </g>
  ${tree(1465, 826, .8)}
  ${tree(150, 720, 1.25)}${tree(330, 700, .85, '#0B6B4C')}${tree(650, 668, .7)}${tree(1250, 666, .8)}${tree(1490, 690, 1.15, '#0B6B4C')}
  <!-- Raft -->
  <g class="s-raft"><g transform="translate(330 868)"><g class="bob">
    <path d="M-20 48 c0-14 12-20 24-20h250c14 0 24 8 24 20s-12 28-28 28H8c-16 0-28-14-28-28z" fill="#F2502F" stroke="#101E1A" stroke-width="6"/>
    <path d="M-4 54h262" stroke="#FFF8E1" stroke-width="7"/>
    <g stroke="#101E1A" stroke-width="5">
      <circle cx="50" cy="-8" r="15" fill="#FFB703"/><rect x="34" y="6" width="32" height="24" fill="#07564A"/>
      <circle cx="118" cy="-14" r="15" fill="#FFF8E1"/><rect x="102" y="1" width="32" height="28" fill="#17144A"/>
      <circle cx="186" cy="-8" r="15" fill="#FFB703"/><rect x="170" y="6" width="32" height="24" fill="#07564A"/>
      <path d="M34 8-12 92M150 2l32 90M216 6l42 86" fill="none" stroke-width="6"/>
    </g>
  </g></g></g>
</svg>`;

export const routeMap = `
<svg class="route" viewBox="0 0 800 420" role="img" aria-label="A painted route map: from Nairobi, north-east on the Thika Road through Thika, then on the A2 to Sagana and Havila Resort beside the River Tana">
  <rect width="800" height="420" fill="#3CC1EE"/>
  <path d="M0 330c120-40 200 0 340-30s240-110 460-120v240H0z" fill="#2FB457" stroke="#101E1A" stroke-width="5"/>
  <path d="M560 420c20-90 60-150 240-210" fill="none" stroke="#07564A" stroke-width="20"/>
  <path d="M90 350C220 320 300 280 400 210s170-90 270-110" fill="none" stroke="#101E1A" stroke-width="14" stroke-linecap="round"/>
  <path d="M90 350C220 320 300 280 400 210s170-90 270-110" fill="none" stroke="#FFB703" stroke-width="6" stroke-dasharray="20 14" stroke-linecap="round"/>
  <g font-family="Bowlby One, Impact, sans-serif" font-size="25" fill="#101E1A">
    <circle cx="90" cy="350" r="13" fill="#FFF8E1" stroke="#101E1A" stroke-width="5"/><text x="60" y="395">Nairobi</text>
    <circle cx="360" cy="238" r="11" fill="#FFF8E1" stroke="#101E1A" stroke-width="5"/><text x="382" y="272">Thika</text>
    <circle cx="670" cy="100" r="19" fill="#F2502F" stroke="#101E1A" stroke-width="5"/><text x="400" y="62" font-size="34">Havila, Sagana</text>
  </g>
  <text x="510" y="178" font-family="Figtree, sans-serif" font-weight="800" font-size="22" fill="#101E1A" transform="rotate(-14 510 178)">A2 road</text>
  <text x="620" y="380" font-family="Oleo Script, serif" font-weight="700" font-size="30" fill="#FFF8E1">River Tana</text>
</svg>`;

// Painted panels stand in where no real Havila photo exists yet.
const panel = (label, inner, bg) => `<svg class="painted-panel" viewBox="0 0 800 600" preserveAspectRatio="xMidYMid slice" role="img" aria-label="${label}"><rect width="800" height="600" fill="${bg}"/>${inner}</svg>`;

export const paintedQuad = panel('A painted quad bike throwing up red dust on a dirt track', `
  <g fill="#FFC93A"><path d="M400 180 0 0h220zM400 180 800 0H580zM400 180 800 260v-120zM400 180 0 260v-120z"/></g>
  <circle cx="400" cy="180" r="62" fill="#FFF8E1" stroke="#101E1A" stroke-width="6"/>
  <path d="M0 330c150-60 300-40 430-10s260 10 370-30v310H0z" fill="#2FB457" stroke="#101E1A" stroke-width="6"/>
  <path d="M0 450c220-60 520-70 800-20v170H0z" fill="#B4481E" stroke="#101E1A" stroke-width="6"/>
  <g fill="#E6A15C" stroke="#101E1A" stroke-width="5"><circle cx="110" cy="420" r="44"/><circle cx="182" cy="376" r="30"/><circle cx="52" cy="366" r="26"/><circle cx="238" cy="430" r="24"/></g>
  <g stroke="#101E1A" stroke-width="7" stroke-linejoin="round">
    <path d="M300 396l50-62h170l66 62 32 54H270z" fill="#F2502F"/>
    <path d="M400 330l-22-52h86l34 52z" fill="#101E1A"/>
    <circle cx="440" cy="196" r="28" fill="#FFB703"/><path d="M420 224h46l22 74-52 22-40-30z" fill="#07564A"/>
    <path d="M462 240l74 42" fill="none" stroke-width="13"/><path d="M528 270l34-16" fill="none" stroke-width="10"/>
    <circle cx="316" cy="472" r="62" fill="#101E1A"/><circle cx="316" cy="472" r="24" fill="#FFF8E1"/>
    <circle cx="590" cy="472" r="62" fill="#101E1A"/><circle cx="590" cy="472" r="24" fill="#FFF8E1"/>
  </g>`, '#FFB703');

export const paintedArchery = panel('A painted archery target with an arrow in the bullseye', `
  <path d="M0 450c200-50 560-60 800-10v160H0z" fill="#2FB457" stroke="#101E1A" stroke-width="6"/>
  <path d="M300 520l60-230M500 520l-60-230" stroke="#7A3A1E" stroke-width="22"/>
  <g stroke="#101E1A" stroke-width="6"><circle cx="400" cy="270" r="190" fill="#FFF8E1"/><circle cx="400" cy="270" r="145" fill="#17144A"/><circle cx="400" cy="270" r="102" fill="#3CC1EE"/><circle cx="400" cy="270" r="62" fill="#F2502F"/><circle cx="400" cy="270" r="26" fill="#FFB703"/></g>
  <g stroke="#101E1A" stroke-linecap="round"><path d="M400 270 690 92" stroke-width="10"/><path d="M660 88l48-28M672 112l50-26" stroke="#F2502F" stroke-width="13"/></g>`, '#3CC1EE');

export const paintedCamp = panel('Painted tents and a campfire beneath the stars beside the falls', `
  <g fill="#FFF8E1"><circle cx="90" cy="70" r="5"/><circle cx="210" cy="130" r="4"/><circle cx="320" cy="56" r="6"/><circle cx="470" cy="104" r="4"/><circle cx="580" cy="48" r="5"/><circle cx="700" cy="120" r="6"/><circle cx="150" cy="200" r="3"/><circle cx="640" cy="210" r="4"/></g>
  <circle cx="640" cy="110" r="52" fill="#FFB703" stroke="#101E1A" stroke-width="6"/><circle cx="662" cy="96" r="44" fill="#17144A"/>
  <path d="M0 320c170-70 360-60 500-20s220 20 300-20v320H0z" fill="#07564A" stroke="#101E1A" stroke-width="6"/>
  <path d="M0 440c250-40 540-50 800-10v170H0z" fill="#0B3B34" stroke="#101E1A" stroke-width="6"/>
  <g stroke="#101E1A" stroke-width="7" stroke-linejoin="round">
    <path d="M70 450 200 250l130 200z" fill="#F2502F"/><path d="M200 250l-44 200h88z" fill="#FFB703"/>
    <path d="M500 440 610 280l110 160z" fill="#FFB703"/><path d="M610 280l-34 160h68z" fill="#FFF8E1"/>
    <path d="M395 410c-44-40-20-74 2-110 6 34 54 58 22 110z" fill="#F2502F"/><path d="M398 410c-20-20-8-40 2-56 6 20 22 34 8 56z" fill="#FFB703"/>
    <path d="M340 430l116-20M340 410l116 20" stroke-width="13"/>
  </g>`, '#17144A');

export const paintedRapids = panel('A painted raft and paddlers riding a big white rapid', `
  <circle cx="620" cy="120" r="70" fill="#FFB703" stroke="#101E1A" stroke-width="6"/>
  <path d="M0 250c190-60 380-50 800-10v120H0z" fill="#2FB457" stroke="#101E1A" stroke-width="6"/>
  <path d="M0 310h800v290H0z" fill="#1596CE" stroke="#101E1A" stroke-width="6"/>
  <g fill="#FFF8E1" stroke="#101E1A" stroke-width="6"><path d="M0 420c70-90 140-60 190-10 50-70 130-90 190-10 60-70 150-80 210 0 60-50 140-50 210 20v180H0z"/></g>
  <g transform="translate(180 210) rotate(-9 210 110)" stroke="#101E1A" stroke-width="6">
    <path d="M6 148c0-20 16-30 34-30h350c20 0 34 12 34 30s-18 42-40 42H44c-22 0-38-20-38-42z" fill="#F2502F"/><path d="M26 158h376" stroke="#FFF8E1" stroke-width="9"/>
    <circle cx="110" cy="58" r="23" fill="#FFB703"/><rect x="86" y="80" width="48" height="40" fill="#07564A"/>
    <circle cx="212" cy="46" r="23" fill="#FFF8E1"/><rect x="188" y="68" width="48" height="50" fill="#17144A"/>
    <circle cx="314" cy="58" r="23" fill="#FFB703"/><rect x="290" y="80" width="48" height="40" fill="#07564A"/>
    <path d="M92 84 28 220M236 76l48 142M340 84l58 136" fill="none" stroke-width="9"/>
  </g>
  <path d="M0 520c70-50 140-30 220 0s190 20 270-10 200-30 310 10v80H0z" fill="#FFF8E1" stroke="#101E1A" stroke-width="6"/>`, '#3CC1EE');
