function initHub() {
  const D = window.TRATO_DATA;
  const hot = D.auctions.filter(a => a.badge === 'ending' || a.badge === 'hot').slice(0, 4);

  document.getElementById('app-content').innerHTML = `
    <div class="hub-home">

      <!-- Hero -->
      <div class="hub-home-hero">
        <div class="hub-home-hero-text">Tu lo tienes<br>alguien lo<br>necesita</div>
        <img class="hub-home-hero-img"
             src="https://images.unsplash.com/photo-1523170335258-f5ed11844a49?w=300&q=70"
             alt="Reloj"
             onerror="this.style.display='none';this.nextElementSibling.style.display='flex'">
        <div style="display:none;width:130px;height:100px;align-items:center;justify-content:center;font-size:52px">⌚</div>
      </div>

      <!-- Cards principales -->
      <div class="hub-home-cards">
        <div class="hub-home-card" onclick="navigate('auctions')">
          <span class="hub-home-card-title">Subastas</span>
          <svg class="hub-home-card-icon" viewBox="0 0 72 72" fill="none">
            <rect x="38" y="44" width="10" height="26" rx="3" transform="rotate(-45 38 44)" fill="#8DC63F"/>
            <rect x="12" y="10" width="32" height="20" rx="5" transform="rotate(-45 12 10)" fill="#8DC63F"/>
            <rect x="18" y="58" width="36" height="8" rx="4" fill="#8DC63F"/>
          </svg>
        </div>
        <div class="hub-home-card" onclick="navigate('exchanges')">
          <span class="hub-home-card-title">Intercambios</span>
          <svg class="hub-home-card-icon" viewBox="0 0 72 72" fill="none">
            <path d="M18 36 A18 18 0 0 1 54 36" stroke="#8DC63F" stroke-width="5" stroke-linecap="round" fill="none"/>
            <polygon points="54,36 46,28 62,28" fill="#8DC63F"/>
            <path d="M54 36 A18 18 0 0 1 18 36" stroke="#8DC63F" stroke-width="5" stroke-linecap="round" fill="none"/>
            <polygon points="18,36 26,44 10,44" fill="#8DC63F"/>
          </svg>
        </div>
      </div>

      <!-- CTA -->
      <div class="hub-home-cta" onclick="navigate('create')">
        <div class="hub-home-cta-overlay">
          <div class="hub-home-cta-text">Tienes algo para<br>subastar o vender</div>
          <button class="hub-home-cta-btn" onclick="event.stopPropagation();navigate('create')">Crear publicación</button>
        </div>
      </div>

      <!-- Destacados -->
      <div class="hub-home-section-title">
        Destacados <span class="live-dot" style="margin-left:10px">EN VIVO</span>
      </div>
      <div class="auction-grid" id="hub-grid"></div>

    </div>
  `;

  const grid = document.getElementById('hub-grid');
  if (grid) {
    grid.innerHTML = hot.map(a => renderAuctionCard(a)).join('');
    startCardTimers();
  }
}

function renderAuctionCard(a) {
  const D = window.TRATO_DATA;
  const cd = D.countdown(a.endsAt);
  const timerClass = cd.state === 'urgent' ? 'urgent' : cd.state === 'soon' ? 'soon' : '';
  const badge = a.badge
    ? `<div class="pcard-live badge-${a.badge === 'hot' ? 'hot' : a.badge === 'new' ? 'new' : 'ending'}">${a.badgeLabel}</div>`
    : '';
  const sp = D.sellers && D.sellers.find(s => s.name === a.seller.name);
  const sellerHtml = sp
    ? `<a class="pcard-seller-link" onclick="event.stopPropagation();navigate('seller','${sp.id}')">${a.seller.name}</a>`
    : `<div class="pcard-seller">${a.seller.name}</div>`;

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
        ${sellerHtml}
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

function startCardTimers() {
  const D = window.TRATO_DATA;
  setInterval(() => {
    document.querySelectorAll('.pcard-timer[data-timer]').forEach(el => {
      const endsAt = +el.dataset.ends;
      const cd = D.countdown(endsAt);
      const span = el.querySelector('span:last-child');
      if (span) span.textContent = cd.str;
      el.className = `pcard-timer ${cd.state === 'urgent' ? 'urgent' : cd.state === 'soon' ? 'soon' : ''}`;
      el.dataset.ends = endsAt;
      el.dataset.timer = '';
    });
  }, 1000);
}
