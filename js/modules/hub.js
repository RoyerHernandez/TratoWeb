function initHub() {
  const D = window.TRATO_DATA;
  const hot = D.auctions.filter(a => a.badge === 'ending' || a.badge === 'hot').slice(0, 4);

  document.getElementById('app-content').innerHTML = `
    <div class="hub-greeting">
      <h1>¡Hola, ${D.user.name.split(' ')[0]}! 👋</h1>
      <p>Aquí está lo que está pasando en Trato hoy.</p>
    </div>

    <div class="kpi-row">
      <div class="kpi orange">
        <div class="kpi-label">Subastas activas</div>
        <div class="kpi-value">${D.auctions.length}</div>
        <div class="kpi-sub">+3 desde ayer</div>
      </div>
      <div class="kpi">
        <div class="kpi-label">Mis pujas</div>
        <div class="kpi-value">${D.user.bids}</div>
        <div class="kpi-sub">en ${D.user.bids} artículos</div>
      </div>
      <div class="kpi green">
        <div class="kpi-label">Victorias</div>
        <div class="kpi-value">${D.user.sales}</div>
        <div class="kpi-sub">total histórico</div>
      </div>
      <div class="kpi">
        <div class="kpi-label">Mis publicaciones</div>
        <div class="kpi-value">3</div>
        <div class="kpi-sub">2 activas, 1 vendida</div>
      </div>
    </div>

    <div class="hub-circles">
      <div class="hub-circle auctions" onclick="navigate('auctions')">
        <div class="hub-circle-icon">🏷️</div>
        <div class="hub-circle-label">Subastas</div>
        <div class="hub-circle-sub">${D.auctions.length} activas ahora</div>
      </div>
      <div class="hub-circle exchanges" onclick="showToast('Intercambios — próximamente', 'info')">
        <div class="hub-circle-icon">🔄</div>
        <div class="hub-circle-label">Intercambios</div>
        <div class="hub-circle-sub">Próximamente</div>
      </div>
    </div>

    <div class="section-header">
      <div>
        <div class="section-title">Subastas destacadas <span class="live-dot" style="margin-left:10px">EN VIVO</span></div>
      </div>
      <div class="section-link" onclick="navigate('auctions')">Ver todas →</div>
    </div>
    <div class="auction-grid" id="hub-grid"></div>

    <div style="margin-top:28px">
      <div class="section-header">
        <div class="section-title">Actividad reciente</div>
      </div>
      <div class="card">
        ${[
          { icon: '💎', color: 'rgba(249,115,22,0.15)', title: 'Superaron tu puja en "Esmeralda 2.3ct"', time: 'hace 3 minutos', amount: null, page: 1 },
          { icon: '🏆', color: 'rgba(34,197,94,0.15)', title: 'Ganaste "Esmeralda Natural 2.3ct"', time: 'hace 2 horas', amount: D.fmt(1250000), page: 'won' },
          { icon: '🏷️', color: 'rgba(59,130,246,0.15)', title: 'Puja realizada en "Reloj Seiko SPB143"', time: 'hace 5 horas', amount: D.fmt(1700000), page: 2 },
          { icon: '👁️', color: 'rgba(168,85,247,0.15)', title: 'Alguien está mirando tu publicación', time: 'hace 1 día', amount: null, page: null },
        ].map(a => `
          <div class="activity-item" onclick="${a.page ? `navigate('${isNaN(a.page) ? a.page : 'detail'}', ${isNaN(a.page) ? '' : a.page})` : ''}">
            <div class="activity-icon" style="background:${a.color}">${a.icon}</div>
            <div class="activity-text">
              <div class="activity-title">${a.title}</div>
              <div class="activity-time">${a.time}</div>
            </div>
            ${a.amount ? `<div class="activity-amount" style="color:var(--orange)">${a.amount}</div>` : ''}
          </div>
        `).join('')}
      </div>
    </div>
  `;

  // Render hot auctions
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
  const badge = a.badge ? `<div class="auction-badge badge-${a.badge === 'hot' ? 'hot' : a.badge === 'new' ? 'new' : 'ending'}">${a.badgeLabel}</div>` : '';

  return `
    <div class="auction-card" onclick="navigate('detail', ${a.id})">
      <div class="auction-img" style="background:${a.gradient}">
        <img src="${a.imgUrl}" alt="${a.title}" loading="lazy"
          onerror="this.style.display='none';this.parentElement.innerHTML+='<span style=\\"font-size:56px\\">${a.emoji}</span>'">
        ${badge}
      </div>
      <div class="auction-body">
        <div class="auction-category">${a.categoryLabel}</div>
        <div class="auction-title">${a.title}</div>
        <div class="auction-footer">
          <div>
            <div class="auction-price-label">Puja actual</div>
            <div class="auction-price">${D.fmt(a.currentPrice)}</div>
          </div>
          <div class="auction-timer ${timerClass}" data-ends="${a.endsAt}" data-timer>
            <span class="material-symbols-rounded" style="font-size:13px">timer</span>
            <span>${cd.str}</span>
          </div>
        </div>
        <div class="auction-meta">
          <div class="auction-meta-item">
            <span class="material-symbols-rounded" style="font-size:14px">gavel</span>
            ${a.totalBids} pujas
          </div>
          <div class="auction-meta-item">
            <span class="material-symbols-rounded" style="font-size:14px">visibility</span>
            ${a.watchers}
          </div>
          <div class="auction-meta-item">
            <span class="material-symbols-rounded" style="font-size:14px">location_on</span>
            ${a.location.split(',')[0]}
          </div>
        </div>
      </div>
    </div>`;
}

function startCardTimers() {
  const D = window.TRATO_DATA;
  setInterval(() => {
    document.querySelectorAll('[data-timer]').forEach(el => {
      const endsAt = +el.dataset.ends;
      const cd = D.countdown(endsAt);
      const span = el.querySelector('span:last-child');
      if (span) span.textContent = cd.str;
      el.className = `auction-timer ${cd.state === 'urgent' ? 'urgent' : cd.state === 'soon' ? 'soon' : ''}`;
    });
  }, 1000);
}
