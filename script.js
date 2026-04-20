/* Custom cursor */
const cursor = document.getElementById('cursor');
const ring = document.getElementById('cursorRing');

let mx = 0;
let my = 0;
let rx = 0;
let ry = 0;

document.addEventListener('mousemove', (e) => {
  mx = e.clientX;
  my = e.clientY;

  if (cursor) {
    cursor.style.left = `${mx}px`;
    cursor.style.top = `${my}px`;
  }
});

function tick() {
  rx += (mx - rx) * 0.1;
  ry += (my - ry) * 0.1;

  if (ring) {
    ring.style.left = `${rx}px`;
    ring.style.top = `${ry}px`;
  }

  requestAnimationFrame(tick);
}
tick();

document.querySelectorAll('a, button, .video-play').forEach((el) => {
  el.addEventListener('mouseenter', () => {
    if (cursor && ring) {
      cursor.style.width = '4px';
      cursor.style.height = '4px';
      ring.style.width = '52px';
      ring.style.height = '52px';
    }
  });

  el.addEventListener('mouseleave', () => {
    if (cursor && ring) {
      cursor.style.width = '8px';
      cursor.style.height = '8px';
      ring.style.width = '32px';
      ring.style.height = '32px';
    }
  });
});

/* Wordmark parallax */
const wm = document.getElementById('heroWordmark');

if (wm) {
  window.addEventListener(
    'scroll',
    () => {
      const y = window.scrollY;
      wm.style.transform = `translateY(${y * 0.32}px)`;
      wm.style.opacity = Math.max(0, 1 - y / 460);
    },
    { passive: true }
  );
}

/* Nav scroll */
const nav = document.getElementById('navbar');

window.addEventListener('scroll', () => {
  if (nav) {
    nav.classList.toggle('scrolled', window.scrollY > 50);
  }
});

/* Reveal on scroll */
const revObs = new IntersectionObserver(
  (entries, obs) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        obs.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.08 }
);

document.querySelectorAll('.reveal').forEach((el) => revObs.observe(el));
