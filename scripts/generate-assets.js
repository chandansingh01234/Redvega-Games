const fs = require('fs');
const path = require('path');

const gamesDir = path.join(__dirname, '..', 'public', 'images', 'games');
const galleryDir = path.join(__dirname, '..', 'public', 'images', 'gallery');

[gamesDir, galleryDir].forEach(dir => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
});

function createGameSVG(title, subtitle, badge, mainColor, accentColor, iconType) {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 450" width="100%" height="100%">
  <defs>
    <linearGradient id="bg-grad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#08090D"/>
      <stop offset="50%" stop-color="#12141C"/>
      <stop offset="100%" stop-color="#0B0C10"/>
    </linearGradient>
    <radialGradient id="glow-grad" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="${accentColor}" stop-opacity="0.35"/>
      <stop offset="100%" stop-color="${accentColor}" stop-opacity="0"/>
    </radialGradient>
    <linearGradient id="accent-grad" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="${mainColor}"/>
      <stop offset="100%" stop-color="${accentColor}"/>
    </linearGradient>
    <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
      <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(255,255,255,0.04)" stroke-width="1"/>
    </pattern>
  </defs>

  <!-- Background -->
  <rect width="800" height="450" fill="url(#bg-grad)"/>
  <rect width="800" height="450" fill="url(#grid)"/>

  <!-- Radial Light Spot -->
  <circle cx="400" cy="225" r="300" fill="url(#glow-grad)"/>

  <!-- Cyber Geometric Shapes -->
  <polygon points="100,50 700,50 750,400 50,400" fill="none" stroke="${accentColor}" stroke-opacity="0.15" stroke-width="2"/>
  <circle cx="400" cy="200" r="120" fill="none" stroke="${mainColor}" stroke-opacity="0.2" stroke-dasharray="10 5" stroke-width="2"/>
  <circle cx="400" cy="200" r="80" fill="none" stroke="${accentColor}" stroke-opacity="0.3" stroke-width="1.5"/>

  <!-- Center Gaming Emblem -->
  <g transform="translate(400, 180)">
    ${iconType === 'zombie' ? `
      <!-- Skull / Survival Shield Emblem -->
      <path d="M -30 -30 L 30 -30 L 40 20 L 0 50 L -40 20 Z" fill="none" stroke="url(#accent-grad)" stroke-width="4"/>
      <circle cx="-12" cy="-5" r="6" fill="${accentColor}"/>
      <circle cx="12" cy="-5" r="6" fill="${accentColor}"/>
      <path d="M -15 20 L 15 20" stroke="${mainColor}" stroke-width="3"/>
    ` : iconType === 'space' ? `
      <!-- Starfighter Ship Emblem -->
      <path d="M 0 -45 L 35 30 L 15 25 L 0 40 L -15 25 L -35 30 Z" fill="none" stroke="url(#accent-grad)" stroke-width="4"/>
      <polygon points="0,-25 15,15 -15,15" fill="${accentColor}" fill-opacity="0.6"/>
    ` : `
      <!-- Cyber Hexagon Node Emblem -->
      <polygon points="0,-40 35,-20 35,20 0,40 -35,20 -35,-20" fill="none" stroke="url(#accent-grad)" stroke-width="4"/>
      <circle cx="0" cy="0" r="14" fill="${accentColor}"/>
    `}
  </g>

  <!-- Badge -->
  <rect x="50" y="40" width="160" height="28" rx="14" fill="${mainColor}" fill-opacity="0.2" stroke="${accentColor}" stroke-width="1"/>
  <text x="130" y="59" fill="${accentColor}" font-family="sans-serif" font-size="12" font-weight="bold" text-anchor="middle" letter-spacing="1.5">${badge}</text>

  <!-- Title & Subtitle -->
  <text x="400" y="320" fill="#FFFFFF" font-family="sans-serif" font-size="28" font-weight="800" text-anchor="middle" letter-spacing="1">${title}</text>
  <text x="400" y="355" fill="#94A3B8" font-family="sans-serif" font-size="15" text-anchor="middle">${subtitle}</text>

  <!-- Bottom Accent Bar -->
  <rect x="0" y="442" width="800" height="8" fill="url(#accent-grad)"/>
</svg>`;
}

const assets = [
  // Games
  { path: 'games/stone-island-cover.svg', title: 'STONE ISLAND', sub: 'The Apocalypse', badge: 'ACTION SURVIVAL', main: '#E63946', accent: '#FF2E4D', type: 'zombie' },
  { path: 'games/stone-island-banner.svg', title: 'STONE ISLAND: THE APOCALYPSE', sub: 'Survive the Undead Isolation', badge: 'UNITY 3D ENGINE', main: '#E63946', accent: '#FF2E4D', type: 'zombie' },
  { path: 'games/stone-island-1.svg', title: 'Horde Defense Mode', sub: 'Fortify Shelters & Craft Weapons', badge: 'GAMEPLAY SCREENSHOT', main: '#E63946', accent: '#FF2E4D', type: 'zombie' },
  { path: 'games/stone-island-2.svg', title: 'Dynamic Weather System', sub: 'Rain, Fog & Night Survival Mechanics', badge: 'GAMEPLAY SCREENSHOT', main: '#E63946', accent: '#FF2E4D', type: 'zombie' },
  { path: 'games/stone-island-3.svg', title: 'Mutated Boss Encounters', sub: 'High-Stakes Combat Physics', badge: 'GAMEPLAY SCREENSHOT', main: '#E63946', accent: '#FF2E4D', type: 'zombie' },

  { path: 'games/infinity-space-cover.svg', title: 'INFINITY SPACE', sub: 'Multiplayer PvP Dogfights', badge: 'MULTIPLAYER PVP', main: '#00F0FF', accent: '#E63946', type: 'space' },
  { path: 'games/infinity-space-banner.svg', title: 'INFINITY SPACE: PVP ARENA', sub: 'Real-Time 60Hz Photon Battles', badge: 'PHOTON NETWORKING', main: '#00F0FF', accent: '#E63946', type: 'space' },
  { path: 'games/infinity-space-1.svg', title: '3v3 Starfighter Arenas', sub: 'Asteroid Field Cover & Tactical Physics', badge: 'GAMEPLAY SCREENSHOT', main: '#00F0FF', accent: '#E63946', type: 'space' },
  { path: 'games/infinity-space-2.svg', title: 'Custom Ship Hangar', sub: 'EMP Cannons & Orbital Torpedoes', badge: 'SHIP CUSTOMIZATION', main: '#00F0FF', accent: '#E63946', type: 'space' },
  { path: 'games/infinity-space-3.svg', title: 'Ranked Global ELO', sub: 'Climb Seasonal Leaderboards', badge: 'COMPETITIVE RANKED', main: '#00F0FF', accent: '#E63946', type: 'space' },

  { path: 'games/cyber-core-cover.svg', title: 'CYBER CORE', sub: 'Horizon Tactical RPG', badge: 'TACTICAL RPG', main: '#A855F7', accent: '#E63946', type: 'cyber' },
  { path: 'games/cyber-core-banner.svg', title: 'CYBER CORE: HORIZON', sub: 'Mercenary Squad & Hack Mechanics', badge: 'IN DEVELOPMENT', main: '#A855F7', accent: '#E63946', type: 'cyber' },
  { path: 'games/cyber-core-1.svg', title: 'Cyberware Skill Tree', sub: 'Augment Squad Capabilities', badge: 'CONCEPT UI RENDER', main: '#A855F7', accent: '#E63946', type: 'cyber' },
  { path: 'games/cyber-core-2.svg', title: 'Tactical Pause Combat', sub: 'Real-Time Squad Command System', badge: 'CONCEPT PREVIEW', main: '#A855F7', accent: '#E63946', type: 'cyber' },

  // Gallery
  { path: 'gallery/stone-island-shot1.svg', title: 'Zombie Sunset Patrol', sub: 'Stone Island Environment', badge: 'SCREENSHOT', main: '#E63946', accent: '#FF2E4D', type: 'zombie' },
  { path: 'gallery/infinity-space-shot1.svg', title: 'Orbital Nebula Dogfight', sub: 'Infinity Space 3v3 Arena', badge: 'SCREENSHOT', main: '#00F0FF', accent: '#E63946', type: 'space' },
  { path: 'gallery/cyber-core-shot1.svg', title: 'Cyber Terminal UI', sub: 'Cyber Core Interface Render', badge: 'UI RENDER', main: '#A855F7', accent: '#E63946', type: 'cyber' },
  { path: 'gallery/stone-island-shot2.svg', title: 'Base Fortification Night', sub: 'Stone Island Defense', badge: 'SCREENSHOT', main: '#E63946', accent: '#FF2E4D', type: 'zombie' },
  { path: 'gallery/infinity-space-shot2.svg', title: 'Hangar Ship Fitting', sub: '3D Ship Craft Model', badge: '3D MODEL', main: '#00F0FF', accent: '#E63946', type: 'space' },
  { path: 'gallery/stone-island-artwork.svg', title: 'Key Visual Poster', sub: 'Promotional Studio Artwork', badge: 'ARTWORK', main: '#E63946', accent: '#FF2E4D', type: 'zombie' },

  // Devlogs
  { path: 'gallery/devlog-1.svg', title: 'Addressables Memory Optimization', sub: 'Unity Engine Tech Devlog', badge: 'TECH BLOG', main: '#E63946', accent: '#FF2E4D', type: 'zombie' },
  { path: 'gallery/devlog-2.svg', title: 'Photon 60Hz Network Sync', sub: 'Multiplayer Architecture Devlog', badge: 'NETWORKING', main: '#00F0FF', accent: '#E63946', type: 'space' },
  { path: 'gallery/devlog-3.svg', title: 'Cyber Core Announcement', sub: 'Studio Reveal & Prototype', badge: 'ANNOUNCEMENT', main: '#A855F7', accent: '#E63946', type: 'cyber' }
];

assets.forEach(asset => {
  const fullPath = path.join(__dirname, '..', 'public', 'images', asset.path);
  const content = createGameSVG(asset.title, asset.sub, asset.badge, asset.main, asset.accent, asset.type);
  fs.writeFileSync(fullPath, content);
});

console.log('Generated ' + assets.length + ' SVG vector assets successfully!');
