// Hero categories for carousel
const HUB_HERO_SLIDES = [
  {
    tag: 'Nuevos lotes',
    title: 'Joyería y\nesmeraldas',
    desc: 'Esmeraldas colombianas, oro 18K y piezas únicas de los mejores joyeros del país.',
    cta: 'Ver subastas',
    emoji: '💎',
    bg: 'var(--teal-soft)',
    cat: 'joyeria',
  },
  {
    tag: 'Populares',
    title: 'Relojes y\ncoleccionables',
    desc: 'Seikos, Casios vintage y relojes premium a subasta. Encuentra tu próximo tesoro.',
    cta: 'Explorar',
    emoji: '⌚',
    bg: 'var(--purple-light)',
    cat: 'relojes',
  },
  {
    tag: 'Terminan pronto',
    title: 'Tecnología\npremium',
    desc: 'MacBooks, iPhones y gadgets de alta gama verificados. Precio real de mercado.',
    cta: 'Ver lotes',
    emoji: '💻',
    bg: '#F0FDF4',
    cat: 'tecnologia',
  },
];

let _heroSlide = 0;
let _heroInterval = null;

function initHub() {
  const D = window.TRATO_DATA;

  if (_heroInterval) { clearInterval(_heroInterval); _heroInterval = null; }
  if (window._hubTimerInterval) { clearInterval(window._hubTimerInterval); window._hubTimerInterval = null; }

  const liveAuctions = D.auctions.filter(a => a.badge === 'ending' || a.badge === 'hot');
  const featured = D.auctions.find(a => a.totalBids >= 8) || D.auctions[0];
  const endingSoon = D.auctions.sort((a, b) => a.endsAt - b.endsAt).slice(0, 4);

  document.getElementById('app-content').innerHTML = `
    <!-- Hero Carousel -->
    <div class="hub-hero" id="hubHero">
      ${_renderHeroSlide(HUB_HERO_SLIDES[_heroSlide])}
    </div>

    <!-- Live section -->
    <div class="hub-live-section">
      <div class="section-header">
        <div style="display:flex;align-items:center;gap:10px">
          <span class="live-badge"><span class="live-dot"></span>Subastas en vivo</span>
          <h2 class="section-title" style="margin:0">Puja en tiempo real</h2>
        </div>
        <a class="see-all-link" onclick="navigate('auctions'); return false" href="#">Ver todas <span class="material-symbols-rounded" style="font-size:16px;vertical-align:-4px">chevron_right</span></a>
      </div>

      <!-- Featured -->
      ${featured ? `
      <div class="hub-featured-card" onclick="navigate('detail', '${featured.id}')">
        <div class="hub-featured-left">
          <div class="hub-featured-img">
            <span>${featured.emoji || '📦'}</span>
          </div>
          <div class="hub-featured-badge-row">
            <span class="featured-fire-badge"><span class="material-symbols-rounded" style="font-size:12px">local_fire_department</span>${featured.totalBids} pujas</span>
            ${featured.seller.verified ? `<span class="featured-verified-badge"><span class="material-symbols-rounded" style="font-size:12px">verified</span> Verificado</span>` : ''}
          </div>
        </div>
        <div class="hub-featured-right">
          <div class="hub-featured-tag">Destacado</div>
          <h3 class="hub-featured-title">${featured.title}</h3>
          <div class="hub-featured-seller">${featured.seller.name}</div>
          <div class="hub-featured-price-row">
            <div>
              <div style="font-size:11px;color:var(--text-tertiary)">Puja actual</div>
              <div class="hub-featured-price">${D.fmt(featured.currentPrice)}</div>
            </div>
            <div class="hub-featured-timer ${D.countdown(featured.endsAt).state}" data-ends="${featured.endsAt}">
              <span class="material-symbols-rounded" style="font-size:14px">timer</span>
              <span class="timer-val">${D.countdown(featured.endsAt).str}</span>
            </div>
          </div>
          <div class="hub-featured-cta-row">
            <button class="btn btn-primary" onclick="navigate('detail', '${featured.id}'); event.stopPropagation()">
              <span class="material-symbols-rounded">gavel</span>Hacer puja
            </button>
            <span class="hub-pagas-solo"><span class="material-symbols-rounded" style="font-size:13px">shield</span>Pagas solo si ganas</span>
          </div>
        </div>
      </div>
      ` : ''}
    </div>

    <!-- Terminan pronto -->
    <div class="hub-ending-section">
      <div class="section-header">
        <h2 class="section-title">Terminan pronto</h2>
        <a class="see-all-link" onclick="navigate('auctions'); return false" href="#">Ver todas <span class="material-symbols-rounded" style="font-size:16px;vertical-align:-4px">chevron_right</span></a>
      </div>
      <div class="auctions-grid">
        ${endingSoon.map(a => renderAuctionCard(a)).join('')}
      </div>
    </div>

    <!-- How it works -->
    <div class="hub-how-section">
      <h2 class="section-title" style="text-align:center">¿Cómo funciona?</h2>
      <p class="hub-how-sub">Compra y vende de forma segura en 4 pasos</p>
      <div class="how-steps">
        <div class="how-step">
          <div class="how-step-icon how-step-icon--1"><span class="material-symbols-rounded">person_add</span></div>
          <div class="how-step-num">PASO 1</div>
          <h3 class="how-step-title">Regístrate</h3>
          <p class="how-step-desc">Crea tu cuenta y verifica tu identidad en minutos</p>
        </div>
        <div class="how-step-arrow"><span class="material-symbols-rounded">arrow_forward</span></div>
        <div class="how-step">
          <div class="how-step-icon how-step-icon--2"><span class="material-symbols-rounded">search</span></div>
          <div class="how-step-num">PASO 2</div>
          <h3 class="how-step-title">Busca</h3>
          <p class="how-step-desc">Explora subastas de joyería, electrónica y más</p>
        </div>
        <div class="how-step-arrow"><span class="material-symbols-rounded">arrow_forward</span></div>
        <div class="how-step">
          <div class="how-step-icon how-step-icon--3"><span class="material-symbols-rounded">gavel</span></div>
          <div class="how-step-num">PASO 3</div>
          <h3 class="how-step-title">Puja</h3>
          <p class="how-step-desc">Haz tu oferta o activa la puja automática</p>
        </div>
        <div class="how-step-arrow"><span class="material-symbols-rounded">arrow_forward</span></div>
        <div class="how-step">
          <div class="how-step-icon how-step-icon--4"><span class="material-symbols-rounded">emoji_events</span></div>
          <div class="how-step-num">PASO 4</div>
          <h3 class="how-step-title">Gana</h3>
          <p class="how-step-desc">Paga solo si ganas — escrow seguro garantizado</p>
        </div>
      </div>
    </div>

    <!-- Seller CTA -->
    <div class="hub-seller-cta">
      <div class="seller-cta-inner">
        <div class="seller-cta-icon"><span class="material-symbols-rounded">storefront</span></div>
        <div class="seller-cta-text">
          <h2>¿Tienes algo que vender?</h2>
          <p>Publica tu subasta en minutos y llega a miles de compradores verificados en Colombia</p>
        </div>
        <button class="btn btn-lg" style="background:white;color:var(--purple);font-weight:800;flex-shrink:0" onclick="navigate('create')">
          <span class="material-symbols-rounded">add_circle</span>
          Crear subasta gratis
        </button>
      </div>
    </div>

    <!-- App waitlist -->
    <div class="hub-waitlist">
      <div class="waitlist-inner">
        <div class="waitlist-emoji">📱</div>
        <div class="waitlist-content">
          <div class="waitlist-tag">Próximamente</div>
          <h2 class="waitlist-title">App Trato para móvil</h2>
          <p class="waitlist-desc">Recibe notificaciones en tiempo real cuando te superen en una puja.</p>
          <div class="waitlist-form">
            <input type="email" class="form-input waitlist-input" id="waitlistEmail" placeholder="tu@email.com">
            <button class="btn btn-primary" onclick="_joinWaitlist()">
              <span class="material-symbols-rounded">notifications</span>
              Avisarme
            </button>
          </div>
        </div>
      </div>
    </div>
  `;

  _startHeroCarousel();
  startCardTimers();
}

function _renderHeroSlide(slide) {
  const total = HUB_HERO_SLIDES.length;
  return `
    <div class="hub-hero-inner" style="background:${slide.bg}">
      <div class="hub-hero-content">
        <span class="hub-hero-tag">${slide.tag}</span>
        <h2 class="hub-hero-title">${slide.title.replace('\n','<br>')}</h2>
        <p class="hub-hero-desc">${slide.desc}</p>
        <button class="btn btn-primary" onclick="navigate('auctions')">
          ${slide.cta}
          <span class="material-symbols-rounded">arrow_forward</span>
        </button>
      </div>
      <div class="hub-hero-visual">
        <div class="hub-hero-circle-bg"></div>
        <div class="hub-hero-emoji">${slide.emoji}</div>
      </div>
    </div>
    <div class="hub-hero-nav">
      <button class="hub-hero-nav-btn" onclick="_prevSlide()" aria-label="Anterior">
        <span class="material-symbols-rounded">chevron_left</span>
      </button>
      <div class="hub-hero-dots">
        ${HUB_HERO_SLIDES.map((_, i) => `
          <button class="hub-hero-dot ${i === _heroSlide ? 'active' : ''}"
            onclick="_goToSlide(${i})" aria-label="Ir a slide ${i+1}"></button>
        `).join('')}
      </div>
      <button class="hub-hero-nav-btn" onclick="_nextSlide()" aria-label="Siguiente">
        <span class="material-symbols-rounded">chevron_right</span>
      </button>
    </div>
  `;
}

function _startHeroCarousel() {
  if (_heroInterval) clearInterval(_heroInterval);
  _heroInterval = setInterval(_nextSlide, 5000);
}

function _nextSlide() {
  _heroSlide = (_heroSlide + 1) % HUB_HERO_SLIDES.length;
  _updateHero();
  _resetHeroInterval();
}

function _prevSlide() {
  _heroSlide = (_heroSlide - 1 + HUB_HERO_SLIDES.length) % HUB_HERO_SLIDES.length;
  _updateHero();
  _resetHeroInterval();
}

function _goToSlide(i) {
  _heroSlide = i;
  _updateHero();
  _resetHeroInterval();
}

function _updateHero() {
  const el = document.getElementById('hubHero');
  if (!el) return;
  el.classList.add('hub-hero--transitioning');
  setTimeout(() => {
    el.innerHTML = _renderHeroSlide(HUB_HERO_SLIDES[_heroSlide]);
    el.classList.remove('hub-hero--transitioning');
  }, 150);
}

function _resetHeroInterval() {
  if (_heroInterval) clearInterval(_heroInterval);
  _heroInterval = setInterval(_nextSlide, 5000);
}

function _joinWaitlist() {
  const email = document.getElementById('waitlistEmail')?.value?.trim();
  if (!email || !email.includes('@')) {
    showToast('Ingresa un email válido', 'error');
    return;
  }
  showToast('¡Listo! Te avisaremos cuando lancemos la app', 'success');
  const input = document.getElementById('waitlistEmail');
  if (input) input.value = '';
}

function renderAuctionCard(a) {
  const D = window.TRATO_DATA;
  const cd = D.countdown(a.endsAt);
  return `
    <div class="auction-card" onclick="navigate('detail', '${a.id}')">
      <div class="auction-img">
        <div class="auction-img-bg">${a.emoji || '📦'}</div>
        ${a.seller.verified ? `<span class="auction-verified-badge"><span class="material-symbols-rounded" style="font-size:11px">verified</span></span>` : ''}
      </div>
      <div class="auction-body">
        <div class="auction-category">${a.categoryLabel || 'General'}</div>
        <div class="auction-title">${a.title}</div>
        <div class="auction-footer">
          <div>
            <div class="auction-price-label">${a.totalBids > 0 ? 'Puja actual' : 'Precio inicial'}</div>
            <div class="auction-price">${D.fmt(a.currentPrice)}</div>
          </div>
          <div class="auction-timer ${cd.state}" data-ends="${a.endsAt}">
            <span class="material-symbols-rounded" style="font-size:13px">timer</span>
            <span class="timer-val">${cd.str}</span>
          </div>
        </div>
        <div class="auction-meta">
          <div class="auction-meta-item">
            <span class="material-symbols-rounded" style="font-size:14px">gavel</span>
            ${a.totalBids} ${a.totalBids === 1 ? 'puja' : 'pujas'}
          </div>
          <div class="auction-meta-item">
            <span class="material-symbols-rounded" style="font-size:14px">location_on</span>
            ${a.location || 'Colombia'}
          </div>
        </div>
      </div>
    </div>
  `;
}

function startCardTimers() {
  if (window._hubTimerInterval) clearInterval(window._hubTimerInterval);
  window._hubTimerInterval = setInterval(() => {
    const D = window.TRATO_DATA;
    document.querySelectorAll('[data-ends]').forEach(el => {
      const endsAt = +el.dataset.ends;
      const cd = D.countdown(endsAt);
      const val = el.querySelector('.timer-val');
      if (val) val.textContent = cd.str;
      const isFeatured = el.classList.contains('hub-featured-timer');
      const base = isFeatured ? 'hub-featured-timer' : 'auction-timer';
      el.className = `${base} ${cd.state}`;
      el.dataset.ends = endsAt;
    });
  }, 1000);
}
