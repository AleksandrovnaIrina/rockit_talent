/* ============================================================
   ROCKIT TALENT — INTRO LOADER ANIMATION (index.html only)
   Particles assemble into logo, then page content reveals.
   ============================================================ */
(function () {
  'use strict';

  const loader = document.getElementById('loader');
  if (!loader) return;

  /* ── Viewport constants captured once ── */
  const vw = window.innerWidth;
  const vh = window.innerHeight;
  const cx = vw / 2;
  const cy = vh / 2;

  /* ── Lock scroll during intro ── */
  document.body.style.overflow = 'hidden';

  /* ── Build glow burst (center glow as particles converge) ── */
  const glowEl = document.createElement('div');
  glowEl.className = 'loader__glow-burst';
  loader.appendChild(glowEl);

  /* ── Build logo ── */
  const logoEl = document.createElement('div');
  logoEl.className = 'loader__logo';
  logoEl.innerHTML =
    '<span class="loader__bolt">⚡</span>' +
    '<span class="loader__word">Rockit</span>' +
    '<span class="loader__talent">TALENT</span>';
  loader.appendChild(logoEl);

  /* ── Build particles ── */
  const PARTICLE_COUNT = 58;
  const PURPLE = '#7134E8';
  const LIME   = '#B5E726';
  const particles = [];

  for (let i = 0; i < PARTICLE_COUNT; i++) {
    const el = document.createElement('div');
    el.className = 'loader__particle';
    /* Mostly purple, a few lime accents */
    el.style.background = (i % 9 === 0) ? LIME : PURPLE;
    /* Mix of sizes: small 2-4px, a few larger 5-8px */
    const size = (i % 7 === 0) ? (5 + Math.random() * 3) : (2 + Math.random() * 2.5);
    el.style.width  = size + 'px';
    el.style.height = size + 'px';
    loader.appendChild(el);
    particles.push(el);
  }

  /* ── Initial states ── */
  /* Particles: scattered randomly across the viewport via GSAP x/y transforms.
     position: fixed + left:0/top:0 + transform = viewport-relative position. */
  gsap.set(particles, {
    x: () => Math.random() * vw,
    y: () => Math.random() * vh,
    opacity: 0,
    scale: 0,
  });
  gsap.set(glowEl,  { opacity: 0 });
  gsap.set(logoEl,  { opacity: 0, scale: 0.82, y: 12 });

  /* ── Main intro timeline ── */
  const tl = gsap.timeline();

  /* Phase 1: Particles appear — scattered across screen, staggered */
  tl.to(particles, {
    opacity: 1,
    scale: 1,
    duration: 0.32,
    ease: 'back.out(2.5)',
    stagger: { each: 0.017, from: 'random' },
  });

  /* Phase 2: Particles drift toward viewport center (loose, organic cloud) */
  tl.to(particles, {
    x: () => cx + (Math.random() - 0.5) * 200,
    y: () => cy + (Math.random() - 0.5) * 110,
    duration: 0.9,
    ease: 'power2.inOut',
    stagger: { each: 0.02, from: 'random' },
  }, '+=0.04');

  /* Phase 3: Purple glow ignites at center as particles converge */
  tl.to(glowEl, { opacity: 1, duration: 0.38, ease: 'power2.out' }, '-=0.42');

  /* Phase 4: Particles tighten to logo center, shrink and vanish */
  tl.to(particles, {
    x: () => cx + (Math.random() - 0.5) * 14,
    y: () => cy + (Math.random() - 0.5) * 14,
    scale: 0,
    opacity: 0,
    duration: 0.36,
    ease: 'power4.in',
    stagger: { each: 0.006, from: 'random' },
  }, '-=0.22');

  /* Phase 5: Logo assembles from the glow burst */
  tl.to(logoEl, {
    opacity: 1,
    scale: 1,
    y: 0,
    duration: 0.52,
    ease: 'back.out(1.6)',
  }, '-=0.06');

  /* Phase 6: Glow dissolves — logo stands on its own */
  tl.to(glowEl, { opacity: 0, duration: 0.45, ease: 'power2.in' }, '-=0.2');

  /* Phase 7: Brief proud pulse on the logo */
  tl.to(logoEl, {
    scale: 1.05,
    duration: 0.18,
    ease: 'sine.out',
    yoyo: true,
    repeat: 1,
  }, '+=0.22');

  /* Phase 8: Kick off hero animation while loader is still fading
     (creates a nice cross-fade: page content rises as overlay dissolves) */
  tl.add(() => {
    if (typeof window.__playHero === 'function') window.__playHero();
  });

  /* Phase 9: Loader fades to transparent */
  tl.to(loader, {
    opacity: 0,
    duration: 0.58,
    ease: 'power2.inOut',
  }, '+=0.12');

  /* Phase 10: Remove loader from DOM and restore scroll */
  tl.add(() => {
    document.body.style.overflow = '';
    loader.remove();
  });

}());
