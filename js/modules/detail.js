let _detailInterval = null;
let _bidSimInterval = null;

function initDetail(id) {
  const D = window.TRATO_DATA;
  const a = D.auctions.find(x => x.id === +id);
  if (!a) { navigate('auctions'); return; }

  // Clear previous intervals
  if (_detailInterval) clearInterval(_detailInterval);
  if (_bidSimInterval) clearInterval(_bidSimInterval);

  const cd = D.countdown(a.endsAt);
  const sellerProfile = D.sellers && D.sellers.find(s => s.name === a.seller.name);
  const sellerCardAttr = sellerProfile
    ? `class="seller-card seller-card-link" onclick="navigate('seller','${sellerProfile.id}')"`
    : 'class="seller-card"';
  const sellerActionBtn = sellerProfile
    ? `<button class="btn btn-primary btn-sm" onclick="event.stopPropagation();navigate('seller','${sellerProfile.id}')"><span class="material-symbols-rounded" style="font-size:15px">store</span> Ver perfil</button>`
    : `<button class="btn btn-ghost btn-sm">Contactar</button>`;

  document.getElementById('app-content').innerHTML = `
    <button class="btn-back" onclick="navigate('auctions')">
      <span class="material-symbols-rounded">arrow_back</span> Volver a subastas
    </button>

    <div class="detail-layout">
      <!-- Gallery -->
      <div class="detail-left">
        <div class="detail-img" style="background:${a.gradient}">
          <img src="${a.imgUrl}" alt="${a.title}" loading="lazy"
            onerror="this.style.display='none';this.parentElement.querySelector('.detail-emoji').style.display='block'">
          <div class="detail-emoji" style="display:none">${a.emoji}</div>
          ${a.badge ? `<div class="auction-badge badge-${a.badge === 'hot' ? 'hot' : a.badge === 'new' ? 'new' : 'ending'}">${a.badgeLabel}</div>` : ''}
        </div>

        <div class="detail-meta-row">
          <div class="detail-category">${a.categoryLabel}</div>
          <div class="detail-location">
            <span class="material-symbols-rounded" style="font-size:14px">location_on</span>
            ${a.location}
          </div>
        </div>

        <h1 class="detail-title">${a.title}</h1>

        <div ${sellerCardAttr}>
          <div class="seller-avatar">${a.seller.initials}</div>
          <div class="seller-info">
            <div class="seller-name">
              ${a.seller.name}
              ${a.seller.verified ? '<span class="material-symbols-rounded verified-icon">verified</span>' : ''}
            </div>
            <div class="seller-stats">
              <span>⭐ ${a.seller.rating}</span>
              <span>·</span>
              <span>${a.seller.sales} ventas</span>
            </div>
          </div>
          ${sellerActionBtn}
        </div>

        <div class="detail-section">
          <div class="detail-section-title">Descripción</div>
          <p class="detail-desc">${a.description}</p>
        </div>

        <div class="detail-section">
          <div class="detail-section-title">Detalles</div>
          <div class="detail-specs">
            <div class="spec-item">
              <span class="spec-label">Estado</span>
              <span class="spec-value">${a.condition}</span>
            </div>
            <div class="spec-item">
              <span class="spec-label">Categoría</span>
              <span class="spec-value">${a.categoryLabel}</span>
            </div>
            <div class="spec-item">
              <span class="spec-label">Precio inicial</span>
              <span class="spec-value">${D.fmt(a.startPrice)}</span>
            </div>
            <div class="spec-item">
              <span class="spec-label">Incremento mínimo</span>
              <span class="spec-value">${D.fmt(a.minIncrement)}</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Bid Panel -->
      <div class="bid-panel" id="bid-panel">
        <div class="bid-timer-block">
          <div class="bid-timer-label">Tiempo restante</div>
          <div class="bid-timer ${cd.state === 'urgent' ? 'urgent' : cd.state === 'soon' ? 'soon' : ''}" id="detail-timer">${cd.str}</div>
        </div>

        <div class="bid-price-block">
          <div class="bid-price-label">Puja actual</div>
          <div class="bid-price" id="detail-price">${D.fmt(a.currentPrice)}</div>
          <div class="bid-watchers">
            <span class="material-symbols-rounded" style="font-size:14px">visibility</span>
            <span id="detail-watchers">${a.watchers}</span> personas mirando
          </div>
        </div>

        <div class="bid-input-block">
          <label class="bid-input-label">Tu puja</label>
          <div class="bid-input-row">
            <span class="bid-currency">$</span>
            <input type="number" class="bid-input" id="bidAmount"
              value="${a.currentPrice + a.minIncrement}"
              min="${a.currentPrice + a.minIncrement}"
              step="${a.minIncrement}">
          </div>
          <div class="bid-min-hint">Mínimo: ${D.fmt(a.currentPrice + a.minIncrement)}</div>
        </div>

        <button class="btn btn-primary btn-full" onclick="_submitBid(${a.id})">
          <span class="material-symbols-rounded">gavel</span>
          Pujar ahora
        </button>

        <div class="bid-guarantee">
          <span class="material-symbols-rounded" style="font-size:14px;color:var(--success)">security</span>
          Transacción protegida por Trato
        </div>

        <div class="bid-history-block">
          <div class="bid-history-title">
            Historial de pujas
            <span class="bid-count" id="bid-total">${a.totalBids} pujas</span>
          </div>
          <div class="bid-history" id="bid-history">
            ${a.bids.map((b, i) => `
              <div class="bid-row ${b.top ? 'bid-top' : ''}" id="bid-${i}">
                <div class="bid-avatar">${b.initials}</div>
                <div class="bid-user-info">
                  <div class="bid-user">${b.user}${b.top ? ' <span class="bid-leading">Liderando</span>' : ''}</div>
                  <div class="bid-time">${b.time}</div>
                </div>
                <div class="bid-amount">${D.fmt(b.amount)}</div>
              </div>
            `).join('')}
          </div>
        </div>

        <div style="margin-top:16px;padding-top:16px;border-top:1px solid var(--gray-200)">
          <button class="btn btn-ghost btn-full" onclick="navigate('won')" style="font-size:12px;opacity:0.7">
            <span class="material-symbols-rounded" style="font-size:14px">emoji_events</span>
            Ver ejemplo: Subasta ganada →
          </button>
        </div>
      </div>
    </div>
  `;

  // Live countdown
  _detailInterval = setInterval(() => {
    const cd = D.countdown(a.endsAt);
    const timerEl = document.getElementById('detail-timer');
    if (!timerEl) { clearInterval(_detailInterval); return; }
    timerEl.textContent = cd.str;
    timerEl.className = `bid-timer ${cd.state === 'urgent' ? 'urgent' : cd.state === 'soon' ? 'soon' : ''}`;
  }, 1000);

  // Simulate live bids
  const simulatedBidders = [
    { user: 'Marcela B.', initials: 'MB' },
    { user: 'Tomás V.', initials: 'TV' },
    { user: 'Liliana C.', initials: 'LC' },
    { user: 'Eduardo R.', initials: 'ER' },
    { user: 'Fernanda O.', initials: 'FO' },
  ];
  let simBidderIdx = 0;
  let simCurrentPrice = a.currentPrice;
  let simTotalBids = a.totalBids;
  let simWatchers = a.watchers;

  _bidSimInterval = setInterval(() => {
    const historyEl = document.getElementById('bid-history');
    const priceEl = document.getElementById('detail-price');
    const totalEl = document.getElementById('bid-total');
    const watchersEl = document.getElementById('detail-watchers');
    const minHint = document.querySelector('.bid-min-hint');
    const bidInput = document.getElementById('bidAmount');

    if (!historyEl) { clearInterval(_bidSimInterval); return; }

    const bidder = simulatedBidders[simBidderIdx % simulatedBidders.length];
    simBidderIdx++;
    simCurrentPrice += a.minIncrement;
    simTotalBids++;
    simWatchers += Math.floor(Math.random() * 3) - 1;

    // Remove "liderando" badge from previous top bid
    const prevTop = historyEl.querySelector('.bid-top');
    if (prevTop) prevTop.classList.remove('bid-top');
    const prevLeading = historyEl.querySelector('.bid-leading');
    if (prevLeading) prevLeading.remove();

    // Create new bid row
    const newRow = document.createElement('div');
    newRow.className = 'bid-row bid-top bid-new';
    newRow.innerHTML = `
      <div class="bid-avatar">${bidder.initials}</div>
      <div class="bid-user-info">
        <div class="bid-user">${bidder.user} <span class="bid-leading">Liderando</span></div>
        <div class="bid-time">justo ahora</div>
      </div>
      <div class="bid-amount">${D.fmt(simCurrentPrice)}</div>
    `;

    historyEl.insertBefore(newRow, historyEl.firstChild);
    setTimeout(() => newRow.classList.remove('bid-new'), 500);

    // Update stats
    if (priceEl) priceEl.textContent = D.fmt(simCurrentPrice);
    if (totalEl) totalEl.textContent = `${simTotalBids} pujas`;
    if (watchersEl) watchersEl.textContent = Math.max(simWatchers, a.watchers);
    if (minHint) minHint.textContent = `Mínimo: ${D.fmt(simCurrentPrice + a.minIncrement)}`;
    if (bidInput) {
      bidInput.min = simCurrentPrice + a.minIncrement;
      if (+bidInput.value <= simCurrentPrice) {
        bidInput.value = simCurrentPrice + a.minIncrement;
      }
    }

    // Show toast
    showToast(`${bidder.user} pujó ${D.fmt(simCurrentPrice)}`, 'info');
  }, 12000);
}

function _submitBid(auctionId) {
  const D = window.TRATO_DATA;
  const a = D.auctions.find(x => x.id === +auctionId);
  if (!a) return;

  const input = document.getElementById('bidAmount');
  const amount = parseInt(input?.value || 0);
  const priceEl = document.getElementById('detail-price');
  const currentDisplayed = priceEl
    ? parseInt(priceEl.textContent.replace(/\D/g, ''))
    : a.currentPrice;

  if (amount < currentDisplayed + a.minIncrement) {
    showToast(`La puja mínima es ${D.fmt(currentDisplayed + a.minIncrement)}`, 'error');
    return;
  }

  openBidModal(a, amount);
}
