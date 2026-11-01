import { contact, rooms, meals, camping, ownTent, activities, photos } from '../data.mjs';
import { photo, waFree } from '../layout.mjs';
import { routeMap } from './scene.mjs';

const kes = (n) => `KES ${n.toLocaleString('en-KE')}`;
const usd = (n) => `US$${n.toLocaleString('en-KE')}`;
const price = (r, n) => (r == null ? 'Ask us' : `<span data-res data-resident="${kes(r)}" data-non="${usd(n)}">${kes(r)}</span>`);
const edge = () => '';
const flash = (a, extra = '') => `<span class="flash" ${extra}>${a}</span>`;
const act = (id) => activities.find((a) => a.id === id);
const resToggle = `<div class="seg" role="group" aria-label="Show prices for"><button type="button" data-res-btn="res" aria-pressed="true">Kenyan resident</button><button type="button" data-res-btn="non" aria-pressed="false">Non-resident</button></div>`;

const offers = [
  ['raft-team', 'Raft', '6 km of white water from', '/adventures/#rafting', [5500, 55]],
  ['quad', 'Ride', 'Quad bikes and cycling', '/adventures/#quad'],
  ['kayak', 'Paddle', 'Kayaks, mini rafts and boats from', '/adventures/#kayak', [500, 5]],
  ['tents-night', 'Camp', 'Pitch up, or use our tents, from', '/camping/', [1000, 10]],
  ['plate', 'Feast', 'Barizi, our restaurant on the hill', '/barizi/'],
  ['room-warm', 'Sleep', 'Themed rooms from', '/stay/', [7000, 70]],
  ['wedding', 'Gather', 'Weddings, team building, conferences', '/events/'],
];

const home = () => ({
  path: '/',
  title: 'Havila Resort, Sagana | Rafting, camping and rooms on the River Tana',
  desc: 'A waterfall, two islands and white water on the River Tana, about two hours from Nairobi. Stay, camp, raft, ride quads and eat on the hill at Barizi.',
  bodyClass: 'page-home',
  body: `<!--
THESIS: The river is alive on the first screen; the site moves like a run down it, not a brochure with a booking bar.
OWN-WORLD: River stone and bone, one glacier jade; Anton at poster scale; full-bleed photography, no boxes.
STORY: Touch the water, ride the activities sideways, fall into night at camp, wake in a real bed, send the plan.
FIRST VIEWPORT: A live waterfall pouring in front of HAVILA; scrolling passes through it and water washes in each offer.
FORM: Cinematic scroll film with the river and raft as the through-line.
-->
<section class="hero" data-hero>
  <div class="hero-stage">
    ${photo('falls', { sizes: '100vw', cls: 'hero-photo', eager: true })}
    <canvas class="hero-water" aria-hidden="true"></canvas>
    <div class="hero-shade"></div>
    <div class="hero-copy">
      <h1 class="hero-word" aria-label="Havila">${[...'HAVILA'].map((c) => `<span class="ltr" aria-hidden="true"><span>${c}</span></span>`).join('')}</h1>
      <div class="hero-foot">
        <p class="hero-tag"><span class="karibu">Karibu.</span> A waterfall, white water and a bed, two hours from Nairobi.</p>
        <a class="btn" href="/plan/">Plan your stay</a>
        <span class="scroll-cue" aria-hidden="true">Scroll into the falls</span>
      </div>
    </div>
    <nav class="offers" aria-label="What Havila offers">
      ${offers.map(([ph, word, line, href, p], i) => `<a class="offer" data-offer="${i}" data-img="${ph}" href="${href}">
        ${photo(ph, { sizes: '100vw', cls: 'offer-pic' })}
        <span class="offer-n" aria-hidden="true">${i + 1}/${offers.length}</span>
        <span class="offer-word"><span>${word}</span></span>
        <span class="offer-line">${line}${p ? ` <b>${price(p[0], p[1])}</b>` : ''} <i aria-hidden="true">→</i></span>
      </a>`).join('')}
    </nav>
    <a class="skip-reel" href="#wall">Skip intro</a>
    <button type="button" class="sound" aria-pressed="false">Hear the falls</button>
  </div>
</section>

<div class="river-page">
<section class="sec w-tana wall" id="wall">
  <div class="wrap">
    <h2 data-river="94,96.5"><span class="flourish">Pick your</span>way to get soaked</h2>
    <div class="adventure-wall" data-river="50,98">
      <a class="tile t1" href="/adventures/#rafting"><span class="tile-name">White water rafting</span>${photo('raft-team', { sizes: '(max-width:820px) 92vw, 62vw' })}<span class="flash">${price(5500, 55)}<small>6 km, min. 4 adults</small></span></a>
      <a class="tile t2" href="/adventures/#mini-raft"><span class="tile-name">Mini rafting</span>${photo('raft-yellow', { sizes: '(max-width:820px) 46vw, 32vw' })}<span class="flash">${price(1500, 15)}<small>1 hour, per person</small></span></a>
      <a class="tile t3" href="/adventures/#quad"><span class="tile-name">Quad biking</span>${photo('quad', { sizes: '(max-width:820px) 46vw, 32vw' })}</a>
      <a class="tile t4" href="/adventures/#kayak"><span class="tile-name">Kayaking</span>${photo('kayak', { sizes: '(max-width:820px) 46vw, 32vw' })}</a>
      <a class="tile t5" href="/adventures/#archery"><span class="tile-name">Archery</span>${photo('archery', { sizes: '(max-width:820px) 46vw, 32vw' })}<span class="flash">${price(1000, 10)}<small>1 hour</small></span></a>
    </div>
    <div class="actions" data-river="88,96.5"><a class="btn" href="/adventures/">All 13 activities and prices</a></div>
  </div>
</section>

<section class="fall" data-fall aria-label="Camping">
  <i class="r-pt" style="top:30svh" data-river="94,97"></i><i class="r-pt" style="bottom:30svh" data-river="94,97"></i>
  <div class="fall-stage">
    ${photo('tents-mist', { sizes: '100vw', cls: 'fall-pic' })}
    ${photo('tents-night', { sizes: '100vw', cls: 'fall-pic' })}
    ${photo('campfire', { sizes: '100vw', cls: 'fall-pic' })}
    <div class="fall-shade"></div>
    <div class="fall-copy">
      <h2><span class="flourish">Then sleep to the sound of</span>the falls</h2>
      <p class="fall-price">Own tent ${price(ownTent.res, ownTent.non)}</p>
      <a class="btn" href="/camping/">Camping at Havila</a>
    </div>
  </div>
</section>

<section class="pile" data-pile aria-label="Photos of Havila">
  <i class="r-pt" style="top:20svh" data-river="95,97"></i><i class="r-pt" style="bottom:20svh" data-river="95,97"></i>
  <div class="pile-stage">
    ${[['lodge', 'The lodge'], ['river', 'The Tana'], ['bridge', 'The bridge'], ['lodge-hills', 'The hills'], ['terrace', 'The terrace'], ['room-log', 'Log walls']].map(([n, cap]) => `<div class="pile-card">${photo(n, { sizes: '(max-width:820px) 88vw, 62vw' })}<span class="pile-cap">${cap}</span></div>`).join('')}
  </div>
</section>

<section class="sec w-lime strip-sec">
  <i class="r-pt" style="top:0" data-river="96,98"></i>
  <div class="wrap">
    <h2><span class="flourish">Or sleep in</span>a real bed</h2>
    <div class="actions"><a class="btn" href="/stay/">See the rooms</a><span class="from">From ${price(7000, 70)} a night</span></div>
  </div>
  <div class="strip" data-river="4,96.5" aria-label="Rooms at Havila">
    <div class="strip-track" data-dir="-1">${photo('room-cream', { sizes: '(max-width:820px) 70vw, 40vw' })}${photo('room-deck', { sizes: '(max-width:820px) 70vw, 40vw' })}${photo('room-modern', { sizes: '(max-width:820px) 70vw, 40vw' })}${photo('room-classic', { sizes: '(max-width:820px) 70vw, 40vw' })}${photo('room-glass', { sizes: '(max-width:820px) 70vw, 40vw' })}${photo('room-pillow', { sizes: '(max-width:820px) 70vw, 40vw' })}</div>
    <div class="strip-track" data-dir="1">${photo('room-log', { sizes: '(max-width:820px) 70vw, 40vw' })}${photo('room-canvas', { sizes: '(max-width:820px) 70vw, 40vw' })}${photo('room-bay', { sizes: '(max-width:820px) 70vw, 40vw' })}${photo('room-red', { sizes: '(max-width:820px) 70vw, 40vw' })}${photo('room-tuft', { sizes: '(max-width:820px) 70vw, 40vw' })}${photo('room-white', { sizes: '(max-width:820px) 70vw, 40vw' })}</div>
  </div>
</section>

<section class="band w-tana">
  <div class="band-wrap" data-river="96,98">
    ${photo('restaurant', { sizes: '92vw', cls: 'band-pic' })}
    <div class="band-copy"><h2><span class="flourish">Dinner’s up</span>on the hill</h2><a class="btn" href="/barizi/">Meet Barizi</a></div>
    ${photo('flatlay', { sizes: '(max-width:820px) 50vw, 30vw', cls: 'band-small' })}
  </div>
</section>

<section class="band w-lime">
  <div class="band-wrap flip" data-river="4,96.5">
    ${photo('wedding', { sizes: '92vw', cls: 'band-pic' })}
    <div class="band-copy"><h2><span class="flourish">Bring the whole</span>office. Or the wedding.</h2><a class="btn" href="/events/">Events at Havila</a></div>
    ${photo('wedding-flowers', { sizes: '(max-width:820px) 50vw, 30vw', cls: 'band-small' })}
  </div>
</section>

<section class="sec w-night close close-photo">
  <i class="r-pt" style="top:0" data-river="50,97"></i>
  ${photo('sunset-2', { sizes: '100vw', cls: 'close-pic' })}
  <div class="wrap">
    <h2><span class="flourish">So when are</span>you coming?</h2>
    <div class="actions">
      <a class="btn" href="/plan/">Plan your stay</a>
      <a class="btn btn-alt" href="tel:${contact.phone}">Call ${contact.phoneDisplay}</a>
    </div>
  </div>
</section>
</div>`,
});

const roomMosaic = [
  ['room-glass', 'r1', 'Wide windows on the hills'], ['room-log', 'r2', 'Log walls, hill view'],
  ['room-cream', 'r3', 'Bright and calm'], ['room-canvas', 'r4', 'Canvas walls and a lantern'], ['room-modern', 'r5', 'Modern and warm'],
];

const rateTable = (key) => {
  const r = rooms[key];
  const rows = Object.entries(meals).map(([m, label]) => `<tr><td>${label}</td><td class="num">${price(r.res[m][0], r.non[m][0])}</td><td class="num">${price(r.res[m][1], r.non[m][1])}</td></tr>`).join('');
  return `<table class="rate"><caption>${r.name}</caption><thead><tr><th scope="col">Per night</th><th scope="col">One guest</th><th scope="col">Two guests</th></tr></thead><tbody>${rows}</tbody></table>`;
};
const campTable = `<table class="rate"><caption>Camping</caption><thead><tr><th scope="col">Per night</th><th scope="col">One guest</th><th scope="col">Two guests</th></tr></thead><tbody>
  ${camping.map((c) => `<tr><td>${c.name}</td><td class="num">${price(c.res[0], c.non[0])}</td><td class="num">${price(c.res[1], c.non[1])}</td></tr>`).join('')}
  <tr><td>Bring your own tent, per person</td><td class="num" colspan="2">${price(ownTent.res, ownTent.non)}</td></tr></tbody></table>`;

const roomRows = [
  ['room-warm', 'Executive Room', 'More room to spread out after a day on the river.', [9000, 90], 'executive'],
  ['room-classic', 'Standard Room', 'Everything you need, and a view of the hills.', [7000, 70], 'standard'],
];

const stay = () => ({
  path: '/stay', title: 'Rooms at Havila Resort, Sagana', desc: 'Individually themed Standard and Executive rooms facing Kirengete Falls and the Gaturi Hills, with bed and breakfast, half board or full board.',
  body: `<section class="head w-tana"><div class="wrap head-grid">
    <div class="t"><h1><span class="flourish">Come in.</span>Take your boots off.</h1><p class="lead">No two rooms alike, and every window looks to the falls or the Gaturi Hills.</p>
    <div class="actions"><a class="btn" href="/plan/?stay=standard">Plan a stay</a>${resToggle}</div></div>
    <div class="m">${photo('room-deck', { sizes: '(max-width:820px) 92vw, 40vw', eager: true })}</div>
  </div></section>
  <section class="sec w-lime"><div class="wrap">
    ${roomRows.map(([ph, name, text, p, id]) => `<article class="act-feature">
      <div class="m">${photo(ph, { sizes: '(max-width:820px) 92vw, 58vw' })}<span class="flash">From ${price(p[0], p[1])}<small>a night with breakfast</small></span></div>
      <div class="t"><h2 style="font-size:clamp(2.4rem,1.2rem + 4vw,5rem)">${name}</h2><p>${text}</p><a class="btn btn-small" href="/plan/?stay=${id}">Plan this room</a></div>
    </article>`).join('')}
    <h2><span class="flourish">Have a</span>look inside</h2>
    <div class="rooms">${roomMosaic.map(([n, c, cap]) => `<button type="button" class="${c}" data-lb aria-label="View larger: ${cap}">${photo(n, { sizes: '(max-width:640px) 92vw, 50vw' })}<span class="rm-cap">${cap}</span></button>`).join('')}</div>
    <dialog class="lb" id="lb" aria-label="Larger room photo"><img alt=""><p></p><form method="dialog"><button class="btn btn-small">Close</button></form></dialog>
  </div></section>
  <section class="sec w-tana"><div class="wrap">
    <h2><span class="flourish">What a night</span>costs</h2>
    <div class="boards"><div class="board">${rateTable('standard')}</div><div class="board">${rateTable('executive')}</div></div>
    <p class="board-note" style="margin-top:2em">Check in from 3:00 pm. Check out by 10:00 am. Free Wi-Fi, free parking and a 24-hour front desk.</p>
  </div></section>`,
});

const featured = [
  ['raft-team', 'rafting', 'wet', 'White water rafting', 'Six kilometres of the Tana. Hits hardest in the rains.'],
  ['raft-yellow', 'mini-raft', 'wet', 'Mini rafting', 'One hour. Find out who screams in your family.'],
  ['quad', 'quad', 'wheels', 'Quad biking', 'Four wheels, red earth, no staying clean.'],
  ['kayak', 'kayak', 'wet', 'Kayaking', 'One paddle. A river with opinions.'],
  ['archery', 'archery', 'land', 'Archery', 'One hour. Friendly until the last round.'],
];

const adventures = () => ({
  path: '/adventures', title: 'Rafting, quad biking and more | Havila Resort, Sagana', desc: 'White water rafting, mini rafting, kayaking, quad biking, archery, hiking, boat rides and more on the River Tana, with current prices.',
  body: `<section class="head w-sky"><div class="wrap head-grid">
    <div class="t"><h1><span class="flourish">Come home</span>dirty</h1><p class="lead">River, mud, dust and a target with your name on it. Do one, or do the whole lot before lunch.</p>
    <div class="actions">${resToggle}</div></div>
    <div class="m">${photo('river', { sizes: '(max-width:820px) 92vw, 50vw', eager: true })}</div>
  </div></section>
  <section class="sec w-lime">${edge('#FFF8E1')}<div class="wrap">
    ${featured.map(([ph, id, g, name, text]) => {
      const a = act(id);
      return `<article class="act-feature" id="${id}" >
        <div class="m">${photo(ph, { sizes: '(max-width:820px) 92vw, 58vw' })}<span class="flash">${price(a.res, a.non)}${a.unit ? `<small>${a.unit}</small>` : ''}</span></div>
        <div class="t"><h2 style="font-size:clamp(2rem,1.2rem + 3vw,3.6rem)">${name}</h2><p>${text}</p>${a.minNote ? `<p class="small"><strong>${a.minNote}.</strong></p>` : ''}<a class="btn btn-small" data-add="${id}" href="/plan/?activity=${id}">Add to my plan</a></div>
      </article>`;
    }).join('')}
  </div></section>
  <section class="sec w-marigold" id="all">${edge('#FFB703')}<div class="wrap">
    <h2><span class="flourish">The whole</span>price board</h2>
    <div class="filters" role="group" aria-label="Filter activities">
      ${[['all', 'Everything'], ['wet', 'On the water'], ['wheels', 'On wheels'], ['land', 'On foot'], ['slow', 'Slow down']].map(([f, l], i) => `<button type="button" class="chip" data-filter="${f}" aria-pressed="${i === 0}">${l}</button>`).join('')}
      <span id="filter-count" role="status" style="align-self:center;font-weight:800">${activities.length} activities</span>
    </div>
    <div class="act-list">
      ${activities.map((a) => `<div class="act-item" data-group="${a.group}"><div><h3>${a.name}</h3><p>${a.detail}${a.minNote ? `. ${a.minNote}` : ''}</p></div><div class="act-price">${price(a.res, a.non)}${a.unit ? `<small>${a.unit}</small>` : ''}</div></div>`).join('')}
    </div>
    <div class="actions"><a class="btn" href="/plan/">Build my day</a></div>
  </div></section>`,
});

const campingPage = () => ({
  path: '/camping', title: 'Camping on the River Tana | Havila Resort, Sagana', desc: 'Camp by the river at Havila Resort: bring your own tent or use ours, with breakfast or full board. Fires, stars, falls and a rapid for breakfast.',
  bodyClass: '',
  body: `<section class="head w-night"><div class="wrap head-grid">
    <div class="t"><h1><span class="flourish">Leave the</span>walls behind</h1><p class="lead">A fire. A tent. A waterfall doing the talking. Then coffee, and a river to fall into.</p><div class="actions"><a class="btn" href="/plan/?stay=camp-only">Plan a camp</a>${resToggle}</div></div>
    <div class="m">${photo('tents-mist', { sizes: '(max-width:820px) 92vw, 40vw', cls: '', eager: true })}</div>
  </div></section>
  <section class="sec w-tana">${edge('#07564A')}<div class="wrap boards">
    <div class="board">${campTable}<p class="board-note">Up for a bigger camp? School groups, clubs and offices get in touch and we’ll work it out with you.</p></div>
    <div>
      <h2 style="font-size:clamp(2rem,1.2rem + 3vw,3.6rem)"><span class="flourish">How a camp</span>weekend goes</h2>
      <ol class="steps-list">
        <li><span><strong>Friday.</strong> Up the A2, tents up, fire going.</span></li>
        <li><span><strong>Saturday.</strong> Raft, ride, shoot.</span></li>
        <li><span><strong>Saturday night.</strong> Buffet at Barizi, back to the fire.</span></li>
        <li><span><strong>Sunday.</strong> The bridge, the falls, home.</span></li>
      </ol>
    </div>
  </div></section>
  <section class="sec w-tomato">${edge('#F2502F')}<div class="wrap split flip">
    <div class="t"><h2><span class="flourish">What to</span>pack</h2>
    <ul class="bullets lead"><li>Your tent, if you’re bringing one</li><li>Closed shoes that can get wet</li><li>A warm layer for the night</li><li>A torch, sun cream and bug spray</li><li>Clothes you don’t love</li></ul>
    <p class="small">Sorry, no pets. The camping area has rough ground, so talk to us first if anyone in your group has limited mobility.</p></div>
    <div class="m" style="padding-right:18px">${photo('tent-view', { sizes: '(max-width:820px) 90vw, 46vw', cls: '' })}</div>
  </div></section>`,
});

const barizi = () => ({
  path: '/barizi', title: 'Barizi Restaurant on the hill | Havila Resort, Sagana', desc: 'Barizi Restaurant sits on a hill at Havila Resort, facing Mt. Kenya, the Aberdares and the Gaturi Hills. Local and international food, some from the garden.',
  body: `<section class="head w-tana calm"><div class="wrap head-grid">
    <div class="t"><h1><span class="flourish">Barizi.</span>Pull up a chair.</h1><p class="lead">The hill has the best seats in Sagana: Mt. Kenya, the Aberdares, the Gaturi Hills and a plate of something hot.</p></div>
    <div class="m">${photo('plate', { sizes: '(max-width:820px) 92vw, 40vw', eager: true })}</div>
  </div></section>
  <section class="sec w-lime calm">${edge('#FFF8E1')}<div class="wrap split">
    <div class="t"><h2><span class="flourish">Straight from</span>the garden</h2><p class="lead">Local and international, some of it picked from the garden that day.</p></div>
    <div class="m" style="padding-right:18px">${photo('flatlay', { sizes: '(max-width:820px) 90vw, 50vw' })}</div>
  </div></section>
  <section class="sec w-marigold calm">${edge('#FFB703')}<div class="wrap split flip">
    <div class="t"><h2><span class="flourish">Not staying?</span>Come anyway.</h2><p class="lead">Stopping on the A2 for a meal? Come up the hill. Bringing a group? Tell us ahead of time so the kitchen’s ready.</p><div class="actions"><a class="btn" href="${waFree('Hello Barizi, I would like to book a table.')}" rel="noopener">Book a table on WhatsApp</a></div></div>
    <div class="m" style="padding-right:18px">${photo('grill', { sizes: '(max-width:820px) 90vw, 50vw' })}</div>
  </div></section>`,
});

const events = () => ({
  path: '/events', title: 'Team building, conferences and weddings | Havila Resort, Sagana', desc: 'Team building, conferences, weddings and sports events on the River Tana. Event grounds, conference space, facilitators and a group budget estimator.',
  body: `<section class="head w-leaf"><div class="wrap head-grid">
    <div class="t"><h1><span class="flourish">Big group?</span>Good.</h1><p class="lead">Offices, weddings, sports days and reunions. We have the grounds, the river and a kitchen that doesn’t panic.</p></div>
    <div class="m">${photo('wedding-blue', { sizes: '(max-width:820px) 92vw, 40vw', eager: true })}</div>
  </div></section>
  <section class="sec w-marigold">${edge('#FFB703')}<div class="wrap">
    <h2><span class="flourish">Team building</span>your team will actually attend</h2>
    <div class="boards">
      <div><p class="lead">Conference in the morning. River in the afternoon. Groups of 20 or more.</p></div>
      <form class="board" id="budget" aria-label="Team-building budget estimator">
        <h3>Your group’s budget</h3>
        <div class="field"><label for="b-people">How many people?</label><input id="b-people" type="number" min="20" max="500" step="1" value="30" inputmode="numeric"><p class="err" id="b-err" hidden></p></div>
        <div class="picks" style="margin-top:14px">
          <label class="pick"><input type="checkbox" data-c="600" checked><span class="box">Facilitator<em>KES 600 each</em></span></label>
          <label class="pick"><input type="checkbox" data-c="1500" checked><span class="box">Mini rafting<em>KES 1,500 each</em></span></label>
          <label class="pick"><input type="checkbox" data-c="5500"><span class="box">6 km rafting<em>KES 5,500 each</em></span></label>
          <label class="pick"><input type="checkbox" data-c="1000"><span class="box">Archery<em>KES 1,000 each</em></span></label>
          <label class="pick"><input type="checkbox" data-c="1000"><span class="box">Hiking<em>KES 1,000 each</em></span></label>
        </div>
        <div class="sum-total" aria-live="polite"><span>Activities</span><span id="b-total">KES 63,000</span></div>
        <p class="board-note">Resident rates, activities only. Tell us your dates and we’ll quote meals, rooms and the conference space.</p>
        <a class="btn" id="b-send" href="#" rel="noopener" style="display:block;margin-top:1em">Ask Havila for a full quote</a>
        <div class="budget-tools"><button type="button" class="btn btn-small btn-lime" id="b-share">Share with my boss</button><button type="button" class="btn btn-small btn-lime" id="b-print">Print this budget</button></div>
        <p class="board-note" id="b-status" role="status"></p>
      </form>
    </div>
  </div></section>
  <section class="sec w-lime calm">${edge('#FFF8E1')}<div class="wrap split flip">
    <div class="t"><h2><span class="flourish">Say</span>“I do” by the river</h2><p class="lead">Event grounds under the trees, photos on the bridge and at the falls, and rooms for the family up the hill.</p><p>We’ll even do the rose petals.</p><div class="actions"><a class="btn" href="${waFree('Hello Havila Resort, I am planning a wedding and would like to talk about dates and packages.')}" rel="noopener">Talk weddings on WhatsApp</a></div></div>
    <div class="m stack-pics" style="padding-right:18px">${photo('wedding', { sizes: '(max-width:820px) 90vw, 50vw' })}${photo('room-petals', { sizes: '(max-width:820px) 45vw, 24vw', cls: 'over' })}</div>
  </div></section>
  <section class="sec w-tana">${edge('#07564A')}<div class="wrap split">
    <div class="t"><h2><span class="flourish">Getting a</span>conference approved?</h2></div>
    <div class="m"><p class="lead">Send us your headcount, dates and room setup. We’ll send back a written quote you can hand straight to your finance team.</p><div class="actions"><a class="btn btn-alt" href="mailto:${contact.email}?subject=Conference%20quote%20request">Email for a quote</a></div></div>
  </div></section>
  <script>
  (function(){var f=document.getElementById('budget'),p=document.getElementById('b-people'),t=document.getElementById('b-total'),s=document.getElementById('b-send'),e=document.getElementById('b-err'),st=document.getElementById('b-status'),text='';
  function u(){var v=p.value===''?0:Number(p.value),ok=Number.isInteger(v)&&v>=20&&v<=500;e.hidden=ok;e.textContent=ok?'':'Enter a whole number from 20 to 500. For smaller groups, use the stay planner.';
  var n=ok?v:0,c=0,names=[];f.querySelectorAll('input[data-c]:checked').forEach(function(b){c+=+b.dataset.c;names.push(b.closest('label').querySelector('.box').firstChild.textContent)});
  var total=(c*n).toLocaleString('en-KE');t.textContent=ok?'KES '+total:'KES –';
  text='Team building at Havila Resort, Sagana, for '+n+' people. Activities: '+(names.join(', ')||'to be decided')+'. Estimate for activities only, resident rates: KES '+total+'. Meals, rooms and conference space are quoted separately.';
  s.href='https://wa.me/${contact.whatsapp}?text='+encodeURIComponent('Hello Havila Resort. '+text+' Please share available dates and a full quote.')}
  f.addEventListener('input',u);f.addEventListener('submit',function(e){e.preventDefault()});
  document.getElementById('b-share').addEventListener('click',function(){var d=text+' '+location.href;
    if(navigator.share){navigator.share({title:'Havila team-building budget',text:text,url:location.href}).catch(function(){});return}
    (navigator.clipboard?navigator.clipboard.writeText(d):Promise.reject()).then(function(){st.textContent='Copied. Paste it into your email or chat.'},function(){st.textContent='Copying isn’t available here. Use Print instead.'})});
  document.getElementById('b-print').addEventListener('click',function(){document.body.classList.add('print-budget');print();document.body.classList.remove('print-budget')});
  u()})();
  </script>`,
});

const rates = () => ({
  path: '/rates', title: 'Rates 2026 | Havila Resort, Sagana', desc: 'Every 2026 price at Havila Resort: rooms, camping and activities, for residents and non-residents.',
  body: `<section class="head w-tana"><div class="wrap">
    <h1><span class="flourish">Our prices,</span>on one board</h1><p class="lead">Rooms, camping and activities. A few activities are priced on the day, so those say “Ask us”.</p><div class="actions">${resToggle}</div>
  </div></section>
  <section class="sec w-marigold">${edge("#FFB703")}<div class="wrap boards boards-wide">
    <div class="board">${rateTable('standard')}</div><div class="board">${rateTable('executive')}</div><div class="board">${campTable}</div>
    <div class="board"><h2 class="as-h3">Activities</h2>${activities.map((a) => `<div class="board-row"><span>${a.name}${a.minNote ? `<small>${a.minNote}</small>` : ''}</span><span class="dots"></span><span class="amt">${price(a.res, a.non)}</span></div>`).join('')}</div>
  </div><div class="wrap"><p style="margin-top:2.4em;font-weight:600">2026 rates. Your final price is confirmed when you book.</p><div class="actions"><a class="btn" href="/plan/">Plan your stay</a></div></div></section>`,
});

const faqs = [
  ['How far is Havila from Nairobi?', 'Around two hours by road, depending on Thika Road traffic. We’re right off the A2 at Sagana.'],
  ['What time can we check in?', 'Check-in is from 3:00 pm and check-out is by 10:00 am. If you’ll arrive after 5:00 pm, let us know in advance.'],
  ['When is the best time to raft?', 'The river is usually highest in the rains, from March to May and October to December. Water levels change, so check with us before you travel.'],
  ['Do I need experience to raft?', 'Tell us who’s coming and we’ll advise. Mini rafting is the gentler way to start.'],
  ['Can we bring pets?', 'Sorry, pets aren’t allowed at Havila.'],
  ['Is Havila accessible for guests with limited mobility?', 'Parts of it aren’t. Guests report that the waterfall, the swaying bridge and the camping area are hard to reach. Call us before you travel and we’ll work out what suits your group.'],
  ['How can I pay?', 'Visa, Mastercard and cash are accepted. Ask the front desk about M-Pesa.'],
];

const visit = () => ({
  path: '/visit', title: 'Directions and contact | Havila Resort, Sagana', desc: 'Find Havila Resort right off the A2 at Sagana, about two hours from Nairobi. Directions, contact details, policies and answers.',
  body: `<section class="head w-sky"><div class="wrap head-grid">
    <div class="t"><h1><span class="flourish">Up the A2.</span>Look for the falls.</h1><p class="lead">${contact.address}.</p><div class="actions"><a class="btn" href="${contact.maps}" rel="noopener">Open in Google Maps</a></div></div>
    <div class="m">${photo('lodge', { sizes: '(max-width:820px) 92vw, 40vw', cls: '', eager: true, alt: 'The Havila Resort lodge and sign, which you will see as you arrive' })}</div>
  </div></section>
  <section class="sec w-lime">${edge('#FFF8E1')}<div class="wrap split">
    <div class="t"><h2><span class="flourish">Talk to</span>a human</h2>
    <ul class="lead"><li><a href="tel:${contact.phone}">${contact.phoneDisplay}</a></li><li><a href="${waFree('Hello Havila Resort, I have a question.')}" rel="noopener">WhatsApp us</a></li><li><a href="mailto:${contact.email}">${contact.email}</a></li></ul>
    <p style="margin-top:1em">The front desk is open 24 hours.</p></div>
    <div class="m" style="padding-right:12px">${routeMap}</div>
  </div></section>
  <section class="sec w-leaf">${edge('#2FB457')}<div class="wrap">
    <h2><span class="flourish">Things people</span>ask us</h2>
    ${faqs.map(([q, a]) => `<details class="qa"><summary>${q}</summary><p>${a}</p></details>`).join('')}
  </div></section>`,
});

const plan = () => ({
  path: '/plan', title: 'Plan your stay | Havila Resort, Sagana', desc: 'Choose your dates, stay and activities, see an instant estimate and send it to Havila Resort on WhatsApp or email.',
  bodyClass: 'page-plan',
  scripts: '<script src="/js/data.js" defer></script><script src="/js/plan.js" defer></script>',
  body: `<section class="head w-marigold" style="padding-bottom:clamp(40px,5vw,70px)"><div class="wrap">
    <h1><span class="flourish">Build</span>your Havila</h1>
    <p class="lead">Tick what you want and watch the estimate update. Send it to the front desk in one tap, and they’ll confirm dates and the final price.</p>
  </div></section>
  <section class="sec w-lime" style="padding-top:clamp(50px,6vw,80px)">${edge('#FFF8E1')}<div class="wrap">
    <form id="plan" class="planner" novalidate>
      <div>
        <div class="rate-row">${resToggle}</div>
        <fieldset class="step sentence"><legend class="sr">Your dates, group and stay</legend>
          <div class="field num"><span class="w">We’re</span><input id="adults" type="number" min="1" max="500" step="1" value="2" inputmode="numeric"><label for="adults">adults</label><p class="err" hidden></p></div>
          <div class="field num"><span class="w">and</span><input id="kids" type="number" min="0" max="200" step="1" value="0" inputmode="numeric"><label for="kids">children,</label><p class="err" hidden></p></div>
          <div class="field"><label for="arrive">arriving</label><input id="arrive" type="date" required><p class="err" hidden></p></div>
          <div class="field" id="leave-field"><label for="leave">and leaving</label><input id="leave" type="date"><p class="err" hidden></p></div>
          <div class="field"><label for="stay">We’ll stay in</label><select id="stay">
              <option value="standard">Standard room</option><option value="executive">Executive room</option>
              <option value="camp-only">Camping, tent provided</option><option value="camp-bb">Camping with breakfast</option><option value="camp-fb">Camping full board</option>
              <option value="own-tent">Our own tent</option><option value="day">Just a day visit</option></select></div>
          <div class="field" id="meal-field"><label for="meal">with</label><select id="meal"><option value="bb">breakfast only</option><option value="hb">breakfast + one meal</option><option value="fb">all meals</option></select></div>
        </fieldset>
        <fieldset class="step"><legend>And we want to…</legend><div class="picks" id="activity-picks"></div></fieldset>
        <fieldset class="step sentence"><legend class="sr">Your details</legend>
          <div class="field"><label for="name">I’m</label><input id="name" autocomplete="name" maxlength="80" placeholder="your name"><p class="err" hidden></p></div>
          <div class="field"><label for="phone">reach me on</label><input id="phone" type="tel" autocomplete="tel" inputmode="tel" maxlength="24" placeholder="phone (optional)"></div>
          <div class="field notes"><label for="notes" class="sr">Anything else? (optional)</label><textarea id="notes" rows="2" maxlength="500" placeholder="Birthdays, dietary needs, a late arrival…"></textarea></div>
        </fieldset>
      </div>
      <aside class="summary board" id="summary">
        <h2>Your plan</h2>
        <div id="sum-lines" aria-live="polite"></div>
        <div class="sum-total"><span id="sum-total-label">Estimate</span><span id="sum-total"></span></div>
        <div id="sum-warn"></div>
        <div class="send">
          <button type="button" class="btn" id="send-wa">Send on WhatsApp</button>
          <button type="button" class="btn btn-alt" id="send-mail">Send by email</button>
        </div>
        <p class="form-error" id="form-error" role="alert" hidden></p>
        <p class="form-sent" id="form-sent" role="status" hidden></p>
        <button type="button" class="link-btn" id="plan-reset">Clear this plan</button>
        <p class="board-note">Nothing is booked or charged yet. The front desk replies with availability and the final price.</p>
      </aside>
    </form>
    <a class="plan-bar" href="#summary"><span id="bar-label">Estimate</span><strong id="bar-total"></strong><span class="plan-bar-go">Review</span></a>
  </div></section>`,
});

const credits = () => ({
  path: '/credits', title: 'Photo credits | Havila Resort', desc: 'Credits and licences for the sample photos used on this site.',
  body: `<section class="head w-lime"><div class="wrap"><h1 style="font-size:clamp(2.6rem,1.4rem + 5vw,5rem)">Photo credits</h1><p class="lead">Photos tagged “Sample photo” are stand-ins from other places. They’ll be replaced with Havila’s own.</p>
  <div class="scroll-x"><table class="credit-table"><thead><tr><th>Photo</th><th>By</th><th>Licence</th></tr></thead><tbody>
  ${Object.values(photos).filter((p) => p.sample).map((p) => `<tr><td><a href="${p.credit[2]}" rel="noopener">${p.alt}</a></td><td>${p.credit[0]}</td><td>${p.credit[1]}</td></tr>`).join('')}
  </tbody></table></div></div></section>`,
});

const notFound = () => ({
  path: '/404', title: 'Lost on the river | Havila Resort', desc: 'This page has floated away.',
  body: `<section class="head w-sky close" style="min-height:70vh"><div class="wrap"><h1><span class="flourish">Oops, you’ve</span>drifted off</h1><p class="lead">This page has gone over the falls. Let’s get you back to shore.</p><div class="actions"><a class="btn" href="/">Back to the home page</a><a class="btn btn-alt" href="/plan/">Plan your stay</a></div></div></section>`,
});

export const pages = () => [home(), stay(), adventures(), campingPage(), barizi(), events(), rates(), visit(), plan(), credits(), notFound()];
