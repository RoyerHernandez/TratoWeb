// Hero carousel slides
const HUB_HERO_SLIDES = [
  {
    tag: 'Nuevos lotes',
    title: 'Arte y\ncoleccionables',
    desc: 'Cuadros, figuras y objetos únicos que llegan cada semana a subasta.',
    cta: 'Ver lotes',
    emoji: '🖼️',
    bg: 'var(--teal-soft)',
    cat: 'all',
  },
  {
    tag: 'Populares',
    title: 'Relojes y\nvintage',
    desc: 'Seikos, Casios y relojes de colección a subasta. Encuentra tu próximo tesoro.',
    cta: 'Explorar',
    emoji: '⌚',
    bg: 'var(--purple-light)',
    cat: 'relojes',
  },
  {
    tag: 'Últimas horas',
    title: 'Joyería\ncolombiana',
    desc: 'Esmeraldas de Muzo, oro 18K y piezas únicas de los mejores joyeros del país.',
    cta: 'Ver subastas',
    emoji: '💎',
    bg: '#F0FDF4',
    cat: 'joyeria',
  },
];

let _heroSlide = 0;
let _heroInterval = null;

function initHub() {
  const D = window.TRATO_DATA;

  if (_heroInterval) { clearInterval(_heroInterval); _heroInterval = null; }
  if (window._hubTimerInterval) { clearInterval(window._hubTimerInterval); window._hubTimerInterval = null; }

  const featured = D.auctions.find(a => a.totalBids >= 8) || D.auctions[0];
  const endingSoon = [...D.auctions].sort((a, b) => a.endsAt - b.endsAt).slice(0, 6);
  const fcd = D.countdown(featured.endsAt);

  document.getElementById('app-content').innerHTML = `
    <!-- ① Hero Carousel -->
    <div class="hub-hero" id="hubHero">
      ${_renderHeroSlide(HUB_HERO_SLIDES[_heroSlide])}
    </div>

    <!-- ② Puja en tiempo real -->
    <div class="hub-live-row">
      <div class="hub-live-left">
        <span class="hub-live-badge"><span class="live-dot"></span>Subastas en vivo</span>
        <h2 class="hub-live-headline">Puja en tiempo<br>real. Cierra tu<br>trato.</h2>
        <p class="hub-live-desc">Encuentra piezas únicas, sigue cada oferta al segundo y paga de forma segura cuando ganas.</p>
        <div class="hub-live-btns">
          <button class="btn btn-primary" onclick="navigate('auctions')">Explorar subastas</button>
          <button class="btn btn-ghost" onclick="navigate('create')">Vender un artículo</button>
        </div>
      </div>
      <div class="hub-live-right">
        <div class="hub-live-card" onclick="navigate('detail', '${featured.id}')">
          <div class="hub-live-card-img">
            <span class="hub-live-card-emoji">${featured.emoji || '📦'}</span>
            <span class="hub-live-card-tag">Destacado</span>
          </div>
          <div class="hub-live-card-body">
            <div class="hub-live-card-lote">Lote #${featured.id.toString().padStart(4,'0')} · ${featured.categoryLabel}</div>
            <div class="hub-live-card-title">${featured.title}</div>
            <div class="hub-live-card-meta">
              <div>
                <div class="hub-live-card-meta-label">Puja actual · ${featured.totalBids} pujas</div>
                <div class="hub-live-card-price">${D.fmt(featured.currentPrice)}</div>
              </div>
              <div>
                <div class="hub-live-card-meta-label">Terminan</div>
                <div class="hub-live-card-countdown ${fcd.state}" id="liveFeaturedTimer" data-ends="${featured.endsAt}">
                  <span class="timer-val">${fcd.str}</span>
                </div>
              </div>
            </div>
            <button class="btn hub-live-card-btn" onclick="navigate('detail', '${featured.id}'); event.stopPropagation()">
              Pujar ${D.fmt(featured.currentPrice + (featured.minIncrement || 50000))}
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- ③ Category chips -->
    <div class="hub-cat-row">
      ${['Arte','Relojes','Tecnología','Vehículos','Coleccionables','Hogar','Moda','Joyería'].map(c => `
        <button class="hub-cat-chip" onclick="navigate('auctions')">${c}</button>
      `).join('')}
    </div>

    <!-- ④ Terminan pronto -->
    <div class="hub-ending-section">
      <div class="section-header">
        <h2 class="hub-section-title">Terminan pronto</h2>
        <a class="hub-see-all" onclick="navigate('auctions'); return false" href="#">Ver todas las subastas</a>
      </div>
      <div class="hub-cards-grid" id="hubCardsGrid">
        ${endingSoon.map(a => renderAuctionCard(a)).join('')}
      </div>
    </div>

    <!-- ⑤ Así de fácil -->
    <div class="hub-how-dark">
      <h2 class="hub-how-dark-title">Así de fácil</h2>
      <div class="hub-how-dark-steps">
        <div class="hub-dark-step">
          <div class="hub-dark-step-num">1</div>
          <h3 class="hub-dark-step-title">Crea tu cuenta</h3>
          <p class="hub-dark-step-desc">Verifica tu identidad y agrega un método de pago para poder pujar.</p>
        </div>
        <div class="hub-dark-step">
          <div class="hub-dark-step-num">2</div>
          <h3 class="hub-dark-step-title">Puja en vivo</h3>
          <p class="hub-dark-step-desc">Sigue el contador y recibe un aviso cuando alguien supere tu oferta.</p>
        </div>
        <div class="hub-dark-step">
          <div class="hub-dark-step-num">3</div>
          <h3 class="hub-dark-step-title">Gana y recibe</h3>
          <p class="hub-dark-step-desc">Al cerrar la subasta, paga con seguridad y coordina el envío con el vendedor.</p>
        </div>
      </div>
    </div>

    <!-- ⑥ Seller CTA -->
    <div class="hub-seller-teal">
      <div class="hub-seller-teal-left">
        <h2 class="hub-seller-teal-title">¿Tienes algo para<br>subastar?</h2>
        <p class="hub-seller-teal-desc">Publica tu artículo, fija un precio base y deja que los compradores compitan.</p>
        <button class="btn btn-primary" onclick="navigate('create')">Empezar a vender</button>
      </div>
      <div class="hub-seller-teal-deco"></div>
    </div>

    <!-- ⑦ App Waitlist -->
    <div class="hub-app-section">
      <div class="hub-app-left">
        <span class="hub-app-tag">Próximamente</span>
        <h2 class="hub-app-title">La app de Trato<br>está en camino</h2>
        <p class="hub-app-desc">Notificaciones al instante para no perder ninguna subasta. Déjanos tu correo y te avisamos al lanzar.</p>
        <div class="hub-app-form">
          <input type="email" class="form-input hub-app-input" id="waitlistEmail" placeholder="tu@correo.com">
          <button class="btn btn-primary" onclick="_joinWaitlist()">Avisarme</button>
        </div>
      </div>
      <div class="hub-app-right">
        <div class="hub-app-phone">
          <div class="hub-app-phone-screen">PANTALLA<br>DE LA APP</div>
        </div>
      </div>
    </div>
  `;

  _startHeroCarousel();
  startCardTimers();
}

// ── Hero carousel ──────────────────────────────
function _renderHeroSlide(slide) {
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
      <button class="hub-hero-nav-btn" onclick="_prevSlide()">
        <span class="material-symbols-rounded">chevron_left</span>
      </button>
      <div class="hub-hero-dots">
        ${HUB_HERO_SLIDES.map((_,i) => `
          <button class="hub-hero-dot ${i===_heroSlide?'active':''}" onclick="_goToSlide(${i})"></button>
        `).join('')}
      </div>
      <button class="hub-hero-nav-btn" onclick="_nextSlide()">
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
  _updateHero(); _resetHeroInterval();
}
function _prevSlide() {
  _heroSlide = (_heroSlide - 1 + HUB_HERO_SLIDES.length) % HUB_HERO_SLIDES.length;
  _updateHero(); _resetHeroInterval();
}
function _goToSlide(i) {
  _heroSlide = i; _updateHero(); _resetHeroInterval();
}
function _updateHero() {
  const el = document.getElementById('hubHero');
  if (!el) return;
  el.style.opacity = '0';
  setTimeout(() => {
    el.innerHTML = _renderHeroSlide(HUB_HERO_SLIDES[_heroSlide]);
    el.style.opacity = '1';
  }, 150);
}
function _resetHeroInterval() {
  if (_heroInterval) clearInterval(_heroInterval);
  _heroInterval = setInterval(_nextSlide, 5000);
}

function _joinWaitlist() {
  const email = document.getElementById('waitlistEmail')?.value?.trim();
  if (!email || !email.includes('@')) { showToast('Ingresa un email válido', 'error'); return; }
  showToast('¡Listo! Te avisaremos cuando lancemos la app', 'success');
  const input = document.getElementById('waitlistEmail');
  if (input) input.value = '';
}

// ── Auction card (used by hub + auctions page) ─
function renderAuctionCard(a) {
  const D = window.TRATO_DATA;
  const cd = D.countdown(a.endsAt);
  const nextBid = a.currentPrice + (a.minIncrement || 50000);
  return `
    <div class="hcard" onclick="navigate('detail', '${a.id}')">
      <div class="hcard-img">
        <div class="hcard-img-bg">${a.emoji || '📦'}</div>
        <button class="hcard-fav" onclick="showToast('Guardado en favoritos','success');event.stopPropagation()">
          <span class="material-symbols-rounded">favorite_border</span>
        </button>
        <div class="hcard-timer ${cd.state}" data-ends="${a.endsAt}">
          <span class="material-symbols-rounded" style="font-size:12px">timer</span>
          <span class="timer-val">${cd.str}</span>
        </div>
      </div>
      <div class="hcard-body">
        <div class="hcard-cat">${a.categoryLabel || 'General'}</div>
        <div class="hcard-title">${a.title}</div>
        <div class="hcard-footer">
          <div class="hcard-price">${D.fmt(a.currentPrice)}</div>
          <button class="hcard-bid-btn" onclick="navigate('detail','${a.id}');event.stopPropagation()">Pujar</button>
        </div>
        <div class="hcard-meta">${a.totalBids} pujas</div>
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
      // Preserve class structure
      if (el.classList.contains('hcard-timer')) {
        el.className = `hcard-timer ${cd.state}`;
        el.dataset.ends = endsAt;
      } else if (el.classList.contains('hub-live-card-countdown')) {
        el.className = `hub-live-card-countdown ${cd.state}`;
        el.dataset.ends = endsAt;
      }
    });
  }, 1000);
}
