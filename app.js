// ── STARS ──
function generateStars(count) {
  const container = document.getElementById('stars');
  for (let i = 0; i < count; i++) {
    const star = document.createElement('div');
    star.className = 'star';
    const size = Math.random() * 2.5 + 0.5;
    star.style.cssText = `
      left:${Math.random()*100}%;
      top:${Math.random()*60}%;
      width:${size}px; height:${size}px;
      --dur:${Math.random()*3+2}s;
    `;
    container.appendChild(star);
  }
}

// ── SNOW SPARKLES ──
function generateSparkles(count) {
  const ground = document.getElementById('snow-ground');
  for (let i = 0; i < count; i++) {
    const sp = document.createElement('div');
    sp.className = 'snow-sparkle';
    const size = Math.random() * 3 + 1;
    sp.style.cssText = `
      left:${Math.random()*100}%;
      bottom:${Math.random()*60}%;
      width:${size}px; height:${size}px;
      animation-delay:${Math.random()*3}s;
    `;
    ground.appendChild(sp);
  }
}

// ── TREES ──
function buildTree(height, layerCount, c1='#0d2b1e', c2='#1a4a2e') {
  const tree = document.createElement('div');
  tree.className = 'tree';
  for (let i = layerCount - 1; i >= 0; i--) {
    const w = 28 + i * 22;
    const h = 22 + i * 8;
    const layer = document.createElement('div');
    layer.className = 'tree-layer';
    layer.style.cssText = `width:${w}px;height:${h}px;background:linear-gradient(180deg,${c2},${c1});`;
    tree.appendChild(layer);
  }
  const trunk = document.createElement('div');
  trunk.className = 'tree-trunk';
  trunk.style.height = `${height * 0.15}px`;
  tree.appendChild(trunk);
  return tree;
}

function generateTrees() {
  const leftData  = [[160,5],[120,4],[190,6],[100,3],[140,4]];
  const rightData = [[130,4],[180,6],[110,3],[160,5],[145,4]];
  const left  = document.getElementById('trees-left');
  const right = document.getElementById('trees-right');
  leftData.forEach(([h,l])  => left.appendChild(buildTree(h,l)));
  rightData.forEach(([h,l]) => right.appendChild(buildTree(h,l)));
}

// ── MOUNTAINS SVG ──
function buildMountains() {
  const el = document.getElementById('mountains');
  el.innerHTML = `
    <svg viewBox="0 0 1440 200" fill="none" style="width:100%;position:absolute;bottom:0">
      <path d="M0 200 L200 60 L400 160 L600 20 L800 130 L1000 50 L1200 120 L1440 40 L1440 200Z"
        fill="url(#mountGrad)" opacity="0.6"/>
      <path d="M600 20 L570 80 L630 80Z" fill="rgba(220,235,245,0.5)"/>
      <path d="M1000 50 L975 100 L1025 100Z" fill="rgba(220,235,245,0.4)"/>
      <path d="M200 60 L175 110 L225 110Z" fill="rgba(220,235,245,0.3)"/>
      <defs>
        <linearGradient id="mountGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="#0d2b3e"/>
          <stop offset="100%" stop-color="#041525"/>
        </linearGradient>
      </defs>
    </svg>`;
}

// ── BMW CAR SVG ──
function buildBMW() {
  return `<svg width="220" height="90" viewBox="0 0 220 90" fill="none">
    <ellipse cx="110" cy="88" rx="100" ry="6" fill="rgba(0,0,0,0.5)"/>
    <path d="M10 65 Q15 40 50 32 Q75 22 110 20 Q145 18 170 28 Q200 38 210 55 L215 65 L10 65Z" fill="url(#bmwGrad)"/>
    <path d="M55 32 Q80 8 140 8 Q165 8 175 28" stroke="#1a3a5c" stroke-width="1" fill="url(#roofGrad)"/>
    <path d="M62 30 Q80 12 115 12 L115 30Z" fill="rgba(100,180,220,0.5)" stroke="rgba(200,220,240,0.3)" stroke-width="0.5"/>
    <path d="M118 12 L140 12 Q158 12 165 30 L118 30Z" fill="rgba(100,180,220,0.5)" stroke="rgba(200,220,240,0.3)" stroke-width="0.5"/>
    <line x1="116" y1="11" x2="116" y2="31" stroke="rgba(26,58,92,0.8)" stroke-width="2"/>
    <circle cx="55" cy="68" r="18" fill="#111"/>
    <circle cx="55" cy="68" r="12" fill="#222"/>
    <circle cx="55" cy="68" r="6" fill="#888"/>
    <circle cx="165" cy="68" r="18" fill="#111"/>
    <circle cx="165" cy="68" r="12" fill="#222"/>
    <circle cx="165" cy="68" r="6" fill="#888"/>
    <rect x="195" y="48" width="15" height="12" rx="3" fill="#c9a227" opacity="0.7"/>
    <rect x="197" y="50" width="5" height="8" rx="1" fill="#111"/>
    <rect x="204" y="50" width="5" height="8" rx="1" fill="#111"/>
    <ellipse cx="207" cy="56" rx="5" ry="3" fill="rgba(255,255,255,0.5)"/>
    <rect x="10" y="52" width="10" height="6" rx="2" fill="#c0392b" opacity="0.8"/>
    <circle cx="130" cy="22" r="7" fill="#0066cc" stroke="white" stroke-width="1"/>
    <path d="M123 22 L137 22 M130 15 L130 29" stroke="white" stroke-width="1"/>
    <path d="M70 32 Q75 60 80 65" stroke="rgba(0,0,0,0.3)" stroke-width="1"/>
    <path d="M130 25 Q132 55 135 65" stroke="rgba(0,0,0,0.3)" stroke-width="1"/>
    <defs>
      <linearGradient id="bmwGrad" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="#2a5a8c"/>
        <stop offset="100%" stop-color="#1a3a5c"/>
      </linearGradient>
      <linearGradient id="roofGrad" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="#3a7ab8"/>
        <stop offset="100%" stop-color="#2a5a8c"/>
      </linearGradient>
    </defs>
  </svg>`;
}

// ── KTM 2024 390 DUKE SVG ──
function buildKTM() {
  const rSpokes = Array.from({length:10},(_,i)=>(i*36)*Math.PI/180);
  const spokeLines = (cx, cy) => rSpokes.map(a =>
    `<line x1="${cx+18*Math.cos(a)}" y1="${cy+18*Math.sin(a)}" x2="${cx-18*Math.cos(a)}" y2="${cy-18*Math.sin(a)}" stroke="#555" stroke-width="0.8"/>`
  ).join('');

  return `<svg width="190" height="110" viewBox="0 0 190 110" fill="none">
    <defs>
      <linearGradient id="ktmFork" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="#d4d4d4"/><stop offset="100%" stop-color="#888"/>
      </linearGradient>
      <linearGradient id="ktmExhaust" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0%" stop-color="#999"/><stop offset="100%" stop-color="#555"/>
      </linearGradient>
      <linearGradient id="ktmTank" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="#ff8c00"/><stop offset="50%" stop-color="#ff6b00"/><stop offset="100%" stop-color="#cc4400"/>
      </linearGradient>
      <linearGradient id="ktmWheel" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stop-color="#333"/><stop offset="100%" stop-color="#111"/>
      </linearGradient>
    </defs>
    <!-- Shadow -->
    <ellipse cx="95" cy="107" rx="82" ry="5" fill="rgba(0,0,0,0.45)"/>
    <!-- Rear Wheel -->
    <circle cx="42" cy="80" r="24" fill="#0d0d0d" stroke="#333" stroke-width="1.5"/>
    <circle cx="42" cy="80" r="18" fill="url(#ktmWheel)"/>
    ${spokeLines(42,80)}
    <circle cx="42" cy="80" r="5" fill="#ff6b00"/>
    <circle cx="42" cy="80" r="2.5" fill="#111"/>
    <circle cx="42" cy="80" r="22" fill="none" stroke="#1a1a1a" stroke-width="1.5" stroke-dasharray="4 3"/>
    <!-- Front Wheel -->
    <circle cx="152" cy="80" r="24" fill="#0d0d0d" stroke="#333" stroke-width="1.5"/>
    <circle cx="152" cy="80" r="18" fill="url(#ktmWheel)"/>
    ${spokeLines(152,80)}
    <circle cx="152" cy="80" r="5" fill="#ff6b00"/>
    <circle cx="152" cy="80" r="2.5" fill="#111"/>
    <circle cx="152" cy="80" r="22" fill="none" stroke="#1a1a1a" stroke-width="1.5" stroke-dasharray="4 3"/>
    <!-- Swingarm -->
    <path d="M42 74 Q75 65 90 68" stroke="#444" stroke-width="3.5" stroke-linecap="round" fill="none"/>
    <path d="M42 86 Q75 78 90 72" stroke="#333" stroke-width="2" stroke-linecap="round" fill="none"/>
    <!-- Trellis Frame -->
    <path d="M88 68 L90 28 L120 22 L148 42" stroke="#2a2a2a" stroke-width="4" stroke-linecap="round" fill="none"/>
    <path d="M90 28 L85 55 L88 68" stroke="#2a2a2a" stroke-width="3.5" stroke-linecap="round" fill="none"/>
    <path d="M90 28 L100 45 L88 68" stroke="#333" stroke-width="2" fill="none"/>
    <path d="M95 36 L85 55" stroke="#333" stroke-width="1.5" fill="none"/>
    <path d="M100 45 L95 36" stroke="#444" stroke-width="1.5" fill="none"/>
    <path d="M90 28 Q78 24 65 26 Q55 28 52 34" stroke="#333" stroke-width="2.5" fill="none" stroke-linecap="round"/>
    <!-- Monoshock -->
    <path d="M88 52 Q82 60 80 68" stroke="#777" stroke-width="3" stroke-linecap="round"/>
    <rect x="82" y="56" width="4" height="10" rx="2" fill="#aaa"/>
    <!-- Tank (Angular 2024 Duke) -->
    <path d="M90 28 Q100 16 128 16 Q140 16 148 24 L148 42 Q130 44 110 42 Q95 40 88 34Z" fill="url(#ktmTank)"/>
    <path d="M100 19 Q118 15 135 18 L140 24 Q122 20 105 23Z" fill="rgba(255,200,100,0.25)"/>
    <path d="M92 34 Q105 36 120 36 Q135 35 145 30" stroke="rgba(0,0,0,0.4)" stroke-width="1" fill="none"/>
    <rect x="105" y="22" width="30" height="10" rx="2" fill="rgba(0,0,0,0.5)"/>
    <text x="108" y="30" font-size="8" fill="white" font-weight="900" font-family="Arial Black,Arial" letter-spacing="1">KTM</text>
    <!-- Seat -->
    <path d="M52 34 Q65 26 90 28 Q88 34 85 36 Q72 38 58 40Z" fill="#1a1a1a"/>
    <path d="M57 37 Q70 33 84 34" stroke="#333" stroke-width="0.8" stroke-dasharray="2 2"/>
    <!-- Belly Pan -->
    <path d="M88 68 Q90 78 100 80 Q115 80 125 72 L128 60 L110 56 Q95 56 88 68Z" fill="#1a1a1a" stroke="#333" stroke-width="0.5"/>
    <path d="M90 74 Q100 78 115 76 L120 68 L106 66Z" fill="#ff6b00" opacity="0.8"/>
    <!-- USD Forks (48mm WP APEX) -->
    <path d="M148 42 L152 56" stroke="url(#ktmFork)" stroke-width="5" stroke-linecap="round"/>
    <path d="M144 40 L148 56" stroke="url(#ktmFork)" stroke-width="5" stroke-linecap="round"/>
    <path d="M146 52 L152 52" stroke="#aaa" stroke-width="2"/>
    <path d="M152 56 L152 68" stroke="#333" stroke-width="5" stroke-linecap="round"/>
    <path d="M148 56 L148 68" stroke="#333" stroke-width="5" stroke-linecap="round"/>
    <line x1="148" y1="68" x2="156" y2="68" stroke="#888" stroke-width="2"/>
    <!-- Brake Discs -->
    <circle cx="152" cy="80" r="14" fill="none" stroke="#555" stroke-width="2" stroke-dasharray="5 3"/>
    <circle cx="42" cy="80" r="12" fill="none" stroke="#444" stroke-width="1.5" stroke-dasharray="4 3"/>
    <!-- Exhaust (underslung single) -->
    <path d="M88 68 Q92 74 100 76 Q118 78 130 75 Q145 72 155 74" fill="none" stroke="url(#ktmExhaust)" stroke-width="5" stroke-linecap="round"/>
    <path d="M88 68 Q92 72 100 73 Q118 75 130 72 Q145 70 155 71" fill="none" stroke="#aaa" stroke-width="2" stroke-linecap="round" opacity="0.5"/>
    <ellipse cx="155" cy="73" rx="5" ry="3.5" fill="#777" stroke="#999" stroke-width="0.5"/>
    <ellipse cx="155" cy="73" rx="3" ry="2" fill="#333"/>
    <path d="M95 74 Q105 76 115 75" stroke="#888" stroke-width="1.5" stroke-dasharray="2 2"/>
    <!-- 2024 LED Headlight -->
    <path d="M148 24 L158 20 L165 28 L160 38 L148 42Z" fill="#1a1a1a" stroke="#333" stroke-width="0.8"/>
    <path d="M150 26 L162 24 L164 30" stroke="#ffe066" stroke-width="2" stroke-linecap="round" opacity="0.9"/>
    <ellipse cx="157" cy="34" rx="5" ry="4" fill="#d0eeff" opacity="0.8"/>
    <ellipse cx="167" cy="30" rx="8" ry="5" fill="rgba(200,230,255,0.12)"/>
    <!-- Taillight -->
    <path d="M52 34 L48 36 L46 40 L50 42 L55 40 L55 36Z" fill="#cc0000" opacity="0.85"/>
    <path d="M48 37 L54 37" stroke="#ff4444" stroke-width="1" opacity="0.7"/>
    <!-- Windscreen -->
    <path d="M148 22 Q153 15 158 18 L162 24 L158 22 Q155 16 150 20Z" fill="rgba(180,220,255,0.2)" stroke="rgba(180,220,255,0.4)" stroke-width="0.5"/>
    <!-- Footpegs -->
    <rect x="84" y="70" width="8" height="2" rx="1" fill="#555"/>
    <rect x="138" y="72" width="8" height="2" rx="1" fill="#555"/>
    <!-- Chain -->
    <path d="M50 83 Q70 86 88 72" fill="none" stroke="#555" stroke-width="1.5" stroke-dasharray="3 2"/>
    <!-- 2024 Badge -->
    <rect x="60" y="30" width="22" height="8" rx="2" fill="rgba(255,107,0,0.15)" stroke="rgba(255,107,0,0.5)" stroke-width="0.5"/>
    <text x="62" y="36.5" font-size="5.5" fill="#ff9944" font-family="Arial" font-weight="bold">2024</text>
  </svg>`;
}

// ── WALKER SVG ──
function buildWalker() {
  return `<svg width="28" height="55" viewBox="0 0 28 55" fill="none">
    <circle cx="14" cy="7" r="5" fill="rgba(20,30,50,0.9)"/>
    <path d="M14 12 L14 30" stroke="rgba(20,30,50,0.9)" stroke-width="3.5" stroke-linecap="round"/>
    <path d="M14 18 L6 26" stroke="rgba(20,30,50,0.9)" stroke-width="2.5" stroke-linecap="round"/>
    <path d="M14 18 L22 24" stroke="rgba(20,30,50,0.9)" stroke-width="2.5" stroke-linecap="round"/>
    <path d="M14 30 L8 44" stroke="rgba(20,30,50,0.9)" stroke-width="3" stroke-linecap="round"/>
    <path d="M14 30 L20 43" stroke="rgba(20,30,50,0.9)" stroke-width="3" stroke-linecap="round"/>
  </svg>`;
}

// ── SMOOTH SCROLL NAV ──
function initNav() {
  document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', e => {
      e.preventDefault();
      const id = link.getAttribute('href').replace('#','');
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
      document.querySelectorAll('.nav-links a').forEach(a => a.classList.remove('active'));
      link.classList.add('active');
    });
  });
}

// ── INIT ──
document.addEventListener('DOMContentLoaded', () => {
  generateStars(120);
  generateSparkles(20);
  generateTrees();
  buildMountains();
  document.getElementById('bmw-car').innerHTML = buildBMW();
  document.getElementById('ktm-bike').innerHTML = buildKTM();
  document.getElementById('walker-svg').innerHTML = buildWalker();
  initNav();
});
