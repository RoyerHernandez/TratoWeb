function initSeller(sellerId) {
  const D = window.TRATO_DATA;
  const s = D.sellers && D.sellers.find(x => x.id === sellerId);
  if (!s) { navigate('auctions'); return; }

  const sellerAuctions = D.auctions.filter(a => a.seller.name === s.name);

  document.getElementById('app-content').innerHTML = `
    <button class="btn-back" onclick="navigate('auctions')">
      <span class="material-symbols-rounded">arrow_back</span> Volver a subastas
    </button>

    <div class="seller-profile">

      <div class="sp-banner" style="background:${s.gradient}"></div>

      <div class="sp-header-wrap">
        <div class="sp-avatar-wrap">
          <div class="sp-avatar">${s.initials}</div>
        </div>
        <div class="sp-header">
          <div class="sp-header-left">
            <div class="sp-name">${s.name}</div>
            <div class="sp-badges">
              ${s.badges.map(b => `<span class="sp-badge">${b}</span>`).join('')}
            </div>
            <div class="sp-meta">
              <span><span class="material-symbols-rounded sp-meta-icon">location_on</span>${s.location}</span>
              <span><span class="material-symbols-rounded sp-meta-icon">calendar_month</span>Miembro desde ${s.memberSince}</span>
              <span>⭐ ${s.rating} calificación</span>
            </div>
          </div>
          <div class="sp-header-actions">
            <button class="btn btn-teal btn-sm" id="sp-follow-btn" onclick="_sellerFollow(this, '${s.name}')">
              <span class="material-symbols-rounded">add</span> Seguir
            </button>
            <button class="btn btn-primary btn-sm" onclick="showToast('Abriendo chat con ${s.name}...', 'info')">
              <span class="material-symbols-rounded">chat_bubble</span> Contactar
            </button>
          </div>
        </div>
      </div>

      <div class="sp-stats-row">
        <div class="sp-stat">
          <div class="sp-stat-val">${s.sales}</div>
          <div class="sp-stat-lbl">Ventas</div>
        </div>
        <div class="sp-stat">
          <div class="sp-stat-val">${s.rating} ⭐</div>
          <div class="sp-stat-lbl">Calificación</div>
        </div>
        <div class="sp-stat">
          <div class="sp-stat-val">${s.activeListings}</div>
          <div class="sp-stat-lbl">Activas</div>
        </div>
        <div class="sp-stat">
          <div class="sp-stat-val">${s.followers >= 1000 ? (s.followers / 1000).toFixed(1) + 'K' : s.followers}</div>
          <div class="sp-stat-lbl">Seguidores</div>
        </div>
        <div class="sp-stat">
          <div class="sp-stat-val">${s.deliveryRate}%</div>
          <div class="sp-stat-lbl">Entregas</div>
        </div>
      </div>

      <div class="sp-tabs" id="sp-tabs">
        <button class="sp-tab active" data-tab="auctions">
          Subastas activas <span class="sp-tab-count">${sellerAuctions.length}</span>
        </button>
        <button class="sp-tab" data-tab="exchanges">
          Intercambios <span class="sp-tab-count">3</span>
        </button>
        <button class="sp-tab" data-tab="history">
          Historial <span class="sp-tab-count">${s.sales}</span>
        </button>
      </div>

      <div class="sp-content">
        <div class="sp-main" id="sp-main">
          ${_renderSpAuctions(sellerAuctions)}
        </div>
        <aside class="sp-sidebar">
          <div class="sp-verified-card">
            <div class="sp-vc-title">
              <span class="material-symbols-rounded">verified_user</span>
              Vendedor Verificado
            </div>
            <div class="sp-verify-list">
              <div class="sp-verify-item ${s.verification.cedula ? 'verified' : ''}">
                <span class="material-symbols-rounded sp-verify-icon">${s.verification.cedula ? 'check_circle' : 'cancel'}</span>
                Cédula de ciudadanía
              </div>
              <div class="sp-verify-item ${s.verification.facial ? 'verified' : ''}">
                <span class="material-symbols-rounded sp-verify-icon">${s.verification.facial ? 'check_circle' : 'cancel'}</span>
                Reconocimiento facial
              </div>
              <div class="sp-verify-item ${s.verification.phone ? 'verified' : ''}">
                <span class="material-symbols-rounded sp-verify-icon">${s.verification.phone ? 'check_circle' : 'cancel'}</span>
                Teléfono verificado
              </div>
            </div>
          </div>

          <div class="sp-rating-card">
            <div class="sp-rc-header">
              <div class="sp-rating-big">${s.rating}</div>
              <div>
                <div class="sp-stars">⭐⭐⭐⭐⭐</div>
                <div class="sp-reviews">${s.sales} reseñas</div>
              </div>
            </div>
            <div class="sp-bars">
              ${[5, 4, 3, 2, 1].map(star => `
                <div class="sp-bar-row">
                  <span class="sp-bar-label">${star}★</span>
                  <div class="sp-bar-track">
                    <div class="sp-bar-fill" style="width:${s.ratingDistribution[star] || 0}%"></div>
                  </div>
                  <span class="sp-bar-pct">${s.ratingDistribution[star] || 0}%</span>
                </div>
              `).join('')}
            </div>
          </div>
        </aside>
      </div>

    </div>
  `;

  document.getElementById('sp-tabs').addEventListener('click', e => {
    const tab = e.target.closest('.sp-tab');
    if (!tab) return;
    document.querySelectorAll('.sp-tab').forEach(t => t.classList.remove('active'));
    tab.classList.add('active');
    const main = document.getElementById('sp-main');
    switch (tab.dataset.tab) {
      case 'auctions':
        main.innerHTML = _renderSpAuctions(sellerAuctions);
        break;
      case 'exchanges':
        main.innerHTML = `<div class="sp-empty"><span class="material-symbols-rounded">swap_horiz</span><p>No hay intercambios activos</p></div>`;
        break;
      case 'history':
        main.innerHTML = `<div class="sp-empty"><span class="material-symbols-rounded">history</span><p>Historial disponible próximamente</p></div>`;
        break;
    }
  });
}

function _renderSpAuctions(auctions) {
  if (!auctions.length) {
    return `<div class="sp-empty"><span class="material-symbols-rounded">gavel</span><p>No hay subastas activas</p></div>`;
  }
  return `<div class="auction-grid">${auctions.map(a => _renderSpCard(a)).join('')}</div>`;
}

function _renderSpCard(a) {
  const D = window.TRATO_DATA;
  const cd = D.countdown(a.endsAt);
  const timerClass = cd.state === 'urgent' ? 'urgent' : cd.state === 'soon' ? 'soon' : '';
  const badge = a.badge ? `<div class="pcard-live badge-${a.badge}">${a.badgeLabel}</div>` : '';
  return `
    <div class="pcard" onclick="navigate('detail', ${a.id})">
      <div class="pcard-img" style="background:${a.gradient}">
        <img src="${a.imgUrl}" alt="${a.title}" loading="lazy"
          onerror="this.style.display='none';this.parentElement.innerHTML+='<span style=\\"font-size:56px\\">${a.emoji}</span>'">
        ${badge}
        <div class="pcard-timer ${timerClass}" data-ends="${a.endsAt}" data-timer>
          <span class="material-symbols-rounded" style="font-size:12px">timer</span>
          <span>${cd.str}</span>
        </div>
      </div>
      <div class="pcard-body">
        <div class="pcard-cat">${a.categoryLabel}</div>
        <div class="pcard-title">${a.title}</div>
        <div class="pcard-footer">
          <div>
            <div class="pcard-price-lbl">Puja actual</div>
            <div class="pcard-price">${D.fmt(a.currentPrice)}</div>
          </div>
          <button class="pcard-btn" onclick="event.stopPropagation();navigate('detail',${a.id})">${a.totalBids} pujas</button>
        </div>
      </div>
    </div>`;
}

function _sellerFollow(btn, sellerName) {
  const isFollowing = btn.dataset.following === '1';
  if (isFollowing) {
    btn.dataset.following = '0';
    btn.innerHTML = '<span class="material-symbols-rounded">add</span> Seguir';
    btn.classList.remove('btn-ghost');
    btn.classList.add('btn-teal');
    showToast(`Dejaste de seguir a ${sellerName}`, 'info');
  } else {
    btn.dataset.following = '1';
    btn.innerHTML = '<span class="material-symbols-rounded">check</span> Siguiendo';
    btn.classList.remove('btn-teal');
    btn.classList.add('btn-ghost');
    showToast(`¡Ahora sigues a ${sellerName}!`, 'success');
  }
}
