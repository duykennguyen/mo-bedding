/* =========================================================
   MÔ BEDDING — script dùng chung cho mọi trang
   - Header / footer dùng chung
   - Song ngữ VI / EN (data-en trên từng phần tử)
   - Giỏ hàng (localStorage), slider hero, hiệu ứng cuộn
   - Dữ liệu sản phẩm + bộ phối giường (bundle builder)
   ========================================================= */

const U = (id, w = 1200) => `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=75`;

/* Ảnh minh hoạ tạm (Unsplash). Thay bằng ảnh thật của Mô khi có. */
const IMG = {
  moHero: 'assets/img/hero-mo.jpg',
  moPillows: 'assets/img/mo-pillows.jpg',
  moThrow: 'assets/img/mo-throw.jpg',
  sunRoom: U('1642204525589-978a8117a6e5'),
  windowBed: U('1638531540340-9c3d9f3c3077'),
  sleeper: U('1543076599-c70d85801510'),
  plantBed: U('1606855637183-ea2a00b6f15f'),
  trayBed: U('1618111415065-c20b4e1afd41'),
  pinkBed: U('1714175247782-64c19c77c705'),
  hotelBed: U('1582582621959-48d27397dc69'),
  whiteSheets: U('1614226114676-8e02ac5f4763'),
  rumpled: U('1542728929-2b5d9a0c8d48'),
  pillowsWindow: U('1653601983541-a70f6f1e715b'),
  pillowsWhite: U('1564019472017-b51398323027'),
  pillowGrey: U('1600414428640-f78a67c2aa3b'),
  pillowsWarm: U('1638127815875-d8c930a8d467'),
  pillowWarm: U('1652161853855-005106816b9f'),
  comforter: U('1685122121697-f4515ea401b0'),
  foldedStack: U('1596433904500-97b901c5d274'),
  foldedPlant: U('1596433904493-c7ae3d6d179f'),
  foldedColor: U('1596433904747-e8b061219a71'),
  fabrics: U('1721134580344-cdc9c0ec8cbc'),
  creamFabric: U('1634665810235-011d663754e7'),
  greyLinen: U('1518019671582-55004f1bc9ab'),
  bamboo: U('1531021713651-fdd4ac075ac1'),
  coffeeKnit: U('1550523303-e9e27624ed35'),
  breakfast: U('1675125530909-15213f01a9e1'),
  coffeeBed: U('1639677322786-3c8154ebd750'),
  plantSun: U('1615884241058-b8e50a21bc3e'),
  roomVase: U('1682941529757-f3f1e808ba5a'),
};

/* Màu vải — tên riêng giữ nguyên tiếng Anh ở cả hai bản */
const COLORS = {
  Milk:   '#f4efe6',
  Oat:    '#e4d6c1',
  Clay:   '#d6a592',
  Brick:  '#9a4b3b',
  Sage:   '#aab2a0',
  Fog:    '#b8c1c3',
  Ink:    '#4a4f55',
};

const PRODUCTS = [
  { id: 'nha-fitted', name: 'Nhã Fitted Sheet', type: 'sheet', coll: 'Nhã', price: 1290000, colors: ['Milk', 'Oat', 'Sage', 'Fog'], img: [IMG.whiteSheets, IMG.foldedStack], tag: 'Bestseller' },
  { id: 'nha-duvet', name: 'Nhã Duvet Cover', type: 'duvet', coll: 'Nhã', price: 1890000, colors: ['Milk', 'Oat', 'Sage'], img: [IMG.comforter, IMG.plantBed] },
  { id: 'hush-pillow', name: 'Hush Hush Pillowcase Pair', type: 'pillow', coll: 'Hush Hush', price: 690000, colors: ['Oat', 'Clay', 'Brick', 'Ink'], img: [IMG.moPillows, IMG.pillowsWarm], tag: 'Hand-drawn' },
  { id: 'hush-duvet', name: 'Hush Hush Duvet Cover', type: 'duvet', coll: 'Hush Hush', price: 1990000, colors: ['Fog', 'Clay', 'Ink'], img: [IMG.pillowWarm, IMG.windowBed] },
  { id: 'rutinh-set', name: 'Ru Tình Bedding Set', type: 'set', coll: 'Ru Tình', price: 3990000, colors: ['Clay', 'Oat', 'Milk'], img: [IMG.moHero, IMG.moPillows], tag: 'New' },
  { id: 'rutinh-throw', name: 'Ru Tình Painted Throw', type: 'set', coll: 'Ru Tình', price: 1490000, colors: ['Clay', 'Milk'], img: [IMG.moThrow, IMG.pinkBed] },
  { id: 'cloud-insert', name: 'Cloud Duvet Insert', type: 'insert', coll: 'Essentials', price: 1590000, colors: ['Milk'], img: [IMG.rumpled, IMG.hotelBed] },
  { id: 'cloud-pillow', name: 'Cloud Pillow Insert', type: 'insert', coll: 'Essentials', price: 490000, colors: ['Milk'], img: [IMG.pillowsWhite, IMG.pillowGrey] },
  { id: 'nha-pillow', name: 'Nhã Pillowcase Pair', type: 'pillow', coll: 'Nhã', price: 590000, colors: ['Milk', 'Oat', 'Sage', 'Fog', 'Ink'], img: [IMG.pillowsWindow, IMG.foldedColor] },
  { id: 'hush-fitted', name: 'Hush Hush Fitted Sheet', type: 'sheet', coll: 'Hush Hush', price: 1390000, colors: ['Fog', 'Clay', 'Brick'], img: [IMG.greyLinen, IMG.foldedPlant] },
];

const TYPES = {
  sheet:  { vi: 'Ga trải giường', en: 'Fitted sheets' },
  duvet:  { vi: 'Vỏ chăn', en: 'Duvet covers' },
  pillow: { vi: 'Vỏ gối', en: 'Pillowcases' },
  insert: { vi: 'Ruột chăn & gối', en: 'Inserts' },
  set:    { vi: 'Bộ ga gối', en: 'Bedding sets' },
};

const fmt = n => n.toLocaleString('vi-VN') + '₫';
const $ = (s, el = document) => el.querySelector(s);
const $$ = (s, el = document) => [...el.querySelectorAll(s)];
const store = {
  get(k, d) { try { const v = localStorage.getItem(k); return v === null ? d : JSON.parse(v); } catch { return d; } },
  set(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch {} },
};
let LANG = store.get('mo-lang', 'vi');
const t = (vi, en) => (LANG === 'en' ? en : vi);

/* ---------- Icon ---------- */
const ICON = {
  search: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4"><circle cx="11" cy="11" r="6.5"/><path d="m20 20-4.2-4.2"/></svg>',
  bag: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4"><path d="M5 8h14l-1 12H6L5 8Z"/><path d="M9 8V6.5a3 3 0 0 1 6 0V8"/></svg>',
  user: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4"><circle cx="12" cy="8.5" r="3.5"/><path d="M5 20c1.2-3.6 4-5 7-5s5.8 1.4 7 5"/></svg>',
  menu: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4"><path d="M4 7h16M4 12h16M4 17h16"/></svg>',
  close: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4"><path d="m6 6 12 12M18 6 6 18"/></svg>',
  arrow: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M4 12h15m-5-6 6 6-6 6"/></svg>',
  left: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M20 12H5m5-6-6 6 6 6"/></svg>',
  check: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m5 12 5 5 9-10"/></svg>',
  fb: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M13.5 21v-7.5H16l.4-3h-2.9V8.6c0-.9.3-1.5 1.5-1.5h1.5V4.4c-.3 0-1.2-.1-2.2-.1-2.2 0-3.7 1.3-3.7 3.8v2.4H8.1v3h2.5V21h2.9Z"/></svg>',
  ig: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><rect x="3.5" y="3.5" width="17" height="17" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.3" cy="6.7" r=".8" fill="currentColor"/></svg>',
  tt: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M16.6 3c.4 2.1 1.7 3.5 3.9 3.7v3c-1.4.1-2.7-.3-3.9-1.1v6.2c0 3.4-2.5 5.7-5.6 5.7A5.5 5.5 0 0 1 5.5 15c0-3.3 2.9-5.8 6.3-5.4v3.1c-1.5-.4-3.2.6-3.2 2.3 0 1.4 1.1 2.5 2.5 2.5s2.5-1.1 2.5-2.6V3h3Z"/></svg>',
};

/* ---------- Header & footer dùng chung ---------- */
const NAV = [
  ['collections.html', 'Bộ sưu tập', 'Collections', 'collections'],
  ['shop.html', 'Sản phẩm', 'Shop', 'shop'],
  ['about.html', 'Chuyện của Mô', 'Our Story', 'about'],
  ['about.html#nghe-thuat-lam-giuong', 'Nghệ thuật làm giường', 'The Art of Bed-making', 'bedart'],
  ['stories.html', 'Mô Stories', 'Mô Stories', 'stories'],
];

function renderHeader() {
  const host = $('#site-header');
  if (!host) return;
  const page = document.body.dataset.page;
  const links = NAV.map(([href, vi, en, key]) =>
    `<a href="${href}" data-en="${en}" ${key === page ? 'aria-current="page"' : ''}>${vi}</a>`).join('');
  host.outerHTML = `
  <div class="announce" data-en="Free nationwide shipping · 30-day easy returns">Miễn phí giao hàng toàn quốc · Đổi trả dễ dàng trong 30 ngày</div>
  <header class="header" id="header">
    <div class="wrap header__row">
      <button class="icon-btn burger" id="burger" aria-label="Menu">${ICON.menu}</button>
      <a class="logo" href="index.html" aria-label="Mô Bedding — Trang chủ">
        <img src="assets/img/logo-mark.png" alt="Mô">
        <span class="logo__word">Bedding</span>
      </a>
      <nav class="nav" aria-label="Menu chính">${links}</nav>
      <div class="actions">
        <button class="icon-btn" id="searchBtn" aria-label="Tìm kiếm" data-en-aria="Search">${ICON.search}</button>
        <div class="lang lang--desktop" role="group" aria-label="Ngôn ngữ">
          <button data-lang="vi">VI</button><button data-lang="en">EN</button>
        </div>
        <a class="icon-btn" href="#" aria-label="Tài khoản" data-en-aria="Account">${ICON.user}</a>
        <a class="icon-btn" href="#" id="cartBtn" aria-label="Giỏ hàng" data-en-aria="Cart">${ICON.bag}<span class="cart-count" id="cartCount">0</span></a>
      </div>
    </div>
    <div class="search-panel" id="searchPanel">
      <div class="wrap">
        <form action="shop.html" role="search">
          ${ICON.search.replace('<svg', '<svg width="22" height="22"')}
          <input name="q" type="search" placeholder="Bạn đang tìm gì cho giấc ngủ?" data-en-ph="What are you looking for?" autocomplete="off">
          <button type="button" class="icon-btn" id="searchClose" aria-label="Đóng">${ICON.close}</button>
        </form>
        <div class="search-tags">
          <span data-en="Popular:">Tìm nhiều:</span>
          <a href="shop.html?type=pillow" data-en="Pillowcases">Vỏ gối</a>
          <a href="shop.html?type=sheet" data-en="Fitted sheets">Ga trải giường</a>
          <a href="collections.html">Hush Hush</a>
          <a href="stories.html" data-en="How to wash bamboo silk">Cách giặt lụa tre</a>
        </div>
      </div>
    </div>
  </header>
  <div class="drawer" id="drawer">
    <div class="drawer__scrim" data-close></div>
    <div class="drawer__panel">
      <button class="icon-btn drawer__close" data-close aria-label="Đóng">${ICON.close}</button>
      <a href="index.html" data-en="Home">Trang chủ</a>
      ${NAV.map(([href, vi, en]) => `<a href="${href}" data-en="${en}">${vi}</a>`).join('')}
      <div class="lang" style="margin-top:24px;align-self:flex-start"><button data-lang="vi">Tiếng Việt</button><button data-lang="en">English</button></div>
    </div>
  </div>`;
}

function renderFooter() {
  const host = $('#site-footer');
  if (!host) return;
  host.outerHTML = `
  <footer class="footer">
    <div class="wrap">
      <div class="footer__grid">
        <div class="footer__lead">
          <h3 data-en="Slow letters + 10% off your first order.">Thư chậm mỗi tháng + ưu đãi 10% cho đơn đầu.</h3>
          <form class="newsletter" id="newsletter">
            <input type="email" required placeholder="Email của bạn" data-en-ph="Your email" aria-label="Email">
            <button aria-label="Đăng ký">${ICON.arrow}</button>
          </form>
          <small data-en="We write rarely and gently. Unsubscribe anytime.">Mô viết thư ít và nhẹ nhàng. Bạn có thể huỷ đăng ký bất cứ lúc nào.</small>
        </div>
        <div>
          <h4 data-en="Shop">Mua sắm</h4>
          <ul>
            <li><a href="collections.html" data-en="Collections">Bộ sưu tập</a></li>
            <li><a href="shop.html?type=sheet" data-en="Fitted sheets">Ga trải giường</a></li>
            <li><a href="shop.html?type=duvet" data-en="Duvet covers">Vỏ chăn</a></li>
            <li><a href="shop.html?type=pillow" data-en="Pillowcases">Vỏ gối</a></li>
            <li><a href="index.html#bundle" data-en="Build your bed">Phối bộ giường</a></li>
          </ul>
        </div>
        <div>
          <h4 data-en="About Mô">Về Mô</h4>
          <ul>
            <li><a href="about.html" data-en="Our story">Chuyện của Mô</a></li>
            <li><a href="about.html#lua-tre" data-en="Why bamboo silk">Vì sao là lụa tre</a></li>
            <li><a href="about.html#nghe-thuat-lam-giuong" data-en="The art of bed-making">Nghệ thuật làm giường</a></li>
            <li><a href="stories.html">Mô Stories</a></li>
            <li><a href="index.html#trai-nghiem" data-en="Hotel experience">Trải nghiệm tại khách sạn</a></li>
          </ul>
        </div>
        <div>
          <h4 data-en="Help">Hỗ trợ</h4>
          <ul>
            <li><a href="#" data-en="Washing &amp; care">Hướng dẫn giặt &amp; bảo quản</a></li>
            <li><a href="#" data-en="Shipping &amp; payment">Giao hàng &amp; thanh toán</a></li>
            <li><a href="#" data-en="Returns &amp; warranty">Đổi trả &amp; bảo hành</a></li>
            <li><a href="#" data-en="Size guide">Bảng kích thước</a></li>
            <li><a href="#" data-en="Contact">Liên hệ</a></li>
          </ul>
        </div>
        <div>
          <h4 data-en="Follow Mô">Theo dõi Mô</h4>
          <ul>
            <li><a href="#">Facebook</a></li>
            <li><a href="#">Instagram</a></li>
            <li><a href="#">TikTok</a></li>
            <li><a href="#">Zalo</a></li>
          </ul>
        </div>
      </div>
      <div class="footer__bottom">
        <span>© 2026 Mô Bedding · Mô Đi Phê</span>
        <div class="footer__social">
          <a href="#" aria-label="Facebook">${ICON.fb}</a><a href="#" aria-label="Instagram">${ICON.ig}</a><a href="#" aria-label="TikTok">${ICON.tt}</a>
        </div>
        <span data-en="Privacy policy · Terms">Chính sách bảo mật · Điều khoản</span>
      </div>
    </div>
  </footer>
  <div class="toast" id="toast" role="status" aria-live="polite">${ICON.check}<span></span></div>`;
}

/* ---------- Song ngữ ---------- */
function applyLang(lang) {
  LANG = lang;
  store.set('mo-lang', lang);
  document.documentElement.lang = lang;
  $$('[data-en]').forEach(el => {
    if (el.dataset.vi === undefined) el.dataset.vi = el.innerHTML;
    el.innerHTML = lang === 'en' ? el.dataset.en : el.dataset.vi;
  });
  $$('[data-en-ph]').forEach(el => {
    if (el.dataset.viPh === undefined) el.dataset.viPh = el.placeholder;
    el.placeholder = lang === 'en' ? el.dataset.enPh : el.dataset.viPh;
  });
  $$('[data-en-aria]').forEach(el => {
    if (el.dataset.viAria === undefined) el.dataset.viAria = el.getAttribute('aria-label');
    el.setAttribute('aria-label', lang === 'en' ? el.dataset.enAria : el.dataset.viAria);
  });
  $$('[data-lang]').forEach(b => b.classList.toggle('is-active', b.dataset.lang === lang));
  document.dispatchEvent(new CustomEvent('langchange'));
}

/* ---------- Giỏ hàng ---------- */
function cartCount() { return store.get('mo-cart', []).reduce((s, i) => s + i.qty, 0); }
function updateCartBadge(bump) {
  const el = $('#cartCount');
  if (!el) return;
  const n = cartCount();
  el.textContent = n;
  el.classList.toggle('has', n > 0);
  if (bump) { el.classList.remove('bump'); void el.offsetWidth; el.classList.add('bump'); }
}
function addToCart(items, label) {
  const cart = store.get('mo-cart', []);
  items.forEach(it => {
    const found = cart.find(c => c.id === it.id && c.color === it.color && c.size === it.size);
    found ? found.qty += it.qty || 1 : cart.push({ ...it, qty: it.qty || 1 });
  });
  store.set('mo-cart', cart);
  updateCartBadge(true);
  toast(t(`Đã thêm ${label} vào giỏ`, `Added ${label} to your cart`));
}
let toastTimer;
function toast(msg) {
  const el = $('#toast');
  if (!el) return;
  $('span', el).textContent = msg;
  el.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => el.classList.remove('show'), 2600);
}

/* ---------- Thẻ sản phẩm ---------- */
function productCard(p) {
  const sw = p.colors.slice(0, 4).map(c => `<span class="swatch" style="background:${COLORS[c]}" title="${c}"></span>`).join('');
  const more = p.colors.length > 4 ? `<small>+${p.colors.length - 4}</small>` : '';
  return `
  <article class="pcard">
    <a href="shop.html?p=${p.id}" class="pcard__img">
      ${p.tag ? `<span class="pcard__badge">${p.tag}</span>` : ''}
      <img src="${p.img[0]}" alt="${p.name}" loading="lazy">
      <img src="${p.img[1]}" alt="" loading="lazy">
      <button class="pcard__add" data-add="${p.id}">${t('Thêm vào giỏ', 'Add to cart')}</button>
    </a>
    <div class="pcard__body">
      <a href="shop.html?p=${p.id}" class="pcard__name">${p.name}</a>
      <span class="pcard__meta">${p.coll} · ${TYPES[p.type][LANG]}</span>
      <span class="pcard__price">${t('Từ', 'From')} ${fmt(p.price)}</span>
      <div class="swatches">${sw}${more}</div>
    </div>
  </article>`;
}

function bindAddButtons(root = document) {
  $$('[data-add]', root).forEach(btn => btn.addEventListener('click', e => {
    e.preventDefault();
    const p = PRODUCTS.find(x => x.id === btn.dataset.add);
    addToCart([{ id: p.id, color: p.colors[0] }], p.name);
  }));
}

/* Carousel sản phẩm trên trang chủ (tabs lọc theo loại) */
function initProductRails() {
  $$('[data-rail]').forEach(rail => {
    const list = $('.products', rail);
    const ids = rail.dataset.rail ? rail.dataset.rail.split(',') : null;
    let filter = 'all';
    const draw = () => {
      let items = ids ? PRODUCTS.filter(p => ids.includes(p.id)) : PRODUCTS;
      if (filter !== 'all') items = items.filter(p => p.type === filter || (filter === 'bed' && p.type !== 'insert'));
      list.innerHTML = items.map(productCard).join('');
      bindAddButtons(list);
    };
    $$('.tab', rail).forEach(tab => tab.addEventListener('click', () => {
      $$('.tab', rail).forEach(x => x.classList.toggle('is-active', x === tab));
      filter = tab.dataset.filter;
      draw();
    }));
    const [prev, next] = $$('.carousel-nav button', rail);
    const step = () => list.clientWidth * 0.75;
    prev && prev.addEventListener('click', () => list.scrollBy({ left: -step(), behavior: 'smooth' }));
    next && next.addEventListener('click', () => list.scrollBy({ left: step(), behavior: 'smooth' }));
    document.addEventListener('langchange', draw);
    draw();
  });
}

/* Trang Sản phẩm: lọc theo loại / BST / màu */
function initShop() {
  const grid = $('#shopGrid');
  if (!grid) return;
  const params = new URLSearchParams(location.search);
  const state = { type: new Set(params.get('type') ? [params.get('type')] : []), coll: new Set(), color: null, sort: 'featured', q: (params.get('q') || '').toLowerCase() };
  const typeBox = $('#fType'), collBox = $('#fColl'), colorBox = $('#fColor');

  const drawFilters = () => {
    typeBox.innerHTML = Object.entries(TYPES).map(([k, v]) =>
      `<label><input type="checkbox" value="${k}" ${state.type.has(k) ? 'checked' : ''}> ${v[LANG]}</label>`).join('');
    const colls = [...new Set(PRODUCTS.map(p => p.coll))];
    collBox.innerHTML = colls.map(c => `<label><input type="checkbox" value="${c}" ${state.coll.has(c) ? 'checked' : ''}> ${c}</label>`).join('');
    colorBox.innerHTML = Object.entries(COLORS).map(([n, hex]) =>
      `<button class="cdot ${state.color === n ? 'is-active' : ''}" style="background:${hex}" title="${n}" data-c="${n}"></button>`).join('');
    $$('input', typeBox).forEach(i => i.onchange = () => { i.checked ? state.type.add(i.value) : state.type.delete(i.value); draw(); });
    $$('input', collBox).forEach(i => i.onchange = () => { i.checked ? state.coll.add(i.value) : state.coll.delete(i.value); draw(); });
    $$('button', colorBox).forEach(b => b.onclick = () => { state.color = state.color === b.dataset.c ? null : b.dataset.c; drawFilters(); draw(); });
  };
  const draw = () => {
    let items = PRODUCTS.filter(p =>
      (!state.type.size || state.type.has(p.type)) &&
      (!state.coll.size || state.coll.has(p.coll)) &&
      (!state.color || p.colors.includes(state.color)) &&
      (!state.q || (p.name + p.coll + TYPES[p.type].vi + TYPES[p.type].en).toLowerCase().includes(state.q)));
    if (state.sort === 'low') items = [...items].sort((a, b) => a.price - b.price);
    if (state.sort === 'high') items = [...items].sort((a, b) => b.price - a.price);
    grid.innerHTML = items.length ? items.map(productCard).join('')
      : `<p style="grid-column:1/-1;color:var(--muted)">${t('Chưa có sản phẩm phù hợp — thử bỏ bớt bộ lọc.', 'No products match — try removing a filter.')}</p>`;
    $('#shopCount').textContent = t(`${items.length} sản phẩm`, `${items.length} products`);
    bindAddButtons(grid);
  };
  $('#sort').onchange = e => { state.sort = e.target.value; draw(); };
  document.addEventListener('langchange', () => { drawFilters(); draw(); });
  drawFilters(); draw();
}

/* ---------- Bộ phối giường (Complete your bed) ---------- */
const BUNDLE_ITEMS = [
  { id: 'sheet',  vi: 'Ga bọc', en: 'Fitted Sheet', price: 1290000, sized: true,  part: 'sheet' },
  { id: 'duvet',  vi: 'Vỏ chăn', en: 'Duvet Cover', price: 1890000, sized: true,  part: 'duvet' },
  { id: 'pillow', vi: 'Cặp vỏ gối', en: 'Pillowcase Pair', price: 690000, sized: false, part: 'pillow' },
  { id: 'insert', vi: 'Ruột chăn Cloud', en: 'Cloud Duvet Insert', price: 1590000, sized: true, part: 'insert', fixed: 'Milk' },
];
const SIZES = [['1m6 × 2m', 1], ['1m8 × 2m', 1.12], ['2m2 × 2m', 1.25]];
const DISCOUNT = { 2: .05, 3: .1, 4: .15 };

function bedSVG() {
  // Nhìn từ trên xuống: đầu giường, ga, chăn, hai gối có nét vẽ tay kiểu Mô
  return `
  <svg viewBox="0 0 400 470" aria-hidden="true">
    <rect x="30" y="8" width="340" height="40" rx="8" fill="#8b6a52"/>
    <rect x="38" y="14" width="324" height="28" rx="5" fill="#9d7a60"/>
    <rect data-part="sheet" x="42" y="44" width="316" height="412" rx="10" fill="#f4efe6"/>
    <g data-part-group="pillow">
      <rect data-part="pillow" x="62" y="62" width="132" height="84" rx="16" fill="#e4d6c1"/>
      <rect data-part="pillow" x="206" y="62" width="132" height="84" rx="16" fill="#e4d6c1"/>
      <path d="M96 118c10-24 22-30 28-18 5 11-10 22-4 6 5-14 20-16 30-4" fill="none" stroke="#2f2a27" stroke-width="1.4" stroke-linecap="round" opacity=".55"/>
      <path d="M244 96c8 14 20 22 34 12M262 124c10-6 26-2 36 8" fill="none" stroke="#2f2a27" stroke-width="1.4" stroke-linecap="round" opacity=".55"/>
      <path d="M160 132l14-6" stroke="#9a4b3b" stroke-width="1.6" stroke-linecap="round"/>
    </g>
    <g>
      <rect data-part="insert" x="46" y="176" width="308" height="268" rx="12" fill="#ffffff" opacity=".0"/>
      <path data-part="duvet" d="M46 190c0-10 8-16 18-16h272c10 0 18 6 18 16v252c0 8-6 14-14 14H60c-8 0-14-6-14-14V190Z" fill="#e4d6c1"/>
      <path data-part="duvet-fold" d="M46 190c0-10 8-16 18-16h272c10 0 18 6 18 16v34H46v-34Z" fill="#000" opacity=".06"/>
      <path d="M70 262c60 14 120-10 180 6s70 10 84 4M68 330c80 10 140-12 210 2" fill="none" stroke="#000" stroke-opacity=".06" stroke-width="2"/>
    </g>
  </svg>`;
}

function initBundle() {
  const host = $('#bundle-builder');
  if (!host) return;
  const state = {
    size: 1,
    on: { sheet: true, duvet: true, pillow: true, insert: false },
    color: { sheet: 'Milk', duvet: 'Oat', pillow: 'Clay', insert: 'Milk' },
  };
  host.innerHTML = `
    <div class="bundle">
      <div class="bundle__stage">
        <span class="eyebrow stage-tag" data-en="Live preview">Xem trước</span>
        ${bedSVG()}
        <span class="stage-note" data-en="Pick a colour for each piece — mix freely.">Chọn màu cho từng món — phối tự do theo ý bạn.</span>
      </div>
      <div class="bundle__panel">
        <span class="eyebrow" data-en="Complete your bed">Hoàn thiện chiếc giường</span>
        <h2 class="h-lg" data-en="Build your own bundle">Phối bộ ga gối của riêng bạn</h2>
        <p class="lead" data-en="Choose the pieces you need, give each its own colour. The more pieces, the more you save — up to 15%.">Chọn những món bạn cần, mỗi món một màu. Càng nhiều món, càng tiết kiệm — đến 15%.</p>
        <div class="bstep">
          <div class="bstep__head"><h3 data-en="1 · Bed size">1 · Kích thước giường</h3><span id="bSizeLbl"></span></div>
          <div class="chips" id="bSizes">${SIZES.map(([s], i) => `<button class="chip" data-i="${i}">${s}</button>`).join('')}</div>
        </div>
        <div class="bstep">
          <div class="bstep__head"><h3 data-en="2 · Pieces &amp; colours">2 · Món &amp; màu</h3><span id="bCount"></span></div>
          <div id="bItems"></div>
        </div>
        <div class="bsum">
          <div class="bsum__row"><span data-en="Subtotal">Tạm tính</span><span id="bSub"></span></div>
          <div class="bsum__row save"><span id="bSaveLbl"></span><span id="bSave"></span></div>
          <div class="bsum__row total"><span data-en="Total">Tổng</span><span><s id="bOld"></s><span id="bTotal"></span></span></div>
          <button class="btn btn--solid" id="bAdd" data-en="Add bundle to cart">Thêm bộ vào giỏ</button>
          <p class="bsum__hint" data-en="2 pieces −5% · 3 pieces −10% · 4 pieces −15%">2 món −5% · 3 món −10% · 4 món −15%</p>
        </div>
      </div>
    </div>`;

  const priceOf = it => Math.round(it.price * (it.sized ? SIZES[state.size][1] : 1) / 1000) * 1000;

  const drawItems = () => {
    $('#bItems').innerHTML = BUNDLE_ITEMS.map(it => `
      <div class="bitem ${state.on[it.id] ? '' : 'is-off'}">
        <input type="checkbox" id="bi-${it.id}" data-item="${it.id}" ${state.on[it.id] ? 'checked' : ''}>
        <label for="bi-${it.id}" class="bitem__name">${LANG === 'en' ? it.en : it.vi}<small>${it.fixed ? 'Milk · ' + t('ruột lông vũ nhân tạo', 'down-alternative fill') : state.color[it.id]}</small></label>
        <span class="bitem__price">${fmt(priceOf(it))}</span>
        ${it.fixed ? '' : `<div class="bitem__colors">${Object.entries(COLORS).map(([n, hex]) =>
          `<button class="cdot ${state.color[it.id] === n ? 'is-active' : ''}" style="background:${hex}" title="${n}" aria-label="${n}" data-item="${it.id}" data-c="${n}"></button>`).join('')}</div>`}
      </div>`).join('');
    $$('#bItems input').forEach(i => i.onchange = () => { state.on[i.dataset.item] = i.checked; update(); });
    $$('#bItems .cdot').forEach(b => b.onclick = () => { state.color[b.dataset.item] = b.dataset.c; state.on[b.dataset.item] = true; update(); });
  };

  const paint = () => {
    const svg = $('svg', host);
    $$('[data-part="sheet"]', svg).forEach(el => { el.setAttribute('fill', state.on.sheet ? COLORS[state.color.sheet] : '#fbfaf7'); });
    $$('[data-part="pillow"]', svg).forEach(el => { el.setAttribute('fill', state.on.pillow ? COLORS[state.color.pillow] : '#fbfaf7'); });
    $('[data-part="duvet"]', svg).setAttribute('fill', state.on.duvet ? COLORS[state.color.duvet] : (state.on.insert ? '#ffffff' : 'transparent'));
    $('[data-part="duvet-fold"]', svg).style.opacity = state.on.duvet || state.on.insert ? '' : 0;
    $('[data-part="duvet"]', svg).style.filter = state.on.insert ? 'drop-shadow(0 6px 8px rgba(80,55,40,.22))' : 'none';
  };

  const update = () => {
    const chosen = BUNDLE_ITEMS.filter(it => state.on[it.id]);
    const sub = chosen.reduce((s, it) => s + priceOf(it), 0);
    const rate = DISCOUNT[chosen.length] || 0;
    const save = Math.round(sub * rate / 1000) * 1000;
    $$('#bSizes .chip').forEach(c => c.classList.toggle('is-active', +c.dataset.i === state.size));
    $('#bSizeLbl').textContent = SIZES[state.size][0];
    $('#bCount').textContent = t(`${chosen.length} món`, `${chosen.length} pieces`);
    $('#bSub').textContent = fmt(sub);
    $('#bSaveLbl').textContent = rate ? t(`Ưu đãi bộ ${chosen.length} món (−${rate * 100}%)`, `${chosen.length}-piece bundle (−${rate * 100}%)`) : t('Chọn thêm 1 món để nhận ưu đãi', 'Add one more piece to save');
    $('#bSave').textContent = rate ? '−' + fmt(save) : '';
    $('#bOld').textContent = rate ? fmt(sub) : '';
    $('#bTotal').textContent = fmt(sub - save);
    $('#bAdd').disabled = !chosen.length;
    $('#bAdd').style.opacity = chosen.length ? 1 : .4;
    drawItems();
    paint();
  };

  $$('#bSizes .chip').forEach(c => c.onclick = () => { state.size = +c.dataset.i; update(); });
  $('#bAdd').onclick = () => {
    const chosen = BUNDLE_ITEMS.filter(it => state.on[it.id]);
    if (!chosen.length) return;
    addToCart(chosen.map(it => ({ id: 'bundle-' + it.id, color: state.color[it.id], size: SIZES[state.size][0] })), t(`bộ ${chosen.length} món`, `your ${chosen.length}-piece bundle`));
  };
  document.addEventListener('langchange', update);
  update();
}

/* ---------- Slider hero ---------- */
function initHero() {
  const hero = $('.hero');
  if (!hero) return;
  const slides = $$('.hero__slide', hero);
  const dots = $('.hero__dots', hero);
  let i = 0, timer;
  dots.innerHTML = slides.map((_, k) => `<button aria-label="Slide ${k + 1}"></button>`).join('');
  const go = n => {
    i = (n + slides.length) % slides.length;
    slides.forEach((s, k) => s.classList.toggle('is-active', k === i));
    $$('button', dots).forEach((d, k) => { d.classList.remove('is-active'); if (k === i) { void d.offsetWidth; d.classList.add('is-active'); } });
    clearTimeout(timer);
    timer = setTimeout(() => go(i + 1), 6000);
  };
  $$('button', dots).forEach((d, k) => d.addEventListener('click', () => go(k)));
  go(0);
}

/* ---------- Hiệu ứng cuộn ---------- */
function initReveal() {
  // Kiểm tra theo sự kiện cuộn: phần tử nào đã chạm 90% chiều cao màn hình thì hiện ra
  const els = $$('.reveal, .reveal-stagger, .img-reveal');
  const par = matchMedia('(prefers-reduced-motion: reduce)').matches ? [] : $$('[data-parallax]');
  const check = () => {
    const limit = innerHeight * 0.9;
    els.forEach(el => { if (!el.classList.contains('in') && el.getBoundingClientRect().top < limit) el.classList.add('in'); });
    // Parallax nhẹ cho ảnh lifestyle
    par.forEach(img => {
      const r = img.parentElement.getBoundingClientRect();
      const p = (r.top + r.height / 2 - innerHeight / 2) / innerHeight;
      img.style.transform = `translateY(${p * -6}%)`;
    });
  };
  addEventListener('scroll', check, { passive: true });
  addEventListener('resize', check);
  check();
}

/* ---------- Khởi chạy ---------- */
function initChrome() {
  const header = $('#header');
  addEventListener('scroll', () => header && header.classList.toggle('is-scrolled', scrollY > 10), { passive: true });

  const panel = $('#searchPanel');
  $('#searchBtn').addEventListener('click', () => { panel.classList.toggle('open'); if (panel.classList.contains('open')) $('input', panel).focus(); });
  $('#searchClose').addEventListener('click', () => panel.classList.remove('open'));
  addEventListener('keydown', e => { if (e.key === 'Escape') { panel.classList.remove('open'); $('#drawer').classList.remove('open'); } });

  const drawer = $('#drawer');
  $('#burger').addEventListener('click', () => drawer.classList.add('open'));
  $$('[data-close]', drawer).forEach(el => el.addEventListener('click', () => drawer.classList.remove('open')));

  $$('[data-lang]').forEach(b => b.addEventListener('click', () => applyLang(b.dataset.lang)));
  $('#cartBtn').addEventListener('click', e => { e.preventDefault(); toast(t(`Giỏ hàng có ${cartCount()} món`, `${cartCount()} items in your cart`)); });
  $('#newsletter').addEventListener('submit', e => { e.preventDefault(); e.target.reset(); toast(t('Cảm ơn bạn — thư đầu tiên sắp đến.', 'Thank you — your first letter is on its way.')); });
}

renderHeader();
renderFooter();
initChrome();
initHero();
initProductRails();
initShop();
initBundle();
bindAddButtons($('main') || document);
applyLang(LANG);
updateCartBadge();
initReveal();
