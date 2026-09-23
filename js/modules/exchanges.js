// ── EXCHANGES MODULE ──

const EXCHANGES = [
  {
    id: 1,
    title: 'Reloj Seiko Prospex SPB143 Automático',
    category: 'relojes',
    categoryLabel: 'Relojes',
    emoji: '⌚',
    gradient: 'linear-gradient(135deg, #DFF5F4 0%, #A8E0DE 100%)',
    imgUrl: 'https://images.unsplash.com/photo-1587836374828-4dbafa94cf0e?w=600&q=80',
    seller: { name: 'Tiempo & Estilo', initials: 'TE', rating: 4.7, sales: 203, verified: true, location: 'Medellín' },
    description: 'Seiko Prospex SPB143 automático. Movimiento calibre 6R35, reserva de marcha 70h. Cristal zafiro, resistencia al agua 200m. Caja y documentos completos. Acepto intercambio por joyería fina, otro reloj de igual valor o efectivo.',
    estimatedValue: 1750000,
    accepts: ['efectivo', 'joyas', 'relojes', 'tecnologia'],
    acceptsLabel: ['Efectivo', 'Joyería', 'Relojes', 'Tecnología'],
    condition: 'Como nuevo',
    location: 'Medellín',
    watchers: 45,
    badge: 'exchange',
    totalOffers: 6,
  },
  {
    id: 2,
    title: 'iPhone 15 Pro 256GB Titanio Natural',
    category: 'tecnologia',
    categoryLabel: 'Tecnología',
    emoji: '📱',
    gradient: 'linear-gradient(135deg, #F3E8FD 0%, #D4A8F0 100%)',
    imgUrl: 'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=600&q=80',
    seller: { name: 'TechStore CO', initials: 'TC', rating: 4.6, sales: 1240, verified: true, location: 'Bogotá' },
    description: 'iPhone 15 Pro 256GB Titanio Natural. Chip A17 Pro, cámara 48MP con zoom óptico 5x. Sin rayones, batería al 96%. Desbloqueado. Busco intercambio por MacBook, tablet o joyas de valor equivalente.',
    estimatedValue: 3850000,
    accepts: ['computadores', 'joyas', 'tablets', 'efectivo'],
    acceptsLabel: ['Computadores', 'Joyería', 'Tablets', 'Efectivo'],
    condition: 'Usado - Excelente',
    location: 'Bogotá D.C.',
    watchers: 87,
    badge: 'exchange',
    totalOffers: 12,
  },
  {
    id: 3,
    title: 'Anillo Esmeralda Baguette Oro 18K',
    category: 'joyeria',
    categoryLabel: 'Joyería',
    emoji: '💍',
    gradient: 'linear-gradient(135deg, #DFF5F4 0%, #C8ECE9 100%)',
    imgUrl: 'https://images.unsplash.com/photo-1589128777073-263566ae5e4d?w=600&q=80',
    seller: { name: 'Maru Joyería', initials: 'MJ', rating: 4.9, sales: 847, verified: true, location: 'Bogotá' },
    description: 'Anillo con esmeralda corte baguette de 1.1ct en montura de oro amarillo 18K. Talla 16. Certificado de autenticidad GIA incluido. Interesado en relojes de lujo, otras joyas o efectivo.',
    estimatedValue: 2550000,
    accepts: ['relojes', 'joyas', 'efectivo'],
    acceptsLabel: ['Relojes', 'Joyería', 'Efectivo'],
    condition: 'Nuevo',
    location: 'Bogotá — La Candelaria',
    watchers: 62,
    badge: 'exchange',
    totalOffers: 4,
  },
  {
    id: 4,
    title: 'MacBook Pro M3 Pro 14" 18GB/512GB',
    category: 'tecnologia',
    categoryLabel: 'Tecnología',
    emoji: '💻',
    gradient: 'linear-gradient(135deg, #F3E8FD 0%, #EDE0F8 100%)',
    imgUrl: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=600&q=80',
    seller: { name: 'Apple Resellers', initials: 'AR', rating: 4.9, sales: 560, verified: true, location: 'Cali' },
    description: 'MacBook Pro 14" con chip M3 Pro, 18GB RAM unificada, 512GB SSD. Pantalla Liquid Retina XDR. Batería al 94%. Cargador original incluido. Acepto iPhone 15 Pro, cámara Sony profesional u otros equipos de valor similar.',
    estimatedValue: 7400000,
    accepts: ['telefonos', 'camaras', 'tablets', 'efectivo'],
    acceptsLabel: ['Teléfonos', 'Cámaras', 'Tablets', 'Efectivo'],
    condition: 'Usado - Excelente',
    location: 'Cali',
    watchers: 134,
    badge: 'exchange',
    totalOffers: 9,
  },
  {
    id: 5,
    title: 'Nike Air Jordan 1 Retro High OG Talla 42',
    category: 'calzado',
    categoryLabel: 'Calzado',
    emoji: '👟',
    gradient: 'linear-gradient(135deg, #FFE8DF 0%, #FFDDD1 100%)',
    imgUrl: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&q=80',
    seller: { name: 'Sneakers Bogotá', initials: 'SB', rating: 4.8, sales: 334, verified: false, location: 'Bogotá' },
    description: 'Air Jordan 1 Retro High OG "Chicago" talla 42. Originales Nike, nunca usados, etiqueta del precio. Caja original completa. StockX verificado. Acepto tenis de igual valor (Nike, Adidas, New Balance), ropa deportiva o efectivo.',
    estimatedValue: 680000,
    accepts: ['calzado', 'ropa', 'efectivo'],
    acceptsLabel: ['Calzado', 'Ropa deportiva', 'Efectivo'],
    condition: 'Nuevo sin usar',
    location: 'Bogotá D.C.',
    watchers: 28,
    badge: 'exchange',
    totalOffers: 3,
  },
];

// Expose globally for hub KPI count
window.EXCHANGES = EXCHANGES;

// ── EXCHANGES LIST ──
function initExchanges() {
  const D = window.TRATO_DATA;
  let filtered = [...EXCHANGES];
  let activeCategory = 'all';

  const categories = [
    { id: 'all', label: 'Todos' },
    { id: 'relojes', label: 'Relojes' },
    { id: 'tecnologia', label: 'Tecnología' },
    { id: 'joyeria', label: 'Joyería' },
    { id: 'calzado', label: 'Calzado' },
  ];

  function renderExchangeCard(ex) {
    const acceptChips = ex.acceptsLabel.slice(0, 3).map(l =>
      `<span class="accept-chip">${l}</span>`
    ).join('') + (ex.acceptsLabel.length > 3 ? `<span class="accept-chip">+${ex.acceptsLabel.length - 3}</span>` : '');

    return `
      <div class="exchange-card" onclick="navigate('exchange-detail', ${ex.id})">
        <div class="exchange-card-img" style="background:${ex.gradient}">
          <img src="${ex.imgUrl}" alt="${ex.title}" loading="lazy"
            onerror="this.style.display='none';this.parentElement.innerHTML+='<span style=\\"font-size:56px\\">${ex.emoji}</span>'">
          <div class="exchange-badge">Intercambio</div>
        </div>
        <div class="exchange-card-body">
          <div class="exchange-card-cat">${ex.categoryLabel}</div>
          <div class="exchange-card-title">${ex.title}</div>
          <div class="exchange-card-seller">
            <span class="material-symbols-rounded" style="font-size:13px;color:var(--gray-400)">person</span>
            ${ex.seller.name} · ${ex.location.split(' ')[0]}
          </div>
          <div style="margin-bottom:4px">
            <div class="exchange-card-value-lbl">Valor estimado</div>
            <div class="exchange-card-value">${D.fmt(ex.estimatedValue)}</div>
          </div>
          <div class="exchange-accepts" style="margin-bottom:12px">
            <div style="font-size:11px;color:var(--gray-500);font-weight:600;margin-bottom:4px">Acepta:</div>
            ${acceptChips}
          </div>
          <div class="exchange-card-footer">
            <button class="btn btn-teal btn-sm" onclick="event.stopPropagation();navigate('exchange-detail',${ex.id})">
              Ver intercambio
            </button>
          </div>
        </div>
      </div>`;
  }

  function renderGrid() {
    const grid = document.getElementById('exchange-grid');
    if (!grid) return;
    if (filtered.length === 0) {
      grid.innerHTML = `<div class="empty-state" style="grid-column:1/-1">
        <span class="material-symbols-rounded" style="font-size:48px;color:var(--gray-300)">swap_horiz</span>
        <p style="margin-top:12px;color:var(--gray-400)">No hay intercambios en esta categoría</p>
      </div>`;
      return;
    }
    grid.innerHTML = filtered.map(ex => renderExchangeCard(ex)).join('');
  }

  document.getElementById('app-content').innerHTML = `
    <div class="exchange-banner">
      <div class="exchange-banner-text">
        <h2>Intercambios activos</h2>
        <p>Intercambia artículos sin dinero de por medio. Negocia directo con el vendedor.</p>
      </div>
      <div class="exchange-banner-icon">🔄</div>
    </div>

    <div class="filter-row" id="exchange-filters">
      ${categories.map(c => `
        <button class="chip teal ${c.id === 'all' ? 'active' : ''}" data-cat="${c.id}">${c.label}</button>
      `).join('')}
    </div>

    <div style="font-size:13px;color:var(--gray-500);margin-bottom:16px">
      <strong style="color:var(--gray-900)">${EXCHANGES.length}</strong> intercambios disponibles
    </div>

    <div class="exchange-grid" id="exchange-grid"></div>
  `;

  renderGrid();

  // Category filter
  document.getElementById('exchange-filters').addEventListener('click', e => {
    const btn = e.target.closest('[data-cat]');
    if (!btn) return;
    activeCategory = btn.dataset.cat;
    document.querySelectorAll('#exchange-filters .chip').forEach(c => c.classList.remove('active'));
    btn.classList.add('active');
    filtered = activeCategory === 'all'
      ? [...EXCHANGES]
      : EXCHANGES.filter(ex => ex.category === activeCategory);
    renderGrid();
  });

  // FAB
  const existingFab = document.querySelector('.fab');
  if (existingFab) existingFab.remove();
  const fab = document.createElement('button');
  fab.className = 'fab fab-teal';
  fab.innerHTML = '<span class="material-symbols-rounded">add</span> Publicar intercambio';
  fab.onclick = () => navigate('create');
  document.body.appendChild(fab);
}

// ── EXCHANGE DETAIL ──
function initExchangeDetail(id) {
  const D = window.TRATO_DATA;
  const ex = EXCHANGES.find(e => e.id === id);
  if (!ex) { navigate('exchanges'); return; }

  const acceptChips = ex.acceptsLabel.map(l =>
    `<span class="exchange-badge-teal">${l}</span>`
  ).join('');

  const specItems = [
    { label: 'Condición', value: ex.condition },
    { label: 'Categoría', value: ex.categoryLabel },
    { label: 'Ubicación', value: ex.location },
    { label: 'Ofertas recibidas', value: ex.totalOffers },
    { label: 'Interesados', value: ex.watchers },
    { label: 'Vendedor', value: ex.seller.name },
  ];

  document.getElementById('app-content').innerHTML = `
    <button class="btn-back" onclick="navigate('exchanges')">
      <span class="material-symbols-rounded">arrow_back</span>
      Volver a intercambios
    </button>

    <div class="exchange-detail-layout">
      <!-- LEFT COLUMN -->
      <div>
        <!-- Gallery -->
        <div class="detail-img" style="background:${ex.gradient}">
          <img src="${ex.imgUrl}" alt="${ex.title}"
            onerror="this.style.display='none'">
          <div class="detail-emoji">${ex.emoji}</div>
        </div>

        <!-- Category & Title -->
        <div class="detail-category">${ex.categoryLabel}</div>
        <div class="detail-title">${ex.title}</div>

        <!-- Seller card -->
        <div class="seller-card">
          <div class="seller-avatar">${ex.seller.initials}</div>
          <div class="seller-info">
            <div class="seller-name">
              ${ex.seller.name}
              ${ex.seller.verified ? '<span class="material-symbols-rounded verified-icon" style="font-size:15px">verified</span>' : ''}
            </div>
            <div class="seller-stats">
              <span class="stars">★</span>${ex.seller.rating}
              <span>·</span>${ex.seller.sales} ventas
              <span>·</span>${ex.seller.location}
            </div>
          </div>
        </div>

        <!-- Description -->
        <div class="detail-section">
          <div class="detail-section-title">Descripción</div>
          <div class="detail-desc">${ex.description}</div>
        </div>

        <!-- Specs -->
        <div class="detail-section">
          <div class="detail-section-title">Detalles del artículo</div>
          <div class="detail-specs">
            ${specItems.map(s => `
              <div class="spec-item">
                <div class="spec-label">${s.label}</div>
                <div class="spec-value">${s.value}</div>
              </div>
            `).join('')}
          </div>
        </div>
      </div>

      <!-- RIGHT PANEL -->
      <div>
        <div class="exchange-panel">
          <!-- Value -->
          <div class="exchange-value-block">
            <div class="exchange-value-label">Valor estimado</div>
            <div class="exchange-value">${D.fmt(ex.estimatedValue)}</div>
            <div class="exchange-watchers">
              <span class="material-symbols-rounded" style="font-size:14px">visibility</span>
              ${ex.watchers} personas mirando
            </div>
          </div>

          <!-- Accepts -->
          <div class="accepts-section">
            <div class="accepts-label">El vendedor acepta:</div>
            <div class="accepts-chips">${acceptChips}</div>
          </div>

          <!-- Offer Tabs -->
          <div class="offer-tabs" id="offerTabs">
            <button class="offer-tab active" data-tab="precio">Ofrecer precio</button>
            <button class="offer-tab" data-tab="articulo">Ofrecer artículo</button>
          </div>

          <!-- Tab: Precio -->
          <div class="offer-tab-content active" id="tab-precio">
            <div class="form-group" style="margin-bottom:12px">
              <label class="bid-input-label">Tu oferta en pesos</label>
              <div class="bid-input-row">
                <span class="bid-currency">$</span>
                <input class="bid-input" type="number" id="offerPrice"
                  placeholder="${Math.round(ex.estimatedValue * 0.9 / 1000) * 1000}"
                  min="1">
              </div>
              <div class="bid-min-hint">Valor estimado: ${D.fmt(ex.estimatedValue)}</div>
            </div>
            <div class="form-group" style="margin-bottom:16px">
              <label class="bid-input-label">Mensaje al vendedor (opcional)</label>
              <textarea class="form-control" rows="3" id="offerMsg"
                placeholder="Hola, me interesa tu artículo..."></textarea>
            </div>
          </div>

          <!-- Tab: Artículo -->
          <div class="offer-tab-content" id="tab-articulo">
            <div class="form-group" style="margin-bottom:12px">
              <label class="bid-input-label">¿Qué ofreces a cambio?</label>
              <input class="form-control" type="text" id="offerItem"
                placeholder="Ej: Reloj Casio G-Shock, talla 42">
            </div>
            <div class="form-group" style="margin-bottom:12px">
              <label class="bid-input-label">Valor estimado de tu artículo</label>
              <div class="bid-input-row">
                <span class="bid-currency">$</span>
                <input class="bid-input" type="number" id="offerItemPrice" placeholder="0">
              </div>
            </div>
            <div class="form-group" style="margin-bottom:16px">
              <label class="bid-input-label">Descripción</label>
              <textarea class="form-control" rows="3" id="offerItemDesc"
                placeholder="Describe el estado y características de lo que ofreces..."></textarea>
            </div>
          </div>

          <!-- Escrow notice -->
          <div class="escrow-notice">
            <span class="material-symbols-rounded" style="font-size:16px;flex-shrink:0">verified_user</span>
            <span>Trato actúa como intermediario seguro. El artículo es verificado antes de completar el intercambio.</span>
          </div>

          <!-- Submit Button -->
          <button class="btn btn-teal btn-full btn-lg" onclick="_submitExchangeOffer(${ex.id})">
            <span class="material-symbols-rounded">send</span>
            Enviar oferta
          </button>

          <div style="text-align:center;margin-top:10px;font-size:12px;color:var(--gray-400)">
            ${ex.totalOffers} ofertas enviadas · Sin costo hasta cerrar trato
          </div>
        </div>
      </div>
    </div>
  `;

  // Tab switching
  document.getElementById('offerTabs').addEventListener('click', e => {
    const tab = e.target.closest('.offer-tab');
    if (!tab) return;
    const tabId = tab.dataset.tab;
    document.querySelectorAll('.offer-tab').forEach(t => t.classList.remove('active'));
    document.querySelectorAll('.offer-tab-content').forEach(c => c.classList.remove('active'));
    tab.classList.add('active');
    const content = document.getElementById(`tab-${tabId}`);
    if (content) content.classList.add('active');
  });
}

// ── SUBMIT OFFER HELPER ──
function _submitExchangeOffer(id) {
  const activeTab = document.querySelector('.offer-tab.active');
  if (!activeTab) return;
  const tabId = activeTab.dataset.tab;

  if (tabId === 'precio') {
    const price = document.getElementById('offerPrice')?.value;
    if (!price || Number(price) <= 0) {
      showToast('Por favor ingresa un precio válido', 'error');
      return;
    }
    const D = window.TRATO_DATA;
    showToast(`¡Oferta de ${D.fmt(Number(price))} enviada! El vendedor te contactará pronto.`, 'success');
  } else {
    const item = document.getElementById('offerItem')?.value?.trim();
    if (!item) {
      showToast('Por favor describe el artículo que ofreces', 'error');
      return;
    }
    showToast(`¡Oferta de "${item}" enviada! El vendedor te contactará pronto.`, 'success');
  }

  setTimeout(() => navigate('exchanges'), 1200);
}
