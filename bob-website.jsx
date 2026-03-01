import { useState, useEffect, useRef } from "react";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;700;900&family=Raleway:wght@300;400;600&display=swap');

  * { margin: 0; padding: 0; box-sizing: border-box; }

  :root {
    --ocean-deep: #020c1b;
    --ocean-mid: #0a1f3d;
    --ocean-light: #0e3460;
    --wave-blue: #1a5276;
    --wave-teal: #148f8f;
    --snow-white: #e8f4f8;
    --tree-dark: #0d2b1e;
    --tree-mid: #1a4a2e;
    --accent-gold: #c9a227;
    --ktm-orange: #ff6b00;
    --text-light: #cdd6f4;
  }

  body {
    background: var(--ocean-deep);
    font-family: 'Raleway', sans-serif;
    color: var(--text-light);
    overflow-x: hidden;
  }

  /* NAV */
  .nav {
    position: fixed; top: 0; left: 0; right: 0; z-index: 100;
    display: flex; justify-content: space-between; align-items: center;
    padding: 1.2rem 3rem;
    background: linear-gradient(to bottom, rgba(2,12,27,0.95), transparent);
    backdrop-filter: blur(4px);
  }
  .nav-logo {
    font-family: 'Cinzel', serif;
    font-size: 1.8rem; font-weight: 900;
    color: var(--accent-gold);
    letter-spacing: 4px;
    text-shadow: 0 0 20px rgba(201,162,39,0.5);
  }
  .nav-links { display: flex; gap: 2.5rem; list-style: none; }
  .nav-links a {
    color: var(--snow-white); text-decoration: none;
    font-size: 0.85rem; letter-spacing: 3px; text-transform: uppercase;
    font-weight: 600; transition: color 0.3s;
  }
  .nav-links a:hover { color: var(--accent-gold); }

  /* HERO */
  .hero {
    position: relative; width: 100%; height: 100vh;
    overflow: hidden; display: flex; align-items: center; justify-content: center;
  }

  /* SKY */
  .sky {
    position: absolute; inset: 0;
    background: linear-gradient(180deg,
      #010a18 0%, #021428 20%, #041d3d 40%,
      #062550 55%, #082e64 65%, #0a3878 75%,
      #0d4a8a 85%, #1a6090 92%, #2a7ea0 100%
    );
  }

  /* STARS */
  .stars { position: absolute; inset: 0; pointer-events: none; }
  .star {
    position: absolute; background: white; border-radius: 50%;
    animation: twinkle var(--dur) infinite alternate;
  }
  @keyframes twinkle { 0%{opacity:0.2;} 100%{opacity:1;} }

  /* MOON */
  .moon {
    position: absolute; top: 8%; right: 15%;
    width: 60px; height: 60px; border-radius: 50%;
    background: radial-gradient(circle at 35% 35%, #fff8dc, #f0d060, #c9a227);
    box-shadow: 0 0 40px rgba(201,162,39,0.6), 0 0 80px rgba(201,162,39,0.3);
    animation: moonGlow 4s infinite alternate;
  }
  @keyframes moonGlow {
    0%{ box-shadow: 0 0 40px rgba(201,162,39,0.6), 0 0 80px rgba(201,162,39,0.3); }
    100%{ box-shadow: 0 0 60px rgba(201,162,39,0.8), 0 0 120px rgba(201,162,39,0.5); }
  }

  /* MOUNTAINS */
  .mountains { position: absolute; bottom: 30%; width: 100%; pointer-events: none; }

  /* OCEAN */
  .ocean-container {
    position: absolute; bottom: 0; left: 0; right: 0; height: 38%;
  }
  .ocean-base {
    position: absolute; inset: 0;
    background: linear-gradient(180deg, #1a6090 0%, #0d4a8a 30%, #062550 70%, #020c1b 100%);
  }
  .wave-group { position: absolute; bottom: 0; left: 0; right: 0; }
  .wave {
    position: absolute; bottom: 0;
    width: 200%; height: 100px;
    background: rgba(26,82,118,0.5);
    border-radius: 50% 50% 0 0 / 30px 30px 0 0;
    animation: waveMove var(--speed) linear infinite;
  }
  .wave:nth-child(2) { height: 80px; opacity: 0.4; animation-delay: -2s; background: rgba(20,143,143,0.3); }
  .wave:nth-child(3) { height: 60px; opacity: 0.3; animation-delay: -4s; background: rgba(26,82,118,0.4); }
  @keyframes waveMove {
    0%{ transform: translateX(0); }
    100%{ transform: translateX(-50%); }
  }

  /* SHORE FOAM */
  .shore {
    position: absolute; bottom: 30%; left: 0; right: 0; height: 6px;
    background: rgba(232,244,248,0.3);
    animation: shoreShimmer 2s infinite alternate;
    filter: blur(1px);
  }
  @keyframes shoreShimmer {
    0%{ opacity:0.2; } 100%{ opacity:0.5; }
  }

  /* SNOW GROUND */
  .snow-ground {
    position: absolute; bottom: 0; left: 0; right: 0; height: 30%;
    background: linear-gradient(180deg, #c8dce8 0%, #a0bfcf 30%, #6a8fa0 100%);
    clip-path: polygon(0 40%, 5% 25%, 10% 35%, 18% 20%, 25% 30%, 35% 15%, 45% 28%, 55% 18%, 65% 30%, 75% 20%, 85% 32%, 92% 22%, 100% 35%, 100% 100%, 0 100%);
  }
  .snow-sparkle {
    position: absolute; border-radius: 50%;
    background: white; opacity: 0;
    animation: sparkle 3s infinite;
  }
  @keyframes sparkle {
    0%,100%{opacity:0;} 50%{opacity:0.8;}
  }

  /* TREES */
  .trees-left, .trees-right {
    position: absolute; bottom: 28%; display: flex; align-items: flex-end;
  }
  .trees-left { left: 0; }
  .trees-right { right: 0; transform: scaleX(-1); }

  .tree { position: relative; display: inline-flex; flex-direction: column; align-items: center; }
  .tree-trunk {
    width: 6px; height: 18px;
    background: linear-gradient(to right, #3d2b1a, #5c3d25, #3d2b1a);
    margin-top: 2px; border-radius: 1px;
  }
  .tree-layer {
    position: relative; clip-path: polygon(50% 0%, 0% 100%, 100% 100%);
    margin-bottom: -8px;
  }
  .tree-layer::after {
    content: '';
    position: absolute; top: -4px; left: 10%; right: 10%;
    height: 6px; background: rgba(232,244,248,0.85);
    border-radius: 2px; clip-path: polygon(50% 0%, 0% 100%, 100% 100%);
  }

  /* BMW CAR SVG */
  .scene-objects {
    position: absolute; bottom: 28%; left: 50%; transform: translateX(-50%);
    display: flex; align-items: flex-end; gap: 40px;
  }

  /* WALKER */
  .walker {
    position: absolute; bottom: 28%;
    animation: walkPath 15s linear infinite;
  }
  @keyframes walkPath {
    0%{ left: 10%; } 100%{ left: 80%; }
  }
  .walker-body { animation: walkBob 0.5s infinite alternate; }
  @keyframes walkBob { 0%{transform:translateY(0);} 100%{transform:translateY(-3px);} }

  /* HERO TEXT */
  .hero-content {
    position: relative; z-index: 10; text-align: center;
    animation: fadeInUp 1.5s ease forwards;
    pointer-events: none;
  }
  @keyframes fadeInUp {
    0%{ opacity:0; transform:translateY(40px); }
    100%{ opacity:1; transform:translateY(0); }
  }
  .hero-subtitle {
    font-family: 'Raleway', sans-serif;
    letter-spacing: 8px; font-size: 0.85rem; color: var(--wave-teal);
    text-transform: uppercase; margin-bottom: 1rem;
    animation: fadeInUp 1.5s 0.3s ease both;
  }
  .hero-title {
    font-family: 'Cinzel', serif;
    font-size: clamp(4rem, 12vw, 9rem);
    font-weight: 900; line-height: 0.9;
    color: transparent;
    background: linear-gradient(135deg, #c9a227, #f0d060, #c9a227, #8a6914);
    -webkit-background-clip: text; background-clip: text;
    text-shadow: none;
    filter: drop-shadow(0 0 30px rgba(201,162,39,0.5));
    animation: fadeInUp 1.5s 0.5s ease both;
  }
  .hero-tagline {
    font-family: 'Raleway', sans-serif;
    font-size: 1rem; letter-spacing: 4px; color: var(--snow-white);
    margin-top: 1.2rem; opacity: 0.8;
    animation: fadeInUp 1.5s 0.8s ease both;
  }

  /* SECTIONS */
  .section {
    padding: 6rem 3rem;
    max-width: 1100px; margin: 0 auto;
  }
  .section-title {
    font-family: 'Cinzel', serif;
    font-size: 2.5rem; color: var(--accent-gold);
    letter-spacing: 4px; margin-bottom: 2rem;
    border-bottom: 1px solid rgba(201,162,39,0.3); padding-bottom: 1rem;
  }
  .section p {
    font-size: 1.1rem; line-height: 1.9; color: var(--text-light);
    max-width: 700px; opacity: 0.85;
  }

  /* CARDS */
  .cards { display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 1.5rem; margin-top: 2.5rem; }
  .card {
    background: linear-gradient(135deg, rgba(10,31,61,0.9), rgba(6,37,80,0.7));
    border: 1px solid rgba(201,162,39,0.2);
    border-radius: 4px; padding: 2rem;
    transition: transform 0.3s, border-color 0.3s;
    position: relative; overflow: hidden;
  }
  .card::before {
    content:''; position:absolute; top:0; left:0; right:0; height:2px;
    background: linear-gradient(to right, transparent, var(--accent-gold), transparent);
    opacity: 0; transition: opacity 0.3s;
  }
  .card:hover { transform: translateY(-6px); border-color: rgba(201,162,39,0.5); }
  .card:hover::before { opacity: 1; }
  .card-icon { font-size: 2.5rem; margin-bottom: 1rem; }
  .card-title { font-family: 'Cinzel', serif; font-size: 1.2rem; color: var(--accent-gold); margin-bottom: 0.8rem; }
  .card p { font-size: 0.9rem; opacity: 0.75; line-height: 1.7; }

  /* CONTACT */
  .contact-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 3rem; margin-top: 2rem; }
  .contact-item { display: flex; align-items: center; gap: 1rem; padding: 1.2rem; border-left: 2px solid var(--accent-gold); }
  .contact-label { font-family: 'Cinzel', serif; font-size: 0.75rem; letter-spacing: 3px; color: var(--accent-gold); text-transform: uppercase; }
  .contact-value { font-size: 1rem; color: var(--snow-white); }

  /* FOOTER */
  .footer {
    text-align: center; padding: 2rem;
    border-top: 1px solid rgba(201,162,39,0.15);
    font-size: 0.8rem; letter-spacing: 3px; opacity: 0.5; text-transform: uppercase;
  }

  /* SCROLLBAR */
  ::-webkit-scrollbar { width: 4px; }
  ::-webkit-scrollbar-track { background: var(--ocean-deep); }
  ::-webkit-scrollbar-thumb { background: var(--accent-gold); border-radius: 2px; }
`;

function generateStars(count) {
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    left: `${Math.random() * 100}%`,
    top: `${Math.random() * 60}%`,
    size: Math.random() * 2.5 + 0.5,
    dur: `${Math.random() * 3 + 2}s`,
  }));
}

function generateSparkles(count) {
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    left: `${Math.random() * 100}%`,
    bottom: `${Math.random() * 60}%`,
    size: Math.random() * 3 + 1,
    delay: `${Math.random() * 3}s`,
  }));
}

const STARS = generateStars(120);
const SPARKLES = generateSparkles(20);

function Tree({ height = 100, layerCount = 4, color1 = "#0d2b1e", color2 = "#1a4a2e" }) {
  const layers = Array.from({ length: layerCount }, (_, i) => {
    const w = 28 + i * 22;
    const h = 22 + i * 8;
    return { w, h, i };
  });
  return (
    <div className="tree">
      {[...layers].reverse().map(({ w, h, i }) => (
        <div
          key={i}
          className="tree-layer"
          style={{
            width: w,
            height: h,
            background: `linear-gradient(180deg, ${color2}, ${color1})`,
          }}
        />
      ))}
      <div className="tree-trunk" style={{ height: height * 0.15 }} />
    </div>
  );
}

function BMWCar() {
  return (
    <svg width="220" height="90" viewBox="0 0 220 90" fill="none">
      {/* Shadow */}
      <ellipse cx="110" cy="88" rx="100" ry="6" fill="rgba(0,0,0,0.5)" />
      {/* Body */}
      <path d="M10 65 Q15 40 50 32 Q75 22 110 20 Q145 18 170 28 Q200 38 210 55 L215 65 L10 65Z"
        fill="url(#bmwGrad)" />
      {/* Roof */}
      <path d="M55 32 Q80 8 140 8 Q165 8 175 28" stroke="#1a3a5c" strokeWidth="1" fill="url(#roofGrad)" />
      {/* Windows */}
      <path d="M62 30 Q80 12 115 12 L115 30Z" fill="rgba(100,180,220,0.5)" stroke="rgba(200,220,240,0.3)" strokeWidth="0.5" />
      <path d="M118 12 L140 12 Q158 12 165 30 L118 30Z" fill="rgba(100,180,220,0.5)" stroke="rgba(200,220,240,0.3)" strokeWidth="0.5" />
      {/* Window divider */}
      <line x1="116" y1="11" x2="116" y2="31" stroke="rgba(26,58,92,0.8)" strokeWidth="2" />
      {/* Wheels */}
      <circle cx="55" cy="68" r="18" fill="#111" />
      <circle cx="55" cy="68" r="12" fill="#222" />
      <circle cx="55" cy="68" r="6" fill="#888" />
      <circle cx="165" cy="68" r="18" fill="#111" />
      <circle cx="165" cy="68" r="12" fill="#222" />
      <circle cx="165" cy="68" r="6" fill="#888" />
      {/* BMW Grille */}
      <rect x="195" y="48" width="15" height="12" rx="3" fill="#c9a227" opacity="0.7" />
      <rect x="197" y="50" width="5" height="8" rx="1" fill="#111" />
      <rect x="204" y="50" width="5" height="8" rx="1" fill="#111" />
      {/* Headlight */}
      <ellipse cx="207" cy="56" rx="5" ry="3" fill="#fff8" />
      {/* Tail light */}
      <rect x="10" y="52" width="10" height="6" rx="2" fill="#c0392b" opacity="0.8" />
      {/* BMW Logo */}
      <circle cx="130" cy="22" r="7" fill="#0066cc" stroke="white" strokeWidth="1" />
      <path d="M123 22 L137 22 M130 15 L130 29" stroke="white" strokeWidth="1" />
      {/* Door line */}
      <path d="M70 32 Q75 60 80 65" stroke="rgba(0,0,0,0.3)" strokeWidth="1" />
      <path d="M130 25 Q132 55 135 65" stroke="rgba(0,0,0,0.3)" strokeWidth="1" />
      <defs>
        <linearGradient id="bmwGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#2a5a8c" />
          <stop offset="100%" stopColor="#1a3a5c" />
        </linearGradient>
        <linearGradient id="roofGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#3a7ab8" />
          <stop offset="100%" stopColor="#2a5a8c" />
        </linearGradient>
      </defs>
    </svg>
  );
}

function KTMBike() {
  // 2024 KTM 390 Duke — trellis frame, USD forks, angular tank, LED headlight, single exhaust
  const rSpokes = Array.from({ length: 10 }, (_, i) => (i * 36) * Math.PI / 180);
  const fSpokes = Array.from({ length: 10 }, (_, i) => (i * 36) * Math.PI / 180);
  return (
    <svg width="190" height="110" viewBox="0 0 190 110" fill="none">
      <defs>
        <linearGradient id="ktm24Trellis" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#2a2a2a" />
          <stop offset="100%" stopColor="#111" />
        </linearGradient>
        <linearGradient id="ktm24Tank" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#ff8c00" />
          <stop offset="50%" stopColor="#ff6b00" />
          <stop offset="100%" stopColor="#cc4400" />
        </linearGradient>
        <linearGradient id="ktm24Fork" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#d4d4d4" />
          <stop offset="100%" stopColor="#888" />
        </linearGradient>
        <linearGradient id="ktm24Exhaust" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#999" />
          <stop offset="100%" stopColor="#555" />
        </linearGradient>
        <linearGradient id="ktm24Wheel" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#333" />
          <stop offset="100%" stopColor="#111" />
        </linearGradient>
        <filter id="glowOrange">
          <feGaussianBlur stdDeviation="2" result="blur"/>
          <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
        </filter>
      </defs>

      {/* Ground shadow */}
      <ellipse cx="95" cy="107" rx="82" ry="5" fill="rgba(0,0,0,0.45)" />

      {/* ── REAR WHEEL (17") ── */}
      <circle cx="42" cy="80" r="24" fill="#0d0d0d" stroke="#333" strokeWidth="1.5" />
      <circle cx="42" cy="80" r="18" fill="url(#ktm24Wheel)" />
      {/* spokes */}
      {rSpokes.map((a,i)=>(
        <line key={i}
          x1={42+18*Math.cos(a)} y1={80+18*Math.sin(a)}
          x2={42-18*Math.cos(a)} y2={80-18*Math.sin(a)}
          stroke="#555" strokeWidth="0.8"/>
      ))}
      <circle cx="42" cy="80" r="5" fill="#ff6b00" />
      <circle cx="42" cy="80" r="2.5" fill="#111" />
      {/* Tyre tread lines */}
      <circle cx="42" cy="80" r="22" fill="none" stroke="#1a1a1a" strokeWidth="1.5" strokeDasharray="4 3" />

      {/* ── FRONT WHEEL (17") ── */}
      <circle cx="152" cy="80" r="24" fill="#0d0d0d" stroke="#333" strokeWidth="1.5" />
      <circle cx="152" cy="80" r="18" fill="url(#ktm24Wheel)" />
      {fSpokes.map((a,i)=>(
        <line key={i}
          x1={152+18*Math.cos(a)} y1={80+18*Math.sin(a)}
          x2={152-18*Math.cos(a)} y2={80-18*Math.sin(a)}
          stroke="#555" strokeWidth="0.8"/>
      ))}
      <circle cx="152" cy="80" r="5" fill="#ff6b00" />
      <circle cx="152" cy="80" r="2.5" fill="#111" />
      <circle cx="152" cy="80" r="22" fill="none" stroke="#1a1a1a" strokeWidth="1.5" strokeDasharray="4 3" />

      {/* ── SWINGARM ── */}
      <path d="M42 74 Q75 65 90 68" stroke="#444" strokeWidth="3.5" strokeLinecap="round" fill="none"/>
      <path d="M42 86 Q75 78 90 72" stroke="#333" strokeWidth="2" strokeLinecap="round" fill="none"/>

      {/* ── TRELLIS FRAME (KTM signature) ── */}
      {/* Main backbone */}
      <path d="M88 68 L90 28 L120 22 L148 42" stroke="#2a2a2a" strokeWidth="4" strokeLinecap="round" fill="none"/>
      {/* Down tube */}
      <path d="M90 28 L85 55 L88 68" stroke="#2a2a2a" strokeWidth="3.5" strokeLinecap="round" fill="none"/>
      {/* Trellis cross members */}
      <path d="M90 28 L100 45 L88 68" stroke="#333" strokeWidth="2" fill="none"/>
      <path d="M95 36 L85 55" stroke="#333" strokeWidth="1.5" fill="none"/>
      <path d="M100 45 L95 36" stroke="#444" strokeWidth="1.5" fill="none"/>
      {/* Seat rail */}
      <path d="M90 28 Q78 24 65 26 Q55 28 52 34" stroke="#333" strokeWidth="2.5" fill="none" strokeLinecap="round"/>

      {/* ── REAR SUSPENSION MONOSHOCK ── */}
      <path d="M88 52 Q82 60 80 68" stroke="#777" strokeWidth="3" strokeLinecap="round"/>
      <rect x="82" y="56" width="4" height="10" rx="2" fill="#aaa" />

      {/* ── TANK (angular, 2024 Duke shape) ── */}
      <path d="M90 28 Q100 16 128 16 Q140 16 148 24 L148 42 Q130 44 110 42 Q95 40 88 34Z"
        fill="url(#ktm24Tank)" />
      {/* Tank highlight */}
      <path d="M100 19 Q118 15 135 18 L140 24 Q122 20 105 23Z"
        fill="rgba(255,200,100,0.25)" />
      {/* Tank shroud detail */}
      <path d="M92 34 Q105 36 120 36 Q135 35 145 30"
        stroke="rgba(0,0,0,0.4)" strokeWidth="1" fill="none"/>
      {/* KTM Logo */}
      <rect x="105" y="22" width="30" height="10" rx="2" fill="rgba(0,0,0,0.5)" />
      <text x="108" y="30" fontSize="8" fill="white" fontWeight="900" fontFamily="Arial Black, Arial" letterSpacing="1">KTM</text>

      {/* ── SEAT ── */}
      <path d="M52 34 Q65 26 90 28 Q88 34 85 36 Q72 38 58 40Z"
        fill="#1a1a1a" />
      {/* Seat grip texture */}
      <path d="M57 37 Q70 33 84 34" stroke="#333" strokeWidth="0.8" strokeDasharray="2 2"/>

      {/* ── FAIRING / BELLY PAN (2024 Duke angular) ── */}
      <path d="M88 68 Q90 78 100 80 Q115 80 125 72 L128 60 L110 56 Q95 56 88 68Z"
        fill="#1a1a1a" stroke="#333" strokeWidth="0.5"/>
      {/* Orange belly pan accent */}
      <path d="M90 74 Q100 78 115 76 L120 68 L106 66Z" fill="#ff6b00" opacity="0.8"/>

      {/* ── USD FRONT FORKS (48mm WP APEX) ── */}
      <path d="M148 42 L152 56" stroke="url(#ktm24Fork)" strokeWidth="5" strokeLinecap="round"/>
      <path d="M144 40 L148 56" stroke="url(#ktm24Fork)" strokeWidth="5" strokeLinecap="round"/>
      {/* Fork brace */}
      <path d="M146 52 L152 52" stroke="#aaa" strokeWidth="2"/>
      {/* Fork lower (black) */}
      <path d="M152 56 L152 68" stroke="#333" strokeWidth="5" strokeLinecap="round"/>
      <path d="M148 56 L148 68" stroke="#333" strokeWidth="5" strokeLinecap="round"/>
      {/* Axle */}
      <line x1="148" y1="68" x2="156" y2="68" stroke="#888" strokeWidth="2"/>

      {/* ── FRONT BRAKE DISC ── */}
      <circle cx="152" cy="80" r="14" fill="none" stroke="#555" strokeWidth="2" strokeDasharray="5 3"/>

      {/* ── REAR BRAKE DISC ── */}
      <circle cx="42" cy="80" r="12" fill="none" stroke="#444" strokeWidth="1.5" strokeDasharray="4 3"/>

      {/* ── EXHAUST (single underslung, 2024 Duke) ── */}
      <path d="M88 68 Q92 74 100 76 Q118 78 130 75 Q145 72 155 74"
        fill="none" stroke="url(#ktm24Exhaust)" strokeWidth="5" strokeLinecap="round"/>
      <path d="M88 68 Q92 72 100 73 Q118 75 130 72 Q145 70 155 71"
        fill="none" stroke="#aaa" strokeWidth="2" strokeLinecap="round" opacity="0.5"/>
      {/* Exhaust tip */}
      <ellipse cx="155" cy="73" rx="5" ry="3.5" fill="#777" stroke="#999" strokeWidth="0.5"/>
      <ellipse cx="155" cy="73" rx="3" ry="2" fill="#333"/>
      {/* Heat wrap */}
      <path d="M95 74 Q105 76 115 75" stroke="#888" strokeWidth="1.5" strokeDasharray="2 2"/>

      {/* ── 2024 LED HEADLIGHT (angular Duke style) ── */}
      <path d="M148 24 L158 20 L165 28 L160 38 L148 42Z"
        fill="#1a1a1a" stroke="#333" strokeWidth="0.8"/>
      {/* DRL strip */}
      <path d="M150 26 L162 24 L164 30" stroke="#ffe066" strokeWidth="2" strokeLinecap="round" opacity="0.9"/>
      {/* Main beam */}
      <ellipse cx="157" cy="34" rx="5" ry="4" fill="#d0eeff" opacity="0.8" filter="url(#glowOrange)"/>
      {/* Light glow */}
      <ellipse cx="167" cy="30" rx="8" ry="5" fill="rgba(200,230,255,0.12)" />

      {/* ── REAR LED TAILLIGHT ── */}
      <path d="M52 34 L48 36 L46 40 L50 42 L55 40 L55 36Z" fill="#cc0000" opacity="0.85"/>
      <path d="M48 37 L54 37" stroke="#ff4444" strokeWidth="1" opacity="0.7"/>

      {/* ── WINDSHIELD (small Duke flyscreen) ── */}
      <path d="M148 22 Q153 15 158 18 L162 24 L158 22 Q155 16 150 20Z"
        fill="rgba(180,220,255,0.2)" stroke="rgba(180,220,255,0.4)" strokeWidth="0.5"/>

      {/* ── FOOTPEG ── */}
      <rect x="84" y="70" width="8" height="2" rx="1" fill="#555"/>
      <rect x="138" y="72" width="8" height="2" rx="1" fill="#555"/>

      {/* ── CHAIN ── */}
      <path d="M50 83 Q70 86 88 72" fill="none" stroke="#555" strokeWidth="1.5" strokeDasharray="3 2"/>

      {/* ── "2024" badge ── */}
      <rect x="60" y="30" width="22" height="8" rx="2" fill="rgba(255,107,0,0.15)" stroke="rgba(255,107,0,0.5)" strokeWidth="0.5"/>
      <text x="62" y="36.5" fontSize="5.5" fill="#ff9944" fontFamily="Arial" fontWeight="bold">2024</text>
    </svg>
  );
}

function WalkerSilhouette() {
  return (
    <svg width="28" height="55" viewBox="0 0 28 55" fill="none">
      {/* Head */}
      <circle cx="14" cy="7" r="5" fill="rgba(20,30,50,0.9)" />
      {/* Body */}
      <path d="M14 12 L14 30" stroke="rgba(20,30,50,0.9)" strokeWidth="3.5" strokeLinecap="round" />
      {/* Left arm */}
      <path d="M14 18 L6 26" stroke="rgba(20,30,50,0.9)" strokeWidth="2.5" strokeLinecap="round" />
      {/* Right arm */}
      <path d="M14 18 L22 24" stroke="rgba(20,30,50,0.9)" strokeWidth="2.5" strokeLinecap="round" />
      {/* Left leg */}
      <path d="M14 30 L8 44" stroke="rgba(20,30,50,0.9)" strokeWidth="3" strokeLinecap="round" />
      {/* Right leg */}
      <path d="M14 30 L20 43" stroke="rgba(20,30,50,0.9)" strokeWidth="3" strokeLinecap="round" />
    </svg>
  );
}

function Mountains() {
  return (
    <svg viewBox="0 0 1440 200" fill="none" style={{ width: "100%", position: "absolute", bottom: 0 }}>
      <path d="M0 200 L200 60 L400 160 L600 20 L800 130 L1000 50 L1200 120 L1440 40 L1440 200Z"
        fill="url(#mountGrad)" opacity="0.6" />
      {/* Snow caps */}
      <path d="M600 20 L570 80 L630 80Z" fill="rgba(220,235,245,0.5)" />
      <path d="M1000 50 L975 100 L1025 100Z" fill="rgba(220,235,245,0.4)" />
      <path d="M200 60 L175 110 L225 110Z" fill="rgba(220,235,245,0.3)" />
      <defs>
        <linearGradient id="mountGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#0d2b3e" />
          <stop offset="100%" stopColor="#041525" />
        </linearGradient>
      </defs>
    </svg>
  );
}

export default function BobWebsite() {
  const [activeSection, setActiveSection] = useState("home");

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setActiveSection(id);
  };

  return (
    <>
      <style>{styles}</style>

      {/* NAV */}
      <nav className="nav">
        <div className="nav-logo">BOB</div>
        <ul className="nav-links">
          {["home","about","gallery","contact"].map(s => (
            <li key={s}>
              <a href={`#${s}`} onClick={(e)=>{ e.preventDefault(); scrollTo(s); }}
                style={{ color: activeSection===s ? "var(--accent-gold)" : "" }}>
                {s}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      {/* HERO */}
      <section id="home" className="hero">
        {/* Sky */}
        <div className="sky" />

        {/* Stars */}
        <div className="stars">
          {STARS.map(s => (
            <div key={s.id} className="star" style={{
              left: s.left, top: s.top,
              width: s.size, height: s.size,
              "--dur": s.dur
            }} />
          ))}
        </div>

        {/* Moon */}
        <div className="moon" />

        {/* Mountains */}
        <div className="mountains">
          <Mountains />
        </div>

        {/* Ocean */}
        <div className="ocean-container">
          <div className="ocean-base" />
          <div className="wave-group" style={{ bottom: "60%" }}>
            <div className="wave" style={{ "--speed": "8s", height: 40 }} />
            <div className="wave" style={{ "--speed": "12s", height: 30 }} />
            <div className="wave" style={{ "--speed": "10s", height: 25 }} />
          </div>
          <div className="wave-group" style={{ bottom: "40%" }}>
            <div className="wave" style={{ "--speed": "9s", height: 50 }} />
            <div className="wave" style={{ "--speed": "13s", height: 40 }} />
          </div>
          <div className="wave-group" style={{ bottom: 0 }}>
            <div className="wave" style={{ "--speed": "7s", height: 70 }} />
            <div className="wave" style={{ "--speed": "11s", height: 60 }} />
            <div className="wave" style={{ "--speed": "9s", height: 50 }} />
          </div>
        </div>

        {/* Shore shimmer */}
        <div className="shore" />

        {/* Snow ground */}
        <div className="snow-ground">
          {SPARKLES.map(sp => (
            <div key={sp.id} className="snow-sparkle" style={{
              left: sp.left, bottom: sp.bottom,
              width: sp.size, height: sp.size,
              animationDelay: sp.delay,
            }} />
          ))}
        </div>

        {/* Trees Left */}
        <div className="trees-left">
          <Tree height={160} layerCount={5} />
          <Tree height={120} layerCount={4} />
          <Tree height={190} layerCount={6} />
          <Tree height={100} layerCount={3} />
          <Tree height={140} layerCount={4} />
        </div>

        {/* Trees Right */}
        <div className="trees-right">
          <Tree height={130} layerCount={4} />
          <Tree height={180} layerCount={6} />
          <Tree height={110} layerCount={3} />
          <Tree height={160} layerCount={5} />
          <Tree height={145} layerCount={4} />
        </div>

        {/* BMW + KTM */}
        <div className="scene-objects">
          <BMWCar />
          <KTMBike />
        </div>

        {/* Walking person */}
        <div className="walker">
          <div className="walker-body">
            <WalkerSilhouette />
          </div>
        </div>

        {/* Hero Text */}
        <div className="hero-content">
          <div className="hero-subtitle">Welcome to the world of</div>
          <h1 className="hero-title">BOB</h1>
          <p className="hero-tagline">Ocean . Snow . Speed . Solitude</p>
        </div>
      </section>

      {/* ABOUT */}
      <section id="about">
        <div className="section">
          <h2 className="section-title">About Bob</h2>
          <p>
            A soul drawn to the edge of the ocean where the world goes quiet.
            Between the roar of a BMW engine and the rumble of a KTM, Bob finds
            his peace — walking alone through snowy landscapes, breathing cold
            salt air, chasing the horizon where the sea meets the sky.
          </p>
          <div className="cards" style={{ marginTop: "2.5rem" }}>
            {[
              { icon: "🏎️", title: "BMW Enthusiast", desc: "A deep passion for German engineering — precision, power, and elegance on every road." },
              { icon: "🏍️", title: "KTM 390 Duke 2024", desc: "The 2024 KTM 390 Duke — trellis frame, 48mm WP APEX USD forks, angular LED fairing and raw orange power. Pure READY TO RACE DNA." },
              { icon: "🌊", title: "Ocean Soul", desc: "The sea is where thoughts clear. Bob finds clarity where waves meet frozen shores." },
              { icon: "🌲", title: "Winter Wanderer", desc: "Snow-covered forests and silent paths — solitude that speaks louder than noise." },
            ].map(card => (
              <div key={card.title} className="card">
                <div className="card-icon">{card.icon}</div>
                <div className="card-title">{card.title}</div>
                <p>{card.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* GALLERY */}
      <section id="gallery" style={{ background: "rgba(6,37,80,0.15)" }}>
        <div className="section">
          <h2 className="section-title">Gallery</h2>
          <p>A visual journey through Bob's world — where machines meet nature and the journey never ends.</p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "1rem", marginTop: "2rem" }}>
            {[
              { bg: "linear-gradient(135deg, #0a1f3d, #1a6090)", label: "Ocean Drive" },
              { bg: "linear-gradient(135deg, #0d2b1e, #1a4a2e)", label: "Forest Path" },
              { bg: "linear-gradient(135deg, #cc4400, #ff6b00)", label: "KTM 390 Duke '24" },
              { bg: "linear-gradient(135deg, #1a3a5c, #2a5a8c)", label: "BMW Journey" },
              { bg: "linear-gradient(135deg, #020c1b, #062550)", label: "Midnight Waves" },
              { bg: "linear-gradient(135deg, #c8dce8, #6a8fa0)", label: "Snowfall" },
            ].map(item => (
              <div key={item.label} style={{
                background: item.bg, borderRadius: 4,
                height: 160, display: "flex", alignItems: "flex-end",
                padding: "1rem", border: "1px solid rgba(201,162,39,0.1)",
                transition: "transform 0.3s, border-color 0.3s",
                cursor: "pointer",
              }}
                onMouseEnter={e => { e.currentTarget.style.transform = "scale(1.03)"; e.currentTarget.style.borderColor = "rgba(201,162,39,0.4)"; }}
                onMouseLeave={e => { e.currentTarget.style.transform = "scale(1)"; e.currentTarget.style.borderColor = "rgba(201,162,39,0.1)"; }}
              >
                <span style={{ fontFamily: "'Cinzel', serif", fontSize: "0.8rem", letterSpacing: "2px", color: "rgba(255,255,255,0.8)" }}>
                  {item.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact">
        <div className="section">
          <h2 className="section-title">Contact</h2>
          <p>Reach out to Bob — whether it's about rides, routes, or the road less traveled.</p>
          <div className="contact-grid">
            {[
              { label: "Email", value: "bob@oceanroads.com" },
              { label: "Phone", value: "+1 (555) 000-0000" },
              { label: "Location", value: "Pacific Northwest, USA" },
              { label: "Instagram", value: "@bob_rides_ktm" },
            ].map(item => (
              <div key={item.label} className="contact-item">
                <div>
                  <div className="contact-label">{item.label}</div>
                  <div className="contact-value">{item.value}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="footer">
        <p>© 2026 Bob — Ocean · Snow · Speed · Solitude</p>
      </footer>
    </>
  );
}
