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

const brandSearch = document.getElementById('brand-search');
if (brandSearch) {
  const entries = [...document.querySelectorAll('[data-brand-name]')];
  const groups = [...document.querySelectorAll('.brand-group')];
  const count = document.getElementById('brand-search-count');
  const empty = document.createElement('p');
  empty.className = 'search-empty';
  empty.hidden = true;
  empty.textContent = 'Bu aramayla eşleşen marka bulunamadı.';
  document.getElementById('brand-directory')?.append(empty);
  const normalize = value => value.toLocaleLowerCase('tr').normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/ı/g, 'i');
  brandSearch.addEventListener('input', () => {
    const query = normalize(brandSearch.value.trim());
    let visible = 0;
    for (const entry of entries) {
      const show = normalize(entry.dataset.brandName).includes(query);
      entry.hidden = !show;
      if (show) visible++;
    }
    for (const group of groups) group.hidden = !group.querySelector('[data-brand-name]:not([hidden])');
    if (count) count.textContent = query ? `${visible} / ${entries.length} marka` : `${entries.length} marka`;
    empty.hidden = visible !== 0;
  });
}
