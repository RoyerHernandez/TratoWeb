function initWon() {
  const D = window.TRATO_DATA;
  const w = D.wonAuction;
  const cd = D.countdown(w.payDeadline);

  document.getElementById('app-content').innerHTML = `
    <div class="won-container">
      <div class="confetti-wrap" id="confettiWrap"></div>

      <div class="won-header">
        <div class="won-icon">🏆</div>
        <h1 class="won-title">¡Felicitaciones, ${D.user.name.split(' ')[0]}!</h1>
        <p class="won-subtitle">Ganaste esta subasta. Completa el pago para recibir tu artículo.</p>
      </div>

      <div class="won-card">
        <div class="won-item-img" style="background:${w.gradient}">
          <span style="font-size:64px">${w.emoji}</span>
        </div>
        <div class="won-item-info">
          <div class="won-item-category">Joyería</div>
          <div class="won-item-title">${w.title}</div>
          <div class="won-seller">
            <div class="won-seller-avatar">${w.seller.initials}</div>
            <span>${w.seller.name}</span>
          </div>
        </div>
      </div>

      <div class="won-price-row">
        <div class="won-price-card">
          <div class="won-price-label">Tu puja ganadora</div>
          <div class="won-price-value won-price-mine">${D.fmt(w.myBid)}</div>
        </div>
        <div class="won-price-card">
          <div class="won-price-label">Precio final</div>
          <div class="won-price-value">${D.fmt(w.finalPrice)}</div>
        </div>
        <div class="won-price-card">
          <div class="won-price-label">Fecha de ganancia</div>
          <div class="won-price-value won-date">${w.wonAt}</div>
        </div>
      </div>

      <div class="won-deadline-card">
        <div class="won-deadline-left">
          <span class="material-symbols-rounded" style="color:var(--orange)">schedule</span>
          <div>
            <div class="won-deadline-title">Tiempo para pagar</div>
            <div class="won-deadline-hint">Paga antes de que expire el plazo</div>
          </div>
        </div>
        <div class="won-deadline-timer ${cd.state === 'urgent' ? 'urgent' : cd.state === 'soon' ? 'soon' : ''}" id="won-timer">
          ${cd.str}
        </div>
      </div>

      <div class="won-tx">
        ID de transacción: <strong>${w.transactionId}</strong>
      </div>

      <div class="won-actions">
        <button class="btn btn-primary won-pay-btn" onclick="_wonPay()">
          <span class="material-symbols-rounded">payments</span>
          Pagar ${D.fmt(w.finalPrice)}
        </button>
        <button class="btn btn-ghost" onclick="showToast('Abriendo chat con Maru Joyería...', 'info')">
          <span class="material-symbols-rounded">chat_bubble</span>
          Contactar vendedor
        </button>
      </div>

      <div class="won-steps">
        <div class="won-step done">
          <div class="won-step-icon"><span class="material-symbols-rounded">gavel</span></div>
          <div class="won-step-info">
            <div class="won-step-title">Puja ganada</div>
            <div class="won-step-hint">Hoy · ${w.wonAt}</div>
          </div>
        </div>
        <div class="won-step-connector done"></div>
        <div class="won-step active">
          <div class="won-step-icon"><span class="material-symbols-rounded">payments</span></div>
          <div class="won-step-info">
            <div class="won-step-title">Pago pendiente</div>
            <div class="won-step-hint">Tienes 24h para pagar</div>
          </div>
        </div>
        <div class="won-step-connector"></div>
        <div class="won-step">
          <div class="won-step-icon"><span class="material-symbols-rounded">local_shipping</span></div>
          <div class="won-step-info">
            <div class="won-step-title">Envío</div>
            <div class="won-step-hint">Coordinar con vendedor</div>
          </div>
        </div>
        <div class="won-step-connector"></div>
        <div class="won-step">
          <div class="won-step-icon"><span class="material-symbols-rounded">check_circle</span></div>
          <div class="won-step-info">
            <div class="won-step-title">Entregado</div>
            <div class="won-step-hint">Confirma recepción</div>
          </div>
        </div>
      </div>

      <button class="btn btn-ghost" onclick="navigate('auctions')" style="margin-top:24px;width:100%">
        <span class="material-symbols-rounded">arrow_back</span>
        Volver a subastas
      </button>
    </div>
  `;

  // Launch confetti
  _launchConfetti();

  // Live timer
  const timerInterval = setInterval(() => {
    const cd = D.countdown(w.payDeadline);
    const el = document.getElementById('won-timer');
    if (!el) { clearInterval(timerInterval); return; }
    el.textContent = cd.str;
    el.className = `won-deadline-timer ${cd.state === 'urgent' ? 'urgent' : cd.state === 'soon' ? 'soon' : ''}`;
  }, 1000);
}

function _wonPay() {
  showToast('Redirigiendo a Wompi — pasarela de pagos segura...', 'info');
  setTimeout(() => showToast('Esta función estará disponible en la app real 🚀', 'success'), 2000);
}

function _launchConfetti() {
  const wrap = document.getElementById('confettiWrap');
  if (!wrap) return;

  const colors = ['#f97316', '#22c55e', '#3b82f6', '#a855f7', '#ec4899', '#eab308'];
  const count = 60;

  for (let i = 0; i < count; i++) {
    const piece = document.createElement('div');
    piece.className = 'confetti-piece';
    piece.style.cssText = `
      left: ${Math.random() * 100}%;
      background: ${colors[Math.floor(Math.random() * colors.length)]};
      animation-delay: ${Math.random() * 2}s;
      animation-duration: ${2.5 + Math.random() * 2}s;
      width: ${6 + Math.random() * 8}px;
      height: ${6 + Math.random() * 8}px;
      border-radius: ${Math.random() > 0.5 ? '50%' : '2px'};
      transform: rotate(${Math.random() * 360}deg);
    `;
    wrap.appendChild(piece);
  }

  // Clean up after 5s
  setTimeout(() => {
    if (wrap) wrap.innerHTML = '';
  }, 5000);
}
