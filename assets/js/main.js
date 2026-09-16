/* =========================================================
   MÔ BEDDING — script dùng chung cho mọi trang
   - Header / footer dùng chung
   - Song ngữ VI / EN (data-en trên từng phần tử)
   - Giỏ hàng (localStorage), slider hero, hiệu ứng cuộn
   - Dữ liệu sản phẩm (theo catalogue Mô Đi Phê)
   ========================================================= */

const P = name => `assets/img/${name}.jpg`;

/* Màu — tên riêng giữ nguyên tiếng Anh ở cả hai bản */
const COLORS = {
  'White':         '#f6f3ee',
  'Beige':         '#e3d3bd',
  'Bronze':        '#a0703f',
  'Green':         '#8e9b7c',
  'Silver':        '#c9cacc',
  'Dark Grey':     '#5b5b5d',
  'Pastel Yellow': '#f1e2a8',
  'Pastel Pink':   '#efc9c6',
  'Mint Green':    '#bfdcc9',
  'Baby Blue':     '#bcd3e6',
  'Navy Blue':     '#2f3a57',
};
const ART = ['White', 'Beige', 'Bronze', 'Green'];                 // màu vỏ gối vẽ tay
const PLAIN = ['White', 'Silver', 'Dark Grey', 'Pastel Yellow', 'Pastel Pink', 'Mint Green', 'Baby Blue', 'Navy Blue']; // màu trơn

/* Giá lấy từ bảng giá catalogue Mô Đi Phê */
const PRODUCTS = [
  { id: 'nha-dream',      name: 'Dream a little dream of me', type: 'pillow', coll: 'Nhã',                size: '50 × 70',  price: 550000,  colors: ART,   img: [P('p-nha-1'), P('p-nha-1b')], tag: 'Hand-drawn' },
  { id: 'nha-sleepyhead', name: 'Precious little sleepyhead', type: 'pillow', coll: 'Nhã',                size: '50 × 70',  price: 550000,  colors: ART,   img: [P('p-nha-2'), P('p-nha-2b')], tag: 'Signed' },
  { id: 'thr-5',          name: 'Throw THR-5',                type: 'throw',  coll: 'Throw',              size: '90 × 210', price: 990000,  colors: [],    img: [P('p-throw-5'), P('p-throw-5b')], tag: 'Artwork' },
  { id: 'hll-life',       name: 'Life',                       type: 'pillow', coll: 'Human Love Letters', size: '50 × 70',  price: 550000,  colors: ART,   img: [P('p-hll-1'), P('p-hll-2')] },
  { id: 'set-queen',      name: 'Bamboo Bedding Set · Queen', type: 'set',    coll: 'Essentials',         size: '1m6 × 2m', price: 3650000, colors: PLAIN, img: [P('p-set-1'), P('p-set-2')] },
  { id: 'nha-sweet',      name: 'Sweet Dreams',               type: 'pillow', coll: 'Nhã',                size: '30 × 60',  price: 400000,  colors: ART,   img: [P('p-nha-3'), P('p-nha-3b')] },
  { id: 'thr-8',          name: 'Throw THR-8 · i love you',   type: 'throw',  coll: 'Throw',              size: '90 × 210', price: 990000,  colors: [],    img: [P('p-throw-8'), P('p-throw-8b')], tag: 'Artwork' },
  { id: 'nha-spicy',      name: 'Spicy fantasy',              type: 'pillow', coll: 'Nhã',                size: '40 × 60',  price: 450000,  colors: ART,   img: [P('p-nha-4'), P('p-nha-4b')] },
  { id: 'hll-waltz',      name: 'Just waltz',                 type: 'pillow', coll: 'Human Love Letters', size: '40 × 60',  price: 450000,  colors: ART,   img: [P('p-hll-2'), P('p-hll-1')] },
  { id: 'thr-1',          name: 'Throw THR-1',                type: 'throw',  coll: 'Throw',              size: '90 × 210', price: 990000,  colors: [],    img: [P('p-throw-1'), P('p-throw-1b')] },
  { id: 'thr-9',          name: 'Throw THR-9',                type: 'throw',  coll: 'Throw',              size: '90 × 210', price: 990000,  colors: [],    img: [P('p-throw-9'), P('p-hll-2')] },
  { id: 'set-king',       name: 'Bamboo Bedding Set · King',  type: 'set',    coll: 'Essentials',         size: '1m8 × 2m', price: 3950000, colors: PLAIN, img: [P('p-set-3'), P('p-set-4')] },
  { id: 'duvet-cover',    name: 'Bamboo Duvet Cover',         type: 'set',    coll: 'Essentials',         size: '2m × 2m2', price: 1950000, colors: PLAIN, img: [P('p-set-5'), P('p-set-6')], from: true },
  { id: 'fitted-sheet',   name: 'Bamboo Fitted Sheet',        type: 'set',    coll: 'Essentials',         size: '1m6 × 2m', price: 1200000, colors: PLAIN, img: [P('p-sheet-1'), P('p-set-2')], from: true },
  { id: 'pillow-insert',  name: 'Pillow Insert',              type: 'insert', coll: 'Essentials',         size: '30 × 60',  price: 239000,  colors: ['White'], img: [P('p-insert-1'), P('p-insert-2')], from: true },
  { id: 'duvet-insert',   name: 'Microfiber Duvet Insert',    type: 'insert', coll: 'Essentials',         size: '2m × 2m2', price: 890000,  colors: ['White'], img: [P('p-insert-2'), P('p-insert-1')] },
];

const TYPES = {
  pillow: { vi: 'Vỏ gối vẽ tay', en: 'Art pillowcases' },
  throw:  { vi: 'Chăn throw', en: 'Throws' },
  set:    { vi: 'Chăn ga lụa tre', en: 'Bamboo bedding' },
  insert: { vi: 'Ruột & phụ kiện', en: 'Inserts & essentials' },
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
  check: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m5 12 5 5 9-10"/></svg>',
  fb: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M13.5 21v-7.5H16l.4-3h-2.9V8.6c0-.9.3-1.5 1.5-1.5h1.5V4.4c-.3 0-1.2-.1-2.2-.1-2.2 0-3.7 1.3-3.7 3.8v2.4H8.1v3h2.5V21h2.9Z"/></svg>',
  ig: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><rect x="3.5" y="3.5" width="17" height="17" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.3" cy="6.7" r=".8" fill="currentColor"/></svg>',
};

const SOCIAL = {
  instagram: 'https://www.instagram.com/modiphe/',
  facebook: 'https://www.facebook.com/profile.php?id=61578992859418',
  email: 'modiphe.bedding@gmail.com',
};

/* ---------- Header & footer dùng chung ---------- */
const NAV = [
  ['collections.html', 'Bộ sưu tập', 'Collections', 'collections'],
  ['shop.html', 'Sản phẩm', 'Shop', 'shop'],
  ['about.html#making-bed', 'Nghệ thuật làm giường', 'The Art of Making Bed', 'bedart'],
  ['stories.html', 'Mô Bedding kể chuyện', 'Mo Bedding Stories', 'stories'],
  ['about.html', 'Về Mô', 'About Us', 'about'],
];

function renderHeader() {
  const host = $('#site-header');
  if (!host) return;
  const page = document.body.dataset.page;
  const link = ([href, vi, en, key]) =>
    `<a href="${href}" data-en="${en}" ${key === page ? 'aria-current="page"' : ''}>${vi}</a>`;
  const links = NAV.map(link).join('');
  host.outerHTML = `
  <div class="announce" data-en="Free shipping on orders from 1,500,000₫ · 7-day returns">Miễn phí giao hàng cho đơn từ 1.500.000₫ · Đổi trả trong 7 ngày</div>
  <header class="header" id="header">
    <div class="wrap header__row">
      <button class="icon-btn burger" id="burger" aria-label="Menu">${ICON.menu}</button>
      <a class="logo" href="index.html" aria-label="Mô Bedding — Trang chủ">
        <img src="assets/img/logo-mark.png" alt="Mô">
        <span class="logo__tag">ga gối cho riêng bạn</span>
      </a>
      <nav class="nav" aria-label="Menu chính">${links}</nav>
      <div class="actions">
        <button class="icon-btn" id="searchBtn" aria-label="Tìm kiếm" data-en-aria="Search">${ICON.search}</button>
        <div class="lang lang--desktop" role="group" aria-label="Ngôn ngữ">
          <button data-lang="vi">VI</button><button data-lang="en">EN</button>
        </div>
        <a class="icon-btn" href="#" id="cartBtn" aria-label="Giỏ hàng" data-en-aria="Cart">${ICON.bag}<span class="cart-count" id="cartCount">0</span></a>
      </div>
    </div>
    <div class="search-panel" id="searchPanel">
      <div class="wrap">
        <form action="shop.html" role="search">
          ${ICON.search.replace('<svg', '<svg width="22" height="22"')}
          <input name="q" type="search" placeholder="Hôm nay bạn muốn ôm gì vào giấc ngủ?" data-en-ph="What would you like to fall asleep with?" autocomplete="off">
          <button type="button" class="icon-btn" id="searchClose" aria-label="Đóng">${ICON.close}</button>
        </form>
        <div class="search-tags">
          <span data-en="Often searched:">Hay được tìm:</span>
          <a href="shop.html?type=pillow" data-en="Art pillowcases">Vỏ gối vẽ tay</a>
          <a href="shop.html?type=throw" data-en="Throws">Chăn throw</a>
          <a href="collections.html#hush-hush">Hush Hush</a>
          <a href="story.html">Making bed</a>
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
          <h3 data-en="A small letter each month, about sleep and slow mornings.">Mỗi tháng, một lá thư nhỏ về giấc ngủ và những buổi sáng chậm.</h3>
          <form class="newsletter" id="newsletter">
            <input type="email" required placeholder="Email của bạn" data-en-ph="Your email" aria-label="Email">
            <button aria-label="Đăng ký">${ICON.arrow}</button>
          </form>
          <small data-en="Mô writes rarely, and gently. Leave whenever you like.">Mô viết ít, và viết nhẹ thôi. Bạn có thể rời đi bất cứ lúc nào.</small>
        </div>
        <div>
          <h4 data-en="Shop">Mua sắm</h4>
          <ul>
            <li><a href="collections.html" data-en="Collections">Bộ sưu tập</a></li>
            <li><a href="shop.html?type=pillow" data-en="Art pillowcases">Vỏ gối vẽ tay</a></li>
            <li><a href="shop.html?type=throw" data-en="Throws">Chăn throw</a></li>
            <li><a href="shop.html?type=set" data-en="Bamboo bedding">Chăn ga lụa tre</a></li>
            <li><a href="shop.html?type=insert" data-en="Inserts &amp; essentials">Ruột &amp; phụ kiện</a></li>
          </ul>
        </div>
        <div>
          <h4 data-en="About Mô">Về Mô</h4>
          <ul>
            <li><a href="about.html" data-en="Our story">Chuyện của Mô</a></li>
            <li><a href="about.html#nguoi-ve" data-en="The artist">Người vẽ</a></li>
            <li><a href="about.html#lua-tre" data-en="Why bamboo silk">Vì sao là lụa tre</a></li>
            <li><a href="about.html#making-bed">Making bed</a></li>
            <li><a href="index.html#trai-nghiem" data-en="Sleep at a Mô home">Ngủ thử ở nhà Mô</a></li>
          </ul>
        </div>
        <div>
          <h4 data-en="Help">Hỗ trợ</h4>
          <ul>
            <li><a href="story.html#giat" data-en="Washing &amp; care">Hướng dẫn giặt &amp; bảo quản</a></li>
            <li><a href="#" data-en="Shipping &amp; payment">Giao hàng &amp; thanh toán</a></li>
            <li><a href="#" data-en="Returns &amp; warranty">Đổi trả &amp; bảo hành</a></li>
            <li><a href="#" data-en="Size guide">Bảng kích thước</a></li>
            <li><a href="mailto:${SOCIAL.email}">${SOCIAL.email}</a></li>
          </ul>
        </div>
        <div>
          <h4 data-en="Follow Mô">Theo dõi Mô</h4>
          <ul>
            <li><a href="${SOCIAL.instagram}" target="_blank" rel="noopener">Instagram</a></li>
            <li><a href="${SOCIAL.facebook}" target="_blank" rel="noopener">Facebook</a></li>
          </ul>
          <p style="font-size:12.5px;color:var(--muted);margin-top:18px" data-en="8:00 – 18:00, Monday – Saturday">8:00 – 18:00, thứ Hai – thứ Bảy</p>
        </div>
      </div>
      <div class="footer__bottom">
        <span>© 2026 Mô Bedding · Mô Đi Phê</span>
        <div class="footer__social">
          <a href="${SOCIAL.instagram}" target="_blank" rel="noopener" aria-label="Instagram">${ICON.ig}</a>
          <a href="${SOCIAL.facebook}" target="_blank" rel="noopener" aria-label="Facebook">${ICON.fb}</a>
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
    const found = cart.find(c => c.id === it.id && c.color === it.color);
    found ? found.qty += it.qty || 1 : cart.push({ ...it, qty: it.qty || 1 });
  });
  store.set('mo-cart', cart);
  updateCartBadge(true);
  toast(t(`“${label}” đã nằm trong giỏ`, `“${label}” is in your bag`));
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
  const meta = p.coll === 'Essentials' ? `${TYPES[p.type][LANG]} · ${p.size}` : `${p.coll} · ${p.size}`;
  return `
  <article class="pcard">
    <a href="shop.html?p=${p.id}" class="pcard__img">
      ${p.tag ? `<span class="pcard__badge">${p.tag}</span>` : ''}
      <img src="${p.img[0]}" alt="${p.name}" loading="lazy">
      <img src="${p.img[1]}" alt="" loading="lazy">
      <button class="pcard__add" data-add="${p.id}">${t('Thêm vào giỏ', 'Add to bag')}</button>
    </a>
    <div class="pcard__body">
      <a href="shop.html?p=${p.id}" class="pcard__name">${p.name}</a>
      <span class="pcard__meta">${meta}</span>
      <span class="pcard__price">${p.from ? t('Từ ', 'From ') : ''}${fmt(p.price)}</span>
      <div class="swatches">${sw}${more}</div>
    </div>
  </article>`;
}

function bindAddButtons(root = document) {
  $$('[data-add]', root).forEach(btn => btn.addEventListener('click', e => {
    e.preventDefault();
    const p = PRODUCTS.find(x => x.id === btn.dataset.add);
    addToCart([{ id: p.id, color: p.colors[0] || null }], p.name);
  }));
}

/* Carousel sản phẩm (tabs lọc theo loại) */
function initProductRails() {
  $$('[data-rail]').forEach(rail => {
    const list = $('.products', rail);
    const ids = rail.dataset.rail ? rail.dataset.rail.split(',') : null;
    let filter = 'all';
    const draw = () => {
      let items = ids ? ids.map(id => PRODUCTS.find(p => p.id === id)).filter(Boolean) : PRODUCTS;
      if (filter !== 'all') items = items.filter(p => p.type === filter);
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

/* Trang Sản phẩm: lọc theo loại / bộ sưu tập / màu */
function initShop() {
  const grid = $('#shopGrid');
  if (!grid) return;
  const params = new URLSearchParams(location.search);
  const state = { type: new Set(params.get('type') ? [params.get('type')] : []), coll: new Set(params.get('coll') ? [params.get('coll')] : []), color: null, sort: 'featured', q: (params.get('q') || '').toLowerCase() };
  const typeBox = $('#fType'), collBox = $('#fColl'), colorBox = $('#fColor');

  const drawFilters = () => {
    typeBox.innerHTML = Object.entries(TYPES).map(([k, v]) =>
      `<label><input type="checkbox" value="${k}" ${state.type.has(k) ? 'checked' : ''}> ${v[LANG]}</label>`).join('');
    const colls = [...new Set(PRODUCTS.map(p => p.coll))];
    collBox.innerHTML = colls.map(c => `<label><input type="checkbox" value="${c}" ${state.coll.has(c) ? 'checked' : ''}> ${c}</label>`).join('');
    colorBox.innerHTML = Object.entries(COLORS).map(([n, hex]) =>
      `<button class="cdot ${state.color === n ? 'is-active' : ''}" style="background:${hex}" title="${n}" aria-label="${n}" data-c="${n}"></button>`).join('');
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
      : `<p style="grid-column:1/-1;color:var(--muted)">${t('Chưa tìm thấy món nào hợp — thử bỏ bớt một bộ lọc nhé.', 'Nothing here yet — try removing a filter.')}</p>`;
    $('#shopCount').textContent = t(`${items.length} món`, `${items.length} pieces`);
    bindAddButtons(grid);
  };
  $('#sort').onchange = e => { state.sort = e.target.value; draw(); };
  document.addEventListener('langchange', () => { drawFilters(); draw(); });
  drawFilters(); draw();
}

/* ---------- Slider hero ---------- */
function initHero() {
  const hero = $('.hero');
  if (!hero) return;
  const slides = $$('.hero__slide', hero);
  const dots = $('.hero__dots', hero);
  if (!slides.length) return;
  let i = 0, timer;
  if (slides.length < 2) { dots.remove(); slides[0].classList.add('is-active'); return; }
  dots.innerHTML = slides.map((_, k) => `<button aria-label="Slide ${k + 1}"></button>`).join('');
  const go = n => {
    i = (n + slides.length) % slides.length;
    slides.forEach((s, k) => s.classList.toggle('is-active', k === i));
    $$('button', dots).forEach((d, k) => { d.classList.remove('is-active'); if (k === i) { void d.offsetWidth; d.classList.add('is-active'); } });
    clearTimeout(timer);
    timer = setTimeout(() => go(i + 1), 5000);
  };
  $$('button', dots).forEach((d, k) => d.addEventListener('click', () => go(k)));
  go(0);
}

/* ---------- Video: khung ngang trên máy tính, khung dọc 3:4 trên điện thoại ---------- */
function initFilms() {
  const vids = $$('video[data-wide]');
  if (!vids.length) return;
  const mq = matchMedia('(max-width: 760px)');
  const still = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const pick = () => vids.forEach(v => {
    const src = mq.matches ? v.dataset.tall : v.dataset.wide;
    if (v.getAttribute('src') === src) return;
    v.poster = mq.matches ? v.dataset.posterTall : v.dataset.posterWide;
    v.src = src;
    if (still) { v.removeAttribute('autoplay'); v.controls = true; return; }
    v.load();
    v.play().catch(() => {});
  });
  mq.addEventListener ? mq.addEventListener('change', pick) : mq.addListener(pick);
  pick();
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
  $('#cartBtn').addEventListener('click', e => { e.preventDefault(); toast(t(`Giỏ đang có ${cartCount()} món`, `${cartCount()} pieces in your bag`)); });
  $('#newsletter').addEventListener('submit', e => { e.preventDefault(); e.target.reset(); toast(t('Cảm ơn bạn — lá thư đầu tiên đang trên đường tới.', 'Thank you — your first letter is on its way.')); });
}

renderHeader();
renderFooter();
initChrome();
initHero();
initFilms();
initProductRails();
initShop();
bindAddButtons($('main') || document);
applyLang(LANG);
updateCartBadge();
initReveal();
