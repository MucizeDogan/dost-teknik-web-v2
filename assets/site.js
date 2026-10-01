document.documentElement.classList.add('js');

const toggle = document.querySelector('.nav-toggle');
const nav = document.getElementById('primary-nav');
const backdrop = document.querySelector('.menu-backdrop');
const closeButton = document.querySelector('.menu-close');
const mobileMenu = window.matchMedia('(max-width: 899px)');

function setMenu(open, { returnFocus = false } = {}) {
  if (!toggle || !nav || !backdrop) return;
  nav.classList.toggle('open', open);
  backdrop.hidden = !open;
  document.body.classList.toggle('nav-open', open);
  toggle.setAttribute('aria-expanded', String(open));
  toggle.setAttribute('aria-label', open ? 'Menüyü kapat' : 'Menüyü aç');
  const text = toggle.querySelector('span');
  if (text) text.textContent = open ? 'Kapat' : 'Menü';
  if (open) closeButton?.focus();
  else if (returnFocus) toggle.focus();
}

toggle?.addEventListener('click', () => {
  setMenu(toggle.getAttribute('aria-expanded') !== 'true');
});
closeButton?.addEventListener('click', () => setMenu(false, { returnFocus: true }));
backdrop?.addEventListener('click', () => setMenu(false, { returnFocus: true }));

document.addEventListener('keydown', event => {
  if (!nav?.classList.contains('open')) return;
  if (event.key === 'Escape') {
    event.preventDefault();
    setMenu(false, { returnFocus: true });
    return;
  }
  if (event.key !== 'Tab') return;
  const focusable = [...nav.querySelectorAll('a[href], button:not([disabled])')];
  if (!focusable.length) return;
  const first = focusable[0];
  const last = focusable[focusable.length - 1];
  if (event.shiftKey && document.activeElement === first) {
    event.preventDefault();
    last.focus();
  } else if (!event.shiftKey && document.activeElement === last) {
    event.preventDefault();
    first.focus();
  }
});

nav?.querySelectorAll('a').forEach(anchor => anchor.addEventListener('click', () => {
  if (mobileMenu.matches) setMenu(false);
}));

mobileMenu.addEventListener('change', event => {
  if (!event.matches) setMenu(false);
});
