// Single source of truth for every fact on the site. Change a value here and rebuild.
export const contact = {
  phoneDisplay: '+254 709 255 006',
  phone: '+254709255006',
  whatsapp: '254709255006',
  email: 'havilaresort@gmail.com',
  address: 'Right off A2 Road, Rukanga, Riandira, Sagana, Kirinyaga County',
  maps: 'https://www.google.com/maps/search/?api=1&query=Havila+Resort+Sagana+Kenya',
  facebook: 'https://www.facebook.com/HavilaResort/',
  reviews: 'https://www.google.com/search?q=Havila+Resort+Sagana+reviews',
};

// null means "price on request".
export const rooms = {
  standard: {
    name: 'Standard Room',
    res: { bb: [7000, 7500], hb: [8500, 10500], fb: [10000, 13500] },
    non: { bb: [70, 70], hb: [85, 105], fb: [100, 135] },
  },
  executive: {
    name: 'Executive Room',
    res: { bb: [9000, 10000], hb: [10500, 13000], fb: [12000, 16000] },
    non: { bb: [90, 100], hb: [105, 130], fb: [120, 160] },
  },
};

export const meals = { bb: 'Bed & Breakfast', hb: 'Half Board', fb: 'Full Board' };

export const camping = [
  { id: 'camp-only', name: 'Camping only', note: 'Tent provided', res: [1500, 3000], non: [15, 30] },
  { id: 'camp-bb', name: 'Camping with breakfast', note: 'Tent provided', res: [2250, 4500], non: [23, 45] },
  { id: 'camp-fb', name: 'Camping full board', note: 'Tent provided', res: [5250, 10000], non: [53, 105] },
];
export const ownTent = { res: 1000, non: 10 };

// group: wet | wheels | land | slow
export const activities = [
  { id: 'rafting', name: 'White water rafting', group: 'wet', detail: '6 km on the Tana', min: 4, minNote: 'Minimum 4 adults', res: 5500, non: 55, unit: 'per person' },
  { id: 'mini-raft', name: 'Mini rafting', group: 'wet', detail: '1 hour, a good first run', min: 4, minNote: 'Minimum 4 guests. Smaller groups pay KES 5,000 in total', res: 1500, non: 15, unit: 'per person' },
  { id: 'kayak', name: 'Kayaking', group: 'wet', detail: 'Paddle the river on your own', res: null, non: null },
  { id: 'boat', name: 'Boat rides', group: 'wet', detail: 'Around the river and islands', min: 30, minNote: 'Minimum 30 guests', res: 500, non: 5, unit: 'per adult' },
  { id: 'fishing', name: 'Fishing', group: 'slow', detail: 'Bring patience', res: null, non: null },
  { id: 'quad', name: 'Quad biking', group: 'wheels', detail: 'Dust, mud and red earth', res: null, non: null },
  { id: 'cycling', name: 'Cycling', group: 'wheels', detail: 'Minimum 30 minutes', res: 500, non: 5, unit: 'per person' },
  { id: 'archery', name: 'Archery', group: 'land', detail: '1 hour on the range', res: 1000, non: 10, unit: 'per person' },
  { id: 'hiking', name: 'Hiking', group: 'land', detail: 'Trails and hill views', min: 4, minNote: 'Minimum 4 guests', res: 1000, non: 10, unit: 'per person' },
  { id: 'nature', name: 'Nature trail', group: 'land', detail: 'Birds, trees and the swaying bridge', res: null, non: null },
  { id: 'yoga', name: 'Yoga', group: 'slow', detail: 'Slow morning, river sounds', res: null, non: null },
  { id: 'pottery', name: 'Pottery', group: 'slow', detail: 'Get your hands dirty differently', res: null, non: null },
  { id: 'facilitator', name: 'Team-building facilitator', group: 'land', detail: 'Led games and challenges', min: 20, minNote: 'Minimum 20 guests', res: 600, non: 10, unit: 'per person' },
];

export const photos = {
  // real: photos of the resort, taken from its booking listings. Ask the owner for originals.
  lodge: { alt: 'The Havila Resort lodge with its brown tiled roof and sign, behind bright red garden shrubs' },
  'lodge-hills': { alt: 'The Havila lodge from above the car park, with green hills rising behind it' },
  river: { alt: 'The River Tana rushing over rocks at Havila, under green trees' },
  bridge: { alt: 'A wooden footbridge with red railings crossing the grounds between trees' },
  buffet: { alt: 'A Barizi Restaurant buffet of stews and vegetables in steel serving trays' },
  'dining-hall': { alt: 'The open-sided timber dining hall with round tables set for a meal and green views' },
  terrace: { alt: 'A terrace with wicker chairs and laid tables, looking over palm trees' },
  'room-log': { alt: 'A log-walled room with red cushions and big windows onto the hills' },
  'room-canvas': { alt: 'A canvas-walled room with a timber bed, a brass lantern and a view of the valley' },
  'room-bay': { alt: 'A bright room with a bay window looking onto green hills' },
  'room-red': { alt: 'A large double bed with an orange runner and red carpet beside tall curtained windows' },
  'room-red-2': { alt: 'A double room with orange bedding, red rugs and an armchair by the window' },
  'room-tuft': { alt: 'A white bed under a tufted headboard with framed art above it' },
  'room-petals': { alt: 'A white bed decorated with a heart of red rose petals' },
  'room-white': { alt: 'A double bed with white linen and a patterned runner in warm light' },
  // sample: stand-ins until the resort shoots its own activities.
  'raft-yellow': { sample: true, alt: 'A team in yellow helmets paddling a yellow raft through white water', credit: ['Heri Nugroho', 'CC BY-SA 4.0', 'https://commons.wikimedia.org/wiki/File:Fun_Rafting_Elo_River_Magelang.jpg'] },
  'raft-team': { sample: true, alt: 'Three paddlers in red helmets riding through turquoise rapids', credit: ['Unsplash contributor', 'Unsplash License', 'https://unsplash.com/photos/photo-1530866495561-507c9faab2ed'] },
  kayak: { sample: true, alt: 'A kayaker in a blue helmet and red boat bursting through foaming water', credit: ['Mikespenard', 'CC BY 3.0', 'https://commons.wikimedia.org/wiki/File:Kayak_Playboat_ManchesterNH.jpg'] },
  campfire: { sample: true, alt: 'Friends gathered around a bright campfire at dusk', credit: ['Unsplash contributor', 'Unsplash License', 'https://unsplash.com/photos/photo-1478131143081-80f7f84ca84d'] },
  'tents-mist': { sample: true, alt: 'Tents on a misty meadow at sunrise', credit: ['Unsplash contributor', 'Unsplash License', 'https://unsplash.com/photos/photo-1533873984035-25970ab07461'] },
  'tent-view': { sample: true, alt: 'The view out through the open door of a tent', credit: ['Unsplash contributor', 'Unsplash License', 'https://unsplash.com/photos/photo-1504280390367-361c6d9f38f4'] },
};
