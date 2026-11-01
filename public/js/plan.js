// Stay planner: builds a live estimate and a ready-to-send enquiry. No backend needed.
const D = window.HAVILA;
const form = document.getElementById('plan');
const $ = (id) => document.getElementById(id);
const fmt = (n, mode) => (mode === 'res' ? `KES ${n.toLocaleString('en-KE')}` : `US$${n.toLocaleString('en-KE')}`);
const params = new URLSearchParams(location.search);
const MAX_ADULTS = 500;
const MAX_KIDS = 200;

const pad = (n) => String(n).padStart(2, '0');
const now = new Date();
const today = `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())}`;
$('arrive').min = today;
$('leave').min = today;

// Build the activity list and stay options from the rate data
const PICS = { rafting: 'raft-team', 'mini-raft': 'raft-yellow', kayak: 'kayak', boat: 'river', fishing: 'river', quad: 'quad', cycling: 'bridge', archery: 'archery', hiking: 'sunset', nature: 'river', yoga: 'sunset-2', pottery: 'lodge', facilitator: 'dining-hall' };
$('activity-picks').innerHTML = D.activities.map((a) => `
  <label class="pick"><input type="checkbox" name="activity" value="${a.id}"><span class="box"><img src="/img/${PICS[a.id]}-640.webp" alt="" loading="lazy" decoding="async"><span class="pick-name">${a.name}</span><em data-act-price="${a.id}"></em></span></label>`).join('');

// Plus and minus around the guest counts
document.querySelectorAll('.field.num input').forEach((input) => {
  const make = (txt, delta, label) => {
    const b = document.createElement('button');
    b.type = 'button'; b.className = 'step-btn'; b.textContent = txt; b.setAttribute('aria-label', label);
    b.addEventListener('click', () => {
      const min = Number(input.min), max = Number(input.max);
      input.value = Math.min(max, Math.max(min, Math.round(Number(input.value) || 0) + delta));
      input.dispatchEvent(new Event('input', { bubbles: true }));
    });
    return b;
  };
  const noun = input.id === 'adults' ? 'adult' : 'child';
  input.before(make('−', -1, `One fewer ${noun}`));
  input.after(make('+', 1, `One more ${noun}`));
});

const saved = window.havilaDraft.read();
const FIELDS = ['arrive', 'leave', 'adults', 'kids', 'stay', 'meal', 'name', 'phone', 'notes'];
FIELDS.forEach((id) => { if (saved[id] != null && saved[id] !== '') $(id).value = saved[id]; });
// A saved option that no longer exists leaves a select empty, so fall back to the first choice.
['stay', 'meal'].forEach((id) => { if (!$(id).value) $(id).selectedIndex = 0; });
(saved.activities || []).forEach((id) => {
  const box = form.querySelector(`input[value="${CSS.escape(id)}"]`);
  if (box) box.checked = true;
});
const preset = params.get('activity');
if (preset) { const box = form.querySelector(`input[value="${CSS.escape(preset)}"]`); if (box) box.checked = true; }
const presetStay = params.get('stay');
if (presetStay && $('stay').querySelector(`option[value="${CSS.escape(presetStay)}"]`)) $('stay').value = presetStay;

const saveDraft = () => {
  const d = {};
  FIELDS.forEach((id) => { d[id] = $(id).value; });
  d.activities = [...form.querySelectorAll('input[name=activity]:checked')].map((b) => b.value);
  window.havilaDraft.write(d);
  window.havilaCount();
};

const count = (id, min, max) => {
  const raw = $(id).value.trim();
  if (raw === '') return min === 0 ? 0 : null;
  const n = Number(raw);
  return Number.isInteger(n) && n >= min && n <= max ? n : null;
};

const nightsBetween = () => {
  if (!$('arrive').value || !$('leave').value) return null;
  const n = Math.round((new Date($('leave').value) - new Date($('arrive').value)) / 864e5);
  return n > 0 ? n : null;
};

// Problems shown as the guest types, not only on send
function problems() {
  const out = {};
  const isDay = $('stay').value === 'day';
  if ($('arrive').value && $('arrive').value < today) out.arrive = 'That date has passed. Choose today or later.';
  if (!isDay && $('leave').value && $('arrive').value && !nightsBetween()) out.leave = 'Choose a departure day after your arrival day.';
  if (count('adults', 1, MAX_ADULTS) === null) out.adults = `Enter a whole number from 1 to ${MAX_ADULTS}.`;
  if (count('kids', 0, MAX_KIDS) === null) out.kids = `Enter a whole number from 0 to ${MAX_KIDS}.`;
  return out;
}

const mark = (id, msg) => {
  const field = $(id).closest('.field');
  const err = field.querySelector('.err');
  field.classList.toggle('bad', !!msg);
  err.id = `${id}-err`;
  err.textContent = msg || '';
  err.hidden = !msg;
  if (msg) $(id).setAttribute('aria-describedby', err.id); else $(id).removeAttribute('aria-describedby');
  $(id).setAttribute('aria-invalid', !!msg);
};

function estimate() {
  const mode = window.havilaRes();
  const adults = count('adults', 1, MAX_ADULTS);
  const kids = count('kids', 0, MAX_KIDS);
  const stay = $('stay').value;
  const meal = $('meal').value;
  const isDay = stay === 'day';
  const isRoom = stay === 'standard' || stay === 'executive';
  const nights = nightsBetween();
  const issues = problems();

  $('meal-field').hidden = !isRoom;
  $('leave-field').hidden = isDay;
  ['arrive', 'leave', 'adults', 'kids'].forEach((id) => mark(id, issues[id]));

  document.querySelectorAll('[data-act-price]').forEach((el) => {
    const a = D.activities.find((x) => x.id === el.dataset.actPrice);
    el.textContent = a[mode] == null ? 'Ask us' : fmt(a[mode], mode);
  });

  const lines = [];
  const warns = [];
  let total = 0;
  let unknown = false;
  const valid = adults !== null && kids !== null;
  const guests = valid ? adults + kids : 0;
  const n = nights || 1;
  const nightWords = nights ? `${n} night${n > 1 ? 's' : ''}` : 'per night';

  if (!valid) {
    lines.push(['Check the number of guests', '–']);
  } else if (isRoom) {
    const prices = D.rooms[stay][mode][meal];
    const roomsNeeded = Math.ceil(adults / 2);
    let cost = 0;
    let left = adults;
    for (let i = 0; i < roomsNeeded; i++) { cost += left >= 2 ? prices[1] : prices[0]; left -= 2; }
    cost *= n;
    lines.push([`${D.rooms[stay].name}, ${D.meals[meal]}: ${roomsNeeded} room${roomsNeeded > 1 ? 's' : ''}, ${nightWords}`, fmt(cost, mode)]);
    total += cost;
    if (kids) { unknown = true; warns.push('Children’s room and meal rates are confirmed by the front desk, so they aren’t in this estimate.'); }
  } else if (stay === 'own-tent') {
    const cost = D.ownTent[mode] * guests * n;
    lines.push([`Own tent: ${guests} ${guests === 1 ? 'guest' : 'guests'}, ${nightWords}`, fmt(cost, mode)]);
    total += cost;
  } else if (!isDay) {
    const c = D.camping.find((x) => x.id === stay);
    const cost = (Math.floor(guests / 2) * c[mode][1] + (guests % 2) * c[mode][0]) * n;
    lines.push([`${c.name}: ${guests} ${guests === 1 ? 'guest' : 'guests'}, ${nightWords}`, fmt(cost, mode)]);
    total += cost;
  } else {
    lines.push(['Day visit', 'No stay']);
  }

  const picked = [...form.querySelectorAll('input[name=activity]:checked')];
  if (valid) {
    picked.forEach((box) => {
      const a = D.activities.find((x) => x.id === box.value);
      if (a[mode] == null) {
        lines.push([a.name, 'Price on request']);
        unknown = true;
        return;
      }
      if (a.id === 'mini-raft' && guests < 4) {
        if (mode === 'res') {
          lines.push(['Mini rafting: small group', fmt(5000, mode)]);
          total += 5000;
        } else {
          lines.push(['Mini rafting: small group', 'Price on request']);
          unknown = true;
        }
        return;
      }
      const cost = a[mode] * guests;
      lines.push([`${a.name}: ${guests} × ${fmt(a[mode], mode)}`, fmt(cost, mode)]);
      total += cost;
      if (a.min && guests < a.min) warns.push(`${a.name}: ${a.minNote.toLowerCase()}. Ask us whether your group can join another.`);
    });
    if (kids && picked.length) warns.push('Activities are shown at the full price for every guest. Ask us about age limits and children’s rates.');
    if (adults > 30) warns.push('For a group this size, the front desk will quote you directly, and a group rate may apply.');
  }

  const needsDates = valid && !isDay && !nights;
  const label = needsDates ? 'Per night' : unknown ? 'Estimate so far' : 'Estimate';
  $('sum-lines').innerHTML = '';
  lines.forEach(([l, v]) => {
    const row = document.createElement('div');
    row.className = 'sum-line';
    const a = document.createElement('span');
    const b = document.createElement('span');
    a.textContent = l;
    b.textContent = v;
    row.append(a, b);
    $('sum-lines').append(row);
  });
  const shown = valid && !issues.arrive ? fmt(total, mode) : '–';
  $('sum-total').textContent = shown;
  $('sum-total-label').textContent = label;
  $('bar-total').textContent = shown;
  $('bar-label').textContent = label;
  if (needsDates) warns.unshift('Pick your dates to see the total for your whole stay.');
  $('sum-warn').innerHTML = '';
  warns.forEach((w) => {
    const p = document.createElement('p');
    p.className = 'sum-warn';
    p.textContent = w;
    $('sum-warn').append(p);
  });
  return { lines, total, mode, unknown, adults, kids, nights };
}

function validate() {
  const issues = problems();
  if (!$('arrive').value) issues.arrive = 'Choose the day you’re arriving.';
  if ($('stay').value !== 'day' && !nightsBetween()) issues.leave = 'Choose a departure day after your arrival day.';
  if (!$('name').value.trim()) issues.name = 'Tell us your name so we know who to reply to.';
  ['arrive', 'leave', 'adults', 'kids', 'name'].forEach((id) => mark(id, issues[id]));
  const first = ['arrive', 'leave', 'adults', 'kids', 'name'].find((id) => issues[id]);
  if (first) $(first).focus();
  return !first;
}

function message() {
  const e = estimate();
  const out = ['Hello Havila Resort, I would like to plan a visit.', ''];
  out.push(`Name: ${$('name').value.trim()}`);
  if ($('phone').value.trim()) out.push(`Phone: ${$('phone').value.trim()}`);
  out.push(`Guests: ${e.adults} adult${e.adults === 1 ? '' : 's'}${e.kids ? `, ${e.kids} child${e.kids === 1 ? '' : 'ren'}` : ''}`);
  out.push(`Rate type: ${e.mode === 'res' ? 'Resident' : 'Non-resident'}`);
  out.push(`Arriving: ${$('arrive').value}`);
  if ($('stay').value !== 'day') out.push(`Leaving: ${$('leave').value}`);
  out.push('', 'My plan:');
  e.lines.forEach(([l, v]) => out.push(`- ${l} (${v})`));
  out.push('', `${e.unknown ? 'Estimate so far' : 'Estimate'}: ${fmt(e.total, e.mode)}`);
  if ($('notes').value.trim()) out.push('', `Notes: ${$('notes').value.trim()}`);
  out.push('', 'Please confirm availability and the final price.');
  return out.join('\n');
}

const update = () => { if ($('name').value.trim()) mark('name', ''); estimate(); saveDraft(); };
form.addEventListener('input', update);
form.addEventListener('change', update);
document.addEventListener('havila-res', estimate);
$('arrive').addEventListener('change', () => { $('leave').min = $('arrive').value || today; });
form.addEventListener('submit', (e) => e.preventDefault());

const send = (url, channel) => {
  $('form-sent').hidden = true;
  if (!validate()) {
    $('form-error').textContent = 'A couple of details need attention. They’re marked above.';
    $('form-error').hidden = false;
    return;
  }
  $('form-error').hidden = true;
  $('form-sent').textContent = `Your message is ready in ${channel}. Press send there to reach the front desk. If nothing opened, call us instead.`;
  $('form-sent').hidden = false;
  location.href = url();
};
$('send-wa').addEventListener('click', () => send(() => `https://wa.me/${D.contact.whatsapp}?text=${encodeURIComponent(message())}`, 'WhatsApp'));
$('send-mail').addEventListener('click', () => send(() => `mailto:${D.contact.email}?subject=${encodeURIComponent(`Stay enquiry: ${$('name').value.trim()}, ${$('arrive').value}`)}&body=${encodeURIComponent(message())}`, 'your email app'));
$('plan-reset').addEventListener('click', () => {
  window.havilaDraft.write({});
  window.havilaCount();
  form.reset();
  $('leave').min = today;
  $('form-error').hidden = true;
  $('form-sent').hidden = true;
  estimate();
  $('arrive').focus();
});
saveDraft();
estimate();
