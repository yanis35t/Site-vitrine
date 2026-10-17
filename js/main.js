const MENUS = [
  {
    id: 'equilibre', name: 'Équilibre', idea: 'Le repas complet de tous les jours.',
    dishes: [
      { id: 'bowl-poulet', name: 'Bowl poulet, quinoa, avocat', desc: 'Poulet grillé, quinoa, avocat, concombre, sauce au citron.', kcal: 620, prot: 38, price: 11.5, colors: ['#D9A066', '#F2D16B', '#7FB069', '#FFF4DF'] },
      { id: 'riz-saumon', name: 'Riz complet, saumon, edamame', desc: 'Riz complet, saumon snacké, edamame, gingembre mariné.', kcal: 580, prot: 32, price: 12.5, colors: ['#F28C6B', '#7CC6B2', '#A8D672', '#FFF4DF'] },
    ],
  },
  {
    id: 'proteines', name: 'Protéines', idea: 'Pour celles et ceux qui s’entraînent.',
    dishes: [
      { id: 'poulet-marine', name: 'Poulet mariné, patate douce, brocoli', desc: 'Blanc de poulet mariné, patate douce rôtie, brocoli vapeur.', kcal: 710, prot: 46, price: 12.9, colors: ['#E0A267', '#F4A259', '#7FB069', '#FFF4DF'] },
      { id: 'thon-lentilles', name: 'Thon, pâtes de lentilles, courgette', desc: 'Thon mi-cuit, pâtes de lentilles, courgette sautée.', kcal: 650, prot: 44, price: 13.5, colors: ['#E7857A', '#D9D6C8', '#8BB96E', '#FFF4DF'] },
    ],
  },
  {
    id: 'vegetal', name: 'Végétal', idea: 'Sans viande ni poisson.',
    dishes: [
      { id: 'falafels', name: 'Falafels, houmous, taboulé', desc: 'Falafels au four, houmous maison, taboulé à la menthe.', kcal: 590, prot: 21, price: 9.5, colors: ['#B9895A', '#D8C7A0', '#8FBF6A', '#FFF4DF'] },
      { id: 'curry-pois-chiches', name: 'Curry de pois chiches, riz basmati', desc: 'Pois chiches au lait de coco et curry doux, riz basmati.', kcal: 560, prot: 19, price: 8.9, colors: ['#F2B233', '#E4A03A', '#6FAE64', '#FFF4DF'] },
    ],
  },
  {
    id: 'leger', name: 'Léger', idea: '450 kcal maximum.',
    dishes: [
      { id: 'salade-lentilles', name: 'Salade de lentilles, feta, grenade', desc: 'Lentilles vertes, feta, grenade, menthe, vinaigrette au citron.', kcal: 380, prot: 18, price: 7.5, colors: ['#7A9E5C', '#B65C6B', '#D7CFBF', '#FFF4DF'] },
      { id: 'soupe-oeuf', name: 'Soupe de légumes, œuf mollet', desc: 'Bouillon de légumes, courgette, carotte, œuf mollet.', kcal: 290, prot: 14, price: 5.5, colors: ['#F5C96B', '#8BBF6B', '#E9A46A', '#FFF4DF'] },
    ],
  },
  {
    id: 'petit-dej', name: 'Petit-déj', idea: 'À commander avant 10 h.', note: 'Avant 10 h',
    dishes: [
      { id: 'porridge', name: 'Porridge pomme-cannelle', desc: 'Flocons d’avoine, pomme rôtie, cannelle, noix.', kcal: 340, prot: 9, price: 5.5, colors: ['#E9D3A0', '#E0A25B', '#A3C47B', '#FFF4DF'] },
      { id: 'yaourt-granola', name: 'Yaourt grec, granola, fruits rouges', desc: 'Yaourt grec, granola maison, fruits rouges.', kcal: 360, prot: 16, price: 6, colors: ['#F7F3EC', '#D9557A', '#B98CCB', '#FFF4DF'] },
    ],
  },
];

const DISHES = Object.fromEntries(MENUS.flatMap((m) => m.dishes.map((d) => [d.id, d])));
const FREE_DELIVERY_FROM = 20;
const euro = new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' });

const $ = (selector) => document.querySelector(selector);
const mobileQuery = matchMedia('(max-width: 899px)');
const reduceQuery = matchMedia('(prefers-reduced-motion: reduce)');
const isMobile = () => mobileQuery.matches;

const cart = new Map(); // identifiant du plat -> quantité
let activeMenu = MENUS[0].id;
let openSheet = null;
let returnFocus = null;

const tabsEl = $('#tabs');
const ideaEl = $('#menu-idea');
const dishesEl = $('#dishes');
const veil = $('#veil');
const cartEl = $('#panier');
const cartLink = $('#cart-link');
const tabCart = $('#tab-cart');
const tabBadge = $('#tab-badge');
const cartLinesEl = $('#cart-lines');
const cartEmptyEl = $('#cart-empty');
const cartDeliveryEl = $('#cart-delivery');
const cartSumEl = $('#cart-sum');
const cartStatusEl = $('#cart-status');
const detailEl = $('#detail');

const bowlStyle = ([a, b, c, d]) => `--a:${a};--b:${b};--c:${c};--d:${d}`;
const cartCount = () => [...cart.values()].reduce((sum, qty) => sum + qty, 0);
const cartTotal = () => [...cart].reduce((sum, [id, qty]) => sum + DISHES[id].price * qty, 0);

function renderTabs() {
  tabsEl.innerHTML = MENUS.map((m) => `
    <button class="tab" type="button" role="tab" id="tab-${m.id}" data-menu="${m.id}"
      aria-controls="menu-panel" aria-selected="${m.id === activeMenu}">${m.name}</button>`).join('');
}

function dishHTML(d) {
  return `
    <li class="dish">
      <div class="bowl" style="${bowlStyle(d.colors)}" aria-hidden="true"></div>
      <div class="dish__info">
        <button class="dish__name" type="button" data-detail="${d.id}">${d.name}</button>
        <p class="dish__desc">${d.desc}</p>
        <p class="dish__stats">
          <span class="tag">${d.kcal} kcal</span>
          <span class="tag">${d.prot} g de protéines</span>
        </p>
      </div>
      <div class="dish__buy">
        <span class="dish__price">${euro.format(d.price)}</span>
        <button class="add" type="button" data-add="${d.id}" aria-label="Ajouter ${d.name} au panier">
          <span class="add__plus" aria-hidden="true">+</span>
          <span class="add__label">Ajouter</span>
        </button>
      </div>
    </li>`;
}

function renderMenu() {
  const menu = MENUS.find((m) => m.id === activeMenu);
  ideaEl.innerHTML = menu.note
    ? `${menu.idea}<span class="menu__note">${menu.note}</span>`
    : menu.idea;
  dishesEl.innerHTML = menu.dishes.map(dishHTML).join('');
  document.getElementById('menu-panel').setAttribute('aria-labelledby', `tab-${menu.id}`);
}

function deliveryMessage(total) {
  if (total === 0) return `Livraison offerte dès ${FREE_DELIVERY_FROM} €.`;
  const rest = Math.round(FREE_DELIVERY_FROM * 100 - total * 100) / 100;
  return rest > 0
    ? `Plus que ${euro.format(rest)} pour la livraison offerte.`
    : 'Livraison offerte. Merci !';
}

function renderCart() {
  const lines = [...cart].map(([id, qty]) => ({ dish: DISHES[id], qty }));
  const count = cartCount();
  const total = cartTotal();

  cartLinesEl.innerHTML = lines.map(({ dish, qty }) => `
    <li class="cart__line">
      <span class="cart__line-name">${dish.name}</span>
      <span class="qty">
        <button type="button" data-qty="${dish.id}" data-delta="-1" aria-label="Retirer un ${dish.name}">−</button>
        <output aria-label="Quantité">${qty}</output>
        <button type="button" data-qty="${dish.id}" data-delta="1" aria-label="Ajouter un ${dish.name}">+</button>
      </span>
      <span class="cart__line-price">${euro.format(dish.price * qty)}</span>
    </li>`).join('');

  cartEmptyEl.hidden = count > 0;
  cartDeliveryEl.textContent = deliveryMessage(total);
  cartSumEl.textContent = euro.format(total);
  tabBadge.textContent = count;
  tabBadge.hidden = count === 0;
  cartLink.textContent = isMobile()
    ? 'Panier'
    : count > 0 ? `Panier (${count})` : 'Commander';
}

function changeQty(id, delta) {
  const next = (cart.get(id) || 0) + delta;
  if (next <= 0) cart.delete(id);
  else cart.set(id, next);
  renderCart();
}

function showSheet(sheet, trigger) {
  if (!isMobile()) return;
  if (openSheet) closeSheet(openSheet, false);
  openSheet = sheet;
  returnFocus = trigger;
  sheet.classList.add('is-open');
  veil.classList.add('is-on');
  sheet.querySelector('h2').focus({ preventScroll: true });
}

function closeSheet(sheet = openSheet, restoreFocus = true) {
  if (!sheet) return;
  sheet.classList.remove('is-open');
  sheet.style.transform = '';
  veil.classList.remove('is-on');
  if (sheet === openSheet) openSheet = null;
  if (restoreFocus && returnFocus) returnFocus.focus({ preventScroll: true });
  returnFocus = null;
}

function openDetail(id, trigger) {
  const d = DISHES[id];
  $('#detail-bowl').style.cssText = bowlStyle(d.colors);
  $('#detail-titre').textContent = d.name;
  $('#detail-desc').textContent = d.desc;
  $('#detail-stats').innerHTML = `<span class="tag">${d.kcal} kcal</span><span class="tag">${d.prot} g de protéines</span>`;
  $('#detail-price').textContent = euro.format(d.price);
  const add = $('#detail-add');
  add.dataset.add = id;
  add.setAttribute('aria-label', `Ajouter ${d.name} au panier`);
  showSheet(detailEl, trigger);
}

/* Feuille mobile : suivi du doigt 1:1, décision selon l'élan (§9) */
function bindDrag(sheet) {
  const grab = sheet.querySelector('.sheet__grab');
  let dragging = false;
  let startY = 0;
  let dy = 0;
  let lastY = 0;
  let lastT = 0;
  let velocity = 0;

  grab.addEventListener('pointerdown', (e) => {
    if (!isMobile() || reduceQuery.matches) return;
    dragging = true;
    startY = lastY = e.clientY;
    lastT = e.timeStamp;
    dy = 0;
    grab.setPointerCapture(e.pointerId);
    sheet.style.transition = 'none';
  });

  grab.addEventListener('pointermove', (e) => {
    if (!dragging) return;
    dy = Math.max(0, e.clientY - startY);
    sheet.style.transform = `translateY(${dy}px)`;
    velocity = ((e.clientY - lastY) / Math.max(1, e.timeStamp - lastT)) * 1000; // px/s
    lastY = e.clientY;
    lastT = e.timeStamp;
  });

  const release = () => {
    if (!dragging) return;
    dragging = false;
    const projected = dy + Math.max(0, velocity) * 0.22;
    sheet.style.transition = '';
    sheet.style.transform = '';
    if (projected > sheet.offsetHeight * 0.4) closeSheet(sheet);
  };
  grab.addEventListener('pointerup', release);
  grab.addEventListener('pointercancel', release);
}

/* Événements */
document.addEventListener('click', (e) => {
  const add = e.target.closest('[data-add]');
  if (add) {
    changeQty(add.dataset.add, 1);
    if (add.closest('#detail')) closeSheet(detailEl);
    return;
  }

  const qty = e.target.closest('[data-qty]');
  if (qty) {
    changeQty(qty.dataset.qty, Number(qty.dataset.delta));
    return;
  }

  const detail = e.target.closest('[data-detail]');
  if (detail && isMobile()) {
    openDetail(detail.dataset.detail, detail);
    return;
  }

  const tab = e.target.closest('[data-menu]');
  if (tab) {
    activeMenu = tab.dataset.menu;
    renderTabs();
    renderMenu();
    return;
  }

  if (e.target.closest('[data-close]')) closeSheet();
});

tabsEl.addEventListener('keydown', (e) => {
  if (e.key !== 'ArrowRight' && e.key !== 'ArrowLeft') return;
  const i = MENUS.findIndex((m) => m.id === activeMenu);
  const next = MENUS[(i + (e.key === 'ArrowRight' ? 1 : MENUS.length - 1)) % MENUS.length];
  activeMenu = next.id;
  renderTabs();
  renderMenu();
  $(`#tab-${next.id}`).focus();
});

veil.addEventListener('click', () => closeSheet());

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeSheet();
});

cartLink.addEventListener('click', () => {
  if (isMobile()) {
    showSheet(cartEl, cartLink);
    return;
  }
  const target = cartCount() > 0 ? cartEl : $('#menus');
  target.scrollIntoView({ block: 'start' });
});

tabCart.addEventListener('click', () => showSheet(cartEl, tabCart));

$('#cart-order').addEventListener('click', () => {
  cartStatusEl.textContent = cartCount() > 0
    ? 'Démo : rien n’est commandé.'
    : 'Ajoute d’abord un plat à ton panier.';
});

mobileQuery.addEventListener('change', () => {
  if (!isMobile() && openSheet) closeSheet(openSheet, false);
  renderCart();
});

/* Barre d'onglets : onglet actif selon la section visible */
const tabLinks = document.querySelectorAll('.tabbar__link[href^="#"]');
const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    tabLinks.forEach((link) => {
      link.setAttribute('aria-current', String(link.getAttribute('href') === `#${entry.target.id}`));
    });
  });
}, { rootMargin: '-45% 0px -50% 0px' });
['menus', 'histoire'].forEach((id) => sectionObserver.observe(document.getElementById(id)));

bindDrag(cartEl);
bindDrag(detailEl);
renderTabs();
renderMenu();
renderCart();
