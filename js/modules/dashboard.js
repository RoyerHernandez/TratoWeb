// ── DASHBOARD VENDEDOR ──

function initDashboard() {
  const D = window.TRATO_DATA;

  // Mock data for Maru Joyería dashboard
  const dash = {
    seller: 'Maru Joyería',
    initials: 'MJ',
    plan: 'Vendedor Verificado',
    planFee: '$49.000 COP/mes',
    renewDate: '4 nov 2026',
    kpis: {
      ingresos: '$4.2M COP',
      ingresosChange: '+18% vs sep',
      ingresosUp: true,
      activas: 3,
      activasNote: '8 completadas este mes',
      pujas: 17,
      pujasChange: '+6 más que ayer',
      pujasUp: true,
      conversion: '68%',
      conversionChange: '+5% vs mes anterior',
      conversionUp: true,
    },
    weeks: [
      { label: 'Sep 1', h: 55,  amount: '$820K',  current: false },
      { label: 'Sep 2', h: 70,  amount: '$1.05M', current: false },
      { label: 'Sep 3', h: 48,  amount: '$720K',  current: false },
      { label: 'Sep 4', h: 80,  amount: '$1.2M',  current: false },
      { label: 'Oct 1', h: 95,  amount: '$1.42M', current: true  },
      { label: 'Oct 2', h: 105, amount: '$1.58M', current: true  },
      { label: 'Oct 3', h: 88,  amount: '$1.32M', current: true  },
      { label: 'Oct 4', h: 55,  amount: '$820K',  current: true  },
    ],
    activeAuctions: [
      { emoji: '💎', name: 'Esmeralda Natural 2.3ct', bids: 23, price: '$1.250.000', timer: '01:11:12', timerClass: 'dash-timer-hot', timerLabel: '🔥' },
      { emoji: '💍', name: 'Anillo Esmeralda Baguette Oro 18K', bids: 14, price: '$2.550.000', timer: '05:41:12', timerClass: 'dash-timer-ok', timerLabel: '⏱' },
      { emoji: '📿', name: 'Collar Perlas Tahití — Certificado', bids: 8, price: '$890.000', timer: '1d 04:20', timerClass: 'dash-timer-warn', timerLabel: '⏰' },
    ],
    transactions: [
      { initials: 'CM', color: 'var(--purple-light)', textColor: 'var(--purple)', name: 'Carlos Martínez', product: 'Esmeralda Natural 2.3ct — Certificada', amount: '+$1.212.500', date: 'hace 3 min', status: 'escrow', statusLabel: '⏳ En escrow' },
      { initials: 'AG', color: '#EEF8CE', textColor: 'var(--teal-dark)', name: 'Ana Gutiérrez', product: 'Anillo Solitario Oro Blanco 18K', amount: '+$1.940.000', date: 'ayer · 3:22 PM', status: 'done', statusLabel: '✅ Completada' },
      { initials: 'PL', color: '#FEF9C3', textColor: '#856404', name: 'Pedro López', product: 'Esmeralda Cabochón 3.2ct — Muzo', amount: '+$3.280.000', date: '2 oct · 11:05 AM', status: 'done', statusLabel: '✅ Completada' },
      { initials: 'MS', color: '#FFE8DF', textColor: 'var(--orange)', name: 'María Suárez', product: 'Pulsera Esmeraldas y Diamantes', amount: '+$4.100.000', date: '30 sep · 6:47 PM', status: 'done', statusLabel: '✅ Completada' },
    ],
    topItems: [
      { rank: '🥇', name: 'Esmeralda Cabochón 3.2ct — Muzo', views: '847 vistas · 34 guardados', price: '$3.28M' },
      { rank: '2', name: 'Anillo Esmeralda Baguette Oro 18K', views: '612 vistas · 22 guardados', price: '$2.55M' },
      { rank: '3', name: 'Esmeralda Natural 2.3ct — Certificada', views: '504 vistas · 18 guardados', price: '$1.25M' },
    ],
    funnel: [
      { label: 'Visitas',     pct: 100, val: '1.963', color: 'var(--purple-mid)' },
      { label: 'Interesados', pct: 72,  val: '68%',   color: 'var(--purple)' },
      { label: 'Pujaron',     pct: 42,  val: '42%',   color: 'var(--orange)' },
      { label: 'Compraron',   pct: 28,  val: '28%',   color: 'var(--success)' },
    ],
  };

  const barsHTML = dash.weeks.map(w => `
    <div class="dash-bar-wrap">
      <div class="dash-bar${w.current ? ' dash-bar-active' : ''}" style="height:${w.h}px" title="${w.amount} COP"></div>
      <div class="dash-bar-lbl">${w.label}</div>
    </div>`).join('');

  const auctionsHTML = dash.activeAuctions.map(a => `
    <div class="dash-auction-item">
      <div class="dash-auction-img">${a.emoji}</div>
      <div class="dash-auction-info">
        <div class="dash-auction-name">${a.name}</div>
        <div class="dash-auction-meta"><span class="dash-bids-badge">${a.bids} pujas</span> · Joyería</div>
      </div>
      <div class="dash-auction-right">
        <div class="dash-auction-price">${a.price}</div>
        <div class="dash-timer ${a.timerClass}">${a.timerLabel} ${a.timer}</div>
      </div>
    </div>`).join('');

  const txHTML = dash.transactions.map(t => `
    <div class="dash-tx-item">
      <div class="dash-tx-av" style="background:${t.color};color:${t.textColor}">${t.initials}</div>
      <div class="dash-tx-info">
        <div class="dash-tx-name">${t.name}</div>
        <div class="dash-tx-prod">${t.product}</div>
      </div>
      <div class="dash-tx-right">
        <div class="dash-tx-amount">${t.amount}</div>
        <div class="dash-tx-date">${t.date}</div>
        <span class="dash-tx-status dash-status-${t.status}">${t.statusLabel}</span>
      </div>
    </div>`).join('');

  const topHTML = dash.topItems.map((item, i) => `
    <div class="dash-top-item">
      <div class="dash-top-rank${i === 0 ? ' dash-rank-gold' : ''}">${item.rank}</div>
      <div class="dash-top-info">
        <div class="dash-top-name">${item.name}</div>
        <div class="dash-top-stat">${item.views}</div>
      </div>
      <div class="dash-top-val">${item.price}</div>
    </div>`).join('');

  const funnelHTML = dash.funnel.map(f => `
    <div class="dash-funnel-row">
      <div class="dash-funnel-label">${f.label}</div>
      <div class="dash-funnel-bar-wrap"><div class="dash-funnel-bar-fill" style="width:${f.pct}%;background:${f.color}"></div></div>
      <div class="dash-funnel-val">${f.val}</div>
    </div>`).join('');

  document.getElementById('app-content').innerHTML = `
    <div class="dash-page">

      <div class="dash-topbar">
        <div>
          <div class="dash-title">Resumen del mes</div>
          <div class="dash-subtitle">Octubre 2026 · ${dash.seller}</div>
        </div>
        <div class="dash-topbar-actions">
          <button class="btn btn-ghost btn-sm" onclick="navigate('seller', 'maru')">
            <span class="material-symbols-rounded" style="font-size:16px">storefront</span> Ver mi tienda
          </button>
          <button class="btn btn-primary btn-sm" onclick="navigate('create')">
            <span class="material-symbols-rounded" style="font-size:16px">add</span> Nueva subasta
          </button>
        </div>
      </div>

      <div class="dash-alert">
        <span class="dash-alert-icon">🏆</span>
        <div class="dash-alert-text">¡Alcanzaste <strong>247 ventas</strong> este mes! Estás entre el <strong>top 5%</strong> de vendedores en Joyería.
          <span class="dash-alert-link" onclick="showToast('Insignia Top Vendedor disponible en tu perfil', 'success')"> Ver insignia →</span>
        </div>
      </div>

      <div class="dash-kpi-grid">
        <div class="dash-kpi dash-kpi-highlight">
          <div class="dash-kpi-label">Ingresos del mes</div>
          <div class="dash-kpi-value">${dash.kpis.ingresos}</div>
          <div class="dash-kpi-sub">▲ ${dash.kpis.ingresosChange}</div>
        </div>
        <div class="dash-kpi">
          <div class="dash-kpi-label">Subastas activas</div>
          <div class="dash-kpi-value">${dash.kpis.activas}</div>
          <div class="dash-kpi-sub dash-kpi-neutral">${dash.kpis.activasNote}</div>
        </div>
        <div class="dash-kpi">
          <div class="dash-kpi-label">Pujas recibidas hoy</div>
          <div class="dash-kpi-value">${dash.kpis.pujas}</div>
          <div class="dash-kpi-sub dash-kpi-up">▲ ${dash.kpis.pujasChange}</div>
        </div>
        <div class="dash-kpi">
          <div class="dash-kpi-label">Tasa de conversión</div>
          <div class="dash-kpi-value">${dash.kpis.conversion}</div>
          <div class="dash-kpi-sub dash-kpi-up">▲ ${dash.kpis.conversionChange}</div>
        </div>
      </div>

      <div class="dash-mid-grid">

        <div class="dash-card">
          <div class="dash-card-header">
            <div class="dash-card-title">📈 Ingresos por semana — Oct 2026</div>
            <span class="dash-card-action" onclick="showToast('Exportando reporte...', 'info')">Exportar CSV →</span>
          </div>
          <div class="dash-card-body">
            <div class="dash-bar-chart">${barsHTML}</div>
            <div class="dash-chart-legend">
              <div class="dash-legend-item"><div class="dash-legend-dot" style="background:var(--purple-mid)"></div>Septiembre</div>
              <div class="dash-legend-item"><div class="dash-legend-dot" style="background:var(--purple)"></div>Octubre</div>
            </div>
            <div class="dash-chart-footer">
              <div><div class="dash-cf-label">Promedio/semana</div><div class="dash-cf-val">$1.05M COP</div></div>
              <div><div class="dash-cf-label">Mejor semana</div><div class="dash-cf-val" style="color:var(--purple)">Oct 2 · $1.58M</div></div>
              <div><div class="dash-cf-label">Comisión Trato (3%)</div><div class="dash-cf-val">$126K COP</div></div>
            </div>
          </div>
        </div>

        <div class="dash-card">
          <div class="dash-card-header">
            <div class="dash-card-title">🔨 Subastas activas</div>
            <span class="dash-card-action" onclick="navigate('auctions')">Ver todas →</span>
          </div>
          <div class="dash-card-body dash-card-body-tight">
            ${auctionsHTML}
            <button class="btn btn-primary" style="width:100%;margin-top:14px;font-size:13px" onclick="navigate('create')">
              + Crear nueva subasta
            </button>
          </div>
        </div>

      </div>

      <div class="dash-bot-grid">

        <div class="dash-card">
          <div class="dash-card-header">
            <div class="dash-card-title">💸 Últimas transacciones</div>
            <span class="dash-card-action" onclick="showToast('Cargando historial completo...', 'info')">Ver historial →</span>
          </div>
          <div class="dash-card-body dash-card-body-tight">${txHTML}</div>
        </div>

        <div style="display:flex;flex-direction:column;gap:16px">

          <div class="dash-card">
            <div class="dash-card-header">
              <div class="dash-card-title">🏅 Artículos más vistos</div>
              <span class="dash-card-action" onclick="showToast('Cargando analíticas...', 'info')">Ver analíticas →</span>
            </div>
            <div class="dash-card-body dash-card-body-tight">${topHTML}</div>
          </div>

          <div class="dash-card">
            <div class="dash-card-header">
              <div class="dash-card-title">🎯 Embudo de conversión</div>
            </div>
            <div class="dash-card-body">
              ${funnelHTML}
              <div class="dash-funnel-tip">
                💡 <strong>Tip:</strong> Subastas con 3+ fotos convierten 2.1x más.
                <span class="dash-alert-link" onclick="showToast('Abriendo guía de vendedor...', 'info')"> Ver guía →</span>
              </div>
            </div>
          </div>

        </div>

      </div>

    </div>
  `;
}
