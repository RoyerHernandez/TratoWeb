let _detailInterval = null;
let _bidSimInterval = null;
let _autoBidEnabled = false;
let _autoBidMax = 0;
let _currentBidPrice = 0;
let _currentBidCount = 0;
let _detailAuction = null;

const _fakeBidders = ['Ca***', 'Ju***', 'Ma***', 'An***', 'Fe***', 'Pa***'];

function initDetail(id) {
  const D = window.TRATO_DATA;
  if (_detailInterval) { clearInterval(_detailInterval); _detailInterval = null; }
  if (_bidSimInterval) { clearInterval(_bidSimInterval); _bidSimInterval = null; }

  const a = D.auctions.find(x => String(x.id) === String(id));
  if (!a) {
    document.getElementById('app-content').innerHTML = `
      <div class="empty-state">
        <span class="material-symbols-rounded" style="font-size:48px">search_off</span>
        <p>Subasta no encontrada</p>
      </div>`;
    return;
  }

  _detailAuction = a;
  _currentBidPrice = a.currentPrice;
  _currentBidCount = a.totalBids;
  _autoBidEnabled = false;
  _autoBidMax = 0;

  const increment = a.minIncrement || 50000;
  const cd = D.countdown(a.endsAt);
  const historyItems = _buildFakeHistory(a);

  document.getElementById('app-content').innerHTML = `
    <!-- Back nav -->
    <div class="detail-back">
      <button class="btn-icon" onclick="navigate('auctions')">
        <span class="material-symbols-rounded">arrow_back</span>
      </button>
      <span class="detail-breadcrumb">Subastas <span class="material-symbols-rounded" style="font-size:14px;vertical-align:-3px">chevron_right</span> ${a.categoryLabel || 'General'}</span>
    </div>

    <div class="detail-layout">
      <!-- Left: Gallery + Info -->
      <div class="detail-left">
        <!-- Gallery -->
        <div class="detail-gallery">
          <div class="gallery-main">
            <div class="gallery-main-img">
              <span style="font-size:100px">${a.emoji || '📦'}</span>
            </div>
            ${a.seller.verified ? `<div class="gallery-verified-badge"><span class="material-symbols-rounded" style="font-size:12px">verified</span> Artículo verificado</div>` : ''}
          </div>
          <div class="gallery-thumbs">
            <div class="gallery-thumb gallery-thumb--active"><span style="font-size:24px">${a.emoji || '📦'}</span></div>
            <div class="gallery-thumb"><span style="font-size:24px">🔍</span></div>
            <div class="gallery-thumb"><span style="font-size:24px">📐</span></div>
          </div>
        </div>

        <!-- Item info -->
        <div class="detail-info-card">
          <div class="detail-category-row">
            <span class="detail-category">${a.categoryLabel || 'General'}</span>
            ${a.condition ? `<span class="detail-condition">${a.condition}</span>` : ''}
          </div>
          <h1 class="detail-title">${a.title}</h1>
          <div class="detail-seller-row">
            <div class="detail-avatar">${a.seller.initials}</div>
            <div>
              <div class="detail-seller-name">${a.seller.name} ${a.seller.verified ? `<span class="material-symbols-rounded" style="font-size:14px;color:var(--purple);vertical-align:-3px">verified</span>` : ''}</div>
              <div class="detail-seller-meta">
                <span class="material-symbols-rounded" style="font-size:13px">star</span>
                ${a.seller.rating} · ${a.seller.sales} ventas
              </div>
            </div>
            <button class="btn btn-ghost btn-sm" style="margin-left:auto" onclick="navigate('seller', '${a.seller.name.toLowerCase().replace(/\s+/g,'-')}')">Ver perfil</button>
          </div>
          <p class="detail-desc">${a.description || 'Artículo en excelente estado. Certificado de autenticidad incluido. Envío asegurado a todo Colombia.'}</p>

          <div class="detail-specs">
            <div class="detail-spec">
              <span class="material-symbols-rounded">location_on</span>
              <span>${a.location || 'Bogotá D.C.'}</span>
            </div>
            <div class="detail-spec">
              <span class="material-symbols-rounded">local_shipping</span>
              <span>Envío a todo Colombia</span>
            </div>
            <div class="detail-spec">
              <span class="material-symbols-rounded">schedule</span>
              <span>Precio inicial: ${D.fmt(a.startPrice)}</span>
            </div>
          </div>
        </div>

        <!-- Bid history -->
        <div class="bid-history-card">
          <h3 class="bid-history-title">
            Historial de pujas
            <span class="bid-history-count" id="bidCountBadge">${_currentBidCount} pujas</span>
          </h3>
          <div class="bid-history-list" id="bidHistoryList">
            ${historyItems.map((h, i) => `
              <div class="bid-history-item ${i === 0 ? 'bid-history-item--top' : ''}">
                <div class="bid-history-left">
                  <div class="bid-avatar">${h.name[0]}</div>
                  <div>
                    <div class="bid-bidder">${h.name} ${i === 0 ? '<span class="bid-winning-tag">Ganando</span>' : ''}</div>
                    <div class="bid-time">${h.time}</div>
                  </div>
                </div>
                <div class="bid-amount ${i === 0 ? 'bid-amount--top' : ''}">${D.fmt(h.amount)}</div>
              </div>
            `).join('')}
          </div>
        </div>
      </div>

      <!-- Right: Bid panel (sticky) -->
      <div class="detail-right">
        <div class="bid-panel" id="bidPanel">
          <!-- Countdown -->
          <div class="bid-panel-timer">
            <span class="material-symbols-rounded">timer</span>
            <span>Termina en</span>
            <span class="bid-panel-countdown ${cd.state}" id="detailCountdown">${cd.str}</span>
          </div>

          <!-- Price -->
          <div class="bid-panel-price-section">
            <div class="bid-panel-price-label">Puja actual</div>
            <div class="bid-panel-price" id="currentBidDisplay">${D.fmt(_currentBidPrice)}</div>
            <div class="bid-panel-bids" id="bidCountDisplay">${_currentBidCount} pujas · incremento mínimo ${D.fmt(increment)}</div>
          </div>

          <!-- Bid input -->
          <div class="bid-input-section" id="bidInputSection">
            <label class="form-label">Tu puja</label>
            <div class="input-prefix-wrap">
              <span class="input-prefix">$</span>
              <input type="number" class="form-input input-with-prefix" id="bidAmountInput"
                placeholder="${_currentBidPrice + increment}"
                min="${_currentBidPrice + increment}"
                step="${increment}"
                value="${_currentBidPrice + increment}">
            </div>
            <div class="bid-min-hint">Mínimo: <strong id="bidMinHint">${D.fmt(_currentBidPrice + increment)}</strong></div>
            <button class="btn btn-primary btn-full" id="bidSubmitBtn" onclick="_submitBid()" style="margin-top:10px">
              <span class="material-symbols-rounded">gavel</span>
              Hacer puja
            </button>
            <div class="bid-pagas-notice">
              <span class="material-symbols-rounded" style="font-size:14px">shield</span>
              Pagas solo si ganas — escrow seguro
            </div>
          </div>

          <!-- Auto-bid toggle -->
          <div class="autobid-section">
            <div class="autobid-header" onclick="_toggleAutoBid()">
              <div class="autobid-info">
                <span class="material-symbols-rounded" style="color:var(--purple)">auto_mode</span>
                <div>
                  <div class="autobid-label">Puja automática</div>
                  <div class="autobid-desc">El sistema puja por ti hasta tu máximo</div>
                </div>
              </div>
              <div class="toggle-switch" id="autoBidToggle">
                <div class="toggle-knob"></div>
              </div>
            </div>
            <div class="autobid-max-wrap" id="autoBidMaxWrap" style="display:none">
              <label class="form-label">Puja máxima</label>
              <div class="input-prefix-wrap">
                <span class="input-prefix">$</span>
                <input type="number" class="form-input input-with-prefix" id="autoBidMaxInput"
                  placeholder="${_currentBidPrice + increment * 5}"
                  min="${_currentBidPrice + increment}"
                  step="${increment}">
              </div>
              <button class="btn btn-outline btn-full" style="margin-top:8px" onclick="_saveAutoBid()">
                <span class="material-symbols-rounded">auto_mode</span>
                Activar puja automática
              </button>
            </div>
          </div>

          <!-- Actions -->
          <div class="bid-panel-actions">
            <button class="bid-action-btn" onclick="showToast('Subasta guardada en favoritos', 'success')">
              <span class="material-symbols-rounded">favorite_border</span>
              Guardar
            </button>
            <button class="bid-action-btn" onclick="showToast('Enlace copiado', 'success')">
              <span class="material-symbols-rounded">share</span>
              Compartir
            </button>
            <button class="bid-action-btn" onclick="showToast('Serás notificado de nuevas pujas', 'info')">
              <span class="material-symbols-rounded">notifications</span>
              Alertas
            </button>
          </div>
        </div>
      </div>
    </div>
  `;

  // Countdown
  _detailInterval = setInterval(() => {
    const cd2 = D.countdown(a.endsAt);
    const el = document.getElementById('detailCountdown');
    if (el) {
      el.textContent = cd2.str;
      el.className = `bid-panel-countdown ${cd2.state}`;
    }
  }, 1000);

  // Simulated live bids
  _startBidSimulation(D, a);
}

function _buildFakeHistory(a) {
  const history = [];
  const now = Date.now();
  const bids = a.bids || [];

  bids.forEach((b, i) => {
    // Anonymize: keep first 2 chars + ***
    const rawName = b.user || b.initials || 'Usuario';
    const anonymized = rawName.slice(0, 2) + '***';
    history.push({
      name: anonymized,
      amount: b.amount,
      time: b.time || `hace ${(i + 1) * 5} min`
    });
  });
  return history;
}

function _startBidSimulation(D, a) {
  const increment = a.minIncrement || 50000;
  const delays = [14000, 28000, 47000, 72000];

  delays.forEach((delay, i) => {
    setTimeout(() => {
      if (!document.getElementById('bidHistoryList')) return;
      _currentBidPrice += increment;
      _currentBidCount++;
      const bidder = _fakeBidders[i % _fakeBidders.length];

      // Update price
      const priceEl = document.getElementById('currentBidDisplay');
      if (priceEl) priceEl.textContent = D.fmt(_currentBidPrice);

      const countEl = document.getElementById('bidCountDisplay');
      if (countEl) countEl.textContent = `${_currentBidCount} pujas · incremento mínimo ${D.fmt(increment)}`;

      const badgeEl = document.getElementById('bidCountBadge');
      if (badgeEl) badgeEl.textContent = `${_currentBidCount} pujas`;

      // Update bid input
      const bidInput = document.getElementById('bidAmountInput');
      if (bidInput) {
        bidInput.min = _currentBidPrice + increment;
        bidInput.value = _currentBidPrice + increment;
      }
      const hintEl = document.getElementById('bidMinHint');
      if (hintEl) hintEl.textContent = D.fmt(_currentBidPrice + increment);

      // Prepend to history
      const list = document.getElementById('bidHistoryList');
      if (list) {
        list.querySelectorAll('.bid-history-item--top').forEach(el => el.classList.remove('bid-history-item--top'));
        list.querySelectorAll('.bid-winning-tag').forEach(el => el.remove());
        list.querySelectorAll('.bid-amount--top').forEach(el => el.classList.remove('bid-amount--top'));

        const newItem = document.createElement('div');
        newItem.className = 'bid-history-item bid-history-item--top bid-history-item--new';
        newItem.innerHTML = `
          <div class="bid-history-left">
            <div class="bid-avatar">${bidder[0]}</div>
            <div>
              <div class="bid-bidder">${bidder} <span class="bid-winning-tag">Ganando</span></div>
              <div class="bid-time">hace un momento</div>
            </div>
          </div>
          <div class="bid-amount bid-amount--top">${D.fmt(_currentBidPrice)}</div>
        `;
        list.insertBefore(newItem, list.firstChild);
        setTimeout(() => newItem.classList.remove('bid-history-item--new'), 600);
      }

      showToast(`${bidder} pujó ${D.fmt(_currentBidPrice)}`, 'info');
    }, delay);
  });
}

function _toggleAutoBid() {
  _autoBidEnabled = !_autoBidEnabled;
  const toggle = document.getElementById('autoBidToggle');
  const maxWrap = document.getElementById('autoBidMaxWrap');
  const bidSection = document.getElementById('bidInputSection');

  if (toggle) toggle.className = `toggle-switch ${_autoBidEnabled ? 'toggle-switch--on' : ''}`;
  if (maxWrap) maxWrap.style.display = _autoBidEnabled ? 'block' : 'none';
  if (bidSection) bidSection.style.display = _autoBidEnabled ? 'none' : 'block';
}

function _saveAutoBid() {
  const D = window.TRATO_DATA;
  const increment = _detailAuction?.minIncrement || 50000;
  const val = +document.getElementById('autoBidMaxInput')?.value;

  if (!val || val <= _currentBidPrice + increment) {
    showToast(`El máximo debe ser mayor a ${D.fmt(_currentBidPrice + increment)}`, 'error');
    return;
  }
  _autoBidMax = val;
  showToast(`Puja automática activada hasta ${D.fmt(val)}`, 'success');
}

function _submitBid() {
  const D = window.TRATO_DATA;
  const increment = _detailAuction?.minIncrement || 50000;
  const val = +document.getElementById('bidAmountInput')?.value;

  if (!val || val < _currentBidPrice + increment) {
    showToast(`La puja mínima es ${D.fmt(_currentBidPrice + increment)}`, 'error');
    return;
  }

  openBidModal(_detailAuction, val);
}
