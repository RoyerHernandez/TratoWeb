function initHub() {
  const D = window.TRATO_DATA;
  const auctions = D.auctions;
  const featured = auctions.find(a => a.totalBids > 5) || auctions[0];
  const endingSoon = auctions
    .filter(a => a.id !== featured?.id)
    .sort((a, b) => a.endsAt - b.endsAt)
    .slice(0, 4);

  const fcd = featured ? D.countdown(featured.endsAt) : null;

  document.getElementById('app-content').innerHTML = `
    <!-- Greeting -->
    <div class="hub-greeting">
      <div>
        <h1>Hola, Royer</h1>
        <p class="hub-greeting-sub">Tienes <strong>3 pujas activas</strong> · <strong>1 vas ganando</strong></p>
      </div>
      <button class="btn btn-primary btn-sm" onclick="navigate('create')">
        <span class="material-symbols-rounded">add</span>
        Nueva subasta
      </button>
    </div>

    <!-- KPIs -->
    <div class="kpi-row">
      <div class="kpi-card">
        <div class="kpi-icon kpi-icon--purple"><span class="material-symbols-rounded">gavel</span></div>
        <div><div class="kpi-value">3</div><div class="kpi-label">Pujas activas</div></div>
      </div>
      <div class="kpi-card">
        <div class="kpi-icon kpi-icon--teal"><span class="material-symbols-rounded">emoji_events</span></div>
        <div><div class="kpi-value">1</div><div class="kpi-label">Vas ganando</div></div>
      </div>
      <div class="kpi-card">
        <div class="kpi-icon kpi-icon--purple"><span class="material-symbols-rounded">storefront</span></div>
        <div><div class="kpi-value">2</div><div class="kpi-label">En venta</div></div>
      </div>
      <div class="kpi-card">
        <div class="kpi-icon kpi-icon--teal"><span class="material-symbols-rounded">swap_horiz</span></div>
        <div><div class="kpi-value">4</div><div class="kpi-label">Intercambios</div></div>
      </div>
    </div>

    ${featured ? `
    <!-- Featured auction -->
    <section class="hub-featured-section">
      <div class="section-header">
        <h2 class="section-title">Destacada ahora</h2>
        <span class="live-badge"><span class="live-dot"></span>En vivo</span>
      </div>
      <div class="featured-card" onclick="navigate('detail', '${featured.id}')">
        <div class="featured-img">
          <div class="featured-img-bg">
            <span style="font-size:80px">${featured.emoji || '💎'}</span>
          </div>
          <div class="featured-badges">
            <span class="featured-fire-badge">
              <span class="material-symbols-rounded" style="font-size:13px">local_fire_department</span>
              ${featured.totalBids} pujas
            </span>
            ${featured.seller.verified ? `<span class="featured-verified-badge"><span class="material-symbols-rounded" style="font-size:12px">verified</span> Verificado</span>` : ''}
          </div>
        </div>
        <div class="featured-body">
          <div class="featured-category">${featured.categoryLabel || 'General'}</div>
          <h3 class="featured-title">${featured.title}</h3>
          <div class="featured-seller">
            <div class="avatar-xs">${featured.seller.initials[0]}</div>
            <span>${featured.seller.name}</span>
            ${featured.seller.verified ? `<span class="material-symbols-rounded" style="font-size:14px;color:var(--purple)">verified</span>` : ''}
          </div>
          <div class="featured-footer">
            <div>
              <div class="featured-price-label">Puja actual</div>
              <div class="featured-price">${D.fmt(featured.currentPrice)}</div>
            </div>
            <div class="featured-timer ${fcd.state}" data-ends="${featured.endsAt}">
              <span class="material-symbols-rounded" style="font-size:14px">timer</span>
              <span class="timer-val">${fcd.str}</span>
            </div>
          </div>
          <div class="featured-bottom">
            <button class="btn btn-primary" onclick="navigate('detail', '${featured.id}'); event.stopPropagation()">
              <span class="material-symbols-rounded">gavel</span>
              Hacer puja
            </button>
            <div class="featured-pagas">
              <span class="material-symbols-rounded" style="font-size:14px">shield</span>
              Pagas solo si ganas
            </div>
          </div>
        </div>
      </div>
    </section>
    ` : ''}

    <!-- Ending soon -->
    <section class="hub-ending-section">
      <div class="section-header">
        <h2 class="section-title">Terminan pronto</h2>
        <a class="see-all-link" onclick="navigate('auctions'); return false" href="#">Ver todas <span class="material-symbols-rounded" style="font-size:16px;vertical-align:-4px">chevron_right</span></a>
      </div>
      <div class="auctions-grid">
        ${endingSoon.map(a => renderAuctionCard(a)).join('')}
      </div>
    </section>

    <!-- How it works -->
    <section class="hub-how-section">
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
    </section>

    <!-- Seller CTA -->
    <section class="hub-seller-cta">
      <div class="seller-cta-inner">
        <div class="seller-cta-icon"><span class="material-symbols-rounded">storefront</span></div>
        <div class="seller-cta-text">
          <h2>¿Tienes algo que vender?</h2>
          <p>Publica tu subasta en minutos y llega a miles de compradores verificados en Colombia</p>
        </div>
        <button class="btn btn-lg" style="background:white;color:var(--purple);font-weight:800" onclick="navigate('create')">
          <span class="material-symbols-rounded">add_circle</span>
          Crear subasta gratis
        </button>
      </div>
    </section>

    <!-- App waitlist -->
    <section class="hub-waitlist">
      <div class="waitlist-inner">
        <div class="waitlist-emoji">📱</div>
        <div class="waitlist-content">
          <div class="waitlist-tag">Próximamente</div>
          <h2 class="waitlist-title">App Trato para móvil</h2>
          <p class="waitlist-desc">Recibe notificaciones en tiempo real cuando te superen en una puja. Sé el primero en saberlo.</p>
          <div class="waitlist-form">
            <input type="email" class="form-input waitlist-input" id="waitlistEmail" placeholder="tu@email.com">
            <button class="btn btn-primary" onclick="_joinWaitlist()">
              <span class="material-symbols-rounded">notifications</span>
              Avisarme
            </button>
          </div>
        </div>
      </div>
    </section>
  `;

  startCardTimers();
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
        ${a.seller.verified ? `<span class="auction-verified-badge"><span class="material-symbols-rounded" style="font-size:12px">verified</span></span>` : ''}
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
      const isFeatured = el.classList.contains('featured-timer');
      el.className = `${isFeatured ? 'featured-timer' : 'auction-timer'} ${cd.state}`;
      el.dataset.ends = endsAt;
    });
  }, 1000);
}
