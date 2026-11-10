(function () {
  'use strict';

  // ============================================
  // PUPUSAS — solo pupusas y acompañamientos
  // ============================================
  var menu = [
    { id: 1, name: 'Pupusa de queso', description: 'Queso fresco fundido en masa de maíz. La que nunca falla.', price: 2.0, category: 'clasicas', tag: 'Clásica', image: 'https://images.pexels.com/photos/33490827/pexels-photo-33490827.jpeg?auto=compress&cs=tinysrgb&h=650&w=940' },
    { id: 2, name: 'Pupusa de frijol', description: 'Frijol molido con queso, dorada en comal. Sabor de casa.', price: 2.0, category: 'clasicas', tag: 'Clásica', image: 'https://images.pexels.com/photos/30005123/pexels-photo-30005123.jpeg?auto=compress&cs=tinysrgb&h=650&w=940' },
    { id: 3, name: 'Pupusa revuelta', description: 'Queso, frijol y chicharrón en una sola pupusa. La más pedida.', price: 2.5, category: 'clasicas', tag: 'La más pedida', image: 'https://images.pexels.com/photos/12276364/pexels-photo-12276364.jpeg?auto=compress&cs=tinysrgb&h=650&w=940' },
    { id: 4, name: 'Pupusa de chicharrón', description: 'Chicharrón molido con queso. Dorada y crujiente al punto.', price: 2.25, category: 'clasicas', tag: 'Clásica', image: 'https://images.pexels.com/photos/9216207/pexels-photo-9216207.jpeg?auto=compress&cs=tinysrgb&h=650&w=940' },
    { id: 5, name: 'Pupusa de loroco', description: 'Queso con flor de loroco. El sabor auténtico de El Salvador.', price: 2.5, category: 'especiales', tag: 'Especial', image: 'https://images.pexels.com/photos/12333181/pexels-photo-12333181.jpeg?auto=compress&cs=tinysrgb&h=650&w=940' },
    { id: 6, name: 'Pupusa de chipilín', description: 'Queso con chipilín fresco. Hierba tradicional, sabor único.', price: 2.5, category: 'especiales', tag: 'Especial', image: 'https://images.pexels.com/photos/12326196/pexels-photo-12326196.jpeg?auto=compress&cs=tinysrgb&h=650&w=940' },
    { id: 7, name: 'Pupusa de ayote', description: 'Rellena de ayote tierno con queso. Dulce y salado a la vez.', price: 2.5, category: 'especiales', tag: 'Especial', image: 'https://images.pexels.com/photos/34938523/pexels-photo-34938523.jpeg?auto=compress&cs=tinysrgb&h=650&w=940' },
    { id: 8, name: 'Pupusa de chicharrón y queso', description: 'Doble relleno: chicharrón crujiente y queso extra.', price: 2.75, category: 'especiales', tag: 'Doble', image: 'https://images.pexels.com/photos/26935982/pexels-photo-26935982.jpeg?auto=compress&cs=tinysrgb&h=650&w=940' },
    { id: 9, name: 'Pupusa de espinaca', description: 'Queso con espinaca fresca. Verde y deliciosa.', price: 2.25, category: 'vegetarianas', tag: 'Vegetariana', image: 'https://images.pexels.com/photos/12276358/pexels-photo-12276358.jpeg?auto=compress&cs=tinysrgb&h=650&w=940' },
    { id: 10, name: 'Pupusa de frijol y queso', description: 'Frijol molido con queso, sin chicharrón. 100% vegetariana.', price: 2.25, category: 'vegetarianas', tag: 'Vegetariana', image: 'https://images.pexels.com/photos/12276364/pexels-photo-12276364.jpeg?auto=compress&cs=tinysrgb&h=650&w=940' },
    { id: 11, name: 'Pupusa de hongo', description: 'Hongos salteados con queso y ajo. Sabor intenso.', price: 2.5, category: 'vegetarianas', tag: 'Vegetariana', image: 'https://images.pexels.com/photos/33539389/pexels-photo-33539389.jpeg?auto=compress&cs=tinysrgb&h=650&w=940' },
    { id: 12, name: 'Pupusa de loroco y queso', description: 'Loroco con doble queso, sin carne. Tradicional vegetariana.', price: 2.5, category: 'vegetarianas', tag: 'Vegetariana', image: 'https://images.pexels.com/photos/16625037/pexels-photo-16625037.jpeg?auto=compress&cs=tinysrgb&h=650&w=940' },

  ];

  // ============================================
  // STATE
  // ============================================
  var cart = [];
  var menuGrid = document.getElementById('menuGrid');
  var tabs = document.querySelectorAll('.tab');
  var cartDrawer = document.getElementById('cartDrawer');
  var cartItemsEl = document.getElementById('cartItems');
  var cartEmpty = document.getElementById('cartEmpty');
  var drawerFooter = document.getElementById('drawerFooter');
  var cartCount = document.getElementById('cartCount');
  var cartTotal = document.getElementById('cartTotal');
  var toast = document.getElementById('toast');
  var toastTimer;

  function formatPrice(p) { return '$' + p.toFixed(2); }

  // ============================================
  // RENDER MENU
  // ============================================
  function renderMenu(category) {
    var items = category === 'todas' ? menu : menu.filter(function (i) { return i.category === category; });
    menuGrid.innerHTML = items.map(function (item, i) {
      return '<article class="menu-card" style="animation-delay:' + (i * 0.05) + 's">' +
        '<div class="menu-card-img"><img src="' + item.image + '" alt="' + item.name + '" loading="lazy"><span class="menu-card-tag">' + item.tag + '</span></div>' +
        '<div class="menu-card-body"><h3>' + item.name + '</h3><p>' + item.description + '</p>' +
        '<div class="menu-card-bottom"><div class="menu-card-price">' + formatPrice(item.price) + '<small>la unidad</small></div>' +
        '<button class="add-btn" data-add="' + item.id + '" type="button" aria-label="Agregar ' + item.name + '">' +
        '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg> Agregar</button></div></div></article>';
    }).join('');

    menuGrid.querySelectorAll('[data-add]').forEach(function (btn) {
      btn.addEventListener('click', function () { addToCart(Number(btn.getAttribute('data-add'))); });
    });
  }

  // ============================================
  // CART
  // ============================================
  function addToCart(id) {
    var item = menu.find(function (e) { return e.id === id; });
    var existing = cart.find(function (e) { return e.id === id; });
    if (existing) existing.quantity += 1;
    else cart.push({ id: item.id, name: item.name, price: item.price, quantity: 1 });
    updateCart();
    bumpCart();
    showToast(item.name + ' agregada');
  }

  function changeQty(id, delta) {
    var item = cart.find(function (e) { return e.id === id; });
    if (!item) return;
    item.quantity += delta;
    if (item.quantity <= 0) cart = cart.filter(function (e) { return e.id !== id; });
    updateCart();
  }

  function updateCart() {
    var count = cart.reduce(function (t, i) { return t + i.quantity; }, 0);
    var total = cart.reduce(function (s, i) { return s + i.price * i.quantity; }, 0);
    cartCount.textContent = count;
    cartTotal.textContent = formatPrice(total);
    cartEmpty.hidden = cart.length > 0;
    drawerFooter.hidden = cart.length === 0;
    cartItemsEl.innerHTML = cart.map(function (item) {
      return '<div class="cart-item"><div><strong>' + item.name + '</strong><span>' + formatPrice(item.price) + ' c/u</span></div>' +
        '<div class="quantity"><button type="button" data-minus="' + item.id + '" aria-label="Quitar">−</button><b>' + item.quantity + '</b><button type="button" data-plus="' + item.id + '" aria-label="Agregar">+</button></div></div>';
    }).join('');
    cartItemsEl.querySelectorAll('[data-minus]').forEach(function (b) { b.addEventListener('click', function () { changeQty(Number(b.getAttribute('data-minus')), -1); }); });
    cartItemsEl.querySelectorAll('[data-plus]').forEach(function (b) { b.addEventListener('click', function () { changeQty(Number(b.getAttribute('data-plus')), 1); }); });
  }

  function bumpCart() {
    var btn = document.getElementById('cartButton');
    btn.classList.add('bump');
    setTimeout(function () { btn.classList.remove('bump'); }, 300);
  }

  function toggleCart(open) {
    cartDrawer.classList.toggle('open', open);
    cartDrawer.setAttribute('aria-hidden', String(!open));
    document.body.classList.toggle('drawer-open', open);
  }

  function showToast(msg) {
    clearTimeout(toastTimer);
    toast.textContent = msg;
    toast.classList.add('show');
    toastTimer = setTimeout(function () { toast.classList.remove('show'); }, 2600);
  }

  // ============================================
  // TABS
  // ============================================
  tabs.forEach(function (tab) {
    tab.addEventListener('click', function () {
      tabs.forEach(function (t) { t.classList.remove('active'); });
      tab.classList.add('active');
      renderMenu(tab.getAttribute('data-category'));
    });
  });

  // ============================================
  // EVENTS
  // ============================================
  document.getElementById('cartButton').addEventListener('click', function () { toggleCart(true); });
  document.getElementById('closeCart').addEventListener('click', function () { toggleCart(false); });
  document.getElementById('drawerBackdrop').addEventListener('click', function () { toggleCart(false); });

  var menuToggle = document.getElementById('menuToggle');
  var navLinks = document.getElementById('navLinks');
  menuToggle.addEventListener('click', function () {
    navLinks.classList.toggle('mobile-visible');
    menuToggle.classList.toggle('open');
  });
  navLinks.querySelectorAll('a').forEach(function (link) {
    link.addEventListener('click', function () {
      navLinks.classList.remove('mobile-visible');
      menuToggle.classList.remove('open');
    });
  });

  document.getElementById('orderButton').addEventListener('click', function () {
    if (!cart.length) return;
    var name = document.getElementById('customerName').value.trim();
    var phone = document.getElementById('customerPhone').value.trim();
    var address = document.getElementById('customerAddress').value.trim();
    var payment = document.getElementById('paymentMethod').value;
    if (!name || !phone || !address) {
      showToast('Completá nombre, teléfono y dirección');
      return;
    }
    var order = cart.map(function (i) { return i.quantity + 'x ' + i.name + ' (' + formatPrice(i.price * i.quantity) + ')'; }).join('%0A');
    var total = cart.reduce(function (s, i) { return s + i.price * i.quantity; }, 0);
    var msg = 'Hola Doña Rosa, quiero ordenar pupusas:%0A%0A' + order + '%0A%0ATotal: ' + formatPrice(total) + '%0A%0ANombre: ' + encodeURIComponent(name) + '%0ATel: ' + encodeURIComponent(phone) + '%0ADirección: ' + encodeURIComponent(address) + '%0APago: ' + encodeURIComponent(payment);
    window.open('https://wa.me/50370000000?text=' + msg, '_blank', 'noopener,noreferrer');
  });

  // ============================================
  // SCROLL
  // ============================================
  var header = document.querySelector('.site-header');
  var progressBar = document.getElementById('scrollProgress');

  function onScroll() {
    var y = window.scrollY;
    var h = document.documentElement.scrollHeight - window.innerHeight;
    progressBar.style.width = (y / h * 100) + '%';
    if (y > 20) header.classList.add('scrolled');
    else header.classList.remove('scrolled');
  }
  window.addEventListener('scroll', onScroll, { passive: true });

  // ============================================
  // REVEAL ON SCROLL
  // ============================================
  var revealEls = document.querySelectorAll('[data-reveal]');
  if ('IntersectionObserver' in window) {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          var el = entry.target;
          var delay = el.getAttribute('data-delay') || '0';
          el.style.setProperty('--reveal-delay', (parseInt(delay, 10) / 1000) + 's');
          el.classList.add('visible');
          observer.unobserve(el);
        }
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });
    revealEls.forEach(function (el) { observer.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add('visible'); });
  }

  // ============================================
  // SMOOTH SCROLL
  // ============================================
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      var href = anchor.getAttribute('href');
      if (href === '#') return;
      var target = document.querySelector(href);
      if (!target) return;
      e.preventDefault();
      var offset = header.offsetHeight;
      var pos = target.getBoundingClientRect().top + window.scrollY - offset + 1;
      window.scrollTo({ top: pos, behavior: 'smooth' });
    });
  });

  // ============================================
  // INIT
  // ============================================
  renderMenu('todas');
  updateCart();
  onScroll();
})();
